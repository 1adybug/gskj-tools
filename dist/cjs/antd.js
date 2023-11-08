"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorAntdRangePicker = exports.colorAntdTree = exports.colorAntdSelect = exports.colorAntdInput = exports.colorAntdModal = exports.border = exports.bg = exports.text = exports.getProperty = void 0;
const css_1 = require("@emotion/css");
function getProperty(key, value) {
    value = value?.trim();
    return value ? `${key.replace(/[A-Z]/g, s => `-${s.toLowerCase()}`)}: ${value};` : "";
}
exports.getProperty = getProperty;
function text(value) {
    return getProperty("color", value);
}
exports.text = text;
function bg(value) {
    return getProperty("backgroundColor", value);
}
exports.bg = bg;
function border(value) {
    return getProperty("borderColor", value);
}
exports.border = border;
function colorAntdModal(config) {
    const { backgroundColor, closeIconColor, closeHoverBackgroundColor } = config;
    return (0, css_1.css) `
        &.ant-modal {
            .ant-modal-content {
                ${bg(backgroundColor)}

                .ant-modal-header {
                    ${bg(backgroundColor)}

                    .ant-modal-title {
                        ${bg(backgroundColor)}
                    }
                }

                .ant-modal-close {
                    &:hover {
                        ${bg(closeHoverBackgroundColor)}
                    }

                    .ant-modal-close-x {
                        .ant-modal-close-icon {
                            ${text(closeIconColor)}
                        }
                    }
                }
            }
        }
    `;
}
exports.colorAntdModal = colorAntdModal;
function colorAntdInput(config) {
    const { backgroundColor, borderColor, color, placeholderColor, hoverBorderColor, focusBorderColor } = config;
    return (0, css_1.css) `
        &.ant-input,
        & > input.ant-input {
            ${text(color)}
            ${bg(backgroundColor)}
            ${border(borderColor)}

            &::placeholder {
                ${text(placeholderColor)}
            }
        }

        &.ant-input {
            &:hover {
                ${border(hoverBorderColor)}
            }

            &:focus,
            &:focus-within {
                ${border(focusBorderColor)}
            }
        }
    `;
}
exports.colorAntdInput = colorAntdInput;
function colorAntdSelect(config) {
    const { borderColor, backgroundColor, color, clearBackgroundColor, clearColor, placeholderColor, tagBackgroundColor, removeColor, openColor, arrowColor, focusBorderColor } = config;
    return (0, css_1.css) `
        &.ant-select {
            &:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer):hover {
                .ant-select-selector {
                    ${border(borderColor)}
                }
            }

            .ant-select-selector {
                ${text(color)}
                ${bg(backgroundColor)}
                ${border(borderColor)}
            }

            .ant-select-clear {
                ${bg(clearBackgroundColor)}
                ${text(clearColor)}
            }

            .ant-select-selection-placeholder {
                ${text(placeholderColor)}
            }

            &.ant-select-multiple {
                .ant-select-selection-item {
                    ${bg(tagBackgroundColor)}
                }

                .ant-select-selection-item-remove {
                    ${text(removeColor)}
                }
            }

            &.ant-select-open {
                .ant-select-selection-item {
                    ${text(openColor)}
                }
            }

            .ant-select-arrow {
                .anticon {
                    ${text(arrowColor)}
                }
            }

            &.ant-select-focused:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer) {
                .ant-select-selector {
                    ${border(focusBorderColor)}
                }
            }
        }
    `;
}
exports.colorAntdSelect = colorAntdSelect;
function colorAntdTree(config) {
    const { backgroundColor, color, switcherColor, checkboxColor, checkboxBorderColor } = config;
    return (0, css_1.css) `
        .ant-tree {
            ${bg(backgroundColor)}

            .ant-tree-node-content-wrapper {
                ${text(color)}
            }

            .ant-tree-switcher {
                ${text(switcherColor)}
            }

            .ant-tree-checkbox .ant-tree-checkbox-inner {
                ${border(checkboxBorderColor)}

                &::after {
                    ${border(checkboxColor)}
                }
            }
        }
    `;
}
exports.colorAntdTree = colorAntdTree;
function colorAntdRangePicker(config) {
    const { color, backgroundColor, borderColor, placeholderColor, separatorColor, calendarColor, clearBackgroundColor, clearColor, activeBarColor } = config;
    return (0, css_1.css) `
        &.ant-picker-range {
            ${bg(backgroundColor)}
            ${border(borderColor)}

            .ant-picker-input {
                input {
                    ${text(color)}

                    &::placeholder {
                        ${text(placeholderColor)}
                    }
                }
            }

            .ant-picker-range-separator {
                .ant-picker-separator {
                    ${text(separatorColor)}
                }
            }

            .ant-picker-suffix {
                .anticon-calendar {
                    ${text(calendarColor)}
                }
            }
            
            .ant-picker-clear {
                ${text(clearColor)}
                ${bg(clearBackgroundColor)}
            }

            .ant-picker-active-bar {
                ${bg(activeBarColor)}
            }
        }
    `;
}
exports.colorAntdRangePicker = colorAntdRangePicker;
//# sourceMappingURL=antd.js.map