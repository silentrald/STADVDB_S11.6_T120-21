<template>
  <div class="container">
    <div class="card-header mt-3">
      <h1 style="font-weight: 800;">
        Price and Rating
      </h1>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <h1>Price Range</h1>
        <div class="form-group">
          <label>Narrow by Price</label>
          <div class="form-group" style="display: flex;">
            <input
              id="low-range"
              v-model="priceL"
              class="steam-fields w-50 mr-3 p-1"
              placeholder="Low"
            >
            <b>-</b>
            <input
              id="high-range"
              v-model="priceH"
              class="steam-fields w-50 ml-3 p-1"
              placeholder="High"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <h1>Rating</h1>
        <div class="form-group">
          <label>Browse by Publisher</label>
          <select
            id="ratings"
            v-model="ratings"
            class="steam-fields w-100 p-1"
            style="color: white;"
          >
            <option value="opos">
              95 - 99%: Overwhelming Positive
            </option>
            <option value="vpos">
              80 - 94%: Very Positive
            </option>
            <option value="mpos">
              70 - 79%: Mostly Positive
            </option>
            <option value="mix">
              40 - 69%: Mixed
            </option>
            <option value="mneg">
              20 - 39%: Mostly Negative
            </option>
            <option value="vneg">
              0  - 19%: Very Negative
            </option>
          </select>
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
      priceL: '',
      priceH: '',
      ratings: 'opos',
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

        const { data } = await this.$axios.get('/api/steam/pr-rate', {
          params: {
            priceL: this.priceL,
            priceH: this.priceH,
            ratings: this.ratings,
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
