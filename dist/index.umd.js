(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FeMonitor = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var uaParser = createCommonjsModule(function (module, exports) {
	/////////////////////////////////////////////////////////////////////////////////
	/* UAParser.js v1.0.32
	   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
	   MIT License */ /*
	                  Detect Browser, Engine, OS, CPU, and Device type/model from User-Agent data.
	                  Supports browser & node.js environment. 
	                  Demo   : https://faisalman.github.io/ua-parser-js
	                  Source : https://github.com/faisalman/ua-parser-js */
	/////////////////////////////////////////////////////////////////////////////////

	(function (window, undefined$1) {

	  //////////////
	  // Constants
	  /////////////
	  var LIBVERSION = '1.0.32',
	    EMPTY = '',
	    UNKNOWN = '?',
	    FUNC_TYPE = 'function',
	    UNDEF_TYPE = 'undefined',
	    OBJ_TYPE = 'object',
	    STR_TYPE = 'string',
	    MAJOR = 'major',
	    MODEL = 'model',
	    NAME = 'name',
	    TYPE = 'type',
	    VENDOR = 'vendor',
	    VERSION = 'version',
	    ARCHITECTURE = 'architecture',
	    CONSOLE = 'console',
	    MOBILE = 'mobile',
	    TABLET = 'tablet',
	    SMARTTV = 'smarttv',
	    WEARABLE = 'wearable',
	    EMBEDDED = 'embedded',
	    UA_MAX_LENGTH = 350;
	  var AMAZON = 'Amazon',
	    APPLE = 'Apple',
	    ASUS = 'ASUS',
	    BLACKBERRY = 'BlackBerry',
	    BROWSER = 'Browser',
	    CHROME = 'Chrome',
	    EDGE = 'Edge',
	    FIREFOX = 'Firefox',
	    GOOGLE = 'Google',
	    HUAWEI = 'Huawei',
	    LG = 'LG',
	    MICROSOFT = 'Microsoft',
	    MOTOROLA = 'Motorola',
	    OPERA = 'Opera',
	    SAMSUNG = 'Samsung',
	    SHARP = 'Sharp',
	    SONY = 'Sony',
	    XIAOMI = 'Xiaomi',
	    ZEBRA = 'Zebra',
	    FACEBOOK = 'Facebook';

	  ///////////
	  // Helper
	  //////////

	  var extend = function (regexes, extensions) {
	      var mergedRegexes = {};
	      for (var i in regexes) {
	        if (extensions[i] && extensions[i].length % 2 === 0) {
	          mergedRegexes[i] = extensions[i].concat(regexes[i]);
	        } else {
	          mergedRegexes[i] = regexes[i];
	        }
	      }
	      return mergedRegexes;
	    },
	    enumerize = function (arr) {
	      var enums = {};
	      for (var i = 0; i < arr.length; i++) {
	        enums[arr[i].toUpperCase()] = arr[i];
	      }
	      return enums;
	    },
	    has = function (str1, str2) {
	      return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
	    },
	    lowerize = function (str) {
	      return str.toLowerCase();
	    },
	    majorize = function (version) {
	      return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split('.')[0] : undefined$1;
	    },
	    trim = function (str, len) {
	      if (typeof str === STR_TYPE) {
	        str = str.replace(/^\s\s*/, EMPTY).replace(/\s\s*$/, EMPTY);
	        return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
	      }
	    };

	  ///////////////
	  // Map helper
	  //////////////

	  var rgxMapper = function (ua, arrays) {
	      var i = 0,
	        j,
	        k,
	        p,
	        q,
	        matches,
	        match;

	      // loop through all regexes maps
	      while (i < arrays.length && !matches) {
	        var regex = arrays[i],
	          // even sequence (0,2,4,..)
	          props = arrays[i + 1]; // odd sequence (1,3,5,..)
	        j = k = 0;

	        // try matching uastring with regexes
	        while (j < regex.length && !matches) {
	          matches = regex[j++].exec(ua);
	          if (!!matches) {
	            for (p = 0; p < props.length; p++) {
	              match = matches[++k];
	              q = props[p];
	              // check if given property is actually array
	              if (typeof q === OBJ_TYPE && q.length > 0) {
	                if (q.length === 2) {
	                  if (typeof q[1] == FUNC_TYPE) {
	                    // assign modified match
	                    this[q[0]] = q[1].call(this, match);
	                  } else {
	                    // assign given value, ignore regex match
	                    this[q[0]] = q[1];
	                  }
	                } else if (q.length === 3) {
	                  // check whether function or regex
	                  if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
	                    // call function (usually string mapper)
	                    this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined$1;
	                  } else {
	                    // sanitize match using given regex
	                    this[q[0]] = match ? match.replace(q[1], q[2]) : undefined$1;
	                  }
	                } else if (q.length === 4) {
	                  this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined$1;
	                }
	              } else {
	                this[q] = match ? match : undefined$1;
	              }
	            }
	          }
	        }
	        i += 2;
	      }
	    },
	    strMapper = function (str, map) {
	      for (var i in map) {
	        // check if current value is array
	        if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
	          for (var j = 0; j < map[i].length; j++) {
	            if (has(map[i][j], str)) {
	              return i === UNKNOWN ? undefined$1 : i;
	            }
	          }
	        } else if (has(map[i], str)) {
	          return i === UNKNOWN ? undefined$1 : i;
	        }
	      }
	      return str;
	    };

	  ///////////////
	  // String map
	  //////////////

	  // Safari < 3.0
	  var oldSafariMap = {
	      '1.0': '/8',
	      '1.2': '/1',
	      '1.3': '/3',
	      '2.0': '/412',
	      '2.0.2': '/416',
	      '2.0.3': '/417',
	      '2.0.4': '/419',
	      '?': '/'
	    },
	    windowsVersionMap = {
	      'ME': '4.90',
	      'NT 3.11': 'NT3.51',
	      'NT 4.0': 'NT4.0',
	      '2000': 'NT 5.0',
	      'XP': ['NT 5.1', 'NT 5.2'],
	      'Vista': 'NT 6.0',
	      '7': 'NT 6.1',
	      '8': 'NT 6.2',
	      '8.1': 'NT 6.3',
	      '10': ['NT 6.4', 'NT 10.0'],
	      'RT': 'ARM'
	    };

	  //////////////
	  // Regex map
	  /////////////

	  var regexes = {
	    browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
	    ], [VERSION, [NAME, 'Chrome']], [/edg(?:e|ios|a)?\/([\w\.]+)/i // Microsoft Edge
	    ], [VERSION, [NAME, 'Edge']], [
	    // Presto based
	    /(opera mini)\/([-\w\.]+)/i,
	    // Opera Mini
	    /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
	    // Opera Mobi/Tablet
	    /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i // Opera
	    ], [NAME, VERSION], [/opios[\/ ]+([\w\.]+)/i // Opera mini on iphone >= 8.0
	    ], [VERSION, [NAME, OPERA + ' Mini']], [/\bopr\/([\w\.]+)/i // Opera Webkit
	    ], [VERSION, [NAME, OPERA]], [
	    // Mixed
	    /(kindle)\/([\w\.]+)/i,
	    // Kindle
	    /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
	    // Lunascape/Maxthon/Netfront/Jasmine/Blazer
	    // Trident based
	    /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
	    // Avant/IEMobile/SlimBrowser
	    /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
	    // Baidu Browser
	    /(?:ms|\()(ie) ([\w\.]+)/i,
	    // Internet Explorer

	    // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
	    /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
	    // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
	    /(weibo)__([\d\.]+)/i // Weibo
	    ], [NAME, VERSION], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i // UCBrowser
	    ], [VERSION, [NAME, 'UC' + BROWSER]], [/microm.+\bqbcore\/([\w\.]+)/i,
	    // WeChat Desktop for Windows Built-in Browser
	    /\bqbcore\/([\w\.]+).+microm/i], [VERSION, [NAME, 'WeChat(Win) Desktop']], [/micromessenger\/([\w\.]+)/i // WeChat
	    ], [VERSION, [NAME, 'WeChat']], [/konqueror\/([\w\.]+)/i // Konqueror
	    ], [VERSION, [NAME, 'Konqueror']], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i // IE11
	    ], [VERSION, [NAME, 'IE']], [/yabrowser\/([\w\.]+)/i // Yandex
	    ], [VERSION, [NAME, 'Yandex']], [/(avast|avg)\/([\w\.]+)/i // Avast/AVG Secure Browser
	    ], [[NAME, /(.+)/, '$1 Secure ' + BROWSER], VERSION], [/\bfocus\/([\w\.]+)/i // Firefox Focus
	    ], [VERSION, [NAME, FIREFOX + ' Focus']], [/\bopt\/([\w\.]+)/i // Opera Touch
	    ], [VERSION, [NAME, OPERA + ' Touch']], [/coc_coc\w+\/([\w\.]+)/i // Coc Coc Browser
	    ], [VERSION, [NAME, 'Coc Coc']], [/dolfin\/([\w\.]+)/i // Dolphin
	    ], [VERSION, [NAME, 'Dolphin']], [/coast\/([\w\.]+)/i // Opera Coast
	    ], [VERSION, [NAME, OPERA + ' Coast']], [/miuibrowser\/([\w\.]+)/i // MIUI Browser
	    ], [VERSION, [NAME, 'MIUI ' + BROWSER]], [/fxios\/([-\w\.]+)/i // Firefox for iOS
	    ], [VERSION, [NAME, FIREFOX]], [/\bqihu|(qi?ho?o?|360)browser/i // 360
	    ], [[NAME, '360 ' + BROWSER]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[NAME, /(.+)/, '$1 ' + BROWSER], VERSION], [
	    // Oculus/Samsung/Sailfish/Huawei Browser
	    /(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
	    ], [[NAME, /_/g, ' '], VERSION], [/(electron)\/([\w\.]+) safari/i,
	    // Electron-based App
	    /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
	    // Tesla
	    /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i // QQBrowser/Baidu App/2345 Browser
	    ], [NAME, VERSION], [/(metasr)[\/ ]?([\w\.]+)/i,
	    // SouGouBrowser
	    /(lbbrowser)/i,
	    // LieBao Browser
	    /\[(linkedin)app\]/i // LinkedIn App for iOS & Android
	    ], [NAME], [
	    // WebView
	    /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i // Facebook App for iOS & Android
	    ], [[NAME, FACEBOOK], VERSION], [/safari (line)\/([\w\.]+)/i,
	    // Line App for iOS
	    /\b(line)\/([\w\.]+)\/iab/i,
	    // Line App for Android
	    /(chromium|instagram)[\/ ]([-\w\.]+)/i // Chromium/Instagram
	    ], [NAME, VERSION], [/\bgsa\/([\w\.]+) .*safari\//i // Google Search Appliance on iOS
	    ], [VERSION, [NAME, 'GSA']], [/headlesschrome(?:\/([\w\.]+)| )/i // Chrome Headless
	    ], [VERSION, [NAME, CHROME + ' Headless']], [/ wv\).+(chrome)\/([\w\.]+)/i // Chrome WebView
	    ], [[NAME, CHROME + ' WebView'], VERSION], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i // Android Browser
	    ], [VERSION, [NAME, 'Android ' + BROWSER]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i // Chrome/OmniWeb/Arora/Tizen/Nokia
	    ], [NAME, VERSION], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i // Mobile Safari
	    ], [VERSION, [NAME, 'Mobile Safari']], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i // Safari & Safari Mobile
	    ], [VERSION, NAME], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
	    ], [NAME, [VERSION, strMapper, oldSafariMap]], [/(webkit|khtml)\/([\w\.]+)/i], [NAME, VERSION], [
	    // Gecko based
	    /(navigator|netscape\d?)\/([-\w\.]+)/i // Netscape
	    ], [[NAME, 'Netscape'], VERSION], [/mobile vr; rv:([\w\.]+)\).+firefox/i // Firefox Reality
	    ], [VERSION, [NAME, FIREFOX + ' Reality']], [/ekiohf.+(flow)\/([\w\.]+)/i,
	    // Flow
	    /(swiftfox)/i,
	    // Swiftfox
	    /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
	    // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
	    /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
	    // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
	    /(firefox)\/([\w\.]+)/i,
	    // Other Firefox-based
	    /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
	    // Mozilla

	    // Other
	    /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
	    // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
	    /(links) \(([\w\.]+)/i // Links
	    ], [NAME, VERSION]],
	    cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i // AMD64 (x64)
	    ], [[ARCHITECTURE, 'amd64']], [/(ia32(?=;))/i // IA32 (quicktime)
	    ], [[ARCHITECTURE, lowerize]], [/((?:i[346]|x)86)[;\)]/i // IA32 (x86)
	    ], [[ARCHITECTURE, 'ia32']], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i // ARM64
	    ], [[ARCHITECTURE, 'arm64']], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i // ARMHF
	    ], [[ARCHITECTURE, 'armhf']], [
	    // PocketPC mistakenly identified as PowerPC
	    /windows (ce|mobile); ppc;/i], [[ARCHITECTURE, 'arm']], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i // PowerPC
	    ], [[ARCHITECTURE, /ower/, EMPTY, lowerize]], [/(sun4\w)[;\)]/i // SPARC
	    ], [[ARCHITECTURE, 'sparc']], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
	    // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
	    ], [[ARCHITECTURE, lowerize]]],
	    device: [[
	    //////////////////////////
	    // MOBILES & TABLETS
	    // Ordered by popularity
	    /////////////////////////

	    // Samsung
	    /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]], [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]], [
	    // Apple
	    /\((ip(?:hone|od)[\w ]*);/i // iPod/iPhone
	    ], [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]], [/\((ipad);[-\w\),; ]+apple/i,
	    // iPad
	    /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [MODEL, [VENDOR, APPLE], [TYPE, TABLET]], [
	    // Huawei
	    /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]], [
	    // Xiaomi
	    /\b(poco[\w ]+)(?: bui|\))/i,
	    // Xiaomi POCO
	    /\b; (\w+) build\/hm\1/i,
	    // Xiaomi Hongmi 'numeric' models
	    /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
	    // Xiaomi Hongmi
	    /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
	    // Xiaomi Redmi
	    /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i // Xiaomi Mi
	    ], [[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, MOBILE]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i // Mi Pad tablets
	    ], [[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, TABLET]], [
	    // OPPO
	    /; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [
	    // Vivo
	    /vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [MODEL, [VENDOR, 'Vivo'], [TYPE, MOBILE]], [
	    // Realme
	    /\b(rmx[12]\d{3})(?: bui|;|\))/i], [MODEL, [VENDOR, 'Realme'], [TYPE, MOBILE]], [
	    // Motorola
	    /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]], [
	    // LG
	    /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [MODEL, [VENDOR, LG], [TYPE, TABLET]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [MODEL, [VENDOR, LG], [TYPE, MOBILE]], [
	    // Lenovo
	    /(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [
	    // Nokia
	    /(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[MODEL, /_/g, ' '], [VENDOR, 'Nokia'], [TYPE, MOBILE]], [
	    // Google
	    /(pixel c)\b/i // Google Pixel C
	    ], [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i // Google Pixel
	    ], [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]], [
	    // Sony
	    /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [MODEL, [VENDOR, SONY], [TYPE, MOBILE]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[MODEL, 'Xperia Tablet'], [VENDOR, SONY], [TYPE, TABLET]], [
	    // OnePlus
	    / (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [
	    // Amazon
	    /(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i,
	    // Kindle Fire without Silk
	    /(kf[a-z]+)( bui|\)).+silk\//i // Kindle Fire HD
	    ], [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i // Fire Phone
	    ], [[MODEL, /(.+)/g, 'Fire Phone $1'], [VENDOR, AMAZON], [TYPE, MOBILE]], [
	    // BlackBerry
	    /(playbook);[-\w\),; ]+(rim)/i // BlackBerry PlayBook
	    ], [MODEL, VENDOR, [TYPE, TABLET]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i // BlackBerry 10
	    ], [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]], [
	    // Asus
	    /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [MODEL, [VENDOR, ASUS], [TYPE, TABLET]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]], [
	    // HTC
	    /(nexus 9)/i // HTC Nexus 9
	    ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
	    // HTC

	    // ZTE
	    /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic|sony(?!-bra))[-_ ]?([-\w]*)/i // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
	    ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [
	    // Acer
	    /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [
	    // Meizu
	    /droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [
	    // Sharp
	    /\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]], [
	    // MIXED
	    /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
	    // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
	    /(hp) ([\w ]+\w)/i,
	    // HP iPAQ
	    /(asus)-?(\w+)/i,
	    // Asus
	    /(microsoft); (lumia[\w ]+)/i,
	    // Microsoft Lumia
	    /(lenovo)[-_ ]?([-\w]+)/i,
	    // Lenovo
	    /(jolla)/i,
	    // Jolla
	    /(oppo) ?([\w ]+) bui/i // OPPO
	    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/(archos) (gamepad2?)/i,
	    // Archos
	    /(hp).+(touchpad(?!.+tablet)|tablet)/i,
	    // HP TouchPad
	    /(kindle)\/([\w\.]+)/i,
	    // Kindle
	    /(nook)[\w ]+build\/(\w+)/i,
	    // Nook
	    /(dell) (strea[kpr\d ]*[\dko])/i,
	    // Dell Streak
	    /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
	    // Le Pan Tablets
	    /(trinity)[- ]*(t\d{3}) bui/i,
	    // Trinity Tablets
	    /(gigaset)[- ]+(q\w{1,9}) bui/i,
	    // Gigaset Tablets
	    /(vodafone) ([\w ]+)(?:\)| bui)/i // Vodafone
	    ], [VENDOR, MODEL, [TYPE, TABLET]], [/(surface duo)/i // Surface Duo
	    ], [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i // Fairphone
	    ], [MODEL, [VENDOR, 'Fairphone'], [TYPE, MOBILE]], [/(u304aa)/i // AT&T
	    ], [MODEL, [VENDOR, 'AT&T'], [TYPE, MOBILE]], [/\bsie-(\w*)/i // Siemens
	    ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [/\b(rct\w+) b/i // RCA Tablets
	    ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [/\b(venue[\d ]{2,7}) b/i // Dell Venue Tablets
	    ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [/\b(q(?:mv|ta)\w+) b/i // Verizon Tablet
	    ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i // Barnes & Noble Tablet
	    ], [MODEL, [VENDOR, 'Barnes & Noble'], [TYPE, TABLET]], [/\b(tm\d{3}\w+) b/i], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [/\b(k88) b/i // ZTE K Series Tablet
	    ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [/\b(nx\d{3}j) b/i // ZTE Nubia
	    ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [/\b(gen\d{3}) b.+49h/i // Swiss GEN Mobile
	    ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [/\b(zur\d{3}) b/i // Swiss ZUR Tablet
	    ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [/\b((zeki)?tb.*\b) b/i // Zeki Tablets
	    ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i // Dragon Touch Tablet
	    ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [/\b(ns-?\w{0,9}) b/i // Insignia Tablets
	    ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [/\b((nxa|next)-?\w{0,9}) b/i // NextBook Tablets
	    ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i // Voice Xtreme Phones
	    ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [/\b(lvtel\-)?(v1[12]) b/i // LvTel Phones
	    ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [/\b(ph-1) /i // Essential PH-1
	    ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [/\b(v(100md|700na|7011|917g).*\b) b/i // Envizen Tablets
	    ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [/\b(trio[-\w\. ]+) b/i // MachSpeed Tablets
	    ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [/\btu_(1491) b/i // Rotor Tablets
	    ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [/(shield[\w ]+) b/i // Nvidia Shield Tablets
	    ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, TABLET]], [/(sprint) (\w+)/i // Sprint Phones
	    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/(kin\.[onetw]{3})/i // Microsoft Kin
	    ], [[MODEL, /\./g, ' '], [VENDOR, MICROSOFT], [TYPE, MOBILE]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i // Zebra
	    ], [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]], [
	    ///////////////////
	    // CONSOLES
	    ///////////////////

	    /(ouya)/i,
	    // Ouya
	    /(nintendo) ([wids3utch]+)/i // Nintendo
	    ], [VENDOR, MODEL, [TYPE, CONSOLE]], [/droid.+; (shield) bui/i // Nvidia
	    ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [/(playstation [345portablevi]+)/i // Playstation
	    ], [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i // Microsoft Xbox
	    ], [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]], [
	    ///////////////////
	    // SMARTTVS
	    ///////////////////

	    /smart-tv.+(samsung)/i // Samsung
	    ], [VENDOR, [TYPE, SMARTTV]], [/hbbtv.+maple;(\d+)/i], [[MODEL, /^/, 'SmartTV'], [VENDOR, SAMSUNG], [TYPE, SMARTTV]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i // LG SmartTV
	    ], [[VENDOR, LG], [TYPE, SMARTTV]], [/(apple) ?tv/i // Apple TV
	    ], [VENDOR, [MODEL, APPLE + ' TV'], [TYPE, SMARTTV]], [/crkey/i // Google Chromecast
	    ], [[MODEL, CHROME + 'cast'], [VENDOR, GOOGLE], [TYPE, SMARTTV]], [/droid.+aft(\w)( bui|\))/i // Fire TV
	    ], [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i // Sharp
	    ], [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]], [/(bravia[\w ]+)( bui|\))/i // Sony
	    ], [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]], [/(mitv-\w{5}) bui/i // Xiaomi
	    ], [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
	    // Roku
	    /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i // HbbTV devices
	    ], [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i // SmartTV from Unidentified Vendors
	    ], [[TYPE, SMARTTV]], [
	    ///////////////////
	    // WEARABLES
	    ///////////////////

	    /((pebble))app/i // Pebble
	    ], [VENDOR, MODEL, [TYPE, WEARABLE]], [/droid.+; (glass) \d/i // Google Glass
	    ], [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]], [/droid.+; (wt63?0{2,3})\)/i], [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]], [/(quest( 2)?)/i // Oculus Quest
	    ], [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]], [
	    ///////////////////
	    // EMBEDDED
	    ///////////////////

	    /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i // Tesla
	    ], [VENDOR, [TYPE, EMBEDDED]], [
	    ////////////////////
	    // MIXED (GENERIC)
	    ///////////////////

	    /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i // Android Phones from Unidentified Vendors
	    ], [MODEL, [TYPE, MOBILE]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i // Android Tablets from Unidentified Vendors
	    ], [MODEL, [TYPE, TABLET]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i // Unidentifiable Tablet
	    ], [[TYPE, TABLET]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i // Unidentifiable Mobile
	    ], [[TYPE, MOBILE]], [/(android[-\w\. ]{0,9});.+buil/i // Generic Android Device
	    ], [MODEL, [VENDOR, 'Generic']]],
	    engine: [[/windows.+ edge\/([\w\.]+)/i // EdgeHTML
	    ], [VERSION, [NAME, EDGE + 'HTML']], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i // Blink
	    ], [VERSION, [NAME, 'Blink']], [/(presto)\/([\w\.]+)/i,
	    // Presto
	    /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
	    // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
	    /ekioh(flow)\/([\w\.]+)/i,
	    // Flow
	    /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
	    // KHTML/Tasman/Links
	    /(icab)[\/ ]([23]\.[\d\.]+)/i // iCab
	    ], [NAME, VERSION], [/rv\:([\w\.]{1,9})\b.+(gecko)/i // Gecko
	    ], [VERSION, NAME]],
	    os: [[
	    // Windows
	    /microsoft (windows) (vista|xp)/i // Windows (iTunes)
	    ], [NAME, VERSION], [/(windows) nt 6\.2; (arm)/i,
	    // Windows RT
	    /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
	    // Windows Phone
	    /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [NAME, [VERSION, strMapper, windowsVersionMap]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[NAME, 'Windows'], [VERSION, strMapper, windowsVersionMap]], [
	    // iOS/macOS
	    /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
	    // iOS
	    /cfnetwork\/.+darwin/i], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i // Mac OS
	    ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [
	    // Mobile OSes
	    /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i // Android-x86/HarmonyOS
	    ], [VERSION, NAME], [
	    // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
	    /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i,
	    // Blackberry
	    /(tizen|kaios)[\/ ]([\w\.]+)/i,
	    // Tizen/KaiOS
	    /\((series40);/i // Series 40
	    ], [NAME, VERSION], [/\(bb(10);/i // BlackBerry 10
	    ], [VERSION, [NAME, BLACKBERRY]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i // Symbian
	    ], [VERSION, [NAME, 'Symbian']], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i // Firefox OS
	    ], [VERSION, [NAME, FIREFOX + ' OS']], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i // WebOS
	    ], [VERSION, [NAME, 'webOS']], [
	    // Google Chromecast
	    /crkey\/([\d\.]+)/i // Google Chromecast
	    ], [VERSION, [NAME, CHROME + 'cast']], [/(cros) [\w]+ ([\w\.]+\w)/i // Chromium OS
	    ], [[NAME, 'Chromium OS'], VERSION], [
	    // Console
	    /(nintendo|playstation) ([wids345portablevuch]+)/i,
	    // Nintendo/Playstation
	    /(xbox); +xbox ([^\);]+)/i,
	    // Microsoft Xbox (360, One, X, S, Series X, Series S)

	    // Other
	    /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
	    // Joli/Palm
	    /(mint)[\/\(\) ]?(\w*)/i,
	    // Mint
	    /(mageia|vectorlinux)[; ]/i,
	    // Mageia/VectorLinux
	    /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
	    // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
	    /(hurd|linux) ?([\w\.]*)/i,
	    // Hurd/Linux
	    /(gnu) ?([\w\.]*)/i,
	    // GNU
	    /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
	    // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
	    /(haiku) (\w+)/i // Haiku
	    ], [NAME, VERSION], [/(sunos) ?([\w\.\d]*)/i // Solaris
	    ], [[NAME, 'Solaris'], VERSION], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
	    // Solaris
	    /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
	    // AIX
	    /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,
	    // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX
	    /(unix) ?([\w\.]*)/i // UNIX
	    ], [NAME, VERSION]]
	  };

	  /////////////////
	  // Constructor
	  ////////////////

	  var UAParser = function (ua, extensions) {
	    if (typeof ua === OBJ_TYPE) {
	      extensions = ua;
	      ua = undefined$1;
	    }
	    if (!(this instanceof UAParser)) {
	      return new UAParser(ua, extensions).getResult();
	    }
	    var _ua = ua || (typeof window !== UNDEF_TYPE && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
	    var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
	    this.getBrowser = function () {
	      var _browser = {};
	      _browser[NAME] = undefined$1;
	      _browser[VERSION] = undefined$1;
	      rgxMapper.call(_browser, _ua, _rgxmap.browser);
	      _browser.major = majorize(_browser.version);
	      return _browser;
	    };
	    this.getCPU = function () {
	      var _cpu = {};
	      _cpu[ARCHITECTURE] = undefined$1;
	      rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
	      return _cpu;
	    };
	    this.getDevice = function () {
	      var _device = {};
	      _device[VENDOR] = undefined$1;
	      _device[MODEL] = undefined$1;
	      _device[TYPE] = undefined$1;
	      rgxMapper.call(_device, _ua, _rgxmap.device);
	      return _device;
	    };
	    this.getEngine = function () {
	      var _engine = {};
	      _engine[NAME] = undefined$1;
	      _engine[VERSION] = undefined$1;
	      rgxMapper.call(_engine, _ua, _rgxmap.engine);
	      return _engine;
	    };
	    this.getOS = function () {
	      var _os = {};
	      _os[NAME] = undefined$1;
	      _os[VERSION] = undefined$1;
	      rgxMapper.call(_os, _ua, _rgxmap.os);
	      return _os;
	    };
	    this.getResult = function () {
	      return {
	        ua: this.getUA(),
	        browser: this.getBrowser(),
	        engine: this.getEngine(),
	        os: this.getOS(),
	        device: this.getDevice(),
	        cpu: this.getCPU()
	      };
	    };
	    this.getUA = function () {
	      return _ua;
	    };
	    this.setUA = function (ua) {
	      _ua = typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH ? trim(ua, UA_MAX_LENGTH) : ua;
	      return this;
	    };
	    this.setUA(_ua);
	    return this;
	  };
	  UAParser.VERSION = LIBVERSION;
	  UAParser.BROWSER = enumerize([NAME, VERSION, MAJOR]);
	  UAParser.CPU = enumerize([ARCHITECTURE]);
	  UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
	  UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);

	  ///////////
	  // Export
	  //////////

	  // check js environment
	  {
	    // nodejs env
	    if (module.exports) {
	      exports = module.exports = UAParser;
	    }
	    exports.UAParser = UAParser;
	  }

	  // jQuery/Zepto specific (optional)
	  // Note:
	  //   In AMD env the global scope should be kept clean, but jQuery is an exception.
	  //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
	  //   and we should catch that.
	  var $ = typeof window !== UNDEF_TYPE && (window.jQuery || window.Zepto);
	  if ($ && !$.ua) {
	    var parser = new UAParser();
	    $.ua = parser.getResult();
	    $.ua.get = function () {
	      return parser.getUA();
	    };
	    $.ua.set = function (ua) {
	      parser.setUA(ua);
	      var result = parser.getResult();
	      for (var prop in result) {
	        $.ua[prop] = result[prop];
	      }
	    };
	  }
	})(typeof window === 'object' ? window : commonjsGlobal);
	});

	// 更换ua-parser-js，支持自定义参数
	const myBrowser = [
	    [/(xiaomiquan)\/([\w.]+)/i],
	    [/(micromessenger)\/([\w.]+)/i],
	];
	function getDeviceInfo() {
	    const md = new uaParser({ browser: myBrowser });
	    return {
	        isMobile: md.getDevice().type === "mobile",
	        isAndroid: md.getOS().name === "android",
	        browser: md.getBrowser().name,
	        userAgent: navigator.userAgent,
	        dpr: window.devicePixelRatio,
	        screenW: document.documentElement.clientWidth || document.body.clientWidth,
	        screenH: document.documentElement.clientHeight || document.body.clientHeight,
	    };
	}

	var device = /*#__PURE__*/Object.freeze({
		__proto__: null,
		getDeviceInfo: getDeviceInfo
	});

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */

	function __awaiter(thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	var isMergeableObject = function isMergeableObject(value) {
	  return isNonNullObject(value) && !isSpecial(value);
	};
	function isNonNullObject(value) {
	  return !!value && typeof value === 'object';
	}
	function isSpecial(value) {
	  var stringValue = Object.prototype.toString.call(value);
	  return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
	}

	// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
	var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;
	function isReactElement(value) {
	  return value.$$typeof === REACT_ELEMENT_TYPE;
	}
	function emptyTarget(val) {
	  return Array.isArray(val) ? [] : {};
	}
	function cloneUnlessOtherwiseSpecified(value, options) {
	  return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
	}
	function defaultArrayMerge(target, source, options) {
	  return target.concat(source).map(function (element) {
	    return cloneUnlessOtherwiseSpecified(element, options);
	  });
	}
	function getMergeFunction(key, options) {
	  if (!options.customMerge) {
	    return deepmerge;
	  }
	  var customMerge = options.customMerge(key);
	  return typeof customMerge === 'function' ? customMerge : deepmerge;
	}
	function getEnumerableOwnPropertySymbols(target) {
	  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
	    return target.propertyIsEnumerable(symbol);
	  }) : [];
	}
	function getKeys(target) {
	  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
	}
	function propertyIsOnObject(object, property) {
	  try {
	    return property in object;
	  } catch (_) {
	    return false;
	  }
	}

	// Protects from prototype poisoning and unexpected merging up the prototype chain.
	function propertyIsUnsafe(target, key) {
	  return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
	  && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
	  && Object.propertyIsEnumerable.call(target, key)); // and also unsafe if they're nonenumerable.
	}

	function mergeObject(target, source, options) {
	  var destination = {};
	  if (options.isMergeableObject(target)) {
	    getKeys(target).forEach(function (key) {
	      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
	    });
	  }
	  getKeys(source).forEach(function (key) {
	    if (propertyIsUnsafe(target, key)) {
	      return;
	    }
	    if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
	      destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
	    } else {
	      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
	    }
	  });
	  return destination;
	}
	function deepmerge(target, source, options) {
	  options = options || {};
	  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	  options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	  // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	  // implementations can use it. The caller may not replace it.
	  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
	  var sourceIsArray = Array.isArray(source);
	  var targetIsArray = Array.isArray(target);
	  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
	  if (!sourceAndTargetTypesMatch) {
	    return cloneUnlessOtherwiseSpecified(source, options);
	  } else if (sourceIsArray) {
	    return options.arrayMerge(target, source, options);
	  } else {
	    return mergeObject(target, source, options);
	  }
	}
	deepmerge.all = function deepmergeAll(array, options) {
	  if (!Array.isArray(array)) {
	    throw new Error('first argument should be an array');
	  }
	  return array.reduce(function (prev, next) {
	    return deepmerge(prev, next, options);
	  }, {});
	};
	var deepmerge_1 = deepmerge;
	var cjs = deepmerge_1;

	// Copyright Joyent, Inc. and other Node contributors.

	var R = typeof Reflect === 'object' ? Reflect : null;
	var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
	  return Function.prototype.apply.call(target, receiver, args);
	};
	var ReflectOwnKeys;
	if (R && typeof R.ownKeys === 'function') {
	  ReflectOwnKeys = R.ownKeys;
	} else if (Object.getOwnPropertySymbols) {
	  ReflectOwnKeys = function ReflectOwnKeys(target) {
	    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
	  };
	} else {
	  ReflectOwnKeys = function ReflectOwnKeys(target) {
	    return Object.getOwnPropertyNames(target);
	  };
	}
	function ProcessEmitWarning(warning) {
	  if (console && console.warn) console.warn(warning);
	}
	var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
	  return value !== value;
	};
	function EventEmitter() {
	  EventEmitter.init.call(this);
	}
	var events = EventEmitter;
	var once_1 = once;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._eventsCount = 0;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	var defaultMaxListeners = 10;
	function checkListener(listener) {
	  if (typeof listener !== 'function') {
	    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
	  }
	}
	Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
	  enumerable: true,
	  get: function () {
	    return defaultMaxListeners;
	  },
	  set: function (arg) {
	    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
	      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
	    }
	    defaultMaxListeners = arg;
	  }
	});
	EventEmitter.init = function () {
	  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
	    this._events = Object.create(null);
	    this._eventsCount = 0;
	  }
	  this._maxListeners = this._maxListeners || undefined;
	};

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
	    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
	  }
	  this._maxListeners = n;
	  return this;
	};
	function _getMaxListeners(that) {
	  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
	  return that._maxListeners;
	}
	EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
	  return _getMaxListeners(this);
	};
	EventEmitter.prototype.emit = function emit(type) {
	  var args = [];
	  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
	  var doError = type === 'error';
	  var events = this._events;
	  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false;

	  // If there is no 'error' event listener then throw.
	  if (doError) {
	    var er;
	    if (args.length > 0) er = args[0];
	    if (er instanceof Error) {
	      // Note: The comments on the `throw` lines are intentional, they show
	      // up in Node's output if this results in an unhandled exception.
	      throw er; // Unhandled 'error' event
	    }
	    // At least give some kind of context to the user
	    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
	    err.context = er;
	    throw err; // Unhandled 'error' event
	  }

	  var handler = events[type];
	  if (handler === undefined) return false;
	  if (typeof handler === 'function') {
	    ReflectApply(handler, this, args);
	  } else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
	  }
	  return true;
	};
	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;
	  checkListener(listener);
	  events = target._events;
	  if (events === undefined) {
	    events = target._events = Object.create(null);
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener !== undefined) {
	      target.emit('newListener', type, listener.listener ? listener.listener : listener);

	      // Re-assign `events` because a newListener handler could have caused the
	      // this._events to be assigned to a new object
	      events = target._events;
	    }
	    existing = events[type];
	  }
	  if (existing === undefined) {
	    // Optimize the case of one listener. Don't need the extra array object.
	    existing = events[type] = listener;
	    ++target._eventsCount;
	  } else {
	    if (typeof existing === 'function') {
	      // Adding the second element, need to change to array.
	      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
	      // If we've already got an array, just append.
	    } else if (prepend) {
	      existing.unshift(listener);
	    } else {
	      existing.push(listener);
	    }

	    // Check for listener leak
	    m = _getMaxListeners(target);
	    if (m > 0 && existing.length > m && !existing.warned) {
	      existing.warned = true;
	      // No error code for this since it is a Warning
	      // eslint-disable-next-line no-restricted-syntax
	      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
	      w.name = 'MaxListenersExceededWarning';
	      w.emitter = target;
	      w.type = type;
	      w.count = existing.length;
	      ProcessEmitWarning(w);
	    }
	  }
	  return target;
	}
	EventEmitter.prototype.addListener = function addListener(type, listener) {
	  return _addListener(this, type, listener, false);
	};
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	EventEmitter.prototype.prependListener = function prependListener(type, listener) {
	  return _addListener(this, type, listener, true);
	};
	function onceWrapper() {
	  if (!this.fired) {
	    this.target.removeListener(this.type, this.wrapFn);
	    this.fired = true;
	    if (arguments.length === 0) return this.listener.call(this.target);
	    return this.listener.apply(this.target, arguments);
	  }
	}
	function _onceWrap(target, type, listener) {
	  var state = {
	    fired: false,
	    wrapFn: undefined,
	    target: target,
	    type: type,
	    listener: listener
	  };
	  var wrapped = onceWrapper.bind(state);
	  wrapped.listener = listener;
	  state.wrapFn = wrapped;
	  return wrapped;
	}
	EventEmitter.prototype.once = function once(type, listener) {
	  checkListener(listener);
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};
	EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
	  checkListener(listener);
	  this.prependListener(type, _onceWrap(this, type, listener));
	  return this;
	};

	// Emits a 'removeListener' event if and only if the listener was removed.
	EventEmitter.prototype.removeListener = function removeListener(type, listener) {
	  var list, events, position, i, originalListener;
	  checkListener(listener);
	  events = this._events;
	  if (events === undefined) return this;
	  list = events[type];
	  if (list === undefined) return this;
	  if (list === listener || list.listener === listener) {
	    if (--this._eventsCount === 0) this._events = Object.create(null);else {
	      delete events[type];
	      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
	    }
	  } else if (typeof list !== 'function') {
	    position = -1;
	    for (i = list.length - 1; i >= 0; i--) {
	      if (list[i] === listener || list[i].listener === listener) {
	        originalListener = list[i].listener;
	        position = i;
	        break;
	      }
	    }
	    if (position < 0) return this;
	    if (position === 0) list.shift();else {
	      spliceOne(list, position);
	    }
	    if (list.length === 1) events[type] = list[0];
	    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
	  }
	  return this;
	};
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
	  var listeners, events, i;
	  events = this._events;
	  if (events === undefined) return this;

	  // not listening for removeListener, no need to emit
	  if (events.removeListener === undefined) {
	    if (arguments.length === 0) {
	      this._events = Object.create(null);
	      this._eventsCount = 0;
	    } else if (events[type] !== undefined) {
	      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
	    }
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    var keys = Object.keys(events);
	    var key;
	    for (i = 0; i < keys.length; ++i) {
	      key = keys[i];
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = Object.create(null);
	    this._eventsCount = 0;
	    return this;
	  }
	  listeners = events[type];
	  if (typeof listeners === 'function') {
	    this.removeListener(type, listeners);
	  } else if (listeners !== undefined) {
	    // LIFO order
	    for (i = listeners.length - 1; i >= 0; i--) {
	      this.removeListener(type, listeners[i]);
	    }
	  }
	  return this;
	};
	function _listeners(target, type, unwrap) {
	  var events = target._events;
	  if (events === undefined) return [];
	  var evlistener = events[type];
	  if (evlistener === undefined) return [];
	  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
	  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
	}
	EventEmitter.prototype.listeners = function listeners(type) {
	  return _listeners(this, type, true);
	};
	EventEmitter.prototype.rawListeners = function rawListeners(type) {
	  return _listeners(this, type, false);
	};
	EventEmitter.listenerCount = function (emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount.call(emitter, type);
	  }
	};
	EventEmitter.prototype.listenerCount = listenerCount;
	function listenerCount(type) {
	  var events = this._events;
	  if (events !== undefined) {
	    var evlistener = events[type];
	    if (typeof evlistener === 'function') {
	      return 1;
	    } else if (evlistener !== undefined) {
	      return evlistener.length;
	    }
	  }
	  return 0;
	}
	EventEmitter.prototype.eventNames = function eventNames() {
	  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
	};
	function arrayClone(arr, n) {
	  var copy = new Array(n);
	  for (var i = 0; i < n; ++i) copy[i] = arr[i];
	  return copy;
	}
	function spliceOne(list, index) {
	  for (; index + 1 < list.length; index++) list[index] = list[index + 1];
	  list.pop();
	}
	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);
	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }
	  return ret;
	}
	function once(emitter, name) {
	  return new Promise(function (resolve, reject) {
	    function errorListener(err) {
	      emitter.removeListener(name, resolver);
	      reject(err);
	    }
	    function resolver() {
	      if (typeof emitter.removeListener === 'function') {
	        emitter.removeListener('error', errorListener);
	      }
	      resolve([].slice.call(arguments));
	    }
	    eventTargetAgnosticAddListener(emitter, name, resolver, {
	      once: true
	    });
	    if (name !== 'error') {
	      addErrorHandlerIfEventEmitter(emitter, errorListener, {
	        once: true
	      });
	    }
	  });
	}
	function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
	  if (typeof emitter.on === 'function') {
	    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
	  }
	}
	function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
	  if (typeof emitter.on === 'function') {
	    if (flags.once) {
	      emitter.once(name, listener);
	    } else {
	      emitter.on(name, listener);
	    }
	  } else if (typeof emitter.addEventListener === 'function') {
	    // EventTarget does not have `error` event semantics like Node
	    // EventEmitters, we do not listen for `error` events here.
	    emitter.addEventListener(name, function wrapListener(arg) {
	      // IE does not have builtin `{ once: true }` support so we
	      // have to do it manually.
	      if (flags.once) {
	        emitter.removeEventListener(name, wrapListener);
	      }
	      listener(arg);
	    });
	  } else {
	    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
	  }
	}
	events.once = once_1;

	exports.TrackerEvents = void 0;
	(function (TrackerEvents) {
	    /* SDK expose events */
	    TrackerEvents["jsError"] = "jsError";
	    TrackerEvents["unHandleRejection"] = "unHandleRejection";
	    TrackerEvents["resourceError"] = "resourceError";
	    TrackerEvents["reqError"] = "reqError";
	    TrackerEvents["vuejsError"] = "vuejsError";
	    TrackerEvents["batchErrors"] = "batchErrors";
	    TrackerEvents["performanceInfoReady"] = "performanceInfoReady";
	    TrackerEvents["reqStart"] = "reqStart";
	    TrackerEvents["reqEnd"] = "reqEnd";
	    TrackerEvents["mouseTrack"] = "mouseTrack";
	    TrackerEvents["event"] = "event";
	    /* SDK inner events */
	    TrackerEvents["_clickEle"] = "_clickEle";
	    TrackerEvents["_console"] = "_console";
	    TrackerEvents["_onConsoleTrack"] = "_onConsoleTrack";
	    TrackerEvents["_offConsoleTrack"] = "_offConsoleTrack";
	    TrackerEvents["_mouseTrack"] = "_mouseTrack";
	    TrackerEvents["_initOptions"] = "_initOptions";
	    TrackerEvents["_globalDataChange"] = "_globalDataChange";
	})(exports.TrackerEvents || (exports.TrackerEvents = {}));
	exports.ErrorType = void 0;
	(function (ErrorType) {
	    ErrorType["vueJsError"] = "vuejsError";
	    ErrorType["jsError"] = "jsError";
	    ErrorType["unHandleRejectionError"] = "unHandleRejectionError";
	    ErrorType["resourceError"] = "resourceError";
	    ErrorType["httpRequestError"] = "httpError";
	})(exports.ErrorType || (exports.ErrorType = {}));

	function isObject$1(input) {
	    return Object.prototype.toString.call(input) === "[object Object]";
	}
	function getPageUrl() {
	    return window.location.href;
	}
	function getNetworkType() {
	    return navigator.connection
	        ? navigator.connection.effectiveType
	        : "";
	}
	function randomString(len) {
	    len = len || 10;
	    const $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789";
	    const maxPos = $chars.length;
	    let pwd = "";
	    for (let i = 0; i < len; i++) {
	        pwd = pwd + $chars.charAt(Math.floor(Math.random() * maxPos));
	    }
	    return pwd + new Date().getTime();
	}
	function getUvLabel() {
	    const date = new Date();
	    let uvLabel = localStorage.getItem("weaklight_uv") || "";
	    const datatime = localStorage.getItem("weaklight_uv_time") || "";
	    const today = date.getFullYear() +
	        "/" +
	        (date.getMonth() + 1) +
	        "/" +
	        date.getDate() +
	        " 23:59:59";
	    if ((!uvLabel && !datatime) || date.getTime() > Number(datatime)) {
	        uvLabel = randomString();
	        localStorage.setItem("weaklight_uv", uvLabel);
	        localStorage.setItem("weaklight_uv_time", String(new Date(today).getTime()));
	    }
	    return uvLabel;
	}
	function getUserSessionLabel() {
	    let userLabel = sessionStorage.getItem("weaklight_user") || "";
	    const result = {
	        label: userLabel,
	        isFristIn: false
	    };
	    if (!userLabel) {
	        userLabel = randomString();
	        sessionStorage.setItem("weaklight_user", userLabel);
	        result.label = userLabel;
	        result.isFristIn = true;
	    }
	    return result;
	}
	function getLocaleLanguage() {
	    if (navigator.languages != undefined)
	        return navigator.languages[0];
	    return navigator.language;
	}
	function replaceSlash(url) {
	    return url.replace(/^\/|\/$/g, "");
	}
	function convertObjToUrlencoded(obj) {
	    return new URLSearchParams(Object.entries(obj)).toString();
	}

	class MyEmitter extends events.EventEmitter {
	    constructor() {
	        super();
	        this.init();
	    }
	    customEmit(event, ...args) {
	        const [data, ...rest] = args;
	        if (!isObject$1(data)) {
	            return super.emit(event, ...args);
	        }
	        if (typeof data.beforeEmit === "function") {
	            const global = data.beforeEmit.call(this, data);
	            Object.assign(data, global);
	            Reflect.deleteProperty(data, "beforeEmit");
	        }
	        super.emit(exports.TrackerEvents.event, event, data, ...rest);
	        return super.emit(event, data, ...rest);
	    }
	    // Emit an event with decorated data
	    emitWithGlobalData(event, ...args) {
	        const [data, ...rest] = args;
	        return this.customEmit(event, {
	            dataset: data,
	            beforeEmit: (dataset) => {
	                return this.decorateData(dataset);
	            },
	        }, ...rest);
	    }
	    decorateData(dataset) {
	        const data = {
	            time: Date.now(),
	            globalData: this.globalData,
	        };
	        if (!data.title) {
	            data.title = document.title;
	        }
	        if (!data.url) {
	            data.url = getPageUrl();
	        }
	        if (!data.preUrl) {
	            data.preUrl =
	                document.referrer && document.referrer !== location.href
	                    ? document.referrer
	                    : "";
	        }
	        if (!data.uvLabel) {
	            data.uvLabel = getUvLabel();
	        }
	        if (!data.userLabel) {
	            data.userLabel = getUserSessionLabel();
	        }
	        return data;
	    }
	    init() {
	        this.globalData = {};
	        this.on(exports.TrackerEvents._globalDataChange, (globalData) => {
	            this.globalData = globalData;
	        });
	    }
	}
	const myEmitter = new MyEmitter();

	var stackframe = createCommonjsModule(function (module, exports) {
	(function (root, factory) {

	  // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

	  /* istanbul ignore next */
	  {
	    module.exports = factory();
	  }
	})(commonjsGlobal, function () {

	  function _isNumber(n) {
	    return !isNaN(parseFloat(n)) && isFinite(n);
	  }
	  function _capitalize(str) {
	    return str.charAt(0).toUpperCase() + str.substring(1);
	  }
	  function _getter(p) {
	    return function () {
	      return this[p];
	    };
	  }
	  var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
	  var numericProps = ['columnNumber', 'lineNumber'];
	  var stringProps = ['fileName', 'functionName', 'source'];
	  var arrayProps = ['args'];
	  var objectProps = ['evalOrigin'];
	  var props = booleanProps.concat(numericProps, stringProps, arrayProps, objectProps);
	  function StackFrame(obj) {
	    if (!obj) return;
	    for (var i = 0; i < props.length; i++) {
	      if (obj[props[i]] !== undefined) {
	        this['set' + _capitalize(props[i])](obj[props[i]]);
	      }
	    }
	  }
	  StackFrame.prototype = {
	    getArgs: function () {
	      return this.args;
	    },
	    setArgs: function (v) {
	      if (Object.prototype.toString.call(v) !== '[object Array]') {
	        throw new TypeError('Args must be an Array');
	      }
	      this.args = v;
	    },
	    getEvalOrigin: function () {
	      return this.evalOrigin;
	    },
	    setEvalOrigin: function (v) {
	      if (v instanceof StackFrame) {
	        this.evalOrigin = v;
	      } else if (v instanceof Object) {
	        this.evalOrigin = new StackFrame(v);
	      } else {
	        throw new TypeError('Eval Origin must be an Object or StackFrame');
	      }
	    },
	    toString: function () {
	      var fileName = this.getFileName() || '';
	      var lineNumber = this.getLineNumber() || '';
	      var columnNumber = this.getColumnNumber() || '';
	      var functionName = this.getFunctionName() || '';
	      if (this.getIsEval()) {
	        if (fileName) {
	          return '[eval] (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
	        }
	        return '[eval]:' + lineNumber + ':' + columnNumber;
	      }
	      if (functionName) {
	        return functionName + ' (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
	      }
	      return fileName + ':' + lineNumber + ':' + columnNumber;
	    }
	  };
	  StackFrame.fromString = function StackFrame$$fromString(str) {
	    var argsStartIndex = str.indexOf('(');
	    var argsEndIndex = str.lastIndexOf(')');
	    var functionName = str.substring(0, argsStartIndex);
	    var args = str.substring(argsStartIndex + 1, argsEndIndex).split(',');
	    var locationString = str.substring(argsEndIndex + 1);
	    if (locationString.indexOf('@') === 0) {
	      var parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(locationString, '');
	      var fileName = parts[1];
	      var lineNumber = parts[2];
	      var columnNumber = parts[3];
	    }
	    return new StackFrame({
	      functionName: functionName,
	      args: args || undefined,
	      fileName: fileName,
	      lineNumber: lineNumber || undefined,
	      columnNumber: columnNumber || undefined
	    });
	  };
	  for (var i = 0; i < booleanProps.length; i++) {
	    StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
	    StackFrame.prototype['set' + _capitalize(booleanProps[i])] = function (p) {
	      return function (v) {
	        this[p] = Boolean(v);
	      };
	    }(booleanProps[i]);
	  }
	  for (var j = 0; j < numericProps.length; j++) {
	    StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
	    StackFrame.prototype['set' + _capitalize(numericProps[j])] = function (p) {
	      return function (v) {
	        if (!_isNumber(v)) {
	          throw new TypeError(p + ' must be a Number');
	        }
	        this[p] = Number(v);
	      };
	    }(numericProps[j]);
	  }
	  for (var k = 0; k < stringProps.length; k++) {
	    StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
	    StackFrame.prototype['set' + _capitalize(stringProps[k])] = function (p) {
	      return function (v) {
	        this[p] = String(v);
	      };
	    }(stringProps[k]);
	  }
	  return StackFrame;
	});
	});

	var errorStackParser = createCommonjsModule(function (module, exports) {
	(function (root, factory) {

	  // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

	  /* istanbul ignore next */
	  {
	    module.exports = factory(stackframe);
	  }
	})(commonjsGlobal, function ErrorStackParser(StackFrame) {

	  var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
	  var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
	  var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
	  return {
	    /**
	     * Given an Error object, extract the most information from it.
	     *
	     * @param {Error} error object
	     * @return {Array} of StackFrames
	     */
	    parse: function ErrorStackParser$$parse(error) {
	      if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
	        return this.parseOpera(error);
	      } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
	        return this.parseV8OrIE(error);
	      } else if (error.stack) {
	        return this.parseFFOrSafari(error);
	      } else {
	        throw new Error('Cannot parse given Error object');
	      }
	    },
	    // Separate line and column numbers from a string of the form: (URI:Line:Column)
	    extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
	      // Fail-fast but return locations like "(native)"
	      if (urlLike.indexOf(':') === -1) {
	        return [urlLike];
	      }
	      var regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
	      var parts = regExp.exec(urlLike.replace(/[()]/g, ''));
	      return [parts[1], parts[2] || undefined, parts[3] || undefined];
	    },
	    parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
	      var filtered = error.stack.split('\n').filter(function (line) {
	        return !!line.match(CHROME_IE_STACK_REGEXP);
	      }, this);
	      return filtered.map(function (line) {
	        if (line.indexOf('(eval ') > -1) {
	          // Throw away eval information until we implement stacktrace.js/stackframe#8
	          line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(,.*$)/g, '');
	        }
	        var sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').replace(/^.*?\s+/, '');

	        // capture and preseve the parenthesized location "(/foo/my bar.js:12:87)" in
	        // case it has spaces in it, as the string is split on \s+ later on
	        var location = sanitizedLine.match(/ (\(.+\)$)/);

	        // remove the parenthesized location from the line, if it was matched
	        sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;

	        // if a location was matched, pass it to extractLocation() otherwise pass all sanitizedLine
	        // because this line doesn't have function name
	        var locationParts = this.extractLocation(location ? location[1] : sanitizedLine);
	        var functionName = location && sanitizedLine || undefined;
	        var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];
	        return new StackFrame({
	          functionName: functionName,
	          fileName: fileName,
	          lineNumber: locationParts[1],
	          columnNumber: locationParts[2],
	          source: line
	        });
	      }, this);
	    },
	    parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
	      var filtered = error.stack.split('\n').filter(function (line) {
	        return !line.match(SAFARI_NATIVE_CODE_REGEXP);
	      }, this);
	      return filtered.map(function (line) {
	        // Throw away eval information until we implement stacktrace.js/stackframe#8
	        if (line.indexOf(' > eval') > -1) {
	          line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1');
	        }
	        if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
	          // Safari eval frames only have function names and nothing else
	          return new StackFrame({
	            functionName: line
	          });
	        } else {
	          var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
	          var matches = line.match(functionNameRegex);
	          var functionName = matches && matches[1] ? matches[1] : undefined;
	          var locationParts = this.extractLocation(line.replace(functionNameRegex, ''));
	          return new StackFrame({
	            functionName: functionName,
	            fileName: locationParts[0],
	            lineNumber: locationParts[1],
	            columnNumber: locationParts[2],
	            source: line
	          });
	        }
	      }, this);
	    },
	    parseOpera: function ErrorStackParser$$parseOpera(e) {
	      if (!e.stacktrace || e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
	        return this.parseOpera9(e);
	      } else if (!e.stack) {
	        return this.parseOpera10(e);
	      } else {
	        return this.parseOpera11(e);
	      }
	    },
	    parseOpera9: function ErrorStackParser$$parseOpera9(e) {
	      var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
	      var lines = e.message.split('\n');
	      var result = [];
	      for (var i = 2, len = lines.length; i < len; i += 2) {
	        var match = lineRE.exec(lines[i]);
	        if (match) {
	          result.push(new StackFrame({
	            fileName: match[2],
	            lineNumber: match[1],
	            source: lines[i]
	          }));
	        }
	      }
	      return result;
	    },
	    parseOpera10: function ErrorStackParser$$parseOpera10(e) {
	      var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
	      var lines = e.stacktrace.split('\n');
	      var result = [];
	      for (var i = 0, len = lines.length; i < len; i += 2) {
	        var match = lineRE.exec(lines[i]);
	        if (match) {
	          result.push(new StackFrame({
	            functionName: match[3] || undefined,
	            fileName: match[2],
	            lineNumber: match[1],
	            source: lines[i]
	          }));
	        }
	      }
	      return result;
	    },
	    // Opera 10.65+ Error.stack very similar to FF/Safari
	    parseOpera11: function ErrorStackParser$$parseOpera11(error) {
	      var filtered = error.stack.split('\n').filter(function (line) {
	        return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
	      }, this);
	      return filtered.map(function (line) {
	        var tokens = line.split('@');
	        var locationParts = this.extractLocation(tokens.pop());
	        var functionCall = tokens.shift() || '';
	        var functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, '$2').replace(/\([^)]*\)/g, '') || undefined;
	        var argsRaw;
	        if (functionCall.match(/\(([^)]*)\)/)) {
	          argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, '$1');
	        }
	        var args = argsRaw === undefined || argsRaw === '[arguments not available]' ? undefined : argsRaw.split(',');
	        return new StackFrame({
	          functionName: functionName,
	          args: args,
	          fileName: locationParts[0],
	          lineNumber: locationParts[1],
	          columnNumber: locationParts[2],
	          source: line
	        });
	      }, this);
	    }
	  };
	});
	});

	var stringify_1 = createCommonjsModule(function (module, exports) {
	exports = module.exports = stringify;
	exports.getSerialize = serializer;
	function stringify(obj, replacer, spaces, cycleReplacer) {
	  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
	}
	function serializer(replacer, cycleReplacer) {
	  var stack = [],
	    keys = [];
	  if (cycleReplacer == null) cycleReplacer = function (key, value) {
	    if (stack[0] === value) return "[Circular ~]";
	    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
	  };
	  return function (key, value) {
	    if (stack.length > 0) {
	      var thisPos = stack.indexOf(this);
	      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
	      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
	      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value);
	    } else stack.push(value);
	    return replacer == null ? value : replacer.call(this, key, value);
	  };
	}
	});

	class BaseObserver {
	    constructor(options) {
	        this._cacheError = {};
	        this._options = options;
	    }
	    /**
	     * Emit same error not more than repeated times, to prevent dead cycle
	     */
	    safeEmitError(cacheKey, errorType, errorObj) {
	        if (typeof this._cacheError[cacheKey] !== "number") {
	            this._cacheError[cacheKey] = 0;
	        }
	        else {
	            this._cacheError[cacheKey] += 1;
	        }
	        const repeat = this._options.error.repeat;
	        if (this._cacheError[cacheKey] < repeat) {
	            myEmitter.emitWithGlobalData(errorType, errorObj);
	        }
	        else {
	            console.warn("The error has reached the preset number of repetitions", errorObj);
	        }
	    }
	    /**
	     * Check if request url match ignored rules
	     */
	    isUrlInIgnoreList(url) {
	        const ignoreList = this._options.http.ignoreRules;
	        const reportUrl = this._options.report.url;
	        // If reportUrl is setted, alse add to ignoreList
	        if (reportUrl) {
	            ignoreList.push(reportUrl);
	        }
	        return ignoreList.some((urlItem) => {
	            if (typeof urlItem === "string") {
	                return replaceSlash(urlItem) === replaceSlash(url);
	            }
	            else {
	                return urlItem.test(url);
	            }
	        });
	    }
	}

	class ErrorObserver extends BaseObserver {
	    constructor(options) {
	        super(options);
	        this._options = options;
	    }
	    init() {
	        const self = this;
	        const oldOnError = window.onerror;
	        const oldUnHandleRejection = window.onunhandledrejection;
	        window.onerror = function (...args) {
	            if (oldOnError) {
	                oldOnError(...args);
	            }
	            const [msg, url, line, column, error] = args;
	            const stackTrace = error ? errorStackParser.parse(error) : [];
	            const msgText = typeof msg === "string" ? msg : msg.type;
	            const errorObj = {
	                msg: msgText,
	                url,
	                line,
	                column,
	                stackTrace: stringify_1(stackTrace),
	                errorType: exports.ErrorType.jsError,
	                context: this
	            };
	            self.safeEmitError(msgText, exports.TrackerEvents.jsError, errorObj);
	        };
	        window.onunhandledrejection = function (e) {
	            if (oldUnHandleRejection) {
	                oldUnHandleRejection.call(window, e);
	            }
	            const error = e.reason;
	            const errMsg = error instanceof Error ? error.message : error;
	            const errorObj = {
	                msg: errMsg,
	                errorType: exports.ErrorType.unHandleRejectionError,
	                context: this
	            };
	            self.safeEmitError(errMsg, exports.TrackerEvents.unHandleRejection, errorObj);
	        };
	        window.addEventListener("error", function (event) {
	            const target = event.target || event.srcElement;
	            const isElementTarget = target instanceof HTMLScriptElement ||
	                target instanceof HTMLLinkElement ||
	                target instanceof HTMLImageElement;
	            if (!isElementTarget)
	                return false;
	            let url;
	            if (target instanceof HTMLLinkElement) {
	                url = target.href;
	            }
	            else {
	                url = target.src;
	            }
	            const errorType = exports.ErrorType.resourceError;
	            const errorObj = {
	                url,
	                errorType: errorType,
	                context: this
	            };
	            self.safeEmitError(`${errorType}: ${url}`, exports.TrackerEvents.resourceError, errorObj);
	            myEmitter.emitWithGlobalData(exports.TrackerEvents.resourceError, errorObj);
	        }, true);
	    }
	}

	class AjaxInterceptor extends BaseObserver {
	    constructor(options) {
	        super(options);
	        this._options = options;
	    }
	    init() {
	        if (!XMLHttpRequest)
	            return;
	        const self = this;
	        const { open } = XMLHttpRequest.prototype;
	        const { send } = XMLHttpRequest.prototype;
	        XMLHttpRequest.prototype.open = function (method, url, async) {
	            this._url = typeof url === "string" ? url : url.href;
	            this._method = method;
	            this._isUrlInIgnoreList = self.isUrlInIgnoreList(this._url);
	            const reqStartRes = {
	                context: this
	            };
	            if (!this._isUrlInIgnoreList) {
	                myEmitter.emitWithGlobalData(exports.TrackerEvents.reqStart, reqStartRes);
	            }
	            return open.call(this, method, this._url, typeof async === "boolean" ? async : true);
	        };
	        XMLHttpRequest.prototype.send = function (...rest) {
	            const body = rest[0];
	            const requestData = body;
	            const startTime = Date.now();
	            this.addEventListener("readystatechange", function () {
	                if (this._isUrlInIgnoreList) {
	                    return;
	                }
	                if (this.readyState === 4) {
	                    if (this.status >= 200 && this.status < 300) {
	                        const reqEndRes = {
	                            duration: Date.now() - startTime,
	                            requestUrl: this.responseURL,
	                            response: this.response,
	                            context: this,
	                            status: this.status
	                        };
	                        myEmitter.emitWithGlobalData(exports.TrackerEvents.reqEnd, reqEndRes);
	                    }
	                    else {
	                        const errorType = exports.ErrorType.httpRequestError;
	                        const reqErrorObj = {
	                            requestMethod: this._method,
	                            requestUrl: this._url,
	                            requestData,
	                            errorType: exports.ErrorType.httpRequestError,
	                            context: this,
	                            status: this.status
	                        };
	                        // If http error url match reportUrl, don't emit event
	                        if (this._url !== self._options.report.url) {
	                            self.safeEmitError(`${errorType}: ${this._url}`, exports.TrackerEvents.reqError, reqErrorObj);
	                        }
	                    }
	                }
	            });
	            return send.call(this, body);
	        };
	    }
	}

	class VueErrorObserver extends BaseObserver {
	    constructor(Vue, options) {
	        super(options);
	        this.init(Vue);
	    }
	    init(Vue) {
	        Vue.config.errorHandler = (err, vm, info) => {
	            const stackTrace = err ? errorStackParser.parse(err) : [];
	            const errorMsg = err.message;
	            const errorType = exports.ErrorType.vueJsError;
	            try {
	                if (vm) {
	                    const componentName = this.formatComponentName(vm);
	                    const componentNameTrace = this.getComponentNameTrace(vm);
	                    const propsData = vm.$options && vm.$options.propsData;
	                    const errorObj = {
	                        errorType: errorType,
	                        msg: errorMsg,
	                        stackTrace: stringify_1(stackTrace),
	                        componentName: componentName,
	                        propsData: propsData,
	                        info: info,
	                        componentNameTrace
	                    };
	                    this.safeEmitError(`${errorType}: ${errorMsg}`, exports.TrackerEvents.vuejsError, errorObj);
	                }
	                else {
	                    const errorObj = {
	                        errorType: errorType,
	                        msg: errorMsg,
	                        stackTrace: stringify_1(stackTrace)
	                    };
	                    this.safeEmitError(`${errorType}: ${errorMsg}`, exports.TrackerEvents.vuejsError, errorObj);
	                }
	            }
	            catch (error) {
	                throw new Error(typeof error === "string" ? error : "");
	            }
	        };
	    }
	    getComponentNameTrace(vm) {
	        const compTrace = [this.formatComponentName(vm)];
	        while (vm.$parent) {
	            vm = vm.$parent;
	            compTrace.unshift(this.formatComponentName(vm));
	        }
	        return compTrace;
	    }
	    formatComponentName(vm) {
	        try {
	            if (vm.$root === vm)
	                return "root";
	            const name = vm._isVue
	                ? (vm.$options && vm.$options.name) ||
	                    (vm.$options && vm.$options._componentTag)
	                : vm.name;
	            return ((name ? "component <" + name + ">" : "anonymous component") +
	                (vm._isVue && vm.$options && vm.$options.__file
	                    ? " at " + (vm.$options && vm.$options.__file)
	                    : ""));
	        }
	        catch (error) {
	            throw new Error(typeof error === "string" ? error : "");
	        }
	    }
	}

	class FetchInterceptor extends BaseObserver {
	    constructor(options) {
	        super(options);
	        this._options = options;
	    }
	    init() {
	        const self = this;
	        const originFetch = fetch;
	        Object.defineProperty(window, "fetch", {
	            configurable: true,
	            enumerable: true,
	            get() {
	                return (url, options = {}) => {
	                    this._url = url;
	                    this._method = options.method || "get";
	                    this._data = options.body;
	                    this._isUrlInIgnoreList = self.isUrlInIgnoreList(url);
	                    const startTime = Date.now();
	                    const reqStartRes = {
	                        url,
	                        options
	                    };
	                    if (!this._isUrlInIgnoreList) {
	                        myEmitter.emitWithGlobalData(exports.TrackerEvents.reqStart, reqStartRes);
	                    }
	                    return originFetch(url, options)
	                        .then((res) => {
	                        const status = res.status;
	                        const reqEndRes = {
	                            requestUrl: res.url,
	                            requestMethod: this._method,
	                            requestData: this._data,
	                            response: res,
	                            duration: Date.now() - startTime,
	                            context: this,
	                            status
	                        };
	                        const errorType = exports.ErrorType.httpRequestError;
	                        const reqErrorRes = {
	                            requestMethod: this._method,
	                            requestUrl: this._url,
	                            requestData: this._data,
	                            errorMsg: res.statusText,
	                            errorType
	                        };
	                        if (!this._isUrlInIgnoreList) {
	                            if (status >= 200 && status < 300) {
	                                myEmitter.emitWithGlobalData(exports.TrackerEvents.reqEnd, reqEndRes);
	                            }
	                            else {
	                                self.safeEmitError(`${errorType}: ${this._url}`, exports.TrackerEvents.reqError, reqErrorRes);
	                            }
	                        }
	                        return Promise.resolve(res);
	                    })
	                        .catch((e) => {
	                        const errorType = exports.ErrorType.httpRequestError;
	                        const reqErrorRes = {
	                            requestMethod: this._method,
	                            requestUrl: this._url,
	                            requestData: this._data,
	                            errorMsg: e.message,
	                            errorType
	                        };
	                        if (!this._isUrlInIgnoreList) {
	                            self.safeEmitError(`${errorType}: ${this._url}`, exports.TrackerEvents.reqError, reqErrorRes);
	                        }
	                    });
	                };
	            }
	        });
	    }
	}

	exports.NavigationType = void 0;
	(function (NavigationType) {
	    NavigationType[NavigationType["navigate"] = 0] = "navigate";
	    NavigationType[NavigationType["reload"] = 1] = "reload";
	    NavigationType[NavigationType["forward"] = 2] = "forward";
	    NavigationType[NavigationType["reserved"] = 255] = "reserved";
	})(exports.NavigationType || (exports.NavigationType = {}));
	class PerformanceObserver {
	    constructor() {
	        if (!window.performance || !window.performance.timing) {
	            console.warn("Your browser does not suppport performance api.");
	            return;
	        }
	        this.performance = window.performance;
	        this.timingInfo = this.performance.timing;
	    }
	    isDataExist(entry) {
	        return (entry && entry.loadEventEnd && entry.responseEnd && entry.domComplete);
	    }
	    /**
	     * 异步检测performance数据是否完备
	     */
	    check() {
	        const entry = this.performance.getEntriesByType("navigation")[0];
	        if (this.isDataExist(entry)) {
	            this.getPerformanceData();
	        }
	        else
	            setTimeout(this.check.bind(this), 0);
	    }
	    getPerformanceData() {
	        const { domainLookupEnd, domainLookupStart, connectEnd, connectStart, responseEnd, requestStart, domComplete, domInteractive, domContentLoadedEventEnd, loadEventEnd, navigationStart, responseStart, fetchStart } = this.timingInfo;
	        const dnsLkTime = domainLookupEnd - domainLookupStart;
	        const tcpConTime = connectEnd - connectStart;
	        const reqTime = responseEnd - requestStart;
	        const domParseTime = domComplete - domInteractive;
	        const domReadyTime = domContentLoadedEventEnd - fetchStart;
	        const loadTime = loadEventEnd - navigationStart;
	        const fpTime = responseStart - fetchStart;
	        const fcpTime = domComplete - fetchStart;
	        const navigationType = exports.NavigationType[this.performance.navigation.type];
	        const performanceInfo = {
	            dnsLkTime,
	            tcpConTime,
	            reqTime,
	            domParseTime,
	            domReadyTime,
	            loadTime,
	            fpTime,
	            fcpTime,
	            navigationType
	        };
	        myEmitter.customEmit(exports.TrackerEvents.performanceInfoReady, performanceInfo);
	    }
	    init() {
	        this.check();
	    }
	}

	class BehaviorObserver {
	    constructor(options) {
	        this._isConsoleTrack = true;
	        this._options = options;
	    }
	    init() {
	        this.hackConsole();
	        this.handleConsoleSwitch();
	        this.listenClickEvent();
	    }
	    handleConsoleSwitch() {
	        myEmitter.on(exports.TrackerEvents._onConsoleTrack, () => {
	            this._isConsoleTrack = true;
	        });
	        myEmitter.on(exports.TrackerEvents._offConsoleTrack, () => {
	            this._isConsoleTrack = false;
	        });
	    }
	    hackConsole() {
	        var _a;
	        const self = this;
	        if (!window || !window.console)
	            return;
	        const consoleTypes = (_a = this._options.behavior) === null || _a === void 0 ? void 0 : _a.console;
	        consoleTypes === null || consoleTypes === void 0 ? void 0 : consoleTypes.forEach((type) => {
	            const action = window.console[type];
	            window.console[type] = function (...rest) {
	                const msg = Array.from(rest);
	                const consoleBehavior = {
	                    type: "console",
	                    level: type,
	                    msg: stringify_1(msg),
	                };
	                // Prevent catch console behavior inside eventEmitter event handlers
	                if (self._isConsoleTrack) {
	                    myEmitter.emit(exports.TrackerEvents._console, consoleBehavior);
	                }
	                return typeof action === "function" && action.call(null, ...rest);
	            };
	        });
	    }
	    _globalClickHandler(e) {
	        const target = e.target;
	        if (target instanceof HTMLElement) {
	            // const eleClass = target.className;
	            const classPath = this.getElePath(target);
	            // const xpath = this.getXPathFromElement(target);
	            const clickBehavior = {
	                type: "click",
	                // eleClass,
	                classPath,
	                text: target.innerText.substring(0, 50),
	                // xpath,
	                screenX: e.screenX,
	                screenY: e.screenY,
	            };
	            myEmitter.emit(exports.TrackerEvents._clickEle, clickBehavior);
	        }
	    }
	    normalTarget(node) {
	        let t, n, r, a, i;
	        const o = [];
	        if (!node || !node.tagName)
	            return "";
	        if ((o.push(node.tagName.toLowerCase()),
	            node.id && o.push("#".concat(node.id)),
	            (t = node.className) &&
	                "[object String]" === Object.prototype.toString.call(t))) {
	            for (n = t.split(/\s+/), i = 0; i < n.length; i++) {
	                // If className include active string, don't add to path
	                if (n[i].indexOf("active") < 0)
	                    o.push(".".concat(n[i]));
	            }
	        }
	        const s = ["type", "name", "title", "alt"];
	        for (i = 0; i < s.length; i++)
	            (r = s[i]),
	                (a = node.getAttribute(r)) &&
	                    o.push("[".concat(r, '="').concat(a, '"]'));
	        return o.join("");
	    }
	    /**
	     * Get element path for maxDeepLen at most
	     */
	    getElePath(node, maxDeepLen = 5) {
	        if (!node || 1 !== node.nodeType)
	            return "";
	        const ret = [];
	        let deepLength = 0, elm = "";
	        // ret.push(`(${node.innerText.substr(0, 50)})`);
	        for (let t = node || null; t &&
	            deepLength++ < maxDeepLen &&
	            !("html" === (elm = this.normalTarget(t)));) {
	            ret.push(elm), (t = t.parentNode);
	        }
	        return ret.reverse().join(" > ");
	    }
	    getXPathFromElement(elm) {
	        const allNodes = document.getElementsByTagName("*");
	        const segs = [];
	        for (; elm && elm.nodeType == 1; elm = elm.parentNode) {
	            if (elm.hasAttribute("id")) {
	                let uniqueIdCount = 0;
	                for (let n = 0; n < allNodes.length; n++) {
	                    if (allNodes[n].hasAttribute("id") && allNodes[n].id == elm.id)
	                        uniqueIdCount++;
	                    if (uniqueIdCount > 1)
	                        break;
	                }
	                if (uniqueIdCount == 1) {
	                    segs.unshift('id("' + elm.getAttribute("id") + '")');
	                    return segs.join("/");
	                }
	                else {
	                    segs.unshift(elm.localName.toLowerCase() +
	                        '[@id="' +
	                        elm.getAttribute("id") +
	                        '"]');
	                }
	            }
	            else if (elm.hasAttribute("class")) {
	                segs.unshift(elm.localName.toLowerCase() +
	                    '[@class="' +
	                    elm.getAttribute("class") +
	                    '"]');
	            }
	            else {
	                let i, sib;
	                for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
	                    if (sib.localName == elm.localName)
	                        i++;
	                }
	                segs.unshift(elm.localName.toLowerCase() + "[" + i + "]");
	            }
	        }
	        return segs.length ? "/" + segs.join("/") : "";
	    }
	    listenClickEvent() {
	        if (window.removeEventListener) {
	            window.removeEventListener("click", this._globalClickHandler.bind(this), false);
	        }
	        window.addEventListener("click", this._globalClickHandler.bind(this), false);
	    }
	}

	function isUndefined(value) {
	  return value === undefined;
	}
	function isNull(value) {
	  return value === null;
	}
	function isBoolean(value) {
	  return typeof value === 'boolean';
	}
	function isObject(value) {
	  return value === Object(value);
	}
	function isArray(value) {
	  return Array.isArray(value);
	}
	function isDate(value) {
	  return value instanceof Date;
	}
	function isBlob(value, isReactNative) {
	  return isReactNative ? isObject(value) && !isUndefined(value.uri) : isObject(value) && typeof value.size === 'number' && typeof value.type === 'string' && typeof value.slice === 'function';
	}
	function isFile(value, isReactNative) {
	  return isBlob(value, isReactNative) && typeof value.name === 'string' && (isObject(value.lastModifiedDate) || typeof value.lastModified === 'number');
	}
	function initCfg(value) {
	  return isUndefined(value) ? false : value;
	}
	function serialize(obj, cfg, fd, pre) {
	  cfg = cfg || {};
	  fd = fd || new FormData();
	  cfg.indices = initCfg(cfg.indices);
	  cfg.nullsAsUndefineds = initCfg(cfg.nullsAsUndefineds);
	  cfg.booleansAsIntegers = initCfg(cfg.booleansAsIntegers);
	  cfg.allowEmptyArrays = initCfg(cfg.allowEmptyArrays);
	  cfg.noFilesWithArrayNotation = initCfg(cfg.noFilesWithArrayNotation);
	  cfg.dotsForObjectNotation = initCfg(cfg.dotsForObjectNotation);
	  const isReactNative = typeof fd.getParts === 'function';
	  if (isUndefined(obj)) {
	    return fd;
	  } else if (isNull(obj)) {
	    if (!cfg.nullsAsUndefineds) {
	      fd.append(pre, '');
	    }
	  } else if (isBoolean(obj)) {
	    if (cfg.booleansAsIntegers) {
	      fd.append(pre, obj ? 1 : 0);
	    } else {
	      fd.append(pre, obj);
	    }
	  } else if (isArray(obj)) {
	    if (obj.length) {
	      obj.forEach((value, index) => {
	        let key = pre + '[' + (cfg.indices ? index : '') + ']';
	        if (cfg.noFilesWithArrayNotation && isFile(value, isReactNative)) {
	          key = pre;
	        }
	        serialize(value, cfg, fd, key);
	      });
	    } else if (cfg.allowEmptyArrays) {
	      fd.append(pre + '[]', '');
	    }
	  } else if (isDate(obj)) {
	    fd.append(pre, obj.toISOString());
	  } else if (isObject(obj) && !isBlob(obj, isReactNative)) {
	    Object.keys(obj).forEach(prop => {
	      const value = obj[prop];
	      if (isArray(value)) {
	        while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
	          prop = prop.substring(0, prop.length - 2);
	        }
	      }
	      const key = pre ? cfg.dotsForObjectNotation ? pre + '.' + prop : pre + '[' + prop + ']' : prop;
	      serialize(value, cfg, fd, key);
	    });
	  } else {
	    fd.append(pre, obj);
	  }
	  return fd;
	}
	var src = {
	  serialize
	};

	class Reporter {
	    constructor(options) {
	        this._options = options;
	    }
	    _isMatchMethod(input, method = "get") {
	        return input.toLowerCase() === method;
	    }
	    getPureReportData(error) {
	        Reflect.deleteProperty(error, "context");
	        Object.keys(error).forEach((key) => {
	            const val = error[key];
	            if (isObject$1(val)) {
	                error[key] = stringify_1(val);
	            }
	        });
	        return error;
	    }
	    doReport(reportData) {
	        const { method, contentType } = this._options.report;
	        let { url } = this._options.report;
	        const isHttpGet = this._isMatchMethod(method, "get");
	        if (isHttpGet) {
	            url += `?${reportData}`;
	        }
	        const xhr = new XMLHttpRequest();
	        xhr.open(method, url, true);
	        xhr.setRequestHeader("Content-type", contentType);
	        xhr.send(reportData);
	    }
	    reportError(error) {
	        const { contentType, method, beforeSend } = this._options.report;
	        if (typeof beforeSend === "function") {
	            const handledError = beforeSend.call(this, error, error.errorType);
	            if (isObject$1(handledError)) {
	                error = handledError;
	            }
	            else {
	                console.warn(`If you want to overite report data, please return object in [beforeSend] hook`);
	            }
	        }
	        const pureData = this.getPureReportData(error);
	        const isHttpGet = this._isMatchMethod(method, "get");
	        let reportData;
	        if (isHttpGet || contentType === "application/x-www-form-urlencoded") {
	            reportData = convertObjToUrlencoded(pureData);
	        }
	        else if (contentType === "application/form-data") {
	            reportData = src.serialize(pureData);
	        }
	        else {
	            reportData = stringify_1(pureData);
	        }
	        this.doReport(reportData);
	    }
	    reportErrors(errorList) {
	        if (!errorList.length)
	            return;
	        for (const error of errorList) {
	            setTimeout(() => {
	                this.reportError(error);
	            }, 0);
	        }
	    }
	}

	var name = "femonitor-web";
	var version = "1.4.3";
	var description = "A web SDK for frontend error and performance monnitor";
	var author = {
		name: "alex1504"
	};
	var repository = {
		type: "git",
		url: "https://github.com/alex1504/femonitor-web"
	};
	var license = "MIT";
	var main = "dist/index.umd.js";
	var types = "dist/src/index.d.ts";
	var files = [
		"dist",
		"src"
	];
	var keywords = [
		"error",
		"performance",
		"monitor",
		"sdk"
	];
	var scripts = {
		clean: "shx rm -rf dist coverage .rpt2_cache",
		watch: "cross-env NODE_ENV=development EXTERNAL=1 rollup -c --watch -f umd -o dist/index.umd.js",
		build: "npm run lint && npm run clean && npm run build:esm && npm run build:umd && npm run build:min",
		"build:esm": "cross-env NODE_ENV=production EXTERNAL=1 rollup -c -f esm -o dist/index.js",
		"build:umd": "cross-env NODE_ENV=production rollup -c -f umd -o dist/index.umd.js",
		"build:min": "cross-env NODE_ENV=production MINIFY=1 rollup -c -f umd -o dist/index.min.js",
		server: "npm run server:dev",
		"server:dev": "nodemon --watch server --exec \"npx ts-node --project tsconfig.server.json ./server/app.ts\"",
		"server:compile": "tsc --project tsconfig.server.json",
		"server:start": "npm run server:compile && node server/app.js",
		lint: "eslint \"src/**/*\" \"test/**/*\"",
		"lint:fix": "eslint --fix \"src/**/*\" \"test/**/*\"",
		test: "cross-env NODE_ENV=test jest"
	};
	var dependencies = {
		deepcopy: "^2.1.0",
		deepmerge: "^4.2.2",
		"error-stack-parser": "^2.0.6",
		events: "^3.3.0",
		"json-stringify-safe": "^5.0.1",
		"object-to-formdata": "^4.4.1",
		"query-string": "^7.0.0",
		rrweb: "^0.9.14",
		tslib: "^2.3.1",
		"ua-parser-js": "^1.0.32",
		vue: "^2.6.12"
	};
	var devDependencies = {
		"@babel/core": "^7.11.6",
		"@babel/eslint-parser": "^7.11.5",
		"@babel/preset-env": "^7.11.5",
		"@babel/preset-typescript": "^7.10.4",
		"@commitlint/cli": "^9.1.2",
		"@commitlint/config-conventional": "^9.1.2",
		"@koa/cors": "^3.1.0",
		"@rollup/plugin-babel": "^5.2.0",
		"@rollup/plugin-commonjs": "^15.0.0",
		"@rollup/plugin-json": "^4.1.0",
		"@rollup/plugin-node-resolve": "^9.0.0",
		"@rollup/plugin-replace": "^2.3.3",
		"@types/assert": "^1.5.1",
		"@types/jest": "^26.0.13",
		"@types/json-stringify-safe": "^5.0.0",
		"@types/koa": "^2.13.1",
		"@types/koa-router": "^7.4.2",
		"@types/koa-static": "^4.0.1",
		"@types/koa__cors": "^3.0.2",
		"@types/ua-parser-js": "^0.7.36",
		"@types/wechat-miniprogram": "^3.1.0",
		"@typescript-eslint/eslint-plugin": "^4.1.0",
		"@typescript-eslint/parser": "^4.1.0",
		"babel-eslint": "^10.1.0",
		"cross-env": "^7.0.2",
		eslint: "^7.8.1",
		"eslint-config-airbnb": "^18.2.0",
		"eslint-plugin-import": "^2.22.0",
		"eslint-plugin-jsx-a11y": "^6.3.1",
		"eslint-plugin-react": "^7.20.6",
		"fs-extra": "^9.0.1",
		husky: "^4.2.5",
		"istanbul-instrumenter-loader": "^3.0.1",
		jest: "^26.4.2",
		"jest-fetch-mock": "^3.0.3",
		koa: "^2.13.1",
		"koa-router": "^10.0.0",
		"koa-static": "^5.0.0",
		"koa-views": "^7.0.1",
		nodemon: "^2.0.7",
		"power-assert": "^1.6.1",
		rollup: "^2.26.5",
		"rollup-plugin-terser": "^7.0.0",
		"rollup-plugin-typescript2": "^0.27.2",
		shx: "^0.3.2",
		"ts-jest": "^26.3.0",
		"ts-loader": "^8.0.3",
		"ts-node": "^10.8.1",
		typescript: "^4.0.2",
		webpack: "^4.44.1",
		"webpack-espower-loader": "^2.0.0"
	};
	var commitlint = {
		"extends": [
			"@commitlint/config-conventional"
		],
		rules: {
			"subject-case": [
				0
			]
		}
	};
	var packageJson = {
		name: name,
		version: version,
		description: description,
		author: author,
		repository: repository,
		license: license,
		main: main,
		types: types,
		files: files,
		keywords: keywords,
		scripts: scripts,
		dependencies: dependencies,
		devDependencies: devDependencies,
		commitlint: commitlint
	};

	class SpaHandler {
	    static init() {
	        if (SpaHandler.instance) {
	            return SpaHandler.instance;
	        }
	        return new SpaHandler();
	    }
	    constructor() {
	        this.hackState("pushState");
	        this.hackState("replaceState");
	        window.addEventListener("hashchange", (...rest) => {
	            myEmitter.emit("_spaHashChange", ...rest);
	        });
	        window.addEventListener("historystatechanged", (...rest) => {
	            myEmitter.emit("_spaHashChange", ...rest);
	        });
	    }
	    hackState(fnName) {
	        const func = window.history[fnName];
	        if (typeof func === "function") {
	            window.history[fnName] = function (...rest) {
	                myEmitter.emit("_spaHashChange", ...rest);
	                return func.apply(this, rest);
	            };
	        }
	    }
	}

	exports.Env = void 0;
	(function (Env) {
	    Env["Dev"] = "dev";
	    Env["Sandbox"] = "sandbox";
	    Env["Production"] = "production";
	})(exports.Env || (exports.Env = {}));
	exports.ConsoleType = void 0;
	(function (ConsoleType) {
	    ConsoleType["log"] = "log";
	    ConsoleType["error"] = "error";
	    ConsoleType["warn"] = "warn";
	    ConsoleType["info"] = "info";
	    ConsoleType["debug"] = "debug";
	})(exports.ConsoleType || (exports.ConsoleType = {}));
	const defaultTrackerOptions = {
	    env: exports.Env.Dev,
	    report: {
	        url: "",
	        method: "POST",
	        contentType: "application/json",
	        beforeSend: (data) => data,
	    },
	    data: {},
	    error: {
	        watch: true,
	        random: 1,
	        repeat: 5,
	        delay: 1000,
	    },
	    performance: false,
	    http: {
	        fetch: true,
	        ajax: true,
	        ignoreRules: [],
	    },
	    behavior: {
	        watch: false,
	        console: [exports.ConsoleType.error],
	        click: true,
	        queueLimit: 20,
	    },
	    /**
	     * rrweb use mutation observer api, for compatibility see:
	     * https://caniuse.com/mutationobserver
	     */
	    rrweb: {
	        watch: false,
	        queueLimit: 50,
	        delay: 1000,
	    },
	    isSpa: true,
	};
	class Monitor {
	    constructor(options) {
	        this.errorQueue = [];
	        this.behaviorQueue = [];
	        this.rrwebQueue = [];
	        this.defaultOptions = defaultTrackerOptions;
	        this.$data = {};
	        this.$options = this.defaultOptions;
	        this.initOptions(options);
	        this.getDeviceInfo();
	        // this.getNetworkType(); 其实想要拿的是否是wifi，但其实无法拿到
	        // this.getLocaleLanguage();
	        // this.getUserAgent();
	        this.initGlobalData();
	        this.initInstances();
	        this.initEventListeners();
	    }
	    /**
	     * 初始化tracker实例，单例
	     * @param options ITrackerOptions
	     */
	    static init(options = {}) {
	        if (!this.instance) {
	            this.instance = new Monitor(options);
	        }
	        return this.instance;
	    }
	    /**
	     * 获取设备信息
	     */
	    getDeviceInfo() {
	        const deviceInfo = getDeviceInfo();
	        this.configData({
	            _deviceInfo: deviceInfo,
	        });
	    }
	    getNetworkType() {
	        const networkType = getNetworkType();
	        this.configData({
	            _networkType: networkType,
	        });
	    }
	    getLocaleLanguage() {
	        const localeLanguage = getLocaleLanguage();
	        this.configData({
	            _locale: localeLanguage,
	        });
	    }
	    getUserAgent() {
	        this.configData({
	            _userAgent: navigator.userAgent,
	        });
	    }
	    /**
	     * 初始化配置项
	     */
	    initOptions(options) {
	        if (!options)
	            options = {};
	        this.$options = cjs(this.$options, options);
	    }
	    initGlobalData() {
	        this.configData(Object.assign({ _sdkVersion: packageJson.version, _env: this.$options.env }, this.$options.data));
	    }
	    /**
	     * Inject instances and init
	     */
	    initInstances() {
	        this.reporter = new Reporter(this.$options);
	        if (this.$options.error.watch) {
	            this.errObserver = new ErrorObserver(this.$options);
	            this.errObserver.init();
	        }
	        if (this.$options.performance) {
	            // this.listenPerformanceInfo();
	            this.performanceObserver = new PerformanceObserver();
	            this.performanceObserver.init();
	        }
	        if (this.$options.http.fetch) {
	            this.fetchInterceptor = new FetchInterceptor(this.$options);
	            this.fetchInterceptor.init();
	        }
	        if (this.$options.http.ajax) {
	            this.ajaxInterceptor = new AjaxInterceptor(this.$options);
	            this.ajaxInterceptor.init();
	        }
	        if (this.$options.behavior.watch) {
	            this.listenBehaviors();
	            this.behaviorObserver = new BehaviorObserver(this.$options);
	            this.behaviorObserver.init();
	        }
	        // 自用不开启，就先注释了
	        if (this.$options.rrweb.watch) ;
	        if (this.$options.isSpa) {
	            this.spaHandler = SpaHandler.init();
	            myEmitter.on("_spaHashChange", (...rest) => {
	                const [, , url] = rest;
	                this.configData({
	                    _spaUrl: url,
	                });
	            });
	        }
	    }
	    listenMouseTrack() {
	        myEmitter.on(exports.TrackerEvents._mouseTrack, (event) => {
	            if (this.rrwebQueue.length >= this.$options.rrweb.queueLimit) {
	                this.rrwebQueue.shift();
	            }
	            this.rrwebQueue.push(event);
	            setTimeout(() => {
	                myEmitter.emitWithGlobalData(exports.TrackerEvents.mouseTrack, this.rrwebQueue);
	            }, this.$options.rrweb.delay);
	        });
	    }
	    listenBehaviors() {
	        myEmitter.on(exports.TrackerEvents._console, (behavior) => {
	            this.pushBehavior(behavior);
	            this.configData("_behavior", this.behaviorQueue, false);
	        });
	        myEmitter.on(exports.TrackerEvents._clickEle, (behavior) => {
	            this.pushBehavior(behavior);
	            this.configData("_behavior", this.behaviorQueue, false);
	        });
	    }
	    listenPerformanceInfo() {
	        myEmitter.on(exports.TrackerEvents.performanceInfoReady, (performanceInfo) => {
	            this.configData("_performance", performanceInfo, false);
	        });
	    }
	    pushBehavior(behavior) {
	        if (this.behaviorQueue.length >= this.$options.behavior.queueLimit) {
	            this.behaviorQueue.shift();
	        }
	        this.behaviorQueue.push(behavior);
	    }
	    configData(key, value, deepmerge = true) {
	        if (typeof key === "string") {
	            if (isObject$1(value) && deepmerge) {
	                this.$data = cjs(this.$data, value);
	            }
	            else {
	                this.$data[key] = value;
	            }
	        }
	        else if (isObject$1(key)) {
	            if (typeof value === "boolean") {
	                deepmerge = value;
	            }
	            value = key;
	            if (deepmerge) {
	                this.$data = cjs(this.$data, value);
	            }
	            else {
	                this.$data = Object.assign(Object.assign({}, this.$data), value);
	            }
	        }
	        myEmitter.emit(exports.TrackerEvents._globalDataChange, this.$data);
	        return this;
	    }
	    changeOptions(key, value) {
	        this.$options = cjs(this.$options, {
	            [key]: value,
	        });
	    }
	    handleErrorReport() {
	        var _a;
	        if (this.errorQueueTimer)
	            return;
	        this.errorQueueTimer = window.setTimeout(() => {
	            if (this.$options.report.url) {
	                this.reporter.reportErrors(this.errorQueue);
	            }
	            myEmitter.emitWithGlobalData(exports.TrackerEvents.batchErrors, {
	                errorList: this.errorQueue,
	            });
	            this.errorQueueTimer = null;
	            this.errorQueue = [];
	        }, (_a = this.$options.error) === null || _a === void 0 ? void 0 : _a.delay);
	    }
	    initEventListeners() {
	        const errorEvents = [
	            exports.TrackerEvents.jsError,
	            exports.TrackerEvents.vuejsError,
	            exports.TrackerEvents.unHandleRejection,
	            exports.TrackerEvents.resourceError,
	            exports.TrackerEvents.reqError,
	        ];
	        errorEvents.forEach((eventName) => {
	            this.on(eventName, (error) => {
	                var _a;
	                // Extract sample from all errors
	                const random = this.$options.error
	                    ? (_a = this.$options.error) === null || _a === void 0 ? void 0 : _a.random
	                    : this.defaultOptions.error.random;
	                const isRandomIgnore = Math.random() >= random;
	                if (isRandomIgnore)
	                    return;
	                this.errorQueue.push(error);
	                this.handleErrorReport();
	            });
	        });
	    }
	    _on(eventName, listener, withEventName = false) {
	        myEmitter.on(eventName, (...args) => __awaiter(this, void 0, void 0, function* () {
	            if (withEventName) {
	                args.unshift(eventName);
	            }
	            myEmitter.emit(exports.TrackerEvents._offConsoleTrack);
	            yield listener(...args);
	            myEmitter.emit(exports.TrackerEvents._onConsoleTrack);
	        }));
	        return this;
	    }
	    on(event, listener) {
	        if (event instanceof Array) {
	            event.forEach((eventName) => {
	                this._on(eventName, listener, true);
	            });
	            return this;
	        }
	        return this._on(event, listener);
	    }
	    once(event, listener) {
	        myEmitter.once(event, listener);
	        return this;
	    }
	    off(event, listener) {
	        myEmitter.off(event, listener);
	        return this;
	    }
	    removeAllListeners(event) {
	        myEmitter.removeAllListeners(event);
	        return this;
	    }
	    emit(event, ...args) {
	        return myEmitter.emitWithGlobalData(event, ...args);
	    }
	    useVueErrorListener(Vue) {
	        new VueErrorObserver(Vue, this.$options);
	    }
	}

	exports.AjaxInterceptor = AjaxInterceptor;
	exports.DeviceUtil = device;
	exports.ErrorObserver = ErrorObserver;
	exports.FetchInterceptor = FetchInterceptor;
	exports.Monitor = Monitor;
	exports.PerformanceObserver = PerformanceObserver;
	exports.Reporter = Reporter;
	exports.defaultTrackerOptions = defaultTrackerOptions;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
