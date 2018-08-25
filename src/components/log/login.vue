<template>
  <v-container>
    <v-layout justify-center row fill-height>
      <v-flex lg6 text-center>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field prepend-icon="account_circle"
                        v-model="userRegistry.username"
                        :rules="[rules.counterUsn,rules.validateUsn]"
                        required
                        clearable
                        label="用户名"></v-text-field>
          <v-text-field prepend-icon="fingerprint"
                        required
                        v-model="userRegistry.pwd"
                        :rules="[rules.counterPwd]"
                        :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                        :type="showPwd ? 'text':'password'"
                        @click:append="showPwd = !showPwd"
                        label="密码"></v-text-field>
          <v-btn large class="white--text" color="blue darken-3" :disabled="!valid" @click="login">登录</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "login",
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
      login() {
        let options = {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          url: this.$axios.defaults.baseURL + '/user/register',
          data: {
            'username': this.userRegistry.username,
            'pwd': this.userRegistry.pwd
          }
        }
        this.$axios(options).then(function (response) {
          if (response.data.data != null)
            console.log('登录成功：token = ' + response.data.data)
          else
            console.log('登录失败：' + response.data.message)
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
