<template>
  <div id="details">
    <div class="row">
      <div class="col-lg-12">
        <div class="btn-group pt-2 mb-3">
          <button class="btn text-light btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Article Tools
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <a v-if="ownArticle" class="dropdown-item" href="#"><router-link :to="{ name: 'editForm', params: { id: id } }">Update Article</router-link></a>
            <a class="dropdown-item" href="#" v-on:click="translate">Translate Article</a>
            <div v-if="ownArticle" class="dropdown-divider"></div>
            <a v-if="ownArticle" class="dropdown-item" href="#" v-on:click="deleteArticle">Delete Article</a>
          </div>
        </div>
      </div>
    </div>
    <div class="text-left text-light mt-0 mb-4">
      <img id="authorImage" class="rounded-circle mr-2" src="https://via.placeholder.com/60x60">
      <p class="author">{{ currentArticle.userId.name }}  |  {{ convertDate(currentArticle.createdAt) }}</p>
    </div>
    <div>
      <h3 class="mb-4 text-light" style="text-transform: uppercase;"><B>{{ currentArticle.title }}</b></h3>
      <img class="mb-4" src="https://via.placeholder.com/770x300">
      <p v-for="(paragraf,index) in formatContent(currentArticle.content)" :key="index" class="text-left text-light">{{ paragraf }}</p><br>
    </div>
    <div v-if="!nowlogin" class="form-group border-top pt-4">
      <p class="text-light">Please <a href="#" class="text-light" data-toggle="modal" data-target="#loginModal">login</a> to post a comment</p>
    </div>
    <div v-if="nowlogin" class="form-group border-top pt-4">
      <p class="text-light">Comments</p>
      <textarea v-model="commentInput" class="form-control mb-3" rows="4" id="commentInput" placeholder="Post a comment"></textarea>
      <button v-on:click="postComment" type="button" class="btn text-light">Submit</button>
    </div>
    <div id="comments" class="card mt-4" v-for="(comment,index) in comments" :key="index">
      <div class="card-body text-left">
        <img class="rounded-circle mr-2" src="https://via.placeholder.com/30x30">
        <p class="mb-4 author">{{ comment.userId.name }}</p>
        <div v-if="checkCommentOwner(comment.userId.email)" class="dropdown">
          <i class="fas fa-ellipsis-v float-right text-dark" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#" v-on:click="deleteComment(comment._id)">Delete Comment</a>
          </div>
        </div>
        <p>{{ comment.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: [ 'id', 'nowlogin' ],
  data () {
    return {
      comments: [],
      commentInput: '',
      currentArticle: '',
      ownArticle: '',
      userEmail: localStorage.getItem('email')
    }
  },
  methods: {
    postComment: function () {
      let token = localStorage.getItem('token')
      let self = this
      axios({
        method: 'post',
        url: 'http://localhost:3000/comments',
        headers: {
          token: token
        },
        data: {
          message: this.commentInput,
          articleId: this.currentArticle._id
        }
      })
        .then(comment => {
          self.commentInput = ''
          self.refreshArticle(self.currentArticle._id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    refreshArticle: function (articleId) {
      let self = this
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${this.id}`
      })
        .then(article => {
          self.currentArticle = article.data.data
          self.comments = []
          article.data.data.comments.forEach(comment => {
            self.comments.push(comment)
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkArticleOwner: function (email) {
      if (email === localStorage.getItem('email')) {
        this.ownArticle = true
      } else {
        this.ownArticle = false
      }
    },
    checkCommentOwner: function (email) {
      if (email === localStorage.getItem('email')) {
        return true
      } else {
        return false
      }
    },
    formatContent: function (content) {
      let newFormat = content.split('\n\n')
      return newFormat
    },
    convertDate: function (date) {
      let newFormat = String(new Date(date)).split(' ').slice(1, 4).join(' ')
      return newFormat
    },
    deleteArticle: function () {
      let self = this
      let token = localStorage.getItem('token')
      axios({
        method: 'delete',
        url: `http://localhost:3000/articles`,
        headers: {
          token: token
        },
        data: {
          id: this.currentArticle._id
        }
      })
        .then(response => {
          self.$emit('refresh-article')
          self.$router.push(`/articles`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteComment: function (id) {
      console.log('masuukk')
      let self = this
      let token = localStorage.getItem('token')
      axios({
        method: 'delete',
        url: `http://localhost:3000/comments`,
        headers: {
          token: token
        },
        data: {
          id: id
        }
      })
        .then(response => {
          self.refreshArticle(self.currentArticle._id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    translate: function () {
      axios({
        method: 'post',
        url: `http://localhost:3000/articles/translate`,
        data: {
          title: this.currentArticle.title,
          content: this.currentArticle.content
        }
      })
        .then(result => {
          this.currentArticle.title = result.data.data.newTitle
          this.currentArticle.content = result.data.data.newContent
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.isLogin = this.nowlogin

    let self = this
    axios({
      method: 'get',
      url: `http://localhost:3000/articles/${this.id}`
    })
      .then(article => {
        self.currentArticle = article.data.data
        self.checkArticleOwner(article.data.data.userId.email)
        self.comments = []
        article.data.data.comments.forEach(comment => {
          self.comments.push(comment)
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  watch: {
    id: function () {
      let self = this
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${this.id}`
      })
        .then(article => {
          self.currentArticle = article.data.data
          self.checkArticleOwner(article.data.data.userId.email)
          self.comments = []
          article.data.data.comments.forEach(comment => {
            self.comments.push(comment)
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    nowlogin: function () {
      this.checkArticleOwner(this.currentArticle.userId.email)
    }
  }
}
</script>

<style scoped>
.dropdown-menu a {
  color: black;
  text-decoration: none;
  font-size: 14px;
}
h3 {
  text-align: left;
}
.row {
  height: 50px;
  text-align: right;
}
.dropdown-toggle {
  font-size: 13px;
}
img {
  display: inline-block;
}
.author {
  display: inline-block;
  font-size: 14px;
}
.form-control {
  width: 60%;
  margin: 0 auto;
  float: none;
}
.card {
  width: 60%;
  margin: 0 auto;
  float: none;
}
#comments {
  background: rgba(255, 255, 255, 0.5);
}
</style>
