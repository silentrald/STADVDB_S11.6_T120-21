<template>
  <div class="container">
    <div class="card-header mt-3">
      <h1 style="font-weight: 800;">
        Platform Search
      </h1>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <h1>Available Platforms</h1>
        <div class="form-check">
          <input
            id="windows"
            v-model="platform"
            class="form-check-input"
            type="radio"
            name="os-select"
            value="windows"
          >
          <label class="form-check-label" for="exampleRadios1">
            <b>Windows</b>
          </label>
        </div>
        <div class="form-check">
          <input
            id="macos"
            v-model="platform"
            class="form-check-input"
            type="radio"
            name="os-select"
            value="mac"
          >
          <label class="form-check-label" for="exampleRadios2">
            <b>macOS</b>
          </label>
        </div>
        <div class="form-check">
          <input
            id="linux"
            v-model="platform"
            class="form-check-input"
            type="radio"
            name="os-select"
            value="linux"
          >
          <label class="form-check-label" for="exampleRadios2">
            <b>Linux</b>
          </label>
        </div>
      </div>
    </div>

    <div class="d-flex flex-column">
      <button
        type="button"
        class="search-buttons w-40 btn mt-3"
        @click="toggle()"
      >
        {{ query }}
      </button>
      <button
        type="button"
        class="search-buttons w-40 btn mt-3"
        @click="search()"
      >
        Search
      </button>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <h1>
          Results
          <span v-if="games.length > 0">
            ({{ games.length }} rows)
          </span>
          <span
            v-if="time > 0"
            :style="{
              float: 'right'
            }"
          >
            Time: {{ time }}ms
          </span>
        </h1>
        <div v-if="error === 404">
          Did Not Find Anything :(
        </div>
        <div v-else>
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
              :platforms="game.platforms"
              :price="game.price"
              :categories="game.categories"
            />
          </div>
          <div>
            <button class="search-buttons w-40 btn mt-3" @click="prev()">
              PREV
            </button>
            <button class="search-buttons w-40 btn mt-3 float-right" @click="next()">
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      platform: 'windows',
      query: 'Optimized',
      games: [],
      page: 0,
      elements: 100,
      time: 0
    }
  },

  methods: {
    toggle () {
      this.query = this.query === 'Optimized' ? 'Original' : 'Optimized'
    },

    next () {
      this.page++
      this.search()
    },

    prev () {
      if (this.page > 0) { this.page-- }
      this.search()
    },

    init () {
      this.page = 0
      this.search()
    },

    async search () {
      const { data } = await this.$axios.get('/api/steam/pl', {
        params: {
          platform: this.platform,
          query: this.query === 'Optimized' ? 'op' : 'or',
          offset: this.page * this.elements,
          limit: this.elements
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
