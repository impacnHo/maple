<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12>
      <v-card>
        <v-carousel>
          <v-carousel-item v-for="(item, index) in carouselList" :key="index" :src="item"></v-carousel-item>
        </v-carousel>
      </v-card>
    </v-flex>
    <v-flex v-for="(item, index) in bannerList" :key="index" xs6>
      <v-parallax :src="item.src">
        <v-layout align-center column justify-center>
          <h1 class="slogen">{{item.slogen}}</h1>
          <v-btn outline large color="white" class="btn-content" :to="item.to">选购{{item.type}}</v-btn>
        </v-layout>
      </v-parallax>
    </v-flex>
    <v-flex v-for="(item, index) in subBannerList" :key="index" xs4>
      <v-parallax :src="item.src">
        <v-layout align-center column justify-center>
          <h1 class="slogen">{{item.slogen}}</h1>
          <v-btn outline large color="white" class="btn-content" :to="item.to">选购{{item.type}}</v-btn>
        </v-layout>
      </v-parallax>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        carouselList: ['http://pbw790ert.bkt.clouddn.com/banner2.jpg', 'http://pbw790ert.bkt.clouddn.com/banner3.jpg'],
        bannerList: [
          {src: 'http://pbw790ert.bkt.clouddn.com/subBanner2.jpg', flex: '6', slogen: 'YEEZY SEANSON 2018', type: '鞋履', to:'sneaker'},
          {src: 'http://pbw790ert.bkt.clouddn.com/subBanner.jpg', flex: '6', slogen: '人类制造 2018春夏系列', type: '服装', to:'clothes'}
        ],
        subBannerList: [
          {src: 'http://pbw790ert.bkt.clouddn.com/subBanner4.jpg', flex: '4', slogen: 'Off White × RIMOWA', type: '箱包', to: 'bag'},
          {src: 'http://pbw790ert.bkt.clouddn.com/subBanner5.jpg', flex: '4', slogen: 'CASIO', type: '配饰', to:'accessories'},
          {src: 'http://pbw790ert.bkt.clouddn.com/subBanner6.jpg', flex: '4', slogen: '童年玩物系列', type: '生活小物', to:'life'}
        ]
      }
    }
  }
</script>

<style scoped>
  .slogen{
    text-align: center;
    font-family: "Times New Roman";
    font-weight: inherit;
  }

</style>
