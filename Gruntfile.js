module.exports = function(grunt){
    // Load the plugin that provides the "uglify", "concat" tasks.
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // 프로젝트 구성
    grunt.initConfig({
        /*
        * grunt-angular-templates - HTML Ajax하지 않고 캐시된 데이터를 사용
        * Option
        * module - 템플릿을 등록할 모듈 설정
        * prefix - 템플릿 URL 앞에 추가할 문자열 설정
        */
        ngtemplates: {
            app: {
                options: {
                    prefix: '/',
                    module: 'app'
                },
                src: 'src/view.html',
                dest: './src/view_template.js'
            }
        },

        /*
        * grunt-contrib-concat - File을 통합한다.
        * Option
        * separator - 파일이 통합되는 지점에 들어갈 string 설정
        * banner - 파일이 통합된 output 파일 최상단의 banner string을 설정
        * footer - 'banner'와 같은 방식으로, 통합된 파일의 최하단에 위치하는 string을 설정
        * stripBanners
        *    각각의 파일에 쓰여있는 JavaScript banner comments를 제거
        *    · false - 제거하지 않는다.(default)
        *    · true - / ... / 은 제거되지만, /! ... /은 제거되지 않는다.
        *    · options
        *       block : true 인 경우, 모든 block comments 제거
        *       line : true 인 경우, 모든 // 라인 제거
        */
        concat: {
            options: {
                separator: '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
            },

            basic: {
                src: ['./src/contents.js'], // Concat 타겟 설정(앞에서부터 순서대로 합쳐진다.)
                dest: './src/contents.js' // Concat 결과 파일
            }
        },

        /*
        * grunt-contrib-uglify - UglifyJS를 통한 file minifying.
        * Option
        * banner - 파일이 통합된 output 파일 최상단의 banner string을 설정
        * mangle - false는 변수명과 함수명의 변형을 막는다.
        * compress - dropconsole true는 console 출력문 제거
        * beautify - true는 코드의 syntax 유지
        * preserveComments - false는 모든 주석 제거, 'all'은 '!'로 시작하는 주석만 보존
        */
        uglify: {
            appMin: {
                src: './src/app.js',
                dest: './src/app.min.js'
            },

            tempMin: {
                src: './src/view_template.js', //uglify할 대상 설정
                dest: './src/view_template.min.js' //uglify 결과 파일 설정
            },

            jsMin: {
                src: './src/contents.js',
                dest: './src/contents.min.js'
            }
        },

        /*
        * grunt-contrib-cssmin - CSS파일 압축
        * Option
        * keepSpecialComments
        *   · default - '!'가 붙은 주석은 보존
        *   · 1 - '!'가 붙은 주석 중 첫번째 주석만 보존
        *   · 0 - 모든 주석 제거
        * 
        */
        cssmin: {
            build: {
                src: ['./src/css/common.css'],
                dest: './src/css/common.min.css'
            }
        },

        /*
        * grunt-contrib-clean - 설정된 파일 제거
        */
        clean: [
            './src/view_template.js'
        ],

        /*
        * grunt-processhtml - HTML파일을 빌드 할 때 릴리즈 환경에 따라 수정 가능
        * <!-- build:<type>[:target] [inline] [value] -->
        * <!-- /build -->
        * Type: js, css, remove, template
        * Option
        * data - message는 문자열로 사용 <%= message %>
        */
        processhtml: {
            options: {
                data: {
                    message: 'Hello'
                }
            },
            dist: {
                files: {
                    './src/dest/index.html': ['./src/index.html']
                }
            }
        },

        /*
        * grunt-contrib-jshint - SHint를 통한 file Validation.
        * Option
        * force - true는 error 검출 시 task를  fail시키지 않고 계속 진단
        * reporter - output을 modifying할 수 있는 옵션 (jshint-stylish 설치 :  $npm install jshint-stylish --save-dev)
        */
        jshint: {
            all: ['./app.js'],
            options:{
                reporter: require('jshint-stylish')
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['ngtemplates', 'concat', 'uglify', 'cssmin', 'clean', 'processhtml', 'jshint']); //grunt 명령어로 실행할 작업

};