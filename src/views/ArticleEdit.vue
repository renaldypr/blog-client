<template>
  <div>
    <h1 class="text-light">Update Article</h1>
    <div class="card mt-4 ml-5 mr-5 mb-4">
      <div class="card-body">
        <div class="form-group">
          <input id="title" type="text" class="form-control" placeholder="Article Title" required="required" v-model="titleEdit">
        </div>
        <div class="form-group">
          <textarea v-model="contentEdit" class="form-control" rows="6" id="content" placeholder="Write your content"></textarea>
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-secondary btn-block" v-on:click="updateArticle()">Update Article</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
let url = 'http://blogapi.renaldypratama.xyz'

export default {
  props: [ 'id' ],
  data () {
    return {
      titleEdit: '',
      contentEdit: ''
    }
  },
  methods: {
    updateArticle: function () {
      let self = this
      let token = localStorage.getItem('token')
      axios({
        method: 'patch',
        url: `${url}/articles`,
        headers: {
          token: token
        },
        data: {
          id: this.id,
          title: this.titleEdit,
          content: this.contentEdit
        }
      })
        .then(article => {
          self.$emit('refresh-article')
          self.$router.push(`/articles/${article.data.data._id}`)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    let self = this
    axios({
      method: 'get',
      url: `${url}/articles/${this.id}`
    })
      .then(article => {
        self.titleEdit = article.data.data.title
        self.contentEdit = article.data.data.content
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>

</style>
