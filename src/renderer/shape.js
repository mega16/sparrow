/**
 * 绘制基本图形
 * SVG环境绘制基本图形3步：
 * 1.创建元素
 * 2.设置属性
 * 3.挂载元素
 */

import { applyAttributes, createSVGElement, mount } from '../utils';

export function shape(type, context, attributes) {
  const { group } = context; // 挂载元素
  const el = createSVGElement(type); // 创建对应的元素
  applyAttributes(el, attributes); // 设置属性
  mount(group, el); // 挂载
  return el; // 返回该元素
}

export function line(context, attributes) {
  return shape('line', context, attributes);
}

export function rect(context, attributes) {
  const { width, height, x, y } = attributes;

  return shape('rect', context, {
    ...attributes,
    width: Math.abs(width),
    height: Math.abs(height),
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height,
  });
}

export function circle(context, attributes) {
  return shape('circle', context, attributes);
}

export function text(context, attributes) {
  const { text, ...rest } = attributes;
  const textElement = shape('text', context, rest);
  textElement.textContent = text;
  return textElement;
}

export function path(context, attributes) {
  const { d } = attributes;
  // 自定义 flat 函数
  function flattenArray(arr) {
    return arr.reduce(
      (acc, item) =>
        acc.concat(Array.isArray(item) ? flattenArray(item) : item),
      []
    );
  }
  const path = Array.isArray(d) ? flattenArray(d).join(' ') : d;
  return shape('path', context, { ...attributes, d: path });
}

/**
 * 用三个圆去模拟一个圆环，它们的填充色都是透明的，
 * 其中两个圆的边框去模拟圆环的边框，
 * 用一个圆的边框去模拟圆环本身
 */
export function ring(context, attributes) {
  // r1 是内圆的半径，r2 是外圆的半径
  const { cx, cy, r1, r2, ...styles } = attributes;
  const { stroke, strokeWidth, fill } = styles;
  const defaultStrokeWidth = 1;
  const innerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r1,
  });
  const ring = circle(context, {
    ...styles,
    strokeWidth: r2 - r1 - (strokeWidth || defaultStrokeWidth),
    stroke: fill,
    fill: 'transparent',
    cx,
    cy,
    r: (r1 + r2) / 2,
  });
  const outerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r2,
  });
  return [innerStroke, ring, outerStroke];
}
