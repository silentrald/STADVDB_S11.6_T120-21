<template>
  <div>
    <ul>
      <li><a class="active" href="#home">Home</a></li>
      <li><a href="#news">Favorites</a></li>
      <li style="float:right"><a href="/signup">Signup</a></li>
      <li style="float:right"><a href="/login">Login</a></li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
  }

  li {
    float: left;
  }

  li a {
    display: block;
    color: white;
    font-weight: bold;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover:not(.active) {
    background-color: #111;
  }

  .active {
    background-color: #dc1a28;
  }
</style>
