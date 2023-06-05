interface Array<T> {
    with(this: Array<T>, index: number, value: T): Array<T>
    toReversed(): Array<T>
    toShifted(): Array<T>
    toPopped(): Array<T>
    toSorted(this: Array<T>, compareFn?: (a: T, b: T) => number): Array<T>
    toSpliced(this: Array<T>, start: number, deleteCount?: number, ...items: T[]): Array<T>
    toPushed(this: Array<T>, ...items: T[]): Array<T>
    toUnshifted(this: Array<T>, ...items: T[]): Array<T>
}

declare interface Window {
    Array: Array
}