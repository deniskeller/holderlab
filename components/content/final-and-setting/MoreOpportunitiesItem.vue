<script>
import { mapMutations } from 'vuex';
export default {
  components: {},
  props: {
    image: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    list: {
      type: Array,
      default: null
    },
    link: {
      type: String,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div
    :style="{ backgroundImage: `url('${image}')` }"
    class="more-opportunities-item"
  >
    <div class="more-opportunities-item__content">
      <div class="more-opportunities-item__title">
        {{ title }}
      </div>
      <ul class="more-opportunities-item__list">
        <li
          v-for="(item, index) in list"
          :key="index"
          class="more-opportunities-item__list-item"
          v-html="item"
        />
      </ul>
    </div>

    <a
      href="upgrade"
      class="more-opportunities-item__link"
      @click.prevent="setPopup('upgrade-popup')"
    >
      GET PLAN
    </a>
</div></template
>

<style lang="scss">
.more-opportunities-item {
  position: relative;
  padding: em(30px);
  width: em(618px);
  height: em(260px);
  box-sizing: border-box;
  background-color: $white;
  border: 1px solid $grey;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-repeat: no-repeat;
  background-size: contain;
  background-position: right center;

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: em(250px);
    height: 1px;
    top: -1px;
    left: em(30px);
    z-index: 1;
    background-color: $blue;
  }

  &__title {
    $size: 20px;
    font-size: em($size);
  }

  &__list {
    padding: 0 1em;
    margin: 0;
  }
}
</style>
