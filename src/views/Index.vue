<template>
  <el-container direction="vertical">
    <Nav></Nav>
    <el-main>
      <router-view/>
    </el-main>
    <Footer></Footer>
  </el-container>
</template>

<script>
import Nav from "@/common/Nav";
import Footer from "@/common/Footer";

export default {
  name: "Index",
  components: {
    Nav,
    Footer
  }
}
</script>

<style scoped>

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

/*.el-aside {*/
/*  background-color: #D3DCE6;*/
/*  color: #333;*/
/*  text-align: center;*/
/*  line-height: 200px;*/
/*}*/

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
  min-height: 100vh; /* 没有元素时，也把页面撑开至100% */
}

body > .el-container {
  margin-bottom: 40px;
}

/*.el-container:nth-child(5) .el-aside,*/
/*.el-container:nth-child(6) .el-aside {*/
/*  line-height: 260px;*/
/*}*/

/*.el-container:nth-child(7) .el-aside {*/
/*  line-height: 320px;*/
/*}*/
</style>