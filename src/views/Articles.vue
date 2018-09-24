<template>
  <div class="articles">
    <div class="row">
      <div class="col-lg-4 pr-0 border-right">
        <LeftColumn v-on:search-article="searchArticle" v-bind:refresh="refreshArticle"/>
      </div>
      <div class="col-lg-8 pl-5 pr-5">
        <router-view v-bind:searcharticle="searchQuery" v-bind:nowlogin="islogin" v-on:refresh-article="generateRefreshArticle"/>
      </div>
    </div><br>
  </div>
</template>

<script>
import LeftColumn from '@/components/LeftColumn.vue'

export default {
  name: 'articles',
  props: [ 'islogin' ],
  data () {
    return {
      refreshArticle: false,
      searchQuery: ''
    }
  },
  components: {
    LeftColumn
  },
  methods: {
    generateRefreshArticle: function () {
      if (this.refreshArticle) {
        this.refreshArticle = false
      } else {
        this.refreshArticle = true
      }
    },
    searchArticle: function (query) {
      this.searchQuery = query
    }
  }
}
</script>

<style scoped>
.row {
  padding-top: 20px;
}
</style>
