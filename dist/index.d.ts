import { DependencyList } from "react";
import type { SetURLSearchParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { TailwindColorDepth, TailwindColorName } from "./tailwind";
export * from "./tailwind";
export * from "./antd";
/**
 * 休眠指定时间
 * @param {number} time - 休眠的毫秒数
 */
export declare function sleep(time: number): Promise<unknown>;
/**
 * 取两个整数之间的随机数
 * @param {string} start - 开始的数字，闭区间
 * @param {string} end - 结束的数字，闭区间
 */
export declare function getRandomBetween(start: number, end: number): number;
/**
 * 取数组中的随机一个元素
 * @param list - 数组
 */
export declare function getRandomItemFromList<T>(list: T[]): T;
/** 0-9集合 */
export declare const digitList: number[];
/**
 * 获取随机手机号
 */
export declare function getRandomPhone(): string;
/**
 * 可能性
 * @param {number} p - 可能性
 */
export declare function possibility(p: number): boolean;
/** 车牌号可用的字母 */
export declare const plateNoAlphabetList: string[];
/**
 * 获取随机一位车牌号
 */
export declare function getRandomPlateNoItem(): string | number;
/**
 * 获取一个随机车牌号
 * @param start - 开始的两位，默认是苏H
 */
export declare function getRandomPlateNo(start?: string): string;
/** 获取随机年份 */
export declare function getRandomYear(): number;
/** 获取一个月的长度，忽略闰年 */
export declare function getMonthLength(month: number): 31 | 30 | 28;
/** 获取一个随机月份日期 */
export declare function getRandomDate(): string;
/**
 * 获取一个随机身份证
 * @param area - 区号
 *
 */
export declare function getRandomId(area?: number): string;
/** 判断两个数字是否相等 */
export declare function twoNumberIsEqual(a: number, b: number): boolean;
/**
 * 获取两个经纬度坐标之间的距离
 * @param {number[]} coord1 - 经纬度一，[维度, 经度]
 * @param {number[]} coord2 - 经纬度二，[维度, 经度]
 * @returns {number} 距离：米
 */
export declare function getDistance(coord1: number[], coord2: number[]): number;
/**
 * 获取两个经纬度坐标之间的距离
 * @param {number[]} coord1 - 经纬度一，[维度, 经度]
 * @param {number[]} coord2 - 经纬度二，[维度, 经度]
 * @param {number} d1 - 距离一，单位：米
 * @param {number} d2 - 距离二，单位：米
 * @returns {number[][]} - 可能的两个坐标
 */
export declare function getCoord(coord1: number[], coord2: number[], d1: number, d2: number): number[][];
/**
 * 获取对象的某些属性
 * @param {object} obj - 对象
 * @param {string[]} keyList - 需要取出的 key 集合
 */
export declare function getProperties<T, K extends keyof T>(obj: T, ...keyList: K[]): Pick<T, K>;
/**
 * 判断一个变量是否是非 null 的对象
 */
export declare function isObject(a: any): boolean;
/**
 * 比较两个变量是否相等
 */
export declare function equal(a: any, b: any): boolean;
/**
 * 比较两个变量是否相等
 * @param {string[]} ignoreList - 忽略的 key 集合
 */
export declare function compareWithoutProperties<T extends Object>(a: T, b: T, ...ignoreList: (keyof T)[]): boolean;
/**
 * 比较两个对象的某些属性
 * @param {string[]} keyList - 比较的 key 集合
 */
export declare function compareProperties<T extends Object>(a: T, b: T, ...keyList: (keyof T)[]): boolean;
/** 身份证正则 */
export declare const idReg: RegExp;
/**
 * 判断是否是合法身份证号
 * @param {string} id - 身份证号
 */
export declare function isLegalId(id: string): boolean;
/**
 * 将字符串或者字符串的数组变成字符串数组
 * @param {string | (string[])} id - 字符串或者字符串数组
 */
export declare function stringToArray(id: string | string[]): string[];
/**
 * 将身份证打码
 * @param {string} id - 身份证号
 */
export declare function coverIdWithMosaics(id: string): string;
/** 格式化选项 */
export interface StringToNumberOption {
    /** 是否转换成小数，默认为 false */
    float?: boolean;
    /** 最小值，低于最小值将会输出最小值 */
    min?: number;
    /** 最大值，大于最大值将会输出最大值 */
    max?: number;
    /** NaN 时输出的值 */
    default: number;
}
/**
 * 将字符串转换为数字
 * @param {string} value - 字符串
 * @param {number | StringToNumberOption} option - 转换的选项
 */
export declare function stringToNumber(value: string, option?: number | StringToNumberOption): number;
/** 获取一个每帧执行一次的函数 */
export declare function getRunAtFrame(): (fun: () => void) => void;
/**
 * 从身份证中获取年龄
 * @param {string} id - 身份证号
 */
export declare function getAgeFromId(id: string): number;
/**
 * 从身份证中获取性别，0是女性，1是男性
 * @param {string} id - 身份证号
 */
export declare function getSexFromId(id: string): number;
/**
 * 立即执行，并且定期再执行的函数
 * @param {Function} callback - 回调函数
 * @param {number} period - 周期
 */
export declare function setPeriod(callback: () => void, period: number): number;
/**
 * 给数字补0
 * @param {number} number - 需要补0的数字，自然数
 * @param {number} length - 补足的长度，大于等于上一个数的位数
 */
export declare function addZero(number: number, length?: number): string;
/** 获取随机姓名 */
export declare function getRandomName(): string;
/** ECharts 的配色 */
export declare const ECHARTS_COLOR: {
    blue: string;
    green: string;
    yellow: string;
    red: string;
    skyblue: string;
    orange: string;
    deepGreen: string;
    purple: string;
};
/** ECharts 的配色列表 */
export declare const ECHARTS_COLOR_LIST: string[];
/** 一个经度的距离 */
export declare const ONE_LNG = 92693;
/** 一个纬度的距离 */
export declare const ONE_LAT = 111319;
/** 得到一个函数，用于判断两个对象之间某些属性是否改变 */
export declare function getPropertiesIsModified<T>(a: T, b: T): (...keyList: (keyof T)[]) => boolean;
/** 将数字转换为px */
export declare function px(x: number | undefined | null): string | undefined;
/** 将字符串或者数字转换为尺寸 */
export declare function size(x: string | number | undefined | null): string | undefined;
/** 获得一个函数循环出来的数组 */
export declare function getArray<T>(length: number, fun: (index: number) => T): T[];
/** 获取点到线的最短距离 */
export declare function getPointToLineMinDistance(point: number[], line: number[][], getDis?: (a: number[], b: number[]) => number): number;
/** 是否是正数 */
export declare function isPositiveNumber(x: number): boolean;
/** 是否是正整数 */
export declare function isPositiveInteger(x: number): boolean;
/** 是整数或者小数 */
export declare function isNumber(x: any): x is number;
export declare function parseNumber(str: string): number;
export declare function coordStringToNumber(str: string): number;
export interface CoordObj1 {
    lat: number;
    lng: number;
}
export interface CoordObj2 {
    latitude: number;
    longitude: number;
}
export interface CoordObj3 {
    lat: string;
    lng: string;
}
export interface CoordObj4 {
    latitude: string;
    longitude: string;
}
export declare function coordIsNumberArray(coord: number[] | string[]): coord is number[];
/** 检查坐标是否合法，合法则返回正确的坐标 */
export declare function coordCheck(coord: number[]): number[];
/** 将坐标信息转换为真实坐标，即`[维度, 经度]`的格式 */
export declare function getRealCoord(coord: number[] | string | string[] | CoordObj1 | CoordObj2 | CoordObj3 | CoordObj4): number[];
export type StringCoord = `${number},${number}`;
/** 将任意格式的坐标转换为51坐标 */
export declare function get51Coord(coord: number[] | string | string[] | CoordObj1 | CoordObj2 | CoordObj3 | CoordObj4): StringCoord;
/** 将浏览器中直接复制的 headers 转换为对象 */
export declare function getHeaders(headers: string): Record<string, string>;
/**
 * 判断两个线段是否相交
 * @param {number[][]} line1 - 线段一
 * @param {number[][]} line2 - 线段二
 */
export declare function ifTwoSegmentsIntersect(line1: number[][], line2: number[][]): boolean;
/**
 * 判断多个点能否围成多边形
 * @param {number[][]} coords - 多边形的顶点
 */
export declare function canCoordsBePolygon(coords: number[][]): boolean;
/** 为数组添加方法 */
export declare function extendArrayPrototype(): void;
/** 创建 cookie 的存储 */
export declare function createCookieStorage(): Storage;
/**
 * base64 转 blob
 * @param {string} base64 需要转换的 base64
 * @returns {Blob}
 */
export declare function base64ToBlob(base64: string): Blob;
/**
 * blob 生成文件并下载
 * @param {Blob} blob 文件的 blob
 * @param {string} fileName 文件名
 */
export declare function downloadBlob(blob: Blob, fileName: string): void;
/**
 * 帧数定时器
 * @param {Function} callback 回调函数
 * @param {number} frames 帧数，必须是 0 或者正整数
 */
export declare function setFrameTimeout(callback: () => void, frames: number): () => void;
/**
 * 帧数定时器
 * @param {Function} callback 回调函数
 * @param {number} frames 帧数，必须是正整数
 */
export declare function setFrameInterval(callback: () => void, frames: number): () => void;
export type QueryFnToData<T extends Record<string, (param: string | null) => any>> = {
    [K in keyof T]: ReturnType<T[K]>;
};
export type DataToDataFn<T extends Record<string, any>> = {
    [K in keyof T]: (data: T[K]) => string | null;
};
/**
 * 将搜索字符串映射为数据
 */
export declare function getDataFromQuery<T extends Record<string, (param: string | null) => any>>(params: URLSearchParams, fns: T): QueryFnToData<T>;
/**
 * 将数据映射为搜索字符串
 */
export declare function setQueryFromData<T extends Record<string, any>>(data: T, fns: DataToDataFn<T>, setParams: SetURLSearchParams): void;
/**
 * 将对象转换成 innerHTML
 */
export declare function getStyleInnerHTML(style: Record<string, string>): string;
export declare const css: (template: {
    raw: readonly string[] | ArrayLike<string>;
}, ...substitutions: any[]) => string;
export declare const cssStore: Record<string, number>;
/**
 * useCss
 */
export declare function useCss(style: Record<string, string> | string): void;
/**
 * 在 react 中比较数组是否发生变化
 */
export declare function useArraySignal<T>(data: T[], compareFn?: (a: T, b: T) => boolean): number;
/**
 * 取余函数
 * @param a 被除数
 * @param b 除数
 */
export declare function remain(a: number, b: number): number;
export interface DrawArcOptions {
    /** 到达绘制起点的方式，true 为连线，false 为移动，默认 false */
    line?: boolean;
    /** 起点到终点的方式，true 为逆时针，false 为顺时针，默认 false */
    anticlockwise?: boolean;
}
/**
 * 用 canvas 的方法画 path 的圆
 * @param x 圆弧中心（圆心）的 x 轴坐标
 * @param y 圆弧中心（圆心）的 y 轴坐标
 * @param radius 圆弧的半径
 * @param startAngle 圆弧的起始点，x 轴方向开始计算，单位以弧度表示
 * @param endAngle 圆弧的终点，单位以弧度表示
 * @param {DrawArcOptions} options 其他绘制选项
 */
export declare function drawArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, options?: DrawArcOptions): string;
export interface TailwindColor {
    color: TailwindColorName;
    depth: TailwindColorDepth;
}
export interface TailwindColorsServerToClientEvents {
    color: (color: TailwindColorName, depth: TailwindColorDepth) => void;
}
export interface TailwindColorsClientToServerEvents {
    color: (color: TailwindColorName, depth: TailwindColorDepth) => void;
}
export declare function createTailwindColors(server: string): {
    useTailwindColors: import("easy-zustand").UsePersistentStore<TailwindColor, false>;
    connect: (server: string) => void;
    socket: Socket<TailwindColorsServerToClientEvents, TailwindColorsClientToServerEvents>;
};
export declare function useAsync(effect: () => Promise<void>, callback: () => void, deps?: DependencyList): void;
export declare function useAsync(effect: () => Promise<void>, deps?: DependencyList): void;
export type GetTipString<T extends string> = T | (string & {});
