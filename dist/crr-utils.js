/*!
  * crr-utils v1.1.0
  * (c) 2019 crr
  * @license MIT
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.S = {})));
}(this, (function (exports) { 'use strict';

/*1.1.4*/
var bhlUtil = {
/*字符串*/
    //去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
    //trim('  1235asd',1)
    //result：1235asd
    trim: function (str, type) {
        switch (type) {
            case 1:
                return str.replace(/\s+/g, "");
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s*)/g, "");
            case 4:
                return str.replace(/(\s*$)/g, "");
            default:
                return str;
        }
    },
    /*type
     1:首字母大写
     2：首页母小写
     3：大小写转换
     4：全部大写
     5：全部小写
     * */
    //changeCase('asdasd',1)
    //result：Asdasd
    changeCase: function (str, type) {
        function ToggleCase(str) {
            var itemText = "";
            str.split("").forEach(
                function (item) {
                    if (/^([a-z]+)/.test(item)) {
                        itemText += item.toUpperCase();
                    } else if (/^([A-Z]+)/.test(item)) {
                        itemText += item.toLowerCase();
                    } else {
                        itemText += item;
                    }
                });
            return itemText;
        }
        switch (type) {
            case 1:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

                });
            case 2:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
                });
            case 3:
                return ToggleCase(str);
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            default:
                return str;
        }
    },
    //字符串循环复制
    //es6中repeat函数
    //repeatStr(str->字符串, count->次数)
    //repeatStr('123',3)
    //"result：123123123"
    repeatStr: function (str, count) {
        var text = '';
        for (var i = 0; i < count; i++) {
            text += str;
        }
        return text;
    },
    //字符串替换(字符串,要替换的字符或者正则表达式（不要写g）,替换成什么)
    //ecDo.replaceAll('这里是上海，中国第三大城市，广东省省会，简称穗，','上海','广州')
    //result："这里是广州，中国第三大城市，广东省省会，简称穗，"
    replaceAll: function (str, AFindText, ARepText) {
        raRegExp = new RegExp(AFindText, "g");
        return str.replace(raRegExp, ARepText);
    },
    //字符替换*
    //replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
    replaceStr: function (str, regArr, type, ARepText) {
        var regtext = '',
            Reg = null,
            replaceText = ARepText || '*';
        //replaceStr('18819322663',[3,5,3],0)
        //result：188*****663
        //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
        if (regArr.length === 3 && type === 0) {
            regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})';
            Reg = new RegExp(regtext);
            var replaceCount = this.repeatStr(replaceText, regArr[1]);
            return str.replace(Reg, '$1' + replaceCount + '$2')
        }
        //replaceStr('asdasdasdaa',[3,5,3],1)
        //result：***asdas***
        else if (regArr.length === 3 && type === 1) {
            regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}';
            Reg = new RegExp(regtext);
            var replaceCount1 = this.repeatStr(replaceText, regArr[0]);
            var replaceCount2 = this.repeatStr(replaceText, regArr[2]);
            return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
        }
        //replaceStr('1asd88465asdwqe3',[5],0)
        //result：*****8465asdwqe3
        else if (regArr.length === 1 && type === 0) {
            regtext = '(^\\w{' + regArr[0] + '})';
            Reg = new RegExp(regtext);
            var replaceCount = this.repeatStr(replaceText, regArr[0]);
            return str.replace(Reg, replaceCount)
        }
        //replaceStr('1asd88465asdwqe3',[5],1,'+')
        //result："1asd88465as+++++"
        else if (regArr.length === 1 && type === 1) {
            regtext = '(\\w{' + regArr[0] + '}$)';
            Reg = new RegExp(regtext);
            var replaceCount = this.repeatStr(replaceText, regArr[0]);
            return str.replace(Reg, replaceCount)
        }
    },
    //检测字符串
    //checkType('165226226326','phone')
    //result：false
    //大家可以根据需要扩展
    checkType: function (str, type) {
        switch (type) {
            case 'email':
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            case 'phone':
                return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
            case 'tel':
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            case 'number':
                return /^[0-9]$/.test(str);
            case 'english':
                return /^[a-zA-Z]+$/.test(str);
            case 'text':
                return /^\w+$/.test(str);
            case 'chinese':
                return /^[\u4E00-\u9FA5]+$/.test(str);
            case 'lower':
                return /^[a-z]+$/.test(str);
            case 'upper':
                return /^[A-Z]+$/.test(str);
            default:
                return true;
        }
    },
    //检测密码强度
    //checkPwd('12asdASAD')
    //result：3(强度等级为3)
    checkPwd: function (str) {
        var nowLv = 0;
        if (str.length < 6) {
            return nowLv
        }
        if (/[0-9]/.test(str)) {
            nowLv++;
        }
        if (/[a-z]/.test(str)) {
            nowLv++;
        }
        if (/[A-Z]/.test(str)) {
            nowLv++;
        }
        if (/[\.|-|_]/.test(str)) {
            nowLv++;
        }
        return nowLv;
    },
    //随机码
    //count取值范围2-36

    //randomWord(10)
    //result："2584316588472575"

    //randomWord(14)
    //result："9b405070dd00122640c192caab84537"

    //randomWord(36)
    //result："83vhdx10rmjkyb9"

    randomWord: function (count) {
        return Math.random().toString(count).substring(2);
    },

    //查找字符串
    //var strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
    //countStr(strTest,'blog')
    //result：6
    countStr: function (str, strSplit) {
        return str.split(strSplit).length - 1
    },
    //过滤字符串(html标签，表情，特殊字符)
    //字符串，替换内容（special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），要替换成什么，默认'',保留哪些特殊字符
    //如果需要过滤多种字符，type参数使用,分割，如下栗子
    //过滤字符串的html标签，大写字母，中文，特殊字符，全部替换成*,但是特殊字符'%'，'?'，除了这两个，其他特殊字符全部清除
    //var str='asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&*^%^&*$\\"\'#@!()*/-())_\'":"{}?<div></div><img src=""/>啊实打实大蠢猪自行车这些课程';
    // ecDo.filterStr(str,'html,WORD,chinese,special','*','%?')
    //result："asd    654a**sasdasd*********6d5#%^*^&*^%^&*$\"'#@!()*/-())_'":"{}?*****************"
    filterStr: function (str, type, restr, spstr) {
        var typeArr = type.split(','), _str = str;
        for (var i = 0, len = typeArr.length; i < len; i++) {
            //是否是过滤特殊符号
            if (typeArr[i] === 'special') {
                var pattern, regText = '$()[]{}?\|^*+./\"\'+';
                //是否有哪些特殊符号需要保留
                if (spstr) {
                    var _spstr = spstr.split(""), _regText = "[^0-9A-Za-z\\s";
                    for (var j = 0, len1 = _spstr.length; j < len1; j++) {
                        if (regText.indexOf(_spstr[j]) === -1) {
                            _regText += _spstr[j];
                        }
                        else {
                            _regText += '\\' + _spstr[j];
                        }
                    }
                    _regText += ']';
                    pattern = new RegExp(_regText, 'g');
                }
                else {
                    pattern = new RegExp("[^0-9A-Za-z\\s]", 'g');
                }

            }
            var _restr = restr || '';
            switch (typeArr[i]) {
                case 'special':
                    _str = _str.replace(pattern, _restr);
                    break;
                case 'html':
                    _str = _str.replace(/<\/?[^>]*>/g, _restr);
                    break;
                case 'emjoy':
                    _str = _str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g, _restr);
                    break;
                case 'word':
                    _str = _str.replace(/[a-z]/g, _restr);
                    break;
                case 'WORD':
                    _str = _str.replace(/[A-Z]/g, _restr);
                    break;
                case 'number':
                    _str = _str.replace(/[0-9]/g, _restr);
                    break;
                case 'chinese':
                    _str = _str.replace(/[\u4E00-\u9FA5]/g, _restr);
                    break;
            }
        }
        return _str;
    },
    //格式化处理字符串
    //ecDo.formatText('1234asda567asd890')
    //result："12,34a,sda,567,asd,890"
    //ecDo.formatText('1234asda567asd890',4,' ')
    //result："1 234a sda5 67as d890"
    //ecDo.formatText('1234asda567asd890',4,'-')
    //result："1-234a-sda5-67as-d890"
    formatText: function (str, size, delimiter) {
        var _size = size || 3, _delimiter = delimiter || ',';
        var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
        var reg = new RegExp(regText, 'g');
        return str.replace(reg, _delimiter);
    },
    //找出最长单词 (Find the Longest word in a String)
    //longestWord('Find the Longest word in a String')
    //result：7
    //longestWord('Find|the|Longest|word|in|a|String','|')
    //result：7
    longestWord: function (str, splitType) {
        var _splitType = splitType || /\s+/g,
            _max = 0;
        var strArr = str.split(_splitType);
        strArr.forEach(function (item) {
            if (_max < item.length) {
                _max = item.length;
            }
        });
        return _max;
    },
    //句中单词首字母大写 (Title Case a Sentence)
    //这个我也一直在纠结，英文标题，即使是首字母大写，也未必每一个单词的首字母都是大写的，但是又不知道哪些应该大写，哪些不应该大写
    //ecDo.titleCaseUp('this is a title')
    //"This Is A Title"
    titleCaseUp: function (str, splitType) {
        var _splitType = splitType || /\s+/g;
        var strArr = str.split(_splitType),
            result = "", _this = this;
        strArr.forEach(function (item) {
            result += _this.changeCase(item, 1) + ' ';
        });
        return this.trim(result, 4)
    },

/*数组*/

    //数组去重
    removeRepeatArray: function (arr) {
        return arr.filter(function (item, index, self) {
            return self.indexOf(item) === index;
        });
        //es6
        //return Array.from(new Set(arr))
    },
    //数组顺序打乱
    upsetArr: function (arr) {
        return arr.sort(function () {
            return Math.random() - 0.5
        });
    },

    //数组最大值
    //这一块的封装，主要是针对数字类型的数组
    maxArr: function (arr) {
        return Math.max.apply(null, arr);
    },
    //数组最小值
    minArr: function (arr) {
        return Math.min.apply(null, arr);
    },

    //这一块的封装，主要是针对数字类型的数组
    //数组求和
    sumArr: function (arr) {
        return arr.reduce(function (pre, cur) {
            return pre + cur
        })
    },

    //数组平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！
    covArr: function (arr) {
        return this.sumArr(arr) / arr.length;
    },
    //从数组中随机获取元素
    randomOne: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    //回数组（字符串）一个元素出现的次数
    //getEleCount('asd56+asdasdwqe','a')
    //result：3
    //getEleCount([1,2,3,4,5,66,77,22,55,22],22)
    //result：2
    getEleCount: function (obj, ele) {
        var num = 0;
        for (var i = 0, len = obj.length; i < len; i++) {
            if (ele === obj[i]) {
                num++;
            }
        }
        return num;
    },

    //返回数组（字符串）出现最多的几次元素和出现次数
    //arr, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
    //返回值：el->元素，count->次数
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])
    //result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2},{"el":"4","count":1},{"el":"5","count":1},{"el":"6","count":1}]
    //默认情况，返回所有元素出现的次数
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)
    //传参（rank=3），只返回出现次数排序前三的
    //result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2}]
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)
    //传参（ranktype=1,rank=null），升序返回所有元素出现次数
    //result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1},{"el":"3","count":2},{"el":"1","count":4},{"el":"2","count":6}]
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1)
    //传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的
    //result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1}]
    getCount: function (arr, rank, ranktype) {
        var obj = {},
            k, arr1 = [];
        //记录每一元素出现的次数
        for (var i = 0, len = arr.length; i < len; i++) {
            k = arr[i];
            if (obj[k]) {
                obj[k]++;
            } else {
                obj[k] = 1;
            }
        }
        //保存结果{el-'元素'，count-出现次数}
        for (var o in obj) {
            arr1.push({el: o, count: obj[o]});
        }
        //排序（降序）
        arr1.sort(function (n1, n2) {
            return n2.count - n1.count
        });
        //如果ranktype为1，则为升序，反转数组
        if (ranktype === 1) {
            arr1 = arr1.reverse();
        }
        var rank1 = rank || arr1.length;
        return arr1.slice(0, rank1);
    },

    //得到n1-n2下标的数组
    //getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
    //result：[5, 6, 7, 8, 9]
    //getArrayNum([0,1,2,3,4,5,6,7,8,9],2) 不传第二个参数,默认返回从n1到数组结束的元素
    //result：[2, 3, 4, 5, 6, 7, 8, 9]
    getArrayNum: function (arr, n1, n2) {
        var arr1 = arr.slice(n1, n2);
        return arr1;
    },

    //筛选数组
    //删除值为'val'的数组元素
    //removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
    //result：["aaa"]   带有'test'的都删除
    //removeArrayForValue(['test','test1','test2','test','aaa'],'test')
    //result：["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
    removeArrayForValue: function (arr, val, type) {
        return arr.filter(function (item) {
            return type ? item.indexOf(val) === -1 : item !== val
        })
    },
    //获取对象数组某些项
    //var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //getOptionArray(arr,'a,c')
    //result：[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
    //getOptionArray(arr,'b',1)
    //result：[2, 3, 9, 2, 5]
    getOptionArray: function (arr, keys, type) {
        var newArr = [];
        if (!keys) {
            return arr
        }
        //是否只是需要获取某一项的值
        if (type === 1) {
            for (var i = 0, len = arr.length; i < len; i++) {
                newArr.push(arr[i][keys]);
            }
            return newArr;
        }
        var _keys = keys.split(','), newArrOne = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            newArrOne = {};
            for (var j = 0, len1 = _keys.length; j < len1; j++) {
                newArrOne[_keys[j]] = arr[i][_keys[j]];
            }
            newArr.push(newArrOne);
        }
        return newArr
    },
    //排除数组某些项
    //var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //filterOptionArray(arr,'a')
    //result：[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
    //filterOptionArray(arr,'a,c')
    //result：[{b:2},{b:3},{b:9},{b:2},{b:5}]
    filterOptionArray: function (arr, keys) {
        var newArr = [];
        var _keys = keys.split(','), newArrOne = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            newArrOne = {};
            for (var key in arr[i]) {
                //如果key不存在排除keys里面,添加数据
                if (_keys.indexOf(key) === -1) {
                    newArrOne[key] = arr[i][key];
                }
            }
            newArr.push(newArrOne);
        }
        return newArr
    },
    //对象数组的排序
    //var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //ecDo.arraySort(arr,'a,b')a是第一排序条件，b是第二排序条件
    //result：[{"a":1,"b":2,"c":9},{"a":2,"b":3,"c":5},{"a":4,"b":2,"c":5},{"a":4,"b":5,"c":7},{"a":5,"b":9}]
    arraySort: function (arr, sortText) {
        if (!sortText) {
            return arr
        }
        var _sortText = sortText.split(',').reverse(), _arr = arr.slice(0);
        for (var i = 0, len = _sortText.length; i < len; i++) {
            _arr.sort(function (n1, n2) {
                return n1[_sortText[i]] - n2[_sortText[i]]
            });
        }
        return _arr;
    },
    //数组扁平化
    steamroller: function (arr) {
        var newArr = [],_this=this;
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                // 如果是数组，调用(递归)steamroller 将其扁平化
                // 然后再 push 到 newArr 中
                newArr.push.apply(newArr, _this.steamroller(arr[i]));
            } else {
                // 不是数组直接 push 到 newArr 中
                newArr.push(arr[i]);
            }
        }
        return newArr;
    },
    //另一种写法
    //steamroller([1,2,[4,5,[1,23]]])
    //[1, 2, 4, 5, 1, 23]
    /*
     * i=0 newArr.push(arr[i])  [1]
     * i=1 newArr.push(arr[i])  [1,2]
     * i=2 newArr = newArr.concat(steamroller(arr[i]));  执行到下面
     * 第一次i=2进入后 i=0, newArr.push(arr[i]);  [4]
     * 第一次i=2进入后 i=1, newArr.push(arr[i]);  [4，5]
     *  * i=2 newArr = newArr.concat(steamroller(arr[i]));  执行到下面
     * 第二次i=2进入后 i=0, newArr.push(arr[i]);  [1]
     * 第二次i=2进入后 i=1, newArr.push(arr[i]);  [1，23]  执行到下面
     * 第二次循环完，回到第一次进入后  newArr = newArr.concat(steamroller(arr[i]));  [4,5].concat([1,23])   [4,5,1,23]
     * 然后回到第一次   [1,2].concat([4,5,1,23])
     */
    //  steamroller: function (arr) {
    //      var newArr = [];
    //      for (var i = 0; i < arr.length; i++) {
    //          if (Array.isArray(arr[i])) {
    //              // 如果是数组，调用(递归)steamroller 将其扁平化
    //              // 然后再 push 到 newArr 中
    //              newArr = newArr.concat(steamroller(arr[i]));
    //          } else {
    //              // 不是数组直接 push 到 newArr 中
    //              newArr.push(arr[i]);
    //          }
    //      }
    //      return newArr;
    //  },

/*对象及其他*/

    //适配rem
    getFontSize: function () {
        var doc = document,
            win = window;
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) { return; }
                //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
                if (clientWidth > 750) {
                    clientWidth = 750;
                }
                //设置根元素font-size大小
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            };
        //屏幕大小改变，或者横竖屏切换时，触发函数
        win.addEventListener(resizeEvt, recalc, false);
        //文档加载完成时，触发函数
        doc.addEventListener('DOMContentLoaded', recalc, false);
    },
    //到某一个时间的倒计时
    //getEndTime('2017/7/22 16:0:0')
    //result："剩余时间6天 2小时 28 分钟20 秒"
    getEndTime: function (endTime) {
        var startDate = new Date(); //开始时间，当前时间
        var endDate = new Date(endTime); //结束时间，需传入时间参数
        var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
        var d = 0,
            h = 0,
            m = 0,
            s = 0;
        if (t >= 0) {
            d = Math.floor(t / 1000 / 3600 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
        }
        return "剩余时间" + d + "天 " + h + "小时 " + m + " 分钟" + s + " 秒";
    },
    //随进产生颜色
    randomColor: function () {
        //randomNumber是下面定义的函数
        //写法1
        //return 'rgb(' + this.randomNumber(255) + ',' + this.randomNumber(255) + ',' + this.randomNumber(255) + ')';

        //写法2
        return '#' + Math.random().toString(16).substring(2).substr(0, 6);

        //写法3
        //var color='#',_index=this.randomNumber(15);
        //for(var i=0;i<6;i++){
        //color+='0123456789abcdef'[_index];
        //}
        //return color;
    },
    //随机返回一个范围的数字
    randomNumber: function (n1, n2) {
        //randomNumber(5,10)
        //返回5-10的随机整数，包括5，10
        if (arguments.length === 2) {
            return Math.round(n1 + Math.random() * (n2 - n1));
        }
        //randomNumber(10)
        //返回0-10的随机整数，包括0，10
        else if (arguments.length === 1) {
            return Math.round(Math.random() * n1)
        }
        //randomNumber()
        //返回0-255的随机整数，包括0，255
        else {
            return Math.round(Math.random() * 255)
        }
    },
    //设置url参数
    //setUrlPrmt({'a':1,'b':2})
    //result：a=1&b=2
    setUrlPrmt: function (obj) {
        var _rs = [];
        for (var p in obj) {
            if (obj[p] != null && obj[p] != '') {
                _rs.push(p + '=' + obj[p]);
            }
        }
        return _rs.join('&');
    },
    //获取url参数
    //getUrlPrmt('segmentfault.com/write?draftId=122000011938')
    //result：Object{draftId: "122000011938"}
    getUrlPrmt: function (url) {
        url = url ? url : window.location.href;
        var _pa = url.substring(url.indexOf('?') + 1),
            _arrS = _pa.split('&'),
            _rs = {};
        for (var i = 0, _len = _arrS.length; i < _len; i++) {
            var pos = _arrS[i].indexOf('=');
            if (pos == -1) {
                continue;
            }
            var name = _arrS[i].substring(0, pos),
                value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
            _rs[name] = value;
        }
        return _rs;
    },

    //现金额大写转换函数
    //upDigit(168752632)
    //result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
    //upDigit(1682)
    //result："人民币壹仟陆佰捌拾贰元整"
    //upDigit(-1693)
    //result："欠人民币壹仟陆佰玖拾叁元整"
    upDigit: function (n) {
        var fraction = ['角', '分', '厘'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠人民币' : '人民币';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
            //s = p + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    },
    //清除对象中值为空的属性
    //filterParams({a:"",b:null,c:"010",d:123})
    //Object {c: "010", d: 123}
    filterParams: function (obj) {
        var _newPar = {};
        for (var key in obj) {
            if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
                _newPar[key] = obj[key];
            }
        }
        return _newPar;
    },
    //cookie
    //设置cookie
    setCookie: function (name, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + '=' + value + ';expires=' + oDate;
    },
    //获取cookie
    getCookie: function (name) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');
            if (arr2[0] == name) {
                return arr2[1];
            }
        }
        return '';
    },
    //删除cookie
    removeCookie: function (name) {
        this.setCookie(name, 1, -1);
    },

/*DOM*/

    //检测对象是否有哪个类名
    hasClass: function (obj, classStr) {
        if (obj.className && this.trim(obj.className, 1) !== "") {
            var arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
            return (arr.indexOf(classStr) == -1) ? false : true;
        }
        else {
            return false;
        }

    },
    //添加类名
    addClass: function (obj, classStr) {
        if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length >= 1) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if (!this.hasClass(obj[i], classStr)) {
                    obj[i].className += " " + classStr;
                }
            }
        }
        else {
            if (!this.hasClass(obj, classStr)) {
                obj.className += " " + classStr;
            }
        }
    },
    //删除类名
    removeClass: function (obj, classStr) {
        if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length > 1) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if (this.hasClass(obj[i], classStr)) {
                    var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
                    obj[i].className = obj[i].className.replace(reg, '');
                }
            }
        }
        else {
            if (this.hasClass(obj, classStr)) {
                var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
                obj.className = obj.className.replace(reg, '');
            }
        }
    },
    //替换类名("被替换的类名","替换的类名")
    replaceClass: function (obj, newName, oldName) {
        this.removeClass(obj, oldName);
        this.addClass(obj, newName);
    },
    //获取兄弟节点
    //ecDo.siblings(obj,'#id')
    siblings: function (obj, opt) {
        var a = []; //定义一个数组，用来存o的兄弟元素
        var p = obj.previousSibling;
        while (p) { //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
            if (p.nodeType === 1) {
                a.push(p);
            }
            p = p.previousSibling; //最后把上一个节点赋给p
        }
        a.reverse(); //把顺序反转一下 这样元素的顺序就是按先后的了
        var n = obj.nextSibling; //再取o的弟弟
        while (n) { //判断有没有下一个弟弟结点 n是nextSibling的意思
            if (n.nodeType === 1) {
                a.push(n);
            }
            n = n.nextSibling;
        }
        if (opt) {
            var _opt = opt.substr(1);
            var b = [];//定义一个数组，用于储存过滤a的数组
            if (opt[0] === '.') {
                b = a.filter(function (item) {
                    return item.className === _opt
                });
            }
            else if (opt[0] === '#') {
                b = a.filter(function (item) {
                    return item.id === _opt
                });
            }
            else {
                b = a.filter(function (item) {
                    return item.tagName.toLowerCase() === opt
                });
            }
            return b;
        }
        return a;
    },
    //设置样式
    css: function (obj, json) {
        for (var attr in json) {
            obj.style[attr] = json[attr];
        }
    },
    //设置HTML内容
    html: function (obj) {
        if (arguments.length === 1) {
            return obj.innerHTML;
        } else if (arguments.length === 2) {
            obj.innerHTML = arguments[1];
        }
    },
    //设置HTML内容
    text: function (obj) {
        if (arguments.length === 1) {
            return obj.innerHTML;
        } else if (arguments.length === 2) {
            obj.innerHTML = this.filterStr(arguments[1],'html');
        }
    },
    //显示隐藏
    show: function (obj) {
        var blockArr=['div','li','ul','ol','dl','table','article','h1','h2','h3','h4','h5','h6','p','hr','header','footer','details','summary','section','aside',''];
        if(blockArr.indexOf(obj.tagName.toLocaleLowerCase())===-1){
            obj.style.display ='inline';
        }
        else{
            obj.style.display ='block';
        }
    },
    hide: function (obj) {
        obj.style.display = "none";
    },
    /* 封装ajax函数
     * @param {string}obj.type http连接的方式，包括POST和GET两种方式
     * @param {string}obj.url 发送请求的url
     * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
     * @param {object}obj.data 发送的参数，格式为对象类型
     * @param {function}obj.success ajax发送并接收成功调用的回调函数
     * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
     */
    //  ajax({
    //  	type:'get',
    //  	url:'xxx',
    //  	data:{
    //  		id:'111'
    //  	},
    //  	success:function(res){
    //  		console.log(res)
    //  	}
    //  })
    ajax: function (obj) {
        obj = obj || {};
        obj.type = obj.type.toUpperCase() || 'POST';
        obj.url = obj.url || '';
        obj.async = obj.async || true;
        obj.data = obj.data || null;
        obj.success = obj.success || function () {
            };
        obj.error = obj.error || function () {
            };
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var params = [];
        for (var key in obj.data) {
            params.push(key + '=' + obj.data[key]);
        }
        var postData = params.join('&');
        if (obj.type.toUpperCase() === 'POST') {
            xmlHttp.open(obj.type, obj.url, obj.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        } else if (obj.type.toUpperCase() === 'GET') {
            xmlHttp.open(obj.type, obj.url + '?' + postData, obj.async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                obj.success(xmlHttp.responseText);
            } else {
                obj.error(xmlHttp.responseText);
            }
        };
    },
    //图片没加载出来时用一张图片代替
    aftLoadImg: function (obj, url, errorUrl,cb) {
        var oImg = new Image(), _this = this;
        oImg.src = url;
        oImg.onload = function () {
            obj.src = oImg.src;
            if (cb && _this.istype(cb, 'function')) {
                cb(obj);
            }
        };
        oImg.onerror=function () {
            obj.src=errorUrl;
            if (cb && _this.istype(cb, 'function')) {
                cb(obj);
            }
        };
    },
    //图片滚动懒加载
    //@className {string} 要遍历图片的类名
    //@num {number} 距离多少的时候开始加载 默认 0
    //比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载
    //html代码
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>....
    //data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。
    //详细可以查看testLoadImg.html

    //window.onload = function() {
    //	loadImg('load-img',100);
    //	window.onscroll = function() {
    //		loadImg('load-img',100);
    //		}
    //}
    loadImg: function (className, num, errorUrl) {
        var _className = className || 'ec-load-img', _num = num || 0, _this = this,_errorUrl=errorUrl||null;
        var oImgLoad = document.getElementsByClassName(_className);
        for (var i = 0, len = oImgLoad.length; i < len; i++) {
            if (document.documentElement.clientHeight + document.documentElement.scrollTop > oImgLoad[i].offsetTop - _num && !oImgLoad[i].isLoad) {
                //记录图片是否已经加载
                oImgLoad[i].isLoad = true;
                //设置过渡，当图片下来的时候有一个图片透明度变化
                oImgLoad[i].style.cssText = "transition: ''; opacity: 0;";
                if (oImgLoad[i].dataset) {
                    this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, _errorUrl, function (o) {
                        setTimeout(function () {
                            if (o.isLoad) {
                                _this.removeClass(o, _className);
                                o.style.cssText = "";
                            }
                        }, 1000);
                    });
                } else {
                    this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute("data-src"), _errorUrl, function (o) {
                        setTimeout(function () {
                            if (o.isLoad) {
                                _this.removeClass(o, _className);
                                o.style.cssText = "";
                            }
                        }, 1000);
                    });
                }
                (function (i) {
                    setTimeout(function () {
                        oImgLoad[i].style.cssText = "transition:all 1s; opacity: 1;";
                    }, 16);
                })(i);
            }
        }
    },
    //创建正则字符
    createKeyExp: function (strArr) {
        var str = "";
        for (var i = 0; i < strArr.length; i++) {
            if (i != strArr.length - 1) {
                str = str + strArr[i] + "|";
            } else {
                str = str + strArr[i];
            }
        }
        return "(" + str + ")";
    },
    //关键字加标签（多个关键词用空格隔开）
    //ecDo.findKey('守侯我oaks接到了来自下次你离开快乐吉祥留在开城侯','守侯 开','i')
    //"<i>守侯</i>我oaks接到了来自下次你离<i>开</i>快乐吉祥留在<i>开</i>城侯"
    findKey: function (str, key, el) {
        var arr = null,
            regStr = null,
            content = null,
            Reg = null,
            _el = el || 'span';
        arr = key.split(/\s+/);
        //alert(regStr); //    如：(前端|过来)
        regStr = this.createKeyExp(arr);
        content = str;
        //alert(Reg);//        /如：(前端|过来)/g
        Reg = new RegExp(regStr, "g");
        //过滤html标签 替换标签，往关键字前后加上标签
        content = content.replace(/<\/?[^>]*>/g, '');
        return content.replace(Reg, "<" + _el + ">$1</" + _el + ">");
    },
    //数据类型判断
    //ecDo.istype([],'array')
    //true
    //ecDo.istype([])
    //'[object Array]'
    istype: function (o, type) {
        if (type) {
            var _type = type.toLowerCase();
        }
        switch (_type) {
            case 'string':
                return Object.prototype.toString.call(o) === '[object String]';
            case 'number':
                return Object.prototype.toString.call(o) === '[object Number]';
            case 'boolean':
                return Object.prototype.toString.call(o) === '[object Boolean]';
            case 'undefined':
                return Object.prototype.toString.call(o) === '[object Undefined]';
            case 'null':
                return Object.prototype.toString.call(o) === '[object Null]';
            case 'function':
                return Object.prototype.toString.call(o) === '[object Function]';
            case 'array':
                return Object.prototype.toString.call(o) === '[object Array]';
            case 'object':
                return Object.prototype.toString.call(o) === '[object Object]';
            case 'nan':
                return isNaN(o);
            case 'elements':
                return Object.prototype.toString.call(o).indexOf('HTML') !== -1
            default:
                return Object.prototype.toString.call(o)
        }
    },

    //手机类型判断
    browserInfo: function (type) {
        switch (type) {
            case 'android':
                return navigator.userAgent.toLowerCase().indexOf('android') !== -1
            case 'iphone':
                return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
            case 'ipad':
                return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
            case 'weixin':
                return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
            default:
                return navigator.userAgent.toLowerCase()
        }
    },
    //函数节流
    // var count=0;
    // function fn1(){
    //     count++;
    //     console.log(count)
    // }
    // //100ms内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔200ms至少执行一次
    // document.onmousemove=delayFn(fn1,100,200)
    delayFn: function (fn, delay, mustDelay) {
        var timer = null;
        var t_start;
        return function () {
            var context = this, args = arguments, t_cur = +new Date();
            //先清理上一次的调用触发（上一次调用触发事件不执行）
            clearTimeout(timer);
            //如果不存触发时间，那么当前的时间就是触发时间
            if (!t_start) {
                t_start = t_cur;
            }
            //如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
            if (t_cur - t_start >= mustDelay) {
                fn.apply(context, args);
                t_start = t_cur;
            }
            //否则延迟执行
            else {
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            }
        };
    }
}

/*
 * Tween.js
 * t: current time（当前时间）
 * b: beginning value（初始值）
 * c: change in value（变化量）
 * d: duration（持续时间）
*/
var Tween = {
    Linear: function(t, b, c, d) { return c*t/d + b; },
    Quad: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c *(t /= d)*(t-2) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) { return c / 2 * t * t + b; }
            return -c / 2 * ((--t) * (t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) { return c / 2 * t * t*t + b; }
            return c / 2*((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t*t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * ((t = t/d - 1) * t * t*t - 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) { return c / 2 * t * t * t * t + b; }
            return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) { return c / 2 * t * t * t * t * t + b; }
            return c / 2*((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t, b, c, d) {
            return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if (t==0) { return b; }
            if (t==d) { return b+c; }
            if ((t /= d / 2) < 1) { return c / 2 * Math.pow(2, 10 * (t - 1)) + b; }
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) { return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b; }
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t, b, c, d, a, p) {
            var s;
            if (t==0) { return b; }
            if ((t /= d) == 1) { return b + c; }
            if (typeof p == "undefined") { p = d * .3; }
            if (!a || a < Math.abs(c)) {
                s = p / 4;
                a = c;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function(t, b, c, d, a, p) {
            var s;
            if (t==0) { return b; }
            if ((t /= d) == 1) { return b + c; }
            if (typeof p == "undefined") { p = d * .3; }
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p/(2*Math.PI) * Math.asin(c/a);
            }
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function(t, b, c, d, a, p) {
            var s;
            if (t==0) { return b; }
            if ((t /= d / 2) == 2) { return b+c; }
            if (typeof p == "undefined") { p = d * (.3 * 1.5); }
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2  *Math.PI) * Math.asin(c / a);
            }
            if (t < 1) { return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b; }
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function(t, b, c, d, s) {
            if (typeof s == "undefined") { s = 1.70158; }
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") { s = 1.70158; }
            return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") { s = 1.70158; }
            if ((t /= d / 2) < 1) { return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b; }
            return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function(t, b, c, d) {
            if (t < d / 2) {
                return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
                return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
};

//设备环境
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = UA && inBrowser && window.navigator.userAgent.toLowerCase();
var isMobile = UA && !!UA.match(/AppleWebKit.*Mobile.*/);
var hasTouch = UA && !!UA.match(/AppleWebKit.*Mobile.*/);
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isIPhone = UA && UA.indexOf('iPhone') > -1; //是否为iPhone或者QQHD浏览器
var isPad = UA && UA.indexOf('iPad') > -1; //是否iPad
var isWebApp = UA && UA.indexOf('Safari') == -1; //是否web应该程序，没有头部与底部
var mousedown = hasTouch ? "touchstart" : "mousedown";
var mousemove = hasTouch ? "touchmove" : "mousemove";
var mouseup = hasTouch ? "touchend" : "mouseup";

//====方法=====
var hasOwnProperty = function (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
//判断数据类型
var toStringType = function (value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};
//判断是否为类数组
var isArrayLike = function (o) {
  return o && typeof o === 'object' && isFinite(o.length) && o.length >= 0 && o.length === Math.floor(o.length) && o.length < 4294967296;
};
//是否为数组
var isArray = function (value) {
  return toStringType(value) === "array";
};
//数组和对象循环
var each = function (obj, callback) {
  if (!obj) { return; }
  if (isArrayLike(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (callback(obj[i], i, obj) === false) {
        break;
      }
    }
  } else {
    var keyArr = Object.keys(obj);
    for (var i$1 = 0, l$1 = keyArr.length; i$1 < l$1; i$1++) {
      if (callback(obj[keyArr[i$1]], keyArr[i$1], obj) === false) {
        break;
      }
    }
  }
};
//汉字编码
var encode = function (str) {
  return encodeURIComponent(str);
};
//汉字解码
var decode = function (str) {
  return decodeURIComponent(str);
};
//querystring
var querystring = (function () {
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
      if (!name) { return ''; }
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
var debounce = function (fn, wait, params) {
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
var throttle = function (fn, wait, params) {
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
var supportCss3 = function (styleKey) {
  var toHumb = function (str) {
    return str.replace(/-(\w)/g, function ($0, $1) {
      return $1.toUpperCase();
    })
  },
    preArr = ['webkit', 'Moz', 'ms', 'o'],
    preStyleArr = [toHumb(styleKey)],
    htmlStyle = document.documentElement.style,
    state = false;
  each(preArr, function (pre) {
    preStyleArr.push(toHumb(pre + '-' + styleKey));
  });
  each(preStyleArr, function (preStyle) {
    if (preStyle in htmlStyle) {
      state = true;
      return false;
    }
  });
  return state;
};
//是否支持transition
var allowTransition = inBrowser && supportCss3("transition");
//是否支持animation
var allowAnimation = inBrowser && supportCss3("animation");
//获取window和css媒体查询同步宽高
var getWindowWidth = function () {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
};
var getWindowHeight = function () {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
};
//获取对应类型的参数
var getTypeArg = function (arg, type, defaultArg) {
  each(arg, function (item) {
    if (type.indexOf(toStringType(item)) > -1) {
      defaultArg = item;
      return false;
    }
  });
  return defaultArg;
};
//最佳动画执行时机
var nextFrame = (function () {
  var raf = (inBrowser&&window.requestAnimationFrame) ? window.requestAnimationFrame.bind(window) : setTimeout;
  return function (fn) { return raf(function () {
    raf(fn);
  }); }
}());
//去首尾空格
var trim = function (str) { return str == null ? "" : (str + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""); };
//把手机号4位数字换为*
var privatePhone = function (phone) { return ('' + phone).replace(/^(\d{3})\d{4}(\d{4})$/g, "$1****$2"); };
//repeat
var repeat = function (str, num) {
  num = parseInt(num) || 0;
  return num ? new Array(num + 2).join(String(str)) : "";
};
//padStart
var padStart = function (str, num, padStr) {
  return new Array(num - String(str).length + 1).join(String(padStr)) + str;
};
//padEnd
var padEnd = function (str, num, padStr) {
  return String(str) + new Array(num - String(str).length + 1).join(String(padStr));
};
//对象属性为变量[[valueKey, k],[textKey, item]]
var arrayToObj = function (arr) {
  var obj = {};
  each(arr, function (item) {
    obj[item[0]] = item[1];
  });
  return obj;
};
//把不规则的数据格式转换为统一的数组格式
var toArrayData = function (valueKey, textKey, data, startData) {
  var arrData = startData !== undefined ? [startData] : [];
  if (toStringType(data) === "object") {
    each(data, function (item, k) {
      arrData.push(arrayToObj([
        [valueKey, String(k)],
        [textKey, item]
      ]));
    });
  } else if (toStringType(data) === "array") {
    each(data, function (item) {
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
var formatDate = function (obj, fmt) {
  if ( obj === void 0 ) obj = "";
  if ( fmt === void 0 ) fmt = "YYYY-MM-DD HH:mm";

  if (!obj) { return ""; }
  var type = toStringType(obj);
  if (type !== "date") {
    if (type === "number") {
      obj = new Date(parseInt(obj));
    } else {
      obj = new Date(String(obj));
    }
  }
  var o = {
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
  Object.keys(o).forEach(function (k) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("0".repeat(RegExp.$1.length) + o[k]).substr(("" + o[k]).length)));
    }
  });
  return fmt;
};
//时间段
var formatDateRange = function (startDateTime, endDateTime, startformat, endformat) {
  if ( startformat === void 0 ) startformat = "YYYY-MM-DD HH:mm";
  if ( endformat === void 0 ) endformat = "HH:mm";

  return (startDateTime && endDateTime) ? formatDate(startDateTime, startformat) + " ~ " + formatDate(endDateTime, endformat) : "";
};
//字符串转数组
var stringToArray = function (str, patter) {
  if ( str === void 0 ) str = "";
  if ( patter === void 0 ) patter = /,|，/g;

  return ("" + str).trim().split(patter).filter(function (item) {
    return item !== "";
  });
};
//获取随机数
var getRandom = function (num) {
  var str = "";
  for (var i = 0; i < num; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
};
//cookie
var cookie = {
  params: {
    path: '',
    domain: '',
    secure: ''
  },
  set: function set(name, value, days, params) {
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
  get: function get(name) {
    var result = undefined;
    each(document.cookie ? document.cookie.split('; ') : [], function (item) {
      var parts = item.split('='),
        keyName = parts.shift();
      if (keyName && keyName === encode(name)) {
        result = decode(parts.join('='));
        return false;
      }
    });
    return result;
  },
  remove: function remove(name, params) {
    cookie.set(name, '', -1, assign({}, params));
  },
  removeAll: function removeAll(params) {
    each(document.cookie.match(/[^ =;]+(?=\=)/g), function (name) {
      cookie.remove(decode(name), params);
    });
  }
};
//货币格式转换
var formatMoney = function (number, places, thousand, decimal) {
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
var regExp = {
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
var getMaxZindex = function (selector, startzIndex) {
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
  return Math.max.apply(null, [startzIndex].concat(Array.prototype.slice.call(elNodes || []).map(function (el) {
    return parseInt(el.style.zIndex) || 1;
  })));
};
//创建视窗在某个范围内执行fn的函数resizeInit("w>1024")(function(){})
var resizeInit = inBrowser&&(function () {
  var resizeObj = {};
  window.addEventListener("resize", debounce(function () {
    var w = getWindowWidth();
    each(resizeObj, function (obj, reg) {
      var thisFlag = eval(reg);
      if (obj.flag !== thisFlag && (obj.flag = thisFlag)) {
        each(obj.arr, function (fn) {
          fn();
        });
      }
    });
  }));
  return function (reg) {
    reg = reg.replace(/\s/g, "");
    var w = getWindowWidth(),
      obj = resizeObj[reg] = resizeObj[reg] || {
        flag: eval(reg),
        arr: []
      };
    return function (fn, immediate) {
      immediate = immediate === undefined ? true : !!immediate;
      obj.flag && immediate && fn();
      obj.arr.push(fn);
    }
  }
}());
//加载一张图片
var loadImage = function (src, callback) {
  var img = new Image();
  img.onload = callback;
  img.src = src;
};
//下载文件
var downloadFile = function (blobData, type, filename) {
  var blob = new Blob([blobData], { type: type });
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
var index = {
  // 设备
  inBrowser: inBrowser,
  inWeex: inWeex,
  weexPlatform: weexPlatform,
  UA: UA,
  isMobile: isMobile,
  hasTouch: hasTouch,
  isIE: isIE,
  isIE9: isIE9,
  isEdge: isEdge,
  isAndroid: isAndroid,
  isIOS: isIOS,
  isChrome: isChrome,
  isIPhone: isIPhone,
  isPad: isPad,
  isWebApp: isWebApp,
  mousedown: mousedown,
  mousemove: mousemove,
  mouseup: mouseup,
  //方法
  hasOwnProperty: hasOwnProperty,
  toStringType: toStringType,
  isArrayLike: isArrayLike,
  isArray: isArray,
  each: each,
  encode: encode,
  decode: decode,
  querystring: querystring,
  debounce: debounce,
  throttle: throttle,
  supportCss3: supportCss3,
  allowTransition: allowTransition,
  allowAnimation: allowAnimation,
  getWindowWidth: getWindowWidth,
  getWindowHeight: getWindowHeight,
  getTypeArg: getTypeArg,
  nextFrame: nextFrame,
  trim: trim,
  privatePhone: privatePhone,
  repeat: repeat,
  padStart: padStart,
  padEnd: padEnd,
  arrayToObj: arrayToObj,
  toArrayData: toArrayData,
  formatDate: formatDate,
  formatDateRange: formatDateRange,
  stringToArray: stringToArray,
  getRandom: getRandom,
  cookie: cookie,
  formatMoney: formatMoney,
  regExp: regExp,
  getMaxZindex: getMaxZindex,
  resizeInit: resizeInit,
  loadImage: loadImage,
  downloadFile: downloadFile,
  bhlUtil: bhlUtil,
  Tween: Tween,
}

exports.inBrowser = inBrowser;
exports.inWeex = inWeex;
exports.weexPlatform = weexPlatform;
exports.UA = UA;
exports.isMobile = isMobile;
exports.hasTouch = hasTouch;
exports.isIE = isIE;
exports.isIE9 = isIE9;
exports.isEdge = isEdge;
exports.isAndroid = isAndroid;
exports.isIOS = isIOS;
exports.isChrome = isChrome;
exports.isIPhone = isIPhone;
exports.isPad = isPad;
exports.isWebApp = isWebApp;
exports.mousedown = mousedown;
exports.mousemove = mousemove;
exports.mouseup = mouseup;
exports.hasOwnProperty = hasOwnProperty;
exports.toStringType = toStringType;
exports.isArrayLike = isArrayLike;
exports.isArray = isArray;
exports.each = each;
exports.encode = encode;
exports.decode = decode;
exports.querystring = querystring;
exports.debounce = debounce;
exports.throttle = throttle;
exports.supportCss3 = supportCss3;
exports.allowTransition = allowTransition;
exports.allowAnimation = allowAnimation;
exports.getWindowWidth = getWindowWidth;
exports.getWindowHeight = getWindowHeight;
exports.getTypeArg = getTypeArg;
exports.nextFrame = nextFrame;
exports.trim = trim;
exports.privatePhone = privatePhone;
exports.repeat = repeat;
exports.padStart = padStart;
exports.padEnd = padEnd;
exports.arrayToObj = arrayToObj;
exports.toArrayData = toArrayData;
exports.formatDate = formatDate;
exports.formatDateRange = formatDateRange;
exports.stringToArray = stringToArray;
exports.getRandom = getRandom;
exports.cookie = cookie;
exports.formatMoney = formatMoney;
exports.regExp = regExp;
exports.getMaxZindex = getMaxZindex;
exports.resizeInit = resizeInit;
exports.loadImage = loadImage;
exports.downloadFile = downloadFile;
exports.default = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
