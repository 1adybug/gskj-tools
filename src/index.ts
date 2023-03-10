/**
 * 休眠指定时间
 * @param {number} time - 休眠的毫秒数
 */
export async function sleep(time: number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(1)
        }, time)
    })
}

/**
 * 取两个整数之间的随机数
 * @param {string} start - 开始的数字，闭区间
 * @param {string} end - 结束的数字，闭区间
 */
export function getRandomBetween(start: number, end: number) {
    if (!Number.isInteger(start)) throw new Error("开始的数字必须是整数")
    if (!Number.isInteger(end)) throw new Error("结束的数字必须是整数")
    if (end < start) throw new Error("结束的数字必须大于或者等于开始的数字")
    return start + Math.floor(Math.random() * (end + 1 - start))
}

/**
 * 取数组中的随机一个元素
 * @param list - 数组
 */
export function getRandomItemFromList<T>(list: T[]): T {
    return list[getRandomBetween(0, list.length - 1)]
}

/** 0-9集合 */
export const digitList: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * 获取随机手机号
 */
export function getRandomPhone() {
    const secondList = [3, 5, 7, 8, 9]

    const thirdList: Record<string, number[]> = {
        3: digitList,
        5: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        7: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        8: digitList,
        9: [1, 5, 8, 9]
    }

    const second = getRandomItemFromList(secondList)

    const third = getRandomItemFromList(thirdList[second])

    return `1${second}${third}${Array(8)
        .fill(0)
        .map(() => getRandomItemFromList(digitList))
        .join("")}`
}

/**
 * 可能性
 * @param {number} p - 可能性
 */
export function possibility(p: number) {
    return Math.random() < p
}

/** 车牌号可用的字母 */
export const plateNoAlphabetList: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

/**
 * 获取随机一位车牌号
 */
export function getRandomPlateNoItem() {
    return possibility(0.5) ? getRandomItemFromList(digitList) : getRandomItemFromList(plateNoAlphabetList)
}

/**
 * 获取一个随机车牌号
 * @param start - 开始的两位，默认是苏H
 */
export function getRandomPlateNo(start?: string) {
    return `${start ?? "苏H"}${Array(5).fill(0).map(getRandomPlateNoItem).join("")}`
}

/** 获取随机年份 */
export function getRandomYear() {
    return new Date().getFullYear() - getRandomBetween(20, 50)
}

/** 获取一个月的长度，忽略闰年 */
export function getMonthLength(month: number) {
    const a: number[] = [1, 3, 5, 7, 8, 10, 12]
    const b: number[] = [4, 6, 9, 11]
    if (a.includes(month)) return 31
    if (b.includes(month)) return 30
    return 28
}

/** 获取一个随机月份日期 */
export function getRandomDate() {
    const month = getRandomBetween(1, 12)
    const monthStr = `${month < 10 ? 0 : ""}${month}`
    const date = getRandomBetween(1, getMonthLength(month))
    const dateStr = `${date < 10 ? 0 : ""}${date}`
    return `${monthStr}${dateStr}`
}

/**
 * 获取一个随机身份证
 * @param area - 区号
 *
 */
export function getRandomId(area?: number) {
    if (typeof area === "number") {
        if (!Number.isInteger(area)) throw new Error("区号必须是整数")
        if (area < 110000 || area > 820000) throw new Error("区号必须在 110000 和 820000 之间")
    }

    return `${area ?? "380812"}${getRandomYear()}${getRandomDate()}${getRandomBetween(0, 9)}${getRandomBetween(0, 9)}${getRandomBetween(0, 9)}${getRandomBetween(0, 9)}`
}

/** 判断两个数字是否相等 */
export function twoNumberIsEqual(a: number, b: number) {
    if (isNaN(a) && isNaN(b)) return true
    if (a === b) return true
    return Math.abs(a - b) < Number.EPSILON
}

/**
 * 获取两个经纬度坐标之间的距离
 * @param {number[]} coord1 - 经纬度一
 * @param {number[]} coord2 - 经纬度二
 */
export function getDistance(coord1: number[], coord2: number[]) {
    const [lng1, lat1] = coord1
    const [lng2, lat2] = coord2
    function toRadians(d: number) {
        return (d * Math.PI) / 180
    }
    const radLat1 = toRadians(lat1)
    const radLat2 = toRadians(lat2)
    const deltaLat = radLat1 - radLat2
    const deltaLng = toRadians(lng1) - toRadians(lng2)
    const dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)))
    return dis * 6378.137
}

/**
 * 获取对象的某些属性
 * @param {object} obj - 对象
 * @param {string[]} keyList - 需要取出的 key 集合
 */
export function getProperties<T, K extends keyof T>(obj: T, ...keyList: K[]): Pick<T, K> {
    const result: any = {}
    keyList.forEach(key => {
        result[key] = obj[key]
    })
    return result
}

/**
 * 判断一个变量是否是非 null 的对象
 */
export function isObject(a: any) {
    return typeof a === "object" && a !== null
}

/**
 * 比较两个变量是否相等
 */
export function equal(a: any, b: any): boolean {
    if (typeof a !== typeof b) return false
    if (isObject(a) && isObject(b)) {
        const aKeyList = Object.keys(a)
        const bKeyList = Object.keys(b)
        if (aKeyList.length !== bKeyList.length) return false
        for (const key of aKeyList) {
            if (!bKeyList.includes(key)) return false
            return equal(a[key], b[key])
        }
        return true
    }
    if (typeof a === "number") return twoNumberIsEqual(a, b)
    return a === b
}

/**
 * 比较两个变量是否相等
 * @param {string[]} ignoreList - 忽略的 key 集合
 */
export function isEqual<A = any, B = any>(a: A, b: B, ...ignoreList: (keyof A | keyof B)[]) {
    if (ignoreList.length > 0) {
        if (typeof a !== "object" || typeof b !== "object") {
            throw new Error("指定忽略的 key 列表时，必须比较两个对象")
        }
        const _a = structuredClone(a)
        const _b = structuredClone(b)
        ignoreList.forEach(key => {
            delete _a[key]
            delete _b[key]
        })
        return equal(_a, _b)
    }
    return equal(a, b)
}

// export function isEqual<A = any, B = any>(a: A, b: B, ...ignoreList: (keyof A | keyof B)[]) {
//     if (ignoreList.length > 0) {
//         if (typeof a !== "object" || typeof b !== "object") {
//             throw new Error("指定忽略的 key 列表时，必须比较两个对象")
//         }
//         const _a = structuredClone(a)
//         const _b = structuredClone(b)
//         ignoreList.forEach(key => {
//             delete _a[key]
//             delete _b[key]
//         })
//         return equal(_a, _b)
//     }
//     return equal(a, b)
// }

/**
 * 比较两个对象的某些属性
 * @param {string[]} keyList - 比较的 key 集合
 */
export function compareProperties<T>(a: T, b: T, ...keyList: (keyof T)[]): boolean {
    return keyList.every(key => {
        return isEqual(a[key], b[key])
    })
}

/** 身份证正则 */
export const idReg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/

/**
 * 判断是否是合法身份证号
 * @param {string} id - 身份证号
 */
export function isLegalId(id: string): boolean {
    return idReg.test(id)
}

/**
 * 将字符串或者字符串的数组变成字符串数组
 * @param {string | (string[])} id - 字符串或者字符串数组
 */
export function stringToArray(id: string | string[]) {
    return typeof id === "string" ? [id] : id
}

/**
 * 将身份证打码
 * @param {string} id - 身份证号
 */
export function coverIdWithMosaics(id: string) {
    if (isLegalId(id)) {
        throw new Error("非法身份证号")
    }
    return id.replace(/^(.{6})(.{8})(.+)$/, `$1********$3`)
}

/** 格式化选项 */
export interface StringToNumberOption {
    /** 是否转换成小数，默认为 false */
    float?: boolean
    /** 最小值，低于最小值将会输出最小值 */
    min?: number
    /** 最大值，大于最大值将会输出最大值 */
    max?: number
    /** NaN 时输出的值 */
    default: number
}

/**
 * 将字符串转换为数字
 * @param {string} value - 字符串
 * @param {number | StringToNumberOption} option - 转换的选项
 */
export function stringToNumber(value: string, option?: number | StringToNumberOption) {
    const v = typeof option === "object" && option.float ? parseFloat(value) : parseInt(value)

    if (option !== undefined && option !== null) {
        if (typeof option === "number") {
            if (isNaN(v)) {
                return option
            }
            return v
        }
        if (isNaN(v)) {
            return option.default
        }
        if (option.min !== undefined && v < option.min) {
            return option.min
        }
        if (option.max !== undefined && v > option.max) {
            return option.max
        }
    }

    return v
}

/** 获取一个每帧执行一次的函数 */
export function getRunAtFrame() {
    let signal: number
    return function runAtFrame(fun: () => void) {
        cancelAnimationFrame(signal)
        signal = requestAnimationFrame(fun)
    }
}

/**
 * 从身份证中获取年龄
 * @param {string} id - 身份证号
 */
export function getAgeFromId(id: string) {
    if (!isLegalId(id)) throw new Error("非法身份证号")
    return new Date().getFullYear() - Number(id.slice(6, 10))
}

/**
 * 立即执行，并且定期再执行的函数
 * @param {Function} callback - 回调函数
 * @param {number} period - 周期
 */
export function setPeriod(callback: () => void, period: number) {
    callback()
    return setInterval(callback, period)
}

/**
 * 给数字补0
 * @param {number} number - 需要补0的数字，自然数
 * @param {number} length - 补足的长度，大于等于上一个数的位数
 */
export function addZero(number: number, length: number = 2) {
    if (!Number.isInteger(number) || number < 0) throw new Error("The `number` must be an integer greater than or equal to 0!")
    const currentLength = number === 0 ? 1 : Math.floor(Math.log10(number)) + 1
    if (!Number.isInteger(length) || length < currentLength) throw new Error("The `length` must be an integer greater than or equal to the length of `number`!")
    const lack = length - currentLength
    if (lack <= 0) return String(number)
    return `${Array(lack).fill(0).join("")}${number}`
}

/** 获取随机姓名 */
export function getRandomName() {
    const firstList = ["张", "李", "王", "赵", "钱", "孙", "李", "吴", "徐", "周", "庞", "关", "朱"]

    const secondList = ["子", "文", "涛", "权", "明", "亮", "盛", "雨", "宇", "冰", "浩", "腾", "勇", "雪"]

    return `${getRandomItemFromList(firstList)}${getRandomItemFromList(secondList)}${possibility(0.66) ? getRandomItemFromList(secondList) : ""}`
}

/** ECharts 的配色 */
export const ECHARTS_COLOR = {
    blue: "#5470c6",
    green: "#91cc75",
    yellow: "#fac858",
    red: "#ee6666",
    skyblue: "#73c0de",
    orange: "#fc8452",
    deepGreen: "#3ba172",
    purple: "#9a60b4"
}

/** ECharts 的配色列表 */
export const ECHARTS_COLOR_LIST = ["#ee6666", "#fac858", "#91cc75", "#5470c6", "#9a60b4", "#fc8452", "#3ba172", "#71bddb"]

/** 一个经度的距离 */
export const ONE_LNG = 92693

/** 一个纬度的距离 */
export const ONE_LAT = 111319
