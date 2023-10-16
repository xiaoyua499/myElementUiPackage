import Vue from 'vue';
import DrawerComp from './index.vue';
import { PopupManager } from 'element-ui/lib/utils/popup'
let instance;
let instances = []
let seed = 1;
const DrawerCtor = Vue.extend(DrawerComp);
const Drawer = async function (props = {}, comp = {}) {
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
  let userOnClose = props.onClose;
  let id = 'drawer_' + seed++;

  props.onClose = function () {
    Message.close(id, userOnClose);
  };
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
  document.body.appendChild(instance.$el);
  instance.$el.style.zIndex = PopupManager.nextZIndex()
  console.log(instance);
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
Drawer.close = function (id, userOnClose) {
  let len = instances.length
  let index = -1
  let removedHeight
  for (let i = 0; i < len.length; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight
      index = i
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }
  if(len<=1||index===-1||index>instances.length-1) return
  for(let i =index;i<len-1;i++){
    let dom = instances[i].$el
    dom.style['top']=parseInt(dom.style['top'],10)-removedHeight-16+'px'
  }
}

export default Drawer;