<template>
  <MyTable
    :headers="headers"
    :tableData="tableData"
    :insertOrDelete="true"
  ></MyTable>
</template>

<script>
import MyTable from '../index.vue'
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
          '2': 123123
        },
        {
          '1': 123123,
          '2': 123123
        }
      ],
    }
  },
  methods: {
  }
}
</script>

<style>
</style>