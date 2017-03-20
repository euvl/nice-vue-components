import Vue from 'vue';
import DropdownInput from './DropdownInput';

var plugin = {
  install(Vue) {
    if (this.installed) {
      return;
    }

    Vue.component('nice-input', DropdownInput);
  }
}

Vue.use(plugin);
export default plugin;
