# Mitzlol 
Mitzlol is a search app for finding similar-sounded words in Hebrew.

# Usage
Imagine you're Nathan Alterman.  
You're struggling to find similar-sounded words to go with "עוֹד חוֹזֵר הַנִּגּוּן".   
Using Mitzlol, you'd find a nice match for "חז" (two of the consonances in חוֹזֵר): "**זָ**נַ**ח**"!  
Satisfied, you complete your first virtuosic line: "עוֹד חוֹזֵר הַנִּגּוּן שֶׁזָּנַחְתָּ לַשָּׁוְא".  

 ![demo](demo/demo.gif)

# :wrench: Installation
## 1. Prerequisitis 
Mitzlol uses Node.js with Express.js on server side, and Vue.js on client side.
1. Install [Node.js](https://nodejs.org/en/).
2. Install [Express.js](https://expressjs.com/): `npm install -g express`.
3. Optional: If you'd like to use Vue.js as the client, install [Vue CLI](https://cli.vuejs.org/guide/installation.html): `npm install -g @vue/cli`

## 2. `mitzlol` folder
Download or clone `mitzlol` repository.

## 3. Hebrew Dictionary
You're going to need a Hebrew dictionary represented as a `.sql` script.  
To achieve that, choose one of the following options:

- [Use MILA Hebrew Lexicon](https://github.com/HeyJude1/mitzlol#point_right-use-mila-hebrew-lexicon) (most suitable for the common user)
- [Use your own `.sql` Hebrew Lexicon](https://github.com/HeyJude1/mitzlol#point_right-use-your-own-sql-hebrew-lexicon) (suitable if you already have such a `.sql` script)
- [Create your own `.sql` Hebrew Lexicon](https://github.com/HeyJude1/mitzlol#point_right-create-your-own-sql-hebrew-lexicon) (suitable if you already have a Hebrew dictionary, but not as a `.sql` script)
 
Note that these options assumes you're using MySql, but [you can use other RDBMSes](https://github.com/HeyJude1/mitzlol#wrench-if-you-want-to-use-other-rdbms-instead-of-mysql).
 
###  :point_right: Use MILA Hebrew Lexicon
*The following assumes `mitzlol` is the current working directory.* 
1. Download [MILA Hebrew Lexicon](https://yeda.cs.technion.ac.il:8443/corpus/software/files/lexicon.zip) (go through its [license terms](https://yeda.cs.technion.ac.il/resources_lexicons_mila.html)) into `mitzlolLexicon`.
2. Build the source code in `mitzlolLexicon\ProcessLexicon` (it's a .Net Core app).
3. Run (replace `path\to\ProcessLexicon.dll` with your path):  

       .\mitzlolLexicon\ProcessLexicon.bat path\to\ProcessLexicon.dll
            
   This would create a file named `mitzlolLexicon.sql` inside `mitzlolLexicon` folder.
4. Load `mitzlolLexicon.sql` into MySQL (use Data Import in MySQL Workbench).

### :point_right: Use your own `.sql` Hebrew lexicon

 1. Load your `.sql` file into MySql (use Data Import in MySQL Workbench).
 2. Change the arguments values inside `mitzlolServer\mitzlolDbTarget.config`: 
 
     * `table` – The table to query (default value: `item`).
     * `whereColumn` - The column to filter (default value: `undotted`, see below).  
     * `selectColumn` - The column to select (default value: `dotted`, see below). 
 
    *Note: The default values above comes from MILA Hebrew Lexicon, which separates its entries into 2 columns: `dotted` and `undotted` (i.e., with and without Nikkud, respectively).  
    It is suggested to separate your lexicon table into two such columns, see below on how to do that.*
     

### :point_right: Create your own `.sql` Hebrew lexicon:
1. Move your lexicon file into MySql's `Uploads` folder.
2. *Optional, but suggested*:  
      If you're lexicon file contains dotted words (i.e., with Nikkud), you can create an undotted version of it (i.e., without Nikkud):
     - Build the source code in `mitzlolLexicon\ProcessLexicon` (it's a .Net Core app).
     -  Run (replace `path\to` with your paths):
   
            .\mitzlolLexicon\ProcessLexicon.bat path\to\ProcessLexicon.dll path\to\input\file.txt path\to\output\file.txt
  
   - Move the output file into MySql `Uploads` folder as well.
   
3. Execute `mitzlolLexicon\mitzlolLexiconCreator.sql` in MySql.
    * *Note: The `mitzlolLexicon\mitzlolLexiconCreator.sql` script assumes you have two `.txt` files, `dotted.txt` and `undotted.txt`, with each containing words separated by new lines.  
      If any of these assumptions don't apply for your case, you'd need to tweak it for your needs.*

---
     
### :hammer: If you want to use other RDBMS instead of MySql:
`mitzlol` was built and tested using [`knex`](http://knexjs.org/), and is targeting MySql. 
However, `knex` supports other RDBMSes, and it shouldn't be too hard to target your favorite one. 
What you'd need is:
1. `npm install` the appropriate database library to be targeted by `knex`.
2. Tweak the queries inside `wordRepository.js`.

    

# :rocket: Run
*The following assumes `mitzlol` is the current working directory.*

Run `mitzlolRun.bat` as administrator using the following command:
    
    mitzlolRun.bat --hostname=<mysql_host> --username=<mysql_username> --password=<mysql_password> --database=<database_name> <vue|react>

Such that:
  * `<mysql_host>` – Replace it with your MySql hostname (if you're running locally, it's `127.0.0.1`). 
  * `<mysql_username>` - Replace it with your MySql username (if you're running locally, it's probably `root`). 
  * `<mysql_password>` - Replace it with your MySql password.
  * `<database_name>` - Replace it with your MySql's lexicon database name.
  * `<vue|react>` - Choose either `vue` or `react` to use as the client.


# :link: Similar apps
Hebrew:
- [חרוזית](https://wordplay.dicta.org.il/)  

English:
- [Dillfrog Muse](https://muse.dillfrog.com/)
- [Phonetic Word Search](http://www.benbriedis.com/phonetic/search.php)
