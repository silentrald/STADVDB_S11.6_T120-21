<template>
  <div>
    <div class="main-background">
      <div class="main">
        <div>
          <a href="#content"><img class="logo" src="https://fontmeme.com/permalink/201206/f716efe3a630e7bf12ba0e75c6f14b4b.png"></a>
          <h1 style="font-size: 28pt;">Netflix Searching Revamped</h1>
        </div>
      </div>
    </div>
    <div id="content" class="content">
      <center><input type="text" class="searchbar" placeholder="Search.."></center>
      <hr>
      <br>
      <span class="content-header">Action</span>
      <Carousel />

      <span class="content-header">Comedy</span>
      <Carousel />

      <span class="content-header">Favorites</span>
      <Carousel />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.searchbar {
  -webkit-appearance: none;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 32px;
  background-color: #333333;
  border-radius: 10px;
  border: solid #757575 2px;
  color: white;
  font-weight: bold;
}

.logo {
  display: block;
  width: 600px;
  transition: 0.3s;
}

.logo:hover {
  transform: scale(1.2);
}

.main-background {
  background-image: url("https://www.lifesavvy.com/thumbcache/0/0/62097272cd066416dcd893f174555918/p/uploads/2020/01/deb2e2c6.jpg");
  background-size: cover;
}

.main {
  margin: 0 auto;
  min-height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgb(28,28,28);
  background: linear-gradient(0deg, rgba(28,28,28,1) 0%, rgba(38,38,38,0.8) 20%);
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
</style>
