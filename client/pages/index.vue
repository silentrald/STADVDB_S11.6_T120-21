<template>
  <div>
    <nav />
    <div class="main">
      <div>
        <a class="logo" href="#content"><img src="https://fontmeme.com/permalink/201206/f716efe3a630e7bf12ba0e75c6f14b4b.png"></a>
        <h1>Netflix Searching Revamped</h1>
      </div>
    </div>

    <div id="content" class="content">
      <br>
      <hr> <br>
      <span class="content-header">Action</span>
      <div class="wrapper">
        <section id="section1">
          <a href="#section3" class="arrow__btn">‹</a>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png/363636/fff">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png/363636/fff">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png/363636/fff">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png/363636/fff">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png/363636/fff">
          </div>
          <a href="#section2" class="arrow__btn">›</a>
        </section>
        <section id="section2">
          <a href="#section1" class="arrow__btn">‹</a>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png/363636/fff">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png/363636/fff">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png/363636/fff">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png/363636/fff">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png/363636/fff">
          </div>
          <a href="#section1" class="arrow__btn">›</a>
        </section>
      </div>

      <span class="content-header">Comedy</span>
      <div class="wrapper">
        <section id="section1">
          <a href="#section3" class="arrow__btn">‹</a>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <a href="#section2" class="arrow__btn">›</a>
        </section>
        <section id="section2">
          <a href="#section1" class="arrow__btn">‹</a>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <a href="#section1" class="arrow__btn">›</a>
        </section>
      </div>

      <span class="content-header">Favorites</span>
      <div class="wrapper">
        <section id="section1">
          <a href="#section3" class="arrow__btn">‹</a>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <a href="#section2" class="arrow__btn">›</a>
        </section>
        <section id="section2">
          <a href="#section1" class="arrow__btn">‹</a>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <div class="item">
            <img src="https://via.placeholder.com/341x192.png">
          </div>
          <a href="#section1" class="arrow__btn">›</a>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.logo {
  display: block;
  transition: 0.3s;
}

.logo:hover {
  transform: scale(1.2);
}

.main {
  margin: 0 auto;
  min-height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #242424;
}

.content {
  min-height: 100vh;
  background-color: #1c1c1c;
  padding: 3rem;
}

.content-header {
  font-weight: bold;
  font-size: 2em;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

<style lang="scss">

/* CAROUSEL */
$itemGrow: 1.2;
$duration: 250ms;

.wrapper {
  display: grid;
  grid-template-columns: repeat(3,100%);
  overflow:hidden;
  scroll-behavior: smooth;

  section {
    width: 100%;
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, auto);
    margin: 20px 0;

    .item {
      padding: 0 2px;
      transition: $duration all;

      &:hover {
        margin: 0 40px;
        transform: scale(1.2);
      }

    }

    a {
      position: absolute;
      color: #fff;
      text-decoration: none;
      font-size: 6em;
      background:rgb(0,0,0);
      width: 80px;
      padding: 20px;
      text-align: center;
      z-index: 1;

      &:nth-of-type(1) {
        top:0; bottom:0; left:0;
        background: transparent;
      }
      &:nth-of-type(2) {
        top:0; bottom:0; right: 0;
        background: transparent;
      }

    }

  }
}

// Remove the arrow for Mobile
@media only screen and (max-width: 600px) {
  a.arrow__btn {
    display:none;
  }
}
</style>
