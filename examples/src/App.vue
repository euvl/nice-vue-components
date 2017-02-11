<template>
  <div id="app">
  <!--  <nice-beep :position="[100, 200]"/>-->
    <h2>
      Beeper
      <nice-beep class="inline-beep" color="#23d813" :frequency="1200"/>
    </h2>

    <h2>Notifications<h2/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 50px;
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

.inline-beep {
  display: inline-block;
  position: relative !important;
}

</style>
