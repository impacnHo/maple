<template>
  <v-app>
    <!-- 左侧工具栏 -->
    <v-sidebar></v-sidebar>
    <!-- 顶部导航栏 -->
    <v-header></v-header>
    <!-- 中间内容 -->
    <v-content class="bg">
      <v-container grid-list-xl>
        <v-container>
          <v-card>
            <v-container>
              <h3>我的购物车</h3>
              <v-divider></v-divider>
              <v-list three-line v-if="items.length > 0">
                <v-list-tile v-for="item in items" :key="item.id" avatar @click="">
                  <v-list-tile-avatar>
                    <v-icon class="grey lighten-1 white--text">local_shipping</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <table border="1">
                        <tr>
                          <td>{{item.id}}</td>
                          <td>{{item.name}} {{item.subName}}</td>
                          <td>{{item.productNum}}</td>
                          <td>{{item.stockName}}</td>
                          <td>{{item.quanlity}}</td>
                        </tr>
                      </table>
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn outline small fab color="red" @click="remove(item.id)">
                      <v-icon dark>delete</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <h4 v-else>暂无数据</h4>
            </v-container>
          </v-card>
        </v-container>
      </v-container>
    </v-content>
    <!-- 底部 -->
    <v-foot></v-foot>
  </v-app>
</template>

<script>
  import vHeader from '../common/v-header'
  import vFoot from '../common/v-foot'
  import vSidebar from '../common/v-sidebar'

  export default {
    name: "v-cartList",
    components: {vHeader, vSidebar, vFoot},
    data() {
      return {
        items: []
      }
    },
    methods: {
      getData() {
        let me = this
        const options = {
          method: 'GET',
          headers: {'access_token': sessionStorage.getItem('access_token')},
          url: this.$axios.defaults.baseURL + '/cart/'
        }

        this.$axios(options).then(function (response) {
          if (response.data.code === 200) {
            me.items = response.data.data
          } else {
            alert('认证失败')
            me.$router.push('/login')
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>

</style>
