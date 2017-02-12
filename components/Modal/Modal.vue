<template>
  <div v-if="visibleOverlay"
       class="nice-modal-overlay"
       @mousedown.stop="toggle(false)">
    <transition :name="transition">
      <div v-if="visibleModal"
           v-bind:class="modalclass"
           v-bind:style="styles"
           v-on:mousedown.stop
           ref="modal">
        <template v-if="withTitle">
          <div class="modal-title">
            <slot name="title-left"></slot>
            <slot name="title-right"></slot>
          </div>
        </template>
        <slot></slot>
        <resizer v-if="resizable" @resize="resize"/>
      </div>
    </transition>
  </div>
</template>
<script>
  import Vue from 'vue';
  import Modal from './index';
  import Resizer from './Resizer.vue';

  const props = {
    name: {
      required: true,
      type: [String, Number],
    },
    withTitle: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Number,
      default: 0,
    },
    position: {
      type: Array,
    },
    resizable: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
    },
    classes: {
      type: [String, Array],
      default: 'nice-modal',
    },
    width: {
      type: Number
    },
  };

  export default {
    name: 'Modal',
    props,
    components: {
      Resizer
    },
    data() {
      return {
        //self: null,
        visible: false,
        visibleModal: false,
        visibleOverlay: false,
        actualWidth: this.width
      };
    },
    watch: {
      visible(value) {
        if (this.delay > 0) {
          if (value) {
            this.visibleOverlay = true;
            setTimeout(() => this.visibleModal = true, this.delay);
          } else {
            this.visibleModal = false;
            setTimeout(() => this.visibleOverlay = false, this.delay);
          }
        } else {
          this.visibleOverlay = value;
          Vue.nextTick(() => this.visibleModal = value);
        }
      },
    },
    created() {
      Modal.event.$on('toggle', (name, state, params) => {
        if (name === this.name) {
          this.toggle(!this.visible, params);
        }
      });

      //this.self = this.$refs.modal;
    },
    computed: {
      modalclass() {
        return ['modal', this.classes];
      },
      styles() {
        if (this.actualWidth) {
          return {
            'margin-left': (-this.actualWidth / 2) + 'px',
            'width': this.actualWidth + 'px',
          };
        }
      },
    },
    methods: {
      resize(event) {
        this.actualWidth = event.size.width;
      },
      toggle(state, params) {
        const before = this.visible ? 'before-close' : 'before-open';
        const after = this.visible ? 'closed' : 'opened';

        var abort = false;

        var beforeEvent = {
          name: this.name,
          state: state,
          params: params || {},
          abort () {
            abort = true
          }
        }

        this.$emit(before, beforeEvent);

        if (!abort) {
          this.visible = !!state;

          var afterEvent = {
            name: this.name,
            params: params || {},
            state: state
          }

          this.$emit(after, afterEvent);
        }
      },
    },
  };
</script>
<style lang="scss">
  .nice-modal-overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.1);
    z-index: 999;

    .modal {
      position: relative;
      overflow: hidden;
      box-sizing: border-box;

      background-color: white;

      left: 50%;
      top: 100px;

      width: 600px;
      margin-left: -300px;

    }
  }

  .nice-modal-fade-enter-active, .nice-modal-fade-leave-active {
    transition: all .3s;
  }

  .nice-modal-fade-enter, .nice-modal-fade-leave-active {
    opacity: 0;
    transform: translateY(-20px);
  }

  .nice-modal {
    background: white;
    text-align: left;
    border-radius: 3px;
    box-shadow: 0 20px 60px -2px rgba(27, 33, 58, .4);
    padding: 0;

    &.nice-modal-fullscreen {
      width: 100vw;
      height: 100vh;
      margin: 0;
      left: 0;
      top: 0;
    }
  }
</style>
