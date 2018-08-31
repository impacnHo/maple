<template>
  <v-app>
    <v-sidebar></v-sidebar>
    <v-header></v-header>
    <v-content class="bg">
      <v-container grid-list-xl>
        <v-container>
          <v-card>
            <v-container>
              <h3>修改密码</h3>
              <v-divider></v-divider>
              <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-layout wrap row>
                    <v-flex lg2 md3 sm3 xs5>
                      <h5 class='mt-3'>
                        <v-icon>lock</v-icon>
                        旧密码：
                      </h5>
                    </v-flex>
                    <v-flex lg6 md8 sm8 xs7>
                      <v-text-field type="password" v-model="pwds.oldPwd" :rules="[rules.notNull,rules.counterPwd]"
                                    required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap row>
                    <v-flex lg2 md3 sm3 xs5>
                      <h5 class='mt-3'>
                        <v-icon>lock</v-icon>
                        新密码：
                      </h5>
                    </v-flex>
                    <v-flex lg6 md9 sm9 xs7>
                      <v-text-field type="password" v-model="pwds.newPwd"
                                    :rules="[rules.notNull,rules.counterPwd,rules.brandNewPwd]"
                                    required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap row>
                    <v-flex lg2 md3 sm3 xs5>
                      <h5 class='mt-3'>
                        <v-icon>lock</v-icon>
                        确认新密码：
                      </h5>
                    </v-flex>
                    <v-flex lg6 md8 sm8 xs7>
                      <v-text-field type="password" v-model="confirmNewPwd"
                                    :rules="[rules.notNull,rules.counterPwd,rules.samePwd]"
                                    required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <h5 class="attention mt-3">*注意：完成修改密码后需要重新登录</h5>
                  <v-btn large block class="white--text my-5" color="blue darken-2" :disabled="!valid"
                         @click="updatePwd">提交
                  </v-btn>
                </v-form>
              </v-container>
            </v-container>
          </v-card>
        </v-container>
      </v-container>
    </v-content>
    <v-foot></v-foot>
  </v-app>
</template>

<script>
  import vHeader from '../common/v-header'
  import vFoot from '../common/v-foot'
  import vSidebar from '../common/v-sidebar'
  import qs from 'qs'

  export default {
    name: "v-password",
    components: {vHeader, vFoot, vSidebar},
    data() {
      return {
        pwds: {
          oldPwd: '',
          newPwd: ''
        },
        confirmNewPwd: '',
        valid: true,
        rules: {
          notNull: value => (value.length > 0) || '输入框不能为空',
          counterPwd: value => (value.length > 9 && value.length < 21) || '密码长度必须为10-20位',
          samePwd: value => (value === this.pwds.newPwd) || '新密码输入不一致',
          brandNewPwd: value => (value !== this.pwds.oldPwd) || '新密码不能与旧密码一致'
        }
      }
    },
    methods: {
      updatePwd() {
        // 验证
        if (this.pwds.oldPwd === '' || this.pwds.newPwd === '' || this.confirmNewPwd === '') {
          alert('输入框不能为空')
          this.valid = false
          return false
        }

        // 准备请求
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access_token': sessionStorage.getItem('access_token')
          },
          url: this.$axios.defaults.baseURL + '/userRegistry/udPwd',
          data: qs.stringify(this.pwds)
        }

        console.log(options)

        // 发送请求
        let me = this
        this.$axios(options).then(function (response) {
          if (response.data.code === 200) {
            console.log(response.data.data)
            alert('修改成功，请重新登录')
            me.$router.push('/login')
          } else if (response.data.code === 401) {
            alert('请重新登录')
            me.$router.push('/login')
          } else {
            alert(response.data.message)
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
  .attention {
    color: red;
  }

  @media ( max-width: 935px) {
    h5 {
      font-size: .9rem;
    }
  }

  @media ( max-width: 480px) {
    h5 {
      font-size: .9rem;
    }
  }
</style>
