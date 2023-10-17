import Equal from "is-equal"
import Cookies from "js-cookie"
import { useEffect, useId, useInsertionEffect, useMemo, useRef, useState } from "react"
import type { SetURLSearchParams } from "react-router-dom"
import robustSegmentIntersect from "robust-segment-intersect"
import md5 from "md5"

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
 * @param {number[]} coord1 - 经纬度一，[维度, 经度]
 * @param {number[]} coord2 - 经纬度二，[维度, 经度]
 * @returns {number} 距离：米
 */
export function getDistance(coord1: number[], coord2: number[]): number {
    function toRadians(d: number) {
        return (d * Math.PI) / 180
    }
    const [lat1, lng1] = coord1
    if (lat1 < 0) {
        throw new Error("经纬度1的纬度小于0°")
    }
    if (lat1 > 90) {
        throw new Error("经纬度1的纬度大于90°")
    }
    if (lng1 < 0) {
        throw new Error("经纬度1的经度小于0°")
    }
    if (lng1 > 180) {
        throw new Error("经纬度1的经度大于180°")
    }
    const [lat2, lng2] = coord2
    if (lat2 < 0) {
        throw new Error("经纬度2的纬度小于0°")
    }
    if (lat2 > 90) {
        throw new Error("经纬度2的纬度大于90°")
    }
    if (lng2 < 0) {
        throw new Error("经纬度2的经度小于0°")
    }
    if (lng2 > 180) {
        throw new Error("经纬度2的经度大于180°")
    }
    const radLat1 = toRadians(lat1)
    const radLat2 = toRadians(lat2)
    const deltaLat = radLat1 - radLat2
    const deltaLng = toRadians(lng1) - toRadians(lng2)
    const dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)))
    return dis * 6378137
}

/**
 * 获取两个经纬度坐标之间的距离
 * @param {number[]} coord1 - 经纬度一，[维度, 经度]
 * @param {number[]} coord2 - 经纬度二，[维度, 经度]
 * @param {number} d1 - 距离一，单位：米
 * @param {number} d2 - 距离二，单位：米
 * @returns {number[][]} - 可能的两个坐标
 */
export function getCoord(coord1: number[], coord2: number[], d1: number, d2: number): number[][] {
    const [lat1, lng1] = coord1
    const [lat2, lng2] = coord2
    const [m, n] = [lat2 - lat1, lng2 - lng1]
    const s = getDistance(coord1, [lat2, lng1]) / m
    const t = getDistance(coord1, [lat1, lng2]) / n
    const e = m * s
    const f = n * t
    const g = -e / f
    const h = (e ** 2 + f ** 2 + d1 ** 2 - d2 ** 2) / (2 * f)
    const a = g ** 2 + 1
    const b = 2 * g * h
    const c = h ** 2 - d1 ** 2
    const ox1 = (-b + (b ** 2 - 4 * a * c) ** (1 / 2)) / (2 * a)
    const oy1 = g * ox1 + h
    const ox2 = (-b - (b ** 2 - 4 * a * c) ** (1 / 2)) / (2 * a)
    const oy2 = g * ox2 + h
    return [
        [ox1 / s + lat1, oy1 / t + lng1],
        [ox2 / s + lat1, oy2 / t + lng1]
    ]
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
    return Equal(a, b)
}

/**
 * 比较两个变量是否相等
 * @param {string[]} ignoreList - 忽略的 key 集合
 */
export function compareWithoutProperties<T extends Object>(a: T, b: T, ...ignoreList: (keyof T)[]): boolean {
    if (ignoreList.length === 0) throw new Error(`ignoreList 为空`)
    return Object.keys(a)
        .filter(key => !ignoreList.includes(key as keyof T))
        .every(key => equal(a[key as keyof T], b[key as keyof T]))
}

/**
 * 比较两个对象的某些属性
 * @param {string[]} keyList - 比较的 key 集合
 */
export function compareProperties<T extends Object>(a: T, b: T, ...keyList: (keyof T)[]): boolean {
    if (keyList.length === 0) throw new Error(`keyList 为空`)
    return keyList.every(key => {
        return equal(a[key], b[key])
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
 * 从身份证中获取性别，0是女性，1是男性
 * @param {string} id - 身份证号
 */
export function getSexFromId(id: string) {
    if (!isLegalId(id)) throw new Error("非法身份证号")
    return Number(id.slice(-2, -1)) % 2
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

/** 得到一个函数，用于判断两个对象之间某些属性是否改变 */
export function getPropertiesIsModified<T>(a: T, b: T): (...keyList: (keyof T)[]) => boolean {
    return function (...keyList: (keyof T)[]) {
        return keyList.some(key => {
            return !equal(a[key], b[key])
        })
    }
}

/** 将数字转换为px */
export function px(x: number | undefined | null) {
    return typeof x === "number" ? `${x}px` : undefined
}

/** 将字符串或者数字转换为尺寸 */
export function size(x: string | number | undefined | null) {
    return typeof x === "string" ? x : typeof x === "number" ? `${x}px` : undefined
}

/** 获得一个函数循环出来的数组 */
export function getArray<T>(length: number, fun: (index: number) => T): T[] {
    return Array(length)
        .fill(0)
        .map(($, index) => fun(index))
}

/** 获取点到线的最短距离 */
export function getPointToLineMinDistance(point: number[], line: number[][], getDis?: (a: number[], b: number[]) => number) {
    const method = getDis || ((a: number[], b: number[]) => Math.pow(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2), 1 / 2))
    if (point.length !== 2) throw new Error("无效坐标")
    if (line.length < 2) throw new Error("线的坐标至少含有两个坐标")
    const [x0, y0] = point
    return Math.min(
        ...line
            .slice(0, -1)
            .map((item, index) => [item, line[index + 1]])
            .map(item => {
                const [[x1, y1], [x2, y2]] = item
                if (x1 === x2 && y1 === y2) return method(point, [x1, y1])
                if ((x0 === x1 && y0 === y1) || (x0 === x2 && y0 === y2)) return 0
                if (x1 === x2) {
                    if ((y0 - y1) * (y0 - y2) < 0) return method(point, [x1, y0])
                    return Math.min(method(point, [x1, y1]), method(point, [x2, y2]))
                }
                if (y1 === y2) {
                    if ((x0 - x1) * (x0 - x2) < 0) return method(point, [x0, y1])
                    return Math.min(method(point, [x1, y1]), method(point, [x2, y2]))
                }
                const k = (y2 - y1) / (x2 - x1)
                const x = (x0 / k + y0 + k * x1 - y1) / (k + 1 / k)
                const y = (y1 / k + x0 + k * y0 - x1) / (k + 1 / k)
                if ((x - x1) * (x - x2) < 0 && (y - y1) * (y - y2) < 0) return method(point, [x, y])
                return Math.min(method(point, [x1, y1]), method(point, [x2, y2]))
            })
    )
}

/** 是否是正数 */
export function isPositiveNumber(x: number) {
    return typeof x === "number" && x > 0
}

/** 是否是正整数 */
export function isPositiveInteger(x: number) {
    return Number.isInteger(x) && x > 0
}

/** 是整数或者小数 */
export function isNumber(x: any): x is number {
    return typeof x === "number" && /^[\d]*\.?[\d]+$/.test(String(x))
}

export function parseNumber(str: string) {
    const result = Number(str)
    if (isNaN(result)) throw new Error(`${str} 不可以被转换为数字`)
    if (String(result) !== str) console.warn(`${str} 转换为 ${result}`)
    return result
}

export function coordStringToNumber(str: string) {
    if (str.includes(":")) {
        const strs = str.split(":")
        if (strs.length !== 3) throw new Error(`${str} 不可以被转换为数字`)
        const nums = strs.map(parseNumber)
        const [x, y, z] = nums
        return x + y / 60 + z / 3600
    }
    return parseNumber(str)
}

export interface CoordObj1 {
    lat: number
    lng: number
}

export interface CoordObj2 {
    latitude: number
    longitude: number
}

export interface CoordObj3 {
    lat: string
    lng: string
}

export interface CoordObj4 {
    latitude: string
    longitude: string
}

export function coordIsNumberArray(coord: number[] | string[]): coord is number[] {
    if (coord.length !== 2) throw new Error(`${JSON.stringify(coord)} 的长度不为2`)
    if (typeof coord[0] === "number" && typeof coord[1] === "number") return true
    if (typeof coord[0] === "string" && typeof coord[1] === "string") return false
    throw new Error(`${JSON.stringify(coord)} 的类型有误`)
}

/** 检查坐标是否合法，合法则返回正确的坐标 */
export function coordCheck(coord: number[]): number[] {
    if (coord.length !== 2) throw new Error(`${JSON.stringify(coord)} 的长度不为2`)
    if (typeof coord[0] !== "number" || isNaN(coord[0]) || typeof coord[1] !== "number" || isNaN(coord[1])) throw new Error(`${JSON.stringify(coord)} 的类型有误`)
    const [y, x] = coord
    if (Math.abs(y) <= 90 && Math.abs(x) <= 180) {
        return [y, x]
    }
    if (Math.abs(x) <= 90 && Math.abs(y) <= 180) {
        throw new Error(`${JSON.stringify(coord)} 似乎将经纬度互换，请检查是否有误`)
    }
    throw new Error(`${JSON.stringify(coord)} 的经纬度超出范围`)
}

/** 将坐标信息转换为真实坐标，即`[维度, 经度]`的格式 */
export function getRealCoord(coord: number[] | string | string[] | CoordObj1 | CoordObj2 | CoordObj3 | CoordObj4): number[] {
    if (typeof coord === "string") {
        const reg = /^[0-9a-z]+$/
        const nums = coord
            .replace(/\:/g, "colon")
            .replace(/\-/g, "minus")
            .replace(/\./g, "point")
            .split(/\b/)
            .filter(str => reg.test(str))
            .map(str => str.replace(/colon/g, ":").replace(/minus/g, "-").replace(/point/g, "."))
            .map(coordStringToNumber)
        if (nums.length !== 2) throw new Error(`${coord} 的格式有误`)
        return coordCheck(nums)
    }
    if (Array.isArray(coord)) {
        if (coordIsNumberArray(coord)) {
            return coordCheck(coord)
        }
        return coordCheck(coord.map(coordStringToNumber))
    }
    if ("lat" in coord && "lng" in coord) {
        return getRealCoord([coord.lat, coord.lng] as string[] | number[])
    }
    if ("latitude" in coord && "longitude" in coord) {
        return getRealCoord([coord.latitude, coord.longitude] as string[] | number[])
    }
    throw new Error(`${coord} 的格式有误`)
}

export type StringCoord = `${number},${number}`

/** 将任意格式的坐标转换为51坐标 */
export function get51Coord(coord: number[] | string | string[] | CoordObj1 | CoordObj2 | CoordObj3 | CoordObj4): StringCoord {
    const [y, x] = getRealCoord(coord)
    return `${x},${y}`
}

/** 将浏览器中直接复制的 headers 转换为对象 */
export function getHeaders(headers: string): Record<string, string> {
    const result: Record<string, string> = {}
    headers
        .split("\n")
        .map(str => str.trim())
        .filter(str => str && !str.startsWith(":"))
        .forEach(str => {
            const index = str.indexOf(":")
            if (index < 1) {
                throw new Error(`无效的字段${str}`)
            }
            const key = str.slice(0, index).trim()
            const value = str.slice(index + 1).trim()
            result[key] = value
        })
    return result
}

/**
 * 判断两个线段是否相交
 * @param {number[][]} line1 - 线段一
 * @param {number[][]} line2 - 线段二
 */
export function ifTwoSegmentsIntersect(line1: number[][], line2: number[][]) {
    const [a, b] = line1
    const [c, d] = line2
    return robustSegmentIntersect(a, b, c, d)
}

/**
 * 判断多个点能否围成多边形
 * @param {number[][]} coords - 多边形的顶点
 */
export function canCoordsBePolygon(coords: number[][]) {
    const { length } = coords
    if (length < 3) return false
    const lines = coords.map((coord, index) => [coord, coords[(index + 1) % length]])
    for (let i = 0; i < length; i++) {
        for (let j = i + 2; j < length; j++) {
            if (i === 0 && j === length - 1) {
                continue
            }
            if (ifTwoSegmentsIntersect(lines[i], lines[j])) {
                return false
            }
        }
    }
    return true
}

/** 为数组添加方法 */
export function extendArrayPrototype() {
    if (!Array.prototype.hasOwnProperty("with")) {
        class A {
            static with<T>(this: T[], index: number, value: T): T[] {
                if (!Number.isInteger(index) || index >= this.length || index < this.length * -1) {
                    throw new RangeError(`Invalid index : ${index}`)
                }
                const $ = [...this]
                $[index >= 0 ? index : this.length + index] = value
                return $
            }
        }
        Array.prototype.with = A.with
    }
    if (!Array.prototype.hasOwnProperty("toReversed")) {
        function toReversed<T>(this: T[]): T[] {
            const $ = [...this]
            $.reverse()
            return $
        }
        Array.prototype.toReversed = toReversed
    }
    if (!Array.prototype.hasOwnProperty("toShifted")) {
        function toShifted<T>(this: T[]): T[] {
            const $ = [...this]
            $.shift()
            return $
        }
        Array.prototype.toShifted = toShifted
    }
    if (!Array.prototype.hasOwnProperty("toPopped")) {
        function toPopped<T>(this: T[]): T[] {
            const $ = [...this]
            $.pop()
            return $
        }
        Array.prototype.toPopped = toPopped
    }
    if (!Array.prototype.hasOwnProperty("toSorted")) {
        function toSorted<T>(this: T[], compareFn?: (a: T, b: T) => number): T[] {
            const $ = [...this]
            $.sort(compareFn)
            return $
        }
        Array.prototype.toSorted = toSorted
    }
    if (!Array.prototype.hasOwnProperty("toDeduplicated")) {
        function toDeduplicated<T>(this: T[], compareFn?: (a: T, b: T) => boolean): T[] {
            if (!compareFn) return Array.from(new Set(this))
            const $: T[] = []
            this.forEach(item => {
                if ($.some(it => compareFn(item, it))) return
                $.push(item)
            })
            return $
        }
        Array.prototype.toDeduplicated = toDeduplicated
    }
    if (!Array.prototype.hasOwnProperty("toSpliced")) {
        function toSpliced<T>(this: T[], start: number, deleteCount?: number, ...items: T[]): T[] {
            const $ = [...this]
            if (deleteCount === undefined) {
                $.splice(start)
            } else {
                $.splice(start, deleteCount, ...items)
            }
            return $
        }
        Array.prototype.toSpliced = toSpliced
    }
    if (!Array.prototype.hasOwnProperty("toPushed")) {
        function toPushed<T>(this: T[], ...items: T[]): T[] {
            const $ = [...this]
            $.push(...items)
            return $
        }
        Array.prototype.toPushed = toPushed
    }
    if (!Array.prototype.hasOwnProperty("toUnshifted")) {
        function toUnshifted<T>(this: T[], ...items: T[]): T[] {
            const $ = [...this]
            $.unshift(...items)
            return $
        }
        Array.prototype.toUnshifted = toUnshifted
    }
    if (!Array.prototype.hasOwnProperty("toExchange")) {
        function toExchange<T>(this: T[], a: number, b: number): T[] {
            return this.with(a, this[b]).with(b, this[a])
        }
        Array.prototype.toExchange = toExchange
    }
    if (!Array.prototype.hasOwnProperty("at")) {
        function at<T>(this: T[], index: number): T | undefined {
            if (!Number.isInteger(index)) {
                throw new RangeError(`Invalid index : ${index}`)
            }
            return this[index >= 0 ? index : this.length + index]
        }
        Array.prototype.at = at
    }
}

/** 创建 cookie 的存储 */
export function createCookieStorage(): Storage {
    const cookieStorage: Storage = {
        get length() {
            return Object.keys(Cookies.get() || {}).length
        },
        clear() {
            Object.keys(Cookies.get() || {})?.forEach(key => Cookies.remove(key))
        },
        getItem(key) {
            return Cookies.get(key) || null
        },
        setItem(key, value) {
            Cookies.set(key, value)
        },
        key(index) {
            return Object.keys(Cookies.get())[index]
        },
        removeItem(key) {
            Cookies.remove(key)
        }
    }
    return cookieStorage
}

/**
 * base64 转 blob
 * @param {string} base64 需要转换的 base64
 * @returns {Blob}
 */
export function base64ToBlob(base64: string): Blob {
    const bytes = atob(base64.split(",")[1])
    const array = new Uint8Array(bytes.length)
    const mime = base64.match(/^data:(.*?);/)![1]
    for (let i = 0; i < bytes.length; i++) {
        array[i] = bytes.charCodeAt(i)
    }
    const blob = new Blob([array], { type: mime })
    return blob
}

/**
 * blob 生成文件并下载
 * @param {Blob} blob 文件的 blob
 * @param {string} fileName 文件名
 */
export function downloadBlob(blob: Blob, fileName: string) {
    const link = document.createElement("a")
    link.download = fileName
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
}

/**
 * 帧数定时器
 * @param {Function} callback 回调函数
 * @param {number} frames 帧数，必须是 0 或者正整数
 */
export function setFrameTimeout(callback: () => void, frames: number): () => void {
    if (!Number.isInteger(frames) || frames < 0) throw new RangeError("帧数只支持 0 或者正整数")
    let current = 0
    let signal = 0
    function clearFrameTimeout() {
        cancelAnimationFrame(signal)
    }
    function run() {
        signal = requestAnimationFrame(() => {
            run()
            if (current++ >= frames) {
                callback()
                return
            }
        })
    }
    run()
    return clearFrameTimeout
}

/**
 * 帧数定时器
 * @param {Function} callback 回调函数
 * @param {number} frames 帧数，必须是正整数
 */
export function setFrameInterval(callback: () => void, frames: number): () => void {
    if (!Number.isInteger(frames) || frames <= 0) throw new RangeError("帧数只支持正整数")
    let current = 0
    let signal = 0
    function clearFrameInterval() {
        cancelAnimationFrame(signal)
    }
    function run() {
        signal = requestAnimationFrame(() => {
            run()
            if (current++ % frames === 0) {
                callback()
            }
        })
    }
    run()
    return clearFrameInterval
}

export type QueryFnToData<T extends Record<string, (param: string | null) => any>> = {
    [K in keyof T]: ReturnType<T[K]>
}

export type DataToDataFn<T extends Record<string, any>> = {
    [K in keyof T]: (data: T[K]) => string | null
}

/**
 * 将搜索字符串映射为数据
 */
export function getDataFromQuery<T extends Record<string, (param: string | null) => any>>(params: URLSearchParams, fns: T): QueryFnToData<T> {
    return Object.keys(fns).reduce((prev: any, key) => {
        prev[key] = fns[key](params.get(key))
        return prev
    }, {})
}

/**
 * 将数据映射为搜索字符串
 */
export function setQueryFromData<T extends Record<string, any>>(data: T, fns: DataToDataFn<T>, setParams: SetURLSearchParams): void {
    setParams(
        Object.keys(data).reduce((prev: any, key) => {
            const str = fns[key](data[key])
            if (str !== null) prev[key] = str
            return prev
        }, {})
    )
}

/**
 * 将对象转换成 innerHTML
 */
export function getStyleInnerHTML(style: Record<string, string>) {
    return `
${Object.keys(style)
    .map(selector => `    ${selector} {${style[selector]}}`)
    .join("\n\n")}`
}

export const css = String.raw

export const cssStore: Record<string, number> = {}

/**
 * useCss
 */
export function useCss(style: Record<string, string>) {
    const css = getStyleInnerHTML(style)
    useInsertionEffect(() => {
        const id = md5(css)
        if (cssStore[id]) {
            cssStore[id]++
        } else {
            cssStore[id] = 1
            const style = document.createElement("style")
            style.innerHTML = css
            style.id = id
            document.head.appendChild(style)
        }

        return () => {
            cssStore[id]--
            if (cssStore[id] <= 0) {
                const dom = document.getElementById(id)
                if (dom) dom.remove()
            }
        }
    }, [css])
}

/** Tailwind颜色 */
export const tailwindColors = {
    /** 石灰色 */
    slate: {
        "50": "#f8fafc",
        "100": "#f1f5f9",
        "200": "#e2e8f0",
        "300": "#cbd5e1",
        "400": "#94a3b8",
        "500": "#64748b",
        "600": "#475569",
        "700": "#334155",
        "800": "#1e293b",
        "900": "#0f172a",
        "950": "#020617"
    },
    /** 纯灰色 */
    gray: {
        "50": "#f9fafb",
        "100": "#f3f4f6",
        "200": "#e5e7eb",
        "300": "#d1d5db",
        "400": "#9ca3af",
        "500": "#6b7280",
        "600": "#4b5563",
        "700": "#374151",
        "800": "#1f2937",
        "900": "#111827",
        "950": "#030712"
    },
    /** 锌灰色 */
    zinc: {
        "50": "#fafafa",
        "100": "#f4f4f5",
        "200": "#e4e4e7",
        "300": "#d4d4d8",
        "400": "#a1a1aa",
        "500": "#71717a",
        "600": "#52525b",
        "700": "#3f3f46",
        "800": "#27272a",
        "900": "#18181b",
        "950": "#09090b"
    },
    /** 石板灰 */
    neutral: {
        "50": "#fafafa",
        "100": "#f5f5f5",
        "200": "#e5e5e5",
        "300": "#d4d4d4",
        "400": "#a3a3a3",
        "500": "#737373",
        "600": "#525252",
        "700": "#404040",
        "800": "#262626",
        "900": "#171717",
        "950": "#0a0a0a"
    },
    /** 砂岩灰 */
    stone: {
        "50": "#fafaf9",
        "100": "#f5f5f4",
        "200": "#e7e5e4",
        "300": "#d6d3d1",
        "400": "#a8a29e",
        "500": "#78716c",
        "600": "#57534e",
        "700": "#44403c",
        "800": "#292524",
        "900": "#1c1917",
        "950": "#0c0a09"
    },
    /** 纯红色 */
    red: {
        "50": "#fef2f2",
        "100": "#fee2e2",
        "200": "#fecaca",
        "300": "#fca5a5",
        "400": "#f87171",
        "500": "#ef4444",
        "600": "#dc2626",
        "700": "#b91c1c",
        "800": "#991b1b",
        "900": "#7f1d1d",
        "950": "#450a0a"
    },
    /** 橘黄色 */
    orange: {
        "50": "#fff7ed",
        "100": "#ffedd5",
        "200": "#fed7aa",
        "300": "#fdba74",
        "400": "#fb923c",
        "500": "#f97316",
        "600": "#ea580c",
        "700": "#c2410c",
        "800": "#9a3412",
        "900": "#7c2d12",
        "950": "#431407"
    },
    /** 琥珀色 */
    amber: {
        "50": "#fffbeb",
        "100": "#fef3c7",
        "200": "#fde68a",
        "300": "#fcd34d",
        "400": "#fbbf24",
        "500": "#f59e0b",
        "600": "#d97706",
        "700": "#b45309",
        "800": "#92400e",
        "900": "#78350f",
        "950": "#451a03"
    },
    /** 纯黄色 */
    yellow: {
        "50": "#fefce8",
        "100": "#fef9c3",
        "200": "#fef08a",
        "300": "#fde047",
        "400": "#facc15",
        "500": "#eab308",
        "600": "#ca8a04",
        "700": "#a16207",
        "800": "#854d0e",
        "900": "#713f12",
        "950": "#422006"
    },
    /** 青橙色 */
    lime: {
        "50": "#f7fee7",
        "100": "#ecfccb",
        "200": "#d9f99d",
        "300": "#bef264",
        "400": "#a3e635",
        "500": "#84cc16",
        "600": "#65a30d",
        "700": "#4d7c0f",
        "800": "#3f6212",
        "900": "#365314",
        "950": "#1a2e05"
    },
    /** 纯绿色 */
    green: {
        "50": "#f0fdf4",
        "100": "#dcfce7",
        "200": "#bbf7d0",
        "300": "#86efac",
        "400": "#4ade80",
        "500": "#22c55e",
        "600": "#16a34a",
        "700": "#15803d",
        "800": "#166534",
        "900": "#14532d",
        "950": "#052e16"
    },
    /** 翡翠绿 */
    emerald: {
        "50": "#ecfdf5",
        "100": "#d1fae5",
        "200": "#a7f3d0",
        "300": "#6ee7b7",
        "400": "#34d399",
        "500": "#10b981",
        "600": "#059669",
        "700": "#047857",
        "800": "#065f46",
        "900": "#064e3b",
        "950": "#022c22"
    },
    /** 盐湖绿 */
    teal: {
        "50": "#f0fdfa",
        "100": "#ccfbf1",
        "200": "#99f6e4",
        "300": "#5eead4",
        "400": "#2dd4bf",
        "500": "#14b8a6",
        "600": "#0d9488",
        "700": "#0f766e",
        "800": "#115e59",
        "900": "#134e4a",
        "950": "#042f2e"
    },
    /** 亚蓝色 */
    cyan: {
        "50": "#ecfeff",
        "100": "#cffafe",
        "200": "#a5f3fc",
        "300": "#67e8f9",
        "400": "#22d3ee",
        "500": "#06b6d4",
        "600": "#0891b2",
        "700": "#0e7490",
        "800": "#155e75",
        "900": "#164e63",
        "950": "#083344"
    },
    /** 天蓝色 */
    sky: {
        "50": "#f0f9ff",
        "100": "#e0f2fe",
        "200": "#bae6fd",
        "300": "#7dd3fc",
        "400": "#38bdf8",
        "500": "#0ea5e9",
        "600": "#0284c7",
        "700": "#0369a1",
        "800": "#075985",
        "900": "#0c4a6e",
        "950": "#082f49"
    },
    /** 纯蓝色 */
    blue: {
        "50": "#eff6ff",
        "100": "#dbeafe",
        "200": "#bfdbfe",
        "300": "#93c5fd",
        "400": "#60a5fa",
        "500": "#3b82f6",
        "600": "#2563eb",
        "700": "#1d4ed8",
        "800": "#1e40af",
        "900": "#1e3a8a",
        "950": "#172554"
    },
    /** 靛青色 */
    indigo: {
        "50": "#eef2ff",
        "100": "#e0e7ff",
        "200": "#c7d2fe",
        "300": "#a5b4fc",
        "400": "#818cf8",
        "500": "#6366f1",
        "600": "#4f46e5",
        "700": "#4338ca",
        "800": "#3730a3",
        "900": "#312e81",
        "950": "#1e1b4b"
    },
    /** 紫罗兰 */
    violet: {
        "50": "#f5f3ff",
        "100": "#ede9fe",
        "200": "#ddd6fe",
        "300": "#c4b5fd",
        "400": "#a78bfa",
        "500": "#8b5cf6",
        "600": "#7c3aed",
        "700": "#6d28d9",
        "800": "#5b21b6",
        "900": "#4c1d95",
        "950": "#2e1065"
    },
    /** 纯紫色 */
    purple: {
        "50": "#faf5ff",
        "100": "#f3e8ff",
        "200": "#e9d5ff",
        "300": "#d8b4fe",
        "400": "#c084fc",
        "500": "#a855f7",
        "600": "#9333ea",
        "700": "#7e22ce",
        "800": "#6b21a8",
        "900": "#581c87",
        "950": "#3b0764"
    },
    /** 丁香紫 */
    fuchsia: {
        "50": "#fdf4ff",
        "100": "#fae8ff",
        "200": "#f5d0fe",
        "300": "#f0abfc",
        "400": "#e879f9",
        "500": "#d946ef",
        "600": "#c026d3",
        "700": "#a21caf",
        "800": "#86198f",
        "900": "#701a75",
        "950": "#4a044e"
    },
    /** 粉红色 */
    pink: {
        "50": "#fdf2f8",
        "100": "#fce7f3",
        "200": "#fbcfe8",
        "300": "#f9a8d4",
        "400": "#f472b6",
        "500": "#ec4899",
        "600": "#db2777",
        "700": "#be185d",
        "800": "#9d174d",
        "900": "#831843",
        "950": "#500724"
    },
    /** 玫瑰红 */
    rose: {
        "50": "#fff1f2",
        "100": "#ffe4e6",
        "200": "#fecdd3",
        "300": "#fda4af",
        "400": "#fb7185",
        "500": "#f43f5e",
        "600": "#e11d48",
        "700": "#be123c",
        "800": "#9f1239",
        "900": "#881337",
        "950": "#4c0519"
    }
}

export type TailwindColors = typeof tailwindColors

export type TailwindColorName = keyof TailwindColors

export type TailwindColorDepth = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

export const tailwindColorNames: Record<TailwindColorName, string> = {
    slate: "石灰色",
    gray: "纯灰色",
    zinc: "锌灰色",
    neutral: "石板灰",
    stone: "砂岩色",
    red: "纯红色",
    orange: "橘黄色",
    amber: "琥珀色",
    yellow: "纯黄色",
    lime: "青橙色",
    green: "纯绿色",
    emerald: "翡翠绿",
    teal: "盐湖绿",
    cyan: "亚蓝色",
    sky: "天蓝色",
    blue: "纯蓝色",
    indigo: "靛青色",
    violet: "紫罗兰",
    purple: "纯紫色",
    fuchsia: "丁香紫",
    pink: "粉红色",
    rose: "玫瑰红"
}

export function useArraySignal<T>(data: T[], compareFn?: (a: T, b: T) => boolean) {
    const dataRef = useRef(data)
    const signal = useRef(Date.now())
    if (dataRef.current.length !== data.length || dataRef.current.some((it, idx) => (compareFn ? !compareFn(it, data[idx]) : it !== data[idx]))) {
        signal.current = Date.now()
        dataRef.current = data
    }
    return signal.current
}
