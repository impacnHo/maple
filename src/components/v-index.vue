<template>
  <v-app>
    <v-sidebar></v-sidebar>
    <v-header></v-header>
    <v-content class="bg">
      <v-container grid-list-xl fluid>
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
      </v-container>
    </v-content>
    <v-foot></v-foot>
  </v-app>
</template>

<script>
  import vHeader from './common/v-header'
  import vFoot from './common/v-foot'
  import vSidebar from './common/v-sidebar'
  import vBanner from './common/v-banner'
  import vSubBanner from './common/v-subBanner'

  export default {
    name: "v-index",
    components: {vHeader, vFoot, vSidebar, vBanner, vSubBanner},
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
            to: '/product/sneaker'
          },
          {
            index: 4,
            poster: 'http://pbw790ert.bkt.clouddn.com/subBanner.jpg',
            slogen: '人类制造 2018春夏系列',
            type: '服装',
            to: '/product/clothes'
          }
        ],
        subBannerList: [
          {
            index: 5,
            poster: 'http://pbw790ert.bkt.clouddn.com/subBanner4.jpg',
            slogen: 'Off White × RIMOWA',
            type: '箱包',
            to: '/product/bag'
          },
          {
            index: 6,
            poster: 'http://pbw790ert.bkt.clouddn.com/subBanner5.jpg',
            slogen: 'CASIO',
            type: '配饰',
            to: '/product/accessory'
          },
          {
            index: 7,
            poster: 'http://pbw790ert.bkt.clouddn.com/subBanner6.jpg',
            slogen: '童年玩物系列',
            type: '生活小物',
            to: '/product/life'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .bg {
    background-color: whitesmoke;
  }
</style>
