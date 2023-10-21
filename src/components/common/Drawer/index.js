import Vue from 'vue';
import DrawerComp from './index.vue';
import { PopupManager } from 'element-ui/lib/utils/popup'

let instances = []
let seed = 1;
const DrawerCtor = Vue.extend(DrawerComp);
const Drawer = async function (props = {}, comp = {}) {
  let instance;
  if (Vue.prototype.$isServer) return;
  if (typeof props === 'string') {
    props = {
      content: props
    }
  }
  props.params = comp.params
  instance = new DrawerCtor({
    propsData: props
  });
  let id = 'drawer_' + seed++;
  if (comp.component) {
    let component = typeof comp.component == 'function' ? (await comp.component()).default : comp.DrawerComp
    let defaultComponent = instance.$createElement(component, {
      props: {
        ...comp.params
      }
    })

    instance.$slots.default = [defaultComponent]
  }
  instance.id = id;
  instance.$mount();
  instance.drawer = true;
  instance.direction = props.direction;
  // const appDom=document.querySelector('#app')
  // appDom.appendChild(instance.$el);
  document.body.appendChild(instance.$el)
  instance.$el.style.zIndex = PopupManager.nextZIndex()
  // instance.$children[0].$el.style.width ='30%'
  instances.push(instance)
  return new Promise((resolve, reject) => {
    instance.$off('on-close').$on('on-closed', (res) => {
      // console.log(res);
      resolve(res, instance)
    })
    instance.$off('on-closed').$on('on-closed', (element) => {
      document.body.removeChild(element)
    })
  })
};

Drawer.open = function (options) {
  let component = options.component
  delete options.component
  let params = options.params
  delete options.params
  options.direction = options.direction || 'rtl'
  return Drawer(options, { component, params });
};

/**
 * 打开多个抽屉。
 *
 * @param {Array} drawerOptions - 包含抽屉选项对象的数组。
 *
 * @param {string} drawerOptions[].direction - 抽屉弹出的位置（'rtl' 或 'ltr'）。
 *
 * @param {Function} drawerOptions[].component - 要传入的组件。
 *
 * @param {Object} drawerOptions[].params - 传入组件的参数。
 *
 * @param {Array} drawerOptions - 包含抽屉选项对象的数组。
 *
 * @example
 * const options1 = {
 *   direction: 'rtl',
 *   component: () => require('../123.vue'),
 *   params: {}
 * };
 * const options2 = {
 *   direction: 'ltr',
 *   component: () => require('../123.vue'),
 *   params: {}
 * };
 *
 * // 调用示例
 * Drawer.doubleOpen([options1, options2]);
 */
Drawer.doubleOpen = function (drawerOptions) {
  if (!Array.isArray(drawerOptions)) return

  drawerOptions.forEach((options) => {
    Drawer.open(options);
  });
};
Drawer.close = function (id, userOnClose) {
  const index = instances.findIndex((inst) => inst.id === id);

  if (index !== -1) {
    const instance = instances[index];

    if (typeof userOnClose === 'function') {
      userOnClose(instance);
    }
    instance.$el.parentNode.removeChild(instance.$el);
    instances.splice(index, 1);
  }
};

Drawer.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    const instance = instances[i];
    if (instance.$el && instance.$el.parentNode) {
      instance.$el.parentNode.removeChild(instance.$el);
      instance.close();
    }
  }
}

export default Drawer;