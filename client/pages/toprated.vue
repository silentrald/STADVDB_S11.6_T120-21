<template>
  <div class="container">
    <div class="card-header mt-3">
      <h1 style="font-weight: 800;">
        User Tags
      </h1>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <h1>Top Rated Games</h1>
        <div class="form-group">
          <label>Browse Top Rated Games</label>
          <div class="form-group" style="display: flex;">
            <select
              id="user-tags"
              v-model="tagInput"
              class="steam-fields w-100 mr-3 p-1"
              list="taglist"
            >
              <option v-for="tag in tagList" :key="tag" :value="tag">
                {{ tag }}
              </option>
            </select>

            <button
              type="button"
              class="search-buttons btn mr-3"
              @click="toggle()"
            >
              {{ query }}
            </button>

            <button
              type="button"
              class="search-buttons btn"
              @click="search()"
            >
              Search
            </button>
          </div>
        </div>
      </div>
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
</template>

<script>
export default {
  data () {
    return {
      tagInput: 'fps',
      query: 'Optimized',
      games: [],
      page: 0,
      elements: 100,
      time: 0,
      error: 0,
      tagList: [
        'action',
        'multiplayer',
        'fps',
        'sci fi',
        'classic',
        'co op',
        'arcade',
        'card game',
        'drama',
        'puzzle',
        'survival',
        'rpg',
        'indie',
        'moba',
        'shooter'
      ]
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
        const tag = this.tagInput.replace(' ', '_')
        const { data } = await this.$axios.get('/api/steam/top-rated-tags', {
          params: {
            tag,
            query: this.query === 'Optimized' ? 'op' : 'or'
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
