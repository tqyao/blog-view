<template>
  <div class="home">
    <h2>这里是主页</h2>
    <el-input v-model="token.accessToken" placeholder="请输入内容"></el-input>
    <el-input v-model="token.refreshToken" placeholder="请输入内容"></el-input>
    <el-button @click="testFunction">点击</el-button>
  </div>
</template>

<script>

import {refreshToken} from "@/api/login";
import {getToken} from "@/plugins/token";


export default {
  name: 'Home',
  data() {
    return {
      token: {
        accessToken:'',
        refreshToken:''
      }
    }
  },
  components: {},
  methods: {
    testFunction() {
      console.log(this.token.accessToken)
      console.log()
      refreshToken(this.token.accessToken, this.token.refreshToken).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
