'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var LiveServer = require('live-server');
var marked = require('marked');
var marked__default = _interopDefault(marked);
var Handlebars = require('handlebars');
var highlightjs = _interopDefault(require('highlight.js'));
var Shelljs = require('shelljs');
var ts = require('typescript');
var util = require('util');

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var gutil = require('gulp-util');
var c = gutil.colors;
var pkg$1 = require('../package.json');
var LEVEL;
(function (LEVEL) {
    LEVEL[LEVEL["INFO"] = 0] = "INFO";
    LEVEL[LEVEL["DEBUG"] = 1] = "DEBUG";
    LEVEL[LEVEL["ERROR"] = 2] = "ERROR";
})(LEVEL || (LEVEL = {}));

var Logger = function () {
    function Logger() {
        classCallCheck(this, Logger);

        this.name = pkg$1.name;
        this.version = pkg$1.version;
        this.logger = gutil.log;
        this.silent = true;
    }

    createClass(Logger, [{
        key: 'info',
        value: function info() {
            if (!this.silent) return;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            this.logger(this.format.apply(this, [LEVEL.INFO].concat(args)));
        }
    }, {
        key: 'error',
        value: function error() {
            if (!this.silent) return;

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            this.logger(this.format.apply(this, [LEVEL.ERROR].concat(args)));
        }
    }, {
        key: 'debug',
        value: function debug() {
            if (!this.silent) return;

            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            this.logger(this.format.apply(this, [LEVEL.DEBUG].concat(args)));
        }
    }, {
        key: 'format',
        value: function format(level) {
            var pad = function pad(s, l) {
                var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

                return s + Array(Math.max(0, l - s.length + 1)).join(c);
            };

            for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                args[_key4 - 1] = arguments[_key4];
            }

            var msg = args.join(' ');
            if (args.length > 1) {
                msg = pad(args.shift(), 15, ' ') + ': ' + args.join(' ');
            }
            switch (level) {
                case LEVEL.INFO:
                    msg = c.green(msg);
                    break;
                case LEVEL.DEBUG:
                    msg = c.cyan(msg);
                    break;
                case LEVEL.ERROR:
                    msg = c.red(msg);
                    break;
            }
            return [msg].join('');
        }
    }]);
    return Logger;
}();

var logger = new Logger();

var AngularAPIs = require('../src/data/api-list.json');
function finderInAngularAPIs(type) {
    var _result = {
        source: 'external',
        data: null
    };
    _.forEach(AngularAPIs, function (angularModuleAPIs, angularModule) {
        var i = 0,
            len = angularModuleAPIs.length;
        for (i; i < len; i++) {
            if (angularModuleAPIs[i].title === type) {
                _result.data = angularModuleAPIs[i];
            }
        }
    });
    return _result;
}

var DependenciesEngine = function () {
    function DependenciesEngine() {
        classCallCheck(this, DependenciesEngine);

        if (DependenciesEngine._instance) {
            throw new Error('Error: Instantiation failed: Use DependenciesEngine.getInstance() instead of new.');
        }
        DependenciesEngine._instance = this;
    }

    createClass(DependenciesEngine, [{
        key: 'init',
        value: function init(data) {
            this.rawData = data;
            this.modules = _.sortBy(this.rawData.modules, ['name']);
            this.components = _.sortBy(this.rawData.components, ['name']);
            this.directives = _.sortBy(this.rawData.directives, ['name']);
            this.injectables = _.sortBy(this.rawData.injectables, ['name']);
            this.interfaces = _.sortBy(this.rawData.interfaces, ['name']);
            this.routes = _.sortBy(_.uniqWith(this.rawData.routes, _.isEqual), ['name']);
            this.pipes = _.sortBy(this.rawData.pipes, ['name']);
            this.classes = _.sortBy(this.rawData.classes, ['name']);
        }
    }, {
        key: 'find',
        value: function find$$1(type) {
            var finderInCompodocDependencies = function finderInCompodocDependencies(data) {
                var _result = {
                    source: 'internal',
                    data: null
                },
                    i = 0,
                    len = data.length;
                for (i; i < len; i++) {
                    if (type.indexOf(data[i].name) !== -1) {
                        _result.data = data[i];
                    }
                }
                return _result;
            },
                resultInCompodocInjectables = finderInCompodocDependencies(this.injectables),
                resultInCompodocClasses = finderInCompodocDependencies(this.classes),
                resultInAngularAPIs = finderInAngularAPIs(type);
            if (resultInCompodocInjectables.data !== null) {
                return resultInCompodocInjectables;
            } else if (resultInCompodocClasses.data !== null) {
                return resultInCompodocClasses;
            } else if (resultInAngularAPIs.data !== null) {
                return resultInAngularAPIs;
            }
        }
    }, {
        key: 'getModules',
        value: function getModules() {
            return this.modules;
        }
    }, {
        key: 'getComponents',
        value: function getComponents() {
            return this.components;
        }
    }, {
        key: 'getDirectives',
        value: function getDirectives() {
            return this.directives;
        }
    }, {
        key: 'getInjectables',
        value: function getInjectables() {
            return this.injectables;
        }
    }, {
        key: 'getInterfaces',
        value: function getInterfaces() {
            return this.interfaces;
        }
    }, {
        key: 'getRoutes',
        value: function getRoutes() {
            return this.routes;
        }
    }, {
        key: 'getPipes',
        value: function getPipes() {
            return this.pipes;
        }
    }, {
        key: 'getClasses',
        value: function getClasses() {
            return this.classes;
        }
    }], [{
        key: 'getInstance',
        value: function getInstance() {
            return DependenciesEngine._instance;
        }
    }]);
    return DependenciesEngine;
}();

DependenciesEngine._instance = new DependenciesEngine();

var $dependenciesEngine = DependenciesEngine.getInstance();

//import * as helpers from 'handlebars-helpers';
var HtmlEngine = function () {
    function HtmlEngine() {
        classCallCheck(this, HtmlEngine);

        this.cache = {};
        //TODO use this instead : https://github.com/assemble/handlebars-helpers
        Handlebars.registerHelper("compare", function (a, operator, b, options) {
            if (arguments.length < 4) {
                throw new Error('handlebars Helper {{compare}} expects 4 arguments');
            }
            var result;
            switch (operator) {
                case 'indexof':
                    result = b.indexOf(a) !== -1;
                    break;
                case '===':
                    result = a === b;
                    break;
                case '!==':
                    result = a !== b;
                    break;
                case '>':
                    result = a > b;
                    break;
                default:
                    {
                        throw new Error('helper {{compare}}: invalid operator: `' + operator + '`');
                    }
            }
            if (result === false) {
                return options.inverse(this);
            }
            return options.fn(this);
        });
        Handlebars.registerHelper("filterAngular2Modules", function (text, options) {
            var NG2_MODULES = ['BrowserModule', 'FormsModule', 'HttpModule', 'RouterModule'],
                len = NG2_MODULES.length;
            var i = 0,
                result = false;
            for (i; i < len; i++) {
                if (text.indexOf(NG2_MODULES[i]) > -1) {
                    result = true;
                }
            }
            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
        Handlebars.registerHelper("debug", function (optionalValue) {
            console.log("Current Context");
            console.log("====================");
            console.log(this);
            if (optionalValue) {
                console.log("OptionalValue");
                console.log("====================");
                console.log(optionalValue);
            }
        });
        Handlebars.registerHelper('breaklines', function (text) {
            text = Handlebars.Utils.escapeExpression(text);
            text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
            text = text.replace(/ /gm, '&nbsp;');
            text = text.replace(/	/gm, '&nbsp;&nbsp;&nbsp;&nbsp;');
            return new Handlebars.SafeString(text);
        });
        Handlebars.registerHelper('breakComma', function (text) {
            text = Handlebars.Utils.escapeExpression(text);
            text = text.replace(/,/g, ',<br>');
            return new Handlebars.SafeString(text);
        });
        Handlebars.registerHelper('functionSignature', function (method) {
            var args = method.args.map(function (arg) {
                var _result = $dependenciesEngine.find(arg.type);
                if (_result) {
                    if (_result.source === 'internal') {
                        var _path = _result.data.type;
                        if (_result.data.type === 'class') _path = 'classe';
                        return arg.name + ': <a href="./' + _path + 's/' + _result.data.name + '.html" >' + arg.type + '</a>';
                    } else {
                        var _path2 = 'https://angular.io/docs/ts/latest/api/' + _result.data.path;
                        return arg.name + ': <a href="' + _path2 + '" target="_blank" >' + arg.type + '</a>';
                    }
                } else {
                    return arg.name + ': ' + arg.type;
                }
            }).join(', ');
            if (method.name) {
                return method.name + '(' + args + ')';
            } else {
                return '(' + args + ')';
            }
        });
        Handlebars.registerHelper('jsdoc-returns-comment', function (jsdocTags, options) {
            var i = 0,
                len = jsdocTags.length,
                result;
            for (i; i < len; i++) {
                if (jsdocTags[i].tagName) {
                    if (jsdocTags[i].tagName.text === 'returns') {
                        result = jsdocTags[i].comment;
                        break;
                    }
                }
            }
            return result;
        });
        Handlebars.registerHelper('jsdoc-params', function (jsdocTags, options) {
            var i = 0,
                len = jsdocTags.length,
                tags = [];
            for (i; i < len; i++) {
                if (jsdocTags[i].tagName) {
                    if (jsdocTags[i].tagName.text === 'param') {
                        var tag = {};
                        if (jsdocTags[i].typeExpression && jsdocTags[i].typeExpression.type.name) {
                            tag.type = jsdocTags[i].typeExpression.type.name.text;
                        }
                        if (jsdocTags[i].comment) {
                            tag.comment = jsdocTags[i].comment;
                        }
                        if (jsdocTags[i].parameterName) {
                            tag.name = jsdocTags[i].parameterName.text;
                        }
                        tags.push(tag);
                    }
                }
            }
            if (tags.length >= 1) {
                this.tags = tags;
                return options.fn(this);
            }
        });
        Handlebars.registerHelper('linkType', function (name, options) {
            var _result = $dependenciesEngine.find(name);
            if (_result) {
                this.type = {
                    raw: name
                };
                if (_result.source === 'internal') {
                    if (_result.data.type === 'class') _result.data.type = 'classe';
                    this.type.href = './' + _result.data.type + 's/' + _result.data.name + '.html';
                    this.type.target = '_self';
                } else {
                    this.type.href = 'https://angular.io/docs/ts/latest/api/' + _result.data.path;
                    this.type.target = '_blank';
                }
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
        Handlebars.registerHelper('indexableSignature', function (method) {
            var args = method.args.map(function (arg) {
                return arg.name + ': ' + arg.type;
            }).join(', ');
            if (method.name) {
                return method.name + '[' + args + ']';
            } else {
                return '[' + args + ']';
            }
        });
        Handlebars.registerHelper('object', function (text) {
            text = JSON.stringify(text);
            text = text.replace(/{"/, '{<br>&nbsp;&nbsp;&nbsp;&nbsp;"');
            text = text.replace(/,"/, ',<br>&nbsp;&nbsp;&nbsp;&nbsp;"');
            text = text.replace(/}$/, '<br>}');
            return new Handlebars.SafeString(text);
        });
    }

    createClass(HtmlEngine, [{
        key: 'init',
        value: function init() {
            var partials = ['menu', 'overview', 'readme', 'modules', 'module', 'components', 'component', 'component-detail', 'directives', 'directive', 'injectables', 'injectable', 'pipes', 'pipe', 'classes', 'class', 'interface', 'routes', 'search-results', 'search-input', 'link-type', 'block-method', 'block-property', 'coverage-report'],
                i = 0,
                len = partials.length,
                loop = function loop(resolve$$1, reject) {
                if (i <= len - 1) {
                    fs.readFile(path.resolve(__dirname + '/../src/templates/partials/' + partials[i] + '.hbs'), 'utf8', function (err, data) {
                        if (err) {
                            reject();
                        }
                        Handlebars.registerPartial(partials[i], data);
                        i++;
                        loop(resolve$$1, reject);
                    });
                } else {
                    resolve$$1();
                }
            };
            return new Promise(function (resolve$$1, reject) {
                loop(resolve$$1, reject);
            });
        }
    }, {
        key: 'render',
        value: function render(mainData, page) {
            var o = mainData,
                that = this;
            Object.assign(o, page);
            return new Promise(function (resolve$$1, reject) {
                if (that.cache['page']) {
                    var template = Handlebars.compile(that.cache['page']),
                        result = template({
                        data: o
                    });
                    resolve$$1(result);
                } else {
                    fs.readFile(path.resolve(__dirname + '/../src/templates/page.hbs'), 'utf8', function (err, data) {
                        if (err) {
                            reject('Error during index ' + page.name + ' generation');
                        } else {
                            that.cache['page'] = data;
                            var _template = Handlebars.compile(data),
                                _result2 = _template({
                                data: o
                            });
                            resolve$$1(_result2);
                        }
                    });
                }
            });
        }
    }]);
    return HtmlEngine;
}();

var MarkdownEngine = function () {
    function MarkdownEngine() {
        classCallCheck(this, MarkdownEngine);

        var renderer = new marked.Renderer();
        renderer.code = function (code, language) {
            var validLang = !!(language && highlightjs.getLanguage(language));
            var highlighted = validLang ? highlightjs.highlight(language, code).value : code;
            highlighted = highlighted.replace(/(\r\n|\n|\r)/gm, '<br>');
            return '<pre><code class="hljs ' + language + '">' + highlighted + '</code></pre>';
        };
        marked__default.setOptions({ renderer: renderer });
    }

    createClass(MarkdownEngine, [{
        key: 'getReadmeFile',
        value: function getReadmeFile() {
            return new Promise(function (resolve$$1, reject) {
                fs.readFile(path.resolve(process.cwd() + '/README.md'), 'utf8', function (err, data) {
                    if (err) {
                        reject('Error during README.md file reading');
                    } else {
                        resolve$$1(marked__default(data));
                    }
                });
            });
        }
    }]);
    return MarkdownEngine;
}();

var FileEngine = function () {
    function FileEngine() {
        classCallCheck(this, FileEngine);
    }

    createClass(FileEngine, [{
        key: 'get',
        value: function get$$1(filepath) {
            return new Promise(function (resolve$$1, reject) {
                fs.readFile(path.resolve(process.cwd() + path.sep + filepath), 'utf8', function (err, data) {
                    if (err) {
                        reject('Error during ' + filepath + ' read');
                    } else {
                        resolve$$1(data);
                    }
                });
            });
        }
    }]);
    return FileEngine;
}();

var COMPODOC_DEFAULTS = {
    title: 'Application documentation',
    additionalEntryName: 'Additional documentation',
    additionalEntryPath: 'additional-documentation',
    folder: './documentation/',
    port: 8080,
    theme: 'gitbook',
    base: '/',
    disableSourceCode: false,
    disableGraph: false,
    disableCoverage: false
};

var Configuration = function () {
    function Configuration() {
        classCallCheck(this, Configuration);

        this._pages = [];
        this._mainData = {
            output: COMPODOC_DEFAULTS.folder,
            theme: COMPODOC_DEFAULTS.theme,
            extTheme: '',
            serve: false,
            port: COMPODOC_DEFAULTS.port,
            open: false,
            documentationMainName: COMPODOC_DEFAULTS.title,
            documentationMainDescription: '',
            base: COMPODOC_DEFAULTS.base,
            hideGenerator: false,
            modules: [],
            readme: '',
            additionalpages: {},
            pipes: [],
            classes: [],
            interfaces: [],
            components: [],
            directives: [],
            injectables: [],
            routes: [],
            tsconfig: '',
            includes: false,
            disableSourceCode: COMPODOC_DEFAULTS.disableSourceCode,
            disableGraph: COMPODOC_DEFAULTS.disableGraph,
            disableCoverage: COMPODOC_DEFAULTS.disableCoverage
        };
        if (Configuration._instance) {
            throw new Error('Error: Instantiation failed: Use Configuration.getInstance() instead of new.');
        }
        Configuration._instance = this;
    }

    createClass(Configuration, [{
        key: 'addPage',
        value: function addPage(page) {
            this._pages.push(page);
        }
    }, {
        key: 'pages',
        get: function get$$1() {
            return this._pages;
        },
        set: function set$$1(pages) {
            this._pages = [];
        }
    }, {
        key: 'mainData',
        get: function get$$1() {
            return this._mainData;
        },
        set: function set$$1(data) {
            Object.assign(this._mainData, data);
        }
    }], [{
        key: 'getInstance',
        value: function getInstance() {
            return Configuration._instance;
        }
    }]);
    return Configuration;
}();

Configuration._instance = new Configuration();

function isGlobal() {
    var binPath,
        globalBinPath = function globalBinPath() {
        if (binPath) return binPath;
        if (process.platform === 'win32') {
            var pathnames = process.env.PATH.split(path.delimiter);
            var len = pathnames.length;
            for (var i = 0; i < len; i++) {
                if (path.basename(pathnames[i]) === 'npm' || path.basename(pathnames[i]) === 'nodejs') {
                    binPath = pathnames[i];
                    break;
                }
            }
        } else {
            binPath = path.dirname(process.execPath);
        }
        return binPath;
    },
        stripTrailingSep = function stripTrailingSep(thePath) {
        if (thePath[thePath.length - 1] === path.sep) {
            return thePath.slice(0, -1);
        }
        return thePath;
    },
        pathIsInside = function pathIsInside(thePath, potentialParent) {
        // For inside-directory checking, we want to allow trailing slashes, so normalize.
        thePath = stripTrailingSep(thePath);
        potentialParent = stripTrailingSep(potentialParent);
        // Node treats only Windows as case-insensitive in its path module; we follow those conventions.
        if (process.platform === "win32") {
            thePath = thePath.toLowerCase();
            potentialParent = potentialParent.toLowerCase();
        }
        return thePath.lastIndexOf(potentialParent, 0) === 0 && (thePath[potentialParent.length] === path.sep || thePath[potentialParent.length] === undefined);
    },
        isPathInside = function isPathInside(a, b) {
        a = path.resolve(a);
        b = path.resolve(b);
        if (a === b) {
            return false;
        }
        return pathIsInside(a, b);
    };
    return isPathInside(process.argv[1] || '', globalBinPath() || '');
}

var NgdEngine = function () {
    function NgdEngine() {
        classCallCheck(this, NgdEngine);
    }

    createClass(NgdEngine, [{
        key: 'renderGraph',
        value: function renderGraph(filepath, outputpath, type) {
            return new Promise(function (resolve$$1, reject) {
                var ngdPath = isGlobal() ? __dirname + '/../node_modules/.bin/ngd' : __dirname + '/../../.bin/ngd';
                if (process.env.MODE && process.env.MODE === 'TESTING') {
                    ngdPath = __dirname + '/../node_modules/.bin/ngd';
                }
                if (/ /g.test(ngdPath)) {
                    ngdPath = ngdPath.replace(/ /g, '^ ');
                }
                var finalPath = path.resolve(ngdPath) + ' -' + type + ' ' + filepath + ' -d ' + outputpath + ' -s -t svg';
                Shelljs.exec(finalPath, {
                    silent: true
                }, function (code, stdout, stderr) {
                    if (code === 0) {
                        resolve$$1();
                    } else {
                        reject(stderr);
                    }
                });
            });
        }
    }]);
    return NgdEngine;
}();

var lunr = require('lunr');
var cheerio = require('cheerio');
var Entities = require('html-entities').AllHtmlEntities;
var $configuration = Configuration.getInstance();
var Html = new Entities();

var SearchEngine = function () {
    function SearchEngine() {
        classCallCheck(this, SearchEngine);

        this.documentsStore = {};
    }

    createClass(SearchEngine, [{
        key: 'getSearchIndex',
        value: function getSearchIndex() {
            if (!this.searchIndex) {
                this.searchIndex = lunr(function () {
                    this.ref('url');
                    this.field('title', { boost: 10 });
                    this.field('body');
                });
            }
            return this.searchIndex;
        }
    }, {
        key: 'indexPage',
        value: function indexPage(page) {
            var text,
                $ = cheerio.load(page.rawData);
            text = $('.content').html();
            text = Html.decode(text);
            text = text.replace(/(<([^>]+)>)/ig, '');
            page.url = page.url.replace($configuration.mainData.output, '');
            var doc = {
                url: page.url,
                title: page.infos.context + ' - ' + page.infos.name,
                body: text
            };
            this.documentsStore[doc.url] = doc;
            this.getSearchIndex().add(doc);
        }
    }, {
        key: 'generateSearchIndexJson',
        value: function generateSearchIndexJson(outputFolder) {
            fs.writeJson(path.resolve(process.cwd() + path.sep + outputFolder + path.sep + 'search_index.json'), {
                index: this.getSearchIndex(),
                store: this.documentsStore
            }, function (err) {
                if (err) {
                    logger.error('Error during search index file generation ', err);
                }
            });
        }
    }]);
    return SearchEngine;
}();

var tsany = ts;
// https://github.com/Microsoft/TypeScript/blob/2.1/src/compiler/utilities.ts#L1507
function getJSDocs(node) {
    return tsany.getJSDocs.apply(this, arguments);
}

// get default new line break

function detectIndent(str, count, indent) {
    var stripIndent = function stripIndent(str) {
        var match = str.match(/^[ \t]*(?=\S)/gm);
        if (!match) {
            return str;
        }
        // TODO: use spread operator when targeting Node.js 6
        var indent = Math.min.apply(Math, match.map(function (x) {
            return x.length;
        })); // eslint-disable-line
        var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');
        return indent > 0 ? str.replace(re, '') : str;
    },
        repeating = function repeating(n, str) {
        str = str === undefined ? ' ' : str;
        if (typeof str !== 'string') {
            throw new TypeError('Expected `input` to be a `string`, got `' + (typeof str === 'undefined' ? 'undefined' : _typeof(str)) + '`');
        }
        if (n < 0 || !Number.isFinite(n)) {
            throw new TypeError('Expected `count` to be a positive finite number, got `' + n + '`');
        }
        var ret = '';
        do {
            if (n & 1) {
                ret += str;
            }
            str += str;
        } while (n >>= 1);
        return ret;
    },
        indentString = function indentString(str, count, indent) {
        indent = indent === undefined ? ' ' : indent;
        count = count === undefined ? 1 : count;
        if (typeof str !== 'string') {
            throw new TypeError('Expected `input` to be a `string`, got `' + (typeof str === 'undefined' ? 'undefined' : _typeof(str)) + '`');
        }
        if (typeof count !== 'number') {
            throw new TypeError('Expected `count` to be a `number`, got `' + (typeof count === 'undefined' ? 'undefined' : _typeof(count)) + '`');
        }
        if (typeof indent !== 'string') {
            throw new TypeError('Expected `indent` to be a `string`, got `' + (typeof indent === 'undefined' ? 'undefined' : _typeof(indent)) + '`');
        }
        if (count === 0) {
            return str;
        }
        indent = count > 1 ? repeating(count, indent) : indent;
        return str.replace(/^(?!\s*$)/mg, indent);
    };
    return indentString(stripIndent(str), count || 0, indent);
}
// Create a compilerHost object to allow the compiler to read and write files
function compilerHost(transpileOptions) {
    var inputFileName = transpileOptions.fileName || (transpileOptions.jsx ? 'module.tsx' : 'module.ts');
    var compilerHost = {
        getSourceFile: function getSourceFile(fileName) {
            if (fileName.lastIndexOf('.ts') !== -1) {
                if (fileName === 'lib.d.ts') {
                    return undefined;
                }
                if (path.isAbsolute(fileName) === false) {
                    fileName = path.join(transpileOptions.tsconfigDirectory, fileName);
                }
                var libSource = '';
                try {
                    libSource = fs.readFileSync(fileName).toString();
                } catch (e) {
                    logger.debug(e, fileName);
                }
                return ts.createSourceFile(fileName, libSource, transpileOptions.target, false);
            }
            return undefined;
        },
        writeFile: function writeFile(name, text) {},
        getDefaultLibFileName: function getDefaultLibFileName() {
            return 'lib.d.ts';
        },
        useCaseSensitiveFileNames: function useCaseSensitiveFileNames() {
            return false;
        },
        getCanonicalFileName: function getCanonicalFileName(fileName) {
            return fileName;
        },
        getCurrentDirectory: function getCurrentDirectory() {
            return '';
        },
        getNewLine: function getNewLine() {
            return '\n';
        },
        fileExists: function fileExists(fileName) {
            return fileName === inputFileName;
        },
        readFile: function readFile$$1() {
            return '';
        },
        directoryExists: function directoryExists() {
            return true;
        },
        getDirectories: function getDirectories() {
            return [];
        }
    };
    return compilerHost;
}

var RouterParser = function () {
    var routes = [],
        modules = [],
        modulesTree,
        rootModule,
        modulesWithRoutes = [];
    return {
        addRoute: function addRoute(route) {
            routes.push(route);
            routes = _.sortBy(_.uniqWith(routes, _.isEqual), ['name']);
        },
        addModuleWithRoutes: function addModuleWithRoutes(moduleName, moduleImports) {
            modulesWithRoutes.push({
                name: moduleName,
                importsNode: moduleImports
            });
            modulesWithRoutes = _.sortBy(_.uniqWith(modulesWithRoutes, _.isEqual), ['name']);
        },
        addModule: function addModule(moduleName, moduleImports) {
            modules.push({
                name: moduleName,
                importsNode: moduleImports
            });
            modules = _.sortBy(_.uniqWith(modules, _.isEqual), ['name']);
        },
        setRootModule: function setRootModule(module) {
            rootModule = module;
        },
        printRoutes: function printRoutes() {
            //console.log('');
            //console.log(routes);
        },
        hasRouterModuleInImports: function hasRouterModuleInImports(imports) {
            var result = false,
                i = 0,
                len = imports.length;
            for (i; i < len; i++) {
                if (imports[i].name.indexOf('RouterModule.forChild') !== -1 || imports[i].name.indexOf('RouterModule.forRoot') !== -1) {
                    result = true;
                }
            }
            return result;
        },
        linkModulesAndRoutes: function linkModulesAndRoutes() {
            //scan each module imports AST for each routes, and link routes with module
            var i = 0,
                len = modulesWithRoutes.length;
            for (i; i < len; i++) {
                _.forEach(modulesWithRoutes[i].importsNode, function (node) {
                    if (node.initializer) {
                        if (node.initializer.elements) {
                            _.forEach(node.initializer.elements, function (element) {
                                //find element with arguments
                                if (element.arguments) {
                                    _.forEach(element.arguments, function (argument) {
                                        _.forEach(routes, function (route) {
                                            if (argument.text && route.name === argument.text) {
                                                route.module = modulesWithRoutes[i].name;
                                            }
                                        });
                                    });
                                }
                            });
                        }
                    }
                });
            }
        },
        constructRoutesTree: function constructRoutesTree() {
            //console.log('constructRoutesTree');
            // routes[] contains routes with module link
            // modulesTree contains modules tree
            // make a final routes tree with that
            var cleanModulesTree = _.cloneDeep(modulesTree),
                modulesCleaner = function modulesCleaner(arr) {
                for (var i in arr) {
                    if (arr[i].importsNode) {
                        delete arr[i].importsNode;
                    }
                    if (arr[i].parent) {
                        delete arr[i].parent;
                    }
                    if (arr[i].children) {
                        modulesCleaner(arr[i].children);
                    }
                }
            };
            modulesCleaner(cleanModulesTree);
            //fs.outputJson('./modules.json', cleanModulesTree);
            console.log('');
            console.log('cleanModulesTree light: ', util.inspect(cleanModulesTree, { depth: 10 }));
            console.log('');
            var routesTree = {
                tag: '<root>',
                kind: 'ngModule',
                name: rootModule,
                children: []
            };
            var foundRouteWithModuleName = function foundRouteWithModuleName(moduleName) {
                return _.find(routes, { 'module': moduleName });
            };
            var loopModulesParser = function loopModulesParser(node) {
                for (var i in node.children) {
                    var route = foundRouteWithModuleName(node.children[i].name);
                    if (route) {
                        route.routes = JSON.parse(route.data);
                        delete route.data;
                        route.kind = 'ngModule';
                        routesTree.children.push(route);
                    }
                    if (node.children[i].children) {
                        loopModulesParser(node.children[i]);
                    }
                }
            };
            loopModulesParser(_.find(cleanModulesTree, { 'name': rootModule }));
            console.log('');
            console.log('routesTree: ', routesTree);
            console.log('');
            //fs.outputJson('./routes-tree.json', routesTree);
            var cleanedRoutesTree;
            var cleanRoutesTree = function cleanRoutesTree(route) {
                for (var i in route.children) {
                    var routes = route.children[i].routes;
                    console.log(routes);
                }
                return route;
            };
            cleanedRoutesTree = cleanRoutesTree(routesTree);
            console.log('');
            console.log('cleanedRoutesTree: ', util.inspect(cleanedRoutesTree, { depth: 10 }));
        },
        constructModulesTree: function constructModulesTree() {
            var getNestedChildren = function getNestedChildren(arr, parent) {
                var out = [];
                for (var i in arr) {
                    if (arr[i].parent === parent) {
                        var children = getNestedChildren(arr, arr[i].name);
                        if (children.length) {
                            arr[i].children = children;
                        }
                        out.push(arr[i]);
                    }
                }
                return out;
            };
            //Scan each module and add parent property
            _.forEach(modules, function (firstLoopModule) {
                _.forEach(firstLoopModule.importsNode, function (importNode) {
                    _.forEach(modules, function (module) {
                        if (module.name === importNode.name) {
                            module.parent = firstLoopModule.name;
                        }
                    });
                });
            });
            modulesTree = getNestedChildren(modules);
        }
    };
}();

var code = [];
var gen = function () {
    var tmp = [];
    return function () {
        var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (!token) {
            //console.log(' ! token');
            return code;
        } else if (token === '\n') {
            //console.log(' \n');
            code.push(tmp.join(''));
            tmp = [];
        } else {
            code.push(token);
        }
        return code;
    };
}();
function generate(node) {
    code = [];
    visitAndRecognize(node);
    return code.join('');
}
function visitAndRecognize(node) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    recognize(node);
    depth++;
    node.getChildren().forEach(function (c) {
        return visitAndRecognize(c, depth);
    });
}
function recognize(node) {
    //console.log('recognizing...', ts.SyntaxKind[node.kind+'']);
    switch (node.kind) {
        case ts.SyntaxKind.FirstLiteralToken:
        case ts.SyntaxKind.Identifier:
            gen('\"');
            gen(node.text);
            gen('\"');
            break;
        case ts.SyntaxKind.StringLiteral:
            gen('\"');
            gen(node.text);
            gen('\"');
            break;
        case ts.SyntaxKind.ArrayLiteralExpression:
            break;
        case ts.SyntaxKind.ImportKeyword:
            gen('import');
            gen(' ');
            break;
        case ts.SyntaxKind.FromKeyword:
            gen('from');
            gen(' ');
            break;
        case ts.SyntaxKind.ExportKeyword:
            gen('\n');
            gen('export');
            gen(' ');
            break;
        case ts.SyntaxKind.ClassKeyword:
            gen('class');
            gen(' ');
            break;
        case ts.SyntaxKind.ThisKeyword:
            gen('this');
            break;
        case ts.SyntaxKind.ConstructorKeyword:
            gen('constructor');
            break;
        case ts.SyntaxKind.FalseKeyword:
            gen('false');
            break;
        case ts.SyntaxKind.TrueKeyword:
            gen('true');
            break;
        case ts.SyntaxKind.NullKeyword:
            gen('null');
            break;
        case ts.SyntaxKind.AtToken:
            break;
        case ts.SyntaxKind.PlusToken:
            gen('+');
            break;
        case ts.SyntaxKind.EqualsGreaterThanToken:
            gen(' => ');
            break;
        case ts.SyntaxKind.OpenParenToken:
            gen('(');
            break;
        case ts.SyntaxKind.ImportClause:
        case ts.SyntaxKind.ObjectLiteralExpression:
            gen('{');
            gen(' ');
            break;
        case ts.SyntaxKind.Block:
            gen('{');
            gen('\n');
            break;
        case ts.SyntaxKind.CloseBraceToken:
            gen('}');
            break;
        case ts.SyntaxKind.CloseParenToken:
            gen(')');
            break;
        case ts.SyntaxKind.OpenBracketToken:
            gen('[');
            break;
        case ts.SyntaxKind.CloseBracketToken:
            gen(']');
            break;
        case ts.SyntaxKind.SemicolonToken:
            gen(';');
            gen('\n');
            break;
        case ts.SyntaxKind.CommaToken:
            gen(',');
            gen(' ');
            break;
        case ts.SyntaxKind.ColonToken:
            gen(' ');
            gen(':');
            gen(' ');
            break;
        case ts.SyntaxKind.DotToken:
            gen('.');
            break;
        case ts.SyntaxKind.DoStatement:
            break;
        case ts.SyntaxKind.Decorator:
            break;
        case ts.SyntaxKind.FirstAssignment:
            gen(' = ');
            break;
        case ts.SyntaxKind.FirstPunctuation:
            gen(' ');
            break;
        case ts.SyntaxKind.PrivateKeyword:
            gen('private');
            gen(' ');
            break;
        case ts.SyntaxKind.PublicKeyword:
            gen('public');
            gen(' ');
            break;
        default:
            break;
    }
}

var Dependencies = function () {
    function Dependencies(files, options) {
        classCallCheck(this, Dependencies);

        this.__cache = {};
        this.__nsModule = {};
        this.unknown = '???';
        this.files = files;
        var transpileOptions = {
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.CommonJS,
            tsconfigDirectory: options.tsconfigDirectory
        };
        this.program = ts.createProgram(this.files, transpileOptions, compilerHost(transpileOptions));
    }

    createClass(Dependencies, [{
        key: 'breakLines',
        value: function breakLines(text) {
            var _t = text;
            if (typeof _t !== 'undefined') {
                _t = _t.replace(/(\n)/gm, '<br>');
                _t = _t.replace(/(<br>)$/gm, '');
            }
            return _t;
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies() {
            var _this = this;

            var deps = {
                'modules': [],
                'components': [],
                'injectables': [],
                'pipes': [],
                'directives': [],
                'routes': [],
                'classes': [],
                'interfaces': []
            };
            var sourceFiles = this.program.getSourceFiles() || [];
            sourceFiles.map(function (file) {
                var filePath = file.fileName;
                if (path.extname(filePath) === '.ts') {
                    if (filePath.lastIndexOf('.d.ts') === -1 && filePath.lastIndexOf('spec.ts') === -1) {
                        logger.info('parsing', filePath);
                        try {
                            _this.getSourceFileDecorators(file, deps);
                        } catch (e) {
                            logger.error(e, file.fileName);
                        }
                    }
                }
                return deps;
            });
            //RouterParser.linkModulesAndRoutes();
            //RouterParser.constructModulesTree();
            //RouterParser.constructRoutesTree();
            return deps;
        }
    }, {
        key: 'getSourceFileDecorators',
        value: function getSourceFileDecorators(srcFile, outputSymbols) {
            var _this2 = this;

            var cleaner = (process.cwd() + path.sep).replace(/\\/g, '/');
            var file = srcFile.fileName.replace(cleaner, '');
            this.programComponent = ts.createProgram([file], {});
            var sourceFile = this.programComponent.getSourceFile(file);
            this.typeCheckerComponent = this.programComponent.getTypeChecker(true);
            ts.forEachChild(srcFile, function (node) {
                var deps = {};
                if (node.decorators) {
                    var visitNode = function visitNode(visitedNode, index) {
                        var metadata = node.decorators.pop();
                        var name = _this2.getSymboleName(node);
                        var props = _this2.findProps(visitedNode);
                        var IO = _this2.getComponentIO(file, sourceFile);
                        if (_this2.isModule(metadata)) {
                            deps = {
                                name: name,
                                file: file,
                                providers: _this2.getModuleProviders(props),
                                declarations: _this2.getModuleDeclations(props),
                                imports: _this2.getModuleImports(props),
                                exports: _this2.getModuleExports(props),
                                bootstrap: _this2.getModuleBootstrap(props),
                                type: 'module',
                                description: _this2.breakLines(IO.description),
                                sourceCode: sourceFile.getText()
                            };
                            if (RouterParser.hasRouterModuleInImports(deps.imports)) {
                                RouterParser.addModuleWithRoutes(name, _this2.getModuleImportsRaw(props));
                            }
                            RouterParser.addModule(name, deps.imports);
                            outputSymbols['modules'].push(deps);
                        } else if (_this2.isComponent(metadata)) {
                            if (props.length === 0) return;
                            //console.log(util.inspect(props, { showHidden: true, depth: 10 }));
                            deps = {
                                name: name,
                                file: file,
                                //animations?: string[]; // TODO
                                changeDetection: _this2.getComponentChangeDetection(props),
                                encapsulation: _this2.getComponentEncapsulation(props),
                                //entryComponents?: string; // TODO waiting doc infos
                                exportAs: _this2.getComponentExportAs(props),
                                host: _this2.getComponentHost(props),
                                inputs: _this2.getComponentInputsMetadata(props),
                                //interpolation?: string; // TODO waiting doc infos
                                moduleId: _this2.getComponentModuleId(props),
                                outputs: _this2.getComponentOutputs(props),
                                providers: _this2.getComponentProviders(props),
                                //queries?: Deps[]; // TODO
                                selector: _this2.getComponentSelector(props),
                                styleUrls: _this2.getComponentStyleUrls(props),
                                styles: _this2.getComponentStyles(props),
                                template: _this2.getComponentTemplate(props),
                                templateUrl: _this2.getComponentTemplateUrl(props),
                                viewProviders: _this2.getComponentViewProviders(props),
                                inputsClass: IO.inputs,
                                outputsClass: IO.outputs,
                                propertiesClass: IO.properties,
                                methodsClass: IO.methods,
                                description: _this2.breakLines(IO.description),
                                type: 'component',
                                sourceCode: sourceFile.getText()
                            };
                            outputSymbols['components'].push(deps);
                        } else if (_this2.isInjectable(metadata)) {
                            deps = {
                                name: name,
                                file: file,
                                type: 'injectable',
                                properties: IO.properties,
                                methods: IO.methods,
                                description: _this2.breakLines(IO.description),
                                sourceCode: sourceFile.getText()
                            };
                            outputSymbols['injectables'].push(deps);
                        } else if (_this2.isPipe(metadata)) {
                            deps = {
                                name: name,
                                file: file,
                                type: 'pipe',
                                description: _this2.breakLines(IO.description),
                                sourceCode: sourceFile.getText()
                            };
                            outputSymbols['pipes'].push(deps);
                        } else if (_this2.isDirective(metadata)) {
                            deps = {
                                name: name,
                                file: file,
                                type: 'directive',
                                description: _this2.breakLines(IO.description),
                                sourceCode: sourceFile.getText()
                            };
                            outputSymbols['directives'].push(deps);
                        }
                        _this2.debug(deps);
                        _this2.__cache[name] = deps;
                    };
                    var filterByDecorators = function filterByDecorators(node) {
                        if (node.expression && node.expression.expression) {
                            return (/(NgModule|Component|Injectable|Pipe|Directive)/.test(node.expression.expression.text)
                            );
                        }
                        return false;
                    };
                    node.decorators.filter(filterByDecorators).forEach(visitNode);
                } else if (node.symbol) {
                    if (node.symbol.flags === ts.SymbolFlags.Class) {
                        var name = _this2.getSymboleName(node);
                        var IO = _this2.getComponentIO(file, sourceFile);
                        deps = {
                            name: name,
                            file: file,
                            type: 'class',
                            sourceCode: sourceFile.getText()
                        };
                        if (IO.properties) {
                            deps.properties = IO.properties;
                        }
                        if (IO.description) {
                            deps.description = _this2.breakLines(IO.description);
                        }
                        if (IO.methods) {
                            deps.methods = IO.methods;
                        }
                        _this2.debug(deps);
                        outputSymbols['classes'].push(deps);
                    } else if (node.symbol.flags === ts.SymbolFlags.Interface) {
                        var _name = _this2.getSymboleName(node);
                        var _IO = _this2.getInterfaceIO(file, sourceFile, node);
                        deps = {
                            name: _name,
                            file: file,
                            type: 'interface',
                            sourceCode: sourceFile.getText()
                        };
                        if (_IO.properties) {
                            deps.properties = _IO.properties;
                        }
                        if (_IO.kind) {
                            deps.kind = _IO.kind;
                        }
                        if (_IO.description) {
                            deps.description = _this2.breakLines(_IO.description);
                        }
                        if (_IO.methods) {
                            deps.methods = _IO.methods;
                        }
                        _this2.debug(deps);
                        outputSymbols['interfaces'].push(deps);
                    }
                } else {
                    var _IO2 = _this2.getRouteIO(file, sourceFile);
                    if (_IO2.routes) {
                        var newRoutes = void 0;
                        try {
                            newRoutes = JSON.parse(_IO2.routes.replace(/ /gm, ''));
                        } catch (e) {
                            logger.error('Routes parsing error, maybe a trailing comma or an external variable ?');
                            return true;
                        }
                        outputSymbols['routes'] = [].concat(toConsumableArray(outputSymbols['routes']), toConsumableArray(newRoutes));
                    }
                    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
                        var _name2 = _this2.getSymboleName(node);
                        var _IO3 = _this2.getComponentIO(file, sourceFile);
                        deps = {
                            name: _name2,
                            file: file,
                            type: 'class',
                            sourceCode: sourceFile.getText()
                        };
                        if (_IO3.properties) {
                            deps.properties = _IO3.properties;
                        }
                        if (_IO3.description) {
                            deps.description = _this2.breakLines(_IO3.description);
                        }
                        if (_IO3.methods) {
                            deps.methods = _IO3.methods;
                        }
                        _this2.debug(deps);
                        outputSymbols['classes'].push(deps);
                    }
                    if (node.kind === ts.SyntaxKind.ExpressionStatement) {
                        //Find the root module with bootstrapModule call
                        //Find recusively in expression nodes one with name 'bootstrapModule'
                        var rootModule = void 0,
                            resultNode = _this2.findExpressionByName(node, 'bootstrapModule');
                        if (resultNode) {
                            if (resultNode.arguments.length > 0) {
                                _.forEach(resultNode.arguments, function (argument) {
                                    if (argument.text) {
                                        rootModule = argument.text;
                                    }
                                });
                            }
                            if (rootModule) {
                                RouterParser.setRootModule(rootModule);
                            }
                        }
                    }
                }
            });
        }
    }, {
        key: 'debug',
        value: function debug(deps) {
            logger.debug('debug', deps.name + ':');
            ['imports', 'exports', 'declarations', 'providers', 'bootstrap'].forEach(function (symbols) {
                if (deps[symbols] && deps[symbols].length > 0) {
                    logger.debug('', '- ' + symbols + ':');
                    deps[symbols].map(function (i) {
                        return i.name;
                    }).forEach(function (d) {
                        logger.debug('', '\t- ' + d);
                    });
                }
            });
        }
    }, {
        key: 'findExpressionByName',
        value: function findExpressionByName(entryNode, name) {
            var result = void 0,
                loop = function loop(node, name) {
                if (node.expression && !node.expression.name) {
                    loop(node.expression, name);
                }
                if (node.expression && node.expression.name) {
                    if (node.expression.name.text === name) {
                        result = node;
                    }
                }
            };
            loop(entryNode, name);
            return result;
        }
    }, {
        key: 'isComponent',
        value: function isComponent(metadata) {
            return metadata.expression.expression.text === 'Component';
        }
    }, {
        key: 'isPipe',
        value: function isPipe(metadata) {
            return metadata.expression.expression.text === 'Pipe';
        }
    }, {
        key: 'isDirective',
        value: function isDirective(metadata) {
            return metadata.expression.expression.text === 'Directive';
        }
    }, {
        key: 'isInjectable',
        value: function isInjectable(metadata) {
            return metadata.expression.expression.text === 'Injectable';
        }
    }, {
        key: 'isModule',
        value: function isModule(metadata) {
            return metadata.expression.expression.text === 'NgModule';
        }
    }, {
        key: 'getType',
        value: function getType(name) {
            var type = void 0;
            if (name.toLowerCase().indexOf('component') !== -1) {
                type = 'component';
            } else if (name.toLowerCase().indexOf('pipe') !== -1) {
                type = 'pipe';
            } else if (name.toLowerCase().indexOf('module') !== -1) {
                type = 'module';
            } else if (name.toLowerCase().indexOf('directive') !== -1) {
                type = 'directive';
            }
            return type;
        }
    }, {
        key: 'getSymboleName',
        value: function getSymboleName(node) {
            return node.name.text;
        }
    }, {
        key: 'getComponentSelector',
        value: function getComponentSelector(props) {
            return this.getSymbolDeps(props, 'selector').pop();
        }
    }, {
        key: 'getComponentExportAs',
        value: function getComponentExportAs(props) {
            return this.getSymbolDeps(props, 'exportAs').pop();
        }
    }, {
        key: 'getModuleProviders',
        value: function getModuleProviders(props) {
            var _this3 = this;

            return this.getSymbolDeps(props, 'providers').map(function (providerName) {
                return _this3.parseDeepIndentifier(providerName);
            });
        }
    }, {
        key: 'findProps',
        value: function findProps(visitedNode) {
            if (visitedNode.expression.arguments.length > 0) {
                return visitedNode.expression.arguments.pop().properties;
            } else {
                return '';
            }
        }
    }, {
        key: 'getModuleDeclations',
        value: function getModuleDeclations(props) {
            var _this4 = this;

            return this.getSymbolDeps(props, 'declarations').map(function (name) {
                var component = _this4.findComponentSelectorByName(name);
                if (component) {
                    return component;
                }
                return _this4.parseDeepIndentifier(name);
            });
        }
    }, {
        key: 'getModuleImportsRaw',
        value: function getModuleImportsRaw(props) {
            return this.getSymbolDepsRaw(props, 'imports');
        }
    }, {
        key: 'getModuleImports',
        value: function getModuleImports(props) {
            var _this5 = this;

            return this.getSymbolDeps(props, 'imports').map(function (name) {
                return _this5.parseDeepIndentifier(name);
            });
        }
    }, {
        key: 'getModuleExports',
        value: function getModuleExports(props) {
            var _this6 = this;

            return this.getSymbolDeps(props, 'exports').map(function (name) {
                return _this6.parseDeepIndentifier(name);
            });
        }
    }, {
        key: 'getComponentHost',
        value: function getComponentHost(props) {
            return this.getSymbolDepsObject(props, 'host');
        }
    }, {
        key: 'getModuleBootstrap',
        value: function getModuleBootstrap(props) {
            var _this7 = this;

            return this.getSymbolDeps(props, 'bootstrap').map(function (name) {
                return _this7.parseDeepIndentifier(name);
            });
        }
    }, {
        key: 'getComponentInputsMetadata',
        value: function getComponentInputsMetadata(props) {
            return this.getSymbolDeps(props, 'inputs');
        }
    }, {
        key: 'getDecoratorOfType',
        value: function getDecoratorOfType(node, decoratorType) {
            var decorators = node.decorators || [];
            for (var i = 0; i < decorators.length; i++) {
                if (decorators[i].expression.expression.text === decoratorType) {
                    return decorators[i];
                }
            }
            return null;
        }
    }, {
        key: 'visitInput',
        value: function visitInput(property, inDecorator) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            var inArgs = inDecorator.expression.arguments;
            return {
                name: inArgs.length ? inArgs[0].text : property.name.text,
                defaultValue: property.initializer ? this.stringifyDefaultValue(property.initializer) : undefined,
                type: this.visitType(property),
                description: marked__default(ts.displayPartsToString(property.symbol.getDocumentationComment()))
            };
        }
    }, {
        key: 'visitType',
        value: function visitType(node) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            return node ? this.typeCheckerComponent.typeToString(this.typeCheckerComponent.getTypeAtLocation(node)) : 'void';
        }
    }, {
        key: 'visitOutput',
        value: function visitOutput(property, outDecorator) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            var outArgs = outDecorator.expression.arguments;
            return {
                name: outArgs.length ? outArgs[0].text : property.name.text,
                description: marked__default(ts.displayPartsToString(property.symbol.getDocumentationComment()))
            };
        }
    }, {
        key: 'isPublic',
        value: function isPublic(member) {
            if (member.modifiers) {
                var isPublic = member.modifiers.some(function (modifier) {
                    return modifier.kind === ts.SyntaxKind.PublicKeyword;
                });
                if (isPublic) {
                    return true;
                }
            }
            return this.isInternalMember(member);
        }
    }, {
        key: 'isPrivateOrInternal',
        value: function isPrivateOrInternal(member) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            if (member.modifiers) {
                var isPrivate = member.modifiers.some(function (modifier) {
                    return modifier.kind === ts.SyntaxKind.PrivateKeyword;
                });
                if (isPrivate) {
                    return true;
                }
            }
            return this.isInternalMember(member);
        }
    }, {
        key: 'isInternalMember',
        value: function isInternalMember(member) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            var internalTags = ['internal', 'private', 'hidden'];
            if (member.jsDoc) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = member.jsDoc[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var doc = _step.value;

                        if (doc.tags) {
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = doc.tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var tag = _step2.value;

                                    if (internalTags.indexOf(tag.tagName.text) > -1) {
                                        return true;
                                    }
                                }
                            } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                        _iterator2.return();
                                    }
                                } finally {
                                    if (_didIteratorError2) {
                                        throw _iteratorError2;
                                    }
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            return false;
        }
    }, {
        key: 'isAngularLifecycleHook',
        value: function isAngularLifecycleHook(methodName) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            var ANGULAR_LIFECYCLE_METHODS = ['ngOnInit', 'ngOnChanges', 'ngDoCheck', 'ngOnDestroy', 'ngAfterContentInit', 'ngAfterContentChecked', 'ngAfterViewInit', 'ngAfterViewChecked', 'writeValue', 'registerOnChange', 'registerOnTouched', 'setDisabledState'];
            return ANGULAR_LIFECYCLE_METHODS.indexOf(methodName) >= 0;
        }
    }, {
        key: 'visitConstructorDeclaration',
        value: function visitConstructorDeclaration(method) {
            var that = this;
            if (method.parameters) {
                var _parameters = [],
                    i = 0,
                    len = method.parameters.length;
                for (i; i < len; i++) {
                    if (that.isPublic(method.parameters[i])) {
                        _parameters.push(that.visitArgument(method.parameters[i]));
                    }
                }
                return _parameters;
            } else {
                return [];
            }
        }
    }, {
        key: 'visitCallDeclaration',
        value: function visitCallDeclaration(method) {
            var _this8 = this;

            return {
                description: marked__default(ts.displayPartsToString(method.symbol.getDocumentationComment())),
                args: method.parameters ? method.parameters.map(function (prop) {
                    return _this8.visitArgument(prop);
                }) : [],
                returnType: this.visitType(method.type)
            };
        }
    }, {
        key: 'visitIndexDeclaration',
        value: function visitIndexDeclaration(method) {
            var _this9 = this;

            return {
                description: marked__default(ts.displayPartsToString(method.symbol.getDocumentationComment())),
                args: method.parameters ? method.parameters.map(function (prop) {
                    return _this9.visitArgument(prop);
                }) : [],
                returnType: this.visitType(method.type)
            };
        }
    }, {
        key: 'visitMethodDeclaration',
        value: function visitMethodDeclaration(method) {
            var _this10 = this;

            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            var result = {
                name: method.name.text,
                description: marked__default(ts.displayPartsToString(method.symbol.getDocumentationComment())),
                args: method.parameters ? method.parameters.map(function (prop) {
                    return _this10.visitArgument(prop);
                }) : [],
                returnType: this.visitType(method.type)
            },
                jsdoctags = getJSDocs(method);
            if (jsdoctags && jsdoctags.length >= 1) {
                if (jsdoctags[0].tags) {
                    result.jsdoctags = jsdoctags[0].tags;
                }
            }
            return result;
        }
    }, {
        key: 'visitArgument',
        value: function visitArgument(arg) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            return {
                name: arg.name.text,
                type: this.visitType(arg)
            };
        }
    }, {
        key: 'getNamesCompareFn',
        value: function getNamesCompareFn(name) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            name = name || 'name';
            return function (a, b) {
                return a[name].localeCompare(b[name]);
            };
        }
    }, {
        key: 'stringifyDefaultValue',
        value: function stringifyDefaultValue(node) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            if (node.text) {
                return node.text;
            } else if (node.kind === ts.SyntaxKind.FalseKeyword) {
                return 'false';
            } else if (node.kind === ts.SyntaxKind.TrueKeyword) {
                return 'true';
            }
        }
    }, {
        key: 'visitProperty',
        value: function visitProperty(property) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            return {
                name: property.name.text,
                defaultValue: property.initializer ? this.stringifyDefaultValue(property.initializer) : undefined,
                type: this.visitType(property),
                description: marked__default(ts.displayPartsToString(property.symbol.getDocumentationComment()))
            };
        }
    }, {
        key: 'visitMembers',
        value: function visitMembers(members) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            var inputs = [];
            var outputs = [];
            var methods = [];
            var properties = [];
            var kind;
            var inputDecorator, outDecorator;
            for (var i = 0; i < members.length; i++) {
                inputDecorator = this.getDecoratorOfType(members[i], 'Input');
                outDecorator = this.getDecoratorOfType(members[i], 'Output');
                kind = members[i].kind;
                if (inputDecorator) {
                    inputs.push(this.visitInput(members[i], inputDecorator));
                } else if (outDecorator) {
                    outputs.push(this.visitOutput(members[i], outDecorator));
                } else if (!this.isPrivateOrInternal(members[i])) {
                    if ((members[i].kind === ts.SyntaxKind.MethodDeclaration || members[i].kind === ts.SyntaxKind.MethodSignature) && !this.isAngularLifecycleHook(members[i].name.text)) {
                        methods.push(this.visitMethodDeclaration(members[i]));
                    } else if (members[i].kind === ts.SyntaxKind.PropertyDeclaration || members[i].kind === ts.SyntaxKind.PropertySignature || members[i].kind === ts.SyntaxKind.GetAccessor) {
                        properties.push(this.visitProperty(members[i]));
                    } else if (members[i].kind === ts.SyntaxKind.CallSignature) {
                        properties.push(this.visitCallDeclaration(members[i]));
                    } else if (members[i].kind === ts.SyntaxKind.IndexSignature) {
                        properties.push(this.visitIndexDeclaration(members[i]));
                    } else if (members[i].kind === ts.SyntaxKind.Constructor) {
                        var _constructorProperties = this.visitConstructorDeclaration(members[i]),
                            j = 0,
                            len = _constructorProperties.length;
                        for (j; j < len; j++) {
                            properties.push(_constructorProperties[j]);
                        }
                    }
                }
            }
            inputs.sort(this.getNamesCompareFn());
            outputs.sort(this.getNamesCompareFn());
            properties.sort(this.getNamesCompareFn());
            return {
                inputs: inputs,
                outputs: outputs,
                methods: methods,
                properties: properties,
                kind: kind
            };
        }
    }, {
        key: 'visitDirectiveDecorator',
        value: function visitDirectiveDecorator(decorator) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            var selector;
            var exportAs;
            var properties = decorator.expression.arguments[0].properties;
            for (var i = 0; i < properties.length; i++) {
                if (properties[i].name.text === 'selector') {
                    // TODO: this will only work if selector is initialized as a string literal
                    selector = properties[i].initializer.text;
                }
                if (properties[i].name.text === 'exportAs') {
                    // TODO: this will only work if selector is initialized as a string literal
                    exportAs = properties[i].initializer.text;
                }
            }
            return {
                selector: selector,
                exportAs: exportAs
            };
        }
    }, {
        key: 'isPipeDecorator',
        value: function isPipeDecorator(decorator) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            return decorator.expression.expression.text === 'Pipe';
        }
    }, {
        key: 'isModuleDecorator',
        value: function isModuleDecorator(decorator) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            return decorator.expression.expression.text === 'NgModule';
        }
    }, {
        key: 'isDirectiveDecorator',
        value: function isDirectiveDecorator(decorator) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            var decoratorIdentifierText = decorator.expression.expression.text;
            return decoratorIdentifierText === 'Directive' || decoratorIdentifierText === 'Component';
        }
    }, {
        key: 'isServiceDecorator',
        value: function isServiceDecorator(decorator) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            return decorator.expression.expression.text === 'Injectable';
        }
    }, {
        key: 'visitClassDeclaration',
        value: function visitClassDeclaration(fileName, classDeclaration) {
            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            var symbol = this.program.getTypeChecker().getSymbolAtLocation(classDeclaration.name);
            var description = marked__default(ts.displayPartsToString(symbol.getDocumentationComment()));
            var className = classDeclaration.name.text;
            var directiveInfo;
            var members;
            if (classDeclaration.decorators) {
                for (var i = 0; i < classDeclaration.decorators.length; i++) {
                    if (this.isDirectiveDecorator(classDeclaration.decorators[i])) {
                        directiveInfo = this.visitDirectiveDecorator(classDeclaration.decorators[i]);
                        members = this.visitMembers(classDeclaration.members);
                        return {
                            description: description,
                            inputs: members.inputs,
                            outputs: members.outputs,
                            properties: members.properties,
                            methods: members.methods,
                            kind: members.kind
                        };
                    } else if (this.isServiceDecorator(classDeclaration.decorators[i])) {
                        members = this.visitMembers(classDeclaration.members);
                        return [{
                            fileName: fileName,
                            className: className,
                            description: description,
                            methods: members.methods,
                            properties: members.properties,
                            kind: members.kind
                        }];
                    } else if (this.isPipeDecorator(classDeclaration.decorators[i]) || this.isModuleDecorator(classDeclaration.decorators[i])) {
                        return [{
                            fileName: fileName,
                            className: className,
                            description: description
                        }];
                    }
                }
            } else if (description) {
                members = this.visitMembers(classDeclaration.members);
                return [{
                    description: description,
                    methods: members.methods,
                    properties: members.properties,
                    kind: members.kind
                }];
            } else {
                members = this.visitMembers(classDeclaration.members);
                return [{
                    methods: members.methods,
                    properties: members.properties,
                    kind: members.kind
                }];
            }
            return [];
        }
    }, {
        key: 'visitEnumDeclaration',
        value: function visitEnumDeclaration(fileName, node) {
            if (node.declarationList.declarations) {
                var i = 0,
                    len = node.declarationList.declarations.length;
                for (i; i < len; i++) {
                    if (node.declarationList.declarations[i].type) {
                        if (node.declarationList.declarations[i].type.typeName && node.declarationList.declarations[i].type.typeName.text === 'Routes') {
                            RouterParser.addRoute({
                                name: node.declarationList.declarations[i].name.text,
                                data: generate(node.declarationList.declarations[i].initializer)
                            });
                            return [{
                                routes: generate(node.declarationList.declarations[i].initializer)
                            }];
                        }
                    }
                }
            }
            return [];
        }
    }, {
        key: 'getRouteIO',
        value: function getRouteIO(filename, sourceFile) {
            var _this11 = this;

            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            var res = sourceFile.statements.reduce(function (directive, statement) {
                if (statement.kind === ts.SyntaxKind.VariableStatement) {
                    return directive.concat(_this11.visitEnumDeclaration(filename, statement));
                }
                return directive;
            }, []);
            return res[0] || {};
        }
    }, {
        key: 'getComponentIO',
        value: function getComponentIO(filename, sourceFile) {
            var _this12 = this;

            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            var res = sourceFile.statements.reduce(function (directive, statement) {
                if (statement.kind === ts.SyntaxKind.ClassDeclaration) {
                    return directive.concat(_this12.visitClassDeclaration(filename, statement));
                }
                return directive;
            }, []);
            return res[0] || {};
        }
    }, {
        key: 'getInterfaceIO',
        value: function getInterfaceIO(filename, sourceFile, node) {
            var _this13 = this;

            /**
             * Copyright https://github.com/ng-bootstrap/ng-bootstrap
             */
            var res = sourceFile.statements.reduce(function (directive, statement) {
                if (statement.kind === ts.SyntaxKind.InterfaceDeclaration) {
                    if (statement.pos === node.pos && statement.end === node.end) {
                        return directive.concat(_this13.visitClassDeclaration(filename, statement));
                    }
                }
                return directive;
            }, []);
            return res[0] || {};
        }
    }, {
        key: 'getComponentOutputs',
        value: function getComponentOutputs(props) {
            return this.getSymbolDeps(props, 'outputs');
        }
    }, {
        key: 'getComponentProviders',
        value: function getComponentProviders(props) {
            var _this14 = this;

            return this.getSymbolDeps(props, 'providers').map(function (name) {
                return _this14.parseDeepIndentifier(name);
            });
        }
    }, {
        key: 'getComponentViewProviders',
        value: function getComponentViewProviders(props) {
            var _this15 = this;

            return this.getSymbolDeps(props, 'viewProviders').map(function (name) {
                return _this15.parseDeepIndentifier(name);
            });
        }
    }, {
        key: 'getComponentDirectives',
        value: function getComponentDirectives(props) {
            var _this16 = this;

            return this.getSymbolDeps(props, 'directives').map(function (name) {
                var identifier = _this16.parseDeepIndentifier(name);
                identifier.selector = _this16.findComponentSelectorByName(name);
                identifier.label = '';
                return identifier;
            });
        }
    }, {
        key: 'parseDeepIndentifier',
        value: function parseDeepIndentifier(name) {
            var nsModule = name.split('.'),
                type = this.getType(name);
            if (nsModule.length > 1) {
                // cache deps with the same namespace (i.e Shared.*)
                if (this.__nsModule[nsModule[0]]) {
                    this.__nsModule[nsModule[0]].push(name);
                } else {
                    this.__nsModule[nsModule[0]] = [name];
                }
                return {
                    ns: nsModule[0],
                    name: name,
                    type: type
                };
            }
            return {
                name: name,
                type: type
            };
        }
    }, {
        key: 'getComponentTemplateUrl',
        value: function getComponentTemplateUrl(props) {
            return this.sanitizeUrls(this.getSymbolDeps(props, 'templateUrl'));
        }
    }, {
        key: 'getComponentTemplate',
        value: function getComponentTemplate(props) {
            var t = this.getSymbolDeps(props, 'template', true).pop();
            if (t) {
                t = detectIndent(t, 0);
                t = t.replace(/\n/, '');
                t = t.replace(/ +$/gm, '');
            }
            return t;
        }
    }, {
        key: 'getComponentStyleUrls',
        value: function getComponentStyleUrls(props) {
            return this.sanitizeUrls(this.getSymbolDeps(props, 'styleUrls'));
        }
    }, {
        key: 'getComponentStyles',
        value: function getComponentStyles(props) {
            return this.getSymbolDeps(props, 'styles');
        }
    }, {
        key: 'getComponentModuleId',
        value: function getComponentModuleId(props) {
            return this.getSymbolDeps(props, 'moduleId').pop();
        }
    }, {
        key: 'getComponentChangeDetection',
        value: function getComponentChangeDetection(props) {
            return this.getSymbolDeps(props, 'changeDetection').pop();
        }
    }, {
        key: 'getComponentEncapsulation',
        value: function getComponentEncapsulation(props) {
            return this.getSymbolDeps(props, 'encapsulation');
        }
    }, {
        key: 'sanitizeUrls',
        value: function sanitizeUrls(urls) {
            return urls.map(function (url) {
                return url.replace('./', '');
            });
        }
    }, {
        key: 'getSymbolDepsObject',
        value: function getSymbolDepsObject(props, type, multiLine) {
            var deps = props.filter(function (node) {
                return node.name.text === type;
            });
            var parseProperties = function parseProperties(node) {
                var obj = {};
                (node.initializer.properties || []).forEach(function (prop) {
                    obj[prop.name.text] = prop.initializer.text;
                });
                return obj;
            };
            return deps.map(parseProperties).pop();
        }
    }, {
        key: 'getSymbolDepsRaw',
        value: function getSymbolDepsRaw(props, type, multiLine) {
            var deps = props.filter(function (node) {
                return node.name.text === type;
            });
            return deps || [];
        }
    }, {
        key: 'getSymbolDeps',
        value: function getSymbolDeps(props, type, multiLine) {
            var _this17 = this;

            var deps = props.filter(function (node) {
                return node.name.text === type;
            });
            var parseSymbolText = function parseSymbolText(text) {
                if (text.indexOf('/') !== -1 && !multiLine) {
                    text = text.split('/').pop();
                }
                return [text];
            };
            var buildIdentifierName = function buildIdentifierName(node) {
                var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

                if (node.expression) {
                    name = name ? '.' + name : name;
                    var nodeName = _this17.unknown;
                    if (node.name) {
                        nodeName = node.name.text;
                    } else if (node.text) {
                        nodeName = node.text;
                    } else if (node.expression) {
                        if (node.expression.text) {
                            nodeName = node.expression.text;
                        } else if (node.expression.elements) {
                            if (node.expression.kind === ts.SyntaxKind.ArrayLiteralExpression) {
                                nodeName = node.expression.elements.map(function (el) {
                                    return el.text;
                                }).join(', ');
                                nodeName = '[' + nodeName + ']';
                            }
                        }
                    }
                    if (node.kind === ts.SyntaxKind.SpreadElementExpression) {
                        return '...' + nodeName;
                    }
                    return '' + buildIdentifierName(node.expression, nodeName) + name;
                }
                return node.text + '.' + name;
            };
            var parseProviderConfiguration = function parseProviderConfiguration(o) {
                // parse expressions such as:
                // { provide: APP_BASE_HREF, useValue: '/' },
                // or
                // { provide: 'Date', useFactory: (d1, d2) => new Date(), deps: ['d1', 'd2'] }
                var _genProviderName = [];
                var _providerProps = [];
                (o.properties || []).forEach(function (prop) {
                    var identifier = prop.initializer.text;
                    if (prop.initializer.kind === ts.SyntaxKind.StringLiteral) {
                        identifier = '\'' + identifier + '\'';
                    }
                    // lambda function (i.e useFactory)
                    if (prop.initializer.body) {
                        var params = (prop.initializer.parameters || []).map(function (params) {
                            return params.name.text;
                        });
                        identifier = '(' + params.join(', ') + ') => {}';
                    } else if (prop.initializer.elements) {
                        var elements = (prop.initializer.elements || []).map(function (n) {
                            if (n.kind === ts.SyntaxKind.StringLiteral) {
                                return '\'' + n.text + '\'';
                            }
                            return n.text;
                        });
                        identifier = '[' + elements.join(', ') + ']';
                    }
                    _providerProps.push([
                    // i.e provide
                    prop.name.text,
                    // i.e OpaqueToken or 'StringToken'
                    identifier].join(': '));
                });
                return '{ ' + _providerProps.join(', ') + ' }';
            };
            var parseSymbolElements = function parseSymbolElements(o) {
                // parse expressions such as: AngularFireModule.initializeApp(firebaseConfig)
                if (o.arguments) {
                    var className = buildIdentifierName(o.expression);
                    // function arguments could be really complexe. There are so
                    // many use cases that we can't handle. Just print "args" to indicate
                    // that we have arguments.
                    var functionArgs = o.arguments.length > 0 ? 'args' : '';
                    var text = className + '(' + functionArgs + ')';
                    return text;
                } else if (o.expression) {
                    var identifier = buildIdentifierName(o);
                    return identifier;
                }
                return o.text ? o.text : parseProviderConfiguration(o);
            };
            var parseSymbols = function parseSymbols(node) {
                var text = node.initializer.text;
                if (text) {
                    return parseSymbolText(text);
                } else if (node.initializer.expression) {
                    var identifier = parseSymbolElements(node.initializer);
                    return [identifier];
                } else if (node.initializer.elements) {
                    return node.initializer.elements.map(parseSymbolElements);
                }
            };
            return deps.map(parseSymbols).pop() || [];
        }
    }, {
        key: 'findComponentSelectorByName',
        value: function findComponentSelectorByName(name) {
            return this.__cache[name];
        }
    }]);
    return Dependencies;
}();

var glob = require('glob');
var pkg = require('../package.json');
var cwd = process.cwd();
var $htmlengine = new HtmlEngine();
var $fileengine = new FileEngine();
var $markdownengine = new MarkdownEngine();
var $ngdengine = new NgdEngine();
var $searchEngine = new SearchEngine();
var startTime = new Date();

var Application = function () {
    /**
     * Create a new compodoc application instance.
     *
     * @param options An object containing the options that should be used.
     */
    function Application(options) {
        var _this = this;

        classCallCheck(this, Application);

        this.preparePipes = function () {
            logger.info('Prepare pipes');
            _this.configuration.mainData.pipes = $dependenciesEngine.getPipes();
            var i = 0,
                len = _this.configuration.mainData.pipes.length;
            for (i; i < len; i++) {
                _this.configuration.addPage({
                    path: 'pipes',
                    name: _this.configuration.mainData.pipes[i].name,
                    context: 'pipe',
                    pipe: _this.configuration.mainData.pipes[i]
                });
            }
        };
        this.prepareClasses = function () {
            logger.info('Prepare classes');
            _this.configuration.mainData.classes = $dependenciesEngine.getClasses();
            var i = 0,
                len = _this.configuration.mainData.classes.length;
            for (i; i < len; i++) {
                _this.configuration.addPage({
                    path: 'classes',
                    name: _this.configuration.mainData.classes[i].name,
                    context: 'class',
                    class: _this.configuration.mainData.classes[i]
                });
            }
        };
        this.prepareDirectives = function () {
            logger.info('Prepare directives');
            _this.configuration.mainData.directives = $dependenciesEngine.getDirectives();
            var i = 0,
                len = _this.configuration.mainData.directives.length;
            for (i; i < len; i++) {
                _this.configuration.addPage({
                    path: 'directives',
                    name: _this.configuration.mainData.directives[i].name,
                    context: 'directive',
                    directive: _this.configuration.mainData.directives[i]
                });
            }
        };
        this.configuration = Configuration.getInstance();
        for (var option in options) {
            if (typeof this.configuration.mainData[option] !== 'undefined') {
                this.configuration.mainData[option] = options[option];
            }
        }
    }
    /**
     * Start compodoc
     */


    createClass(Application, [{
        key: 'generate',
        value: function generate() {
            var _this2 = this;

            $htmlengine.init().then(function () {
                _this2.processPackageJson();
            });
        }
    }, {
        key: 'setFiles',
        value: function setFiles(files) {
            this.files = files;
        }
    }, {
        key: 'processPackageJson',
        value: function processPackageJson() {
            var _this3 = this;

            logger.info('Searching package.json file');
            $fileengine.get('package.json').then(function (packageData) {
                var parsedData = JSON.parse(packageData);
                if (typeof parsedData.name !== 'undefined' && _this3.configuration.mainData.documentationMainName === COMPODOC_DEFAULTS.title) {
                    _this3.configuration.mainData.documentationMainName = parsedData.name + ' documentation';
                }
                if (typeof parsedData.description !== 'undefined') {
                    _this3.configuration.mainData.documentationMainDescription = parsedData.description;
                }
                logger.info('package.json file found');
                _this3.processMarkdown();
            }, function (errorMessage) {
                logger.error(errorMessage);
                logger.error('Continuing without package.json file');
                _this3.processMarkdown();
            });
        }
    }, {
        key: 'processMarkdown',
        value: function processMarkdown() {
            var _this4 = this;

            logger.info('Searching README.md file');
            $markdownengine.getReadmeFile().then(function (readmeData) {
                _this4.configuration.addPage({
                    name: 'index',
                    context: 'readme'
                });
                _this4.configuration.addPage({
                    name: 'overview',
                    context: 'overview'
                });
                _this4.configuration.mainData.readme = readmeData;
                logger.info('README.md file found');
                _this4.getDependenciesData();
            }, function (errorMessage) {
                logger.error(errorMessage);
                logger.error('Continuing without README.md file');
                _this4.configuration.addPage({
                    name: 'index',
                    context: 'overview'
                });
                _this4.getDependenciesData();
            });
        }
    }, {
        key: 'getDependenciesData',
        value: function getDependenciesData() {
            var _this5 = this;

            logger.info('Get dependencies data');
            var crawler = new Dependencies(this.files, {
                tsconfigDirectory: cwd
            });
            var dependenciesData = crawler.getDependencies();
            $dependenciesEngine.init(dependenciesData);
            //RouterParser.printRoutes();
            this.prepareModules();
            this.prepareComponents().then(function (readmeData) {
                if ($dependenciesEngine.directives.length > 0) {
                    _this5.prepareDirectives();
                }
                if ($dependenciesEngine.injectables.length > 0) {
                    _this5.prepareInjectables();
                }
                if ($dependenciesEngine.routes.length > 0) {
                    _this5.prepareRoutes();
                }
                if ($dependenciesEngine.pipes.length > 0) {
                    _this5.preparePipes();
                }
                if ($dependenciesEngine.classes.length > 0) {
                    _this5.prepareClasses();
                }
                if ($dependenciesEngine.interfaces.length > 0) {
                    _this5.prepareInterfaces();
                }
                if (!_this5.configuration.mainData.disableCoverage) {
                    _this5.prepareCoverage();
                }
                _this5.processPages();
            }, function (errorMessage) {
                logger.error(errorMessage);
            });
        }
    }, {
        key: 'prepareModules',
        value: function prepareModules() {
            logger.info('Prepare modules');
            this.configuration.mainData.modules = $dependenciesEngine.getModules();
            this.configuration.addPage({
                name: 'modules',
                context: 'modules'
            });
            var i = 0,
                len = this.configuration.mainData.modules.length;
            for (i; i < len; i++) {
                this.configuration.addPage({
                    path: 'modules',
                    name: this.configuration.mainData.modules[i].name,
                    context: 'module',
                    module: this.configuration.mainData.modules[i]
                });
            }
        }
    }, {
        key: 'prepareInterfaces',
        value: function prepareInterfaces() {
            logger.info('Prepare interfaces');
            this.configuration.mainData.interfaces = $dependenciesEngine.getInterfaces();
            var i = 0,
                len = this.configuration.mainData.interfaces.length;
            for (i; i < len; i++) {
                this.configuration.addPage({
                    path: 'interfaces',
                    name: this.configuration.mainData.interfaces[i].name,
                    context: 'interface',
                    interface: this.configuration.mainData.interfaces[i]
                });
            }
        }
    }, {
        key: 'prepareComponents',
        value: function prepareComponents() {
            logger.info('Prepare components');
            var that = this;
            that.configuration.mainData.components = $dependenciesEngine.getComponents();
            return new Promise(function (resolve$$1, reject) {
                var i = 0,
                    len = that.configuration.mainData.components.length,
                    loop = function loop() {
                    if (i <= len - 1) {
                        var dirname$$1 = path.dirname(that.configuration.mainData.components[i].file),
                            readmeFile = dirname$$1 + path.sep + 'README.md';
                        if (fs.existsSync(readmeFile)) {
                            logger.info('README.md exist for this component, include it');
                            fs.readFile(readmeFile, 'utf8', function (err, data) {
                                if (err) throw err;
                                that.configuration.mainData.components[i].readme = marked__default(data);
                                that.configuration.addPage({
                                    path: 'components',
                                    name: that.configuration.mainData.components[i].name,
                                    context: 'component',
                                    component: that.configuration.mainData.components[i]
                                });
                                i++;
                                loop();
                            });
                        } else {
                            that.configuration.addPage({
                                path: 'components',
                                name: that.configuration.mainData.components[i].name,
                                context: 'component',
                                component: that.configuration.mainData.components[i]
                            });
                            i++;
                            loop();
                        }
                    } else {
                        resolve$$1();
                    }
                };
                loop();
            });
        }
    }, {
        key: 'prepareInjectables',
        value: function prepareInjectables() {
            logger.info('Prepare injectables');
            this.configuration.mainData.injectables = $dependenciesEngine.getInjectables();
            var i = 0,
                len = this.configuration.mainData.injectables.length;
            for (i; i < len; i++) {
                this.configuration.addPage({
                    path: 'injectables',
                    name: this.configuration.mainData.injectables[i].name,
                    context: 'injectable',
                    injectable: this.configuration.mainData.injectables[i]
                });
            }
        }
    }, {
        key: 'prepareRoutes',
        value: function prepareRoutes() {
            logger.info('Process routes');
            this.configuration.mainData.routes = $dependenciesEngine.getRoutes();
            this.configuration.addPage({
                name: 'routes',
                context: 'routes'
            });
        }
    }, {
        key: 'prepareCoverage',
        value: function prepareCoverage() {
            logger.info('Process documentation coverage report');
            /*
             * loop with components, classes, injectables, interfaces, pipes
             */
            var files = [],
                totalProjectStatementDocumented = 0,
                getStatus = function getStatus(percent) {
                var status;
                if (percent <= 25) {
                    status = 'low';
                } else if (percent > 25 && percent <= 50) {
                    status = 'medium';
                } else if (percent > 50 && percent <= 75) {
                    status = 'good';
                } else {
                    status = 'very-good';
                }
                return status;
            };
            _.forEach(this.configuration.mainData.components, function (component) {
                var cl = {
                    filePath: component.file,
                    type: component.type,
                    name: component.name
                },
                    totalStatementDocumented = 0,
                    totalStatements = component.propertiesClass.length + component.methodsClass.length + component.inputsClass.length + component.outputsClass.length;
                _.forEach(component.propertiesClass, function (property) {
                    if (property.description !== '') {
                        totalStatementDocumented += 1;
                    }
                });
                _.forEach(component.methodsClass, function (method) {
                    if (method.description !== '') {
                        totalStatementDocumented += 1;
                    }
                });
                _.forEach(component.inputsClass, function (input) {
                    if (input.description !== '') {
                        totalStatementDocumented += 1;
                    }
                });
                _.forEach(component.outputsClass, function (output) {
                    if (output.description !== '') {
                        totalStatementDocumented += 1;
                    }
                });
                cl.coveragePercent = Math.floor(totalStatementDocumented / totalStatements * 100);
                if (totalStatements === 0) {
                    cl.coveragePercent = 0;
                }
                cl.coverageCount = totalStatementDocumented + '/' + totalStatements;
                cl.status = getStatus(cl.coveragePercent);
                totalProjectStatementDocumented += cl.coveragePercent;
                files.push(cl);
            });
            _.forEach(this.configuration.mainData.classes, function (classe) {
                var cl = {
                    filePath: classe.file,
                    type: 'classe',
                    name: classe.name
                },
                    totalStatementDocumented = 0,
                    totalStatements = classe.properties.length + classe.methods.length;
                _.forEach(classe.properties, function (property) {
                    if (property.description !== '') {
                        totalStatementDocumented += 1;
                    }
                });
                _.forEach(classe.methods, function (method) {
                    if (method.description !== '') {
                        totalStatementDocumented += 1;
                    }
                });
                cl.coveragePercent = Math.floor(totalStatementDocumented / totalStatements * 100);
                if (totalStatements === 0) {
                    cl.coveragePercent = 0;
                }
                cl.coverageCount = totalStatementDocumented + '/' + totalStatements;
                cl.status = getStatus(cl.coveragePercent);
                totalProjectStatementDocumented += cl.coveragePercent;
                files.push(cl);
            });
            _.forEach(this.configuration.mainData.injectables, function (injectable) {
                var cl = {
                    filePath: injectable.file,
                    type: injectable.type,
                    name: injectable.name
                },
                    totalStatementDocumented = 0,
                    totalStatements = injectable.properties.length + injectable.methods.length;
                _.forEach(injectable.properties, function (property) {
                    if (property.description !== '') {
                        totalStatementDocumented += 1;
                    }
                });
                _.forEach(injectable.methods, function (method) {
                    if (method.description !== '') {
                        totalStatementDocumented += 1;
                    }
                });
                cl.coveragePercent = Math.floor(totalStatementDocumented / totalStatements * 100);
                if (totalStatements === 0) {
                    cl.coveragePercent = 0;
                }
                cl.coverageCount = totalStatementDocumented + '/' + totalStatements;
                cl.status = getStatus(cl.coveragePercent);
                totalProjectStatementDocumented += cl.coveragePercent;
                files.push(cl);
            });
            _.forEach(this.configuration.mainData.interfaces, function (inter) {
                var cl = {
                    filePath: inter.file,
                    type: inter.type,
                    name: inter.name
                },
                    totalStatementDocumented = 0,
                    totalStatements = inter.properties.length + inter.methods.length;
                _.forEach(inter.properties, function (property) {
                    if (property.description !== '') {
                        totalStatementDocumented += 1;
                    }
                });
                _.forEach(inter.methods, function (method) {
                    if (method.description !== '') {
                        totalStatementDocumented += 1;
                    }
                });
                cl.coveragePercent = Math.floor(totalStatementDocumented / totalStatements * 100);
                if (totalStatements === 0) {
                    cl.coveragePercent = 0;
                }
                cl.coverageCount = totalStatementDocumented + '/' + totalStatements;
                cl.status = getStatus(cl.coveragePercent);
                totalProjectStatementDocumented += cl.coveragePercent;
                files.push(cl);
            });
            _.forEach(this.configuration.mainData.pipes, function (pipe) {
                var cl = {
                    filePath: pipe.file,
                    type: pipe.type,
                    name: pipe.name
                },
                    totalStatementDocumented = 0,
                    totalStatements = 1;
                if (pipe.description !== '') {
                    totalStatementDocumented += 1;
                }
                cl.coveragePercent = Math.floor(totalStatementDocumented / totalStatements * 100);
                cl.coverageCount = totalStatementDocumented + '/' + totalStatements;
                cl.status = getStatus(cl.coveragePercent);
                totalProjectStatementDocumented += cl.coveragePercent;
                files.push(cl);
            });
            files = _.sortBy(files, ['filePath']);
            var coverageData = {
                count: Math.floor(totalProjectStatementDocumented / files.length),
                status: ''
            };
            coverageData.status = getStatus(coverageData.count);
            this.configuration.addPage({
                name: 'coverage',
                context: 'coverage',
                files: files,
                data: coverageData
            });
        }
    }, {
        key: 'processPages',
        value: function processPages() {
            var _this6 = this;

            logger.info('Process pages');
            var pages = this.configuration.pages,
                i = 0,
                len = pages.length,
                loop = function loop() {
                if (i <= len - 1) {
                    logger.info('Process page', pages[i].name);
                    $htmlengine.render(_this6.configuration.mainData, pages[i]).then(function (htmlData) {
                        var finalPath = _this6.configuration.mainData.output;
                        if (_this6.configuration.mainData.output.lastIndexOf('/') === -1) {
                            finalPath += '/';
                        }
                        if (pages[i].path) {
                            finalPath += pages[i].path + '/';
                        }
                        finalPath += pages[i].name + '.html';
                        $searchEngine.indexPage({
                            infos: pages[i],
                            rawData: htmlData,
                            url: finalPath
                        });
                        fs.outputFile(path.resolve(finalPath), htmlData, function (err) {
                            if (err) {
                                logger.error('Error during ' + pages[i].name + ' page generation');
                            } else {
                                i++;
                                loop();
                            }
                        });
                    }, function (errorMessage) {
                        logger.error(errorMessage);
                    });
                } else {
                    $searchEngine.generateSearchIndexJson(_this6.configuration.mainData.output);
                    _this6.processResources();
                }
            };
            loop();
        }
    }, {
        key: 'processResources',
        value: function processResources() {
            logger.info('Copy main resources');
            var that = this;
            fs.copy(path.resolve(__dirname + '/../src/resources/'), path.resolve(process.cwd() + path.sep + this.configuration.mainData.output), function (err) {
                if (err) {
                    logger.error('Error during resources copy ', err);
                } else {
                    if (that.configuration.mainData.extTheme) {
                        fs.copy(path.resolve(process.cwd() + path.sep + that.configuration.mainData.extTheme), path.resolve(process.cwd() + path.sep + that.configuration.mainData.output + '/styles/'), function (err) {
                            if (err) {
                                logger.error('Error during external styling theme copy ', err);
                            } else {
                                logger.info('External styling theme copy succeeded');
                                that.processGraphs();
                            }
                        });
                    } else {
                        that.processGraphs();
                    }
                }
            });
        }
    }, {
        key: 'processGraphs',
        value: function processGraphs() {
            var _this7 = this;

            var onComplete = function onComplete() {
                var finalTime = (new Date() - startTime) / 1000;
                logger.info('Documentation generated in ' + _this7.configuration.mainData.output + ' in ' + finalTime + ' seconds using ' + _this7.configuration.mainData.theme + ' theme');
                if (_this7.configuration.mainData.serve) {
                    logger.info('Serving documentation from ' + _this7.configuration.mainData.output + ' at http://127.0.0.1:' + _this7.configuration.mainData.port);
                    _this7.runWebServer(_this7.configuration.mainData.output);
                }
            };
            if (this.configuration.mainData.disableGraph) {
                logger.info('Graph generation disabled');
                onComplete();
            } else {
                (function () {
                    logger.info('Process main graph');
                    var modules = _this7.configuration.mainData.modules,
                        i = 0,
                        len = modules.length,
                        loop = function loop() {
                        if (i <= len - 1) {
                            logger.info('Process module graph', modules[i].name);
                            var finalPath = _this7.configuration.mainData.output;
                            if (_this7.configuration.mainData.output.lastIndexOf('/') === -1) {
                                finalPath += '/';
                            }
                            finalPath += 'modules/' + modules[i].name;
                            $ngdengine.renderGraph(modules[i].file, finalPath, 'f').then(function () {
                                i++;
                                loop();
                            }, function (errorMessage) {
                                logger.error(errorMessage);
                            });
                        } else {
                            onComplete();
                        }
                    };
                    var finalMainGraphPath = _this7.configuration.mainData.output;
                    if (finalMainGraphPath.lastIndexOf('/') === -1) {
                        finalMainGraphPath += '/';
                    }
                    finalMainGraphPath += 'graph';
                    $ngdengine.renderGraph(_this7.configuration.mainData.tsconfig, path.resolve(finalMainGraphPath), 'p').then(function () {
                        loop();
                    }, function (err) {
                        logger.error('Error during graph generation: ', err);
                    });
                })();
            }
        }
    }, {
        key: 'runWebServer',
        value: function runWebServer(folder) {
            LiveServer.start({
                root: folder,
                open: this.configuration.mainData.open,
                quiet: true,
                logLevel: 0,
                port: this.configuration.mainData.port
            });
        }
        /**
         * Return the application / root component instance.
         */

    }, {
        key: 'application',
        get: function get$$1() {
            return this;
        }
    }, {
        key: 'isCLI',
        get: function get$$1() {
            return false;
        }
    }]);
    return Application;
}();

var pkg$2 = require('../package.json');
var program = require('commander');
var files = [];
var cwd$1 = process.cwd();

var CliApplication = function (_Application) {
    inherits(CliApplication, _Application);

    function CliApplication() {
        classCallCheck(this, CliApplication);
        return possibleConstructorReturn(this, (CliApplication.__proto__ || Object.getPrototypeOf(CliApplication)).apply(this, arguments));
    }

    createClass(CliApplication, [{
        key: 'generate',

        /**
         * Run compodoc from the command line.
         */
        value: function generate() {
            var _this2 = this;

            program.version(pkg$2.version).usage('<src> [options]').option('-p, --tsconfig [config]', 'A tsconfig.json file').option('-d, --output [folder]', 'Where to store the generated documentation (default: ./documentation)', COMPODOC_DEFAULTS.folder).option('-b, --base [base]', 'Base reference of html tag <base>', COMPODOC_DEFAULTS.base).option('-y, --extTheme [file]', 'External styling theme file').option('-n, --name [name]', 'Title documentation', COMPODOC_DEFAULTS.title).option('-o, --open', 'Open the generated documentation', false).option('-t, --silent', 'In silent mode, log messages aren\'t logged in the console', false).option('-s, --serve', 'Serve generated documentation (default http://localhost:8080/)', false).option('-r, --port [port]', 'Change default serving port', COMPODOC_DEFAULTS.port).option('--theme [theme]', 'Choose one of available themes, default is \'gitbook\' (laravel, original, postmark, readthedocs, stripe, vagrant)').option('--hideGenerator', 'Do not print the Compodoc link at the bottom of the page', false).option('--disableSourceCode', 'Do not add source code tab', false).option('--disableGraph', 'Do not add the dependency graph', false).option('--disableCoverage', 'Do not add the documentation coverage report', false).parse(process.argv);
            var outputHelp = function outputHelp() {
                program.outputHelp();
                process.exit(1);
            };
            if (program.output) {
                this.configuration.mainData.output = program.output;
            }
            if (program.base) {
                this.configuration.mainData.base = program.base;
            }
            if (program.extTheme) {
                this.configuration.mainData.extTheme = program.extTheme;
            }
            if (program.theme) {
                this.configuration.mainData.theme = program.theme;
            }
            if (program.name) {
                this.configuration.mainData.documentationMainName = program.name;
            }
            if (program.open) {
                this.configuration.mainData.open = program.open;
            }
            if (program.includes) {
                this.configuration.mainData.includes = program.includes;
            }
            if (program.includesName) {
                this.configuration.mainData.includesName = program.includesName;
            }
            if (program.silent) {
                logger.silent = false;
            }
            if (program.serve) {
                this.configuration.mainData.serve = program.serve;
            }
            if (program.port) {
                this.configuration.mainData.port = program.port;
            }
            if (program.hideGenerator) {
                this.configuration.mainData.hideGenerator = program.hideGenerator;
            }
            if (program.disableSourceCode) {
                this.configuration.mainData.disableSourceCode = program.disableSourceCode;
            }
            if (program.disableGraph) {
                this.configuration.mainData.disableGraph = program.disableGraph;
            }
            if (program.disableCoverage) {
                this.configuration.mainData.disableCoverage = program.disableCoverage;
            }
            if (program.serve && !program.tsconfig && program.output) {
                // if -s & -d, serve it
                if (!fs.existsSync(program.output)) {
                    logger.error(program.output + ' folder doesn\'t exist');
                    process.exit(1);
                } else {
                    logger.info('Serving documentation from ' + program.output + ' at http://127.0.0.1:' + program.port);
                    get(CliApplication.prototype.__proto__ || Object.getPrototypeOf(CliApplication.prototype), 'runWebServer', this).call(this, program.output);
                }
            } else if (program.serve && !program.tsconfig && !program.output) {
                // if only -s find ./documentation, if ok serve, else error provide -d
                if (!fs.existsSync(program.output)) {
                    logger.error('Provide output generated folder with -d flag');
                    process.exit(1);
                } else {
                    logger.info('Serving documentation from ' + program.output + ' at http://127.0.0.1:' + program.port);
                    get(CliApplication.prototype.__proto__ || Object.getPrototypeOf(CliApplication.prototype), 'runWebServer', this).call(this, program.output);
                }
            } else {
                (function () {
                    if (program.hideGenerator) {
                        _this2.configuration.mainData.hideGenerator = true;
                    }
                    var defaultWalkFOlder = cwd$1 || '.',
                        walk = function walk(dir, exclude) {
                        var results = [];
                        var list = fs.readdirSync(dir);
                        list.forEach(function (file) {
                            if (exclude.indexOf(file) < 0 && dir.indexOf('node_modules') < 0) {
                                file = path.join(dir, file);
                                var stat = fs.statSync(file);
                                if (stat && stat.isDirectory()) {
                                    results = results.concat(walk(file, exclude));
                                } else if (/(spec|\.d)\.ts/.test(file)) {
                                    logger.debug('Ignoring', file);
                                } else if (path.extname(file) === '.ts') {
                                    logger.debug('Including', file);
                                    results.push(file);
                                }
                            }
                        });
                        return results;
                    };
                    if (program.tsconfig && program.args.length === 0) {
                        _this2.configuration.mainData.tsconfig = program.tsconfig;
                        if (!fs.existsSync(program.tsconfig)) {
                            logger.error('"tsconfig.json" file was not found in the current directory');
                            process.exit(1);
                        } else {
                            var _file = path.join(path.join(process.cwd(), path.dirname(_this2.configuration.mainData.tsconfig)), path.basename(_this2.configuration.mainData.tsconfig));
                            logger.info('Using tsconfig', _file);
                            files = require(_file).files;
                            // use the current directory of tsconfig.json as a working directory
                            cwd$1 = _file.split(path.sep).slice(0, -1).join(path.sep);
                            if (!files) {
                                var exclude = require(_file).exclude || [];
                                files = walk(cwd$1 || '.', exclude);
                            }
                            get(CliApplication.prototype.__proto__ || Object.getPrototypeOf(CliApplication.prototype), 'setFiles', _this2).call(_this2, files);
                            get(CliApplication.prototype.__proto__ || Object.getPrototypeOf(CliApplication.prototype), 'generate', _this2).call(_this2);
                        }
                    } else if (program.tsconfig && program.args.length > 0) {
                        _this2.configuration.mainData.tsconfig = program.tsconfig;
                        var sourceFolder = program.args[0];
                        if (!fs.existsSync(sourceFolder)) {
                            logger.error('Provided source folder ' + sourceFolder + ' was not found in the current directory');
                            process.exit(1);
                        } else {
                            logger.info('Using provided source folder');
                            files = walk(path.resolve(sourceFolder), []);
                            get(CliApplication.prototype.__proto__ || Object.getPrototypeOf(CliApplication.prototype), 'setFiles', _this2).call(_this2, files);
                            get(CliApplication.prototype.__proto__ || Object.getPrototypeOf(CliApplication.prototype), 'generate', _this2).call(_this2);
                        }
                    } else {
                        logger.error('tsconfig.json file was not found, please use -p flag');
                        outputHelp();
                    }
                })();
            }
        }
    }]);
    return CliApplication;
}(Application);

exports.Application = Application;
exports.CliApplication = CliApplication;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2dnZXIudHMiLCIuLi9zcmMvdXRpbHMvYW5ndWxhci1hcGkudHMiLCIuLi9zcmMvYXBwL2VuZ2luZXMvZGVwZW5kZW5jaWVzLmVuZ2luZS50cyIsIi4uL3NyYy9hcHAvZW5naW5lcy9odG1sLmVuZ2luZS50cyIsIi4uL3NyYy9hcHAvZW5naW5lcy9tYXJrZG93bi5lbmdpbmUudHMiLCIuLi9zcmMvYXBwL2VuZ2luZXMvZmlsZS5lbmdpbmUudHMiLCIuLi9zcmMvdXRpbHMvZGVmYXVsdHMudHMiLCIuLi9zcmMvYXBwL2NvbmZpZ3VyYXRpb24udHMiLCIuLi9zcmMvdXRpbHMvZ2xvYmFsLnBhdGgudHMiLCIuLi9zcmMvYXBwL2VuZ2luZXMvbmdkLmVuZ2luZS50cyIsIi4uL3NyYy9hcHAvZW5naW5lcy9zZWFyY2guZW5naW5lLnRzIiwiLi4vc3JjL3V0aWxzL3RzLWludGVybmFsLnRzIiwiLi4vc3JjL3V0aWxpdGllcy50cyIsIi4uL3NyYy91dGlscy9yb3V0ZXIucGFyc2VyLnRzIiwiLi4vc3JjL2FwcC9jb21waWxlci9jb2RlZ2VuLnRzIiwiLi4vc3JjL2FwcC9jb21waWxlci9kZXBlbmRlbmNpZXMudHMiLCIuLi9zcmMvYXBwL2FwcGxpY2F0aW9uLnRzIiwiLi4vc3JjL2luZGV4LWNsaS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgZ3V0aWwgPSByZXF1aXJlKCdndWxwLXV0aWwnKVxubGV0IGMgPSBndXRpbC5jb2xvcnM7XG5sZXQgcGtnID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG5cbmVudW0gTEVWRUwge1xuXHRJTkZPLFxuXHRERUJVRyxcbiAgICBFUlJPUlxufVxuXG5jbGFzcyBMb2dnZXIge1xuXG5cdG5hbWU7XG5cdGxvZ2dlcjtcblx0dmVyc2lvbjtcblx0c2lsZW50O1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMubmFtZSA9IHBrZy5uYW1lO1xuXHRcdHRoaXMudmVyc2lvbiA9IHBrZy52ZXJzaW9uO1xuXHRcdHRoaXMubG9nZ2VyID0gZ3V0aWwubG9nO1xuXHRcdHRoaXMuc2lsZW50ID0gdHJ1ZTtcblx0fVxuXG5cdGluZm8oLi4uYXJncykge1xuXHRcdGlmKCF0aGlzLnNpbGVudCkgcmV0dXJuO1xuXHRcdHRoaXMubG9nZ2VyKFxuXHRcdFx0dGhpcy5mb3JtYXQoTEVWRUwuSU5GTywgLi4uYXJncylcblx0XHQpO1xuXHR9XG5cblx0ZXJyb3IoLi4uYXJncykge1xuXHRcdGlmKCF0aGlzLnNpbGVudCkgcmV0dXJuO1xuXHRcdHRoaXMubG9nZ2VyKFxuXHRcdFx0dGhpcy5mb3JtYXQoTEVWRUwuRVJST1IsIC4uLmFyZ3MpXG5cdFx0KTtcblx0fVxuXG5cdGRlYnVnKC4uLmFyZ3MpIHtcblx0XHRpZighdGhpcy5zaWxlbnQpIHJldHVybjtcblx0XHR0aGlzLmxvZ2dlcihcblx0XHRcdHRoaXMuZm9ybWF0KExFVkVMLkRFQlVHLCAuLi5hcmdzKVxuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIGZvcm1hdChsZXZlbCwgLi4uYXJncykge1xuXG5cdFx0bGV0IHBhZCA9IChzLCBsLCBjPScnKSA9PiB7XG5cdFx0XHRyZXR1cm4gcyArIEFycmF5KCBNYXRoLm1heCgwLCBsIC0gcy5sZW5ndGggKyAxKSkuam9pbiggYyApXG5cdFx0fTtcblxuXHRcdGxldCBtc2cgPSBhcmdzLmpvaW4oJyAnKTtcblx0XHRpZihhcmdzLmxlbmd0aCA+IDEpIHtcblx0XHRcdG1zZyA9IGAkeyBwYWQoYXJncy5zaGlmdCgpLCAxNSwgJyAnKSB9OiAkeyBhcmdzLmpvaW4oJyAnKSB9YDtcblx0XHR9XG5cblxuXHRcdHN3aXRjaChsZXZlbCkge1xuXHRcdFx0Y2FzZSBMRVZFTC5JTkZPOlxuXHRcdFx0XHRtc2cgPSBjLmdyZWVuKG1zZyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIExFVkVMLkRFQlVHOlxuXHRcdFx0XHRtc2cgPSBjLmN5YW4obXNnKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgTEVWRUwuRVJST1I6XG5cdFx0XHRcdG1zZyA9IGMucmVkKG1zZyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdHJldHVybiBbXG5cdFx0XHRtc2dcblx0XHRdLmpvaW4oJycpO1xuXHR9XG59XG5cbmV4cG9ydCBsZXQgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuIiwiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5sZXQgQW5ndWxhckFQSXMgPSByZXF1aXJlKCcuLi9zcmMvZGF0YS9hcGktbGlzdC5qc29uJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kZXJJbkFuZ3VsYXJBUElzKHR5cGU6IHN0cmluZykge1xuICAgIGxldCBfcmVzdWx0ID0ge1xuICAgICAgICBzb3VyY2U6ICdleHRlcm5hbCcsXG4gICAgICAgIGRhdGE6IG51bGxcbiAgICB9O1xuXG4gICAgXy5mb3JFYWNoKEFuZ3VsYXJBUElzLCBmdW5jdGlvbihhbmd1bGFyTW9kdWxlQVBJcywgYW5ndWxhck1vZHVsZSkge1xuICAgICAgICBsZXQgaSA9IDAsXG4gICAgICAgICAgICBsZW4gPSBhbmd1bGFyTW9kdWxlQVBJcy5sZW5ndGg7XG4gICAgICAgIGZvciAoaTsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXJNb2R1bGVBUElzW2ldLnRpdGxlID09PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgX3Jlc3VsdC5kYXRhID0gYW5ndWxhck1vZHVsZUFQSXNbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIF9yZXN1bHQ7XG59XG4iLCJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IGZpbmRlckluQW5ndWxhckFQSXMgfSBmcm9tICcuLi8uLi91dGlscy9hbmd1bGFyLWFwaSc7XG5cbmNsYXNzIERlcGVuZGVuY2llc0VuZ2luZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkRlcGVuZGVuY2llc0VuZ2luZSA9IG5ldyBEZXBlbmRlbmNpZXNFbmdpbmUoKTtcbiAgICByYXdEYXRhOiBPYmplY3Q7XG4gICAgbW9kdWxlczogT2JqZWN0W107XG4gICAgY29tcG9uZW50czogT2JqZWN0W107XG4gICAgZGlyZWN0aXZlczogT2JqZWN0W107XG4gICAgaW5qZWN0YWJsZXM6IE9iamVjdFtdO1xuICAgIGludGVyZmFjZXM6IE9iamVjdFtdO1xuICAgIHJvdXRlczogT2JqZWN0W107XG4gICAgcGlwZXM6IE9iamVjdFtdO1xuICAgIGNsYXNzZXM6IE9iamVjdFtdO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBpZihEZXBlbmRlbmNpZXNFbmdpbmUuX2luc3RhbmNlKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3I6IEluc3RhbnRpYXRpb24gZmFpbGVkOiBVc2UgRGVwZW5kZW5jaWVzRW5naW5lLmdldEluc3RhbmNlKCkgaW5zdGVhZCBvZiBuZXcuJyk7XG4gICAgICAgIH1cbiAgICAgICAgRGVwZW5kZW5jaWVzRW5naW5lLl9pbnN0YW5jZSA9IHRoaXM7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpEZXBlbmRlbmNpZXNFbmdpbmVcbiAgICB7XG4gICAgICAgIHJldHVybiBEZXBlbmRlbmNpZXNFbmdpbmUuX2luc3RhbmNlO1xuICAgIH1cbiAgICBpbml0KGRhdGE6IE9iamVjdCkge1xuICAgICAgICB0aGlzLnJhd0RhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLm1vZHVsZXMgPSBfLnNvcnRCeSh0aGlzLnJhd0RhdGEubW9kdWxlcywgWyduYW1lJ10pO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBfLnNvcnRCeSh0aGlzLnJhd0RhdGEuY29tcG9uZW50cywgWyduYW1lJ10pO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZXMgPSBfLnNvcnRCeSh0aGlzLnJhd0RhdGEuZGlyZWN0aXZlcywgWyduYW1lJ10pO1xuICAgICAgICB0aGlzLmluamVjdGFibGVzID0gXy5zb3J0QnkodGhpcy5yYXdEYXRhLmluamVjdGFibGVzLCBbJ25hbWUnXSk7XG4gICAgICAgIHRoaXMuaW50ZXJmYWNlcyA9IF8uc29ydEJ5KHRoaXMucmF3RGF0YS5pbnRlcmZhY2VzLCBbJ25hbWUnXSk7XG4gICAgICAgIHRoaXMucm91dGVzID0gXy5zb3J0QnkoXy51bmlxV2l0aCh0aGlzLnJhd0RhdGEucm91dGVzLCBfLmlzRXF1YWwpLCBbJ25hbWUnXSk7XG4gICAgICAgIHRoaXMucGlwZXMgPSBfLnNvcnRCeSh0aGlzLnJhd0RhdGEucGlwZXMsIFsnbmFtZSddKTtcbiAgICAgICAgdGhpcy5jbGFzc2VzID0gXy5zb3J0QnkodGhpcy5yYXdEYXRhLmNsYXNzZXMsIFsnbmFtZSddKTtcbiAgICB9XG4gICAgZmluZCh0eXBlOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZpbmRlckluQ29tcG9kb2NEZXBlbmRlbmNpZXMgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBsZXQgX3Jlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiAnaW50ZXJuYWwnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBudWxsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgICAgICBsZW4gPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoaTsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlLmluZGV4T2YoZGF0YVtpXS5uYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdC5kYXRhID0gZGF0YVtpXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfcmVzdWx0O1xuICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdWx0SW5Db21wb2RvY0luamVjdGFibGVzID0gZmluZGVySW5Db21wb2RvY0RlcGVuZGVuY2llcyh0aGlzLmluamVjdGFibGVzKSxcbiAgICAgICAgICAgIHJlc3VsdEluQ29tcG9kb2NDbGFzc2VzID0gZmluZGVySW5Db21wb2RvY0RlcGVuZGVuY2llcyh0aGlzLmNsYXNzZXMpLFxuICAgICAgICAgICAgcmVzdWx0SW5Bbmd1bGFyQVBJcyA9IGZpbmRlckluQW5ndWxhckFQSXModHlwZSlcblxuICAgICAgICBpZiAocmVzdWx0SW5Db21wb2RvY0luamVjdGFibGVzLmRhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRJbkNvbXBvZG9jSW5qZWN0YWJsZXNcbiAgICAgICAgfSBlbHNlIGlmIChyZXN1bHRJbkNvbXBvZG9jQ2xhc3Nlcy5kYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0SW5Db21wb2RvY0NsYXNzZXNcbiAgICAgICAgfSBlbHNlIGlmIChyZXN1bHRJbkFuZ3VsYXJBUElzLmRhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRJbkFuZ3VsYXJBUElzXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0TW9kdWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kdWxlcztcbiAgICB9XG4gICAgZ2V0Q29tcG9uZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50cztcbiAgICB9XG4gICAgZ2V0RGlyZWN0aXZlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aXZlcztcbiAgICB9XG4gICAgZ2V0SW5qZWN0YWJsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluamVjdGFibGVzO1xuICAgIH1cbiAgICBnZXRJbnRlcmZhY2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcmZhY2VzO1xuICAgIH1cbiAgICBnZXRSb3V0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlcztcbiAgICB9XG4gICAgZ2V0UGlwZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpcGVzO1xuICAgIH1cbiAgICBnZXRDbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGFzc2VzO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCAkZGVwZW5kZW5jaWVzRW5naW5lID0gRGVwZW5kZW5jaWVzRW5naW5lLmdldEluc3RhbmNlKCk7XG4iLCJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgSGFuZGxlYmFycyBmcm9tICdoYW5kbGViYXJzJztcbi8vaW1wb3J0ICogYXMgaGVscGVycyBmcm9tICdoYW5kbGViYXJzLWhlbHBlcnMnO1xuaW1wb3J0IHsgJGRlcGVuZGVuY2llc0VuZ2luZSB9IGZyb20gJy4vZGVwZW5kZW5jaWVzLmVuZ2luZSc7XG5cbmV4cG9ydCBjbGFzcyBIdG1sRW5naW5lIHtcbiAgICBjYWNoZTogT2JqZWN0ID0ge307XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vVE9ETyB1c2UgdGhpcyBpbnN0ZWFkIDogaHR0cHM6Ly9naXRodWIuY29tL2Fzc2VtYmxlL2hhbmRsZWJhcnMtaGVscGVyc1xuICAgICAgICBIYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCBcImNvbXBhcmVcIiwgZnVuY3Rpb24oYSwgb3BlcmF0b3IsIGIsIG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaGFuZGxlYmFycyBIZWxwZXIge3tjb21wYXJlfX0gZXhwZWN0cyA0IGFyZ3VtZW50cycpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgICAgICAgICAgY2FzZSAnaW5kZXhvZic6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gKGIuaW5kZXhPZihhKSAhPT0gLTEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnPT09JzpcbiAgICAgICAgICAgICAgcmVzdWx0ID0gYSA9PT0gYjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICchPT0nOlxuICAgICAgICAgICAgICByZXN1bHQgPSBhICE9PSBiO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJz4nOlxuICAgICAgICAgICAgICByZXN1bHQgPSBhID4gYjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaGVscGVyIHt7Y29tcGFyZX19OiBpbnZhbGlkIG9wZXJhdG9yOiBgJyArIG9wZXJhdG9yICsgJ2AnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBIYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKFwiZmlsdGVyQW5ndWxhcjJNb2R1bGVzXCIsIGZ1bmN0aW9uKHRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IE5HMl9NT0RVTEVTOnN0cmluZ1tdID0gW1xuICAgICAgICAgICAgICAgICdCcm93c2VyTW9kdWxlJyxcbiAgICAgICAgICAgICAgICAnRm9ybXNNb2R1bGUnLFxuICAgICAgICAgICAgICAgICdIdHRwTW9kdWxlJyxcbiAgICAgICAgICAgICAgICAnUm91dGVyTW9kdWxlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBsZW4gPSBORzJfTU9EVUxFUy5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgaSA9IDAsXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGk7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0LmluZGV4T2YoTkcyX01PRFVMRVNbaV0pID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBIYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKFwiZGVidWdcIiwgZnVuY3Rpb24ob3B0aW9uYWxWYWx1ZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBDb250ZXh0XCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT1cIik7XG4gICAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG5cbiAgICAgICAgICBpZiAob3B0aW9uYWxWYWx1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcHRpb25hbFZhbHVlXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbmFsVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIEhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ2JyZWFrbGluZXMnLCBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgICAgICB0ZXh0ID0gSGFuZGxlYmFycy5VdGlscy5lc2NhcGVFeHByZXNzaW9uKHRleHQpO1xuICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvKFxcclxcbnxcXG58XFxyKS9nbSwgJzxicj4nKTtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyAvZ20sICcmbmJzcDsnKTtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1x0L2dtLCAnJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jyk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEhhbmRsZWJhcnMuU2FmZVN0cmluZyh0ZXh0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIEhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ2JyZWFrQ29tbWEnLCBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgICAgICB0ZXh0ID0gSGFuZGxlYmFycy5VdGlscy5lc2NhcGVFeHByZXNzaW9uKHRleHQpO1xuICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvLC9nLCAnLDxicj4nKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSGFuZGxlYmFycy5TYWZlU3RyaW5nKHRleHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignZnVuY3Rpb25TaWduYXR1cmUnLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBtZXRob2QuYXJncy5tYXAoZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9yZXN1bHQgPSAkZGVwZW5kZW5jaWVzRW5naW5lLmZpbmQoYXJnLnR5cGUpO1xuICAgICAgICAgICAgICAgIGlmIChfcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfcmVzdWx0LnNvdXJjZSA9PT0gJ2ludGVybmFsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGggPSBfcmVzdWx0LmRhdGEudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfcmVzdWx0LmRhdGEudHlwZSA9PT0gJ2NsYXNzJykgcGF0aCA9ICdjbGFzc2UnO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2FyZy5uYW1lfTogPGEgaHJlZj1cIi4vJHtwYXRofXMvJHtfcmVzdWx0LmRhdGEubmFtZX0uaHRtbFwiID4ke2FyZy50eXBlfTwvYT5gO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGggPSAnaHR0cHM6Ly9hbmd1bGFyLmlvL2RvY3MvdHMvbGF0ZXN0L2FwaS8nICsgX3Jlc3VsdC5kYXRhLnBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7YXJnLm5hbWV9OiA8YSBocmVmPVwiJHtwYXRofVwiIHRhcmdldD1cIl9ibGFua1wiID4ke2FyZy50eXBlfTwvYT5gO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2FyZy5uYW1lfTogJHthcmcudHlwZX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmpvaW4oJywgJyk7XG4gICAgICAgICAgICBpZiAobWV0aG9kLm5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7bWV0aG9kLm5hbWV9KCR7YXJnc30pYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAoJHthcmdzfSlgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignanNkb2MtcmV0dXJucy1jb21tZW50JywgZnVuY3Rpb24oanNkb2NUYWdzLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgaSA9IDAsXG4gICAgICAgICAgICAgICAgbGVuID0ganNkb2NUYWdzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICByZXN1bHQ7XG4gICAgICAgICAgICBmb3IoaTsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChqc2RvY1RhZ3NbaV0udGFnTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoanNkb2NUYWdzW2ldLnRhZ05hbWUudGV4dCA9PT0gJ3JldHVybnMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBqc2RvY1RhZ3NbaV0uY29tbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgICAgIEhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ2pzZG9jLXBhcmFtcycsIGZ1bmN0aW9uKGpzZG9jVGFncywgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICAgIGxlbiA9IGpzZG9jVGFncy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgdGFncyA9IFtdO1xuICAgICAgICAgICAgZm9yKGk7IGk8bGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoanNkb2NUYWdzW2ldLnRhZ05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzZG9jVGFnc1tpXS50YWdOYW1lLnRleHQgPT09ICdwYXJhbScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YWcgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqc2RvY1RhZ3NbaV0udHlwZUV4cHJlc3Npb24gJiYganNkb2NUYWdzW2ldLnR5cGVFeHByZXNzaW9uLnR5cGUubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZy50eXBlID0ganNkb2NUYWdzW2ldLnR5cGVFeHByZXNzaW9uLnR5cGUubmFtZS50ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoanNkb2NUYWdzW2ldLmNvbW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcuY29tbWVudCA9IGpzZG9jVGFnc1tpXS5jb21tZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoanNkb2NUYWdzW2ldLnBhcmFtZXRlck5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcubmFtZSA9IGpzZG9jVGFnc1tpXS5wYXJhbWV0ZXJOYW1lLnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ3MucHVzaCh0YWcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRhZ3MubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignbGlua1R5cGUnLCBmdW5jdGlvbihuYW1lLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3Jlc3VsdCA9ICRkZXBlbmRlbmNpZXNFbmdpbmUuZmluZChuYW1lKTtcbiAgICAgICAgICAgIGlmIChfcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0ge1xuICAgICAgICAgICAgICAgICAgICByYXc6IG5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF9yZXN1bHQuc291cmNlID09PSAnaW50ZXJuYWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfcmVzdWx0LmRhdGEudHlwZSA9PT0gJ2NsYXNzJykgX3Jlc3VsdC5kYXRhLnR5cGUgPSAnY2xhc3NlJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlLmhyZWYgPSAnLi8nICsgX3Jlc3VsdC5kYXRhLnR5cGUgKyAncy8nICsgX3Jlc3VsdC5kYXRhLm5hbWUgKyAnLmh0bWwnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGUudGFyZ2V0ID0gJ19zZWxmJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGUuaHJlZiA9ICdodHRwczovL2FuZ3VsYXIuaW8vZG9jcy90cy9sYXRlc3QvYXBpLycgKyBfcmVzdWx0LmRhdGEucGF0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlLnRhcmdldCA9ICdfYmxhbmsnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignaW5kZXhhYmxlU2lnbmF0dXJlJywgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICBjb25zdCBhcmdzID0gbWV0aG9kLmFyZ3MubWFwKGFyZyA9PiBgJHthcmcubmFtZX06ICR7YXJnLnR5cGV9YCkuam9pbignLCAnKTtcbiAgICAgICAgICAgIGlmIChtZXRob2QubmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHttZXRob2QubmFtZX1bJHthcmdzfV1gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYFske2FyZ3N9XWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBIYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdvYmplY3QnLCBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgICAgICB0ZXh0ID0gSlNPTi5zdHJpbmdpZnkodGV4dCk7XG4gICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC97XCIvLCAnezxicj4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtcIicpO1xuICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvLFwiLywgJyw8YnI+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7XCInKTtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL30kLywgJzxicj59Jyk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEhhbmRsZWJhcnMuU2FmZVN0cmluZyh0ZXh0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIGxldCBwYXJ0aWFscyA9IFtcbiAgICAgICAgICAgICdtZW51JyxcbiAgICAgICAgICAgICdvdmVydmlldycsXG4gICAgICAgICAgICAncmVhZG1lJyxcbiAgICAgICAgICAgICdtb2R1bGVzJyxcbiAgICAgICAgICAgICdtb2R1bGUnLFxuICAgICAgICAgICAgJ2NvbXBvbmVudHMnLFxuICAgICAgICAgICAgJ2NvbXBvbmVudCcsXG4gICAgICAgICAgICAnY29tcG9uZW50LWRldGFpbCcsXG4gICAgICAgICAgICAnZGlyZWN0aXZlcycsXG4gICAgICAgICAgICAnZGlyZWN0aXZlJyxcbiAgICAgICAgICAgICdpbmplY3RhYmxlcycsXG4gICAgICAgICAgICAnaW5qZWN0YWJsZScsXG4gICAgICAgICAgICAncGlwZXMnLFxuICAgICAgICAgICAgJ3BpcGUnLFxuICAgICAgICAgICAgJ2NsYXNzZXMnLFxuICAgICAgICAgICAgJ2NsYXNzJyxcblx0ICAgICAgICAnaW50ZXJmYWNlJyxcbiAgICAgICAgICAgICdyb3V0ZXMnLFxuICAgICAgICAgICAgJ3NlYXJjaC1yZXN1bHRzJyxcbiAgICAgICAgICAgICdzZWFyY2gtaW5wdXQnLFxuICAgICAgICAgICAgJ2xpbmstdHlwZScsXG4gICAgICAgICAgICAnYmxvY2stbWV0aG9kJyxcbiAgICAgICAgICAgICdibG9jay1wcm9wZXJ0eScsXG4gICAgICAgICAgICAnY292ZXJhZ2UtcmVwb3J0J1xuICAgICAgICBdLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBsZW4gPSBwYXJ0aWFscy5sZW5ndGgsXG4gICAgICAgICAgICBsb29wID0gKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCBpIDw9IGxlbi0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGZzLnJlYWRGaWxlKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUgKyAnLy4uL3NyYy90ZW1wbGF0ZXMvcGFydGlhbHMvJyArIHBhcnRpYWxzW2ldICsgJy5oYnMnKSwgJ3V0ZjgnLCAoZXJyLCBkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7IHJlamVjdCgpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICBIYW5kbGViYXJzLnJlZ2lzdGVyUGFydGlhbChwYXJ0aWFsc1tpXSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb29wKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBsb29wKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXIobWFpbkRhdGE6YW55LCBwYWdlOmFueSkge1xuICAgICAgICB2YXIgbyA9IG1haW5EYXRhLFxuICAgICAgICAgICAgdGhhdCA9IHRoaXM7XG4gICAgICAgIE9iamVjdC5hc3NpZ24obywgcGFnZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGlmKHRoYXQuY2FjaGVbJ3BhZ2UnXSkge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wbGF0ZTphbnkgPSBIYW5kbGViYXJzLmNvbXBpbGUodGhhdC5jYWNoZVsncGFnZSddKSxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGVtcGxhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogb1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZzLnJlYWRGaWxlKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUgKyAnLy4uL3NyYy90ZW1wbGF0ZXMvcGFnZS5oYnMnKSwgJ3V0ZjgnLCAoZXJyLCBkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ0Vycm9yIGR1cmluZyBpbmRleCAnICsgcGFnZS5uYW1lICsgJyBnZW5lcmF0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWNoZVsncGFnZSddID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBsYXRlOmFueSA9IEhhbmRsZWJhcnMuY29tcGlsZShkYXRhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRlbXBsYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iLCJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IG1hcmtlZCwgeyBSZW5kZXJlciB9IGZyb20gJ21hcmtlZCc7XG5pbXBvcnQgaGlnaGxpZ2h0anMgZnJvbSAnaGlnaGxpZ2h0LmpzJztcblxuZXhwb3J0IGNsYXNzIE1hcmtkb3duRW5naW5lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoKTtcbiAgICAgICAgcmVuZGVyZXIuY29kZSA9IChjb2RlLCBsYW5ndWFnZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsaWRMYW5nID0gISEobGFuZ3VhZ2UgJiYgaGlnaGxpZ2h0anMuZ2V0TGFuZ3VhZ2UobGFuZ3VhZ2UpKTtcbiAgICAgICAgICAgIGxldCBoaWdobGlnaHRlZCA9IHZhbGlkTGFuZyA/IGhpZ2hsaWdodGpzLmhpZ2hsaWdodChsYW5ndWFnZSwgY29kZSkudmFsdWUgOiBjb2RlO1xuICAgICAgICAgICAgaGlnaGxpZ2h0ZWQgPSBoaWdobGlnaHRlZC5yZXBsYWNlKC8oXFxyXFxufFxcbnxcXHIpL2dtLCAnPGJyPicpO1xuICAgICAgICAgICAgcmV0dXJuIGA8cHJlPjxjb2RlIGNsYXNzPVwiaGxqcyAke2xhbmd1YWdlfVwiPiR7aGlnaGxpZ2h0ZWR9PC9jb2RlPjwvcHJlPmA7XG4gICAgICAgIH07XG5cbiAgICAgICAgbWFya2VkLnNldE9wdGlvbnMoeyByZW5kZXJlciB9KTtcbiAgICB9XG4gICAgZ2V0UmVhZG1lRmlsZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgZnMucmVhZEZpbGUocGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCkgKyAnL1JFQURNRS5tZCcpLCAndXRmOCcsIChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgnRXJyb3IgZHVyaW5nIFJFQURNRS5tZCBmaWxlIHJlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG1hcmtlZChkYXRhKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iLCJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgSGFuZGxlYmFycyBmcm9tICdoYW5kbGViYXJzJztcblxuZXhwb3J0IGNsYXNzIEZpbGVFbmdpbmUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuICAgIGdldChmaWxlcGF0aDpTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICBmcy5yZWFkRmlsZShwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSArIHBhdGguc2VwICsgZmlsZXBhdGgpLCAndXRmOCcsIChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICByZWplY3QoJ0Vycm9yIGR1cmluZyAnICsgZmlsZXBhdGggKyAnIHJlYWQnKTtcbiAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iLCJleHBvcnQgY29uc3QgQ09NUE9ET0NfREVGQVVMVFMgPSB7XG4gICAgdGl0bGU6ICdBcHBsaWNhdGlvbiBkb2N1bWVudGF0aW9uJyxcbiAgICBhZGRpdGlvbmFsRW50cnlOYW1lOiAnQWRkaXRpb25hbCBkb2N1bWVudGF0aW9uJyxcbiAgICBhZGRpdGlvbmFsRW50cnlQYXRoOiAnYWRkaXRpb25hbC1kb2N1bWVudGF0aW9uJyxcbiAgICBmb2xkZXI6ICcuL2RvY3VtZW50YXRpb24vJyxcbiAgICBwb3J0OiA4MDgwLFxuICAgIHRoZW1lOiAnZ2l0Ym9vaycsXG4gICAgYmFzZTogJy8nLFxuICAgIGRpc2FibGVTb3VyY2VDb2RlOiBmYWxzZSxcbiAgICBkaXNhYmxlR3JhcGg6IGZhbHNlLFxuICAgIGRpc2FibGVDb3ZlcmFnZTogZmFsc2Vcbn1cbiIsImltcG9ydCB7IENPTVBPRE9DX0RFRkFVTFRTIH0gZnJvbSAnLi4vdXRpbHMvZGVmYXVsdHMnO1xuXG5pbnRlcmZhY2UgUGFnZSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGNvbnRleHQ6IHN0cmluZztcbiAgICBwYXRoPzogc3RyaW5nO1xuICAgIG1vZHVsZT86IGFueTtcbiAgICBwaXBlPzogYW55O1xuICAgIGNsYXNzPzogYW55O1xuICAgIGludGVyZmFjZT86IGFueTtcbiAgICBkaXJlY3RpdmU/OiBhbnk7XG4gICAgaW5qZWN0YWJsZT86IGFueTtcbiAgICBmaWxlcz86IGFueTtcbiAgICBkYXRhPzogYW55O1xufVxuXG5pbnRlcmZhY2UgSU1haW5EYXRhIHtcbiAgICBvdXRwdXQ6IHN0cmluZztcbiAgICB0aGVtZTogc3RyaW5nO1xuICAgIGV4dFRoZW1lOiBzdHJpbmc7XG4gICAgc2VydmU6IGJvb2xlYW47XG4gICAgcG9ydDogbnVtYmVyO1xuICAgIG9wZW46IGJvb2xlYW47XG4gICAgZG9jdW1lbnRhdGlvbk1haW5OYW1lOiBzdHJpbmc7XG4gICAgZG9jdW1lbnRhdGlvbk1haW5EZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGJhc2U6IHN0cmluZztcbiAgICBoaWRlR2VuZXJhdG9yOiBib29sZWFuO1xuICAgIG1vZHVsZXM6IGFueTtcbiAgICByZWFkbWU6IHN0cmluZztcbiAgICBhZGRpdGlvbmFscGFnZXM6IE9iamVjdDtcbiAgICBwaXBlczogYW55O1xuICAgIGNsYXNzZXM6IGFueTtcbiAgICBpbnRlcmZhY2VzOiBhbnk7XG4gICAgY29tcG9uZW50czogYW55O1xuICAgIGRpcmVjdGl2ZXM6IGFueTtcbiAgICBpbmplY3RhYmxlczogYW55O1xuICAgIHJvdXRlczogYW55O1xuICAgIHRzY29uZmlnOiBzdHJpbmc7XG4gICAgaW5jbHVkZXM6IGJvb2xlYW47XG4gICAgaW5jbHVkZXNOYW1lOiBzdHJpbmc7XG4gICAgZGlzYWJsZVNvdXJjZUNvZGU6IGJvb2xlYW47XG4gICAgZGlzYWJsZUdyYXBoOiBib29sZWFuO1xuICAgIGRpc2FibGVDb3ZlcmFnZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlndXJhdGlvbiB7XG4gICAgbWFpbkRhdGE6IElNYWluRGF0YTtcbiAgICBwYWdlczpBcnJheTxQYWdlPjtcbiAgICBhZGRQYWdlKHBhZ2U6IFBhZ2UpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvbiBpbXBsZW1lbnRzIElDb25maWd1cmF0aW9uIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6Q29uZmlndXJhdGlvbiA9IG5ldyBDb25maWd1cmF0aW9uKCk7XG5cbiAgICBwcml2YXRlIF9wYWdlczpBcnJheTxQYWdlPiA9IFtdO1xuICAgIHByaXZhdGUgX21haW5EYXRhOiBJTWFpbkRhdGEgPSB7XG4gICAgICAgIG91dHB1dDogQ09NUE9ET0NfREVGQVVMVFMuZm9sZGVyLFxuICAgICAgICB0aGVtZTogQ09NUE9ET0NfREVGQVVMVFMudGhlbWUsXG4gICAgICAgIGV4dFRoZW1lOiAnJyxcbiAgICAgICAgc2VydmU6IGZhbHNlLFxuICAgICAgICBwb3J0OiBDT01QT0RPQ19ERUZBVUxUUy5wb3J0LFxuICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbk1haW5OYW1lOiBDT01QT0RPQ19ERUZBVUxUUy50aXRsZSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbk1haW5EZXNjcmlwdGlvbjogJycsXG4gICAgICAgIGJhc2U6IENPTVBPRE9DX0RFRkFVTFRTLmJhc2UsXG4gICAgICAgIGhpZGVHZW5lcmF0b3I6IGZhbHNlLFxuICAgICAgICBtb2R1bGVzOiBbXSxcbiAgICAgICAgcmVhZG1lOiAnJyxcbiAgICAgICAgYWRkaXRpb25hbHBhZ2VzOiB7fSxcbiAgICAgICAgcGlwZXM6IFtdLFxuICAgICAgICBjbGFzc2VzOiBbXSxcbiAgICAgICAgaW50ZXJmYWNlczogW10sXG4gICAgICAgIGNvbXBvbmVudHM6IFtdLFxuICAgICAgICBkaXJlY3RpdmVzOiBbXSxcbiAgICAgICAgaW5qZWN0YWJsZXM6IFtdLFxuICAgICAgICByb3V0ZXM6IFtdLFxuICAgICAgICB0c2NvbmZpZzogJycsXG4gICAgICAgIGluY2x1ZGVzOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZVNvdXJjZUNvZGU6IENPTVBPRE9DX0RFRkFVTFRTLmRpc2FibGVTb3VyY2VDb2RlLFxuICAgICAgICBkaXNhYmxlR3JhcGg6IENPTVBPRE9DX0RFRkFVTFRTLmRpc2FibGVHcmFwaCxcbiAgICAgICAgZGlzYWJsZUNvdmVyYWdlOiBDT01QT0RPQ19ERUZBVUxUUy5kaXNhYmxlQ292ZXJhZ2VcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmKENvbmZpZ3VyYXRpb24uX2luc3RhbmNlKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3I6IEluc3RhbnRpYXRpb24gZmFpbGVkOiBVc2UgQ29uZmlndXJhdGlvbi5nZXRJbnN0YW5jZSgpIGluc3RlYWQgb2YgbmV3LicpO1xuICAgICAgICB9XG4gICAgICAgIENvbmZpZ3VyYXRpb24uX2luc3RhbmNlID0gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6Q29uZmlndXJhdGlvblxuICAgIHtcbiAgICAgICAgcmV0dXJuIENvbmZpZ3VyYXRpb24uX2luc3RhbmNlO1xuICAgIH1cblxuICAgIGFkZFBhZ2UocGFnZTogUGFnZSkge1xuICAgICAgICB0aGlzLl9wYWdlcy5wdXNoKHBhZ2UpO1xuICAgIH1cblxuICAgIGdldCBwYWdlcygpOkFycmF5PFBhZ2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2VzO1xuICAgIH1cbiAgICBzZXQgcGFnZXMocGFnZXM6QXJyYXk8UGFnZT4pIHtcbiAgICAgICAgdGhpcy5fcGFnZXMgPSBbXTtcbiAgICB9XG5cbiAgICBnZXQgbWFpbkRhdGEoKTpJTWFpbkRhdGEge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFpbkRhdGE7XG4gICAgfVxuICAgIHNldCBtYWluRGF0YShkYXRhOklNYWluRGF0YSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuX21haW5EYXRhLCBkYXRhKTtcbiAgICB9XG59O1xuIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzR2xvYmFsKCkge1xuICAgIHZhciBiaW5QYXRoLFxuICAgICAgICBnbG9iYWxCaW5QYXRoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoYmluUGF0aCkgcmV0dXJuIGJpblBhdGhcblxuICAgICAgICAgICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aG5hbWVzID0gcHJvY2Vzcy5lbnYuUEFUSC5zcGxpdChwYXRoLmRlbGltaXRlcilcbiAgICAgICAgICAgICAgICB2YXIgbGVuID0gcGF0aG5hbWVzLmxlbmd0aFxuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGF0aC5iYXNlbmFtZShwYXRobmFtZXNbaV0pID09PSAnbnBtJyB8fCBwYXRoLmJhc2VuYW1lKHBhdGhuYW1lc1tpXSkgPT09ICdub2RlanMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5QYXRoID0gcGF0aG5hbWVzW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiaW5QYXRoID0gcGF0aC5kaXJuYW1lKHByb2Nlc3MuZXhlY1BhdGgpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBiaW5QYXRoXG4gICAgICAgIH0sXG4gICAgICAgIHN0cmlwVHJhaWxpbmdTZXAgPSBmdW5jdGlvbih0aGVQYXRoKSB7XG4gICAgICAgICAgICBpZiAodGhlUGF0aFt0aGVQYXRoLmxlbmd0aCAtIDFdID09PSBwYXRoLnNlcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGVQYXRoLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGVQYXRoO1xuICAgICAgICB9LFxuICAgICAgICBwYXRoSXNJbnNpZGUgPSBmdW5jdGlvbih0aGVQYXRoLCBwb3RlbnRpYWxQYXJlbnQpIHtcbiAgICAgICAgICAgIC8vIEZvciBpbnNpZGUtZGlyZWN0b3J5IGNoZWNraW5nLCB3ZSB3YW50IHRvIGFsbG93IHRyYWlsaW5nIHNsYXNoZXMsIHNvIG5vcm1hbGl6ZS5cbiAgICAgICAgICAgIHRoZVBhdGggPSBzdHJpcFRyYWlsaW5nU2VwKHRoZVBhdGgpO1xuICAgICAgICAgICAgcG90ZW50aWFsUGFyZW50ID0gc3RyaXBUcmFpbGluZ1NlcChwb3RlbnRpYWxQYXJlbnQpO1xuXG4gICAgICAgICAgICAvLyBOb2RlIHRyZWF0cyBvbmx5IFdpbmRvd3MgYXMgY2FzZS1pbnNlbnNpdGl2ZSBpbiBpdHMgcGF0aCBtb2R1bGU7IHdlIGZvbGxvdyB0aG9zZSBjb252ZW50aW9ucy5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSBcIndpbjMyXCIpIHtcbiAgICAgICAgICAgICAgICB0aGVQYXRoID0gdGhlUGF0aC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIHBvdGVudGlhbFBhcmVudCA9IHBvdGVudGlhbFBhcmVudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhlUGF0aC5sYXN0SW5kZXhPZihwb3RlbnRpYWxQYXJlbnQsIDApID09PSAwICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICB0aGVQYXRoW3BvdGVudGlhbFBhcmVudC5sZW5ndGhdID09PSBwYXRoLnNlcCB8fFxuICAgICAgICAgICAgICAgICAgICB0aGVQYXRoW3BvdGVudGlhbFBhcmVudC5sZW5ndGhdID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBpc1BhdGhJbnNpZGUgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICBhID0gcGF0aC5yZXNvbHZlKGEpO1xuICAgICAgICAgICAgYiA9IHBhdGgucmVzb2x2ZShiKTtcblxuICAgICAgICAgICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoSXNJbnNpZGUoYSwgYik7XG4gICAgICAgIH1cbiAgICByZXR1cm4gaXNQYXRoSW5zaWRlKHByb2Nlc3MuYXJndlsxXSB8fCAnJywgZ2xvYmFsQmluUGF0aCgpIHx8ICcnKVxufTtcbiIsImltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBTaGVsbGpzIGZyb20gJ3NoZWxsanMnO1xuXG5pbXBvcnQgaXNHbG9iYWwgZnJvbSAnLi4vLi4vdXRpbHMvZ2xvYmFsLnBhdGgnO1xuXG5leHBvcnQgY2xhc3MgTmdkRW5naW5lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cbiAgICByZW5kZXJHcmFwaChmaWxlcGF0aDpTdHJpbmcsIG91dHB1dHBhdGg6IFN0cmluZywgdHlwZTogU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgbGV0IG5nZFBhdGggPSAoaXNHbG9iYWwoKSkgPyBfX2Rpcm5hbWUgKyAnLy4uL25vZGVfbW9kdWxlcy8uYmluL25nZCcgOiBfX2Rpcm5hbWUgKyAnLy4uLy4uLy5iaW4vbmdkJztcbiAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk1PREUgJiYgcHJvY2Vzcy5lbnYuTU9ERSA9PT0gJ1RFU1RJTkcnKSB7XG4gICAgICAgICAgICAgICBuZ2RQYXRoID0gX19kaXJuYW1lICsgJy8uLi9ub2RlX21vZHVsZXMvLmJpbi9uZ2QnO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIGlmICgvIC9nLnRlc3QobmdkUGF0aCkpIHtcbiAgICAgICAgICAgICAgIG5nZFBhdGggPSBuZ2RQYXRoLnJlcGxhY2UoLyAvZywgJ14gJyk7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgbGV0IGZpbmFsUGF0aCA9IHBhdGgucmVzb2x2ZShuZ2RQYXRoKSArICcgLScgKyB0eXBlICsgJyAnICsgZmlsZXBhdGggKyAnIC1kICcgKyBvdXRwdXRwYXRoICsgJyAtcyAtdCBzdmcnXG4gICAgICAgICAgIFNoZWxsanMuZXhlYyhmaW5hbFBhdGgsIHtcbiAgICAgICAgICAgICAgIHNpbGVudDogdHJ1ZVxuICAgICAgICAgICB9LCBmdW5jdGlvbihjb2RlLCBzdGRvdXQsIHN0ZGVycikge1xuICAgICAgICAgICAgICAgaWYoY29kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgcmVqZWN0KHN0ZGVycik7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uLy4uL2xvZ2dlcic7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbic7XG5cbmNvbnN0IGx1bnI6IGFueSA9IHJlcXVpcmUoJ2x1bnInKSxcbiAgICAgIGNoZWVyaW86IGFueSA9IHJlcXVpcmUoJ2NoZWVyaW8nKSxcbiAgICAgIEVudGl0aWVzOmFueSA9IHJlcXVpcmUoJ2h0bWwtZW50aXRpZXMnKS5BbGxIdG1sRW50aXRpZXMsXG4gICAgICAkY29uZmlndXJhdGlvbiA9IENvbmZpZ3VyYXRpb24uZ2V0SW5zdGFuY2UoKSxcbiAgICAgIEh0bWwgPSBuZXcgRW50aXRpZXMoKTtcblxuZXhwb3J0IGNsYXNzIFNlYXJjaEVuZ2luZSB7XG4gICAgc2VhcmNoSW5kZXg6IGFueTtcbiAgICBkb2N1bWVudHNTdG9yZTogT2JqZWN0ID0ge307XG4gICAgaW5kZXhTaXplOiBudW1iZXI7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuICAgIHByaXZhdGUgZ2V0U2VhcmNoSW5kZXgoKSB7XG4gICAgICAgIGlmICghdGhpcy5zZWFyY2hJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbmRleCA9IGx1bnIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmKCd1cmwnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkKCd0aXRsZScsIHsgYm9vc3Q6IDEwIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZmllbGQoJ2JvZHknKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaEluZGV4O1xuICAgIH1cbiAgICBpbmRleFBhZ2UocGFnZSkge1xuICAgICAgICB2YXIgdGV4dCxcbiAgICAgICAgICAgICQgPSBjaGVlcmlvLmxvYWQocGFnZS5yYXdEYXRhKTtcblxuICAgICAgICB0ZXh0ID0gJCgnLmNvbnRlbnQnKS5odG1sKCk7XG4gICAgICAgIHRleHQgPSBIdG1sLmRlY29kZSh0ZXh0KTtcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvKDwoW14+XSspPikvaWcsICcnKTtcblxuICAgICAgICBwYWdlLnVybCA9IHBhZ2UudXJsLnJlcGxhY2UoJGNvbmZpZ3VyYXRpb24ubWFpbkRhdGEub3V0cHV0LCAnJyk7XG5cbiAgICAgICAgdmFyIGRvYyA9IHtcbiAgICAgICAgICAgIHVybDogcGFnZS51cmwsXG4gICAgICAgICAgICB0aXRsZTogcGFnZS5pbmZvcy5jb250ZXh0ICsgJyAtICcgKyBwYWdlLmluZm9zLm5hbWUsXG4gICAgICAgICAgICBib2R5OiB0ZXh0XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5kb2N1bWVudHNTdG9yZVtkb2MudXJsXSA9IGRvYztcblxuICAgICAgICB0aGlzLmdldFNlYXJjaEluZGV4KCkuYWRkKGRvYyk7XG4gICAgfVxuICAgIGdlbmVyYXRlU2VhcmNoSW5kZXhKc29uKG91dHB1dEZvbGRlcikge1xuICAgICAgICBmcy53cml0ZUpzb24ocGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCkgKyBwYXRoLnNlcCArIG91dHB1dEZvbGRlciArIHBhdGguc2VwICsgJ3NlYXJjaF9pbmRleC5qc29uJyksIHtcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLmdldFNlYXJjaEluZGV4KCksXG4gICAgICAgICAgICBzdG9yZTogdGhpcy5kb2N1bWVudHNTdG9yZVxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ0Vycm9yIGR1cmluZyBzZWFyY2ggaW5kZXggZmlsZSBnZW5lcmF0aW9uICcsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iLCJpbXBvcnQgKiBhcyB0cyBmcm9tIFwidHlwZXNjcmlwdFwiO1xuY29uc3QgdHNhbnkgPSB0cyBhcyBhbnk7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9ibG9iLzIuMS9zcmMvY29tcGlsZXIvdXRpbGl0aWVzLnRzI0wxNTA3XG5leHBvcnQgZnVuY3Rpb24gZ2V0SlNEb2NzKG5vZGU6IHRzLk5vZGUpIHtcbiAgcmV0dXJuIHRzYW55LmdldEpTRG9jcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuIiwiaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICd1dGlsJztcblxuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xuXG5jb25zdCBjYXJyaWFnZVJldHVybkxpbmVGZWVkID0gJ1xcclxcbic7XG5jb25zdCBsaW5lRmVlZCA9ICdcXG4nO1xuXG4vLyBnZXQgZGVmYXVsdCBuZXcgbGluZSBicmVha1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5ld0xpbmVDaGFyYWN0ZXIob3B0aW9uczogdHMuQ29tcGlsZXJPcHRpb25zKTogc3RyaW5nIHtcbiAgICBpZiAob3B0aW9ucy5uZXdMaW5lID09PSB0cy5OZXdMaW5lS2luZC5DYXJyaWFnZVJldHVybkxpbmVGZWVkKSB7XG4gICAgICAgIHJldHVybiBjYXJyaWFnZVJldHVybkxpbmVGZWVkO1xuICAgIH1cbiAgICBlbHNlIGlmIChvcHRpb25zLm5ld0xpbmUgPT09IHRzLk5ld0xpbmVLaW5kLkxpbmVGZWVkKSB7XG4gICAgICAgIHJldHVybiBsaW5lRmVlZDtcbiAgICB9XG4gICAgcmV0dXJuIGNhcnJpYWdlUmV0dXJuTGluZUZlZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RJbmRlbnQoc3RyLCBjb3VudCwgaW5kZW50Pyk6IHN0cmluZyB7XG4gICAgbGV0IHN0cmlwSW5kZW50ID0gZnVuY3Rpb24oc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2goL15bIFxcdF0qKD89XFxTKS9nbSk7XG5cbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IHVzZSBzcHJlYWQgb3BlcmF0b3Igd2hlbiB0YXJnZXRpbmcgTm9kZS5qcyA2XG4gICAgICAgIGNvbnN0IGluZGVudCA9IE1hdGgubWluLmFwcGx5KE1hdGgsIG1hdGNoLm1hcCh4ID0+IHgubGVuZ3RoKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKGBeWyBcXFxcdF17JHtpbmRlbnR9fWAsICdnbScpO1xuXG4gICAgICAgIHJldHVybiBpbmRlbnQgPiAwID8gc3RyLnJlcGxhY2UocmUsICcnKSA6IHN0cjtcbiAgICB9LFxuICAgICAgICByZXBlYXRpbmcgPSBmdW5jdGlvbihuLCBzdHIpIHtcbiAgICAgICAgc3RyID0gc3RyID09PSB1bmRlZmluZWQgPyAnICcgOiBzdHI7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBpbnB1dFxcYCB0byBiZSBhIFxcYHN0cmluZ1xcYCwgZ290IFxcYCR7dHlwZW9mIHN0cn1cXGBgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuIDwgMCB8fCAhTnVtYmVyLmlzRmluaXRlKG4pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBjb3VudFxcYCB0byBiZSBhIHBvc2l0aXZlIGZpbml0ZSBudW1iZXIsIGdvdCBcXGAke259XFxgYCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmV0ID0gJyc7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKG4gJiAxKSB7XG4gICAgICAgICAgICAgICAgcmV0ICs9IHN0cjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RyICs9IHN0cjtcbiAgICAgICAgfSB3aGlsZSAoKG4gPj49IDEpKTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG4gICAgaW5kZW50U3RyaW5nID0gZnVuY3Rpb24oc3RyLCBjb3VudCwgaW5kZW50KSB7XG4gICAgICAgIGluZGVudCA9IGluZGVudCA9PT0gdW5kZWZpbmVkID8gJyAnIDogaW5kZW50O1xuICAgICAgICBjb3VudCA9IGNvdW50ID09PSB1bmRlZmluZWQgPyAxIDogY291bnQ7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBpbnB1dFxcYCB0byBiZSBhIFxcYHN0cmluZ1xcYCwgZ290IFxcYCR7dHlwZW9mIHN0cn1cXGBgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY291bnQgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBjb3VudFxcYCB0byBiZSBhIFxcYG51bWJlclxcYCwgZ290IFxcYCR7dHlwZW9mIGNvdW50fVxcYGApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbmRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBpbmRlbnRcXGAgdG8gYmUgYSBcXGBzdHJpbmdcXGAsIGdvdCBcXGAke3R5cGVvZiBpbmRlbnR9XFxgYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH1cblxuICAgICAgICBpbmRlbnQgPSBjb3VudCA+IDEgPyByZXBlYXRpbmcoY291bnQsIGluZGVudCkgOiBpbmRlbnQ7XG5cbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eKD8hXFxzKiQpL21nLCBpbmRlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRlbnRTdHJpbmcoc3RyaXBJbmRlbnQoc3RyKSwgY291bnQgfHwgMCwgaW5kZW50KTtcbn1cblxuLy8gQ3JlYXRlIGEgY29tcGlsZXJIb3N0IG9iamVjdCB0byBhbGxvdyB0aGUgY29tcGlsZXIgdG8gcmVhZCBhbmQgd3JpdGUgZmlsZXNcbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlckhvc3QodHJhbnNwaWxlT3B0aW9uczogYW55KTogdHMuQ29tcGlsZXJIb3N0IHtcblxuICAgIGNvbnN0IGlucHV0RmlsZU5hbWUgPSB0cmFuc3BpbGVPcHRpb25zLmZpbGVOYW1lIHx8ICh0cmFuc3BpbGVPcHRpb25zLmpzeCA/ICdtb2R1bGUudHN4JyA6ICdtb2R1bGUudHMnKTtcblxuICAgIGNvbnN0IGNvbXBpbGVySG9zdDogdHMuQ29tcGlsZXJIb3N0ID0ge1xuICAgICAgICBnZXRTb3VyY2VGaWxlOiAoZmlsZU5hbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWxlTmFtZS5sYXN0SW5kZXhPZignLnRzJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGVOYW1lID09PSAnbGliLmQudHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHBhdGguaXNBYnNvbHV0ZShmaWxlTmFtZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lID0gcGF0aC5qb2luKHRyYW5zcGlsZU9wdGlvbnMudHNjb25maWdEaXJlY3RvcnksIGZpbGVOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgbGliU291cmNlID0gJyc7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBsaWJTb3VyY2UgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZU5hbWUpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGUsIGZpbGVOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHMuY3JlYXRlU291cmNlRmlsZShmaWxlTmFtZSwgbGliU291cmNlLCB0cmFuc3BpbGVPcHRpb25zLnRhcmdldCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSxcbiAgICAgICAgd3JpdGVGaWxlOiAobmFtZSwgdGV4dCkgPT4ge30sXG4gICAgICAgIGdldERlZmF1bHRMaWJGaWxlTmFtZTogKCkgPT4gJ2xpYi5kLnRzJyxcbiAgICAgICAgdXNlQ2FzZVNlbnNpdGl2ZUZpbGVOYW1lczogKCkgPT4gZmFsc2UsXG4gICAgICAgIGdldENhbm9uaWNhbEZpbGVOYW1lOiBmaWxlTmFtZSA9PiBmaWxlTmFtZSxcbiAgICAgICAgZ2V0Q3VycmVudERpcmVjdG9yeTogKCkgPT4gJycsXG4gICAgICAgIGdldE5ld0xpbmU6ICgpID0+ICdcXG4nLFxuICAgICAgICBmaWxlRXhpc3RzOiAoZmlsZU5hbWUpOiBib29sZWFuID0+IGZpbGVOYW1lID09PSBpbnB1dEZpbGVOYW1lLFxuICAgICAgICByZWFkRmlsZTogKCkgPT4gJycsXG4gICAgICAgIGRpcmVjdG9yeUV4aXN0czogKCkgPT4gdHJ1ZSxcbiAgICAgICAgZ2V0RGlyZWN0b3JpZXM6ICgpID0+IFtdXG4gICAgfTtcbiAgICByZXR1cm4gY29tcGlsZXJIb3N0O1xufVxuIiwiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICd1dGlsJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzLWV4dHJhJztcblxuZXhwb3J0IGxldCBSb3V0ZXJQYXJzZXIgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgcm91dGVzID0gW10sXG4gICAgICAgIG1vZHVsZXMgPSBbXSxcbiAgICAgICAgbW9kdWxlc1RyZWUsXG4gICAgICAgIHJvb3RNb2R1bGUsXG4gICAgICAgIG1vZHVsZXNXaXRoUm91dGVzID0gW107XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRSb3V0ZTogZnVuY3Rpb24ocm91dGUpIHtcbiAgICAgICAgICAgIHJvdXRlcy5wdXNoKHJvdXRlKTtcbiAgICAgICAgICAgIHJvdXRlcyA9IF8uc29ydEJ5KF8udW5pcVdpdGgocm91dGVzLCBfLmlzRXF1YWwpLCBbJ25hbWUnXSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZE1vZHVsZVdpdGhSb3V0ZXM6IGZ1bmN0aW9uKG1vZHVsZU5hbWUsIG1vZHVsZUltcG9ydHMpIHtcbiAgICAgICAgICAgIG1vZHVsZXNXaXRoUm91dGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IG1vZHVsZU5hbWUsXG4gICAgICAgICAgICAgICAgaW1wb3J0c05vZGU6IG1vZHVsZUltcG9ydHNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW9kdWxlc1dpdGhSb3V0ZXMgPSBfLnNvcnRCeShfLnVuaXFXaXRoKG1vZHVsZXNXaXRoUm91dGVzLCBfLmlzRXF1YWwpLCBbJ25hbWUnXSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZE1vZHVsZTogZnVuY3Rpb24obW9kdWxlTmFtZTogc3RyaW5nLCBtb2R1bGVJbXBvcnRzKSB7XG4gICAgICAgICAgICBtb2R1bGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IG1vZHVsZU5hbWUsXG4gICAgICAgICAgICAgICAgaW1wb3J0c05vZGU6IG1vZHVsZUltcG9ydHNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW9kdWxlcyA9IF8uc29ydEJ5KF8udW5pcVdpdGgobW9kdWxlcywgXy5pc0VxdWFsKSwgWyduYW1lJ10pO1xuICAgICAgICB9LFxuICAgICAgICBzZXRSb290TW9kdWxlOiBmdW5jdGlvbihtb2R1bGU6IHN0cmluZykge1xuICAgICAgICAgICAgcm9vdE1vZHVsZSA9IG1vZHVsZTtcbiAgICAgICAgfSxcbiAgICAgICAgcHJpbnRSb3V0ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnJyk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJvdXRlcyk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhc1JvdXRlck1vZHVsZUluSW1wb3J0czogZnVuY3Rpb24oaW1wb3J0cykge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgICAgIGxlbiA9IGltcG9ydHMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yKGk7IGk8bGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaW1wb3J0c1tpXS5uYW1lLmluZGV4T2YoJ1JvdXRlck1vZHVsZS5mb3JDaGlsZCcpICE9PSAtMSB8fFxuICAgICAgICAgICAgICAgICAgICBpbXBvcnRzW2ldLm5hbWUuaW5kZXhPZignUm91dGVyTW9kdWxlLmZvclJvb3QnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuICAgICAgICBsaW5rTW9kdWxlc0FuZFJvdXRlczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL3NjYW4gZWFjaCBtb2R1bGUgaW1wb3J0cyBBU1QgZm9yIGVhY2ggcm91dGVzLCBhbmQgbGluayByb3V0ZXMgd2l0aCBtb2R1bGVcbiAgICAgICAgICAgIGxldCBpID0gMCxcbiAgICAgICAgICAgICAgICBsZW4gPSBtb2R1bGVzV2l0aFJvdXRlcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IoaTsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIF8uZm9yRWFjaChtb2R1bGVzV2l0aFJvdXRlc1tpXS5pbXBvcnRzTm9kZSwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pbml0aWFsaXplcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuaW5pdGlhbGl6ZXIuZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2gobm9kZS5pbml0aWFsaXplci5lbGVtZW50cywgZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2ZpbmQgZWxlbWVudCB3aXRoIGFyZ3VtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5hcmd1bWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChlbGVtZW50LmFyZ3VtZW50cywgZnVuY3Rpb24oYXJndW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2gocm91dGVzLCBmdW5jdGlvbihyb3V0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhcmd1bWVudC50ZXh0ICYmIHJvdXRlLm5hbWUgPT09IGFyZ3VtZW50LnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlLm1vZHVsZSA9IG1vZHVsZXNXaXRoUm91dGVzW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29uc3RydWN0Um91dGVzVHJlZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjb25zdHJ1Y3RSb3V0ZXNUcmVlJyk7XG4gICAgICAgICAgICAvLyByb3V0ZXNbXSBjb250YWlucyByb3V0ZXMgd2l0aCBtb2R1bGUgbGlua1xuICAgICAgICAgICAgLy8gbW9kdWxlc1RyZWUgY29udGFpbnMgbW9kdWxlcyB0cmVlXG4gICAgICAgICAgICAvLyBtYWtlIGEgZmluYWwgcm91dGVzIHRyZWUgd2l0aCB0aGF0XG4gICAgICAgICAgICBsZXQgY2xlYW5Nb2R1bGVzVHJlZSA9IF8uY2xvbmVEZWVwKG1vZHVsZXNUcmVlKSxcbiAgICAgICAgICAgICAgICBtb2R1bGVzQ2xlYW5lciA9IGZ1bmN0aW9uKGFycikge1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgaW4gYXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyW2ldLmltcG9ydHNOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGFycltpXS5pbXBvcnRzTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJbaV0ucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGFycltpXS5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhcnJbaV0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzQ2xlYW5lcihhcnJbaV0uY2hpbGRyZW4pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBtb2R1bGVzQ2xlYW5lcihjbGVhbk1vZHVsZXNUcmVlKTtcbiAgICAgICAgICAgIC8vZnMub3V0cHV0SnNvbignLi9tb2R1bGVzLmpzb24nLCBjbGVhbk1vZHVsZXNUcmVlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGVhbk1vZHVsZXNUcmVlIGxpZ2h0OiAnLCB1dGlsLmluc3BlY3QoY2xlYW5Nb2R1bGVzVHJlZSwgeyBkZXB0aDogMTAgfSkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJycpO1xuICAgICAgICAgICAgdmFyIHJvdXRlc1RyZWUgPSB7XG4gICAgICAgICAgICAgICAgdGFnOiAnPHJvb3Q+JyxcbiAgICAgICAgICAgICAgICBraW5kOiAnbmdNb2R1bGUnLFxuICAgICAgICAgICAgICAgIG5hbWU6IHJvb3RNb2R1bGUsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsZXQgZm91bmRSb3V0ZVdpdGhNb2R1bGVOYW1lID0gZnVuY3Rpb24obW9kdWxlTmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbmQocm91dGVzLCB7J21vZHVsZSc6IG1vZHVsZU5hbWV9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGxvb3BNb2R1bGVzUGFyc2VyID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaSBpbiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByb3V0ZSA9IGZvdW5kUm91dGVXaXRoTW9kdWxlTmFtZShub2RlLmNoaWxkcmVuW2ldLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlLnJvdXRlcyA9IEpTT04ucGFyc2Uocm91dGUuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcm91dGUuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlLmtpbmQgPSAnbmdNb2R1bGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVzVHJlZS5jaGlsZHJlbi5wdXNoKHJvdXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9vcE1vZHVsZXNQYXJzZXIobm9kZS5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb29wTW9kdWxlc1BhcnNlcihfLmZpbmQoY2xlYW5Nb2R1bGVzVHJlZSwgeyduYW1lJzogcm9vdE1vZHVsZX0pKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JvdXRlc1RyZWU6ICcsIHJvdXRlc1RyZWUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJycpO1xuXG4gICAgICAgICAgICAvL2ZzLm91dHB1dEpzb24oJy4vcm91dGVzLXRyZWUuanNvbicsIHJvdXRlc1RyZWUpO1xuXG4gICAgICAgICAgICB2YXIgY2xlYW5lZFJvdXRlc1RyZWU7XG5cbiAgICAgICAgICAgIHZhciBjbGVhblJvdXRlc1RyZWUgPSBmdW5jdGlvbihyb3V0ZSkge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaSBpbiByb3V0ZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm91dGVzID0gcm91dGUuY2hpbGRyZW5baV0ucm91dGVzO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyb3V0ZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcm91dGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsZWFuZWRSb3V0ZXNUcmVlID0gY2xlYW5Sb3V0ZXNUcmVlKHJvdXRlc1RyZWUpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xlYW5lZFJvdXRlc1RyZWU6ICcsIHV0aWwuaW5zcGVjdChjbGVhbmVkUm91dGVzVHJlZSwgeyBkZXB0aDogMTAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBjb25zdHJ1Y3RNb2R1bGVzVHJlZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZ2V0TmVzdGVkQ2hpbGRyZW4gPSBmdW5jdGlvbihhcnIsIHBhcmVudD8pIHtcbiAgICAgICAgICAgICAgICB2YXIgb3V0ID0gW11cbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgaW4gYXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGFycltpXS5wYXJlbnQgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gZ2V0TmVzdGVkQ2hpbGRyZW4oYXJyLCBhcnJbaV0ubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycltpXS5jaGlsZHJlbiA9IGNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQucHVzaChhcnJbaV0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vU2NhbiBlYWNoIG1vZHVsZSBhbmQgYWRkIHBhcmVudCBwcm9wZXJ0eVxuICAgICAgICAgICAgXy5mb3JFYWNoKG1vZHVsZXMsIGZ1bmN0aW9uKGZpcnN0TG9vcE1vZHVsZSkge1xuICAgICAgICAgICAgICAgIF8uZm9yRWFjaChmaXJzdExvb3BNb2R1bGUuaW1wb3J0c05vZGUsIGZ1bmN0aW9uKGltcG9ydE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKG1vZHVsZXMsIGZ1bmN0aW9uKG1vZHVsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIG1vZHVsZS5uYW1lID09PSBpbXBvcnROb2RlLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUucGFyZW50ID0gZmlyc3RMb29wTW9kdWxlLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1vZHVsZXNUcmVlID0gZ2V0TmVzdGVkQ2hpbGRyZW4obW9kdWxlcyk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpO1xuIiwiaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmxldCBjb2RlOiBzdHJpbmdbXSA9IFtdO1xuXG5leHBvcnQgbGV0IGdlbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHRtcDogdHlwZW9mIGNvZGUgPSBbXTtcblxuICAgIHJldHVybiAodG9rZW4gPSBudWxsKSA9PiB7XG4gICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyAhIHRva2VuJyk7XG4gICAgICAgICAgICByZXR1cm4gY29kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0b2tlbiA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyBcXG4nKTtcbiAgICAgICAgICAgIGNvZGUucHVzaCh0bXAuam9pbignJykpO1xuICAgICAgICAgICAgdG1wID0gW107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb2RlLnB1c2godG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbn0gKCkpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGUobm9kZTogYW55KSB7XG4gICAgY29kZSA9IFtdO1xuICAgIHZpc2l0QW5kUmVjb2duaXplKG5vZGUpO1xuICAgIHJldHVybiBjb2RlLmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiB2aXNpdEFuZFJlY29nbml6ZShub2RlOiBhbnksIGRlcHRoID0gMCkge1xuICAgIHJlY29nbml6ZShub2RlKTtcbiAgICBkZXB0aCsrO1xuICAgIG5vZGUuZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKGMgPT4gdmlzaXRBbmRSZWNvZ25pemUoYywgZGVwdGgpKTtcbn1cblxuZnVuY3Rpb24gcmVjb2duaXplKG5vZGU6IGFueSkge1xuXG4gICAgLy9jb25zb2xlLmxvZygncmVjb2duaXppbmcuLi4nLCB0cy5TeW50YXhLaW5kW25vZGUua2luZCsnJ10pO1xuXG4gICAgc3dpdGNoIChub2RlLmtpbmQpIHtcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkZpcnN0TGl0ZXJhbFRva2VuOlxuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcjpcbiAgICAgICAgICAgIGdlbignXFxcIicpO1xuICAgICAgICAgICAgZ2VuKG5vZGUudGV4dCk7XG4gICAgICAgICAgICBnZW4oJ1xcXCInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbDpcbiAgICAgICAgICAgIGdlbignXFxcIicpO1xuICAgICAgICAgICAgZ2VuKG5vZGUudGV4dCk7XG4gICAgICAgICAgICBnZW4oJ1xcXCInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5BcnJheUxpdGVyYWxFeHByZXNzaW9uOlxuICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSW1wb3J0S2V5d29yZDpcbiAgICAgICAgICAgIGdlbignaW1wb3J0Jyk7XG4gICAgICAgICAgICBnZW4oJyAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuRnJvbUtleXdvcmQ6XG4gICAgICAgICAgICBnZW4oJ2Zyb20nKTtcbiAgICAgICAgICAgIGdlbignICcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FeHBvcnRLZXl3b3JkOlxuICAgICAgICAgICAgZ2VuKCdcXG4nKTtcbiAgICAgICAgICAgIGdlbignZXhwb3J0Jyk7XG4gICAgICAgICAgICBnZW4oJyAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5DbGFzc0tleXdvcmQ6XG4gICAgICAgICAgICBnZW4oJ2NsYXNzJyk7XG4gICAgICAgICAgICBnZW4oJyAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVGhpc0tleXdvcmQ6XG4gICAgICAgICAgICBnZW4oJ3RoaXMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuQ29uc3RydWN0b3JLZXl3b3JkOlxuICAgICAgICAgICAgZ2VuKCdjb25zdHJ1Y3RvcicpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkZhbHNlS2V5d29yZDpcbiAgICAgICAgICAgIGdlbignZmFsc2UnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVHJ1ZUtleXdvcmQ6XG4gICAgICAgICAgICBnZW4oJ3RydWUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuTnVsbEtleXdvcmQ6XG4gICAgICAgICAgICBnZW4oJ251bGwnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5BdFRva2VuOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5QbHVzVG9rZW46XG4gICAgICAgICAgICBnZW4oJysnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuRXF1YWxzR3JlYXRlclRoYW5Ub2tlbjpcbiAgICAgICAgICAgIGdlbignID0+ICcpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLk9wZW5QYXJlblRva2VuOlxuICAgICAgICAgICAgZ2VuKCcoJyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSW1wb3J0Q2xhdXNlOlxuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb246XG4gICAgICAgICAgICBnZW4oJ3snKTtcbiAgICAgICAgICAgIGdlbignICcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5CbG9jazpcbiAgICAgICAgICAgIGdlbigneycpO1xuICAgICAgICAgICAgZ2VuKCdcXG4nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5DbG9zZUJyYWNlVG9rZW46XG4gICAgICAgICAgICBnZW4oJ30nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuQ2xvc2VQYXJlblRva2VuOlxuICAgICAgICAgICAgZ2VuKCcpJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLk9wZW5CcmFja2V0VG9rZW46XG4gICAgICAgICAgICBnZW4oJ1snKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuQ2xvc2VCcmFja2V0VG9rZW46XG4gICAgICAgICAgICBnZW4oJ10nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5TZW1pY29sb25Ub2tlbjpcbiAgICAgICAgICAgIGdlbignOycpO1xuICAgICAgICAgICAgZ2VuKCdcXG4nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuQ29tbWFUb2tlbjpcbiAgICAgICAgICAgIGdlbignLCcpO1xuICAgICAgICAgICAgZ2VuKCcgJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkNvbG9uVG9rZW46XG4gICAgICAgICAgICBnZW4oJyAnKTtcbiAgICAgICAgICAgIGdlbignOicpO1xuICAgICAgICAgICAgZ2VuKCcgJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkRvdFRva2VuOlxuICAgICAgICAgICAgZ2VuKCcuJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkRvU3RhdGVtZW50OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5EZWNvcmF0b3I6XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuRmlyc3RBc3NpZ25tZW50OlxuICAgICAgICAgICAgZ2VuKCcgPSAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuRmlyc3RQdW5jdHVhdGlvbjpcbiAgICAgICAgICAgIGdlbignICcpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlByaXZhdGVLZXl3b3JkOlxuICAgICAgICAgICAgZ2VuKCdwcml2YXRlJyk7XG4gICAgICAgICAgICBnZW4oJyAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuUHVibGljS2V5d29yZDpcbiAgICAgICAgICAgIGdlbigncHVibGljJyk7XG4gICAgICAgICAgICBnZW4oJyAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICd1dGlsJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0ICogYXMgX3RzIGZyb20gJy4uLy4uL3V0aWxzL3RzLWludGVybmFsJztcbmltcG9ydCBtYXJrZWQgZnJvbSAnbWFya2VkJztcbmltcG9ydCB7IGdldE5ld0xpbmVDaGFyYWN0ZXIsIGNvbXBpbGVySG9zdCwgZCwgZGV0ZWN0SW5kZW50IH0gZnJvbSAnLi4vLi4vdXRpbGl0aWVzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uLy4uL2xvZ2dlcic7XG5pbXBvcnQgeyBSb3V0ZXJQYXJzZXIgfSBmcm9tICcuLi8uLi91dGlscy9yb3V0ZXIucGFyc2VyJztcbmltcG9ydCB7IGdlbmVyYXRlIH0gZnJvbSAnLi9jb2RlZ2VuJztcblxuaW50ZXJmYWNlIE5vZGVPYmplY3Qge1xuICAgIGtpbmQ6IE51bWJlcjtcbiAgICBwb3M6IE51bWJlcjtcbiAgICBlbmQ6IE51bWJlcjtcbiAgICB0ZXh0OiBzdHJpbmc7XG4gICAgaW5pdGlhbGl6ZXI6IE5vZGVPYmplY3QsXG4gICAgbmFtZT86IHsgdGV4dDogc3RyaW5nIH07XG4gICAgZXhwcmVzc2lvbj86IE5vZGVPYmplY3Q7XG4gICAgZWxlbWVudHM/OiBOb2RlT2JqZWN0W107XG4gICAgYXJndW1lbnRzPzogTm9kZU9iamVjdFtdO1xuICAgIHByb3BlcnRpZXM/OiBhbnlbXTtcbiAgICBwYXJzZXJDb250ZXh0RmxhZ3M/OiBOdW1iZXI7XG4gICAgZXF1YWxzR3JlYXRlclRoYW5Ub2tlbj86IE5vZGVPYmplY3RbXTtcbiAgICBwYXJhbWV0ZXJzPzogTm9kZU9iamVjdFtdO1xuICAgIENvbXBvbmVudD86IFN0cmluZztcbiAgICBib2R5Pzoge1xuICAgICAgICBwb3M6IE51bWJlcjtcbiAgICAgICAgZW5kOiBOdW1iZXI7XG4gICAgICAgIHN0YXRlbWVudHM6IE5vZGVPYmplY3RbXTtcbiAgICB9XG59XG5cbmludGVyZmFjZSBEZXBzIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGxhYmVsPzogc3RyaW5nO1xuICAgIGZpbGU/OiBzdHJpbmc7XG4gICAgc291cmNlQ29kZT86IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcblxuICAgIC8vQ29tcG9uZW50XG5cbiAgICBhbmltYXRpb25zPzogc3RyaW5nW107IC8vIFRPRE9cbiAgICBjaGFuZ2VEZXRlY3Rpb24/OiBzdHJpbmc7XG4gICAgZW5jYXBzdWxhdGlvbj86IHN0cmluZztcbiAgICBlbnRyeUNvbXBvbmVudHM/OiBzdHJpbmc7IC8vIFRPRE9cbiAgICBleHBvcnRBcz86IHN0cmluZztcbiAgICBob3N0Pzogc3RyaW5nO1xuICAgIGlucHV0cz86IHN0cmluZ1tdO1xuICAgIGludGVycG9sYXRpb24/OiBzdHJpbmc7IC8vIFRPRE9cbiAgICBtb2R1bGVJZD86IHN0cmluZztcbiAgICBvdXRwdXRzPzogc3RyaW5nW107XG4gICAgcXVlcmllcz86IERlcHNbXTsgLy8gVE9ET1xuICAgIHNlbGVjdG9yPzogc3RyaW5nO1xuICAgIHN0eWxlVXJscz86IHN0cmluZ1tdO1xuICAgIHN0eWxlcz86IHN0cmluZ1tdO1xuICAgIHRlbXBsYXRlPzogc3RyaW5nO1xuICAgIHRlbXBsYXRlVXJsPzogc3RyaW5nW107XG4gICAgdmlld1Byb3ZpZGVycz86IHN0cmluZ1tdO1xuXG4gICAgaW5wdXRzQ2xhc3M/OiBPYmplY3RbXTtcblxuICAgIC8vY29tbW9uXG4gICAgcHJvdmlkZXJzPzogRGVwc1tdO1xuXG4gICAgLy9tb2R1bGVcbiAgICBkZWNsYXJhdGlvbnM/OiBEZXBzW107XG4gICAgYm9vdHN0cmFwPzogRGVwc1tdO1xuXG4gICAgaW1wb3J0cz86IERlcHNbXTtcbiAgICBleHBvcnRzPzogRGVwc1tdO1xufVxuXG5pbnRlcmZhY2UgU3ltYm9sRGVwcyB7XG4gICAgZnVsbDogc3RyaW5nO1xuICAgIGFsaWFzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZXBlbmRlbmNpZXMge1xuXG4gICAgcHJpdmF0ZSBmaWxlczogc3RyaW5nW107XG4gICAgcHJpdmF0ZSBwcm9ncmFtOiB0cy5Qcm9ncmFtO1xuICAgIHByaXZhdGUgcHJvZ3JhbUNvbXBvbmVudDogdHMuUHJvZ3JhbTtcbiAgICBwcml2YXRlIHR5cGVDaGVja2VyOiB0cy5UeXBlQ2hlY2tlcjtcbiAgICBwcml2YXRlIHR5cGVDaGVja2VyQ29tcG9uZW50OiB0cy5UeXBlQ2hlY2tlcjtcbiAgICBwcml2YXRlIGVuZ2luZTogYW55O1xuICAgIHByaXZhdGUgX19jYWNoZTogYW55ID0ge307XG4gICAgcHJpdmF0ZSBfX25zTW9kdWxlOiBhbnkgPSB7fTtcbiAgICBwcml2YXRlIHVua25vd24gPSAnPz8/JztcblxuICAgIGNvbnN0cnVjdG9yKGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogYW55KSB7XG4gICAgICAgIHRoaXMuZmlsZXMgPSBmaWxlcztcbiAgICAgICAgY29uc3QgdHJhbnNwaWxlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRhcmdldDogdHMuU2NyaXB0VGFyZ2V0LkVTNSxcbiAgICAgICAgICAgIG1vZHVsZTogdHMuTW9kdWxlS2luZC5Db21tb25KUyxcbiAgICAgICAgICAgIHRzY29uZmlnRGlyZWN0b3J5OiBvcHRpb25zLnRzY29uZmlnRGlyZWN0b3J5XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IHRzLmNyZWF0ZVByb2dyYW0odGhpcy5maWxlcywgdHJhbnNwaWxlT3B0aW9ucywgY29tcGlsZXJIb3N0KHRyYW5zcGlsZU9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJyZWFrTGluZXModGV4dCkge1xuICAgICAgICB2YXIgX3QgPSB0ZXh0O1xuICAgICAgICBpZiAodHlwZW9mIF90ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgX3QgPSBfdC5yZXBsYWNlKC8oXFxuKS9nbSwgJzxicj4nKTtcbiAgICAgICAgICAgIF90ID0gX3QucmVwbGFjZSgvKDxicj4pJC9nbSwgJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdDtcbiAgICB9XG5cbiAgICBnZXREZXBlbmRlbmNpZXMoKSB7XG4gICAgICAgIGxldCBkZXBzOiBPYmplY3QgPSB7XG4gICAgICAgICAgICAnbW9kdWxlcyc6IFtdLFxuICAgICAgICAgICAgJ2NvbXBvbmVudHMnOiBbXSxcbiAgICAgICAgICAgICdpbmplY3RhYmxlcyc6IFtdLFxuICAgICAgICAgICAgJ3BpcGVzJzogW10sXG4gICAgICAgICAgICAnZGlyZWN0aXZlcyc6IFtdLFxuICAgICAgICAgICAgJ3JvdXRlcyc6IFtdLFxuICAgICAgICAgICAgJ2NsYXNzZXMnOiBbXSxcbiAgICAgICAgICAgICdpbnRlcmZhY2VzJzogW11cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHNvdXJjZUZpbGVzID0gdGhpcy5wcm9ncmFtLmdldFNvdXJjZUZpbGVzKCkgfHwgW107XG5cbiAgICAgICAgc291cmNlRmlsZXMubWFwKChmaWxlOiB0cy5Tb3VyY2VGaWxlKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBmaWxlUGF0aCA9IGZpbGUuZmlsZU5hbWU7XG5cbiAgICAgICAgICAgIGlmIChwYXRoLmV4dG5hbWUoZmlsZVBhdGgpID09PSAnLnRzJykge1xuXG4gICAgICAgICAgICAgICAgaWYgKGZpbGVQYXRoLmxhc3RJbmRleE9mKCcuZC50cycpID09PSAtMSAmJiBmaWxlUGF0aC5sYXN0SW5kZXhPZignc3BlYy50cycpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIuaW5mbygncGFyc2luZycsIGZpbGVQYXRoKTtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTb3VyY2VGaWxlRGVjb3JhdG9ycyhmaWxlLCBkZXBzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGUsIGZpbGUuZmlsZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkZXBzO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vUm91dGVyUGFyc2VyLmxpbmtNb2R1bGVzQW5kUm91dGVzKCk7XG4gICAgICAgIC8vUm91dGVyUGFyc2VyLmNvbnN0cnVjdE1vZHVsZXNUcmVlKCk7XG4gICAgICAgIC8vUm91dGVyUGFyc2VyLmNvbnN0cnVjdFJvdXRlc1RyZWUoKTtcblxuICAgICAgICByZXR1cm4gZGVwcztcbiAgICB9XG5cblxuICAgIHByaXZhdGUgZ2V0U291cmNlRmlsZURlY29yYXRvcnMoc3JjRmlsZTogdHMuU291cmNlRmlsZSwgb3V0cHV0U3ltYm9sczogT2JqZWN0KTogdm9pZCB7XG5cbiAgICAgICAgbGV0IGNsZWFuZXIgPSAocHJvY2Vzcy5jd2QoKSArIHBhdGguc2VwKS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG4gICAgICAgIGxldCBmaWxlID0gc3JjRmlsZS5maWxlTmFtZS5yZXBsYWNlKGNsZWFuZXIsICcnKTtcblxuICAgICAgICB0aGlzLnByb2dyYW1Db21wb25lbnQgPSB0cy5jcmVhdGVQcm9ncmFtKFtmaWxlXSwge30pO1xuICAgICAgICBsZXQgc291cmNlRmlsZSA9IHRoaXMucHJvZ3JhbUNvbXBvbmVudC5nZXRTb3VyY2VGaWxlKGZpbGUpO1xuICAgICAgICB0aGlzLnR5cGVDaGVja2VyQ29tcG9uZW50ID0gdGhpcy5wcm9ncmFtQ29tcG9uZW50LmdldFR5cGVDaGVja2VyKHRydWUpO1xuXG4gICAgICAgIHRzLmZvckVhY2hDaGlsZChzcmNGaWxlLCAobm9kZTogdHMuTm9kZSkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgZGVwczogRGVwcyA9IDxEZXBzPnt9O1xuICAgICAgICAgICAgaWYgKG5vZGUuZGVjb3JhdG9ycykge1xuICAgICAgICAgICAgICAgIGxldCB2aXNpdE5vZGUgPSAodmlzaXRlZE5vZGUsIGluZGV4KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG1ldGFkYXRhID0gbm9kZS5kZWNvcmF0b3JzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHRoaXMuZ2V0U3ltYm9sZU5hbWUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wcyA9IHRoaXMuZmluZFByb3BzKHZpc2l0ZWROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IElPID0gdGhpcy5nZXRDb21wb25lbnRJTyhmaWxlLCBzb3VyY2VGaWxlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc01vZHVsZShtZXRhZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyczogdGhpcy5nZXRNb2R1bGVQcm92aWRlcnMocHJvcHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uczogdGhpcy5nZXRNb2R1bGVEZWNsYXRpb25zKHByb3BzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRzOiB0aGlzLmdldE1vZHVsZUltcG9ydHMocHJvcHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydHM6IHRoaXMuZ2V0TW9kdWxlRXhwb3J0cyhwcm9wcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vdHN0cmFwOiB0aGlzLmdldE1vZHVsZUJvb3RzdHJhcChwcm9wcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ21vZHVsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuYnJlYWtMaW5lcyhJTy5kZXNjcmlwdGlvbiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlQ29kZTogc291cmNlRmlsZS5nZXRUZXh0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoUm91dGVyUGFyc2VyLmhhc1JvdXRlck1vZHVsZUluSW1wb3J0cyhkZXBzLmltcG9ydHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUm91dGVyUGFyc2VyLmFkZE1vZHVsZVdpdGhSb3V0ZXMobmFtZSwgdGhpcy5nZXRNb2R1bGVJbXBvcnRzUmF3KHByb3BzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBSb3V0ZXJQYXJzZXIuYWRkTW9kdWxlKG5hbWUsIGRlcHMuaW1wb3J0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRTeW1ib2xzWydtb2R1bGVzJ10ucHVzaChkZXBzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzQ29tcG9uZW50KG1ldGFkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocHJvcHMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHV0aWwuaW5zcGVjdChwcm9wcywgeyBzaG93SGlkZGVuOiB0cnVlLCBkZXB0aDogMTAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hbmltYXRpb25zPzogc3RyaW5nW107IC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3Rpb246IHRoaXMuZ2V0Q29tcG9uZW50Q2hhbmdlRGV0ZWN0aW9uKHByb3BzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmNhcHN1bGF0aW9uOiB0aGlzLmdldENvbXBvbmVudEVuY2Fwc3VsYXRpb24ocHJvcHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZW50cnlDb21wb25lbnRzPzogc3RyaW5nOyAvLyBUT0RPIHdhaXRpbmcgZG9jIGluZm9zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0QXM6IHRoaXMuZ2V0Q29tcG9uZW50RXhwb3J0QXMocHJvcHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3Q6IHRoaXMuZ2V0Q29tcG9uZW50SG9zdChwcm9wcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzOiB0aGlzLmdldENvbXBvbmVudElucHV0c01ldGFkYXRhKHByb3BzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2ludGVycG9sYXRpb24/OiBzdHJpbmc7IC8vIFRPRE8gd2FpdGluZyBkb2MgaW5mb3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVJZDogdGhpcy5nZXRDb21wb25lbnRNb2R1bGVJZChwcm9wcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0czogdGhpcy5nZXRDb21wb25lbnRPdXRwdXRzKHByb3BzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnM6IHRoaXMuZ2V0Q29tcG9uZW50UHJvdmlkZXJzKHByb3BzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3F1ZXJpZXM/OiBEZXBzW107IC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjogdGhpcy5nZXRDb21wb25lbnRTZWxlY3Rvcihwcm9wcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVVcmxzOiB0aGlzLmdldENvbXBvbmVudFN0eWxlVXJscyhwcm9wcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiB0aGlzLmdldENvbXBvbmVudFN0eWxlcyhwcm9wcyksIC8vIFRPRE8gZml4IGFyZ3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogdGhpcy5nZXRDb21wb25lbnRUZW1wbGF0ZShwcm9wcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IHRoaXMuZ2V0Q29tcG9uZW50VGVtcGxhdGVVcmwocHJvcHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdQcm92aWRlcnM6IHRoaXMuZ2V0Q29tcG9uZW50Vmlld1Byb3ZpZGVycyhwcm9wcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzQ2xhc3M6IElPLmlucHV0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRzQ2xhc3M6IElPLm91dHB1dHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc0NsYXNzOiBJTy5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZHNDbGFzczogSU8ubWV0aG9kcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5icmVha0xpbmVzKElPLmRlc2NyaXB0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY29tcG9uZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VDb2RlOiBzb3VyY2VGaWxlLmdldFRleHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFN5bWJvbHNbJ2NvbXBvbmVudHMnXS5wdXNoKGRlcHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNJbmplY3RhYmxlKG1ldGFkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2luamVjdGFibGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IElPLnByb3BlcnRpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kczogSU8ubWV0aG9kcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5icmVha0xpbmVzKElPLmRlc2NyaXB0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VDb2RlOiBzb3VyY2VGaWxlLmdldFRleHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFN5bWJvbHNbJ2luamVjdGFibGVzJ10ucHVzaChkZXBzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzUGlwZShtZXRhZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwaXBlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5icmVha0xpbmVzKElPLmRlc2NyaXB0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VDb2RlOiBzb3VyY2VGaWxlLmdldFRleHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFN5bWJvbHNbJ3BpcGVzJ10ucHVzaChkZXBzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzRGlyZWN0aXZlKG1ldGFkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RpcmVjdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuYnJlYWtMaW5lcyhJTy5kZXNjcmlwdGlvbiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlQ29kZTogc291cmNlRmlsZS5nZXRUZXh0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRTeW1ib2xzWydkaXJlY3RpdmVzJ10ucHVzaChkZXBzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVidWcoZGVwcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2NhY2hlW25hbWVdID0gZGVwcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyQnlEZWNvcmF0b3JzID0gKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuZXhwcmVzc2lvbiAmJiBub2RlLmV4cHJlc3Npb24uZXhwcmVzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC8oTmdNb2R1bGV8Q29tcG9uZW50fEluamVjdGFibGV8UGlwZXxEaXJlY3RpdmUpLy50ZXN0KG5vZGUuZXhwcmVzc2lvbi5leHByZXNzaW9uLnRleHQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBub2RlLmRlY29yYXRvcnNcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmaWx0ZXJCeURlY29yYXRvcnMpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKHZpc2l0Tm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChub2RlLnN5bWJvbCkge1xuICAgICAgICAgICAgICAgIGlmKG5vZGUuc3ltYm9sLmZsYWdzID09PSB0cy5TeW1ib2xGbGFncy5DbGFzcykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHRoaXMuZ2V0U3ltYm9sZU5hbWUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBJTyA9IHRoaXMuZ2V0Q29tcG9uZW50SU8oZmlsZSwgc291cmNlRmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlcHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjbGFzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VDb2RlOiBzb3VyY2VGaWxlLmdldFRleHQoKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZihJTy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBzLnByb3BlcnRpZXMgPSBJTy5wcm9wZXJ0aWVzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKElPLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBzLmRlc2NyaXB0aW9uID0gdGhpcy5icmVha0xpbmVzKElPLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihJTy5tZXRob2RzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBzLm1ldGhvZHMgPSBJTy5tZXRob2RzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVidWcoZGVwcyk7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dFN5bWJvbHNbJ2NsYXNzZXMnXS5wdXNoKGRlcHMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihub2RlLnN5bWJvbC5mbGFncyA9PT0gdHMuU3ltYm9sRmxhZ3MuSW50ZXJmYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gdGhpcy5nZXRTeW1ib2xlTmFtZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IElPID0gdGhpcy5nZXRJbnRlcmZhY2VJTyhmaWxlLCBzb3VyY2VGaWxlLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVwcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2ludGVyZmFjZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VDb2RlOiBzb3VyY2VGaWxlLmdldFRleHQoKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZihJTy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBzLnByb3BlcnRpZXMgPSBJTy5wcm9wZXJ0aWVzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKElPLmtpbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHMua2luZCA9IElPLmtpbmQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoSU8uZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHMuZGVzY3JpcHRpb24gPSB0aGlzLmJyZWFrTGluZXMoSU8uZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKElPLm1ldGhvZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHMubWV0aG9kcyA9IElPLm1ldGhvZHM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWJ1ZyhkZXBzKTtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0U3ltYm9sc1snaW50ZXJmYWNlcyddLnB1c2goZGVwcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgSU8gPSB0aGlzLmdldFJvdXRlSU8oZmlsZSwgc291cmNlRmlsZSk7XG4gICAgICAgICAgICAgICAgaWYoSU8ucm91dGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdSb3V0ZXM7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdSb3V0ZXMgPSBKU09OLnBhcnNlKElPLnJvdXRlcy5yZXBsYWNlKC8gL2dtLCAnJykpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ1JvdXRlcyBwYXJzaW5nIGVycm9yLCBtYXliZSBhIHRyYWlsaW5nIGNvbW1hIG9yIGFuIGV4dGVybmFsIHZhcmlhYmxlID8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dFN5bWJvbHNbJ3JvdXRlcyddID0gWy4uLm91dHB1dFN5bWJvbHNbJ3JvdXRlcyddLCAuLi5uZXdSb3V0ZXNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm9kZS5raW5kID09PSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSB0aGlzLmdldFN5bWJvbGVOYW1lKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgSU8gPSB0aGlzLmdldENvbXBvbmVudElPKGZpbGUsIHNvdXJjZUZpbGUpO1xuICAgICAgICAgICAgICAgICAgICBkZXBzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY2xhc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlQ29kZTogc291cmNlRmlsZS5nZXRUZXh0KClcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYoSU8ucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwcy5wcm9wZXJ0aWVzID0gSU8ucHJvcGVydGllcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihJTy5kZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwcy5kZXNjcmlwdGlvbiA9IHRoaXMuYnJlYWtMaW5lcyhJTy5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoSU8ubWV0aG9kcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwcy5tZXRob2RzID0gSU8ubWV0aG9kcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYnVnKGRlcHMpO1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXRTeW1ib2xzWydjbGFzc2VzJ10ucHVzaChkZXBzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUua2luZCA9PT0gdHMuU3ludGF4S2luZC5FeHByZXNzaW9uU3RhdGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vRmluZCB0aGUgcm9vdCBtb2R1bGUgd2l0aCBib290c3RyYXBNb2R1bGUgY2FsbFxuICAgICAgICAgICAgICAgICAgICAvL0ZpbmQgcmVjdXNpdmVseSBpbiBleHByZXNzaW9uIG5vZGVzIG9uZSB3aXRoIG5hbWUgJ2Jvb3RzdHJhcE1vZHVsZSdcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvb3RNb2R1bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHROb2RlID0gdGhpcy5maW5kRXhwcmVzc2lvbkJ5TmFtZShub2RlLCAnYm9vdHN0cmFwTW9kdWxlJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdE5vZGUuYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2gocmVzdWx0Tm9kZS5hcmd1bWVudHMsIGZ1bmN0aW9uKGFyZ3VtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZ3VtZW50LnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RNb2R1bGUgPSBhcmd1bWVudC50ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm9vdE1vZHVsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJvdXRlclBhcnNlci5zZXRSb290TW9kdWxlKHJvb3RNb2R1bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cbiAgICBwcml2YXRlIGRlYnVnKGRlcHM6IERlcHMpIHtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdkZWJ1ZycsIGAke2RlcHMubmFtZX06YCk7XG4gICAgICAgIFtcbiAgICAgICAgICAgICdpbXBvcnRzJywgJ2V4cG9ydHMnLCAnZGVjbGFyYXRpb25zJywgJ3Byb3ZpZGVycycsICdib290c3RyYXAnXG4gICAgICAgIF0uZm9yRWFjaChzeW1ib2xzID0+IHtcbiAgICAgICAgICAgIGlmIChkZXBzW3N5bWJvbHNdICYmIGRlcHNbc3ltYm9sc10ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnJywgYC0gJHtzeW1ib2xzfTpgKTtcbiAgICAgICAgICAgICAgICBkZXBzW3N5bWJvbHNdLm1hcChpID0+IGkubmFtZSkuZm9yRWFjaChkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCcnLCBgXFx0LSAke2R9YCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kRXhwcmVzc2lvbkJ5TmFtZShlbnRyeU5vZGUsIG5hbWUpIHtcbiAgICAgICAgbGV0IHJlc3VsdCxcbiAgICAgICAgICAgIGxvb3AgPSBmdW5jdGlvbihub2RlLCBuYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYobm9kZS5leHByZXNzaW9uICYmICFub2RlLmV4cHJlc3Npb24ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBsb29wKG5vZGUuZXhwcmVzc2lvbiwgbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKG5vZGUuZXhwcmVzc2lvbiAmJiBub2RlLmV4cHJlc3Npb24ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihub2RlLmV4cHJlc3Npb24ubmFtZS50ZXh0ID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBsb29wKGVudHJ5Tm9kZSwgbmFtZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0NvbXBvbmVudChtZXRhZGF0YSkge1xuICAgICAgICByZXR1cm4gbWV0YWRhdGEuZXhwcmVzc2lvbi5leHByZXNzaW9uLnRleHQgPT09ICdDb21wb25lbnQnO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNQaXBlKG1ldGFkYXRhKSB7XG4gICAgICAgIHJldHVybiBtZXRhZGF0YS5leHByZXNzaW9uLmV4cHJlc3Npb24udGV4dCA9PT0gJ1BpcGUnO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNEaXJlY3RpdmUobWV0YWRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG1ldGFkYXRhLmV4cHJlc3Npb24uZXhwcmVzc2lvbi50ZXh0ID09PSAnRGlyZWN0aXZlJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSW5qZWN0YWJsZShtZXRhZGF0YSkge1xuICAgICAgICByZXR1cm4gbWV0YWRhdGEuZXhwcmVzc2lvbi5leHByZXNzaW9uLnRleHQgPT09ICdJbmplY3RhYmxlJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTW9kdWxlKG1ldGFkYXRhKSB7XG4gICAgICAgIHJldHVybiBtZXRhZGF0YS5leHByZXNzaW9uLmV4cHJlc3Npb24udGV4dCA9PT0gJ05nTW9kdWxlJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFR5cGUobmFtZSkge1xuICAgICAgICBsZXQgdHlwZTtcbiAgICAgICAgaWYoIG5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdjb21wb25lbnQnKSAhPT0gLTEgKSB7XG4gICAgICAgICAgICB0eXBlID0gJ2NvbXBvbmVudCc7XG4gICAgICAgIH0gZWxzZSBpZiggbmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ3BpcGUnKSAhPT0gLTEgKSB7XG4gICAgICAgICAgICB0eXBlID0gJ3BpcGUnO1xuICAgICAgICB9IGVsc2UgaWYoIG5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdtb2R1bGUnKSAhPT0gLTEgKSB7XG4gICAgICAgICAgICB0eXBlID0gJ21vZHVsZSc7XG4gICAgICAgIH0gZWxzZSBpZiggbmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2RpcmVjdGl2ZScpICE9PSAtMSApIHtcbiAgICAgICAgICAgIHR5cGUgPSAnZGlyZWN0aXZlJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFN5bWJvbGVOYW1lKG5vZGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gbm9kZS5uYW1lLnRleHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb21wb25lbnRTZWxlY3Rvcihwcm9wczogTm9kZU9iamVjdFtdKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ltYm9sRGVwcyhwcm9wcywgJ3NlbGVjdG9yJykucG9wKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb21wb25lbnRFeHBvcnRBcyhwcm9wczogTm9kZU9iamVjdFtdKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ltYm9sRGVwcyhwcm9wcywgJ2V4cG9ydEFzJykucG9wKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRNb2R1bGVQcm92aWRlcnMocHJvcHM6IE5vZGVPYmplY3RbXSk6IERlcHNbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN5bWJvbERlcHMocHJvcHMsICdwcm92aWRlcnMnKS5tYXAoKHByb3ZpZGVyTmFtZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VEZWVwSW5kZW50aWZpZXIocHJvdmlkZXJOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kUHJvcHModmlzaXRlZE5vZGUpIHtcbiAgICAgICAgaWYodmlzaXRlZE5vZGUuZXhwcmVzc2lvbi5hcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHZpc2l0ZWROb2RlLmV4cHJlc3Npb24uYXJndW1lbnRzLnBvcCgpLnByb3BlcnRpZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE1vZHVsZURlY2xhdGlvbnMocHJvcHM6IE5vZGVPYmplY3RbXSk6IERlcHNbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN5bWJvbERlcHMocHJvcHMsICdkZWNsYXJhdGlvbnMnKS5tYXAoKG5hbWUpID0+IHtcbiAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmZpbmRDb21wb25lbnRTZWxlY3RvckJ5TmFtZShuYW1lKTtcblxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlRGVlcEluZGVudGlmaWVyKG5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE1vZHVsZUltcG9ydHNSYXcocHJvcHM6IE5vZGVPYmplY3RbXSk6IERlcHNbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN5bWJvbERlcHNSYXcocHJvcHMsICdpbXBvcnRzJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRNb2R1bGVJbXBvcnRzKHByb3BzOiBOb2RlT2JqZWN0W10pOiBEZXBzW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTeW1ib2xEZXBzKHByb3BzLCAnaW1wb3J0cycpLm1hcCgobmFtZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VEZWVwSW5kZW50aWZpZXIobmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TW9kdWxlRXhwb3J0cyhwcm9wczogTm9kZU9iamVjdFtdKTogRGVwc1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ltYm9sRGVwcyhwcm9wcywgJ2V4cG9ydHMnKS5tYXAoKG5hbWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlRGVlcEluZGVudGlmaWVyKG5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbXBvbmVudEhvc3QocHJvcHM6IE5vZGVPYmplY3RbXSk6IE9iamVjdCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN5bWJvbERlcHNPYmplY3QocHJvcHMsICdob3N0Jyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRNb2R1bGVCb290c3RyYXAocHJvcHM6IE5vZGVPYmplY3RbXSk6IERlcHNbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN5bWJvbERlcHMocHJvcHMsICdib290c3RyYXAnKS5tYXAoKG5hbWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlRGVlcEluZGVudGlmaWVyKG5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbXBvbmVudElucHV0c01ldGFkYXRhKHByb3BzOiBOb2RlT2JqZWN0W10pOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN5bWJvbERlcHMocHJvcHMsICdpbnB1dHMnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERlY29yYXRvck9mVHlwZShub2RlLCBkZWNvcmF0b3JUeXBlKSB7XG4gICAgICB2YXIgZGVjb3JhdG9ycyA9IG5vZGUuZGVjb3JhdG9ycyB8fCBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZWNvcmF0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChkZWNvcmF0b3JzW2ldLmV4cHJlc3Npb24uZXhwcmVzc2lvbi50ZXh0ID09PSBkZWNvcmF0b3JUeXBlKSB7XG4gICAgICAgICAgcmV0dXJuIGRlY29yYXRvcnNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2aXNpdElucHV0KHByb3BlcnR5LCBpbkRlY29yYXRvcikge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29weXJpZ2h0IGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaW5BcmdzID0gaW5EZWNvcmF0b3IuZXhwcmVzc2lvbi5hcmd1bWVudHM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBpbkFyZ3MubGVuZ3RoID8gaW5BcmdzWzBdLnRleHQgOiBwcm9wZXJ0eS5uYW1lLnRleHQsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHByb3BlcnR5LmluaXRpYWxpemVyID8gdGhpcy5zdHJpbmdpZnlEZWZhdWx0VmFsdWUocHJvcGVydHkuaW5pdGlhbGl6ZXIpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdHlwZTogdGhpcy52aXNpdFR5cGUocHJvcGVydHkpLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IG1hcmtlZCh0cy5kaXNwbGF5UGFydHNUb1N0cmluZyhwcm9wZXJ0eS5zeW1ib2wuZ2V0RG9jdW1lbnRhdGlvbkNvbW1lbnQoKSkpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2aXNpdFR5cGUobm9kZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29weXJpZ2h0IGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gbm9kZSA/IHRoaXMudHlwZUNoZWNrZXJDb21wb25lbnQudHlwZVRvU3RyaW5nKHRoaXMudHlwZUNoZWNrZXJDb21wb25lbnQuZ2V0VHlwZUF0TG9jYXRpb24obm9kZSkpIDogJ3ZvaWQnO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmlzaXRPdXRwdXQocHJvcGVydHksIG91dERlY29yYXRvcikge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29weXJpZ2h0IGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgb3V0QXJncyA9IG91dERlY29yYXRvci5leHByZXNzaW9uLmFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IG91dEFyZ3MubGVuZ3RoID8gb3V0QXJnc1swXS50ZXh0IDogcHJvcGVydHkubmFtZS50ZXh0LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IG1hcmtlZCh0cy5kaXNwbGF5UGFydHNUb1N0cmluZyhwcm9wZXJ0eS5zeW1ib2wuZ2V0RG9jdW1lbnRhdGlvbkNvbW1lbnQoKSkpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1B1YmxpYyhtZW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKG1lbWJlci5tb2RpZmllcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzUHVibGljOiBib29sZWFuID0gbWVtYmVyLm1vZGlmaWVycy5zb21lKGZ1bmN0aW9uKG1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGlmaWVyLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuUHVibGljS2V5d29yZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGlzUHVibGljKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaXNJbnRlcm5hbE1lbWJlcihtZW1iZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNQcml2YXRlT3JJbnRlcm5hbChtZW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvcHlyaWdodCBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKG1lbWJlci5tb2RpZmllcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzUHJpdmF0ZTogYm9vbGVhbiA9IG1lbWJlci5tb2RpZmllcnMuc29tZShtb2RpZmllciA9PiBtb2RpZmllci5raW5kID09PSB0cy5TeW50YXhLaW5kLlByaXZhdGVLZXl3b3JkKTtcbiAgICAgICAgICAgIGlmIChpc1ByaXZhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pc0ludGVybmFsTWVtYmVyKG1lbWJlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0ludGVybmFsTWVtYmVyKG1lbWJlcik6IGJvb2xlYW4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29weXJpZ2h0IGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBpbnRlcm5hbFRhZ3M6IHN0cmluZ1tdID0gWydpbnRlcm5hbCcsICdwcml2YXRlJywgJ2hpZGRlbiddO1xuICAgICAgICBpZiAobWVtYmVyLmpzRG9jKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGRvYyBvZiBtZW1iZXIuanNEb2MpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9jLnRhZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB0YWcgb2YgZG9jLnRhZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnRlcm5hbFRhZ3MuaW5kZXhPZih0YWcudGFnTmFtZS50ZXh0KSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNBbmd1bGFyTGlmZWN5Y2xlSG9vayhtZXRob2ROYW1lKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3B5cmlnaHQgaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXBcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IEFOR1VMQVJfTElGRUNZQ0xFX01FVEhPRFMgPSBbXG4gICAgICAgICAgICAnbmdPbkluaXQnLCAnbmdPbkNoYW5nZXMnLCAnbmdEb0NoZWNrJywgJ25nT25EZXN0cm95JywgJ25nQWZ0ZXJDb250ZW50SW5pdCcsICduZ0FmdGVyQ29udGVudENoZWNrZWQnLFxuICAgICAgICAgICAgJ25nQWZ0ZXJWaWV3SW5pdCcsICduZ0FmdGVyVmlld0NoZWNrZWQnLCAnd3JpdGVWYWx1ZScsICdyZWdpc3Rlck9uQ2hhbmdlJywgJ3JlZ2lzdGVyT25Ub3VjaGVkJywgJ3NldERpc2FibGVkU3RhdGUnXG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiBBTkdVTEFSX0xJRkVDWUNMRV9NRVRIT0RTLmluZGV4T2YobWV0aG9kTmFtZSkgPj0gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZpc2l0Q29uc3RydWN0b3JEZWNsYXJhdGlvbihtZXRob2QpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICBpZiAobWV0aG9kLnBhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgIHZhciBfcGFyYW1ldGVycyA9IFtdLFxuICAgICAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgICAgIGxlbiA9IG1ldGhvZC5wYXJhbWV0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvcihpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5pc1B1YmxpYyhtZXRob2QucGFyYW1ldGVyc1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgX3BhcmFtZXRlcnMucHVzaCh0aGF0LnZpc2l0QXJndW1lbnQobWV0aG9kLnBhcmFtZXRlcnNbaV0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3BhcmFtZXRlcnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHZpc2l0Q2FsbERlY2xhcmF0aW9uKG1ldGhvZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IG1hcmtlZCh0cy5kaXNwbGF5UGFydHNUb1N0cmluZyhtZXRob2Quc3ltYm9sLmdldERvY3VtZW50YXRpb25Db21tZW50KCkpKSxcbiAgICAgICAgICAgIGFyZ3M6IG1ldGhvZC5wYXJhbWV0ZXJzID8gbWV0aG9kLnBhcmFtZXRlcnMubWFwKChwcm9wKSA9PiB0aGlzLnZpc2l0QXJndW1lbnQocHJvcCkpIDogW10sXG4gICAgICAgICAgICByZXR1cm5UeXBlOiB0aGlzLnZpc2l0VHlwZShtZXRob2QudHlwZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdmlzaXRJbmRleERlY2xhcmF0aW9uKG1ldGhvZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IG1hcmtlZCh0cy5kaXNwbGF5UGFydHNUb1N0cmluZyhtZXRob2Quc3ltYm9sLmdldERvY3VtZW50YXRpb25Db21tZW50KCkpKSxcbiAgICAgICAgICAgIGFyZ3M6IG1ldGhvZC5wYXJhbWV0ZXJzID8gbWV0aG9kLnBhcmFtZXRlcnMubWFwKChwcm9wKSA9PiB0aGlzLnZpc2l0QXJndW1lbnQocHJvcCkpIDogW10sXG4gICAgICAgICAgICByZXR1cm5UeXBlOiB0aGlzLnZpc2l0VHlwZShtZXRob2QudHlwZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdmlzaXRNZXRob2REZWNsYXJhdGlvbihtZXRob2QpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvcHlyaWdodCBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcFxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIG5hbWU6IG1ldGhvZC5uYW1lLnRleHQsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogbWFya2VkKHRzLmRpc3BsYXlQYXJ0c1RvU3RyaW5nKG1ldGhvZC5zeW1ib2wuZ2V0RG9jdW1lbnRhdGlvbkNvbW1lbnQoKSkpLFxuICAgICAgICAgICAgYXJnczogbWV0aG9kLnBhcmFtZXRlcnMgPyBtZXRob2QucGFyYW1ldGVycy5tYXAoKHByb3ApID0+IHRoaXMudmlzaXRBcmd1bWVudChwcm9wKSkgOiBbXSxcbiAgICAgICAgICAgIHJldHVyblR5cGU6IHRoaXMudmlzaXRUeXBlKG1ldGhvZC50eXBlKVxuICAgICAgICB9LFxuICAgICAgICAgICAganNkb2N0YWdzID0gX3RzLmdldEpTRG9jcyhtZXRob2QpO1xuICAgICAgICBpZiAoanNkb2N0YWdzICYmIGpzZG9jdGFncy5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgaWYgKGpzZG9jdGFnc1swXS50YWdzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmpzZG9jdGFncyA9IGpzZG9jdGFnc1swXS50YWdzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2aXNpdEFyZ3VtZW50KGFyZykge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29weXJpZ2h0IGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogYXJnLm5hbWUudGV4dCxcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudmlzaXRUeXBlKGFyZylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TmFtZXNDb21wYXJlRm4obmFtZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29weXJpZ2h0IGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwXG4gICAgICAgICAqL1xuICAgICAgICBuYW1lID0gbmFtZSB8fCAnbmFtZSc7XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gYVtuYW1lXS5sb2NhbGVDb21wYXJlKGJbbmFtZV0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RyaW5naWZ5RGVmYXVsdFZhbHVlKG5vZGUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvcHlyaWdodCBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKG5vZGUudGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUudGV4dDtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuRmFsc2VLZXl3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2ZhbHNlJztcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuVHJ1ZUtleXdvcmQpIHtcbiAgICAgICAgICAgIHJldHVybiAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHZpc2l0UHJvcGVydHkocHJvcGVydHkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvcHlyaWdodCBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcFxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IHByb3BlcnR5Lm5hbWUudGV4dCxcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogcHJvcGVydHkuaW5pdGlhbGl6ZXIgPyB0aGlzLnN0cmluZ2lmeURlZmF1bHRWYWx1ZShwcm9wZXJ0eS5pbml0aWFsaXplcikgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0eXBlOiB0aGlzLnZpc2l0VHlwZShwcm9wZXJ0eSksXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogbWFya2VkKHRzLmRpc3BsYXlQYXJ0c1RvU3RyaW5nKHByb3BlcnR5LnN5bWJvbC5nZXREb2N1bWVudGF0aW9uQ29tbWVudCgpKSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZpc2l0TWVtYmVycyhtZW1iZXJzKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3B5cmlnaHQgaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXBcbiAgICAgICAgICovXG4gICAgICAgIHZhciBpbnB1dHMgPSBbXTtcbiAgICAgICAgdmFyIG91dHB1dHMgPSBbXTtcbiAgICAgICAgdmFyIG1ldGhvZHMgPSBbXTtcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBbXTtcbiAgICAgICAgdmFyIGtpbmQ7XG4gICAgICAgIHZhciBpbnB1dERlY29yYXRvciwgb3V0RGVjb3JhdG9yO1xuXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpbnB1dERlY29yYXRvciA9IHRoaXMuZ2V0RGVjb3JhdG9yT2ZUeXBlKG1lbWJlcnNbaV0sICdJbnB1dCcpO1xuICAgICAgICAgICAgb3V0RGVjb3JhdG9yID0gdGhpcy5nZXREZWNvcmF0b3JPZlR5cGUobWVtYmVyc1tpXSwgJ091dHB1dCcpO1xuXG4gICAgICAgICAgICBraW5kID0gbWVtYmVyc1tpXS5raW5kO1xuXG4gICAgICAgICAgICBpZiAoaW5wdXREZWNvcmF0b3IpIHtcbiAgICAgICAgICAgICAgICBpbnB1dHMucHVzaCh0aGlzLnZpc2l0SW5wdXQobWVtYmVyc1tpXSwgaW5wdXREZWNvcmF0b3IpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3V0RGVjb3JhdG9yKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0cy5wdXNoKHRoaXMudmlzaXRPdXRwdXQobWVtYmVyc1tpXSwgb3V0RGVjb3JhdG9yKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzUHJpdmF0ZU9ySW50ZXJuYWwobWVtYmVyc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoKG1lbWJlcnNbaV0ua2luZCA9PT0gdHMuU3ludGF4S2luZC5NZXRob2REZWNsYXJhdGlvbiB8fFxuICAgICAgICAgICAgICAgICAgICBtZW1iZXJzW2ldLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuTWV0aG9kU2lnbmF0dXJlKSAmJlxuICAgICAgICAgICAgICAgICAgICAhdGhpcy5pc0FuZ3VsYXJMaWZlY3ljbGVIb29rKG1lbWJlcnNbaV0ubmFtZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2RzLnB1c2godGhpcy52aXNpdE1ldGhvZERlY2xhcmF0aW9uKG1lbWJlcnNbaV0pKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICBtZW1iZXJzW2ldLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuUHJvcGVydHlEZWNsYXJhdGlvbiB8fFxuICAgICAgICAgICAgICAgICAgICBtZW1iZXJzW2ldLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuUHJvcGVydHlTaWduYXR1cmUgfHwgbWVtYmVyc1tpXS5raW5kID09PSB0cy5TeW50YXhLaW5kLkdldEFjY2Vzc29yKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaCh0aGlzLnZpc2l0UHJvcGVydHkobWVtYmVyc1tpXSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWVtYmVyc1tpXS5raW5kID09PSB0cy5TeW50YXhLaW5kLkNhbGxTaWduYXR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHRoaXMudmlzaXRDYWxsRGVjbGFyYXRpb24obWVtYmVyc1tpXSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWVtYmVyc1tpXS5raW5kID09PSB0cy5TeW50YXhLaW5kLkluZGV4U2lnbmF0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaCh0aGlzLnZpc2l0SW5kZXhEZWNsYXJhdGlvbihtZW1iZXJzW2ldKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtZW1iZXJzW2ldLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IF9jb25zdHJ1Y3RvclByb3BlcnRpZXMgPSB0aGlzLnZpc2l0Q29uc3RydWN0b3JEZWNsYXJhdGlvbihtZW1iZXJzW2ldKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gX2NvbnN0cnVjdG9yUHJvcGVydGllcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGZvcihqOyBqPGxlbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goX2NvbnN0cnVjdG9yUHJvcGVydGllc1tqXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbnB1dHMuc29ydCh0aGlzLmdldE5hbWVzQ29tcGFyZUZuKCkpO1xuICAgICAgICBvdXRwdXRzLnNvcnQodGhpcy5nZXROYW1lc0NvbXBhcmVGbigpKTtcbiAgICAgICAgcHJvcGVydGllcy5zb3J0KHRoaXMuZ2V0TmFtZXNDb21wYXJlRm4oKSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlucHV0cyxcbiAgICAgICAgICAgIG91dHB1dHMsXG4gICAgICAgICAgICBtZXRob2RzLFxuICAgICAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgICAgIGtpbmRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZpc2l0RGlyZWN0aXZlRGVjb3JhdG9yKGRlY29yYXRvcikge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29weXJpZ2h0IGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgc2VsZWN0b3I7XG4gICAgICAgIHZhciBleHBvcnRBcztcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBkZWNvcmF0b3IuZXhwcmVzc2lvbi5hcmd1bWVudHNbMF0ucHJvcGVydGllcztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2ldLm5hbWUudGV4dCA9PT0gJ3NlbGVjdG9yJykge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IHRoaXMgd2lsbCBvbmx5IHdvcmsgaWYgc2VsZWN0b3IgaXMgaW5pdGlhbGl6ZWQgYXMgYSBzdHJpbmcgbGl0ZXJhbFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gcHJvcGVydGllc1tpXS5pbml0aWFsaXplci50ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNbaV0ubmFtZS50ZXh0ID09PSAnZXhwb3J0QXMnKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogdGhpcyB3aWxsIG9ubHkgd29yayBpZiBzZWxlY3RvciBpcyBpbml0aWFsaXplZCBhcyBhIHN0cmluZyBsaXRlcmFsXG4gICAgICAgICAgICAgICAgZXhwb3J0QXMgPSBwcm9wZXJ0aWVzW2ldLmluaXRpYWxpemVyLnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2VsZWN0b3IsXG4gICAgICAgICAgICBleHBvcnRBc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNQaXBlRGVjb3JhdG9yKGRlY29yYXRvcikge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29weXJpZ2h0IGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwXG4gICAgICAgICAqL1xuICAgICAgICAgcmV0dXJuIGRlY29yYXRvci5leHByZXNzaW9uLmV4cHJlc3Npb24udGV4dCA9PT0gJ1BpcGUnO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNNb2R1bGVEZWNvcmF0b3IoZGVjb3JhdG9yKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3B5cmlnaHQgaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXBcbiAgICAgICAgICovXG4gICAgICAgICByZXR1cm4gZGVjb3JhdG9yLmV4cHJlc3Npb24uZXhwcmVzc2lvbi50ZXh0ID09PSAnTmdNb2R1bGUnO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNEaXJlY3RpdmVEZWNvcmF0b3IoZGVjb3JhdG9yKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3B5cmlnaHQgaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXBcbiAgICAgICAgICovXG4gICAgICAgIHZhciBkZWNvcmF0b3JJZGVudGlmaWVyVGV4dCA9IGRlY29yYXRvci5leHByZXNzaW9uLmV4cHJlc3Npb24udGV4dDtcbiAgICAgICAgcmV0dXJuIGRlY29yYXRvcklkZW50aWZpZXJUZXh0ID09PSAnRGlyZWN0aXZlJyB8fCBkZWNvcmF0b3JJZGVudGlmaWVyVGV4dCA9PT0gJ0NvbXBvbmVudCc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1NlcnZpY2VEZWNvcmF0b3IoZGVjb3JhdG9yKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3B5cmlnaHQgaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXBcbiAgICAgICAgICovXG4gICAgICAgICByZXR1cm4gZGVjb3JhdG9yLmV4cHJlc3Npb24uZXhwcmVzc2lvbi50ZXh0ID09PSAnSW5qZWN0YWJsZSc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2aXNpdENsYXNzRGVjbGFyYXRpb24oZmlsZU5hbWUsIGNsYXNzRGVjbGFyYXRpb24pIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvcHlyaWdodCBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcFxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHN5bWJvbCA9IHRoaXMucHJvZ3JhbS5nZXRUeXBlQ2hlY2tlcigpLmdldFN5bWJvbEF0TG9jYXRpb24oY2xhc3NEZWNsYXJhdGlvbi5uYW1lKTtcbiAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gbWFya2VkKHRzLmRpc3BsYXlQYXJ0c1RvU3RyaW5nKHN5bWJvbC5nZXREb2N1bWVudGF0aW9uQ29tbWVudCgpKSk7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSBjbGFzc0RlY2xhcmF0aW9uLm5hbWUudGV4dDtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZUluZm87XG4gICAgICAgIHZhciBtZW1iZXJzO1xuXG4gICAgICAgIGlmIChjbGFzc0RlY2xhcmF0aW9uLmRlY29yYXRvcnMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3NEZWNsYXJhdGlvbi5kZWNvcmF0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXJlY3RpdmVEZWNvcmF0b3IoY2xhc3NEZWNsYXJhdGlvbi5kZWNvcmF0b3JzW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVJbmZvID0gdGhpcy52aXNpdERpcmVjdGl2ZURlY29yYXRvcihjbGFzc0RlY2xhcmF0aW9uLmRlY29yYXRvcnNbaV0pO1xuICAgICAgICAgICAgICAgICAgICBtZW1iZXJzID0gdGhpcy52aXNpdE1lbWJlcnMoY2xhc3NEZWNsYXJhdGlvbi5tZW1iZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzOiBtZW1iZXJzLmlucHV0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dHM6IG1lbWJlcnMub3V0cHV0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IG1lbWJlcnMucHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZHM6IG1lbWJlcnMubWV0aG9kcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQ6IG1lbWJlcnMua2luZFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1NlcnZpY2VEZWNvcmF0b3IoY2xhc3NEZWNsYXJhdGlvbi5kZWNvcmF0b3JzW2ldKSkge1xuICAgICAgICAgICAgICAgICAgbWVtYmVycyA9IHRoaXMudmlzaXRNZW1iZXJzKGNsYXNzRGVjbGFyYXRpb24ubWVtYmVycyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZHM6IG1lbWJlcnMubWV0aG9kcyxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogbWVtYmVycy5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgICAgICBraW5kOiBtZW1iZXJzLmtpbmRcbiAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNQaXBlRGVjb3JhdG9yKGNsYXNzRGVjbGFyYXRpb24uZGVjb3JhdG9yc1tpXSkgfHwgdGhpcy5pc01vZHVsZURlY29yYXRvcihjbGFzc0RlY2xhcmF0aW9uLmRlY29yYXRvcnNbaV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgbWVtYmVycyA9IHRoaXMudmlzaXRNZW1iZXJzKGNsYXNzRGVjbGFyYXRpb24ubWVtYmVycyk7XG5cbiAgICAgICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIG1ldGhvZHM6IG1lbWJlcnMubWV0aG9kcyxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBtZW1iZXJzLnByb3BlcnRpZXMsXG4gICAgICAgICAgICAgICAga2luZDogbWVtYmVycy5raW5kXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lbWJlcnMgPSB0aGlzLnZpc2l0TWVtYmVycyhjbGFzc0RlY2xhcmF0aW9uLm1lbWJlcnMpO1xuXG4gICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICBtZXRob2RzOiBtZW1iZXJzLm1ldGhvZHMsXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczogbWVtYmVycy5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgIGtpbmQ6IG1lbWJlcnMua2luZFxuICAgICAgICAgICAgfV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2aXNpdEVudW1EZWNsYXJhdGlvbihmaWxlTmFtZSwgbm9kZSkge1xuICAgICAgICBpZiggbm9kZS5kZWNsYXJhdGlvbkxpc3QuZGVjbGFyYXRpb25zICkge1xuICAgICAgICAgICAgbGV0IGkgPSAwLFxuICAgICAgICAgICAgICAgIGxlbiA9IG5vZGUuZGVjbGFyYXRpb25MaXN0LmRlY2xhcmF0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IoaTsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmKG5vZGUuZGVjbGFyYXRpb25MaXN0LmRlY2xhcmF0aW9uc1tpXS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKG5vZGUuZGVjbGFyYXRpb25MaXN0LmRlY2xhcmF0aW9uc1tpXS50eXBlLnR5cGVOYW1lICYmIG5vZGUuZGVjbGFyYXRpb25MaXN0LmRlY2xhcmF0aW9uc1tpXS50eXBlLnR5cGVOYW1lLnRleHQgPT09ICdSb3V0ZXMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBSb3V0ZXJQYXJzZXIuYWRkUm91dGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5vZGUuZGVjbGFyYXRpb25MaXN0LmRlY2xhcmF0aW9uc1tpXS5uYW1lLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZ2VuZXJhdGUobm9kZS5kZWNsYXJhdGlvbkxpc3QuZGVjbGFyYXRpb25zW2ldLmluaXRpYWxpemVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXM6IGdlbmVyYXRlKG5vZGUuZGVjbGFyYXRpb25MaXN0LmRlY2xhcmF0aW9uc1tpXS5pbml0aWFsaXplcilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJvdXRlSU8oZmlsZW5hbWUsIHNvdXJjZUZpbGUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvcHlyaWdodCBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcFxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHJlcyA9IHNvdXJjZUZpbGUuc3RhdGVtZW50cy5yZWR1Y2UoKGRpcmVjdGl2ZSwgc3RhdGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZW1lbnQua2luZCA9PT0gdHMuU3ludGF4S2luZC5WYXJpYWJsZVN0YXRlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXJlY3RpdmUuY29uY2F0KHRoaXMudmlzaXRFbnVtRGVjbGFyYXRpb24oZmlsZW5hbWUsIHN0YXRlbWVudCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgICAgICB9LCBbXSlcblxuICAgICAgICByZXR1cm4gcmVzWzBdIHx8IHt9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29tcG9uZW50SU8oZmlsZW5hbWU6IHN0cmluZywgc291cmNlRmlsZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29weXJpZ2h0IGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgcmVzID0gc291cmNlRmlsZS5zdGF0ZW1lbnRzLnJlZHVjZSgoZGlyZWN0aXZlLCBzdGF0ZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgaWYgKHN0YXRlbWVudC5raW5kID09PSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlyZWN0aXZlLmNvbmNhdCh0aGlzLnZpc2l0Q2xhc3NEZWNsYXJhdGlvbihmaWxlbmFtZSwgc3RhdGVtZW50KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgICAgIH0sIFtdKVxuXG4gICAgICAgIHJldHVybiByZXNbMF0gfHwge307XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJbnRlcmZhY2VJTyhmaWxlbmFtZTogc3RyaW5nLCBzb3VyY2VGaWxlLCBub2RlKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3B5cmlnaHQgaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXBcbiAgICAgICAgICovXG4gICAgICAgIHZhciByZXMgPSBzb3VyY2VGaWxlLnN0YXRlbWVudHMucmVkdWNlKChkaXJlY3RpdmUsIHN0YXRlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoc3RhdGVtZW50LmtpbmQgPT09IHRzLlN5bnRheEtpbmQuSW50ZXJmYWNlRGVjbGFyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGVtZW50LnBvcyA9PT0gbm9kZS5wb3MgJiYgc3RhdGVtZW50LmVuZCA9PT0gbm9kZS5lbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZS5jb25jYXQodGhpcy52aXNpdENsYXNzRGVjbGFyYXRpb24oZmlsZW5hbWUsIHN0YXRlbWVudCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICAgICAgfSwgW10pXG5cbiAgICAgICAgcmV0dXJuIHJlc1swXSB8fCB7fTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbXBvbmVudE91dHB1dHMocHJvcHM6IE5vZGVPYmplY3RbXSk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ltYm9sRGVwcyhwcm9wcywgJ291dHB1dHMnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbXBvbmVudFByb3ZpZGVycyhwcm9wczogTm9kZU9iamVjdFtdKTogRGVwc1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ltYm9sRGVwcyhwcm9wcywgJ3Byb3ZpZGVycycpLm1hcCgobmFtZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VEZWVwSW5kZW50aWZpZXIobmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29tcG9uZW50Vmlld1Byb3ZpZGVycyhwcm9wczogTm9kZU9iamVjdFtdKTogRGVwc1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ltYm9sRGVwcyhwcm9wcywgJ3ZpZXdQcm92aWRlcnMnKS5tYXAoKG5hbWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlRGVlcEluZGVudGlmaWVyKG5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbXBvbmVudERpcmVjdGl2ZXMocHJvcHM6IE5vZGVPYmplY3RbXSk6IERlcHNbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN5bWJvbERlcHMocHJvcHMsICdkaXJlY3RpdmVzJykubWFwKChuYW1lKSA9PiB7XG4gICAgICAgICAgICBsZXQgaWRlbnRpZmllciA9IHRoaXMucGFyc2VEZWVwSW5kZW50aWZpZXIobmFtZSk7XG4gICAgICAgICAgICBpZGVudGlmaWVyLnNlbGVjdG9yID0gdGhpcy5maW5kQ29tcG9uZW50U2VsZWN0b3JCeU5hbWUobmFtZSk7XG4gICAgICAgICAgICBpZGVudGlmaWVyLmxhYmVsID0gJyc7XG4gICAgICAgICAgICByZXR1cm4gaWRlbnRpZmllcjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZURlZXBJbmRlbnRpZmllcihuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBsZXQgbnNNb2R1bGUgPSBuYW1lLnNwbGl0KCcuJyksXG4gICAgICAgICAgICB0eXBlID0gdGhpcy5nZXRUeXBlKG5hbWUpO1xuICAgICAgICBpZiAobnNNb2R1bGUubGVuZ3RoID4gMSkge1xuXG4gICAgICAgICAgICAvLyBjYWNoZSBkZXBzIHdpdGggdGhlIHNhbWUgbmFtZXNwYWNlIChpLmUgU2hhcmVkLiopXG4gICAgICAgICAgICBpZiAodGhpcy5fX25zTW9kdWxlW25zTW9kdWxlWzBdXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX19uc01vZHVsZVtuc01vZHVsZVswXV0ucHVzaChuYW1lKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX25zTW9kdWxlW25zTW9kdWxlWzBdXSA9IFtuYW1lXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuczogbnNNb2R1bGVbMF0sXG4gICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb21wb25lbnRUZW1wbGF0ZVVybChwcm9wczogTm9kZU9iamVjdFtdKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZVVybHModGhpcy5nZXRTeW1ib2xEZXBzKHByb3BzLCAndGVtcGxhdGVVcmwnKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb21wb25lbnRUZW1wbGF0ZShwcm9wczogTm9kZU9iamVjdFtdKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHQgPSB0aGlzLmdldFN5bWJvbERlcHMocHJvcHMsICd0ZW1wbGF0ZScsIHRydWUpLnBvcCgpXG4gICAgICAgIGlmKHQpIHtcbiAgICAgICAgICAgIHQgPSBkZXRlY3RJbmRlbnQodCwgMCk7XG4gICAgICAgICAgICB0ID0gdC5yZXBsYWNlKC9cXG4vLCAnJyk7XG4gICAgICAgICAgICB0ID0gdC5yZXBsYWNlKC8gKyQvZ20sICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbXBvbmVudFN0eWxlVXJscyhwcm9wczogTm9kZU9iamVjdFtdKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZVVybHModGhpcy5nZXRTeW1ib2xEZXBzKHByb3BzLCAnc3R5bGVVcmxzJykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29tcG9uZW50U3R5bGVzKHByb3BzOiBOb2RlT2JqZWN0W10pOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN5bWJvbERlcHMocHJvcHMsICdzdHlsZXMnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbXBvbmVudE1vZHVsZUlkKHByb3BzOiBOb2RlT2JqZWN0W10pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTeW1ib2xEZXBzKHByb3BzLCAnbW9kdWxlSWQnKS5wb3AoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbXBvbmVudENoYW5nZURldGVjdGlvbihwcm9wczogTm9kZU9iamVjdFtdKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ltYm9sRGVwcyhwcm9wcywgJ2NoYW5nZURldGVjdGlvbicpLnBvcCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29tcG9uZW50RW5jYXBzdWxhdGlvbihwcm9wczogTm9kZU9iamVjdFtdKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTeW1ib2xEZXBzKHByb3BzLCAnZW5jYXBzdWxhdGlvbicpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2FuaXRpemVVcmxzKHVybHM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB1cmxzLm1hcCh1cmwgPT4gdXJsLnJlcGxhY2UoJy4vJywgJycpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFN5bWJvbERlcHNPYmplY3QocHJvcHM6IE5vZGVPYmplY3RbXSwgdHlwZTogc3RyaW5nLCBtdWx0aUxpbmU/OiBib29sZWFuKTogT2JqZWN0IHtcbiAgICAgICAgbGV0IGRlcHMgPSBwcm9wcy5maWx0ZXIoKG5vZGU6IE5vZGVPYmplY3QpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBub2RlLm5hbWUudGV4dCA9PT0gdHlwZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHBhcnNlUHJvcGVydGllcyA9IChub2RlOiBOb2RlT2JqZWN0KTogT2JqZWN0ID0+IHtcbiAgICAgICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgICAgIChub2RlLmluaXRpYWxpemVyLnByb3BlcnRpZXMgfHwgW10pLmZvckVhY2goKHByb3A6IE5vZGVPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBvYmpbcHJvcC5uYW1lLnRleHRdID0gcHJvcC5pbml0aWFsaXplci50ZXh0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBkZXBzLm1hcChwYXJzZVByb3BlcnRpZXMpLnBvcCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U3ltYm9sRGVwc1Jhdyhwcm9wczogTm9kZU9iamVjdFtdLCB0eXBlOiBzdHJpbmcsIG11bHRpTGluZT86IGJvb2xlYW4pOiBhbnkge1xuICAgICAgICBsZXQgZGVwcyA9IHByb3BzLmZpbHRlcigobm9kZTogTm9kZU9iamVjdCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUubmFtZS50ZXh0ID09PSB0eXBlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlcHMgfHwgW107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRTeW1ib2xEZXBzKHByb3BzOiBOb2RlT2JqZWN0W10sIHR5cGU6IHN0cmluZywgbXVsdGlMaW5lPzogYm9vbGVhbik6IHN0cmluZ1tdIHtcblxuICAgICAgICBsZXQgZGVwcyA9IHByb3BzLmZpbHRlcigobm9kZTogTm9kZU9iamVjdCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUubmFtZS50ZXh0ID09PSB0eXBlO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcGFyc2VTeW1ib2xUZXh0ID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKHRleHQuaW5kZXhPZignLycpICE9PSAtMSAmJiAhbXVsdGlMaW5lKSB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgYnVpbGRJZGVudGlmaWVyTmFtZSA9IChub2RlOiBOb2RlT2JqZWN0LCBuYW1lID0gJycpID0+IHtcblxuICAgICAgICAgICAgaWYgKG5vZGUuZXhwcmVzc2lvbikge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lID8gYC4ke25hbWV9YCA6IG5hbWU7XG5cbiAgICAgICAgICAgICAgICBsZXQgbm9kZU5hbWUgPSB0aGlzLnVua25vd247XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlTmFtZSA9IG5vZGUubmFtZS50ZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChub2RlLnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZU5hbWUgPSBub2RlLnRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUuZXhwcmVzc2lvbikge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmV4cHJlc3Npb24udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZU5hbWUgPSBub2RlLmV4cHJlc3Npb24udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKG5vZGUuZXhwcmVzc2lvbi5lbGVtZW50cykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5leHByZXNzaW9uLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQXJyYXlMaXRlcmFsRXhwcmVzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVOYW1lID0gbm9kZS5leHByZXNzaW9uLmVsZW1lbnRzLm1hcCggZWwgPT4gZWwudGV4dCApLmpvaW4oJywgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZU5hbWUgPSBgWyR7bm9kZU5hbWV9XWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChub2RlLmtpbmQgPT09ICB0cy5TeW50YXhLaW5kLlNwcmVhZEVsZW1lbnRFeHByZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgLi4uJHtub2RlTmFtZX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7YnVpbGRJZGVudGlmaWVyTmFtZShub2RlLmV4cHJlc3Npb24sIG5vZGVOYW1lKX0ke25hbWV9YFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYCR7bm9kZS50ZXh0fS4ke25hbWV9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJzZVByb3ZpZGVyQ29uZmlndXJhdGlvbiA9IChvOiBOb2RlT2JqZWN0KTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgIC8vIHBhcnNlIGV4cHJlc3Npb25zIHN1Y2ggYXM6XG4gICAgICAgICAgICAvLyB7IHByb3ZpZGU6IEFQUF9CQVNFX0hSRUYsIHVzZVZhbHVlOiAnLycgfSxcbiAgICAgICAgICAgIC8vIG9yXG4gICAgICAgICAgICAvLyB7IHByb3ZpZGU6ICdEYXRlJywgdXNlRmFjdG9yeTogKGQxLCBkMikgPT4gbmV3IERhdGUoKSwgZGVwczogWydkMScsICdkMiddIH1cblxuICAgICAgICAgICAgbGV0IF9nZW5Qcm92aWRlck5hbWU6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBsZXQgX3Byb3ZpZGVyUHJvcHM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgICAgIChvLnByb3BlcnRpZXMgfHwgW10pLmZvckVhY2goKHByb3A6IE5vZGVPYmplY3QpID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBpZGVudGlmaWVyID0gcHJvcC5pbml0aWFsaXplci50ZXh0O1xuICAgICAgICAgICAgICAgIGlmIChwcm9wLmluaXRpYWxpemVyLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyID0gYCcke2lkZW50aWZpZXJ9J2A7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gbGFtYmRhIGZ1bmN0aW9uIChpLmUgdXNlRmFjdG9yeSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcC5pbml0aWFsaXplci5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJhbXMgPSAocHJvcC5pbml0aWFsaXplci5wYXJhbWV0ZXJzIHx8IDxhbnk+W10pLm1hcCgocGFyYW1zOiBOb2RlT2JqZWN0KSA9PiBwYXJhbXMubmFtZS50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpZmllciA9IGAoJHtwYXJhbXMuam9pbignLCAnKX0pID0+IHt9YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBmYWN0b3J5IGRlcHMgYXJyYXlcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9wLmluaXRpYWxpemVyLmVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtZW50cyA9IChwcm9wLmluaXRpYWxpemVyLmVsZW1lbnRzIHx8IFtdKS5tYXAoKG46IE5vZGVPYmplY3QpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4ua2luZCA9PT0gdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAnJHtuLnRleHR9J2A7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuLnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyID0gYFske2VsZW1lbnRzLmpvaW4oJywgJyl9XWA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgX3Byb3ZpZGVyUHJvcHMucHVzaChbXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaS5lIHByb3ZpZGVcbiAgICAgICAgICAgICAgICAgICAgcHJvcC5uYW1lLnRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaS5lIE9wYXF1ZVRva2VuIG9yICdTdHJpbmdUb2tlbidcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpZmllclxuXG4gICAgICAgICAgICAgICAgXS5qb2luKCc6ICcpKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBgeyAke19wcm92aWRlclByb3BzLmpvaW4oJywgJyl9IH1gO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhcnNlU3ltYm9sRWxlbWVudHMgPSAobzogTm9kZU9iamVjdCB8IGFueSk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICAvLyBwYXJzZSBleHByZXNzaW9ucyBzdWNoIGFzOiBBbmd1bGFyRmlyZU1vZHVsZS5pbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKVxuICAgICAgICAgICAgaWYgKG8uYXJndW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IGJ1aWxkSWRlbnRpZmllck5hbWUoby5leHByZXNzaW9uKTtcblxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGFyZ3VtZW50cyBjb3VsZCBiZSByZWFsbHkgY29tcGxleGUuIFRoZXJlIGFyZSBzb1xuICAgICAgICAgICAgICAgIC8vIG1hbnkgdXNlIGNhc2VzIHRoYXQgd2UgY2FuJ3QgaGFuZGxlLiBKdXN0IHByaW50IFwiYXJnc1wiIHRvIGluZGljYXRlXG4gICAgICAgICAgICAgICAgLy8gdGhhdCB3ZSBoYXZlIGFyZ3VtZW50cy5cblxuICAgICAgICAgICAgICAgIGxldCBmdW5jdGlvbkFyZ3MgPSBvLmFyZ3VtZW50cy5sZW5ndGggPiAwID8gJ2FyZ3MnIDogJyc7XG4gICAgICAgICAgICAgICAgbGV0IHRleHQgPSBgJHtjbGFzc05hbWV9KCR7ZnVuY3Rpb25BcmdzfSlgO1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBwYXJzZSBleHByZXNzaW9ucyBzdWNoIGFzOiBTaGFyZWQuTW9kdWxlXG4gICAgICAgICAgICBlbHNlIGlmIChvLmV4cHJlc3Npb24pIHtcbiAgICAgICAgICAgICAgICBsZXQgaWRlbnRpZmllciA9IGJ1aWxkSWRlbnRpZmllck5hbWUobyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkZW50aWZpZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvLnRleHQgPyBvLnRleHQgOiBwYXJzZVByb3ZpZGVyQ29uZmlndXJhdGlvbihvKTtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgcGFyc2VTeW1ib2xzID0gKG5vZGU6IE5vZGVPYmplY3QpOiBzdHJpbmdbXSA9PiB7XG5cbiAgICAgICAgICAgIGxldCB0ZXh0ID0gbm9kZS5pbml0aWFsaXplci50ZXh0O1xuICAgICAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VTeW1ib2xUZXh0KHRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbHNlIGlmIChub2RlLmluaXRpYWxpemVyLmV4cHJlc3Npb24pIHtcbiAgICAgICAgICAgICAgICBsZXQgaWRlbnRpZmllciA9IHBhcnNlU3ltYm9sRWxlbWVudHMobm9kZS5pbml0aWFsaXplcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpZmllclxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUuaW5pdGlhbGl6ZXIuZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5pbml0aWFsaXplci5lbGVtZW50cy5tYXAocGFyc2VTeW1ib2xFbGVtZW50cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRlcHMubWFwKHBhcnNlU3ltYm9scykucG9wKCkgfHwgW107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kQ29tcG9uZW50U2VsZWN0b3JCeU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fY2FjaGVbbmFtZV07XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBMaXZlU2VydmVyIGZyb20gJ2xpdmUtc2VydmVyJztcbmltcG9ydCAqIGFzIFNoZWxsanMgZnJvbSAnc2hlbGxqcyc7XG5pbXBvcnQgbWFya2VkIGZyb20gJ21hcmtlZCc7XG5cbmNvbnN0IGdsb2I6IGFueSA9IHJlcXVpcmUoJ2dsb2InKTtcblxuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCB7IEh0bWxFbmdpbmUgfSBmcm9tICcuL2VuZ2luZXMvaHRtbC5lbmdpbmUnO1xuaW1wb3J0IHsgTWFya2Rvd25FbmdpbmUgfSBmcm9tICcuL2VuZ2luZXMvbWFya2Rvd24uZW5naW5lJztcbmltcG9ydCB7IEZpbGVFbmdpbmUgfSBmcm9tICcuL2VuZ2luZXMvZmlsZS5lbmdpbmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgSUNvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgJGRlcGVuZGVuY2llc0VuZ2luZSB9IGZyb20gJy4vZW5naW5lcy9kZXBlbmRlbmNpZXMuZW5naW5lJztcbmltcG9ydCB7IE5nZEVuZ2luZSB9IGZyb20gJy4vZW5naW5lcy9uZ2QuZW5naW5lJztcbmltcG9ydCB7IFNlYXJjaEVuZ2luZSB9IGZyb20gJy4vZW5naW5lcy9zZWFyY2guZW5naW5lJztcbmltcG9ydCB7IERlcGVuZGVuY2llcyB9IGZyb20gJy4vY29tcGlsZXIvZGVwZW5kZW5jaWVzJztcbmltcG9ydCB7IFJvdXRlclBhcnNlciB9IGZyb20gJy4uL3V0aWxzL3JvdXRlci5wYXJzZXInO1xuXG5pbXBvcnQgeyBDT01QT0RPQ19ERUZBVUxUUyB9IGZyb20gJy4uL3V0aWxzL2RlZmF1bHRzJztcblxubGV0IHBrZyA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpLFxuICAgIGN3ZCA9IHByb2Nlc3MuY3dkKCksXG4gICAgJGh0bWxlbmdpbmUgPSBuZXcgSHRtbEVuZ2luZSgpLFxuICAgICRmaWxlZW5naW5lID0gbmV3IEZpbGVFbmdpbmUoKSxcbiAgICAkbWFya2Rvd25lbmdpbmUgPSBuZXcgTWFya2Rvd25FbmdpbmUoKSxcbiAgICAkbmdkZW5naW5lID0gbmV3IE5nZEVuZ2luZSgpLFxuICAgICRzZWFyY2hFbmdpbmUgPSBuZXcgU2VhcmNoRW5naW5lKCksXG4gICAgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcblxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uIHtcbiAgICBvcHRpb25zOk9iamVjdDtcbiAgICBmaWxlczogQXJyYXk8c3RyaW5nPjtcblxuICAgIGNvbmZpZ3VyYXRpb246SUNvbmZpZ3VyYXRpb247XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgY29tcG9kb2MgYXBwbGljYXRpb24gaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucyB0aGF0IHNob3VsZCBiZSB1c2VkLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/Ok9iamVjdCkge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBDb25maWd1cmF0aW9uLmdldEluc3RhbmNlKCk7XG5cbiAgICAgICAgZm9yIChsZXQgb3B0aW9uIGluIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhW29wdGlvbl0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhW29wdGlvbl0gPSBvcHRpb25zW29wdGlvbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydCBjb21wb2RvY1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZW5lcmF0ZSgpIHtcbiAgICAgICAgJGh0bWxlbmdpbmUuaW5pdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzUGFja2FnZUpzb24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0RmlsZXMoZmlsZXM6QXJyYXk8c3RyaW5nPikge1xuICAgICAgICB0aGlzLmZpbGVzID0gZmlsZXM7XG4gICAgfVxuXG4gICAgcHJvY2Vzc1BhY2thZ2VKc29uKCkge1xuICAgICAgICBsb2dnZXIuaW5mbygnU2VhcmNoaW5nIHBhY2thZ2UuanNvbiBmaWxlJyk7XG4gICAgICAgICRmaWxlZW5naW5lLmdldCgncGFja2FnZS5qc29uJykudGhlbigocGFja2FnZURhdGEpID0+IHtcbiAgICAgICAgICAgIGxldCBwYXJzZWREYXRhID0gSlNPTi5wYXJzZShwYWNrYWdlRGF0YSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcnNlZERhdGEubmFtZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLmRvY3VtZW50YXRpb25NYWluTmFtZSA9PT0gQ09NUE9ET0NfREVGQVVMVFMudGl0bGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuZG9jdW1lbnRhdGlvbk1haW5OYW1lID0gcGFyc2VkRGF0YS5uYW1lICsgJyBkb2N1bWVudGF0aW9uJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyc2VkRGF0YS5kZXNjcmlwdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuZG9jdW1lbnRhdGlvbk1haW5EZXNjcmlwdGlvbiA9IHBhcnNlZERhdGEuZGVzY3JpcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dnZXIuaW5mbygncGFja2FnZS5qc29uIGZpbGUgZm91bmQnKTtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc01hcmtkb3duKCk7XG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdDb250aW51aW5nIHdpdGhvdXQgcGFja2FnZS5qc29uIGZpbGUnKTtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc01hcmtkb3duKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb2Nlc3NNYXJrZG93bigpIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oJ1NlYXJjaGluZyBSRUFETUUubWQgZmlsZScpO1xuICAgICAgICAkbWFya2Rvd25lbmdpbmUuZ2V0UmVhZG1lRmlsZSgpLnRoZW4oKHJlYWRtZURhdGE6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmFkZFBhZ2Uoe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdpbmRleCcsXG4gICAgICAgICAgICAgICAgY29udGV4dDogJ3JlYWRtZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmFkZFBhZ2Uoe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdvdmVydmlldycsXG4gICAgICAgICAgICAgICAgY29udGV4dDogJ292ZXJ2aWV3J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEucmVhZG1lID0gcmVhZG1lRGF0YTtcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvKCdSRUFETUUubWQgZmlsZSBmb3VuZCcpO1xuICAgICAgICAgICAgdGhpcy5nZXREZXBlbmRlbmNpZXNEYXRhKCk7XG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdDb250aW51aW5nIHdpdGhvdXQgUkVBRE1FLm1kIGZpbGUnKTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5hZGRQYWdlKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnaW5kZXgnLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6ICdvdmVydmlldydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5nZXREZXBlbmRlbmNpZXNEYXRhKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldERlcGVuZGVuY2llc0RhdGEoKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKCdHZXQgZGVwZW5kZW5jaWVzIGRhdGEnKTtcblxuICAgICAgICBsZXQgY3Jhd2xlciA9IG5ldyBEZXBlbmRlbmNpZXMoXG4gICAgICAgICAgdGhpcy5maWxlcywge1xuICAgICAgICAgICAgdHNjb25maWdEaXJlY3Rvcnk6IGN3ZFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgZGVwZW5kZW5jaWVzRGF0YSA9IGNyYXdsZXIuZ2V0RGVwZW5kZW5jaWVzKCk7XG5cbiAgICAgICAgJGRlcGVuZGVuY2llc0VuZ2luZS5pbml0KGRlcGVuZGVuY2llc0RhdGEpO1xuXG4gICAgICAgIC8vUm91dGVyUGFyc2VyLnByaW50Um91dGVzKCk7XG5cbiAgICAgICAgdGhpcy5wcmVwYXJlTW9kdWxlcygpO1xuXG4gICAgICAgIHRoaXMucHJlcGFyZUNvbXBvbmVudHMoKS50aGVuKChyZWFkbWVEYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoJGRlcGVuZGVuY2llc0VuZ2luZS5kaXJlY3RpdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVEaXJlY3RpdmVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJGRlcGVuZGVuY2llc0VuZ2luZS5pbmplY3RhYmxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlSW5qZWN0YWJsZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkZGVwZW5kZW5jaWVzRW5naW5lLnJvdXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlUm91dGVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkZGVwZW5kZW5jaWVzRW5naW5lLnBpcGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVQaXBlcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGRlcGVuZGVuY2llc0VuZ2luZS5jbGFzc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVDbGFzc2VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkZGVwZW5kZW5jaWVzRW5naW5lLmludGVyZmFjZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZUludGVyZmFjZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuZGlzYWJsZUNvdmVyYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlQ292ZXJhZ2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzUGFnZXMoKTtcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByZXBhcmVNb2R1bGVzKCkge1xuICAgICAgICBsb2dnZXIuaW5mbygnUHJlcGFyZSBtb2R1bGVzJyk7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5tb2R1bGVzID0gJGRlcGVuZGVuY2llc0VuZ2luZS5nZXRNb2R1bGVzKCk7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5hZGRQYWdlKHtcbiAgICAgICAgICAgIG5hbWU6ICdtb2R1bGVzJyxcbiAgICAgICAgICAgIGNvbnRleHQ6ICdtb2R1bGVzJ1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGkgPSAwLFxuICAgICAgICAgICAgbGVuID0gdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLm1vZHVsZXMubGVuZ3RoO1xuXG4gICAgICAgIGZvcihpOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uYWRkUGFnZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogJ21vZHVsZXMnLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5tb2R1bGVzW2ldLm5hbWUsXG4gICAgICAgICAgICAgICAgY29udGV4dDogJ21vZHVsZScsXG4gICAgICAgICAgICAgICAgbW9kdWxlOiB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEubW9kdWxlc1tpXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmVwYXJlUGlwZXMgPSAoKSA9PiB7XG4gICAgICAgIGxvZ2dlci5pbmZvKCdQcmVwYXJlIHBpcGVzJyk7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5waXBlcyA9ICRkZXBlbmRlbmNpZXNFbmdpbmUuZ2V0UGlwZXMoKTtcbiAgICAgICAgbGV0IGkgPSAwLFxuICAgICAgICAgICAgbGVuID0gdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLnBpcGVzLmxlbmd0aDtcblxuICAgICAgICBmb3IoaTsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmFkZFBhZ2Uoe1xuICAgICAgICAgICAgICAgIHBhdGg6ICdwaXBlcycsXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLnBpcGVzW2ldLm5hbWUsXG4gICAgICAgICAgICAgICAgY29udGV4dDogJ3BpcGUnLFxuICAgICAgICAgICAgICAgIHBpcGU6IHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5waXBlc1tpXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmVwYXJlQ2xhc3NlcyA9ICgpID0+IHtcbiAgICAgICAgbG9nZ2VyLmluZm8oJ1ByZXBhcmUgY2xhc3NlcycpO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuY2xhc3NlcyA9ICRkZXBlbmRlbmNpZXNFbmdpbmUuZ2V0Q2xhc3NlcygpO1xuICAgICAgICBsZXQgaSA9IDAsXG4gICAgICAgICAgICBsZW4gPSB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuY2xhc3Nlcy5sZW5ndGg7XG5cbiAgICAgICAgZm9yKGk7IGk8bGVuOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5hZGRQYWdlKHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnY2xhc3NlcycsXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLmNsYXNzZXNbaV0ubmFtZSxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiAnY2xhc3MnLFxuICAgICAgICAgICAgICAgIGNsYXNzOiB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuY2xhc3Nlc1tpXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmVwYXJlSW50ZXJmYWNlcygpIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oJ1ByZXBhcmUgaW50ZXJmYWNlcycpO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuaW50ZXJmYWNlcyA9ICRkZXBlbmRlbmNpZXNFbmdpbmUuZ2V0SW50ZXJmYWNlcygpO1xuICAgICAgICBsZXQgaSA9IDAsXG4gICAgICAgICAgICBsZW4gPSB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuaW50ZXJmYWNlcy5sZW5ndGg7XG4gICAgICAgIGZvcihpOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uYWRkUGFnZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogJ2ludGVyZmFjZXMnLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5pbnRlcmZhY2VzW2ldLm5hbWUsXG4gICAgICAgICAgICAgICAgY29udGV4dDogJ2ludGVyZmFjZScsXG4gICAgICAgICAgICAgICAgaW50ZXJmYWNlOiB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuaW50ZXJmYWNlc1tpXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmVwYXJlQ29tcG9uZW50cygpIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oJ1ByZXBhcmUgY29tcG9uZW50cycpO1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoYXQuY29uZmlndXJhdGlvbi5tYWluRGF0YS5jb21wb25lbnRzID0gJGRlcGVuZGVuY2llc0VuZ2luZS5nZXRDb21wb25lbnRzKCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbGV0IGkgPSAwLFxuICAgICAgICAgICAgICAgIGxlbiA9IHRoYXQuY29uZmlndXJhdGlvbi5tYWluRGF0YS5jb21wb25lbnRzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBsb29wID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiggaSA8PSBsZW4tMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpcm5hbWUgPSBwYXRoLmRpcm5hbWUodGhhdC5jb25maWd1cmF0aW9uLm1haW5EYXRhLmNvbXBvbmVudHNbaV0uZmlsZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZG1lRmlsZSA9IGRpcm5hbWUgKyBwYXRoLnNlcCArICdSRUFETUUubWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocmVhZG1lRmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuaW5mbygnUkVBRE1FLm1kIGV4aXN0IGZvciB0aGlzIGNvbXBvbmVudCwgaW5jbHVkZSBpdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZzLnJlYWRGaWxlKHJlYWRtZUZpbGUsICd1dGY4JywgKGVyciwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY29uZmlndXJhdGlvbi5tYWluRGF0YS5jb21wb25lbnRzW2ldLnJlYWRtZSA9IG1hcmtlZChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jb25maWd1cmF0aW9uLmFkZFBhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2NvbXBvbmVudHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhhdC5jb25maWd1cmF0aW9uLm1haW5EYXRhLmNvbXBvbmVudHNbaV0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6ICdjb21wb25lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiB0aGF0LmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuY29tcG9uZW50c1tpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb29wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY29uZmlndXJhdGlvbi5hZGRQYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2NvbXBvbmVudHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGF0LmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuY29tcG9uZW50c1tpXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiAnY29tcG9uZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiB0aGF0LmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuY29tcG9uZW50c1tpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb29wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgbG9vcCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcmVwYXJlRGlyZWN0aXZlcyA9ICgpID0+IHtcbiAgICAgICAgbG9nZ2VyLmluZm8oJ1ByZXBhcmUgZGlyZWN0aXZlcycpO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuZGlyZWN0aXZlcyA9ICRkZXBlbmRlbmNpZXNFbmdpbmUuZ2V0RGlyZWN0aXZlcygpO1xuXG4gICAgICAgIGxldCBpID0gMCxcbiAgICAgICAgICAgIGxlbiA9IHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5kaXJlY3RpdmVzLmxlbmd0aDtcblxuICAgICAgICBmb3IoaTsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmFkZFBhZ2Uoe1xuICAgICAgICAgICAgICAgIHBhdGg6ICdkaXJlY3RpdmVzJyxcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuZGlyZWN0aXZlc1tpXS5uYW1lLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6ICdkaXJlY3RpdmUnLFxuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZTogdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLmRpcmVjdGl2ZXNbaV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJlcGFyZUluamVjdGFibGVzKCkge1xuICAgICAgICBsb2dnZXIuaW5mbygnUHJlcGFyZSBpbmplY3RhYmxlcycpO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuaW5qZWN0YWJsZXMgPSAkZGVwZW5kZW5jaWVzRW5naW5lLmdldEluamVjdGFibGVzKCk7XG5cbiAgICAgICAgbGV0IGkgPSAwLFxuICAgICAgICAgICAgbGVuID0gdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLmluamVjdGFibGVzLmxlbmd0aDtcblxuICAgICAgICBmb3IoaTsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmFkZFBhZ2Uoe1xuICAgICAgICAgICAgICAgIHBhdGg6ICdpbmplY3RhYmxlcycsXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLmluamVjdGFibGVzW2ldLm5hbWUsXG4gICAgICAgICAgICAgICAgY29udGV4dDogJ2luamVjdGFibGUnLFxuICAgICAgICAgICAgICAgIGluamVjdGFibGU6IHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5pbmplY3RhYmxlc1tpXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmVwYXJlUm91dGVzKCkge1xuICAgICAgICBsb2dnZXIuaW5mbygnUHJvY2VzcyByb3V0ZXMnKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLnJvdXRlcyA9ICRkZXBlbmRlbmNpZXNFbmdpbmUuZ2V0Um91dGVzKCk7XG5cbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmFkZFBhZ2Uoe1xuICAgICAgICAgICAgbmFtZTogJ3JvdXRlcycsXG4gICAgICAgICAgICBjb250ZXh0OiAncm91dGVzJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcmVwYXJlQ292ZXJhZ2UoKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKCdQcm9jZXNzIGRvY3VtZW50YXRpb24gY292ZXJhZ2UgcmVwb3J0Jyk7XG5cbiAgICAgICAgLypcbiAgICAgICAgICogbG9vcCB3aXRoIGNvbXBvbmVudHMsIGNsYXNzZXMsIGluamVjdGFibGVzLCBpbnRlcmZhY2VzLCBwaXBlc1xuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGZpbGVzID0gW10sXG4gICAgICAgICAgICB0b3RhbFByb2plY3RTdGF0ZW1lbnREb2N1bWVudGVkID0gMCxcbiAgICAgICAgICAgIGdldFN0YXR1cyA9IGZ1bmN0aW9uKHBlcmNlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhdHVzO1xuICAgICAgICAgICAgICAgIGlmIChwZXJjZW50IDw9IDI1KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9ICdsb3cnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGVyY2VudCA+IDI1ICYmIHBlcmNlbnQgPD0gNTApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gJ21lZGl1bSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwZXJjZW50ID4gNTAgJiYgcGVyY2VudCA8PSA3NSkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSAnZ29vZCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gJ3ZlcnktZ29vZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuY29tcG9uZW50cywgKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNsID0ge1xuICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aDogY29tcG9uZW50LmZpbGUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGNvbXBvbmVudC50eXBlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb21wb25lbnQubmFtZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdG90YWxTdGF0ZW1lbnREb2N1bWVudGVkID0gMCxcbiAgICAgICAgICAgICAgICB0b3RhbFN0YXRlbWVudHMgPSBjb21wb25lbnQucHJvcGVydGllc0NsYXNzLmxlbmd0aCArIGNvbXBvbmVudC5tZXRob2RzQ2xhc3MubGVuZ3RoICsgY29tcG9uZW50LmlucHV0c0NsYXNzLmxlbmd0aCArIGNvbXBvbmVudC5vdXRwdXRzQ2xhc3MubGVuZ3RoO1xuICAgICAgICAgICAgXy5mb3JFYWNoKGNvbXBvbmVudC5wcm9wZXJ0aWVzQ2xhc3MsIChwcm9wZXJ0eSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHByb3BlcnR5LmRlc2NyaXB0aW9uICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF8uZm9yRWFjaChjb21wb25lbnQubWV0aG9kc0NsYXNzLCAobWV0aG9kKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYobWV0aG9kLmRlc2NyaXB0aW9uICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF8uZm9yRWFjaChjb21wb25lbnQuaW5wdXRzQ2xhc3MsIChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGlucHV0LmRlc2NyaXB0aW9uICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF8uZm9yRWFjaChjb21wb25lbnQub3V0cHV0c0NsYXNzLCAob3V0cHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYob3V0cHV0LmRlc2NyaXB0aW9uICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNsLmNvdmVyYWdlUGVyY2VudCA9IE1hdGguZmxvb3IoKHRvdGFsU3RhdGVtZW50RG9jdW1lbnRlZCAvIHRvdGFsU3RhdGVtZW50cykgKiAxMDApO1xuICAgICAgICAgICAgaWYodG90YWxTdGF0ZW1lbnRzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY2wuY292ZXJhZ2VQZXJjZW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsLmNvdmVyYWdlQ291bnQgPSB0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQgKyAnLycgKyB0b3RhbFN0YXRlbWVudHM7XG4gICAgICAgICAgICBjbC5zdGF0dXMgPSBnZXRTdGF0dXMoY2wuY292ZXJhZ2VQZXJjZW50KTtcbiAgICAgICAgICAgIHRvdGFsUHJvamVjdFN0YXRlbWVudERvY3VtZW50ZWQgKz0gY2wuY292ZXJhZ2VQZXJjZW50O1xuICAgICAgICAgICAgZmlsZXMucHVzaChjbCk7XG4gICAgICAgIH0pXG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuY2xhc3NlcywgKGNsYXNzZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGNsID0ge1xuICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aDogY2xhc3NlLmZpbGUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjbGFzc2UnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjbGFzc2UubmFtZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdG90YWxTdGF0ZW1lbnREb2N1bWVudGVkID0gMCxcbiAgICAgICAgICAgICAgICB0b3RhbFN0YXRlbWVudHMgPSBjbGFzc2UucHJvcGVydGllcy5sZW5ndGggKyBjbGFzc2UubWV0aG9kcy5sZW5ndGg7XG4gICAgICAgICAgICBfLmZvckVhY2goY2xhc3NlLnByb3BlcnRpZXMsIChwcm9wZXJ0eSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHByb3BlcnR5LmRlc2NyaXB0aW9uICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF8uZm9yRWFjaChjbGFzc2UubWV0aG9kcywgKG1ldGhvZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKG1ldGhvZC5kZXNjcmlwdGlvbiAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxTdGF0ZW1lbnREb2N1bWVudGVkICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjbC5jb3ZlcmFnZVBlcmNlbnQgPSBNYXRoLmZsb29yKCh0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQgLyB0b3RhbFN0YXRlbWVudHMpICogMTAwKTtcbiAgICAgICAgICAgIGlmKHRvdGFsU3RhdGVtZW50cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNsLmNvdmVyYWdlUGVyY2VudCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbC5jb3ZlcmFnZUNvdW50ID0gdG90YWxTdGF0ZW1lbnREb2N1bWVudGVkICsgJy8nICsgdG90YWxTdGF0ZW1lbnRzO1xuICAgICAgICAgICAgY2wuc3RhdHVzID0gZ2V0U3RhdHVzKGNsLmNvdmVyYWdlUGVyY2VudCk7XG4gICAgICAgICAgICB0b3RhbFByb2plY3RTdGF0ZW1lbnREb2N1bWVudGVkICs9IGNsLmNvdmVyYWdlUGVyY2VudDtcbiAgICAgICAgICAgIGZpbGVzLnB1c2goY2wpO1xuICAgICAgICB9KTtcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5pbmplY3RhYmxlcywgKGluamVjdGFibGUpID0+IHtcbiAgICAgICAgICAgIGxldCBjbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGg6IGluamVjdGFibGUuZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogaW5qZWN0YWJsZS50eXBlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBpbmplY3RhYmxlLm5hbWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRvdGFsU3RhdGVtZW50RG9jdW1lbnRlZCA9IDAsXG4gICAgICAgICAgICAgICAgdG90YWxTdGF0ZW1lbnRzID0gaW5qZWN0YWJsZS5wcm9wZXJ0aWVzLmxlbmd0aCArIGluamVjdGFibGUubWV0aG9kcy5sZW5ndGg7XG4gICAgICAgICAgICBfLmZvckVhY2goaW5qZWN0YWJsZS5wcm9wZXJ0aWVzLCAocHJvcGVydHkpID0+IHtcbiAgICAgICAgICAgICAgICBpZihwcm9wZXJ0eS5kZXNjcmlwdGlvbiAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxTdGF0ZW1lbnREb2N1bWVudGVkICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfLmZvckVhY2goaW5qZWN0YWJsZS5tZXRob2RzLCAobWV0aG9kKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYobWV0aG9kLmRlc2NyaXB0aW9uICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNsLmNvdmVyYWdlUGVyY2VudCA9IE1hdGguZmxvb3IoKHRvdGFsU3RhdGVtZW50RG9jdW1lbnRlZCAvIHRvdGFsU3RhdGVtZW50cykgKiAxMDApO1xuICAgICAgICAgICAgaWYodG90YWxTdGF0ZW1lbnRzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY2wuY292ZXJhZ2VQZXJjZW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsLmNvdmVyYWdlQ291bnQgPSB0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQgKyAnLycgKyB0b3RhbFN0YXRlbWVudHM7XG4gICAgICAgICAgICBjbC5zdGF0dXMgPSBnZXRTdGF0dXMoY2wuY292ZXJhZ2VQZXJjZW50KTtcbiAgICAgICAgICAgIHRvdGFsUHJvamVjdFN0YXRlbWVudERvY3VtZW50ZWQgKz0gY2wuY292ZXJhZ2VQZXJjZW50O1xuICAgICAgICAgICAgZmlsZXMucHVzaChjbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBfLmZvckVhY2godGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLmludGVyZmFjZXMsIChpbnRlcikgPT4ge1xuICAgICAgICAgICAgbGV0IGNsID0ge1xuICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aDogaW50ZXIuZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogaW50ZXIudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogaW50ZXIubmFtZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdG90YWxTdGF0ZW1lbnREb2N1bWVudGVkID0gMCxcbiAgICAgICAgICAgICAgICB0b3RhbFN0YXRlbWVudHMgPSBpbnRlci5wcm9wZXJ0aWVzLmxlbmd0aCArIGludGVyLm1ldGhvZHMubGVuZ3RoO1xuICAgICAgICAgICAgXy5mb3JFYWNoKGludGVyLnByb3BlcnRpZXMsIChwcm9wZXJ0eSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHByb3BlcnR5LmRlc2NyaXB0aW9uICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF8uZm9yRWFjaChpbnRlci5tZXRob2RzLCAobWV0aG9kKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYobWV0aG9kLmRlc2NyaXB0aW9uICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNsLmNvdmVyYWdlUGVyY2VudCA9IE1hdGguZmxvb3IoKHRvdGFsU3RhdGVtZW50RG9jdW1lbnRlZCAvIHRvdGFsU3RhdGVtZW50cykgKiAxMDApO1xuICAgICAgICAgICAgaWYodG90YWxTdGF0ZW1lbnRzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY2wuY292ZXJhZ2VQZXJjZW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsLmNvdmVyYWdlQ291bnQgPSB0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQgKyAnLycgKyB0b3RhbFN0YXRlbWVudHM7XG4gICAgICAgICAgICBjbC5zdGF0dXMgPSBnZXRTdGF0dXMoY2wuY292ZXJhZ2VQZXJjZW50KTtcbiAgICAgICAgICAgIHRvdGFsUHJvamVjdFN0YXRlbWVudERvY3VtZW50ZWQgKz0gY2wuY292ZXJhZ2VQZXJjZW50O1xuICAgICAgICAgICAgZmlsZXMucHVzaChjbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBfLmZvckVhY2godGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLnBpcGVzLCAocGlwZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGNsID0ge1xuICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aDogcGlwZS5maWxlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBwaXBlLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHBpcGUubmFtZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdG90YWxTdGF0ZW1lbnREb2N1bWVudGVkID0gMCxcbiAgICAgICAgICAgICAgICB0b3RhbFN0YXRlbWVudHMgPSAxO1xuICAgICAgICAgICAgaWYgKHBpcGUuZGVzY3JpcHRpb24gIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdG90YWxTdGF0ZW1lbnREb2N1bWVudGVkICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbC5jb3ZlcmFnZVBlcmNlbnQgPSBNYXRoLmZsb29yKCh0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQgLyB0b3RhbFN0YXRlbWVudHMpICogMTAwKTtcbiAgICAgICAgICAgIGNsLmNvdmVyYWdlQ291bnQgPSB0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQgKyAnLycgKyB0b3RhbFN0YXRlbWVudHM7XG4gICAgICAgICAgICBjbC5zdGF0dXMgPSBnZXRTdGF0dXMoY2wuY292ZXJhZ2VQZXJjZW50KTtcbiAgICAgICAgICAgIHRvdGFsUHJvamVjdFN0YXRlbWVudERvY3VtZW50ZWQgKz0gY2wuY292ZXJhZ2VQZXJjZW50O1xuICAgICAgICAgICAgZmlsZXMucHVzaChjbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBmaWxlcyA9IF8uc29ydEJ5KGZpbGVzLCBbJ2ZpbGVQYXRoJ10pO1xuICAgICAgICB2YXIgY292ZXJhZ2VEYXRhID0ge1xuICAgICAgICAgICAgY291bnQ6IE1hdGguZmxvb3IodG90YWxQcm9qZWN0U3RhdGVtZW50RG9jdW1lbnRlZCAvIGZpbGVzLmxlbmd0aCksXG4gICAgICAgICAgICBzdGF0dXM6ICcnXG4gICAgICAgIH07XG4gICAgICAgIGNvdmVyYWdlRGF0YS5zdGF0dXMgPSBnZXRTdGF0dXMoY292ZXJhZ2VEYXRhLmNvdW50KTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmFkZFBhZ2Uoe1xuICAgICAgICAgICAgbmFtZTogJ2NvdmVyYWdlJyxcbiAgICAgICAgICAgIGNvbnRleHQ6ICdjb3ZlcmFnZScsXG4gICAgICAgICAgICBmaWxlczogZmlsZXMsXG4gICAgICAgICAgICBkYXRhOiBjb3ZlcmFnZURhdGFcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvY2Vzc1BhZ2VzKCkge1xuICAgICAgICBsb2dnZXIuaW5mbygnUHJvY2VzcyBwYWdlcycpO1xuICAgICAgICBsZXQgcGFnZXMgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucGFnZXMsXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGxlbiA9IHBhZ2VzLmxlbmd0aCxcbiAgICAgICAgICAgIGxvb3AgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoIGkgPD0gbGVuLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmluZm8oJ1Byb2Nlc3MgcGFnZScsIHBhZ2VzW2ldLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAkaHRtbGVuZ2luZS5yZW5kZXIodGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLCBwYWdlc1tpXSkudGhlbigoaHRtbERhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5hbFBhdGggPSB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEub3V0cHV0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLm91dHB1dC5sYXN0SW5kZXhPZignLycpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsUGF0aCArPSAnLyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFnZXNbaV0ucGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsUGF0aCArPSBwYWdlc1tpXS5wYXRoICsgJy8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxQYXRoICs9IHBhZ2VzW2ldLm5hbWUgKyAnLmh0bWwnO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNlYXJjaEVuZ2luZS5pbmRleFBhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9zOiBwYWdlc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdEYXRhOiBodG1sRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGZpbmFsUGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcy5vdXRwdXRGaWxlKHBhdGgucmVzb2x2ZShmaW5hbFBhdGgpLCBodG1sRGF0YSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdFcnJvciBkdXJpbmcgJyArIHBhZ2VzW2ldLm5hbWUgKyAnIHBhZ2UgZ2VuZXJhdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9vcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHNlYXJjaEVuZ2luZS5nZW5lcmF0ZVNlYXJjaEluZGV4SnNvbih0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEub3V0cHV0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzUmVzb3VyY2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgbG9vcCgpO1xuICAgIH1cblxuICAgIHByb2Nlc3NSZXNvdXJjZXMoKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKCdDb3B5IG1haW4gcmVzb3VyY2VzJyk7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgZnMuY29weShwYXRoLnJlc29sdmUoX19kaXJuYW1lICsgJy8uLi9zcmMvcmVzb3VyY2VzLycpLCBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSArIHBhdGguc2VwICsgdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLm91dHB1dCksIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmKGVycikge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcignRXJyb3IgZHVyaW5nIHJlc291cmNlcyBjb3B5ICcsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5jb25maWd1cmF0aW9uLm1haW5EYXRhLmV4dFRoZW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGZzLmNvcHkocGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCkgKyBwYXRoLnNlcCArIHRoYXQuY29uZmlndXJhdGlvbi5tYWluRGF0YS5leHRUaGVtZSksIHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpICsgcGF0aC5zZXAgKyB0aGF0LmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEub3V0cHV0ICsgJy9zdHlsZXMvJyksIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ0Vycm9yIGR1cmluZyBleHRlcm5hbCBzdHlsaW5nIHRoZW1lIGNvcHkgJywgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmluZm8oJ0V4dGVybmFsIHN0eWxpbmcgdGhlbWUgY29weSBzdWNjZWVkZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByb2Nlc3NHcmFwaHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnByb2Nlc3NHcmFwaHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb2Nlc3NHcmFwaHMoKSB7XG5cbiAgICAgICAgY29uc3Qgb25Db21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBmaW5hbFRpbWUgPSAobmV3IERhdGUoKSAtIHN0YXJ0VGltZSkgLyAxMDAwO1xuICAgICAgICAgICAgbG9nZ2VyLmluZm8oJ0RvY3VtZW50YXRpb24gZ2VuZXJhdGVkIGluICcgKyB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEub3V0cHV0ICsgJyBpbiAnICsgZmluYWxUaW1lICsgJyBzZWNvbmRzIHVzaW5nICcgKyB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEudGhlbWUgKyAnIHRoZW1lJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLnNlcnZlKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmluZm8oYFNlcnZpbmcgZG9jdW1lbnRhdGlvbiBmcm9tICR7dGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLm91dHB1dH0gYXQgaHR0cDovLzEyNy4wLjAuMToke3RoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5wb3J0fWApO1xuICAgICAgICAgICAgICAgIHRoaXMucnVuV2ViU2VydmVyKHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5vdXRwdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuZGlzYWJsZUdyYXBoKSB7XG5cbiAgICAgICAgICAgIGxvZ2dlci5pbmZvKCdHcmFwaCBnZW5lcmF0aW9uIGRpc2FibGVkJyk7XG4gICAgICAgICAgICBvbkNvbXBsZXRlKCk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbG9nZ2VyLmluZm8oJ1Byb2Nlc3MgbWFpbiBncmFwaCcpO1xuICAgICAgICAgICAgbGV0IG1vZHVsZXMgPSB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEubW9kdWxlcyxcbiAgICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICAgIGxlbiA9IG1vZHVsZXMubGVuZ3RoLFxuICAgICAgICAgICAgICBsb29wID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYoIGkgPD0gbGVuLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuaW5mbygnUHJvY2VzcyBtb2R1bGUgZ3JhcGgnLCBtb2R1bGVzW2ldLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5hbFBhdGggPSB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEub3V0cHV0O1xuICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5vdXRwdXQubGFzdEluZGV4T2YoJy8nKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxQYXRoICs9ICcvJztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgZmluYWxQYXRoICs9ICdtb2R1bGVzLycgKyBtb2R1bGVzW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgJG5nZGVuZ2luZS5yZW5kZXJHcmFwaChtb2R1bGVzW2ldLmZpbGUsIGZpbmFsUGF0aCwgJ2YnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsb29wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IGZpbmFsTWFpbkdyYXBoUGF0aCA9IHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5vdXRwdXQ7XG4gICAgICAgICAgICBpZihmaW5hbE1haW5HcmFwaFBhdGgubGFzdEluZGV4T2YoJy8nKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBmaW5hbE1haW5HcmFwaFBhdGggKz0gJy8nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxNYWluR3JhcGhQYXRoICs9ICdncmFwaCc7XG4gICAgICAgICAgICAkbmdkZW5naW5lLnJlbmRlckdyYXBoKHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS50c2NvbmZpZywgcGF0aC5yZXNvbHZlKGZpbmFsTWFpbkdyYXBoUGF0aCksICdwJykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9vcCgpO1xuICAgICAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcignRXJyb3IgZHVyaW5nIGdyYXBoIGdlbmVyYXRpb246ICcsIGVycik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcnVuV2ViU2VydmVyKGZvbGRlcikge1xuICAgICAgICBMaXZlU2VydmVyLnN0YXJ0KHtcbiAgICAgICAgICAgIHJvb3Q6IGZvbGRlcixcbiAgICAgICAgICAgIG9wZW46IHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5vcGVuLFxuICAgICAgICAgICAgcXVpZXQ6IHRydWUsXG4gICAgICAgICAgICBsb2dMZXZlbDogMCxcbiAgICAgICAgICAgIHBvcnQ6IHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5wb3J0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgYXBwbGljYXRpb24gLyByb290IGNvbXBvbmVudCBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBnZXQgYXBwbGljYXRpb24oKTpBcHBsaWNhdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgZ2V0IGlzQ0xJKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gJy4vYXBwL2FwcGxpY2F0aW9uJztcblxuaW1wb3J0IHsgQ09NUE9ET0NfREVGQVVMVFMgfSBmcm9tICcuL3V0aWxzL2RlZmF1bHRzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcblxubGV0IHBrZyA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpLFxuICAgIHByb2dyYW0gPSByZXF1aXJlKCdjb21tYW5kZXInKSxcbiAgICBmaWxlcyA9IFtdLFxuICAgIGN3ZCA9IHByb2Nlc3MuY3dkKCk7XG5cbmV4cG9ydCBjbGFzcyBDbGlBcHBsaWNhdGlvbiBleHRlbmRzIEFwcGxpY2F0aW9uXG57XG4gICAgLyoqXG4gICAgICogUnVuIGNvbXBvZG9jIGZyb20gdGhlIGNvbW1hbmQgbGluZS5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2VuZXJhdGUoKSB7XG5cbiAgICAgICAgcHJvZ3JhbVxuICAgICAgICAgICAgLnZlcnNpb24ocGtnLnZlcnNpb24pXG4gICAgICAgICAgICAudXNhZ2UoJzxzcmM+IFtvcHRpb25zXScpXG4gICAgICAgICAgICAub3B0aW9uKCctcCwgLS10c2NvbmZpZyBbY29uZmlnXScsICdBIHRzY29uZmlnLmpzb24gZmlsZScpXG4gICAgICAgICAgICAub3B0aW9uKCctZCwgLS1vdXRwdXQgW2ZvbGRlcl0nLCAnV2hlcmUgdG8gc3RvcmUgdGhlIGdlbmVyYXRlZCBkb2N1bWVudGF0aW9uIChkZWZhdWx0OiAuL2RvY3VtZW50YXRpb24pJywgQ09NUE9ET0NfREVGQVVMVFMuZm9sZGVyKVxuICAgICAgICAgICAgLm9wdGlvbignLWIsIC0tYmFzZSBbYmFzZV0nLCAnQmFzZSByZWZlcmVuY2Ugb2YgaHRtbCB0YWcgPGJhc2U+JywgQ09NUE9ET0NfREVGQVVMVFMuYmFzZSlcbiAgICAgICAgICAgIC5vcHRpb24oJy15LCAtLWV4dFRoZW1lIFtmaWxlXScsICdFeHRlcm5hbCBzdHlsaW5nIHRoZW1lIGZpbGUnKVxuICAgICAgICAgICAgLm9wdGlvbignLW4sIC0tbmFtZSBbbmFtZV0nLCAnVGl0bGUgZG9jdW1lbnRhdGlvbicsIENPTVBPRE9DX0RFRkFVTFRTLnRpdGxlKVxuICAgICAgICAgICAgLm9wdGlvbignLW8sIC0tb3BlbicsICdPcGVuIHRoZSBnZW5lcmF0ZWQgZG9jdW1lbnRhdGlvbicsIGZhbHNlKVxuICAgICAgICAgICAgLy8ub3B0aW9uKCctaSwgLS1pbmNsdWRlcyBbcGF0aF0nLCAnUGF0aCBvZiBleHRlcm5hbCBtYXJrZG93biBmaWxlcyB0byBpbmNsdWRlJylcbiAgICAgICAgICAgIC8vLm9wdGlvbignLWosIC0taW5jbHVkZXNOYW1lIFtuYW1lXScsICdOYW1lIG9mIGl0ZW0gbWVudSBvZiBleHRlcm5hbHMgbWFya2Rvd24gZmlsZScpXG4gICAgICAgICAgICAub3B0aW9uKCctdCwgLS1zaWxlbnQnLCAnSW4gc2lsZW50IG1vZGUsIGxvZyBtZXNzYWdlcyBhcmVuXFwndCBsb2dnZWQgaW4gdGhlIGNvbnNvbGUnLCBmYWxzZSlcbiAgICAgICAgICAgIC5vcHRpb24oJy1zLCAtLXNlcnZlJywgJ1NlcnZlIGdlbmVyYXRlZCBkb2N1bWVudGF0aW9uIChkZWZhdWx0IGh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8pJywgZmFsc2UpXG4gICAgICAgICAgICAub3B0aW9uKCctciwgLS1wb3J0IFtwb3J0XScsICdDaGFuZ2UgZGVmYXVsdCBzZXJ2aW5nIHBvcnQnLCBDT01QT0RPQ19ERUZBVUxUUy5wb3J0KVxuICAgICAgICAgICAgLm9wdGlvbignLS10aGVtZSBbdGhlbWVdJywgJ0Nob29zZSBvbmUgb2YgYXZhaWxhYmxlIHRoZW1lcywgZGVmYXVsdCBpcyBcXCdnaXRib29rXFwnIChsYXJhdmVsLCBvcmlnaW5hbCwgcG9zdG1hcmssIHJlYWR0aGVkb2NzLCBzdHJpcGUsIHZhZ3JhbnQpJylcbiAgICAgICAgICAgIC5vcHRpb24oJy0taGlkZUdlbmVyYXRvcicsICdEbyBub3QgcHJpbnQgdGhlIENvbXBvZG9jIGxpbmsgYXQgdGhlIGJvdHRvbSBvZiB0aGUgcGFnZScsIGZhbHNlKVxuICAgICAgICAgICAgLm9wdGlvbignLS1kaXNhYmxlU291cmNlQ29kZScsICdEbyBub3QgYWRkIHNvdXJjZSBjb2RlIHRhYicsIGZhbHNlKVxuICAgICAgICAgICAgLm9wdGlvbignLS1kaXNhYmxlR3JhcGgnLCAnRG8gbm90IGFkZCB0aGUgZGVwZW5kZW5jeSBncmFwaCcsIGZhbHNlKVxuICAgICAgICAgICAgLm9wdGlvbignLS1kaXNhYmxlQ292ZXJhZ2UnLCAnRG8gbm90IGFkZCB0aGUgZG9jdW1lbnRhdGlvbiBjb3ZlcmFnZSByZXBvcnQnLCBmYWxzZSlcbiAgICAgICAgICAgIC5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuXG4gICAgICAgIGxldCBvdXRwdXRIZWxwID0gKCkgPT4ge1xuICAgICAgICAgICAgcHJvZ3JhbS5vdXRwdXRIZWxwKClcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9ncmFtLm91dHB1dCkge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLm91dHB1dCA9IHByb2dyYW0ub3V0cHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2dyYW0uYmFzZSkge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLmJhc2UgPSBwcm9ncmFtLmJhc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvZ3JhbS5leHRUaGVtZSkge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLmV4dFRoZW1lID0gcHJvZ3JhbS5leHRUaGVtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9ncmFtLnRoZW1lKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEudGhlbWUgPSBwcm9ncmFtLnRoZW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2dyYW0ubmFtZSkge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLmRvY3VtZW50YXRpb25NYWluTmFtZSA9IHByb2dyYW0ubmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9ncmFtLm9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5vcGVuID0gcHJvZ3JhbS5vcGVuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2dyYW0uaW5jbHVkZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5pbmNsdWRlcyAgPSBwcm9ncmFtLmluY2x1ZGVzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2dyYW0uaW5jbHVkZXNOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEuaW5jbHVkZXNOYW1lICA9IHByb2dyYW0uaW5jbHVkZXNOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2dyYW0uc2lsZW50KSB7XG4gICAgICAgICAgICBsb2dnZXIuc2lsZW50ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvZ3JhbS5zZXJ2ZSkge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLnNlcnZlICA9IHByb2dyYW0uc2VydmU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvZ3JhbS5wb3J0KSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEucG9ydCA9IHByb2dyYW0ucG9ydDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9ncmFtLmhpZGVHZW5lcmF0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5oaWRlR2VuZXJhdG9yID0gcHJvZ3JhbS5oaWRlR2VuZXJhdG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2dyYW0uZGlzYWJsZVNvdXJjZUNvZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5kaXNhYmxlU291cmNlQ29kZSA9IHByb2dyYW0uZGlzYWJsZVNvdXJjZUNvZGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvZ3JhbS5kaXNhYmxlR3JhcGgpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS5kaXNhYmxlR3JhcGggPSBwcm9ncmFtLmRpc2FibGVHcmFwaDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9ncmFtLmRpc2FibGVDb3ZlcmFnZSkge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLmRpc2FibGVDb3ZlcmFnZSA9IHByb2dyYW0uZGlzYWJsZUNvdmVyYWdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2dyYW0uc2VydmUgJiYgIXByb2dyYW0udHNjb25maWcgJiYgcHJvZ3JhbS5vdXRwdXQpIHtcbiAgICAgICAgICAgIC8vIGlmIC1zICYgLWQsIHNlcnZlIGl0XG4gICAgICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMocHJvZ3JhbS5vdXRwdXQpKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGAke3Byb2dyYW0ub3V0cHV0fSBmb2xkZXIgZG9lc24ndCBleGlzdGApO1xuICAgICAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmluZm8oYFNlcnZpbmcgZG9jdW1lbnRhdGlvbiBmcm9tICR7cHJvZ3JhbS5vdXRwdXR9IGF0IGh0dHA6Ly8xMjcuMC4wLjE6JHtwcm9ncmFtLnBvcnR9YCk7XG4gICAgICAgICAgICAgICAgc3VwZXIucnVuV2ViU2VydmVyKHByb2dyYW0ub3V0cHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwcm9ncmFtLnNlcnZlICYmICFwcm9ncmFtLnRzY29uZmlnICYmICFwcm9ncmFtLm91dHB1dCkge1xuICAgICAgICAgICAgLy8gaWYgb25seSAtcyBmaW5kIC4vZG9jdW1lbnRhdGlvbiwgaWYgb2sgc2VydmUsIGVsc2UgZXJyb3IgcHJvdmlkZSAtZFxuICAgICAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHByb2dyYW0ub3V0cHV0KSkge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcignUHJvdmlkZSBvdXRwdXQgZ2VuZXJhdGVkIGZvbGRlciB3aXRoIC1kIGZsYWcnKTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5pbmZvKGBTZXJ2aW5nIGRvY3VtZW50YXRpb24gZnJvbSAke3Byb2dyYW0ub3V0cHV0fSBhdCBodHRwOi8vMTI3LjAuMC4xOiR7cHJvZ3JhbS5wb3J0fWApO1xuICAgICAgICAgICAgICAgIHN1cGVyLnJ1bldlYlNlcnZlcihwcm9ncmFtLm91dHB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocHJvZ3JhbS5oaWRlR2VuZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLmhpZGVHZW5lcmF0b3IgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZGVmYXVsdFdhbGtGT2xkZXIgPSBjd2QgfHwgJy4nLFxuICAgICAgICAgICAgICAgIHdhbGsgPSAoZGlyLCBleGNsdWRlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gZnMucmVhZGRpclN5bmMoZGlyKTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhjbHVkZS5pbmRleE9mKGZpbGUpIDwgMCAmJiBkaXIuaW5kZXhPZignbm9kZV9tb2R1bGVzJykgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZSA9IHBhdGguam9pbihkaXIsIGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGF0ID0gZnMuc3RhdFN5bmMoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXQgJiYgc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdCh3YWxrKGZpbGUsIGV4Y2x1ZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoLyhzcGVjfFxcLmQpXFwudHMvLnRlc3QoZmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdJZ25vcmluZycsIGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwYXRoLmV4dG5hbWUoZmlsZSkgPT09ICcudHMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnSW5jbHVkaW5nJywgZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAocHJvZ3JhbS50c2NvbmZpZyAmJiBwcm9ncmFtLmFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLnRzY29uZmlnID0gcHJvZ3JhbS50c2NvbmZpZztcbiAgICAgICAgICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMocHJvZ3JhbS50c2NvbmZpZykpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdcInRzY29uZmlnLmpzb25cIiBmaWxlIHdhcyBub3QgZm91bmQgaW4gdGhlIGN1cnJlbnQgZGlyZWN0b3J5Jyk7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgX2ZpbGUgPSBwYXRoLmpvaW4oXG4gICAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIHBhdGguZGlybmFtZSh0aGlzLmNvbmZpZ3VyYXRpb24ubWFpbkRhdGEudHNjb25maWcpKSxcbiAgICAgICAgICAgICAgICAgICAgICBwYXRoLmJhc2VuYW1lKHRoaXMuY29uZmlndXJhdGlvbi5tYWluRGF0YS50c2NvbmZpZylcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmluZm8oJ1VzaW5nIHRzY29uZmlnJywgX2ZpbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZpbGVzID0gcmVxdWlyZShfZmlsZSkuZmlsZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHRoZSBjdXJyZW50IGRpcmVjdG9yeSBvZiB0c2NvbmZpZy5qc29uIGFzIGEgd29ya2luZyBkaXJlY3RvcnlcbiAgICAgICAgICAgICAgICAgICAgY3dkID0gX2ZpbGUuc3BsaXQocGF0aC5zZXApLnNsaWNlKDAsIC0xKS5qb2luKHBhdGguc2VwKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXhjbHVkZSA9IHJlcXVpcmUoX2ZpbGUpLmV4Y2x1ZGUgfHwgW107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzID0gd2Fsayhjd2QgfHwgJy4nLCBleGNsdWRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLnNldEZpbGVzKGZpbGVzKTtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuZ2VuZXJhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ICBlbHNlIGlmIChwcm9ncmFtLnRzY29uZmlnICYmIHByb2dyYW0uYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLm1haW5EYXRhLnRzY29uZmlnID0gcHJvZ3JhbS50c2NvbmZpZztcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlRm9sZGVyID0gcHJvZ3JhbS5hcmdzWzBdO1xuICAgICAgICAgICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhzb3VyY2VGb2xkZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgUHJvdmlkZWQgc291cmNlIGZvbGRlciAke3NvdXJjZUZvbGRlcn0gd2FzIG5vdCBmb3VuZCBpbiB0aGUgY3VycmVudCBkaXJlY3RvcnlgKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5pbmZvKCdVc2luZyBwcm92aWRlZCBzb3VyY2UgZm9sZGVyJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgZmlsZXMgPSB3YWxrKHBhdGgucmVzb2x2ZShzb3VyY2VGb2xkZXIpLCBbXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuc2V0RmlsZXMoZmlsZXMpO1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5nZW5lcmF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCd0c2NvbmZpZy5qc29uIGZpbGUgd2FzIG5vdCBmb3VuZCwgcGxlYXNlIHVzZSAtcCBmbGFnJyk7XG4gICAgICAgICAgICAgICAgb3V0cHV0SGVscCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbImd1dGlsIiwicmVxdWlyZSIsImMiLCJjb2xvcnMiLCJwa2ciLCJMRVZFTCIsIm5hbWUiLCJ2ZXJzaW9uIiwibG9nZ2VyIiwibG9nIiwic2lsZW50IiwiYXJncyIsImZvcm1hdCIsIklORk8iLCJFUlJPUiIsIkRFQlVHIiwibGV2ZWwiLCJwYWQiLCJzIiwibCIsIkFycmF5IiwiTWF0aCIsIm1heCIsImxlbmd0aCIsImpvaW4iLCJtc2ciLCJzaGlmdCIsImdyZWVuIiwiY3lhbiIsInJlZCIsIkxvZ2dlciIsIkFuZ3VsYXJBUElzIiwidHlwZSIsIl9yZXN1bHQiLCJhbmd1bGFyTW9kdWxlQVBJcyIsImFuZ3VsYXJNb2R1bGUiLCJpIiwibGVuIiwidGl0bGUiLCJkYXRhIiwiRGVwZW5kZW5jaWVzRW5naW5lIiwiX2luc3RhbmNlIiwiRXJyb3IiLCJyYXdEYXRhIiwibW9kdWxlcyIsIl8iLCJjb21wb25lbnRzIiwiZGlyZWN0aXZlcyIsImluamVjdGFibGVzIiwiaW50ZXJmYWNlcyIsInJvdXRlcyIsInBpcGVzIiwiY2xhc3NlcyIsImZpbmRlckluQ29tcG9kb2NEZXBlbmRlbmNpZXMiLCJpbmRleE9mIiwicmVzdWx0SW5Db21wb2RvY0luamVjdGFibGVzIiwicmVzdWx0SW5Db21wb2RvY0NsYXNzZXMiLCJyZXN1bHRJbkFuZ3VsYXJBUElzIiwiZmluZGVySW5Bbmd1bGFyQVBJcyIsIiRkZXBlbmRlbmNpZXNFbmdpbmUiLCJnZXRJbnN0YW5jZSIsImEiLCJvcGVyYXRvciIsImIiLCJvcHRpb25zIiwiYXJndW1lbnRzIiwicmVzdWx0IiwiaW52ZXJzZSIsImZuIiwidGV4dCIsIk5HMl9NT0RVTEVTIiwib3B0aW9uYWxWYWx1ZSIsIkhhbmRsZWJhcnMiLCJlc2NhcGVFeHByZXNzaW9uIiwicmVwbGFjZSIsIm1ldGhvZCIsIm1hcCIsImFyZyIsImZpbmQiLCJzb3VyY2UiLCJwYXRoIiwianNkb2NUYWdzIiwidGFnTmFtZSIsImNvbW1lbnQiLCJ0YWdzIiwidGFnIiwidHlwZUV4cHJlc3Npb24iLCJwYXJhbWV0ZXJOYW1lIiwicHVzaCIsImhyZWYiLCJ0YXJnZXQiLCJKU09OIiwic3RyaW5naWZ5IiwicGFydGlhbHMiLCJsb29wIiwicmVzb2x2ZSIsInJlamVjdCIsIl9fZGlybmFtZSIsImVyciIsIlByb21pc2UiLCJtYWluRGF0YSIsInBhZ2UiLCJvIiwidGhhdCIsImFzc2lnbiIsImNhY2hlIiwidGVtcGxhdGUiLCJyZW5kZXJlciIsIlJlbmRlcmVyIiwiY29kZSIsImxhbmd1YWdlIiwidmFsaWRMYW5nIiwiaGlnaGxpZ2h0anMiLCJnZXRMYW5ndWFnZSIsImhpZ2hsaWdodGVkIiwiaGlnaGxpZ2h0IiwidmFsdWUiLCJzZXRPcHRpb25zIiwicHJvY2VzcyIsImN3ZCIsIm1hcmtlZCIsImZpbGVwYXRoIiwiQ09NUE9ET0NfREVGQVVMVFMiLCJmb2xkZXIiLCJ0aGVtZSIsInBvcnQiLCJiYXNlIiwiZGlzYWJsZVNvdXJjZUNvZGUiLCJkaXNhYmxlR3JhcGgiLCJkaXNhYmxlQ292ZXJhZ2UiLCJDb25maWd1cmF0aW9uIiwiX3BhZ2VzIiwicGFnZXMiLCJfbWFpbkRhdGEiLCJiaW5QYXRoIiwiZ2xvYmFsQmluUGF0aCIsInBsYXRmb3JtIiwicGF0aG5hbWVzIiwiZW52IiwiUEFUSCIsInNwbGl0IiwiZXhlY1BhdGgiLCJzdHJpcFRyYWlsaW5nU2VwIiwidGhlUGF0aCIsInNsaWNlIiwicGF0aElzSW5zaWRlIiwicG90ZW50aWFsUGFyZW50IiwidG9Mb3dlckNhc2UiLCJsYXN0SW5kZXhPZiIsInVuZGVmaW5lZCIsImlzUGF0aEluc2lkZSIsImFyZ3YiLCJvdXRwdXRwYXRoIiwibmdkUGF0aCIsImlzR2xvYmFsIiwiTU9ERSIsInRlc3QiLCJmaW5hbFBhdGgiLCJzdGRvdXQiLCJzdGRlcnIiLCJsdW5yIiwiY2hlZXJpbyIsIkVudGl0aWVzIiwiQWxsSHRtbEVudGl0aWVzIiwiJGNvbmZpZ3VyYXRpb24iLCJIdG1sIiwic2VhcmNoSW5kZXgiLCJyZWYiLCJmaWVsZCIsImJvb3N0IiwiJCIsImxvYWQiLCJodG1sIiwiZGVjb2RlIiwidXJsIiwib3V0cHV0IiwiZG9jIiwiaW5mb3MiLCJjb250ZXh0IiwiZG9jdW1lbnRzU3RvcmUiLCJnZXRTZWFyY2hJbmRleCIsImFkZCIsIm91dHB1dEZvbGRlciIsImVycm9yIiwidHNhbnkiLCJ0cyIsIm5vZGUiLCJnZXRKU0RvY3MiLCJhcHBseSIsInN0ciIsImNvdW50IiwiaW5kZW50Iiwic3RyaXBJbmRlbnQiLCJtYXRjaCIsIm1pbiIsIngiLCJyZSIsIlJlZ0V4cCIsInJlcGVhdGluZyIsIm4iLCJUeXBlRXJyb3IiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsInJldCIsImluZGVudFN0cmluZyIsInRyYW5zcGlsZU9wdGlvbnMiLCJpbnB1dEZpbGVOYW1lIiwiZmlsZU5hbWUiLCJqc3giLCJjb21waWxlckhvc3QiLCJ0c2NvbmZpZ0RpcmVjdG9yeSIsImxpYlNvdXJjZSIsImZzIiwidG9TdHJpbmciLCJlIiwiZGVidWciLCJSb3V0ZXJQYXJzZXIiLCJtb2R1bGVzVHJlZSIsInJvb3RNb2R1bGUiLCJtb2R1bGVzV2l0aFJvdXRlcyIsInJvdXRlIiwibW9kdWxlTmFtZSIsIm1vZHVsZUltcG9ydHMiLCJtb2R1bGUiLCJpbXBvcnRzIiwiaW1wb3J0c05vZGUiLCJpbml0aWFsaXplciIsImVsZW1lbnRzIiwiZWxlbWVudCIsImFyZ3VtZW50IiwiY2xlYW5Nb2R1bGVzVHJlZSIsIm1vZHVsZXNDbGVhbmVyIiwiYXJyIiwicGFyZW50IiwiY2hpbGRyZW4iLCJ1dGlsIiwiZGVwdGgiLCJyb3V0ZXNUcmVlIiwiZm91bmRSb3V0ZVdpdGhNb2R1bGVOYW1lIiwibG9vcE1vZHVsZXNQYXJzZXIiLCJwYXJzZSIsImtpbmQiLCJjbGVhbmVkUm91dGVzVHJlZSIsImNsZWFuUm91dGVzVHJlZSIsImdldE5lc3RlZENoaWxkcmVuIiwib3V0IiwiZmlyc3RMb29wTW9kdWxlIiwiaW1wb3J0Tm9kZSIsImdlbiIsInRtcCIsInRva2VuIiwiZ2V0Q2hpbGRyZW4iLCJmb3JFYWNoIiwidmlzaXRBbmRSZWNvZ25pemUiLCJGaXJzdExpdGVyYWxUb2tlbiIsIklkZW50aWZpZXIiLCJTdHJpbmdMaXRlcmFsIiwiQXJyYXlMaXRlcmFsRXhwcmVzc2lvbiIsIkltcG9ydEtleXdvcmQiLCJGcm9tS2V5d29yZCIsIkV4cG9ydEtleXdvcmQiLCJDbGFzc0tleXdvcmQiLCJUaGlzS2V5d29yZCIsIkNvbnN0cnVjdG9yS2V5d29yZCIsIkZhbHNlS2V5d29yZCIsIlRydWVLZXl3b3JkIiwiTnVsbEtleXdvcmQiLCJBdFRva2VuIiwiUGx1c1Rva2VuIiwiRXF1YWxzR3JlYXRlclRoYW5Ub2tlbiIsIk9wZW5QYXJlblRva2VuIiwiSW1wb3J0Q2xhdXNlIiwiT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24iLCJCbG9jayIsIkNsb3NlQnJhY2VUb2tlbiIsIkNsb3NlUGFyZW5Ub2tlbiIsIk9wZW5CcmFja2V0VG9rZW4iLCJDbG9zZUJyYWNrZXRUb2tlbiIsIlNlbWljb2xvblRva2VuIiwiQ29tbWFUb2tlbiIsIkNvbG9uVG9rZW4iLCJEb3RUb2tlbiIsIkRvU3RhdGVtZW50IiwiRGVjb3JhdG9yIiwiRmlyc3RBc3NpZ25tZW50IiwiRmlyc3RQdW5jdHVhdGlvbiIsIlByaXZhdGVLZXl3b3JkIiwiUHVibGljS2V5d29yZCIsImZpbGVzIiwiRVM1IiwiQ29tbW9uSlMiLCJwcm9ncmFtIiwiX3QiLCJkZXBzIiwic291cmNlRmlsZXMiLCJnZXRTb3VyY2VGaWxlcyIsImZpbGUiLCJmaWxlUGF0aCIsImluZm8iLCJnZXRTb3VyY2VGaWxlRGVjb3JhdG9ycyIsInNyY0ZpbGUiLCJvdXRwdXRTeW1ib2xzIiwiY2xlYW5lciIsInByb2dyYW1Db21wb25lbnQiLCJzb3VyY2VGaWxlIiwiZ2V0U291cmNlRmlsZSIsInR5cGVDaGVja2VyQ29tcG9uZW50IiwiZ2V0VHlwZUNoZWNrZXIiLCJkZWNvcmF0b3JzIiwidmlzaXROb2RlIiwidmlzaXRlZE5vZGUiLCJpbmRleCIsIm1ldGFkYXRhIiwicG9wIiwiZ2V0U3ltYm9sZU5hbWUiLCJwcm9wcyIsImZpbmRQcm9wcyIsIklPIiwiZ2V0Q29tcG9uZW50SU8iLCJpc01vZHVsZSIsImdldE1vZHVsZVByb3ZpZGVycyIsImdldE1vZHVsZURlY2xhdGlvbnMiLCJnZXRNb2R1bGVJbXBvcnRzIiwiZ2V0TW9kdWxlRXhwb3J0cyIsImdldE1vZHVsZUJvb3RzdHJhcCIsImJyZWFrTGluZXMiLCJkZXNjcmlwdGlvbiIsImdldFRleHQiLCJoYXNSb3V0ZXJNb2R1bGVJbkltcG9ydHMiLCJhZGRNb2R1bGVXaXRoUm91dGVzIiwiZ2V0TW9kdWxlSW1wb3J0c1JhdyIsImFkZE1vZHVsZSIsImlzQ29tcG9uZW50IiwiZ2V0Q29tcG9uZW50Q2hhbmdlRGV0ZWN0aW9uIiwiZ2V0Q29tcG9uZW50RW5jYXBzdWxhdGlvbiIsImdldENvbXBvbmVudEV4cG9ydEFzIiwiZ2V0Q29tcG9uZW50SG9zdCIsImdldENvbXBvbmVudElucHV0c01ldGFkYXRhIiwiZ2V0Q29tcG9uZW50TW9kdWxlSWQiLCJnZXRDb21wb25lbnRPdXRwdXRzIiwiZ2V0Q29tcG9uZW50UHJvdmlkZXJzIiwiZ2V0Q29tcG9uZW50U2VsZWN0b3IiLCJnZXRDb21wb25lbnRTdHlsZVVybHMiLCJnZXRDb21wb25lbnRTdHlsZXMiLCJnZXRDb21wb25lbnRUZW1wbGF0ZSIsImdldENvbXBvbmVudFRlbXBsYXRlVXJsIiwiZ2V0Q29tcG9uZW50Vmlld1Byb3ZpZGVycyIsImlucHV0cyIsIm91dHB1dHMiLCJwcm9wZXJ0aWVzIiwibWV0aG9kcyIsImlzSW5qZWN0YWJsZSIsImlzUGlwZSIsImlzRGlyZWN0aXZlIiwiX19jYWNoZSIsImZpbHRlckJ5RGVjb3JhdG9ycyIsImV4cHJlc3Npb24iLCJmaWx0ZXIiLCJzeW1ib2wiLCJmbGFncyIsIkNsYXNzIiwiSW50ZXJmYWNlIiwiZ2V0SW50ZXJmYWNlSU8iLCJnZXRSb3V0ZUlPIiwibmV3Um91dGVzIiwiQ2xhc3NEZWNsYXJhdGlvbiIsIkV4cHJlc3Npb25TdGF0ZW1lbnQiLCJyZXN1bHROb2RlIiwiZmluZEV4cHJlc3Npb25CeU5hbWUiLCJzZXRSb290TW9kdWxlIiwic3ltYm9scyIsImQiLCJlbnRyeU5vZGUiLCJnZXRTeW1ib2xEZXBzIiwicHJvdmlkZXJOYW1lIiwicGFyc2VEZWVwSW5kZW50aWZpZXIiLCJjb21wb25lbnQiLCJmaW5kQ29tcG9uZW50U2VsZWN0b3JCeU5hbWUiLCJnZXRTeW1ib2xEZXBzUmF3IiwiZ2V0U3ltYm9sRGVwc09iamVjdCIsImRlY29yYXRvclR5cGUiLCJwcm9wZXJ0eSIsImluRGVjb3JhdG9yIiwiaW5BcmdzIiwic3RyaW5naWZ5RGVmYXVsdFZhbHVlIiwidmlzaXRUeXBlIiwiZ2V0RG9jdW1lbnRhdGlvbkNvbW1lbnQiLCJ0eXBlVG9TdHJpbmciLCJnZXRUeXBlQXRMb2NhdGlvbiIsIm91dERlY29yYXRvciIsIm91dEFyZ3MiLCJtZW1iZXIiLCJtb2RpZmllcnMiLCJpc1B1YmxpYyIsInNvbWUiLCJtb2RpZmllciIsImlzSW50ZXJuYWxNZW1iZXIiLCJpc1ByaXZhdGUiLCJpbnRlcm5hbFRhZ3MiLCJqc0RvYyIsIm1ldGhvZE5hbWUiLCJBTkdVTEFSX0xJRkVDWUNMRV9NRVRIT0RTIiwicGFyYW1ldGVycyIsIl9wYXJhbWV0ZXJzIiwidmlzaXRBcmd1bWVudCIsInByb3AiLCJqc2RvY3RhZ3MiLCJfdHMiLCJsb2NhbGVDb21wYXJlIiwibWVtYmVycyIsImlucHV0RGVjb3JhdG9yIiwiZ2V0RGVjb3JhdG9yT2ZUeXBlIiwidmlzaXRJbnB1dCIsInZpc2l0T3V0cHV0IiwiaXNQcml2YXRlT3JJbnRlcm5hbCIsIk1ldGhvZERlY2xhcmF0aW9uIiwiTWV0aG9kU2lnbmF0dXJlIiwiaXNBbmd1bGFyTGlmZWN5Y2xlSG9vayIsInZpc2l0TWV0aG9kRGVjbGFyYXRpb24iLCJQcm9wZXJ0eURlY2xhcmF0aW9uIiwiUHJvcGVydHlTaWduYXR1cmUiLCJHZXRBY2Nlc3NvciIsInZpc2l0UHJvcGVydHkiLCJDYWxsU2lnbmF0dXJlIiwidmlzaXRDYWxsRGVjbGFyYXRpb24iLCJJbmRleFNpZ25hdHVyZSIsInZpc2l0SW5kZXhEZWNsYXJhdGlvbiIsIkNvbnN0cnVjdG9yIiwiX2NvbnN0cnVjdG9yUHJvcGVydGllcyIsInZpc2l0Q29uc3RydWN0b3JEZWNsYXJhdGlvbiIsImoiLCJzb3J0IiwiZ2V0TmFtZXNDb21wYXJlRm4iLCJkZWNvcmF0b3IiLCJzZWxlY3RvciIsImV4cG9ydEFzIiwiZGVjb3JhdG9ySWRlbnRpZmllclRleHQiLCJjbGFzc0RlY2xhcmF0aW9uIiwiZ2V0U3ltYm9sQXRMb2NhdGlvbiIsImNsYXNzTmFtZSIsImRpcmVjdGl2ZUluZm8iLCJpc0RpcmVjdGl2ZURlY29yYXRvciIsInZpc2l0RGlyZWN0aXZlRGVjb3JhdG9yIiwidmlzaXRNZW1iZXJzIiwiaXNTZXJ2aWNlRGVjb3JhdG9yIiwiaXNQaXBlRGVjb3JhdG9yIiwiaXNNb2R1bGVEZWNvcmF0b3IiLCJkZWNsYXJhdGlvbkxpc3QiLCJkZWNsYXJhdGlvbnMiLCJ0eXBlTmFtZSIsImFkZFJvdXRlIiwiZ2VuZXJhdGUiLCJmaWxlbmFtZSIsInJlcyIsInN0YXRlbWVudHMiLCJyZWR1Y2UiLCJkaXJlY3RpdmUiLCJzdGF0ZW1lbnQiLCJWYXJpYWJsZVN0YXRlbWVudCIsImNvbmNhdCIsInZpc2l0RW51bURlY2xhcmF0aW9uIiwidmlzaXRDbGFzc0RlY2xhcmF0aW9uIiwiSW50ZXJmYWNlRGVjbGFyYXRpb24iLCJwb3MiLCJlbmQiLCJpZGVudGlmaWVyIiwibGFiZWwiLCJuc01vZHVsZSIsImdldFR5cGUiLCJfX25zTW9kdWxlIiwic2FuaXRpemVVcmxzIiwidCIsImRldGVjdEluZGVudCIsInVybHMiLCJtdWx0aUxpbmUiLCJwYXJzZVByb3BlcnRpZXMiLCJvYmoiLCJwYXJzZVN5bWJvbFRleHQiLCJidWlsZElkZW50aWZpZXJOYW1lIiwibm9kZU5hbWUiLCJ1bmtub3duIiwiZWwiLCJTcHJlYWRFbGVtZW50RXhwcmVzc2lvbiIsInBhcnNlUHJvdmlkZXJDb25maWd1cmF0aW9uIiwiX2dlblByb3ZpZGVyTmFtZSIsIl9wcm92aWRlclByb3BzIiwiYm9keSIsInBhcmFtcyIsInBhcnNlU3ltYm9sRWxlbWVudHMiLCJmdW5jdGlvbkFyZ3MiLCJwYXJzZVN5bWJvbHMiLCJnbG9iIiwiJGh0bWxlbmdpbmUiLCJIdG1sRW5naW5lIiwiJGZpbGVlbmdpbmUiLCJGaWxlRW5naW5lIiwiJG1hcmtkb3duZW5naW5lIiwiTWFya2Rvd25FbmdpbmUiLCIkbmdkZW5naW5lIiwiTmdkRW5naW5lIiwiJHNlYXJjaEVuZ2luZSIsIlNlYXJjaEVuZ2luZSIsInN0YXJ0VGltZSIsIkRhdGUiLCJjb25maWd1cmF0aW9uIiwiZ2V0UGlwZXMiLCJhZGRQYWdlIiwiZ2V0Q2xhc3NlcyIsImdldERpcmVjdGl2ZXMiLCJvcHRpb24iLCJpbml0IiwidGhlbiIsInByb2Nlc3NQYWNrYWdlSnNvbiIsImdldCIsInBhY2thZ2VEYXRhIiwicGFyc2VkRGF0YSIsImRvY3VtZW50YXRpb25NYWluTmFtZSIsImRvY3VtZW50YXRpb25NYWluRGVzY3JpcHRpb24iLCJwcm9jZXNzTWFya2Rvd24iLCJlcnJvck1lc3NhZ2UiLCJnZXRSZWFkbWVGaWxlIiwicmVhZG1lRGF0YSIsInJlYWRtZSIsImdldERlcGVuZGVuY2llc0RhdGEiLCJjcmF3bGVyIiwiRGVwZW5kZW5jaWVzIiwiZGVwZW5kZW5jaWVzRGF0YSIsImdldERlcGVuZGVuY2llcyIsInByZXBhcmVNb2R1bGVzIiwicHJlcGFyZUNvbXBvbmVudHMiLCJwcmVwYXJlRGlyZWN0aXZlcyIsInByZXBhcmVJbmplY3RhYmxlcyIsInByZXBhcmVSb3V0ZXMiLCJwcmVwYXJlUGlwZXMiLCJwcmVwYXJlQ2xhc3NlcyIsInByZXBhcmVJbnRlcmZhY2VzIiwicHJlcGFyZUNvdmVyYWdlIiwicHJvY2Vzc1BhZ2VzIiwiZ2V0TW9kdWxlcyIsImdldEludGVyZmFjZXMiLCJnZXRDb21wb25lbnRzIiwiZGlybmFtZSIsInJlYWRtZUZpbGUiLCJnZXRJbmplY3RhYmxlcyIsImdldFJvdXRlcyIsInRvdGFsUHJvamVjdFN0YXRlbWVudERvY3VtZW50ZWQiLCJnZXRTdGF0dXMiLCJwZXJjZW50Iiwic3RhdHVzIiwiY2wiLCJ0b3RhbFN0YXRlbWVudERvY3VtZW50ZWQiLCJ0b3RhbFN0YXRlbWVudHMiLCJwcm9wZXJ0aWVzQ2xhc3MiLCJtZXRob2RzQ2xhc3MiLCJpbnB1dHNDbGFzcyIsIm91dHB1dHNDbGFzcyIsImlucHV0IiwiY292ZXJhZ2VQZXJjZW50IiwiZmxvb3IiLCJjb3ZlcmFnZUNvdW50IiwiY2xhc3NlIiwiaW5qZWN0YWJsZSIsImludGVyIiwicGlwZSIsImNvdmVyYWdlRGF0YSIsInJlbmRlciIsImh0bWxEYXRhIiwiaW5kZXhQYWdlIiwiZ2VuZXJhdGVTZWFyY2hJbmRleEpzb24iLCJwcm9jZXNzUmVzb3VyY2VzIiwiZXh0VGhlbWUiLCJwcm9jZXNzR3JhcGhzIiwib25Db21wbGV0ZSIsImZpbmFsVGltZSIsInNlcnZlIiwicnVuV2ViU2VydmVyIiwicmVuZGVyR3JhcGgiLCJmaW5hbE1haW5HcmFwaFBhdGgiLCJ0c2NvbmZpZyIsIm9wZW4iLCJ1c2FnZSIsIm91dHB1dEhlbHAiLCJleGl0IiwiaW5jbHVkZXMiLCJpbmNsdWRlc05hbWUiLCJoaWRlR2VuZXJhdG9yIiwiZGVmYXVsdFdhbGtGT2xkZXIiLCJ3YWxrIiwiZGlyIiwiZXhjbHVkZSIsInJlc3VsdHMiLCJsaXN0Iiwic3RhdCIsImlzRGlyZWN0b3J5IiwiX2ZpbGUiLCJzb3VyY2VGb2xkZXIiLCJBcHBsaWNhdGlvbiJdLCJtYXBw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
