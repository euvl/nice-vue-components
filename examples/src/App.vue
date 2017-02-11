<template>
  <div id="app">
    <h2>
      Beeper
      <nice-beep class="inline-beep" color="#23d813" :frequency="1200"/>
    </h2>
    tl;dr

    <h2>Notifications</h2>
    <nice-notifications animation="fade" :duration="-1"/>

    <button @click="notifyError">Notfiy about error</button>
  </div>
</template>

<script>
const ID = ((i) => () => i++)(0);

export default {
  name: 'app',
  methods: {
    notifyError() {
      this.$notify({
        type: 'error',
        title: 'Error message',
        text: 'This is error #' + ID()
      })
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
