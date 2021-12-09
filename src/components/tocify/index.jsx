import React from 'react';
import "../../styles/component/tocify/tocify.less"
import { Anchor } from 'antd';
const { Link } = Anchor;



export  class Tocify {
    tocItems = [];
  
    index = 0;
    constructor() {
      this.tocItems = [];
      this.index = 0;
    }
  
    add(text, level) {
    if(level<=4){ //标签过小不予展示
      const anchor = `toc${level}${++this.index}`;
      const item = { anchor, level, text };
      const items = this.tocItems;
  
      if (items.length === 0) { // 第一个 item 直接 push
        items.push(item);
      } else {
        let lastItem = items.slice(-1); // 最后一个 item
  
        if (item.level > lastItem.level) { // item 是 lastItem 的 children
          for (let i = lastItem.level + 1; i <= 2; i++) {
            const { children } = lastItem;
            if (!children) { // 如果 children 不存在
              lastItem.children = [item];
              break;
            }
  
            lastItem = children.slice(-1); // 重置 lastItem 为 children 的最后一个 item
  
            if (item.level <= lastItem.level) { // item level 小于或等于 lastItem level 都视为与 children 同级
              children.push(item);
              break;
            }
          }
        } else { // 置于最顶级
          items.push(item);
        }
      }
  
      return anchor;
    }
    }
  
    reset = () => {
      this.tocItems = [];
      this.index = 0;
    };
  
    renderToc(items) { // 递归 render
        this.reset()
      return items.map(item => (
        <Link href={`#${item.anchor}`} title={item.text}>
          {item.children && this.renderToc(item.children)}
        </Link>
      ));
    }
  
    render(affix=false) {
      return (
        <Anchor style={{maxHeight:"300px"}} affix={affix} showInkInFixed>
           {this.renderToc(this.tocItems)}
        </Anchor> 
      );
    }
  }
