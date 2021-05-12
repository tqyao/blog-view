<template>
  <el-header>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">logo</div>
      </el-col>

      <el-col :span="14">
        <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo"
                 mode="horizontal"
                 menu-trigger="hover">

          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/find">探索发现</el-menu-item>

          <el-col :span="6" :offset="4">
            <el-input class="me-search"
                      prefix-icon="el-icon-search"
                      v-model="userInput"
                      placeholder="请输入搜索内容"
                      @keyup.enter.native="blogSearch"></el-input>
          </el-col>

          <el-col :span="4" :offset="4">
            <el-menu-item index="/write"><i class="el-icon-edit"></i>写文章</el-menu-item>
          </el-col>
        </el-menu>
      </el-col>

      <el-col :span="6">
        <el-menu :router=true menu-trigger="click" mode="horizontal" active-text-color="#5FB878">
          <template v-if="!user.login">
            <el-menu-item index="/login">
              <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text">注册</el-button>
            </el-menu-item>
          </template>

          <template v-else>
            <el-submenu index>
              <template slot="title">
                <img class="me-header-picture" :src="user.avatar"/>
              </template>
              <el-menu-item index @click="logout"><i class="el-icon-back"></i>退出</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>

    </el-row>
  </el-header>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      activeIndex: '1',
      userInput: '',
      searchResult: []
    };
  },
  methods: {
    //axios调用后端接口，获取搜索结果
    blogSearch() {

    },
    //登出接口
    logout() {

    }
  },
  computed: {
    user() {
      let login = this.$store.state.token != null
      let avatar = null
      return {
        login, avatar
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.me-search {
  width: 300px;
}

</style>