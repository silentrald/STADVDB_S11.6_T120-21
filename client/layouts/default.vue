<template>
  <div>
    <Navbar />
    <div id="main-container">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
export default {}
</script>

<style>
body {
  color: #acb2b8;
  font-family: 'Open Sans', sans-serif;
  background-color: #1b2838;
}

h1 {
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
}

.bg-dark{
  background-color: #171a21 !important;
}

.card {
  background-color: #1f2e41;
  border: 1px solid #26384f;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.card-header {
  background: rgb(57,81,116);
  background: linear-gradient(162deg, rgba(57,81,116,1) 0%, rgba(48,69,98,1) 51%, rgba(33,48,68,1) 100%);
}

.card-data {
  font-size: 10pt;
}

.search-buttons {
  background: rgb(33,101,139);
  background: linear-gradient(180deg, rgba(33,101,139,1) 0%, rgba(23,67,92,1) 100%);
  color: #a4d7f5;

  border: 1px solid #2f89bc;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.steam-fields {
  background-color: #223a4c;
  border: 1px solid black;
  color: white;
}
</style>
