<template>
  <div class="card m-1" style="width: 14rem; background-color: #16202d;">
    <i class="fab fa-steam-square text-success" style="font-size: 10rem; text-align: center;" />
    <div class="card-body pt-1 pb-1">
      <h4 class="card-title mb-1">
        <b> {{ game.name }}</b>
      </h4>

      <h5 class="text-success">
        <b>Overwhelmingly Positive</b>
      </h5>
      <p title="appid#" class="card-data mb-0">
        # {{ game.appid }} <br> <!-- di ko sure -->
      </p>
      <p v-if="developer" class="card-data">
        Publisher:  {{ game.publisher }} <br>
        Developer:  {{ game.developer }} <br>
      </p>
      <p v-if="platforms" class="card-data">
        OS: {{ game.platforms }}<br>
      </p>
      <p v-if="pricerange" class="card-data">
        Price: {{ game.price }}<br>
      </p>
      <p v-if="usertags" class="card-data">
        Categories: {{ game.categories }}<br>
      </p>
      <p v-if="toptags" class="card-data">
        Categories: {{ game.categories }}<br>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  computed: {
    developer () {
      return this.$route.path === '/'
    },
    platforms () {
      return this.$route.path === '/platforms'
    },
    pricerange () {
      return this.$route.path === '/pricerange'
    },
    usertags () {
      return this.$route.path === '/usertags'
    }
  }
}
</script>
