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
$ npm start
```

#### Finish using LiveReload

control + c

### Compile source

Compile source in /public/www

```
$ harp compile
```

Compile source non-minify-html in /dist

```
$ gulp dist
```

Compile both source at the same time
```
$ harp compile;gulp dist
```
