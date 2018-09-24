<template>
  <div id="all">
    <a href="#" v-if="searchResult" class="text-light" v-on:click="returnAllArticle"><i class="fas fa-chevron-left text-light"></i>  Back</a>
    <h2 v-if="searchResult" class="text-white mb-4">Search Results</h2>
    <h2 v-else class="text-white mb-4">Articles</h2>
    <div class="card mb-4 w-75" v-for="(article,index) in articles" :key="index">
      <div class="row h-75">
        <div class="col-md-6">
          <div class="card-body">
            <h4 class="mb-1"><b><router-link :to="{ name: 'details', params: { id: article._id } }">{{ article.title }}</router-link></b></h4>
            <p>{{ shortenArticle(article.content) }}...</p>
            <p id="readMore" class="text-center mt-0"><router-link :to="{ name: 'details', params: { id: article._id } }">Read More</router-link></p>
            <p class="mb-0" id="author"><b>{{ article.userId.name }}</b></p>
            <p class="mt-0 mb-0" id="date">{{ convertDate(article.createdAt) }}</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card-img-bottom h-100">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
let url = 'http://blogapi.renaldypratama.xyz'

export default {
  name: 'articleAll',
  props: [ 'searcharticle' ],
  data () {
    return {
      articles: [],
      allArticles: [],
      searchResult: false
    }
  },
  methods: {
    shortenArticle: function(content) {
      let shorten = content.split('.')[0]
      return shorten
    },
    convertDate: function(date) {
      let newFormat = String(new Date(date)).split(' ').slice(1,4).join(' ')
      return newFormat
    },
    returnAllArticle: function() {
      this.articles = this.allArticles
      this.searchResult = false
    }
  },
  created() {
    let self = this
    axios({
      method: 'get',
      url: `${url}/articles`,
    })
      .then(articles => {
        articles.data.data.forEach(article => {
          self.articles.push(article)
          self.allArticles.push(article)
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  watch: {
    searcharticle: function(newVal,oldVal) {
      this.articles = []
      let query = newVal
      var filter = new RegExp(`${query}`, 'i');
      for (let i = 0; i < this.allArticles.length; i++) {
        if (filter.test(this.allArticles[i].title)) {
          this.articles.push(this.allArticles[i])
        }
      }
      this.$router.push('/articles')
      this.searchResult = true
    }
  }
}
</script>

<style scoped>
.text-dark {
  text-decoration: none;
}
#author, #date, #readMore {
  font-size: 14px;
}
.card {
  margin: 0 auto;
  float: none;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.5); 
}
.card h4,p {
  text-align: left;
}
.card-img-bottom {
  color: #fff;
  background: url('https://via.placeholder.com/276x367') center no-repeat;
  background-size: cover;
}
a, p {
  color: black;
  text-decoration: none;
}
</style>
