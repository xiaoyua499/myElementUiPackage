<template>
  <transition name="el-drawer-fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div class="drawer-wrapper ltr">
      <el-button @click="close">关闭</el-button>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      drawer: false,
      direction: 'rtl',
    };
  },
  methods: {
    afterEnter() {
      this.$emit('opened');
    },
    afterLeave() {
      this.$emit('closed');
    },
    close() {

      this.drawer = false
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
@keyframes el-drawer-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes rtl {
  0% {
    transform: translateX(100%); // 从右侧开始
  }
  100% {
    transform: translateX(0); // 移动到左侧
  }
}
@keyframes ltr {
  0% {
    transform: translateX(-100%); // 从右侧开始
  }
  100% {
    transform: translateX(0); // 移动到左侧
  }
}
.drawer-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 30%;
  background-color: #fff;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
  0 16px 24px 2px rgba(0, 0, 0, 0.14),
  0 6px 30px 5px rgba(0, 0, 0, 0.12);
  &.ltr {
    left: 0;
    animation: ltr 0.3s ease forwards;
  }

  &.rtl {
    right: 0;
    animation: rtl 0.3s ease forwards;
  }
}

.el-drawer-fade-enter-active {
  animation: el-drawer-fade-in .3s;
}

.el-drawer-fade-leave-active {
  animation: el-drawer-fade-in .3s reverse;
}
</style>