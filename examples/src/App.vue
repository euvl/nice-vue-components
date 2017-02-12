<template>
  <div id="app">
    <h2>
      Beeper
      <nice-beep class="inline-beep" color="#23d813" :frequency="1200"/>
    </h2>
    <div>
      tl;dr
    </div>

    <h2>Notifications</h2>
    <nice-notifications name="example-1" animation="fade"/>
    <nice-notifications position="bottom left"/>
    <button @click="notifyExample0">Example 1</button>
    <button @click="notifyExample1">Example 2</button>

    <h2>Modals</h2>
    <nice-modal name="example-modal" :draggable="true" :resizable="true">
      <div style="padding: 10px">
        <div>This is a modal.</div>
        <div>Click outside of the window to close it.</div>
      </div>
    </nice-modal>
    <button @click="modalExample0">Example 1</button>
  </div>
</template>

<script>
const ID = ((i) => () => i++)(0);

export default {
  name: 'app',
  methods: {
    notifyExample0() {
      this.$notify({
        type: 'error',
        group: 'example-1',
        title: 'Error message',
        text: 'This is error message #' + ID()
      });
    },
    notifyExample1() {
      this.$notify({
        type: 'warn',
        duration: 10000,
        title: 'Warning message',
        text:
          `
          Warning #${ID()} <br>
          Notification will dissapear in 10 sec<br>
          Rendering <b>HTML</b>
          `
      });
    },
    modalExample0() {
      this.$modal.show('example-modal');
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
