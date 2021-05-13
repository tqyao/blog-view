<template>
  <div class="register_container">
    <div class="register_box">
      <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo register_header" mode="horizontal">
        <el-menu-item index="/login">登录</el-menu-item>
        <el-menu-item index="/register">注册</el-menu-item>
      </el-menu>

      <!--注册表单-->
      <div class="register-from">

        <el-form :inline="true" class="phone-from">
          <el-form-item class="phone-select">
            <el-select v-model="value" placeholder="区号">
              <el-option
                  v-for="item in phone.areaCode"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input v-model="phone.phoneNumber" placeholder="手机号"></el-input>
          </el-form-item>
        </el-form>

        <el-form :inline="true" :model="phone.code" class="verification-code-from" >
          <el-form-item>
            <el-input v-model="phone.code" placeholder="验证码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">点击发送</el-button>
          </el-form-item>
        </el-form>

        <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules">
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" prefix-icon="el-icon-user-solid" placeholder="昵称"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" show-password
                      @keyup.native.enter=""
                      placeholder="密码"></el-input>
          </el-form-item>

          <el-form-item class="btns">
            <el-button type="primary" round @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>


    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      phone: {
        areaCode: [{
          value: '86',
          label: '中国'
        }],
        phoneNumber: '',
        code:''
      },

      registerForm: {
        username: '',
        password: ''
      },
      registerFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">


.register_container {
  height: 100%;
  background-image: url('../../public/image/background.jpg');
}

.register_header {
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  border-bottom: solid 0;

  .el-menu-item:nth-child(2) {
    border-bottom-color: #409EFF !important;
    border-bottom: 2px solid;
  }
}

.register_box {
  width: 450px;
  height: 500px;
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

.register_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.register-from {
  position: absolute;
  top: 125px;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}


.btns {
  display: flex;
  justify-content: center;

  .el-button {
    padding: 12px 51px
  }
}
</style>