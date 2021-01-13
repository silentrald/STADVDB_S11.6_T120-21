<template>
  <div class="card m-1" style="width: 14rem; min-height: 350px; background-color: #16202d;">
    <a href="https://store.steampowered.com/app/{{ appid }}" ><i class="fab fa-steam-square" style="color: #c5c3c0; font-size: 10rem; text-align: center;" /></a>
    <div class="card-body pt-1 pb-1">
      <h4 class="card-title mb-1">
        <b> {{ name }} </b>
      </h4>
      <!-- <h5 class="text-success">
        <b>Overwhelmingly Positive</b>
      </h5> -->
      <p title="appid#" class="card-data mb-0">
        # {{ appid }} <br>
      </p>
      <p v-if="developer" class="card-data">
        Publisher:  {{ publisher }} <br>
        Developer:  {{ developer }} <br>
      </p>
      <p v-if="platforms" class="card-data">
        OS: {{ platforms }}<br>
      </p>
      <p v-if="pricerange" class="card-data">
        Price: {{ price }}<br>
      </p>
      <p v-if="usertags" class="card-data">
        Categories: {{ categories }}<br>
      </p>
      <p v-if="toptags" class="card-data">
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
  }
}
</script>
