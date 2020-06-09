<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      style: {
        left: (this.x / 0.9) * 100 + '%',
        bottom: (this.y / 0.7) * 100 + '%'
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <BaseCoin 
    :style="style" 
    :title="title" 
    class="risk-coin" />
</template>

<style lang="scss">
.risk-coin {
  position: absolute;
  transform: translate(-50%, 50%);
}
</style>
