<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <a class="navbar-brand ml-3" href="#"><router-link to="/"><b>BlogIt</b></router-link></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link class ="nav-link mr-5" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class ="nav-link mr-5" to="/articles">Articles</router-link>
          </li>
          <li class="nav-item">
            <a v-if="!isLogin" class="nav-link mr-5" href="#" data-toggle="modal" data-target="#loginModal">Login</a>
          </li>
          <li class="nav-item">
            <a v-if="!isLogin" class="nav-link" href="#" data-toggle="modal" data-target="#registerModal">Register</a>
          </li>
          <li class="nav-item">
            <a v-if="isLogin" class="nav-link" href="#" v-on:click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <Login v-on:is-login="changeIsLogin"></Login>
    <Register></Register>
  </div>
</template>

<script>
import Login from '@/components/login.vue'
import Register from '@/components/register.vue'

export default {
  name: 'navbar',
  components: {
    Login,
    Register
  },
  methods: {
    getToken: function() {
      return localStorage.getItem('token')
    },
    logout: function() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('email')
      this.isLogin = false
      this.$emit('login-status', false)
    },
    changeIsLogin: function(condition) {
      this.isLogin = condition
      this.$emit('login-status', true)
    }
  },
  data() {
    return {
      isLogin: ''
    }
  },
  created() {
    this.isLogin = this.getToken()
  }
}
</script>

<style scoped>
.navbar {
  /* background: rgba(0, 0, 0, 0.0);  */
  background: rgba(0, 0, 0, 0.5);
}
.navbar-brand a{
  color: white;
}
</style>
