<template>
  <v-card flat>
    <v-card-title primary-title>
      <v-container text-left>
        <h5 class="font-weight-light">{{brandName}}</h5>
        <h4 class="font-italic">{{name}} {{subName}}</h4>
        <h6><span class="badge badge-dark">CNY</span> {{price}}</h6>
        <v-divider></v-divider>
        <h5>尺码</h5>
        <v-radio-group v-if="!soldOut" v-model="row" row>
          <v-radio color="blue darken-3" v-for="item in stocks" :key="item.id" :label="item.name"
                   :value="item.id"></v-radio>
        </v-radio-group>
        <h5 v-else class="soldOut">售罄</h5>
        <v-text-field type="number" min="1" :max="this.maxQuanlity" v-model="inputQuanlity" label="数量"
                      outline @keyup="format"></v-text-field>
        <h6>剩余量：<strong>{{maxQuanlity}}</strong></h6>
        <v-btn block large :disabled="allowAddtoCart" color="blue darken-3" class="white--text" @click="addToCart">
          添加购物车
        </v-btn>
      </v-container>
    </v-card-title>
  </v-card>
</template>

<script>
  export default {
    name: "v-operator",
    props: ['brandName', 'name', 'subName', 'price', 'stocks'],
    data() {
      return {
        row: null,
        maxQuanlity: 0,
        inputQuanlity: 1
      }
    },
    computed: {
      // 是否可以添加购物车
      soldOut() {
        return this.maxQuanlity > 0 ? false : true
      },
      allowAddtoCart() {
        if (!this.soldOut && this.row != null)
          return false
        return true
      }
    },
    methods: {
      // 计算某尺码的剩余量
      getStockQlty(id) {
        let result = 0;

        for (let i = 0; i < this.stocks.length; i++) {
          if (this.stocks[i].id === id) {
            result = this.stocks[i].quanlity
          }
        }
        this.maxQuanlity = result
      },
      // 计算总剩余量
      getTotalQlty() {
        let result = 0
        for (let i = 0; i < this.stocks.length; i++) {
          result += this.stocks[i].quanlity
        }
        this.maxQuanlity = result
      },
      // 点击“添加购物车方法”
      addToCart() {
        alert('再按中你')
      },
      format() {
        let val = this.inputQuanlity
        if (val === '')
          this.inputQuanlity = 1
        if (val <= 0)
          this.inputQuanlity = 1
        if (val > this.maxQuanlity)
          this.inputQuanlity = this.maxQuanlity
      }
    },
    watch: {
      // row产生变化时，更新剩余量
      row(val) {
        this.getStockQlty(val)
        this.format()
      },
      // props中stocks产生变化时，更新总剩余量
      stocks(val) {
        this.getTotalQlty()
      }
    }
  }
</script>

<style scoped>
  .soldOut {
    color: grey;
  }
</style>
