<template>
  <div class="home">
    <h2>这里是主页</h2>
    <el-input v-model="token.accessToken" placeholder="请输入内容"></el-input>
    <el-input v-model="token.refreshToken" placeholder="请输入内容"></el-input>
    <el-button @click="testFunction">点击</el-button>
    <el-button @click="testRefreshToken">testRefreshToken</el-button>
  </div>
</template>

<script>

import {refreshToken} from "@/api/login";
import {getToken} from "@/plugins/token";
import {addBlog} from "@/api/blog"

export default {
  name: 'Home',
  data() {
    return {
      token: {
        accessToken: '',
        refreshToken: ''
      },
      blog: {
        articleBody: {
          articleBody: {
            content: "秋风扫落叶",
            contentHtml: "<h1>秋风扫落叶</h1>"
          },
          categoryId: "4276266f34cbaa2405a1a95214aba8bb",
          draft: 0,
          summary: "落叶扫秋风",
          tagSet: [
            "2264f20571ff9bae9daa03ec73e373d1"
          ],
          title: "《秋风扫落叶》",
          weight: 0
        }
      }
    }
  },
  components: {},
  methods: {
    testFunction() {
      // console.log(this.token.accessToken)
      
      refreshToken(this.token)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
    },
    testRefreshToken() {
      addBlog(this.blog).then((res) => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
