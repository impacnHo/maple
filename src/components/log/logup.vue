<template>
  <v-form v-model="valid">
    <v-text-field prepend-icon="account_circle"
                  required
                  v-model="userRegistry.username"
                  :rules="usernameRules"
                  clearable
                  label="用户名"></v-text-field>
    <v-text-field prepend-icon="fingerprint"
                  required
                  v-model="userRegistry.pwd"
                  :rules="pwdRules"
                  :type="password"
                  label="密码"></v-text-field>
    <v-text-field prepend-icon="fingerprint"
                  required
                  v-model="confirmPwd"
                  :rules="confirmPwdRules"
                  :type="password"
                  label="密码"></v-text-field>
    <v-btn color="blue darken-3" :disabled="!valid" @click="logup">注册</v-btn>
  </v-form>
</template>

<script>
  export default {
    name: "logup",
    data() {
      return {
        valid: true,
        userRegistry: {
          username: '',
          pwd: ''
        },
        confirmPwd: '',
        usernameRules: [
          v => !!v || '用户名不能为空',
          v => v.length < 3 || '用户名长度必须在3-10之间',
          v => v.length > 3 || '用户名长度必须在3-10之间',
          v => !/^[A-Za-z0-9]*$/.test(v) || '用户名只能由英文和数字组成'
        ],
        pwdRules: [
          v => !!v || '密码不能为空',
          v => v.length < 10 || '密码长度必须在10-20之间',
          v => v.length > 20 || '密码长度必须在10-20之间'
        ],
        confirmPwdRules: [
          v => v !== this.userRegistry.pwd || '两次密码输入不一致'
        ]
      }
    },
    methods: {
      logup() {
        alert('注册')
      }
    }
  }
</script>

<style scoped>

</style>
