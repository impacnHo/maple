<template>
  <v-app>
    <v-sidebar></v-sidebar>
    <v-header></v-header>
    <v-content class="bg">
      <v-container grid-list-xl>
        <v-container>
          <v-card>
            <v-container>
              <h3>我的档案{{this.$store.getters.profile}}</h3>
              <v-divider></v-divider>
              <v-container>
                <v-layout wrap row>
                  <v-flex lg2 md5 sm5 xs5>
                    <h5 class='mt-3'>
                      <v-icon>edit</v-icon>
                      姓名：
                    </h5>
                  </v-flex>
                  <v-flex lg5 md5 sm5 xs5>
                    <v-text-field v-model="profile.name" :counter='4'></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex lg2 md5 sm5 xs5>
                    <h5 class='mt-3'>
                      <v-icon>bubble_chart</v-icon>
                      性别：
                    </h5>
                  </v-flex>
                  <v-flex lg5 md5 sm5 xs5>
                    <v-radio-group v-model="profile.sex" row>
                      <v-radio color="blue darken-3" :key='1' label='男' value='1'></v-radio>
                      <v-radio color="blue darken-3" :key='0' label='女' value='0'></v-radio>
                    </v-radio-group>
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex lg2 md5 sm5 xs5>
                    <h5 class='mt-3'>
                      <v-icon>location_on</v-icon>
                      地区：
                    </h5>
                  </v-flex>
                  <v-flex lg5 md5 sm5 xs5>
                    <v-text-field v-model="profile.location"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex lg2 md5 sm5 xs5>
                    <h5 class='mt-3'>
                      <v-icon>event</v-icon>
                      生日：
                    </h5>
                  </v-flex>
                  <v-flex lg5 md5 sm5 xs5>
                    <v-menu ref="dateMenu" :close-on-content-click="false" v-model="dateMenu" :nudge-right="40" :return-value.sync="profile.birth" lazy transition="scale-transition" offset-y full-width min-width="290px">
                      <v-text-field slot="activator" v-model="profile.birth" readonly></v-text-field>
                      <v-date-picker v-model="profile.birth" @input="$refs.dateMenu.save(profile.birth)"></v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-btn large class="white--text my-5" color="blue darken-2" @click="updateUserInfo">提交</v-btn>
                </v-layout>
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

  export default {
    name: "v-profile",
    components: {vHeader, vFoot, vSidebar},
    data() {
      return {
        valid: false,
        dateMenu: false,
        row: '1',
        profile: {
          name: '',
          sex: '',
          birth: '',
          location: ''
        }
      }
    },
    methods: {
      getData() {
        // 判断vuex是否存在
        // getters获取为undefined？
        if(this.$store.state.profile === undefined) {
          console.log('不存在')
          // 准备数据
          const options = {
            method: 'GET',
            headers: {'access_token': sessionStorage.getItem('access_token')},
            url: this.$axios.defaults.baseURL + '/userInfo/'
          }

          // 发送数据
          this.$axios(options).then(response => {
            this.profile = response.data.data
            // 数据转换
            this.profile.sex = this.getSex(this.profile.sex)
            this.profile.birth = this.getDate(this.profile.birth)
            // 存入vuex
            this.$store.commit('updateProfile', this.profile)
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('已存在')
          this.profile = this.$store.state.profile
        }
        
      },
      getSex(flag) {
        if (typeof flag === "boolean") {
          return flag === true ? '1' : '0'
        } else {
          return flag === '1' ? true : false
        }
      },
      getDate(time) {
        let date = new Date()
        date.setTime(time)
        return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
      },
      updateUserInfo() {
        if(this.$store.getters.loginState === false) {
          this.$router.push({
            path: '/login',
            query: {
              redirect: '/userInfo/profile'
            }
          })
        } else {
          // 数据转换
          let data = {
            name: this.profile.name,
            sex: this.getSex(this.profile.sex),
            birth: new Date(this.profile.birth),
            location: this.profile.location
          }

          // 准备请求
          const options = {
            method: 'PATCH',
            headers: {'access_token': sessionStorage.getItem('access_token')},
            url: this.$axios.defaults.baseURL + '/userInfo/',
            data: data
          }
        
          // 发送请求
          this.$axios(options).then(response => {
            console.log('result = ' + response.data.data)
            if (response.data.data === true)
              alert('提交成功')
            else
              alert('提交失败')
          }).catch(error => {
            console.log(error)
          })
        }
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
.bg {
  background-color: whitesmoke;
}
</style>
