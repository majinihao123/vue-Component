<template>
  <div id="app">
    <router-link to="/">首页</router-link>
    <router-link to="/time-picker">时间组件</router-link>
    <router-link to="/edit-table">可编辑表格</router-link>
    <router-link to="/addForm">表单生成</router-link>
    <router-view />
  </div>
</template>

<script>
import router from './router';

export default {
  name: 'App',
  components: { router }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
