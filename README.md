## sd-mall(Vanke Zhuzher Mall)

[] **16-09-09** mall页面
[] **16-09-16** mall接口调试

### 如何耦合组件样式

几点规则：
- 组件内部仅包含最基本样式(不包含样式css文件时，可能错乱)，且不可被修改
- 组件的样式定义在第三方css文件内进行，最好配置一个实例css文件

1. 若需要在父组件中定义子组件样式，则尽量准确
2. 可以给予组件结构详细的类名，然后在css modules中使用:global直接调用(类名不转化)

### Install

npm i -g node-sass babel-cli typescript typings webpack gulp
npm i
typings install