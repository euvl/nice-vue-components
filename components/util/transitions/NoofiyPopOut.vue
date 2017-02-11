<template>
  <transition
    name="notify-pop-out"
    mode="out-in"
    v-on:before-enter="beforeEnter"
    v-on:after-enter="afterEnter">
    <slot></slot>
  </transition>
</template>

<script>
import Vue from 'vue';

export default {
  methods: {
    beforeEnter: function (el) {
      // ...
    },
    afterEnter: function (el) {
      // ...
    }
  }
}
</script>
