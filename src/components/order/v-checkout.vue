<template>
  <v-app>
    <v-sidebar></v-sidebar>
    <v-header></v-header>
    <v-content class="bg">
      <v-container grid-list-xl fluid>
        <v-container>
          <v-card>
            <v-container>
              <h3>提交订单</h3>
              <v-divider></v-divider>
              <v-container>
                <h4>收货地址</h4>
                <v-card flat class="mydiv">
                  <v-card-text v-if="consignees.length > 0">
                    <v-radio-group v-model="addressId">
                      <v-radio color="blue darken-3" v-for="item in consignees" :key="item.id" :value="item.id"
                               :label="item.name + ' - ' + item.address + ' - ' + item.tel"></v-radio>
                    </v-radio-group>
                  </v-card-text>
                  <v-card-text v-else>
                    请先完成收货地址填写
                  </v-card-text>
                </v-card>
              </v-container>
              <v-container>
                <h4>订单信息</h4>
                <v-card flat class="mydiv">
                  <v-container text-center>
                    <v-layout>
                      <v-flex lg6 md6 sm6 xs6>商品</v-flex>
                      <v-flex lg6 md6 sm6 xs6>价格</v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout class="mylayout" v-for="item in carts" :key="item.id" row wrap align-center>
                      <v-flex lg2 md2 sm2 xs2>
                        <img class="img-fluid" @click="getProduct(item.productNum)"
                             :src="'http://pbw790ert.bkt.clouddn.com/product/' + item.productNum +'.jpg'">
                      </v-flex>
                      <v-flex lg4 md4 sm4 xs4>
                        <span class="productName">{{item.name}} {{item.subName}}</span>
                        <br>
                        <span class="sizeName">{{item.stockName}}</span>
                      </v-flex>
                      <v-flex lg6 md6 sm6 xs6>
                        <h5><span class="unitPrice">&yen;{{item.price}} &times; {{item.quanlity}} = </span>&yen;{{item.price
                          * item.quanlity}}</h5>
                      </v-flex>
                    </v-layout>
                    <v-layout text-right>
                      <v-flex lg12 md12 sm12 xs12>
                        <h6 class="checkOutInfo">支付金额： &yen;{{total}}.00（已包含配送费用）</h6>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
                <v-layout mt-4>
                  <v-spacer></v-spacer>
                  <v-btn large class="white--text" color="blue darken-3"
                         :disabled="this.addressId==null || carts.length ===0"
                         @click="saveOrder">提交订单
                  </v-btn>
                  <v-spacer></v-spacer>
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
  import qs from 'qs'
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "v-checkOut",
    components: {vHeader, vSidebar, vFoot},
    data() {
      return {
        cartIds: [],
        carts: [],
        consignees: [],
        addressId: null
      }
    },
    methods: {
      ...mapMutations(['updateCartList']),
      getData() {
        this.cartIds = this.$route.query.carts
        this.getConsignee()
        this.getCart()
      },
      getConsignee() {
        const options = {
          method: 'GET',
          headers: {'access_token': sessionStorage.getItem('access_token')},
          url: this.$axios.defaults.baseURL + '/userConsignee/'
        }

        this.$axios(options).then(response => {
          if (response.data.code === 200) {
            this.consignees = response.data.data
          } else {
            console.log('认证失败')
            me.$router.push('/login')
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getCart() {
        let allCart = []
        const options = {
          method: 'GET',
          headers: {'access_token': sessionStorage.getItem('access_token')},
          url: this.$axios.defaults.baseURL + '/cart/'
        }

        this.$axios(options).then(response => {
          if (response.data.code === 200) {
            allCart = response.data.data
            // 筛选
            if (allCart.length !== this.cartIds.length) {
              for (let i = 0; i < allCart.length; i++) {
                for (let j = 0; j < this.cartIds.length; j++) {
                  if (this.cartIds[j] !== allCart[i].id) {
                    allCart.splice(i, 1)
                  }
                }
              }
            }
            this.carts = allCart
          } else {
            alert('认证失败')
            me.$router.push('/login')
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getProduct(productNum) {
        this.$router.push('/product/p/' + productNum)
      },
      saveOrder() {
        // 准备数据
        let cartIds = ''
        for(let i = 0;i < this.cartIds.length;i++) {
          cartIds += this.cartIds[i]
          if(i !== this.cartIds.length-1)
            cartIds += ','
        }
        let data = 'cartIds[]=' + cartIds + '&userConsigneeId=' + this.addressId

        // 准备请求
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access_token': sessionStorage.getItem('access_token')
          },
          url: this.$axios.defaults.baseURL + '/order/',
          data: data
        }

        // 发送请求
        this.$axios(options).then(response => {
          if (response.data.code === 200) {
            // 删除vuex中的购物车项目
            let cartList = this.$store.state.cartList
            for(let i = 0;i < cartList.length;i++) {
              for(let j = 0;j < this.cartIds.length;j++) {
                if(cartIds[j] === cartList[i].id) {
                  cartList.splice(i, 1)
                }
              }
            }
            this.updateCartList(cartList)
            this.$router.push('/order/' + response.data.data)
          } else {
            console.log('认证失败')
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    computed: {
      total() {
        let total = 0.00
        for (let i = 0; i < this.carts.length; i++) {
          total += this.carts[i].price * this.carts[i].quanlity
        }
        return total
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
  .mydiv {
    border: 1px solid lightgrey;
    border-radius: 5px;
  }

  .productName {
    font-style: italic;
    font-size: large;
  }

  .sizeName {
    font-weight: bold;
    font-size: medium;
  }

  .unitPrice {
    color: grey;
  }

  img:hover {
    cursor: pointer;
  }

  .mylayout {
    border-bottom: 1px solid lightgrey;
  }

  .checkOutInfo {
    color: red;
  }
</style>
