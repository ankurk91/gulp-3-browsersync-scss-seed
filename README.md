# gulp-BrowserSync-SASS-seed

[![Build Status](https://travis-ci.org/ankurk91/gulp-browsersync-scss-seed.svg?branch=master)](https://travis-ci.org/ankurk91/gulp-browsersync-scss-seed)
[![Dependency Status](https://www.versioneye.com/user/projects/57ad5c71cb5df2003d6434c2/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/57ad5c71cb5df2003d6434c2)
[![License](https://img.shields.io/github/license/ankurk91/gulp-browsersync-scss-seed.svg?maxAge=3600)]()

> A quick starter kit for front-end development

### Prerequisites
* node js ^4.4.7
* npm ^3.10.2
* [gulp-cli](https://github.com/gulpjs/gulp-cli)  ```npm install -g gulp-cli@1.2```


### Quick Start
* Download the latest [zip](https://github.com/ankurk91/gulp-browsersync-scss-seed/zipball/master) file from GitHub
* Extract it to your projects folder
```shell
cd projects/gulp-browsersync-scss-seed

# Install browserSync and other node dependencies
npm install

# Start browserSync server, serve from tmp folder 
gulp serve
```

### Generate files for production
```
gulp dist
```
You can distribute ```dist``` folder

### Directory Structure 

```
├── project-name/
│   ├── dist/
│   ├── node_modules/
│   ├── tasks/
│   ├── tmp/
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
