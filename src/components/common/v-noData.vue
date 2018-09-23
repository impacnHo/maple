<template>
  <v-responsive>
    <v-container fill-height class="main">
      <v-layout align-center>
        <v-flex>
          <i class="fas fa-search"></i>
          <span> 抱歉，没有符合条件的订单。</span>
        </v-flex>
      </v-layout>
    </v-container>
  </v-responsive>
</template>

<script>
  export default {
    name: "v-noData"
  }
</script>

<style scoped>
.main {
  border: 1px solid lightgrey;
  border-radius: 5px;
}
@media (max-width: 935px) {
  h3 {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  h3 {
    font-size: 1.1rem;
  }
}
</style>
