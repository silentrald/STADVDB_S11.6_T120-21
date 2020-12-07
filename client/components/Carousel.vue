<template>
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
</template>

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
