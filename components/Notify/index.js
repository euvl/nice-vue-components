import Vue from 'vue';
import Notifications from './Notifications.vue';

var Notify = {
  install(Vue) {
    if (this.installed) return;

    this.installed = true;
    Vue.notifications = new Vue();

    const $notify = (params) => {
      if (typeof params === 'string') {
        params = {
          title: '',
          text: params
        }
      }

      params = params || {};
      Vue.notifications.$emit('add', params);
    }

    Vue.prototype.$notify = $notify;
    Vue.component('nice-notifications', Notifications);
  }
}

Vue.use(Notify);
export default Notify;
