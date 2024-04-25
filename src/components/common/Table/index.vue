<template>
  <div style="padding: 10px;">
    <table class="custom-table">
      <thead class="my-table-thead">
        <tr class="my-table-header">
          <th
            v-for="(header, index) in headers"
            :key="index"
            :style="{width:`${100/(headers.length)}%`}"
          >{{ header.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="my-table-row"
          v-for="(row, rowIndex) in tableData"
          :key="rowIndex"
          :class="row.type"
          @mouseenter="tableMouseEnter(row, rowIndex, $event)"
          @mouseleave="tableMouseLeave(row, rowIndex, $event)"
        >
          <template v-for="(cell, key) in row">
            <td>
              <el-input
                class="my-table-input"
                type="textarea"
                v-model="tableData[rowIndex][key]"
                resize="none"
                autosize
              ></el-input>
            </td>
          </template>
          <!-- 插入/删除行功能 -->
          <td v-if="insertOrDelete">
            <span v-if="rowIndex===showBtnRow" class="add-row" @click="addRow(rowIndex)">+</span>
            <span v-if="rowIndex===showBtnRow" class="del-row" @click="delRow(rowIndex)">-</span>
            <!-- <span class="add-row" @click="addRow(rowIndex)">+</span> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    headers: {
      type: Array,
      require: true
    }, // 表头数组
    tableData: {
      type: Array,
      require: true
    },// 表格数据数组
    //是都启用插入/删除行功能
    insertOrDelete: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    tableData() {
      this.init()
    }
  },
  data() {
    return {
      showBtnRow: null,//显示插入和删除的行数
    }
  },
  methods: {
    //初始化表格数据
    init() {
      //当行的数据为空时,自动创建和表头对应的对象数据
      let headerArr = []
      this.headers.forEach(header => {
        headerArr.push(header.id)
      });
      // 循环数组对象
      for (let obj of this.tableData) {
        // 循环参考的键值数组
        for (let key of headerArr) {
          // 如果对象中没有这个键值，则添加并将值设为空
          if (!obj.hasOwnProperty(key)) {
            this.$set(obj, key, '');
          }
        }
      }
    },
    //鼠标移入行
    tableMouseEnter(row, rowIndex, event) {
      // 当鼠标移入表格行时显示加号图标
      this.showBtnRow = rowIndex
      this.$emit('row-mouse-enter', row, rowIndex, event)
    },
    //鼠标移出行
    tableMouseLeave(row, rowIndex, event) {
      this.showBtnRow = null
      this.$emit('row-mouse-leave', row, rowIndex, event)
    },
    //插入行
    addRow(rowIndex) {
      // 在指定位置添加一行
      const newRow = {};
      this.tableData.splice(rowIndex + 1, 0, newRow);
    },
    delRow(rowIndex) {
      this.tableData.splice(rowIndex, 1);
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.custom-table {
  width: 100%;
  border: 1px solid #dee0e3;
  border-collapse: collapse;
  border-spacing: 0;
  th,
  td {
    padding: 0;
    border: 1px solid #dee0e3;
    text-align: center;
    font-size: 16px;
    line-height: 32px;
    color: #333;
  }
  .my-table-thead {
    width: 100%;
    .my-table-header {
      width: 100%;
      height: 32px;
      background-color: #0047d61a;
    }
  }
  .my-table-row {
    position: relative;
    min-height: 32px;
    .my-table-input::v-deep {
      .el-textarea__inner {
        width: 100%;
        border: none;
      }
    }
  }
}
/* 添加一些样式来设置加号图标的外观 */
.add-row,
.del-row {
  border: 1px solid;
  height: 10px;
  border-radius: 5px;
  /* width: 10px; */
  line-height: 8px;
  cursor: pointer;
  font-weight: bold;
  z-index: 9;
}
.add-row {
  position: absolute;
  bottom: -5px;
  right: -4px;
  color: green;
}
.del-row {
  position: absolute;
  top: -5px;
  right: -4px;
  color: red;
}
</style>