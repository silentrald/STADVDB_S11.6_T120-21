<template>
  <div class="container">
    <div class="card-header mt-3">
      <h1 style="font-weight: 800;">
        Top Tags
      </h1>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <h1>Top Tags</h1>
        <label>Browse the Top Tags</label>
        <div
          v-for="game in games"
          :key="game.appid"
        >
          {{ game.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      games: [],
      time: 0,
      error: 0
    }
  },

  beforeMount () {
    this.loadPage()
  },

  methods: {
    async loadPage () {
      const { data } = await this.$axios.get('/api/steam/top-tags')
      this.$set(this, 'games', data.games)
      this.$set(this, 'time', data.time)
    }
  }
}
</script>

<style>

</style>
