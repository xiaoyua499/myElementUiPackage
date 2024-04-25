<template>
  <div class="home">
    <test/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import test from '@/components/test.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    test
  }
}
</script>
