require('../Extensions/stringExtensions').extendString();

function WordRepository() {
}

// ************* /
//   CONSTANS    /
// ************* /
const consts = {
    responseFormat: {
        title: '',
        words: [],
    },
    finalForms: {
        כ: 'ך',
        מ: 'ם',
        נ: 'ן',
        פ: 'ף',
        צ: 'ץ',
    },
    consonantsGroups: [
        ['ח', 'כ'],
        ['א', 'ע', 'ה'],
        ['צ', 'ס', 'ז', 'שׂ'],
        ['ב', 'פ', 'וְ', 'וִ', 'וֵ', 'וֶ', 'וַ', 'וָ', 'וֻ', 'וֱ', 'וֳ', 'וֲ'], // O and U are excluded
        ['בּ', 'פּ'],
        ['ק', 'כּ', 'ג'],
        ['ת', 'ט', 'ד']
    ],
    dageshables: [
        'ב', 'כ', 'פ'
    ],
    unstrippablesDageshAndSin: [
        'בּ', 'פּ', 'כּ', 'שׂ'
    ],
    unstrippablesVavs: [
        'וְ', 'וִ', 'וֵ', 'וֶ', 'וַ', 'וָ', 'וֻ', 'וֱ', 'וֳ', 'וֲ'
    ],
    titles: {
        prefix: 'בראש מילה',
        infix: 'באמצע מילה',
        postfix: 'בסוף מילה',
        wildcard: 'בכל מקום, אחד או יותר תווים בין כל צמד אותיות מקווקו'
    }
};
const globals = {
    knex: null,
    targetTable: null,
    selectColumn: null,
    whereColumn: null
};

// ************* /
// INIT METHODS  /
// ************* /

WordRepository.prototype.createConnection = function (knexConfig) {
  globals.knex = require('knex')(knexConfig);
};
WordRepository.prototype.setDbTarget = function (dbConfig) {
    globals.targetTable = dbConfig.targetTable;
    globals.selectColumn = dbConfig.selectColumn;
    globals.whereColumn = dbConfig.whereColumn;
};

// ************* /
// CORE METHODS  /
// ************* /

// Words starting with the requested letters
WordRepository.prototype.matchPrefix = function (toMatch, operator = 'like', isConsecutive = true) {
    return matchPrePostFix(
        ['{0}', operator === 'like' ? '%' : ''].join(''),
        toMatch,
        operator,
        data => handleData(data, buildTitle(toMatch, consts.titles.prefix, isConsecutive))
    );
};
// Words starting with the requested letters, reveresed
WordRepository.prototype.matchPrefixReversed = function (toMatch, operator = 'like', isConsecutive = true) {
    let query = Promise.resolve(consts.responseFormat);
    if (toMatch.removeDiacritics().length > 1) {
        const reversed = toMatch.reverse();
        query = matchPrePostFix(
            ['{0}', operator === 'like' ? '%' : ''].join(''),
            reversed,
            operator,
            data => handleData(data, buildTitle(reversed, consts.titles.prefix, isConsecutive))
        );
    }
    return query;
};
// Words ending with the requested letters
WordRepository.prototype.matchPostfix = function (toMatch, operator = 'like', isConsecutive = true) {
    return matchPrePostFix(
        [operator === 'like' ? '%' : '', '{0}'].join(''),
        toMatch,
        operator,
        data => handleData(data, buildTitle(toMatch, consts.titles.postfix, isConsecutive))
    );
};
// Words ending with the requested letters, reveresed
WordRepository.prototype.matchPostfixReversed = function (toMatch, operator = 'like', isConsecutive = true) {
    let query = Promise.resolve(consts.responseFormat);
    if (toMatch.removeDiacritics().length > 1) {
        const reversed = toMatch.reverse();
        query = matchPrePostFix(
            [operator === 'like' ? '%' : '', '{0}'].join(''),
            reversed,
            operator,
            data => handleData(data, buildTitle(reversed, consts.titles.postfix, isConsecutive))
        );
    }
    return query;
};
// Words ending with the requested letters, final formed
WordRepository.prototype.matchPostfixFinalForm = function (toMatch, operator = 'like', isConsecutive = true) {
    let query = Promise.resolve(consts.responseFormat);
    const finalFormed = toFinalForm(toMatch);
    if (toMatch !== finalFormed) {
        query = matchPrePostFix(
            [operator === 'like' ? '%' : '', '{0}'].join(''),
            finalFormed,
            operator,
            data => handleData(data, buildTitle(finalFormed, consts.titles.postfix, isConsecutive))
        );
    }
    return query;
};
// Words ending with the requested letters, reversed, then final formed
WordRepository.prototype.matchPostfixReversedFinalForm = function (toMatch, operator = 'like', isConsecutive = true) {
    let query = Promise.resolve(consts.responseFormat);
    if (toMatch.removeDiacritics().length > 1) {
        const reversed = toMatch.reverse();
        const reversedFinalFormed = toFinalForm(reversed);
        if (reversed !== reversedFinalFormed) {
            query = matchPrePostFix(
                [operator === 'like' ? '%' : '', '{0}'].join(''),
                reversedFinalFormed,
                operator,
                data => handleData(
                    data, buildTitle(reversedFinalFormed, consts.titles.postfix, isConsecutive)
                )
            );
        }
    }
    return query;
};
// Words containing the requested letters, but not on the start or the end
WordRepository.prototype.matchInfix = function (toMatch, operator = 'like', isConsecutive = true) {
    return matchInfix(
        toMatch,
        operator,
        data => handleData(data, buildTitle(toMatch, consts.titles.infix, isConsecutive))
    );
};
// Words containing the requested letters, but not on the start or the end, reveresed
WordRepository.prototype.matchInfixReversed = function (toMatch, operator = 'like', isConsecutive = true) {
    let query = Promise.resolve(consts.responseFormat);
    if (toMatch.removeDiacritics().length > 1) {
        const reversed = toMatch.reverse();
        query = matchInfix(
            reversed,
            operator,
            data => handleData(data, buildTitle(reversed, consts.titles.infix, isConsecutive))
        );
    }
    return query;
};
// Words containing the requested letters, non consecutive
WordRepository.prototype.matchNonConsecutive = function (toMatch) {
    const promises = [];
    const splittedCombinations = splitAllWays([], [], toMatch.toGraphemes());
    splittedCombinations.splice(0, 1); // remove the original
    splittedCombinations.forEach(sc => promises.push(...matchNonConsecutive(sc.join('.+'), 'rlike')));
    return promises;
};
// Words having similiar consonants
WordRepository.prototype.matchConsonances = function (toMatch) {
    const promises = matchConsonances(toMatch, matchPreInPostFix);
    return promises;
};

// *************** /
// HELPER METHODS  /
// *************** /
function matchConsonances(toMatch, matcher) {
    const consonances = getConsonances(toMatch);
    const consonancesQueries = [];
    consonances.forEach((consonance) => {
        const consonanceQueries = matcher(consonance);
        consonancesQueries.push(...consonanceQueries);
    });
    return consonancesQueries;
}
function isPrefix(pattern) {
    return pattern[0] !== '%' &&
        pattern[pattern.length - 1] === '%';
}
function matchPrePostFix(pattern, toMatch, operator, callback) {
    let query = globals.knex
        .select(globals.selectColumn)
        .from(globals.targetTable)
        .where(globals.selectColumn, '!=', '')
        .andWhere(globals.whereColumn, operator, pattern.format(toMatch));
    // If the input to match includes a dageshable letter
    // which is not dageshified, exclude the dageshified form
    // (e.g, 'רב' vs 'רבּ').
    if (isPrefix(pattern) &&
        shouldExcludeDageshables(toMatch)) {
        query = excludeDageshables(toMatch, pattern, query);
    }
    query = query
        .then(callback)
        .catch(handleError);
    return query;
}
function matchInfix(toMatch, operator, callback) {
    return globals.knex
        .select(globals.selectColumn)
        .from(globals.targetTable)
        .where(globals.selectColumn, '!=', '')
        .andWhere(globals.whereColumn, 'not like', `${toMatch}%`)
        .andWhere(globals.whereColumn, 'not like', `%${toMatch}`)
        .andWhere(globals.whereColumn, operator, `%${toMatch}%`)
        .then(callback)
        .catch(handleError);
}
function matchPreInPostFix(toMatch, operator = 'like') {
    const promises = [
        WordRepository.prototype.matchPrefix(toMatch, operator),
        WordRepository.prototype.matchPrefixReversed(toMatch, operator),
        WordRepository.prototype.matchPostfix(toMatch, operator),
        WordRepository.prototype.matchPostfixReversed(toMatch, operator),
        WordRepository.prototype.matchPostfixFinalForm(toMatch, operator),
        WordRepository.prototype.matchPostfixReversedFinalForm(toMatch, operator),
        WordRepository.prototype.matchInfix(toMatch, operator),
        WordRepository.prototype.matchInfixReversed(toMatch, operator),
        ...WordRepository.prototype.matchNonConsecutive(toMatch, operator)
    ];
    return promises;
}
// matchNonConsecutive matches words that contain intervening letters between
// each given letter in 'toMatch'.
// For example, if 'toMatch' is "אב", then the match should return words such
// as "אגב", "אהב", "אחשוב", and so on.
function matchNonConsecutive(toMatch, operator = 'like') {
    // When the required match is non-consecutive, there's no meaning to pre\post\infix,
    // and we just need one of them
    const promises = [
        WordRepository.prototype.matchPrefix(toMatch, operator, false),
        WordRepository.prototype.matchPrefixReversed(toMatch, operator, false),
        WordRepository.prototype.matchPostfixFinalForm(toMatch, operator, false),
        WordRepository.prototype.matchPostfixReversedFinalForm(toMatch, operator, false)
    ];
    return promises;
}
function toFinalForm(word) {
  const patternFinalForm = `(${Object.keys(consts.finalForms).join('|')})$`; // gives: '(כ|מ|נ|פ|צ)$'
  return word.replace(new RegExp(patternFinalForm), m => consts.finalForms[m]);
}
function getConsonances(word) {
    let consonances = [];
    const combConsonants = [];
    let idx = 0;
    word.toGraphemes().forEach((grapheme) => {
        const curConsonants = getConsonants(grapheme);
        if (curConsonants.length) {
            // Remove the current grapheme from the current consonants
            curConsonants.splice(curConsonants.indexOf(grapheme), 1);
            combConsonants.push(curConsonants);
            idx += 1;
        } else {
            const notConsonant = [combConsonants[idx] ? combConsonants[idx] : [], grapheme].join('');
            combConsonants.splice(idx, 1, [notConsonant]);
        }
    });
    if (combConsonants.length > 1) {
        consonances = cartesianProduct(combConsonants);
        consonances.forEach((con, i) => { consonances[i] = con.join(''); });
    }
    return consonances;
}
function getConsonants(grapheme) {
    let curConsonants = [];
    const stripped = removeDiacritics(grapheme);
    consts.consonantsGroups.every((group) => {
      if (group.includes(stripped)) {
        curConsonants = group.slice(); // clone
      }
      return !curConsonants.length;
    });
    return curConsonants;
}
// strip any diacritic, except for:
// 1. Vav with nikud, unless with O or U
// 2. Dagesh kal in ב,כ,פ
// 3. Sin שׂ
function removeDiacritics(g) {
    let stripped = g;
    if (!consts.unstrippablesVavs.includes(g)) {
        g.replace(/(?![\u05bc,\u05c1,\u05c2)])[\u0591-\u05C7]/g, ''); // strip except dagesh and shin\sin
        if (!consts.unstrippablesDageshAndSin.includes(stripped)) {
            stripped = stripped.replace(/[\u05bc,\u05c2]/g, '');// strip also dagesh
        }
    }
    return stripped;
}
function shouldExcludeDageshables(toMatch) {
    const graphemes = toMatch.toGraphemes();
    const lastGrapheme = graphemes[graphemes.length - 1];
    const stripped = removeDiacritics(lastGrapheme);
    return consts.dageshables.includes(stripped);
}
function excludeDageshables(toMatch, pattern, query) {
    let modifiedQuery = query;
    const graphemes = toMatch.toGraphemes();
    const lastGrapheme = graphemes[graphemes.length - 1];
    const graphemeAsArray = lastGrapheme.split('');
    // add dagesh at the proper place (i.e., at index 1, which is right after the letter)
    graphemeAsArray.splice(1, 0, '\u05bc');
    // insert it back (now with a dagesh)
    graphemes.splice(graphemes.length - 1, 1, graphemeAsArray.join(''));
    const toNotMatch = graphemes.join('');
    modifiedQuery = query.andWhere(globals.whereColumn, 'not like', pattern.format(toNotMatch));
    return modifiedQuery;
}
function cartesianProduct(arr) {
    return arr.reduce((acc, cur) => {
        return acc.map(x => cur.map(y => x.concat(y)))
            .reduce((a, b) => a.concat(b), []);
    }, [[]]);
}

function splitAllWays(result, left, right) {
    result.push(left.concat(right.join('')));
    if (right.length > 1) {
        for (let i = 1; i < right.length; i += 1) {
            splitAllWays(
                result,
                left.concat(right.slice(0, i).join('')),
                right.slice(i, right.length)
            );
        }
    }
    return result;
}

async function handleData(data, title) {
    const matches = [];
    data.forEach((item) => {
        matches.push(item[globals.selectColumn]);
    });
    return fillResponse(title, matches);
}
function fillResponse(title, matches) {
  const res = JSON.parse(JSON.stringify(consts.responseFormat));
  res.title = title;
  res.words = matches;
  return res;
}
function buildTitle(toMatch, description, isConsecutive) {
    let title = '';
    if (isConsecutive) {
        title = `${toMatch} ${description}`;
    } else {
        title = [toMatch.replace(/[.+]+/g, '_'), consts.titles.wildcard].join(', ');
    }
    return title;
}
function handleError(error) {
    console.log(error);
}

module.exports = new WordRepository();
