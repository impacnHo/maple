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
              <v-container text-center fluid>
                <v-layout row wrap>
                  <v-flex lg1>
                    全选
                  </v-flex>
                  <v-flex lg6>商品描述</v-flex>
                  <v-flex lg2>单价</v-flex>
                  <v-flex lg2>数量</v-flex>
                  <v-flex lg1>操作</v-flex>
                </v-layout>
              </v-container>
              <v-divider></v-divider>
              <v-container text-center>
                <v-layout class="item" row wrap align-center v-for="item in items" :key="item.id">
                  <v-flex lg1 md1 sm1 xs1>
                    选择
                  </v-flex>
                  <v-flex lg2 md2 sm2 xs2>
                    <img class="img-fluid" src="http://pbw790ert.bkt.clouddn.com/product/142334.jpg">
                  </v-flex>
                  <v-flex lg4 md4 sm4 xs4>
                    <span class="productName">{{item.name}} {{item.subName}}</span>
                    <br>
                    <span class="sizeName">{{item.stockName}}</span>
                  </v-flex>
                  <v-flex lg2 md2 sm2 xs2><span class="sizeName">&yen;{{item.price}}</span></v-flex>
                  <v-flex lg2 md2 sm2 xs2>
                    <!--append-outer-icon="add" prepend-icon="remove"-->
                    <v-text-field type="number" min="1" v-model.lazy="item.quanlity" class="mt-4" solo></v-text-field>
                  </v-flex>
                  <v-flex lg1 md1 sm1 xs1>
                    <v-btn outline small fab color="red" @click="remove(item.id)">
                      <v-icon dark>delete</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-divider></v-divider>
                </v-layout>
              </v-container>
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
        selectAll: null,
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
  .productName{
    font-style: italic;
    font-size: large;
  }
  .sizeName {
    font-weight: bold;
    font-size: medium;
  }
</style>
