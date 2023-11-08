import { CSSProperties } from "react";
import type { GetTipString } from "./index";
export type PropertyKey = GetTipString<keyof CSSProperties>;
export declare function getProperty(key: PropertyKey, value: string | undefined): string;
export declare function text(value: string | undefined): string;
export declare function bg(value: string | undefined): string;
export declare function border(value: string | undefined): string;
export type Color = CSSProperties["color"];
export type GetColorConfig<T extends PropertyKey> = Partial<Record<T, Color>>;
export type ColorAntdModalConfig = GetColorConfig<"backgroundColor" | "closeIconColor" | "closeHoverBackgroundColor">;
export declare function colorAntdModal(config: ColorAntdModalConfig): string;
export type ColorAntdInputConfig = GetColorConfig<"backgroundColor" | "borderColor" | "color" | "placeholderColor" | "hoverBorderColor" | "focusBorderColor">;
export declare function colorAntdInput(config: ColorAntdInputConfig): string;
export type ColorAntdSelectConfig = GetColorConfig<"borderColor" | "backgroundColor" | "color" | "clearBackgroundColor" | "clearColor" | "placeholderColor" | "tagBackgroundColor" | "removeColor" | "openColor" | "arrowColor" | "focusBorderColor">;
export declare function colorAntdSelect(config: ColorAntdSelectConfig): string;
export type ColorAntdTreeConfig = GetColorConfig<"backgroundColor" | "color" | "switcherColor" | "checkboxColor" | "checkboxBorderColor">;
export declare function colorAntdTree(config: ColorAntdTreeConfig): string;
export type ColorAntdRangePickerConfig = GetColorConfig<"borderColor" | "backgroundColor" | "color" | "placeholderColor" | "separatorColor" | "calendarColor" | "clearColor" | "clearBackgroundColor" | "activeBarColor">;
export declare function colorAntdRangePicker(config: ColorAntdRangePickerConfig): string;
