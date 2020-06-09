<script>
export default {
  props: {
    percent: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    },
    href: {
      type: String,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="dashboard-aside-item">
    <div class="dashboard-aside-item__percent">
      {{ percent }}
    </div>
    <div class="dashboard-aside-item__text">
      {{ text }}
    </div>
    <a :href="href" class="dashboard-aside-item__link">
      {{ link }}
    </a>
  </div>
</template>

<style lang="scss">
.dashboard-aside-item {
  height: em(157px);
  border: 1px solid $grey;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: em(10px) em(30px);
  margin-bottom: em(7px);

  &__percent {
    $size: 26px;
    font-size: em($size);
    color: $red;
  }

  &__text,
  &__link {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
  }
}
</style>
