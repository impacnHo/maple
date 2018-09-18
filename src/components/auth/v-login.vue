<template>
  <v-app>
    <v-container class="bg" fluid>
      <v-layout justify-center row>
        <v-flex lg4 md5 sm7 xs8 text-center class="pannel" px-5 py-5>
          <div>
            <h1 @click="go(null)">Maple Mall</h1>
            <h4>为你搜罗全球商品</h4>
          </div>
          <div class="mt-5">
            <v-form ref="form" v-model="valid">
              <v-text-field class="my-5" prepend-icon="account_circle" v-model="userRegistry.username" :rules="[rules.counterUsn,rules.validateUsn]" required clearable label="用户名"></v-text-field>
              <v-spacer></v-spacer>
              <v-text-field class="my-5" prepend-icon="fingerprint" required v-model="userRegistry.pwd" :rules="[rules.counterPwd]" :append-icon="showPwd ? 'visibility_off' : 'visibility'" :type="showPwd ? 'text':'password'" @click:append="showPwd = !showPwd" @keyup.enter="login" label="密码"></v-text-field>
              <v-btn large block class="white--text my-5" color="blue darken-2" :disabled="!valid" @click="login">登录
              </v-btn>
            </v-form>
          </div>
          <h5>还没有账户？
            <span @click="go('logup')">注册</span>
          </h5>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import VFoot from "../common/v-foot"
  import {mapMutations} from 'vuex' 

  export default {
    name: "v-login",
    components: {VFoot},
    data() {
      return {
        valid: true,
        showPwd: false,
        userRegistry: {
          username: '',
          pwd: ''
        },
        rules: {
          counterUsn: value => (value.length > 2 && value.length < 11) || '用户名长度必须为3-10位',
          counterPwd: value => (value.length > 9 && value.length < 21) || '密码长度必须为10-20位',
          validateUsn: value => (/^[A-Za-z0-9]*$/.test(value)) || '用户名只能由数字和英文组成'
        }
      }
    },
    methods: {
      ...mapMutations(['updateLoginState']),
      login() {
        // 准备数据
        let options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          url: this.$axios.defaults.baseURL + '/userRegistry/login',
          data: this.userRegistry
        }

        // 发送请求
        this.$axios(options).then((response) => {
          if (response.data.data != null) {
            // 保存用户名和token到sessionStotage
            sessionStorage.setItem('access_token', response.data.data)
            sessionStorage.setItem('username', this.userRegistry.username)
            // 保存用户名和token到vuex
            this.updateLoginState({
              username: this.userRegistry.username,
              token: response.data.data
            })
            this.$router.push(this.$route.query.redirect || '/')
          } else {
            alert('登录失败：' + response.data.message)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      go(name) {
        if(name === null) {
          this.$router.push('/')
        } else {
          this.$router.push('/' + name)
        }
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
  background-image: url('https://preview-ec.dafork.com/FrOP-UzVPC-hv6KY71JgBM7HImNg/1200');
  background-size: cover;
}

h1 {
  font-weight: bold;
  font-style: italic;
  font-family: 'Times New Roman';
  color: #1565c0;
}

h1:hover {
  cursor: pointer;
}

h4 {
  font-family: 宋体;
  font-style: italic;
  color: #1565c0;
}

span {
  color: #1565c0;
}

span:hover {
  cursor: pointer;
}
</style>
