<template>
  <v-flex lg4 md4 sm4 xs6>
    <div class="product-card" @click="getProduct(productNum)">
      <img class="card-img-top px-1 py-1" :src="poster" :alt="productNum">
      <div class="card-body">
        <h6>{{name}}</h6>
        <h4 class="hidden-sm-and-down">{{subName}}</h4>
        <h5>
          <span class="badge badge-dark">CNY {{priceStr}}</span>
        </h5>
      </div>
    </div>
  </v-flex>
</template>

<script>
  export default {
    name: "v-productCard",
    props: ['productNum', 'name', 'subName', 'price'],
    methods: {
      getProduct(productNum) {
        let url = 'p/' + productNum;
        this.$router.push(url)
      }
    },
    computed: {
      poster() {
        return 'http://pbw790ert.bkt.clouddn.com/product/' + this.productNum + ".jpg"
      },
      priceStr() {
        if(this.price.toString().length > 3) {
          let items = this.price.toString().split('')
          items.splice(1,0,', ')
          return items.join('')
        }
        return this.price.toString()
      }
    }
  }
</script>

<style scoped>
  .product-card {
    background-color: white;
    border-radius: 5px;
    transition: all 1s;

  }

  .product-card:hover {
    box-shadow: 2px 2px 3px lightslategrey;
    cursor: pointer;
  }

  .card-img-top {
    transition: all 1s;
  }

  .card-img-top:hover {
    transform: scale(1.025);
    opacity: 0.7;
  }

  @media ( max-width: 935px) {
    h6 {
      font-size: .7rem;
    }

    h5 {
      font-size: .9rem;
    }

    h4 {
      font-size: 1.1rem;
    }
  }

  @media ( max-width: 480px) {
    h6 {
      font-size: .5rem;
    }

    h5 {
      font-size: .7rem;
    }

    h4 {
      font-size: .9rem;
    }
  }
</style>
