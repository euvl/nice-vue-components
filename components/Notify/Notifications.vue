<template>
<div class="notifications" :style="styles">
  <transition-group name="fade" :css="false" @enter="enter" @leave="leave">
    <div class="notification-wrapper"
          v-for="(item, index) in list"
          v-show="item.state != 2"
          :key="item.id"
          :data-id="item.id">
      <div :class="['notification', classes, item.type]" @click="destroy(item)">
        <div v-if="item.title" class="notification-title" v-html="item.title"></div>
        <div class="notification-content" v-html="item.text"></div>
      </div>
    </div>
  </transition-group>
</div>
</template>
<script>
import Vue from 'vue';
import Velocity from 'velocity-animate';

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
      default: 'vue-notification'
    },
    animation: {
      type: Array,
      default() {
        return [
          (el) => {
            var height = el.clientHeight;

            return {
              height: [height, 0],
              opacity: [1, 0]
            }
          },
          {
            height: 0,
            opacity: 0
          }
        ]
      }
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

      if (this.botToTop) {
        this.list.push(item);
      } else {
        this.list.unshift(item);
      }
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
    getAnimation(index, el) {
      return typeof this.animation[index] === 'function'
        ? this.animation[index].call(this, el)
        : this.animation[index];
    },
    destroy(note) {
      clearTimeout(note.timer);
      note.state = STATE.destroyed;
      this.list = this.list
        .filter(v => v.state !== STATE.destroyed);
    },
    enter(el, done) {
      Velocity(el, this.getAnimation(0, el), {
        duration: this.speed,
        complete: done
      });
    },
    leave(el, done) {
      Velocity(el, this.getAnimation(1, el), {
        duration: this.speed,
        complete: done
      });
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
<style>
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

.vue-notification {
  background: #44A4FC;
  border-left: 5px solid #187FE7;
  font-size: 12px;
  padding: 10px;
  color: white;
  margin: 5px;
  margin-top: 0;
}

.vue-notification.warn {
  background: #ffb648;
  border-left: 5px solid #f48a06;
  color: white;
}

.vue-notification.error {
  background: #E54D42;
  border-left: 5px solid #B82E24;
  color: white;
}

.vue-notification.success {
  background: #68CD86;
  border-left: 5px solid #42A85F;
  color: white;
}
</style>
