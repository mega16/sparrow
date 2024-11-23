/**
 * 坐标系变换
 * 在 SVG 中使用坐标变换的能力其实就是给 g 元素添加对应的 transform 属性，然后被 g 元素包裹的所有子元素都会应用这个 transform 属性所指定的变换。
 * 
 * 支持功能：
 * 平移（translate）、放缩（Scale) 旋转（Rotate）
 */

import { applyTransform, createSVGElement, mount } from "./utils";

export function transform(type, context, ...params) {
  const { group } = context;

  applyTransform(group, `${type}(${params.join(', ')})`);
}


export function translate(context, tx, ty) {
  transform('translate', context, tx, ty);
}

export function rotate(context, theta) {
  transform('rotate', context, theta);
}

export function scale(context, sx, sy) {
  transform('scale', context, sx, sy);
}


export function save(context) {
  const { group } = context;
  const newGroup = createSVGElement('g');
  mount(group, newGroup);
  context.group = newGroup;
}

export function restore(context) {
  const { group } = context;
  const { parentNode } = group;
  context.group = parentNode;
}