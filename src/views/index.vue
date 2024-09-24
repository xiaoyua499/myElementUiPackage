<template>
  <div class="home">
    <test :vRadio="vRadio" @changeRadio="changeRadio"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import test from '@/components/test.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    test
  },
  data(){
    return{
      vRadio:1
    }
  },
  methods: {
    changeRadio(value){
      this.vRadio = value
      console.log('选项',this.vRadio);
    }
  }
}
</script>
