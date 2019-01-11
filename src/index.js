import  bhlUtil  from './bhl'
import { Tween } from './tween'
//设备环境
export const inBrowser = typeof window !== 'undefined';
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
export const UA = UA && inBrowser && window.navigator.userAgent.toLowerCase();
export const isMobile = UA && !!UA.match(/AppleWebKit.*Mobile.*/);
export const hasTouch = UA && !!UA.match(/AppleWebKit.*Mobile.*/);
export const isIE = UA && /msie|trident/.test(UA);
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
export const isEdge = UA && UA.indexOf('edge/') > 0;
export const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
export const isIPhone = UA && UA.indexOf('iPhone') > -1; //是否为iPhone或者QQHD浏览器
export const isPad = UA && UA.indexOf('iPad') > -1; //是否iPad
export const isWebApp = UA && UA.indexOf('Safari') == -1; //是否web应该程序，没有头部与底部
export const mousedown = hasTouch ? "touchstart" : "mousedown";
export const mousemove = hasTouch ? "touchmove" : "mousemove";
export const mouseup = hasTouch ? "touchend" : "mouseup";

//====方法=====
export const hasOwnProperty = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
//判断数据类型
export const toStringType = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};
//判断是否为类数组
export const isArrayLike = (o) => {
  return o && typeof o === 'object' && isFinite(o.length) && o.length >= 0 && o.length === Math.floor(o.length) && o.length < 4294967296;
};
//是否为数组
export const isArray = (value) => {
  return toStringType(value) === "array";
};
//数组和对象循环
export const each = (obj, callback) => {
  if (!obj) return;
  if (isArrayLike(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      if (callback(obj[i], i, obj) === false) {
        break;
      }
    }
  } else {
    let keyArr = Object.keys(obj);
    for (let i = 0, l = keyArr.length; i < l; i++) {
      if (callback(obj[keyArr[i]], keyArr[i], obj) === false) {
        break;
      }
    }
  }
}
//汉字编码
export const encode = (str) => {
  return encodeURIComponent(str);
};
//汉字解码
export const decode = (str) => {
  return decodeURIComponent(str);
};
//querystring
export const querystring = (function () {
  var stringifyPrimitive = function (v) {
    switch (typeof v) {
      case 'string':
        return v;
      case 'boolean':
        return v ? 'true' : 'false';
      case 'number':
        return isFinite(v) ? v : '';
      default:
        return '';
    }
  };
  return {
    stringify: function (obj, sep, eq, name) {
      sep = sep || '&';
      eq = eq || '=';
      if (obj === null) {
        obj = undefined;
      }
      if (typeof obj === 'object') {
        return Object.keys(obj).map(function (k) {
          var ks = encode(stringifyPrimitive(k)) + eq;
          if (toStringType(obj[k]) === "array") {
            return obj[k].map(function (v) {
              return ks + encode(stringifyPrimitive(v));
            }).join(sep);
          } else {
            return ks + encode(stringifyPrimitive(obj[k]));
          }
        }).join(sep);
      }
      if (!name) return '';
      return encode(stringifyPrimitive(name)) + eq + encode(stringifyPrimitive(obj));
    },
    parse: function (qs, sep, eq, options) {
      sep = sep || '&';
      eq = eq || '=';
      var obj = {};
      if (typeof qs !== 'string' || qs.length === 0) {
        return obj;
      }
      var regexp = /\+/g;
      qs = qs.split(sep);

      var maxKeys = 1000;
      if (options && typeof options.maxKeys === 'number') {
        maxKeys = options.maxKeys;
      }

      var len = qs.length;
      // maxKeys <= 0 means that we should not limit keys count
      if (maxKeys > 0 && len > maxKeys) {
        len = maxKeys;
      }

      for (var i = 0; i < len; ++i) {
        var x = qs[i].replace(regexp, '%20'),
          idx = x.indexOf(eq),
          kstr, vstr, k, v;

        if (idx >= 0) {
          kstr = x.substr(0, idx);
          vstr = x.substr(idx + 1);
        } else {
          kstr = x;
          vstr = '';
        }

        k = decode(kstr);
        v = decode(vstr);
        if (!hasOwnProperty(obj, k)) {
          obj[k] = v;
        } else if (toStringType(obj[k]) === "array") {
          obj[k].push(v);
        } else {
          obj[k] = [obj[k], v];
        }
      }
      return obj;
    }
  }
})();
//函数去抖
export const debounce = (fn, wait, params) => {
  var lastArgs,
    lastThis,
    maxWait,
    result,
    timerId,
    lastCallTime,
    lastInvokeTime = 0,
    leading = false,
    maxing = false,
    trailing = true;
  if (!toStringType(fn) === "function") {
    throw new TypeError('Expected a function');
  }
  wait = Number(wait);
  wait = isNaN(wait) ? 300 : wait;
  if (toStringType(params) === "object") {
    leading = !!params.leading;
    maxing = 'maxWait' in params;
    maxWait = maxing ? Math.max(Number(params.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in params ? !!params.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
      thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = fn.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime,
      timeWaiting = wait - timeSinceLastCall;
    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime;
    //Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) || (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = new Date();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;
    // Only invoke if we have `lastArgs` which means `fn` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(new Date());
  }

  function debounced() {
    var time = new Date(),
      isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
};
//函数节流
export const throttle = function (fn, wait, params) {
  var leading = true,
    trailing = true,
    wait = wait !== undefined ? wait : 300;
  if (!toStringType(fn) === "function") {
    throw new TypeError('Expected a function');
  }
  if (toStringType(params) === "object") {
    leading = 'leading' in params ? !!params.leading : leading;
    trailing = 'trailing' in params ? !!params.trailing : trailing;
  }
  return debounce(fn, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
};
//判断是否支持该css3属性
export const supportCss3 = styleKey => {
  var toHumb = function (str) {
    return str.replace(/-(\w)/g, function ($0, $1) {
      return $1.toUpperCase();
    })
  },
    preArr = ['webkit', 'Moz', 'ms', 'o'],
    preStyleArr = [toHumb(styleKey)],
    htmlStyle = document.documentElement.style,
    state = false;
  each(preArr, pre => {
    preStyleArr.push(toHumb(pre + '-' + styleKey))
  })
  each(preStyleArr, preStyle => {
    if (preStyle in htmlStyle) {
      state = true;
      return false;
    }
  })
  return state;
};
//是否支持transition
export const allowTransition = inBrowser && supportCss3("transition");
//是否支持animation
export const allowAnimation = inBrowser && supportCss3("animation");
//获取window和css媒体查询同步宽高
export const getWindowWidth = () => {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
};
export const getWindowHeight = () => {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
};
//获取对应类型的参数
export const getTypeArg = (arg, type, defaultArg) => {
  each(arg, item => {
    if (type.indexOf(toStringType(item)) > -1) {
      defaultArg = item;
      return false;
    }
  })
  return defaultArg;
};
//最佳动画执行时机
export const nextFrame = (function () {
  let raf = (inBrowser&&window.requestAnimationFrame) ? window.requestAnimationFrame.bind(window) : setTimeout;
  return fn => raf(() => {
    raf(fn)
  })
}());
//去首尾空格
export const trim = str => str == null ? "" : (str + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
//把手机号4位数字换为*
export const privatePhone = phone => ('' + phone).replace(/^(\d{3})\d{4}(\d{4})$/g, "$1****$2");
//repeat
export const repeat = (str, num) => {
  num = parseInt(num) || 0;
  return num ? new Array(num + 2).join(String(str)) : "";
};
//padStart
export const padStart = (str, num, padStr) => {
  return new Array(num - String(str).length + 1).join(String(padStr)) + str;
};
//padEnd
export const padEnd = (str, num, padStr) => {
  return String(str) + new Array(num - String(str).length + 1).join(String(padStr));
};
//对象属性为变量[[valueKey, k],[textKey, item]]
export const arrayToObj = arr => {
  let obj = {};
  each(arr, function (item) {
    obj[item[0]] = item[1];
  });
  return obj;
};
//把不规则的数据格式转换为统一的数组格式
export const toArrayData = (valueKey, textKey, data, startData) => {
  let arrData = startData !== undefined ? [startData] : [];
  if (toStringType(data) === "object") {
    each(data, (item, k) => {
      arrData.push(arrayToObj([
        [valueKey, String(k)],
        [textKey, item]
      ]));
    });
  } else if (toStringType(data) === "array") {
    each(data, item => {
      if (toStringType(item) === "object") {
        arrData.push(JSON.parse(JSON.stringify(item)));
      } else {
        arrData.push(arrayToObj([
          [valueKey, String(item)],
          [textKey, item]
        ]));
      }
    });
  }
  return arrData;
};
//日期时间过滤器
export const formatDate = (obj = "", fmt = "YYYY-MM-DD HH:mm") => {
  if (!obj) return "";
  let type = toStringType(obj);
  if (type !== "date") {
    if (type === "number") {
      obj = new Date(parseInt(obj))
    } else {
      obj = new Date(String(obj))
    }
  }
  let o = {
    "M+": obj.getMonth() + 1, //月份
    "D+": obj.getDate(), //日
    "h+": obj.getHours() % 12 == 0 ? 12 : obj.getHours() % 12, //小时
    "H+": obj.getHours(), //小时
    "m+": obj.getMinutes(), //分
    "s+": obj.getSeconds(), //秒
    "q+": Math.floor((obj.getMonth() + 3) / 3), //季度
    "S+": obj.getMilliseconds() //毫秒
  },
    week = {
      "0": "/u65e5",
      "1": "/u4e00",
      "2": "/u4e8c",
      "3": "/u4e09",
      "4": "/u56db",
      "5": "/u4e94",
      "6": "/u516d"
    };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[obj.getDay() + ""]);
  }
  Object.keys(o).forEach(k => {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("0".repeat(RegExp.$1.length) + o[k]).substr(("" + o[k]).length)));
    }
  })
  return fmt;
};
//时间段
export const formatDateRange = (startDateTime, endDateTime, startformat = "YYYY-MM-DD HH:mm", endformat = "HH:mm") => {
  return (startDateTime && endDateTime) ? formatDate(startDateTime, startformat) + " ~ " + formatDate(endDateTime, endformat) : "";
}
//字符串转数组
export const stringToArray = (str = "", patter = /,|，/g) => {
  return ("" + str).trim().split(patter).filter(item => {
    return item !== "";
  });
}
//获取随机数
export const getRandom = num => {
  let str = "";
  for (let i = 0; i < num; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}
//cookie
export const cookie = {
  params: {
    path: '',
    domain: '',
    secure: ''
  },
  set(name, value, days, params) {
    if (value !== undefined) {
      var params = assign({}, cookie.params, params),
        expires;
      if (toStringType(days) === 'number') {
        expires = new Date();
        expires.setTime(+expires + days * 864e+5);
      }
      return (document.cookie = [
        encode(name), '=', encode(value),
        expires ? '; expires=' + expires.toUTCString() : '',
        params.path ? '; path=' + params.path : '',
        params.domain ? '; domain=' + (toStringType(params.domain) === "function" ? params.domain(name) : params.domain) : '',
        params.secure ? '; secure' : ''
      ].join(''));
    }
  },
  get(name) {
    var result = undefined;
    each(document.cookie ? document.cookie.split('; ') : [], function (item) {
      var parts = item.split('='),
        keyName = parts.shift();
      if (keyName && keyName === encode(name)) {
        result = decode(parts.join('='));
        return false;
      }
    })
    return result;
  },
  remove(name, params) {
    cookie.set(name, '', -1, assign({}, params));
  },
  removeAll(params) {
    each(document.cookie.match(/[^ =;]+(?=\=)/g), function (name) {
      cookie.remove(decode(name), params);
    })
  }
};
//货币格式转换
export const formatMoney = (number, places, thousand, decimal) => {
  var number = number || 0,
    places = !isNaN(places = Math.abs(places)) ? places : 2,
    thousand = thousand || ",",
    decimal = decimal || ".",
    negative = number < 0 ? "-" : "",
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};
//常用正则验证方法
export const regExp = {
  isNumber: function (val) {
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/g.test(val);
  },
  isPhone: function (val) {
    return /^1((3|4|5|7|8){1}\d{1}|70)\d{8}$/g.test(val);
  },
  isEmail: function (val) {
    return (/^[A-Za-z0-9_-]+@[a-zA-Z0-9_-]+(\.)?[A-Za-z0-9_-]+\.(com|cn)$/g.test(val));
  },
  isUrl: function (val) {
    return (/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(val));
  },
  isDate: function (val) {
    return !/Invalid|NaN/.test(new Date(val).toString());
  },
  isDateISO: function (val) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/g.test(val);
  },
  isDigits: function (val) {
    return /^\d+$/.test(val);
  }
};
//获取最大z-index值
export const getMaxZindex = (selector, startzIndex) => {
  var elNodes = null;
  selector = selector || "*";
  startzIndex = Math.max(1, parseInt(startzIndex) || 1);
  if (toStringType(selector) === "string") {
    elNodes = document.querySelectorAll(selector);
  } else if (isArrayLike(selector)) {
    elNodes = selector;
  } else if (selector instanceof HTMLElement) {
    elNodes = [selector];
  }
  return Math.max.apply(null, [startzIndex].concat(Array.prototype.slice.call(elNodes || []).map(el => {
    return parseInt(el.style.zIndex) || 1;
  })));
};
//创建视窗在某个范围内执行fn的函数resizeInit("w>1024")(function(){})
export const resizeInit = inBrowser&&(function () {
  let resizeObj = {};
  window.addEventListener("resize", debounce(function () {
    let w = getWindowWidth();
    each(resizeObj, function (obj, reg) {
      let thisFlag = eval(reg);
      if (obj.flag !== thisFlag && (obj.flag = thisFlag)) {
        each(obj.arr, function (fn) {
          fn();
        })
      }
    })
  }));
  return function (reg) {
    reg = reg.replace(/\s/g, "");
    let w = getWindowWidth(),
      obj = resizeObj[reg] = resizeObj[reg] || {
        flag: eval(reg),
        arr: []
      }
    return function (fn, immediate) {
      immediate = immediate === undefined ? true : !!immediate;
      obj.flag && immediate && fn();
      obj.arr.push(fn);
    }
  }
}());
//加载一张图片
export const loadImage = (src, callback) => {
  var img = new Image();
  img.onload = callback;
  img.src = src;
};
//下载文件
export const downloadFile = (blobData, type, filename) => {
  var blob = new Blob([blobData], { type });
  var a = document.createElement("a");
  var href = window.URL.createObjectURL(blob);
  a.href = href; //创建下载的链接
  a.download = filename; //下载后文件名
  document.body.appendChild(a);
  a.click(); //点击下载
  document.body.removeChild(a); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放掉blob对象
};
//============================end======================
export default {
  // 设备
  inBrowser,
  inWeex,
  weexPlatform,
  UA,
  isMobile,
  hasTouch,
  isIE,
  isIE9,
  isEdge,
  isAndroid,
  isIOS,
  isChrome,
  isIPhone,
  isPad,
  isWebApp,
  mousedown,
  mousemove,
  mouseup,
  //方法
  hasOwnProperty,
  toStringType,
  isArrayLike,
  isArray,
  each,
  encode,
  decode,
  querystring,
  debounce,
  throttle,
  supportCss3,
  allowTransition,
  allowAnimation,
  getWindowWidth,
  getWindowHeight,
  getTypeArg,
  nextFrame,
  trim,
  privatePhone,
  repeat,
  padStart,
  padEnd,
  arrayToObj,
  toArrayData,
  formatDate,
  formatDateRange,
  stringToArray,
  getRandom,
  cookie,
  formatMoney,
  regExp,
  getMaxZindex,
  resizeInit,
  loadImage,
  downloadFile,
  bhlUtil,
  Tween,
}