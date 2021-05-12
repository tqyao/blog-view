<template>
  <div class="login_container">
    <div class="login_box">
<!--      <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">-->
<!--        <el-menu-item index="/login">登录</el-menu-item>-->
<!--        <el-menu-item index="/register">注册</el-menu-item>-->
<!--      </el-menu>-->
      <!--登录表单-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" show-password
                    @keyup.native.enter="login"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'tqy',
        password: '123'
      },
      loginFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      let that = this
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          that.$store.dispatch('login', that.loginForm).then(() => {
            that.$router.push('/')
            that.$msgSuccess("登录成功")
          }).catch(error => {
            if (error !== 'error') {
              that.$message.error(error)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login_container {
  height: 100%;
  background-image: url('../../public/image/background.jpg');
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -moz-box-shadow: 2px 2px 10px #909090;
  -webkit-box-shadow: 2px 2px 10px #909090;
  box-shadow: 2px 2px 10px #909090;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  & h3 {
    text-align: center;
  }
}

.login_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: center;

}
</style>