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
              <!--<v-container text-center fluid>-->
              <!--<v-layout row wrap>-->
              <!--<v-flex lg2>-->
              <!--<input type="checkbox" id="selectAll" v-model="selectAll">-->
              <!--<label for="selectAll">全选</label>-->
              <!--</v-flex>-->
              <!--<v-flex lg5>商品描述</v-flex>-->
              <!--<v-flex lg2>单价</v-flex>-->
              <!--<v-flex lg2>数量</v-flex>-->
              <!--<v-flex lg1>操作</v-flex>-->
              <!--</v-layout>-->
              <!--</v-container>-->
              <!--<v-divider></v-divider>-->
              <v-container text-md-center>
                <v-layout row wrap>
                  <v-flex lg2>
                    <v-checkbox label="全选" color="blue darken-3"></v-checkbox>
                  </v-flex>
                  <v-flex lg5 class="v-input">
                    <v-label><v-spacer></v-spacer>商品详情</v-label>
                  </v-flex>
                  <v-flex lg2 class="v-input">
                    <v-label>单价</v-label>
                  </v-flex>
                  <v-flex lg2 class="v-input">
                    <v-label>数量</v-label>
                  </v-flex>
                  <v-flex lg1 class="v-input">
                    <v-label>操作</v-label>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout class="item" row wrap align-center v-for="item in items" :key="item.id">
                  <v-flex lg2 md2 sm2 xs2>
                    <v-checkbox color="blue darken-3" :value="item.id" v-model="select"></v-checkbox>
                  </v-flex>
                  <v-flex lg2 md2 sm2 xs2>
                    <img class="img-fluid" @click="getProduct(item.productNum)"
                         :src="'http://pbw790ert.bkt.clouddn.com/product/' + item.productNum +'.jpg'">
                  </v-flex>
                  <v-flex lg3 md3 sm3 xs3>
                    <span class="productName">{{item.name}} {{item.subName}}</span>
                    <br>
                    <span class="sizeName">{{item.stockName}}</span>
                  </v-flex>
                  <v-flex lg2 md2 sm2 xs2><span class="sizeName">&yen;{{item.price}}</span></v-flex>
                  <v-flex lg2 md2 sm2 xs2>
                    <!--append-outer-icon="add" prepend-icon="remove"-->
                    <v-text-field type="number" v-model.lazy="item.quanlity" @blur="updateCart(item.id)" min="1"
                                  :max="item.maxQuanlity" class="mt-4" solo></v-text-field>
                  </v-flex>
                  <v-flex lg1 md1 sm1 xs1>
                    <v-btn outline small fab color="red" @click="removeCart(item.id)">
                      <v-icon dark>delete</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-divider></v-divider>
                </v-layout>
                已选：{{select}}
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
        selectAll: false,
        select:[],
        items: []
      }
    },
    methods: {
      getData() {
        this.items = []
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
      },
      getProduct(productNum) {
        this.$router.push('/product/p/' + productNum)
      },

      // 数据校验
      format(id) {
        let list = this.items
        let quanlity
        for (let i = 0; i < list.length; i++) {
          if (list[i].id === id) {
            if (list[i].quanlity === '' || list[i].quanlity <= 0)
              list[i].quanlity = 1
            if (list[i].quanlity > list[i].maxQuanlity)
              list[i].quanlity = list[i].maxQuanlity
            quanlity = list[i].quanlity
            break
          }
        }
        // 返回结果
        let result = {
          stockId: id,
          quanlity: parseInt(quanlity)
        }
        return result
      },
      updateCart(id) {
        let me = this

        // 数据准备
        let cartDTO = this.format(id)

        // 准备请求
        const options = {
          method: 'PATCH',
          headers: {'access_token': sessionStorage.getItem('access_token')},
          url: this.$axios.defaults.baseURL + '/cart/',
          data: cartDTO
        }

        // 发送请求
        this.$axios(options).then(function (response) {
          if (response.data.code === 200) {
            console.log('修改成功')
          } else {
            console.log('认证失败')
            me.$router.push('/login')
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      removeCart(id) {
        let me = this
        // 准备请求
        const options = {
          method: 'DELETE',
          headers: {'access_token': sessionStorage.getItem('access_token')},
          url: this.$axios.defaults.baseURL + '/cart/' + id,
        }

        // 发送请求
        this.$axios(options).then(function (response) {
          if (response.data.code === 200) {
            console.log('删除成功')
            me.getData()
          } else {
            console.log('认证失败')
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
  .productName {
    font-style: italic;
    font-size: large;
  }

  .sizeName {
    font-weight: bold;
    font-size: medium;
  }

  img:hover {
    cursor: pointer;
  }
</style>
