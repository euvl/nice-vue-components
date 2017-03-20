import Vue from 'vue';

var plugin = {
  install(Vue) {
/*    if (this.installed) {
      return;
    }

    this.installed = true;
    Vue.notifications = new Vue();

    const $notify = (params) => {
      if (typeof params !== 'undefined') {
        if (typeof params !== 'object') {
          params = {title: '', text: params};
        }
        Vue.notifications.$emit('add', params);
      }
    }

    Object.defineProperty(Vue.prototype, '$notify', {
      get: () => $notify
    });
    Vue.component('nice-notifications', Notifications);*/
  }
}

Vue.use(plugin);
export default plugin;
