<template>
  <transition name="el-drawer-fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div class="drawer-wrapper" :class="drawer ? `${direction}` : `${direction}-out`" :style="`width: ${drawerWidth};`"
      tabindex="-1" v-show="drawer">
      <header class="drawer-header" id="drawer-title" v-if="showHeader">
        <span>{{ title }}</span>
        <button class="drawer-close-btn" type="button" v-if="showClose" @click="closeDrawer">
          <i class="drawer-close-icon  el-icon el-icon-close"></i>
        </button>
      </header>
      <section class="drawer-body">
        <slot></slot>
      </section>
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
    width: {
      type: [Number, String],
      default: '30%'
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      drawer: false,
      direction: 'rtl',
    };
  },
  computed: {
    drawerWidth() {
      return typeof this.width === 'number' ? `${this.width}px` : this.width;
    }
  },
  methods: {
    afterEnter() {
      this.$emit('opened');
    },
    afterLeave() {
      this.$emit('closed');
    },
    close(options) {
      const defaultOptions = {
        confirm: false,
        success: true,
        successMsg: '保存成功'
      }
      const { confirm , success , successMsg }={...defaultOptions ,...options }
      if (confirm) {
        return new Promise((resolve, reject) => {
          this.$confirm('是否保存', '系统提示', {
            confirmButtonText: '提交',
            cancelButtonText: '取消',
            customClass: 'myMessage'
          }).then(() => {
            if (success) {
              this.$message({
                type: 'success',
                message: successMsg
              });
            }
            this.drawer = false;
            setTimeout(() => {
              this.$el.parentNode.removeChild(this.$el);
            }, 300)
            resolve(true); // 表示成功关闭抽屉
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消'
            });
            resolve(false); // 表示取消关闭抽屉
          });
        });
      } else {
        this.drawer = false
        setTimeout(() => {
          this.$el.parentNode.removeChild(this.$el);
        }, 300)
      }

    },
    closeDrawer(data) {
      this.close(data)
    },
  },
  mounted() {
  },
}
</script>

<style lang="less" scoped>
@keyframes drawer-fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes drawer-rtl-in {
  0% {
    transform: translateX(100%); // 从右侧开始
  }

  100% {
    transform: translateX(0); // 移动到左侧
  }
}

@keyframes drawer-ltr-in {
  0% {
    transform: translateX(-100%); // 从右侧开始
  }

  100% {
    transform: translateX(0); // 移动到左侧
  }
}

@keyframes drawer-ltr-out {
  0% {
    transform: translate(0px, 0px);
  }

  100% {
    transform: translate(-100%, 0px);
  }
}

@keyframes drawer-rtl-out {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
}

.drawer-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100%;
  // width: 30%;
  background-color: #fff;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
    0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12);

  &.ltr {
    left: 0;
    animation: drawer-ltr-in 0.3s ease forwards;

    &-out {
      left: 0;
      animation: drawer-ltr-out 0.3s ease forwards;
    }
  }

  &.rtl {
    right: 0;
    animation: drawer-rtl-in 0.3s ease forwards;

    &-out {
      right: 0;
      animation: drawer-rtl-out 0.3s ease forwards;
    }
  }

  .drawer-header {
    align-items: center;
    color: rgb(114, 118, 123);
    display: flex;
    margin-bottom: 32px;
    padding: 20px 20px 0;

    &> :first-child {
      flex: 1;
    }

    .drawer-close-btn {
      border: none;
      cursor: pointer;
      font-size: 14px;
      color: inherit;
      background-color: transparent;
    }
  }

  .drawer-body {
    flex: 1;
    overflow: auto;

    &>* {
      box-sizing: border-box;
    }
  }
}

.el-drawer-fade-enter-active {
  animation: drawer-fade-in .3s;
}

.el-drawer-fade-leave-active {
  animation: drawer-fade-in .3s reverse;
}
</style>