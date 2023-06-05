declare module "is-equal" {
    export default function isEqual(a: any, b: any): boolean
}

declare module "robust-segment-intersect" {
    export default function robustSegmentIntersect(a0: number[], a1: number[], b0: number[], b1: number[]): boolean
}

interface Array<T> {
    with(this: Array<T>, index: number, value: T): Array<T>
    toReversed(): Array<T>
    toSorted(this: Array<T>, compareFn?: (a: T, b: T) => number): Array<T>
    toSpliced(this: Array<T>, start: number, deleteCount?: number, ...items: T[]): Array<T>
}

declare interface Window {
    Array: Array
}
