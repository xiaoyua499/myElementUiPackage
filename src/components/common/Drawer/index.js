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

/**
 * 打开一个抽屉并渲染指定组件，同时可以传递参数和自定义选项。
 *
 * @param {object} options - 抽屉的配置选项，包括组件、参数等。
 * @param {object} options.component - 要渲染在抽屉中的组件。
 * @param {object} [options.params] - 可选的参数，传递给渲染的组件。
 * @param {string} [options.direction='rtl'] - 抽屉的打开方向，默认为右至左 (rtl)。
 *
 * @returns {Drawer} - 返回抽屉实例，可用于后续操作。
 */
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
/**
 * 关闭指定抽屉实例并执行用户自定义的关闭回调。
 *
 * @param {string} id - 要关闭的抽屉实例的唯一标识符。
 * @param {function} userOnClose - 用户自定义的关闭回调函数。可选参数。
 */
Drawer.close = function (id, userOnClose) {
  const index = instances.findIndex((inst) => inst.id === id);

  if (index !== -1) {
    const instance = instances[index];

    if (typeof userOnClose === 'function') {
      userOnClose(instance);
    }
    instance.closeDrawer()
    instances.splice(index, 1);
  }
};
//关闭所有抽屉
Drawer.closeAll = async function (options={}) {
  if (instances.length>0){
    const closePromises = [];
    for (let i = instances.length - 1; i >= 0; i--) {
      const instance = instances[i];
      if (instance.$el && instance.$el.parentNode) {
        const closePromise = instance.close(options);
        closePromises.push(closePromise);
      }
    }

    try {
      await Promise.all(closePromises);
      return true; // 所有抽屉都成功关闭
    } catch (error) {
      return false; // 有一个或多个抽屉无法成功关闭
    }
  }
}

export default Drawer;