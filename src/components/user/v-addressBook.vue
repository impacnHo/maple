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
              <h3>我的地址簿</h3>
              <v-address-dialog method="save" title="新增地址" icon="add"
                                v-on:refreshData="getData()"></v-address-dialog>
              <v-btn outline small fab color="blue darken-3" @click="toggle">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-divider></v-divider>
              <v-list three-line v-if="items.length > 0">
                <v-list-tile v-for="item in items" :key="item.id" avatar @click="">
                  <v-list-tile-avatar>
                    <v-icon class="grey lighten-1 white--text">local_shipping</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title><span class="name">{{item.name}}</span></v-list-tile-title>
                    <v-list-tile-sub-title class="mt-2">
                      <span class="address">{{item.address}}</span>
                      <span class="tel">{{item.tel}}</span>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action v-show="edit">
                    <v-address-dialog v-bind="item" method="update" title="修改地址" icon="edit"
                                      v-on:refreshData="getData()"></v-address-dialog>
                  </v-list-tile-action>
                  <v-list-tile-action v-show="edit">
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
  import vAddressDialog from './v-addressDialog'
  import vHeader from '../common/v-header'
  import vFoot from '../common/v-foot'
  import vSidebar from '../common/v-sidebar'

  export default {
    name: "v-addressBook",
    components: {vHeader, vSidebar, vFoot, vAddressDialog},
    data() {
      return {
        edit: false,
        items: []
      }
    },
    methods: {
      toggle() {
        this.edit = !this.edit
      },
      remove(id) {
        // 确认
        let flag = confirm('确认删除此地址？')
        if (flag === false)
          return false

        // 准备请求项
        let me = this
        const options = {
          method: 'DELETE',
          headers: {'access_token': sessionStorage.getItem('access_token')},
          url: this.$axios.defaults.baseURL + '/userConsignee/' + id
        }

        // 发送请求
        this.$axios(options).then(function (response) {
          if (response.data.code === 200) {
            alert('删除成功')
            me.getData('删除')
          } else {
            alert('认证失败')
            me.$axios.push('/login')
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      getData() {
        let me = this
        this.items = []
        const options = {
          method: 'GET',
          headers: {'access_token': sessionStorage.getItem('access_token')},
          url: this.$axios.defaults.baseURL + '/userConsignee/'
        }

        this.$axios(options).then(function (response) {
          if (response.data.code === 200) {
            me.items = response.data.data
          } else {
            alert('认证失败')
            this.$axios.push('/login')
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
  .name {
    font-weight: bold;
    font-size: large;
  }

  .address {
    color: black;
  }

  .tel {
    color: black;
    font-style: italic;
    font-weight: bolder;
  }

  h4 {
    color: grey;
    text-align: center;
  }
</style>
