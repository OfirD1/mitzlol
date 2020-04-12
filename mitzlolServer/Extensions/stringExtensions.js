exports.extendString = function () {
    String.prototype.reverse = function () {
        return this.toGraphemes().reverse().join('');
    };
    String.prototype.replaceAt = function (index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    };
    String.prototype.format = function (...args) {
        let formatted = this;
        args.forEach((item, i) => {
          const regexp = new RegExp(['\\{', i, '\\}'].join(''), 'gi');
          formatted = formatted.replace(regexp, args[i]);
        });
        return formatted;
    };
    String.prototype.removeDiacritics = function () {
        return this.replace(/[\u0591-\u05C7]/g, '');
    };
    String.prototype.toGraphemes = function () {
        const diacriticsRange = /[\u0591-\u05C7]/;
        const graphemes = [];
        const codePointsChrs = Array.from(this);
        let currentGrapheme = '';
        for (let i = 0; i < codePointsChrs.length; i += 1) {
            currentGrapheme += codePointsChrs[i];
            if (i + 1 >= codePointsChrs.length ||
                !diacriticsRange.test(codePointsChrs[i + 1])) {
                graphemes.push(currentGrapheme);
                currentGrapheme = '';
            }
        }
        return graphemes;
    };
};
