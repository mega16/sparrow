/**
 * 上下文主要用于保存一些绘制或者其他功能需要的全局的信息
 * eg. 挂载画布的容器，当前的填充颜色，边框粗细等
 * 功能：
 * - 画布节点：svg节点，方便挂载在其他DOM位置上
 * - 挂载节点：g节点，是当前可以挂载新元素的节点。
 */

import { createSVGElement, mount } from '../utils';

export function createContext(width, height) {
  // 创建画布svg节点，并且设置宽高
  const svg = createSVGElement('svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  // 创建挂载g 节点，并且把该节点挂载到svg 节点上
  const g = createSVGElement('g');
  mount(svg, g);

  // 返回画布节点和挂载节点
  return {
    node: svg,
    group: g,
  };
}
