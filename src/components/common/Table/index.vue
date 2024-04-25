<template>
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
        @mouseenter="tableMouseEnter(row,rowIndex,$event)"
        @mouseleave="tableMouseLeave(row,rowIndex,$event)"
      >
        <template v-for="(cell, key) in row">
          <td v-if="key!=='type'">
            <el-input
              class="my-table-input"
              type="textarea"
              v-model="tableData[rowIndex][key]"
              resize="none"
              autosize
            ></el-input>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
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
  },
  watch: {
    tableData() {
      this.init()
    }
  },
  data() {
    return {
      myTableData: [],
    }
  },
  methods: {
    init() {
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
    tableMouseEnter(row, index, event) {
      this.$emit('row-mouse-enter', row, index, event)
    },
    tableMouseLeave(row, index, event) {
      this.$emit('row-mouse-leave', row, index, event)
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
    min-height: 32px;
    &.inser {
      position: relative;
      height: 5px;
      td {
        border-bottom: 1px solid blue;
        border-top: 1px solid blue;
      }
      .my-table-input {
        display: none;
      }
      // &::before,
      // &::after {
      //   content: "";
      //   position: absolute;
      //   top: 0;
      //   right: 0;
      //   width: 20px;
      //   height: 20px;
      //   // background-size: contain;
      // }
      // &::before {
      //   content: "+";
      //   font-size: 20px;
      //   color: green;
      // }

      // &::after {
      //   content: "-";
      //   font-size: 20px;
      //   color: red;
      // }
    }
    .my-table-input::v-deep {
      .el-textarea__inner {
        width: 100%;
        border: none;
      }
    }
  }
}
</style>