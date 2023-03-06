"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONE_LAT = exports.ONE_LNG = exports.ECHARTS_COLOR_LIST = exports.ECHARTS_COLOR = exports.getRandomName = exports.addZero = exports.setPeriod = exports.getAgeFromId = exports.getRunAtFrame = exports.stringToNumber = exports.coverIdWithMosaics = exports.stringToArray = exports.isLegalId = exports.idReg = exports.compareProperties = exports.isEqual = exports.getProperties = exports.getDistance = exports.twoNumberIsEqual = exports.getRandomId = exports.getRandomDate = exports.getMonthLength = exports.getRandomYear = exports.getRandomPlateNo = exports.getRandomPlateNoItem = exports.plateNoAlphabetList = exports.possibility = exports.getRandomPhone = exports.digitList = exports.getRandomItemFromList = exports.getRandomBetween = exports.sleep = void 0;
const is_equal_1 = __importDefault(require("is-equal"));
/**
 * 休眠指定时间
 * @param {number} time - 休眠的毫秒数
 */
function sleep(time) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(1);
            }, time);
        });
    });
}
exports.sleep = sleep;
/**
 * 取两个整数之间的随机数
 * @param {string} start - 开始的数字，闭区间
 * @param {string} end - 结束的数字，闭区间
 */
function getRandomBetween(start, end) {
    if (!Number.isInteger(start))
        throw new Error("开始的数字必须是整数");
    if (!Number.isInteger(end))
        throw new Error("结束的数字必须是整数");
    if (end < start)
        throw new Error("结束的数字必须大于或者等于开始的数字");
    return start + Math.floor(Math.random() * (end + 1 - start));
}
exports.getRandomBetween = getRandomBetween;
/**
 * 取数组中的随机一个元素
 * @param list - 数组
 */
function getRandomItemFromList(list) {
    return list[getRandomBetween(0, list.length - 1)];
}
exports.getRandomItemFromList = getRandomItemFromList;
/** 0-9集合 */
exports.digitList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
/**
 * 获取随机手机号
 */
function getRandomPhone() {
    const secondList = [3, 5, 7, 8, 9];
    const thirdList = {
        3: exports.digitList,
        5: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        7: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        8: exports.digitList,
        9: [1, 5, 8, 9]
    };
    const second = getRandomItemFromList(secondList);
    const third = getRandomItemFromList(thirdList[second]);
    return `1${second}${third}${Array(8)
        .fill(0)
        .map(() => getRandomItemFromList(exports.digitList))
        .join("")}`;
}
exports.getRandomPhone = getRandomPhone;
/**
 * 可能性
 * @param {number} p - 可能性
 */
function possibility(p) {
    return Math.random() < p;
}
exports.possibility = possibility;
/** 车牌号可用的字母 */
exports.plateNoAlphabetList = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
/**
 * 获取随机一位车牌号
 */
function getRandomPlateNoItem() {
    return possibility(0.5) ? getRandomItemFromList(exports.digitList) : getRandomItemFromList(exports.plateNoAlphabetList);
}
exports.getRandomPlateNoItem = getRandomPlateNoItem;
/**
 * 获取一个随机车牌号
 * @param start - 开始的两位，默认是苏H
 */
function getRandomPlateNo(start) {
    return `${start !== null && start !== void 0 ? start : "苏H"}${Array(5).fill(0).map(getRandomPlateNoItem).join("")}`;
}
exports.getRandomPlateNo = getRandomPlateNo;
/** 获取随机年份 */
function getRandomYear() {
    return new Date().getFullYear() - getRandomBetween(20, 50);
}
exports.getRandomYear = getRandomYear;
/** 获取一个月的长度，忽略闰年 */
function getMonthLength(month) {
    const a = [1, 3, 5, 7, 8, 10, 12];
    const b = [4, 6, 9, 11];
    if (a.includes(month))
        return 31;
    if (b.includes(month))
        return 30;
    return 28;
}
exports.getMonthLength = getMonthLength;
/** 获取一个随机月份日期 */
function getRandomDate() {
    const month = getRandomBetween(1, 12);
    const monthStr = `${month < 10 ? 0 : ""}${month}`;
    const date = getRandomBetween(1, getMonthLength(month));
    const dateStr = `${date < 10 ? 0 : ""}${date}`;
    return `${monthStr}${dateStr}`;
}
exports.getRandomDate = getRandomDate;
/**
 * 获取一个随机身份证
 * @param area - 区号
 *
 */
function getRandomId(area) {
    if (typeof area === "number") {
        if (!Number.isInteger(area))
            throw new Error("区号必须是整数");
        if (area < 110000 || area > 820000)
            throw new Error("区号必须在 110000 和 820000 之间");
    }
    return `${area !== null && area !== void 0 ? area : "380812"}${getRandomYear()}${getRandomDate()}${getRandomBetween(0, 9)}${getRandomBetween(0, 9)}${getRandomBetween(0, 9)}${getRandomBetween(0, 9)}`;
}
exports.getRandomId = getRandomId;
/** 判断两个数字是否相等 */
function twoNumberIsEqual(a, b) {
    return Math.abs(a - b) < Number.EPSILON;
}
exports.twoNumberIsEqual = twoNumberIsEqual;
/**
 * 获取两个经纬度坐标之间的距离
 * @param {number[]} coord1 - 经纬度一
 * @param {number[]} coord2 - 经纬度二
 */
function getDistance(coord1, coord2) {
    const [lng1, lat1] = coord1;
    const [lng2, lat2] = coord2;
    function toRadians(d) {
        return (d * Math.PI) / 180;
    }
    const radLat1 = toRadians(lat1);
    const radLat2 = toRadians(lat2);
    const deltaLat = radLat1 - radLat2;
    const deltaLng = toRadians(lng1) - toRadians(lng2);
    const dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return dis * 6378.137;
}
exports.getDistance = getDistance;
/**
 * 获取对象的某些属性
 * @param {object} obj - 对象
 * @param {string[]} keyList - 需要取出的 key 集合
 */
function getProperties(obj, ...keyList) {
    const result = {};
    keyList.forEach(key => {
        result[key] = obj[key];
    });
    return result;
}
exports.getProperties = getProperties;
/**
 * 比较两个变量是否相等
 * @param {string[]} ignoreList - 忽略的 key 集合
 */
function isEqual(a, b, ...ignoreList) {
    if (ignoreList.length > 0) {
        if (typeof a !== "object" || typeof b !== "object") {
            throw new Error("指定忽略的 key 列表时，必须比较两个对象");
        }
        const _a = structuredClone(a);
        const _b = structuredClone(b);
        ignoreList.forEach(key => {
            delete _a[key];
            delete _b[key];
        });
        return (0, is_equal_1.default)(_a, _b);
    }
    return (0, is_equal_1.default)(a, b);
}
exports.isEqual = isEqual;
/**
 * 比较两个对象的某些属性
 * @param {string[]} keyList - 比较的 key 集合
 */
function compareProperties(a, b, ...keyList) {
    return keyList.every(key => {
        return isEqual(a[key], b[key]);
    });
}
exports.compareProperties = compareProperties;
/** 身份证正则 */
exports.idReg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;
/**
 * 判断是否是合法身份证号
 * @param {string} id - 身份证号
 */
function isLegalId(id) {
    return exports.idReg.test(id);
}
exports.isLegalId = isLegalId;
/**
 * 将字符串或者字符串的数组变成字符串数组
 * @param {string | (string[])} id - 字符串或者字符串数组
 */
function stringToArray(id) {
    return typeof id === "string" ? [id] : id;
}
exports.stringToArray = stringToArray;
/**
 * 将身份证打码
 * @param {string} id - 身份证号
 */
function coverIdWithMosaics(id) {
    if (isLegalId(id)) {
        throw new Error("非法身份证号");
    }
    return id.replace(/^(.{6})(.{8})(.+)$/, `$1********$3`);
}
exports.coverIdWithMosaics = coverIdWithMosaics;
/**
 * 将字符串转换为数字
 * @param {string} value - 字符串
 * @param {number | StringToNumberOption} option - 转换的选项
 */
function stringToNumber(value, option) {
    const v = typeof option === "object" && option.float ? parseFloat(value) : parseInt(value);
    if (option !== undefined && option !== null) {
        if (typeof option === "number") {
            if (isNaN(v)) {
                return option;
            }
            return v;
        }
        if (isNaN(v)) {
            return option.default;
        }
        if (option.min !== undefined && v < option.min) {
            return option.min;
        }
        if (option.max !== undefined && v > option.max) {
            return option.max;
        }
    }
    return v;
}
exports.stringToNumber = stringToNumber;
/** 获取一个每帧执行一次的函数 */
function getRunAtFrame() {
    let signal;
    return function runAtFrame(fun) {
        cancelAnimationFrame(signal);
        signal = requestAnimationFrame(fun);
    };
}
exports.getRunAtFrame = getRunAtFrame;
/**
 * 从身份证中获取年龄
 * @param {string} id - 身份证号
 */
function getAgeFromId(id) {
    if (!isLegalId(id))
        throw new Error("非法身份证号");
    return new Date().getFullYear() - Number(id.slice(6, 10));
}
exports.getAgeFromId = getAgeFromId;
/**
 * 立即执行，并且定期再执行的函数
 * @param {Function} callback - 回调函数
 * @param {number} period - 周期
 */
function setPeriod(callback, period) {
    callback();
    return setInterval(callback, period);
}
exports.setPeriod = setPeriod;
/**
 * 给数字补0
 * @param {number} number - 需要补0的数字，自然数
 * @param {number} length - 补足的长度，大于等于上一个数的位数
 */
function addZero(number, length = 2) {
    if (!Number.isInteger(number) || number < 0)
        throw new Error("The `number` must be an integer greater than or equal to 0!");
    const currentLength = number === 0 ? 1 : Math.floor(Math.log10(number)) + 1;
    if (!Number.isInteger(length) || length < currentLength)
        throw new Error("The `length` must be an integer greater than or equal to the length of `number`!");
    const lack = length - currentLength;
    if (lack <= 0)
        return String(number);
    return `${Array(lack).fill(0).join("")}${number}`;
}
exports.addZero = addZero;
/** 获取随机姓名 */
function getRandomName() {
    const firstList = ["张", "李", "王", "赵", "钱", "孙", "李", "吴", "徐", "周", "庞", "关", "朱"];
    const secondList = ["子", "文", "涛", "权", "明", "亮", "盛", "雨", "宇", "冰", "浩", "腾", "勇", "雪"];
    return `${getRandomItemFromList(firstList)}${getRandomItemFromList(secondList)}${possibility(0.66) ? getRandomItemFromList(secondList) : ""}`;
}
exports.getRandomName = getRandomName;
/** ECharts 的配色 */
exports.ECHARTS_COLOR = {
    blue: "#5470c6",
    green: "#91cc75",
    yellow: "#fac858",
    red: "#ee6666",
    skyblue: "#73c0de",
    orange: "#fc8452",
    deepGreen: "#3ba172",
    purple: "#9a60b4"
};
/** ECharts 的配色列表 */
exports.ECHARTS_COLOR_LIST = ["#ee6666", "#fac858", "#91cc75", "#5470c6", "#9a60b4", "#fc8452", "#3ba172", "#71bddb"];
/** 一个经度的距离 */
exports.ONE_LNG = 92693;
/** 一个纬度的距离 */
exports.ONE_LAT = 111319;
//# sourceMappingURL=index.js.map