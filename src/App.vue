<template>
 <div id="app">
  <app-header></app-header>
  <router-view>
  </router-view>
 </div>
</template>

<script>

import header from './components/header.vue';
import todo from './components/todo.vue';

export default {
  components: { 'app-header': header, 'todo': todo },
  
 
  name: 'app',
  data () {
    return {

      msg: 'Welcome to Your Vue.js App'
    }
  },
}
</script>

<style>
#app {
    max-width: 1200px;
      margin: 0 auto;
  }
</style>
