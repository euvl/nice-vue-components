<template>
<div :class="{beep: true, active}">
  <div class="beep-animation" :style="style"></div>
  <div class="beep-overlay" :style="style"></div>
</div>
</template>
<script>
export default {
  name: 'Beep',
  props: {
    color: {
      type: String,
      default: '#FD0000'
    },
    size: {
      type: Number,
      default: 14
    },
    frequency: {
      type: Number,
      default: 3000
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    style() {
      return {
        'width': this.size + 'px',
        'height': this.size + 'px',
        'background': this.color,
        'border-radius': this.size / 2 + 'px',
        'animation-duration': this.frequency + 'ms'
      };
    }
  }
}
</script>
<style lang="scss">
@keyframes woopwoop {
  0% {
      transform: scale(1);
      opacity: 0.5;
  }
  50% {
      opacity: 0.4;
  }
  100% {
      transform: scale(3);
      opacity: 0;
  }
}

.beep {
  position: absolute;
  left: 0;
  top: 0;

  .beep-overlay {
    position: absolute;
    left: 0;
    top: 0;
  }

  &.active .beep-animation {
    animation-name: woopwoop;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
}
</style>
