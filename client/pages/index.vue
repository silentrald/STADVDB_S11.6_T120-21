<template>
  <div id="index">
    <div class="container">
      <div class="card-header mt-3">
        <h1 style="font-weight: 800;">
          Developer / Publisher Search
        </h1>
      </div>

      <div class="card mt-3">
        <div class="card-body">
          <h1>Developers</h1>
          <div class="form-group">
            <label>Browse by Developer</label>
            <input
              id="developer"
              v-model="developer"
              class="steam-fields w-100 p-1"
              type="text"
            >
          </div>
        </div>
      </div>

      <div class="card mt-3">
        <div class="card-body">
          <h1>Publishers</h1>
          <div class="form-group">
            <label>Browse by Publisher</label>
            <input
              id="publisher"
              v-model="publisher"
              class="steam-fields w-100 p-1"
              type="text"
            >
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
          @click="init()"
        >
          Search
        </button>
      </div>
      <div class="card mt-3">
        <div class="card-body">
          <h1>
            Results
            <span
              v-if="time > 0"
              class="float-right"
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
                :platforms="game.platform"
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      developer: '',
      publisher: '',
      query: 'Optimized',
      games: [],
      page: 0,
      elements: 100,
      time: 0,
      error: 0
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
      try {
        this.$set(this, 'error', 0)

        const { data } = await this.$axios.get('/api/steam/dev-pub', {
          params: {
            developer: this.developer,
            publisher: this.publisher,
            query: this.query === 'Optimized' ? 'op' : 'or',
            offset: this.page * this.elements,
            limit: this.elements
          }
        })
        this.$set(this, 'games', data.games)
        this.$set(this, 'time', data.time)
      } catch (err) {
        if (err.response.status === 404) {
          this.$set(this, 'error', 404)
        }
      }
    }
  }
}
</script>

<style>
</style>
