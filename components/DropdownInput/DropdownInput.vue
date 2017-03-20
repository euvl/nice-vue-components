<template>
  <div class="nice-dropdown-input">
    todo
    <input type="text" :placeholder="placeholder">
    <div class="nice-dd-list">
      <div class="noce-dd-list-item" v-for="list">
      </div>
    </div>
  </div>
</template>
<script>
  var defaultFilter = (prefix, string) => string.indexOf(prefix) === 0;

  export default {
    name: 'NiceDropdownInput',
    props: {
      placeholder: {
        type: String,
        default: null
      },
      list: {
        type: Array,
        default: () => []
      },
      value: {
        type: String,
        default: ''
      },
      filter: {
        type: [Boolean, Function],
        default: false
      }
    },
    data() {
      return {
        filtered: [],
      }
    },
    methods: {
      input() {

      },
      change() {

      }
    }
  }
</script>
