<template>
  <div id="app">
    <NavBar v-on:login-status="ChangeLoginStatus"></NavBar>

    <router-view v-bind:islogin="isLogin"/>

    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      isLogin: this.checkLogin()
    }
  },
  methods: {
    ChangeLoginStatus: function(condition) {
      if (this.isLogin) {
        this.isLogin = false
      } else {
        this.isLogin = true
      }
    },
    checkLogin: function() {
      if (localStorage.getItem('token')) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url('http://www.sompaisoscatalans.cat/simage/29/299932/os-x-mavericks-wallpaper.jpg');
  background-size: 100%;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.row {
  height: 570px;
}
.col-lg-4, .col-lg-8 {
  overflow: scroll;
}
.btn {
  order:0px solid transparent;
  background: rgb(11, 85, 60);
}
.btn:hover {
  background: rgb(12, 37, 82);
}
</style>
