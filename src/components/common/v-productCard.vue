<template>
  <v-flex lg4 md4 sm4 xs6>
    <div class="product-card" @click="getProduct(productNum)">
      <img class="card-img-top px-1 py-1" :src="poster" :alt="productNum">
      <div class="card-body">
        <h6>{{name}}</h6>
        <h4 class="hidden-sm-and-down">{{subName}}</h4>
        <h5>
          <span class="badge badge-dark">CNY {{price}}</span>
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
        alert(productNum);
      }
    },
    computed: {
      poster() {
        return 'http://pbw790ert.bkt.clouddn.com/product/' + this.productNum + ".jpg"
      }
      // formatPrice() {
      //   let result;
      //   let before = this.price.toString();
      //   let after = [];
      //   if (before.length > 3) {
      //     let words = before.split('');
      //     let counter = 0;
      //     for (let i = words.length - 1; i >= 0; i--) {
      //       counter++;
      //       after.unshift(words[i]);
      //       if (!(counter % 3) && i != 0) {
      //         after.unshift(',')
      //       }
      //       result += after[i]
      //     }
      //   }
      //   return result;
      // }
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
      font-size: 1.2rem;
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
