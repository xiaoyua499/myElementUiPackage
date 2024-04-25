<template>
  <MyTable
    :headers="headers"
    :tableData="tableData"
    @row-mouse-enter="handleMouseEnter"
    @row-mouse-leave="handleMouseLeave"
  ></MyTable>
</template>

<script>
import MyTable from './common/Table/index.vue'
export default {
  components: {
    MyTable
  },
  data() {
    return {
      headers: [
        {
          id: 1,
          name: '列1'
        },
        {
          id: 2,
          name: '列2'
        }
      ],
      tableData: [
        {
          '1': 123123,
          '2': 123123,
          type: 'def'
        },
        {
          '1': 123123,
          '2': 123123,
          type: 'def'
        }
      ],
      rowIndex: null,
      isFound: false
    }
  },
  methods: {
    handleMouseEnter(row, index, e) {
      this.rowIndex = index
      if (row.type && row.type === 'inser') {
        this.isFound = true
        return
      }
      this.tableData.splice(this.rowIndex + 1, 0, {
        type: 'inser'
      })
      for (let i = this.tableData.length - 1; i >= 0; i--) {
        if (i !== this.rowIndex + 1 && this.tableData[i].type === 'inser') {
          this.tableData.splice(i, 1);
        }
      }
      this.isFound = false
      
    },
    handleMouseLeave(row, index, e) {
      if (row.type && row.type === 'inser') {
        this.tableData.splice(index, 1)
      } else if (row.type && row.type === 'def') {
        setTimeout(() => {
          if (!this.isFound && this.tableData[index + 1].type === 'inser') {
            this.tableData.splice(index + 1, 1)
          }
        }, 100)
      }
      // console.log(row, index, e, 'handleMouseLeave');

    }
  }
}
</script>

<style>
</style>