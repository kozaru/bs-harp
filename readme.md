# Bs-Harp

Harp + browser-sync + Bootstrap

## Install

### 1. Node.js

[Node.js](http://nodejs.org/)

### 2. Harp

[Harp](http://harpjs.com/) - the static web server with built-in preprocessing
```
$ sudo npm install -g harp
```

### 3. Download Bs-Harp or git clone Bs-Harp

### 4. Install some node-module
```
$ npm install
```

## Usage

### Start using LiveReload

Start http://localhost:9000

```
$ harp server
```

and start proxying: http://localhost:9000 and http://localhost:3000

```
$ gulp server
```

### Write the code to jade files

When you write the code to jade files , there is a need to write root path.

```index.jade
img(src="/images/demo.png", alt="demo")
```

#### Finish using LiveReload

control + c

### Compile source

Compile source in /public/www

```
$ harp compile
```

Compile source non-minify-html in /dist

If you don't need to convert relative path to the dist directory, you change config.relativePath to false in gulpfile.js.

```
$ gulp dist
```

Compile both source at the same time
```
$ harp compile;gulp dist
```

## Change Log

### v.1.3.2 (2016.1)
Install gulp-autoprefixer
Use browser-sync with gulp

### v.1.3.1 (2016.1)

Use gulp-cssnano instead of gulp-minify-css
Install gulp-sourcemaps

### v.1.3.0 (2016.1)

Install JS and css libraries from npm

### v.1.2.0 (2015.7)

It is possible to convert relative path, even if there are lower directories.

### v.1.1.0 (2015.4)

#### add
- gulp-csscomb
- gulp-minify-css
- gulp-uglify
- .editorconfig
- .jsbeautifyrc
- .jshintrc
- .tern-project

#### fix or update
- gulp-html-prettify
