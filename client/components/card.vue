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
      <p v-if="publisher || developer" class="card-data">
        Publisher:  {{ publisher ? publisher : 'None' }} <br>
        Developer:  {{ developer ? developer : 'None' }} <br>
      </p>
      <p v-if="platforms" class="card-data">
        OS: {{ platforms }}<br>
      </p>
      <p v-if="price" class="card-data">
        Price: ${{ price }}<br>
      </p>
      <p v-if="categories" class="card-data">
        Categories: {{ categories }}<br>
      </p>
      <p v-if="website" class="card-data">
        Website: <a :href="website"> {{ website }} </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    appid: {
      type: Number,
      required: true
    },
    publisher: {
      type: String,
      default: undefined
    },
    developer: {
      type: String,
      default: undefined
    },
    platforms: {
      type: String,
      default: undefined
    },
    price: {
      type: Number,
      default: 0
    },
    categories: {
      type: String,
      default: undefined
    },
    website: {
      type: String,
      default: undefined
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

  #steamlink:hover {
    color: #66c0f4;
  }

</style>
