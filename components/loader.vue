<script>
export default {
  components: {},

  props: {
    isDark: {
      type: Boolean,
      default: false
    },
    position: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {};
  },
  computed: {
    cssClass() {
      const color = this.isDark ? 'loader--dark' : 'loader--light';
      const position = this.position === 'center' ? 'loader--center' : '';

      return `${color} ${position}`;
    }
  },
  mounted() {},
  methods: {}
};
</script>

<template>
  <div 
    :class="cssClass" 
    class="loader">
    <div class="loader__blade"/>
    <div class="loader__blade"/>
    <div class="loader__blade"/>
    <div class="loader__blade"/>
    <div class="loader__blade"/>
    <div class="loader__blade"/>
    <div class="loader__blade"/>
    <div class="loader__blade"/>
    <div class="loader__blade"/>
    <div class="loader__blade"/>
    <div class="loader__blade"/>
    <div class="loader__blade"/>
  </div>
</template>

<style lang="scss" scoped>
$dark-blue: #2c3e50;

/* Loader SCSS 👇 */

$spinner-color-light: white;
$spinner-color-dark: $dark-blue;
$spinner-size: 35px;
$spinner-amount: 12;

.loader {
  display: inline-block;
  font-size: $spinner-size;
  height: $spinner-size;
  position: relative;
  vertical-align: middle;
  width: $spinner-size;

  &__blade {
    animation: loader-fade 1s infinite linear;
    background-color: $spinner-color-light;
    border-radius: 0.5em;
    bottom: 0;
    height: 0.2777em;
    left: 0.4629em;
    position: absolute;
    transform-origin: center -0.2222em;
    width: 0.074em;

    $animation-delay: 0s;
    $blade-rotation: 0deg;

    @for $i from 1 through $spinner-amount {
      &:nth-child(#{$i}) {
        animation-delay: $animation-delay;
        transform: rotate($blade-rotation);
        $blade-rotation: $blade-rotation + (360 / $spinner-amount);
        $animation-delay: $animation-delay + (1 / $spinner-amount);
      }
    }
  }

  &--center {
    display: block;
    left: 50%;
    margin: auto;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &--dark .loader__blade {
    /*z-index: 10000;*/
    background-color: $blue;
  }
}

@keyframes loader-fade {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.3;
  }
}
</style>
