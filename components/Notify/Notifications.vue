<template>
<div class="notifications" :style="styles">
  <transition-group :name="animation" mode="out-in">
    <div class="notification-wrapper"
          v-for="(item, index) in list"
          v-show="true"
          v-bind:key="item.id"
          v-bind:data-id="item.id">
      <div v-bind:class="['notification', classes, item.type]"
           v-on:click.stop="destroy(item)">
        <div v-if="item.title" class="notification-title" v-html="item.title"></div>
        <div class="notification-content" v-html="item.text"></div>
      </div>
    </div>
  </transition-group>
</div>
</template>
<script>
import Vue from 'vue';

const VERT_OPTIONS = ['top', 'bottom'];
const HORIZ_OPTIONS = ['left', 'center', 'right'];
const STATE = {idle: 0, destroying: 1, destroyed: 2};
const ID = ((i) => () => i++)(0);

export default {
  name: 'Notify',
  props: {
    position: {
      type: String,
      default: 'top right'
    },
    classes: {
      type: String,
      default: 'default-style'
    },
    animation: {
      type: String,
      default: 'fade'
    },
    reverse: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 300
    },
    duration: {
      type: Number,
      default: 3000
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    Vue.notifications.$on('add', event => {
      var duration = typeof event.duration === 'number'
        ? event.duration
        : this.duration;

      var speed = typeof event.speed === 'number'
        ? event.speed
        : this.speed;

      var item = {
        id: ID(),
        state: STATE.idle,
        title: event.title,
        text: event.text || '',
        type: event.type || null,
        length: duration + speed
      };

      if (duration >= 0) {
        item.timer = setTimeout(() => {
          this.destroy(item);
        }, item.length);
      }

      this.botToTop
        ? this.list.push(item)
        : this.list.unshift(item);
    });
  },
  computed: {
    styles() {
      var object = {};
      var position = [];

      var dirs = this.position
        .split(/\s+/gi)
        .forEach(v => {
          if (!position[0] && VERT_OPTIONS.indexOf(v) != -1) {
            position[0] = v;
          }
          if (!position[1] && HORIZ_OPTIONS.indexOf(v) != -1) {
            position[1] = v;
          }
        });

      return {
        [position[0]] : '0px',
        [position[1]] : '0px'
      }
    },

    botToTop() {
      return this.styles.hasOwnProperty('bottom');
    }
  },
  methods: {
    destroy(note) {
      clearTimeout(note.timer);
      note.state = STATE.destroyed;
      this.list = this.list
        .filter(v => v.state !== STATE.destroyed);
    },
    positionAsArray() {
      if (typeof this.position === 'string') {
        return this.position
          .split(/\s+/gi)
          .filter(v => v !== '');
      }

      return this.position;
    },
  }
}
</script>
<style lang="scss">
.notifications {
  display: block;
  width: 300px;
  position: fixed;
  z-index: 5000;
}

.notification-wrapper {
  display: block;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
}

.notification {
  display: block;
  box-sizing: border-box;
  background: white;
}

.notification-title {
  font-weight: 600;
}

.notification.default-style {
  background: #44A4FC;
  border-left: 5px solid #187FE7;
  font-size: 12px;
  padding: 10px;
  color: white;
  margin: 5px;
  margin-top: 0;

  &.warn {
    background: #ffb648;
    border-left: 5px solid #f48a06;
    color: white;
  }

  &.error {
    background: #E54D42;
    border-left: 5px solid #B82E24;
    color: white;
  }

  &.success {
    background: #68CD86;
    border-left: 5px solid #42A85F;
    color: white;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
