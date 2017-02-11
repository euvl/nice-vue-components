import Vue from 'vue';
import App from './App.vue';
import all from 'nice-vue-components';

console.log(all);

new Vue({
  el: '#app',
  render: h => h(App)
});
