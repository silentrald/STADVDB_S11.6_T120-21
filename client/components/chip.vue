<template>
  <div class="chip">
    {{ text }}
    <div
      class="close"
      @click="$emit('close', tag)"
    >
      X
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      text: ''
    }
  },

  created () {
    this.$set(this, 'text', this.tag.replace('_', ' '))
  }
}
</script>

<style scoped>
.chip {
  cursor: default;

  margin: 2px 4px;
  padding: 2px 8px;

  background-color: #343a40;
}

.close {
  cursor: pointer;

  margin-left: 8px;
}
</style>
