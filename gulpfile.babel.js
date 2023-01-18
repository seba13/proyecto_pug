// motor plantilla html
const pug = require('gulp-pug')

// herramienta de automatizador de tareas
const gulp = require('gulp')

// elimina cache de recursos exteriores
const cacheBust = require("gulp-cache-bust")

// compilador y transpilador de js
const babel = require('gulp-babel')

// vuelve a montar el servidor al encontrar un error y solucionarlo
const plumber = require("gulp-plumber")

// transpila SASS a CSS
const sass = require('gulp-sass')(require('sass'));

// agregar prefijos css
const autoPrefixer = require('autoprefixer')

// Elimina el css que no es utilizado
const clean = require('gulp-purgecss')

const postcss = require("gulp-postcss")

const cssnano = require("cssnano")

// servidor local, actualiza y recarga automaticamente
const browserSync = require("browser-sync")


// montar servidor version antigua
// const server = browserSync.init

// montar servidor version recomendada
// realiza lo mismo que lo anterior pero la diferencia es que obtiene
// una referencia única y permite crear varios servidores y proxy
const server = browserSync.create()

// Concatenar varios archivos en uno solo
const concat = require("gulp-concat")


const plugins = [cssnano(), autoPrefixer()]


gulp.task("pug", () => {
    console.log("hola");
    return gulp
        .src('./dev/views/pages/*.pug')
        .pipe(plumber())
        .pipe(pug(
            {
                pretty: true
            }
        ))
        .pipe(cacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('./public/'))

})

// Compile sass into CSS & auto-inject into browsers
gulp.task("styles", () => {
    
    return gulp
        .src("./dev/scss/styles.scss")
        .pipe(plumber())
        .pipe(sass({errLogToConsole: true}))
        .on('error', sass.logError)
        .pipe(postcss([autoPrefixer()]))
        .pipe(gulp.dest("./public/css/"))
        .pipe(server.stream()) // inyecta el css sin recargar
})

// The sass.logError part is important because it allows any errors to be emitted into the Terminal. Without this, you won’t be able to watch Sass files for changes - any errors would stop the watching of files. (More on watching files later).

// function catchErr(e) {
//     console.log(e)
//     this.emit("end")
// }

gulp.task('babel', () => {

    return gulp
        .src('./dev/js/*.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest("./public/js/"))

})

// eliminar css que no es utilizado y uglificar css
gulp.task('cleanCSS', () => {
    return gulp
        .src("./public/css/styles.css")
        .pipe(clean(
            {
                // observa los archivos html para determinar
                // los que no son utilizados
                content: ['./public/*.html']
            }
        ))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./public/css/'))
})


gulp.task('default', () => {

    server.init(
        {
            server: './public',
        }
    )
    gulp.watch('./dev/views/**/*.pug', gulp.series('pug')).on('change', server.reload)

    gulp.watch("./dev/scss/**/*.scss", gulp.series('styles')) //cuando se modifica se inyecta el css

    gulp.watch("./dev/js/*.js", gulp.series('babel')).on('change', server.reload)

})

