# gulp-BrowserSync-SASS-seed

[![Build Status](https://travis-ci.org/ankurk91/gulp-browsersync-scss-seed.svg?branch=master)](https://travis-ci.org/ankurk91/gulp-browsersync-scss-seed)
[![License](https://img.shields.io/github/license/ankurk91/gulp-browsersync-scss-seed.svg?maxAge=3600)]()

> A quick starter kit for front-end development

### Prerequisites
* node js >=6.9.1
* npm >=3.10.10

### Quick Start
* Download the latest [zip](https://github.com/ankurk91/gulp-browsersync-scss-seed/zipball/master) file from GitHub
* Extract it to your projects folder
```shell
cd projects/gulp-browsersync-scss-seed

# Install browserSync and other node dependencies
npm install

# Start browserSync server, serve from tmp folder 
npm start 
```

### Generate files for production
```
npm run build
```
You can distribute ```build``` folder

### Directory Structure 

```
├── project-name/
│   ├── build/
│   ├── node_modules/
│   ├── tasks/
│   ├── .tmp/
│   ├── src/
│   │   ├── img/
│   │   ├── js/
│   │   ├── scss/
│   │   ├── partials/
│   │   └──  index.html
│   ├──  .gitignore
│   ├──  gulpfile.js
│   └──  package.json

```


### Quick Links
* [gulp](http://gulpjs.com)
* [BrowserSync](http://www.browsersync.io)
* [BrowserSync Recipes](https://github.com/BrowserSync/recipes/tree/master/recipes)
* [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include)
* [HTMLHint](https://github.com/yaniswang/HTMLHint)
* [Style Lint](https://github.com/stylelint/stylelint)
* [ESLint](https://github.com/eslint/eslint)
* Install Node.js on [Ubuntu/Mac OS](https://github.com/creationix/nvm), [Windows](https://nodejs.org/en/download/)

### Todo
* More StyleLint rules
* More EsLint rules

#### License
MIT [License](LICENSE.txt)
