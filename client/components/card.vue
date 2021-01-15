<template>
  <div class="card m-1" style="width: 14rem; min-height: 350px; background-color: #16202d;">
    <a href="javascript:;" style="text-align: center;" @click="openSteam()">
      <i id="steamlink" class="fab fa-steam-square" />
    </a>
    <div class="card-body pt-1 pb-1">
      <h4 class="card-title mb-1">
        <b> {{ name }} </b>
      </h4>
      <p title="appid#" class="card-data mb-0">
        # {{ appid }} <br>
      </p>
      <p v-if="main_route" class="card-data">
        Publisher:  {{ publisher }} <br>
        Developer:  {{ developer }} <br>
      </p>
      <p v-if="platforms_route" class="card-data">
        OS: {{ platforms }}<br>
      </p>
      <p v-if="pricerange_route" class="card-data">
        Price: {{ price }}<br>
      </p>
      <p v-if="usertags_route" class="card-data">
        Categories: {{ categories }}<br>
      </p>
      <p v-if="toptags_route" class="card-data">
        Categories: {{ categories }}<br>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    appid: {
      type: Number,
      default: 0
    },
    publisher: {
      type: String,
      default: ''
    },
    developer: {
      type: String,
      default: ''
    },
    platforms: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      default: 0
    },
    categories: {
      type: String,
      default: ''
    }
  },
  computed: {
    main_route () {
      return this.$route.path === '/'
    },
    mostplayed_route () {
      return this.$route.path === '/mostplayed'
    },
    platforms_route () {
      return this.$route.path === '/platforms'
    },
    pricerange_route () {
      return this.$route.path === '/pricerange'
    },
    toprated_route () {
      return this.$route.path === '/toprated'
    },
    toptags_route () {
      return this.$route.path === '/toptags'
    },
    usertags_route () {
      return this.$route.path === '/usertags'
    }
  },
  methods: {
    openSteam () {
      window.open(`https://store.steampowered.com/app/${this.appid}`)
    }
  }
}
</script>

<style>

  #steamlink {
    color: #c5c3c0;
    font-size: 10rem;
    transition: 0.1s;
  }

  #steamlink: hover {
    color: blue;
  }

</style>
