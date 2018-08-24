<template>
  <form @submit.prevent="submit">
    用户名：<input type="text" v-model="userRegistry.username">{{userRegistry.username.length}}<br>
    密码：<input type="password" v-model="userRegistry.pwd">{{userRegistry.pwd.length}}<br>
    <input type="submit" value="提交">
  </form>
</template>

<script>
  export default {
    name: "v-register",
    data() {
      return {
        userRegistry: {
          username: '',
          pwd: ''
        }
      }
    },
    methods: {
      submit() {
        if (this.validate()) {
          console.log('开始注册')
          let options = {
            method: 'POST',
            url: this.$axios.defaults.baseURL + '/user/register',
            data: this.userRegistry
          }

          this.$axios(options).then(function (response) {
            alert(response.data.message)
          }).catch(function (error) {
            console.log(error)
          })
        }
      },
      validate() {
        if (this.userRegistry.username.length < 3 || this.userRegistry.username.length > 10) {
          alert('用户名长度必须在3-10位之间')
          return false
        }

        let regex = /^[A-Za-z0-9]*$/
        if (!regex.test(this.userRegistry.username)) {
          alert('用户名只能由数字和英文组成')
          return false
        }

        if (this.userRegistry.pwd.length < 10 || this.userRegistry.pwd.length > 20) {
          alert('密码长度必须在10-20位之间')
          return false
        }
        return true
      }
    }
  }
</script>

<style scoped>

</style>
