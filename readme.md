# Bs-Harp

Harp + browser-sync + Bootstrap

## Install

1. Node.js
[Node.js](http://nodejs.org/)

2. Harp
[Harp](http://harpjs.com/) Harp, the static web server with built-in preprocessing
```
$ sudo npm install -g harp
```

3. Download Bs-Harp or git clone Bs-Harp

4. Install some node-module
```
$ npm install
```

## Usage

### Start using LiveReload

Start local server in Harp,

```
$ harp server
```

and start proxying it in browser-sync.

```
$ npm start
```

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
