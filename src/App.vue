<template>
  <div id="app">
    <nav-bar/>
    <router-view/>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar
  },
  created() {
    // if user is in local storage, set the user
    if (localStorage.getItem('user')) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')))
      this.$store.commit('setToken', JSON.parse(localStorage.getItem('token')))
    }
  }
}
</script>
<style lang="scss">
ul, li {
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
}
body {
  margin: 0;
  background: #F4F4F4;
}
h2 {
  font-size: 36px;
}
.error {
  color: #001E76;
}
.input-gray {
  background-color: #F4F4F4;
  border: 0;
  padding: 15px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;         /* Opera/IE 8+ */
}
.ti-input {
  background-color: #F4F4F4;
  border: 0 !important;
  input{
    background-color: #F4F4F4;
  }
}
.input-gray:focus {
  outline: none;
  border: none;
}
.btn-blue {
  background: #001E76;
  color: white;
  border: none;
  padding: 11px;
  font-size: 16px;
}
.btn-blue-sm{
   background: #001E76;
    color: white;
    border: none;
    padding: 11px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 10px;
}
.btn-white {
  background: white;
  color: black;
  border: 2px solid black;
  padding: 9px 11px;
  font-size: 16px;
}
.ql-image{
  display: none !important;
}
.ql-video{
  display: none !important;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
