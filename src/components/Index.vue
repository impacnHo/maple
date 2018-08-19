<template>
  <v-layout row wrap justify-center align-center>
    <!-- 跑马灯 -->
    <v-carousel>
      <v-carousel-item v-for="item in carouselList" :key="item.index" :src="item.src"></v-carousel-item>
    </v-carousel>
    <!-- 海报 -->
    <v-banner v-for="item in bannerList" :key="item.index" v-bind="item"></v-banner>
    <!-- 副海报 -->
    <v-sub-banner v-for="item in subBannerList" :key="item.index" v-bind="item"></v-sub-banner>
  </v-layout>
</template>

<script>
  import vBanner from './common/v-banner'
  import vSubBanner from './common/v-subBanner'

  export default {
    name: "Index",
    components: {vBanner, vSubBanner},
    data() {
      return {
        carouselList: [
          {index: 1, src: 'http://pbw790ert.bkt.clouddn.com/banner2.jpg'},
          {index: 2, src: 'http://pbw790ert.bkt.clouddn.com/banner3.jpg'}
        ],
        bannerList: [
          {
            index: 3,
            poster: 'http://pbw790ert.bkt.clouddn.com/subBanner2.jpg',
            slogen: 'YEEZY SEANSON 2018',
            type: '鞋履',
            to: 'sneaker'
          },
          {
            index: 4,
            poster: 'http://pbw790ert.bkt.clouddn.com/subBanner.jpg',
            slogen: '人类制造 2018春夏系列',
            type: '服装',
            to: 'clothes'
          }
        ],
        subBannerList: [
          {
            index: 5,
            poster: 'http://pbw790ert.bkt.clouddn.com/subBanner4.jpg',
            slogen: 'Off White × RIMOWA',
            type: '箱包',
            to: 'bag'
          },
          {
            index: 6,
            poster: 'http://pbw790ert.bkt.clouddn.com/subBanner5.jpg',
            slogen: 'CASIO',
            type: '配饰',
            to: 'accessories'
          },
          {
            index: 7,
            poster: 'http://pbw790ert.bkt.clouddn.com/subBanner6.jpg',
            slogen: '童年玩物系列',
            type: '生活小物',
            to: 'life'
          }
        ]
      }
    }
  }
</script>

<style scoped>


</style>
