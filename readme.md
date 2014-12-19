# Bs3harp

harpJS + browser-sync + gulp + Bootstrap3

## Usage

### Install gulpjs and some dependencies.

/Bs3harp

```
$ npm install
```

### Run server with Livereload

/Bs3harp

```
$ harp server
```

/Bs3harp

```
$ npm start
```

### Compile source 

Compile source in /Bs3harp/public/www 

/Bs3harp

```
$ harp compile
```

Compile source non-minify-html in /Bs3harp/dist

/Bs3harp

```
$ harp compile; gulp dist
```

### Attention

if you change bootstrap styles, you copy these files to css directory , rename '_bootstrap.less' and '_variable.less' and fix other less files @import path.

- bootstrap.less
- variable.less

## Chagelog

2014.12.11 Add gulp-imagemin
