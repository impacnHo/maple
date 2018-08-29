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
              <v-btn outline small fab color="blue darken-4">
                <v-icon>add_location</v-icon>
              </v-btn>
              <v-btn outline small fab color="blue darken-4">
                <v-icon>edit_location</v-icon>
              </v-btn>
              <v-divider></v-divider>
              <v-list three-line>
                <v-list-tile v-for="item in items" :key="item.id" avatar @click="">
                  <v-address v-bind="item"></v-address>
                  <v-list-tile-action>
                    <v-btn fab dark small icon color="black" @click="goUpdate(item.id)">
                      <v-icon dark>edit</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action>
                    <v-btn fab dark small icon color="red">
                      <v-icon dark>delete</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
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
  import vAddress from './v-address'
  import vHeader from '../common/v-header'
  import vFoot from '../common/v-foot'
  import vSidebar from '../common/v-sidebar'

  export default {
    name: "v-addressBook",
    components: {vHeader, vSidebar, vFoot, vAddress},
    data() {
      return {
        items: [
          {id: '1', name: '何冠杰', address: '广东省珠海市香洲区北京理工大学', tel: '13192259363'},
          {id: '2', name: '何冠杰', address: '广东省珠海市香洲区北京理工大学', tel: '13192259363'},
          {id: '3', name: '何冠杰', address: '广东省珠海市香洲区北京理工大学', tel: '13192259363'},
          {id: '4', name: '何冠杰', address: '广东省珠海市香洲区北京理工大学', tel: '13192259363'}
        ]
      }
    },
    methods: {
      goUpdate(id) {
        alert(id)
      },
      delete(id) {
        alert(id)
      }
    }
  }
</script>

<style scoped>

</style>
