<template>
  <v-app>
    <v-sidebar></v-sidebar>
    <v-header></v-header>
    <v-content class="bg">
      <v-container grid-list-xl>
        <v-container>
          <v-card>
              <v-container>
                <h3>我的档案</h3>
                <v-divider></v-divider>
                <v-form v-model="valid">
                  <v-text-field v-model="this.userInfo.name" :counter="4" label="姓名"></v-text-field>
                  <v-radio-group v-model="row" row>
                    <v-radio label="男" value="1" :isActive="true"></v-radio>
                    <v-radio label="女" value="0"></v-radio>
                  </v-radio-group>
                  <v-text-field v-model="this.userInfo.location" :counter="4" label="所在地"></v-text-field>
                  <v-text-field v-model="this.birthDate" label="生日" disabled></v-text-field>
                </v-form>
              </v-container>
          </v-card>
        </v-container>
      </v-container>
    </v-content>
    <v-foot></v-foot>
  </v-app>
  <!--<div>-->
  <!--<h2>{{userInfo.name}}</h2>-->
  <!--<h2>{{this.sexStr}}</h2>-->
  <!--<h2>{{this.birthDate}}</h2>-->
  <!--<h2>{{userInfo.location}}</h2>-->
  <!--</div>-->
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
        row: null,
        userInfo: {
          name: '',
          sex: '',
          birth: '',
          location: ''
        }
      }
    },
    methods: {
      getData() {
        let me = this;
        let token = sessionStorage.getItem('access_token')
        const options = {
          method: 'GET',
          headers: {'access_token': token},
          url: this.$axios.defaults.baseURL + '/userInfo/'
        }
        this.$axios(options).then(function (response) {
          me.userInfo = response.data.data
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    computed: {
      birthDate() {
        let birthDate = new Date()
        birthDate.setTime(this.userInfo.birth)
        return birthDate.toLocaleDateString()
      },
      sexStr() {
        return this.userInfo.sex === true ? '男' : '女'
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
