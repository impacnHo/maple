<template>
  <v-app>
    <v-sidebar></v-sidebar>
    <v-header></v-header>
    <v-content class="bg">
      <v-container grid-list-lg text-center>
        <v-layout row wrap>
          <v-flex lg12 md12 sm12 xs12>
            <!--正上部分：左边海报，右边操作板+tips-->
            <!--<v-pd-main v-bind="itemsForMain"></v-pd-main>-->
            <v-card>
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <!--海报-->
                  <v-flex lg6 md6 sm12>
                    <v-card flat>
                      <img class="card-img-top mb-4" :src="poster" alt="poster">
                      <ul class="mt-4">
                        <li>
                          <span class="mx-2">分享</span>
                          <span class="mx-2" v-for="(item,index) in share" :key="index">
                      <v-btn flat icon large><i :class=item></i></v-btn>
                    </span>
                        </li>
                      </ul>
                    </v-card>
                  </v-flex>
                  <!--右-->
                  <v-flex lg6 md6 sm12>
                    <!--操作板-->
                    <v-flex lg16 md12>
                      <v-operator v-bind="itemsForOprt"></v-operator>
                    </v-flex>
                    <!--tips-->
                    <v-flex lg16 md12>
                      <v-tips></v-tips>
                    </v-flex>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex lg6 md6 sm12 xs12>
            <!--左下部分-->
            <v-pd-left v-bind="itemsForLeft"></v-pd-left>
          </v-flex>
          <v-flex lg6 md6 sm12 xs12>
            <!--右下部分-->
            <v-pd-right></v-pd-right>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-foot></v-foot>
  </v-app>


</template>

<script>
  import vHeader from './common/v-header'
  import vFoot from './common/v-foot'
  import vSidebar from './common/v-sidebar'
  import vPdLeft from './product/v-pd-left'
  import vPdRight from './product/v-pd-right'
  import vOperator from "./product/v-operator";
  import vTips from './product/v-tips'

  export default {
    name: "v-productDetail",
    components: {vHeader, vSidebar, vFoot, vOperator, vPdLeft, vPdRight, vTips},
    data() {
      return {
        share: ['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-instagram', 'fab fa-google-plus-g', 'fab fa-tumblr'],
        itemsForOprt: {
          productNum: '',
          brandName: '',
          name: '',
          subName: '',
          price: '',
          stocks: [],
        },
        itemsForLeft: {
          brandName: '',
          productNum: '',
          price: '',
          lanchDate: ''
        }
      }
    },
    computed: {
      poster() {
        let img = 'avatar'
        if ('' !== this.itemsForOprt.productNum && undefined !== this.itemsForOprt.productNum)
          img = this.itemsForOprt.productNum
        return 'http://pbw790ert.bkt.clouddn.com/product/' + img + '.jpg'
      }
    },
    methods: {
      getData(productNum) {
        let me = this;
        let api = '/product/p/' + productNum
        this.$axios.get(api).then(function (response) {
          let items = response.data.data

          me.itemsForOprt.productNum = items.productNum
          me.itemsForOprt.brandName = items.brandName
          me.itemsForOprt.name = items.name
          me.itemsForOprt.subName = items.subName
          me.itemsForOprt.price = items.price
          me.itemsForOprt.stocks = items.stocks

          me.itemsForLeft.brandName = items.brandName
          me.itemsForLeft.productNum = items.productNum
          me.itemsForLeft.price = items.price
          me.itemsForLeft.lanchDate = items.lanchDate
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    created() {
      let productNum = this.$route.params.productNum
      this.getData(productNum)
    }
  }
</script>

<style scoped>
  ul {
    list-style-type: none;
  }

  .bg {
    background-color: whitesmoke;
  }
</style>
