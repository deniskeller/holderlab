<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    },
    isActive: {
      type: Boolean,
      default: false
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
  <div class="reason-item">
    <BaseRadio 
      :is-checked="isActive" 
      class="reason-item__radio" />
    <div class="reason-item__title">
      {{ title }}
    </div>
    <transition name="reason-item-link-fade">
      <a 
        v-if="isActive" 
        :href="link" 
        class="reason-item__link">
        NEXT
      </a>
    </transition>
  </div>
</template>

<style lang="scss">
.reason-item {
  $this: &;

  position: relative;
  display: flex;
  align-items: center;
  padding: em(20px);
  border-bottom: 1px solid $grey;
  cursor: pointer;

  &:hover {
    #{$this}__radio {
      border-color: $blue;
    }
  }

  &__title {
    margin-left: em(20px);
  }

  &__link {
    $size: 12px;
    font-size: em($size);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-weight: bold;
  }
}

.reason-item-link-fade-enter-active,
.reason-item-link-fade-leave-active {
  transition-property: transform, opacity;
  transition-duration: 0.4s;
}
.reason-item-link-fade-enter {
  opacity: 0;
  transform: translate(-50%, -50%);
}
.reason-item-link-fade-leave-to {
  opacity: 0;
}
</style>
