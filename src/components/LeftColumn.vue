<template>
  <div class="leftcolumn">
    <div class="card ml-4 mr-4">
      <div class="card-body">
        <div class="form-group">
          <input type="text" class="form-control" id="searchQuery" placeholder="Search article" v-model="searchQuery">
        </div>
        <button type="button" class="btn text-white" v-on:click="searchArticle">Search</button>
      </div>
    </div>
    <br><br>
    <div class="card ml-4 mr-4">
      <div class="card-body">
        <button type="button" class="btn"><router-link :to="{ name: 'form' }">Create a new article</router-link></button>
        <br><br>
        <ul class="list-group">
          <router-link v-for="(article,index) in articles" :key="index" class ="list-group-item list-group-item-action" :to="{ name: 'details', params: { id: article._id } }">{{ article.title }}</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LeftColumn',
  data () {
    return {
      articles: [],
      searchQuery: ''
    }
  },
  props: [ 'refresh' ],
  methods: {
    searchArticle: function () {
      this.$emit('search-article', this.searchQuery)
    }
  },
  created () {
    let self = this
    axios({
      method: 'get',
      url: 'http://localhost:3000/articles'
    })
      .then(articles => {
        articles.data.data.forEach(article => {
          self.articles.push(article)
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  watch: {
    refresh: function (newVal, oldVal) {
      let self = this
      axios({
        method: 'get',
        url: 'http://localhost:3000/articles'
      })
        .then(articles => {
          self.articles = []
          articles.data.data.forEach(article => {
            self.articles.push(article)
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
button a {
  text-decoration: none;
  color: white
}
.card {
  background: rgba(255, 255, 255, 0.5);
}
ul a {
  background: rgba(255, 255, 255, 0.5);
}
.list-group-item:hover {
  background-color: #afb0b1;
}
.list-group-item-action.active {
  background-color: #15441e;
}
</style>
