### 文件夹

- .expo 文件夹只是保存一些用于expo的配置，不需要管这个
- assets 存放静态资源
-

### React Native 小记

#### RN 的组成

RN 是由两块内容组成的：React 特别组件 + 原生Api
这其中只有ui 会编译成原生代码，逻辑不会被编译
我们写的 js 代码会跑在NR App 的一个js 线程中，我们js 代码通过js 虚拟机
虚拟机 再通过bridge 与原生模块交互

### 为什么使用 expo-cli

因为 Expo 是围绕RN 的一套工具集， Expo 解决了windows 开发者无法构建IOS 的问题，此外简化了环境配置
使用Expo来构建RN App 可以大大提高效率

### 有关原生开发

在安卓开发中，可以使用kotlin 或 java 编写视图；在ios 开发中您使用swift 或 objective-c

#### RN 核心组件

- View : 默认支持flexbox布局，样式，一些触摸处理和辅助功能的容器
- Text : 专门展示文本的组件，RN 中文本必须被Text 包裹
- Image:

```jsx
// 本地图片使用 require 引入， 网路图片通过 uri 属性引入
<Image source={require('./image/check.png')} />
<Image source={{uri: 'https://reactjs.org/logo-og.png'}} style={{width:400, height: 400}} />
  ```

- ScrollView : 可以包含多个组件的通用滚动容器，但是如果你有很长的列表，那么滚动视图可能会非常低效，因为他的作用就是提前渲染所有元素，即使是那些不在屏幕上的元素，这以为这即使是当前不可兼得目标也被完全渲染
- TextInput: 允许用户输入文本

- FlatList: 很长的列表就应该用这个
