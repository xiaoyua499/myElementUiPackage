# elememt-package

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# myElementUiPackage

## Drawer组件

在main.js中通过全局引入的方式引入抽屉组件

```vue
//全局引用抽屉组件
import Drawer from '@/components/common/Drawer/index';
Vue.prototype.$drawer = Drawer
```

调用示例

```js
//打开单个抽屉
this.$drawer.open(
  {
    direction: 'ltr',//抽屉弹出的位置（'rtl' 或 'ltr'） rtl:屏幕右侧弹出 ltr：屏幕左侧弹出 默认为rtl
    title:'标题',//抽屉标题，可选
    component: () => require('./common/123.vue'),//传入的组件
    params: {}//传入的参数
  }
)
//打开两个抽屉
const options1 = {
direction: 'rtl',
component: () => require('../123.vue'),
params: {}
};
const options2 = {
direction: 'ltr',
component: () => require('../123.vue'),
params: {}
};
Drawer.doubleOpen([options1, options2]);
/**
*  关闭单个抽屉
*  @param {String} id - 抽屉的id，可通过this.$parent.id获取当前抽屉的id
*  @param {Function} userOnClose - 抽屉关闭的回调函数
*/
this.$drawer.close(id, userOnClose)

//关闭页面打开的所有抽屉
this.$drawer.closeAll()
```

