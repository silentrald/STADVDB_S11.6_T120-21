<template>
  <div class="container">
    <div class="card-header mt-3">
      <h1 style="font-weight: 800;">
        Top Tags
      </h1>
    </div>

    <div class="d-flex flex-column">
      <button
        type="button"
        class="search-buttons w-40 btn mt-3"
        @click="toggle()"
      >
        {{ query }}
      </button>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <h1>Top Tags</h1>
        <!-- <label>Browse the Top Tags</label> -->
        <div
          v-for="game in games"
          :key="game.appid"
          class="d-inline-flex flex-wrap align-items-stretch justify-content-around"
        >
          <card
            :name="game.name"
            :appid="game.appid"
            :publisher="game.publisher"
            :developer="game.developer"
            :platforms="game.platform"
            :price="game.price"
            :categories="game.categories"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: 'Optimized',
      games: [],
      time: 0,
      error: 0
    }
  },

  beforeMount () {
    this.search()
  },

  methods: {
    toggle () {
      this.query = this.query === 'Optimized' ? 'Original' : 'Optimized'
      this.search()
    },

    async search () {
      const { data } = await this.$axios.get('/api/steam/top-tags', {
        params: {
          query: this.query === 'Optimized' ? 'op' : 'or'
        }
      })
      this.$set(this, 'games', data.games)
      this.$set(this, 'time', data.time)
    }
  }
}
</script>

<style>

</style>
