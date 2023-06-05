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
exports.get51Coord = exports.getRealCoord = exports.coordCheck = exports.coordIsNumberArray = exports.coordStringToNumber = exports.parseNumber = exports.isNumber = exports.isPositiveInteger = exports.isPositiveNumber = exports.getPointToLineMinDistance = exports.getArray = exports.size = exports.px = exports.getPropertiesIsModified = exports.ONE_LAT = exports.ONE_LNG = exports.ECHARTS_COLOR_LIST = exports.ECHARTS_COLOR = exports.getRandomName = exports.addZero = exports.setPeriod = exports.getSexFromId = exports.getAgeFromId = exports.getRunAtFrame = exports.stringToNumber = exports.coverIdWithMosaics = exports.stringToArray = exports.isLegalId = exports.idReg = exports.compareProperties = exports.compareWithoutProperties = exports.equal = exports.isObject = exports.getProperties = exports.getCoord = exports.getDistance = exports.twoNumberIsEqual = exports.getRandomId = exports.getRandomDate = exports.getMonthLength = exports.getRandomYear = exports.getRandomPlateNo = exports.getRandomPlateNoItem = exports.plateNoAlphabetList = exports.possibility = exports.getRandomPhone = exports.digitList = exports.getRandomItemFromList = exports.getRandomBetween = exports.sleep = void 0;
exports.extendArrayPrototype = exports.canCoordsBePolygon = exports.ifTwoSegmentsIntersect = exports.getHeaders = void 0;
const is_equal_1 = __importDefault(require("is-equal"));
const robust_segment_intersect_1 = __importDefault(require("robust-segment-intersect"));
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
    if (isNaN(a) && isNaN(b))
        return true;
    if (a === b)
        return true;
    return Math.abs(a - b) < Number.EPSILON;
}
exports.twoNumberIsEqual = twoNumberIsEqual;
/**
 * 获取两个经纬度坐标之间的距离
 * @param {number[]} coord1 - 经纬度一，[维度, 经度]
 * @param {number[]} coord2 - 经纬度二，[维度, 经度]
 * @returns {number} 距离：米
 */
function getDistance(coord1, coord2) {
    function toRadians(d) {
        return (d * Math.PI) / 180;
    }
    const [lat1, lng1] = coord1;
    if (lat1 < 0) {
        throw new Error("经纬度1的纬度小于0°");
    }
    if (lat1 > 90) {
        throw new Error("经纬度1的纬度大于90°");
    }
    if (lng1 < 0) {
        throw new Error("经纬度1的经度小于0°");
    }
    if (lng1 > 180) {
        throw new Error("经纬度1的经度大于180°");
    }
    const [lat2, lng2] = coord2;
    if (lat2 < 0) {
        throw new Error("经纬度2的纬度小于0°");
    }
    if (lat2 > 90) {
        throw new Error("经纬度2的纬度大于90°");
    }
    if (lng2 < 0) {
        throw new Error("经纬度2的经度小于0°");
    }
    if (lng2 > 180) {
        throw new Error("经纬度2的经度大于180°");
    }
    const radLat1 = toRadians(lat1);
    const radLat2 = toRadians(lat2);
    const deltaLat = radLat1 - radLat2;
    const deltaLng = toRadians(lng1) - toRadians(lng2);
    const dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return dis * 6378137;
}
exports.getDistance = getDistance;
/**
 * 获取两个经纬度坐标之间的距离
 * @param {number[]} coord1 - 经纬度一，[维度, 经度]
 * @param {number[]} coord2 - 经纬度二，[维度, 经度]
 * @param {number} d1 - 距离一，单位：米
 * @param {number} d2 - 距离二，单位：米
 * @returns {number[][]} - 可能的两个坐标
 */
function getCoord(coord1, coord2, d1, d2) {
    const [lat1, lng1] = coord1;
    const [lat2, lng2] = coord2;
    const [m, n] = [lat2 - lat1, lng2 - lng1];
    const s = getDistance(coord1, [lat2, lng1]) / m;
    const t = getDistance(coord1, [lat1, lng2]) / n;
    const e = m * s;
    const f = n * t;
    const g = -e / f;
    const h = (e ** 2 + f ** 2 + d1 ** 2 - d2 ** 2) / (2 * f);
    const a = g ** 2 + 1;
    const b = 2 * g * h;
    const c = h ** 2 - d1 ** 2;
    const ox1 = (-b + (b ** 2 - 4 * a * c) ** (1 / 2)) / (2 * a);
    const oy1 = g * ox1 + h;
    const ox2 = (-b - (b ** 2 - 4 * a * c) ** (1 / 2)) / (2 * a);
    const oy2 = g * ox2 + h;
    return [
        [ox1 / s + lat1, oy1 / t + lng1],
        [ox2 / s + lat1, oy2 / t + lng1]
    ];
}
exports.getCoord = getCoord;
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
 * 判断一个变量是否是非 null 的对象
 */
function isObject(a) {
    return typeof a === "object" && a !== null;
}
exports.isObject = isObject;
/**
 * 比较两个变量是否相等
 */
function equal(a, b) {
    return (0, is_equal_1.default)(a, b);
}
exports.equal = equal;
/**
 * 比较两个变量是否相等
 * @param {string[]} ignoreList - 忽略的 key 集合
 */
function compareWithoutProperties(a, b, ...ignoreList) {
    if (ignoreList.length === 0)
        throw new Error(`ignoreList 为空`);
    return Object.keys(a)
        .filter(key => !ignoreList.includes(key))
        .every(key => equal(a[key], b[key]));
}
exports.compareWithoutProperties = compareWithoutProperties;
/**
 * 比较两个对象的某些属性
 * @param {string[]} keyList - 比较的 key 集合
 */
function compareProperties(a, b, ...keyList) {
    if (keyList.length === 0)
        throw new Error(`keyList 为空`);
    return keyList.every(key => {
        return equal(a[key], b[key]);
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
 * 从身份证中获取性别，0是女性，1是男性
 * @param {string} id - 身份证号
 */
function getSexFromId(id) {
    if (!isLegalId(id))
        throw new Error("非法身份证号");
    return Number(id.slice(-2, -1)) % 2;
}
exports.getSexFromId = getSexFromId;
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
/** 得到一个函数，用于判断两个对象之间某些属性是否改变 */
function getPropertiesIsModified(a, b) {
    return function (...keyList) {
        return keyList.some(key => {
            return !equal(a[key], b[key]);
        });
    };
}
exports.getPropertiesIsModified = getPropertiesIsModified;
/** 将数字转换为px */
function px(x) {
    return typeof x === "number" ? `${x}px` : undefined;
}
exports.px = px;
/** 将字符串或者数字转换为尺寸 */
function size(x) {
    return typeof x === "string" ? x : typeof x === "number" ? `${x}px` : undefined;
}
exports.size = size;
/** 获得一个函数循环出来的数组 */
function getArray(length, fun) {
    return Array(length)
        .fill(0)
        .map(($, index) => fun(index));
}
exports.getArray = getArray;
/** 获取点到线的最短距离 */
function getPointToLineMinDistance(point, line, getDis) {
    const method = getDis || ((a, b) => Math.pow(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2), 1 / 2));
    if (point.length !== 2)
        throw new Error("无效坐标");
    if (line.length < 2)
        throw new Error("线的坐标至少含有两个坐标");
    const [x0, y0] = point;
    return Math.min(...line
        .slice(0, -1)
        .map((item, index) => [item, line[index + 1]])
        .map(item => {
        const [[x1, y1], [x2, y2]] = item;
        if (x1 === x2 && y1 === y2)
            return method(point, [x1, y1]);
        if ((x0 === x1 && y0 === y1) || (x0 === x2 && y0 === y2))
            return 0;
        if (x1 === x2) {
            if ((y0 - y1) * (y0 - y2) < 0)
                return method(point, [x1, y0]);
            return Math.min(method(point, [x1, y1]), method(point, [x2, y2]));
        }
        if (y1 === y2) {
            if ((x0 - x1) * (x0 - x2) < 0)
                return method(point, [x0, y1]);
            return Math.min(method(point, [x1, y1]), method(point, [x2, y2]));
        }
        const k = (y2 - y1) / (x2 - x1);
        const x = (x0 / k + y0 + k * x1 - y1) / (k + 1 / k);
        const y = (y1 / k + x0 + k * y0 - x1) / (k + 1 / k);
        if ((x - x1) * (x - x2) < 0 && (y - y1) * (y - y2) < 0)
            return method(point, [x, y]);
        return Math.min(method(point, [x1, y1]), method(point, [x2, y2]));
    }));
}
exports.getPointToLineMinDistance = getPointToLineMinDistance;
/** 是否是正数 */
function isPositiveNumber(x) {
    return typeof x === "number" && x > 0;
}
exports.isPositiveNumber = isPositiveNumber;
/** 是否是正整数 */
function isPositiveInteger(x) {
    return Number.isInteger(x) && x > 0;
}
exports.isPositiveInteger = isPositiveInteger;
/** 是整数或者小数 */
function isNumber(x) {
    return typeof x === "number" && /^[\d]*\.?[\d]+$/.test(String(x));
}
exports.isNumber = isNumber;
function parseNumber(str) {
    const result = Number(str);
    if (isNaN(result))
        throw new Error(`${str} 不可以被转换为数字`);
    if (String(result) !== str)
        console.warn(`${str} 转换为 ${result}`);
    return result;
}
exports.parseNumber = parseNumber;
function coordStringToNumber(str) {
    if (str.includes(":")) {
        const strs = str.split(":");
        if (strs.length !== 3)
            throw new Error(`${str} 不可以被转换为数字`);
        const nums = strs.map(parseNumber);
        const [x, y, z] = nums;
        return x + y / 60 + z / 3600;
    }
    return parseNumber(str);
}
exports.coordStringToNumber = coordStringToNumber;
function coordIsNumberArray(coord) {
    if (coord.length !== 2)
        throw new Error(`${JSON.stringify(coord)} 的长度不为2`);
    if (typeof coord[0] === "number" && typeof coord[1] === "number")
        return true;
    if (typeof coord[0] === "string" && typeof coord[1] === "string")
        return false;
    throw new Error(`${JSON.stringify(coord)} 的类型有误`);
}
exports.coordIsNumberArray = coordIsNumberArray;
/** 检查坐标是否合法，合法则返回正确的坐标 */
function coordCheck(coord) {
    if (coord.length !== 2)
        throw new Error(`${JSON.stringify(coord)} 的长度不为2`);
    if (typeof coord[0] !== "number" || isNaN(coord[0]) || typeof coord[1] !== "number" || isNaN(coord[1]))
        throw new Error(`${JSON.stringify(coord)} 的类型有误`);
    const [y, x] = coord;
    if (Math.abs(y) <= 90 && Math.abs(x) <= 180) {
        return [y, x];
    }
    if (Math.abs(x) <= 90 && Math.abs(y) <= 180) {
        throw new Error(`${JSON.stringify(coord)} 似乎将经纬度互换，请检查是否有误`);
    }
    throw new Error(`${JSON.stringify(coord)} 的经纬度超出范围`);
}
exports.coordCheck = coordCheck;
/** 将坐标信息转换为真实坐标，即`[维度, 经度]`的格式 */
function getRealCoord(coord) {
    if (typeof coord === "string") {
        const reg = /^[0-9a-z]+$/;
        const nums = coord
            .replace(/\:/g, "colon")
            .replace(/\-/g, "minus")
            .replace(/\./g, "point")
            .split(/\b/)
            .filter(str => reg.test(str))
            .map(str => str.replace(/colon/g, ":").replace(/minus/g, "-").replace(/point/g, "."))
            .map(coordStringToNumber);
        if (nums.length !== 2)
            throw new Error(`${coord} 的格式有误`);
        return coordCheck(nums);
    }
    if (Array.isArray(coord)) {
        if (coordIsNumberArray(coord)) {
            return coordCheck(coord);
        }
        return coordCheck(coord.map(coordStringToNumber));
    }
    if ("lat" in coord && "lng" in coord) {
        return getRealCoord([coord.lat, coord.lng]);
    }
    if ("latitude" in coord && "longitude" in coord) {
        return getRealCoord([coord.latitude, coord.longitude]);
    }
    throw new Error(`${coord} 的格式有误`);
}
exports.getRealCoord = getRealCoord;
/** 将任意格式的坐标转换为51坐标 */
function get51Coord(coord) {
    const [y, x] = getRealCoord(coord);
    return `${x},${y}`;
}
exports.get51Coord = get51Coord;
/** 将浏览器中直接复制的 headers 转换为对象 */
function getHeaders(headers) {
    const result = {};
    headers
        .split("\n")
        .map(str => str.trim())
        .filter(str => str && !str.startsWith(":"))
        .forEach(str => {
        const index = str.indexOf(":");
        if (index < 1) {
            throw new Error(`无效的字段${str}`);
        }
        const key = str.slice(0, index).trim();
        const value = str.slice(index + 1).trim();
        result[key] = value;
    });
    return result;
}
exports.getHeaders = getHeaders;
/**
 * 判断两个线段是否相交
 * @param {number[][]} line1 - 线段一
 * @param {number[][]} line2 - 线段二
 */
function ifTwoSegmentsIntersect(line1, line2) {
    const [a, b] = line1;
    const [c, d] = line2;
    return (0, robust_segment_intersect_1.default)(a, b, c, d);
}
exports.ifTwoSegmentsIntersect = ifTwoSegmentsIntersect;
/**
 * 判断多个点能否围成多边形
 * @param {number[][]} coords - 多边形的顶点
 */
function canCoordsBePolygon(coords) {
    const { length } = coords;
    if (length < 3)
        return false;
    const lines = coords.map((coord, index) => [coord, coords[(index + 1) % length]]);
    for (let i = 0; i < length; i++) {
        for (let j = i + 2; j < length; j++) {
            if (i === 0 && j === length - 1) {
                continue;
            }
            if (ifTwoSegmentsIntersect(lines[i], lines[j])) {
                return false;
            }
        }
    }
    return true;
}
exports.canCoordsBePolygon = canCoordsBePolygon;
/** 为数组添加方法 */
function extendArrayPrototype() {
    if (!Array.prototype.hasOwnProperty("with")) {
        class A {
            static with(index, value) {
                if (index >= this.length) {
                    throw new RangeError(`Invalid index : ${index}`);
                }
                const $ = [...this];
                $[index] = value;
                return $;
            }
        }
        Array.prototype.with = A.with;
    }
    if (!Array.prototype.hasOwnProperty("toReversed")) {
        function toReversed() {
            const $ = [...this];
            $.reverse();
            return $;
        }
        Array.prototype.toReversed = toReversed;
    }
    if (!Array.prototype.hasOwnProperty("toShifted")) {
        function toShifted() {
            const $ = [...this];
            $.shift();
            return $;
        }
        Array.prototype.toShifted = toShifted;
    }
    if (!Array.prototype.hasOwnProperty("toPopped")) {
        function toPopped() {
            const $ = [...this];
            $.pop();
            return $;
        }
        Array.prototype.toPopped = toPopped;
    }
    if (!Array.prototype.hasOwnProperty("toSorted")) {
        function toSorted(compareFn) {
            const $ = [...this];
            $.sort(compareFn);
            return $;
        }
        Array.prototype.toSorted = toSorted;
    }
    if (!Array.prototype.hasOwnProperty("toSpliced")) {
        function toSpliced(start, deleteCount, ...items) {
            const $ = [...this];
            if (deleteCount === undefined) {
                $.splice(start);
            }
            else {
                $.splice(start, deleteCount, ...items);
            }
            return $;
        }
        Array.prototype.toSpliced = toSpliced;
    }
    if (!Array.prototype.hasOwnProperty("toPushed")) {
        function toPushed(...items) {
            const $ = [...this];
            $.push(...items);
            return $;
        }
        Array.prototype.toPushed = toPushed;
    }
    if (!Array.prototype.hasOwnProperty("toUnshifted")) {
        function toUnshifted(...items) {
            const $ = [...this];
            $.unshift(...items);
            return $;
        }
        Array.prototype.toUnshifted = toUnshifted;
    }
}
exports.extendArrayPrototype = extendArrayPrototype;
//# sourceMappingURL=index.js.map