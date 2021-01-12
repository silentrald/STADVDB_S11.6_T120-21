<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/"><b>Steam Search</b></a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <nuxt-link
              class="nav-link"
              :class="{
                active: $route.path === '/'
              }"
              to="/"
            >
              Developers <span class="sr-only">(current)</span>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link
              class="nav-link"
              :class="{
                active: $route.path === '/platforms'
              }"
              to="/platforms"
            >
              Platforms
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link
              class="nav-link"
              :class="{
                active: $route.path === '/usertags'
              }"
              to="/usertags"
            >
              Top Rated Games
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link
              class="nav-link"
              :class="{
                active: $route.path === '/pricerange'
              }"
              to="/pricerange"
            >
              Price Range
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link
              class="nav-link"
              :class="{
                active: $route.path === '/toptags'
              }"
              to="/toptags"
            >
              Top Tags
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
</style>
