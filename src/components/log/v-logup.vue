<template>
  <v-app>
    <v-container class="bg" fluid>
      <v-layout justify-center row>
        <v-flex lg4 md5 sm7 xs8 text-center class="pannel" px-5 py-5>
          <div>
            <h1 @click="goIndex">Maple Mall</h1>
            <h4>为你搜罗全球商品</h4>
          </div>
          <div class="mt-5">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field class="my-5" prepend-icon="account_circle"
                            v-model="userRegistry.username"
                            :rules="[rules.counterUsn,rules.validateUsn]"
                            required
                            clearable
                            label="用户名"></v-text-field>
              <v-spacer></v-spacer>
              <v-text-field class="my-5" prepend-icon="fingerprint"
                            required
                            v-model="userRegistry.pwd"
                            :rules="[rules.counterPwd]"
                            :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                            :type="showPwd ? 'text':'password'"
                            @click:append="showPwd = !showPwd"
                            label="密码"></v-text-field>
              <v-text-field class="my-5" prepend-icon="fingerprint"
                            required
                            v-model="confirmPwd"
                            :rules="[rules.counterPwd,rules.samePwd]"
                            type="password"
                            label="再次输入密码"></v-text-field>
              <v-btn large block class="white--text my-5" color="blue darken-2" :disabled="!valid" @click="logup">注册
              </v-btn>
            </v-form>
          </div>
          <h5>已有账户？<span @click="goLogin">登录</span></h5>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  export default {
    name: "v-logup",
    data() {
      return {
        valid: true,
        showPwd: false,
        userRegistry: {
          username: '',
          pwd: ''
        },
        confirmPwd: '',
        rules: {
          counterUsn: value => (value.length > 2 && value.length < 11) || '用户名长度必须为3-10位',
          counterPwd: value => (value.length > 9 && value.length < 21) || '密码长度必须为10-20位',
          validateUsn: value => (/^[A-Za-z0-9]*$/.test(value)) || '用户名只能由数字和英文组成',
          samePwd: value => (value === this.userRegistry.pwd) || '密码输入不一致'
        }
      }
    },
    methods: {
      logup() {
        let options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          url: this.$axios.defaults.baseURL + '/user/register',
          data: this.userRegistry
        }

        this.$axios(options).then(function (response) {
          alert(response.data.message)
        }).catch(function (error) {
          console.log(error)
        })
      },
      goLogin() {
        this.$router.push('/user/login')
      },
      goIndex() {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  .pannel {
    background-color: white;
    border-radius: 10px;
    opacity: 0.97;
  }

  .bg {
    background-image: url("https://preview-ec.dafork.com/FrOP-UzVPC-hv6KY71JgBM7HImNg/1200");
    background-size: cover;
  }

  h1 {
    font-weight: bold;
    font-style: italic;
    font-family: "Times New Roman";
    color: #1565C0;
  }

  h1:hover {
    cursor: pointer;
  }

  h4 {
    font-family: 宋体;
    font-style: italic;
    color: #1565C0;
  }

  span {
    color: #1565C0;
  }

  span:hover {
    cursor: pointer;
  }

</style>
