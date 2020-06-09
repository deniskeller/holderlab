<script>
export default {
  data() {
    return {
      value: 1
    };
  },

  computed: {
    styleWidth() {
      return {
        width: this.value * 50 + '%'
      };
    },
    styleLeft() {
      return {
        left: this.value * 48 + '%'
      };
    }
  },

  // watch: {
  //   x() {
  //     this.$emit('input', this.value / 100);
  //   }
  // },
  mounted() {
    // this.init();
  },

  methods: {
    onChange() {
      this.$emit('input', this.value);
    }

    // init() {
    //   // this.thumbWidth = this.$refs.slider.offsetWidth;
    //   this.elX = this.$el.getBoundingClientRect().left;
    //   this.elWidth = this.$el.offsetWidth;
    //   //this.maxValue = this.elWidth - this.thumbWidth;
    //   this.value = 100; // this.maxValue / 2;
    // },
    // startDrag(e) {
    //   this.init();
    //   document.addEventListener('mousemove', this.drag);
    //   document.addEventListener('mouseup', this.stopDrag);
    //   document.addEventListener('touchmove', this.drag);
    //   document.addEventListener('touchend', this.stopDrag);
    // },
    // stopDrag(e) {
    //   document.removeEventListener('mousemove', this.drag);
    //   document.removeEventListener('mouseup', this.stopDrag);
    //   document.removeEventListener('touchmove', this.drag);
    //   document.removeEventListener('touchend', this.stopDrag);
    // },
    // drag(e) {
    //   this.value = (((e.pageX || e.touches[0].pageX) - this.elX) / this.elX) * 50;
    //   if (this.value < 0) this.value = 0;
    //   if (this.value > this.maxValue) this.value = this.maxValue;
    // }
  }
};
</script>

<template>
  <div class="range-slider">
    <div 
      :style="styleWidth" 
      class="range-slider__ranged" />
    <input
      ref="input"
      v-model="value"
      type="range"
      class="slider"
      min="0"
      max="2"
      steps="0"
      @input="onChange"
    >

    <div 
      ref="slider" 
      :style="styleLeft" 
      class="range-slider__thumb">
      <svg 
        class="range-slider__thumb-icon" 
        viewBox="0 0 9 4">
        <path d="M8,0v4 M4.3,0v4 M0.7,0v4" />
      </svg>
    </div>
  </div>
</template>

<style lang="scss">
input[type='range'] {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
}
// input[type='range']:focus {
//   outline: none;
// }
// input[type='range']::-webkit-slider-runnable-track {
//   width: 96%;
//   height: 6px;
//   cursor: pointer;
//   animate: 0.2s;
//   background: #f7f7f7;
//   border-radius: 10px;
// }
input[type='range']::-webkit-slider-thumb {
  height: 40px;
  width: 40px;
  background: $green;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
  background: none;
  opacity: 0;
  position: relative;
  z-index: 1001;
}
// input[type='range']:focus::-webkit-slider-runnable-track {
//   background: #f7f7f7;
// }
// input[type='range']::-moz-range-track {
//   width: 100%;
//   height: 10px;
//   cursor: pointer;
//   animate: 0.2s;
//   background: #f7f7f7;
//   border-radius: 10px;
// }
input[type='range']::-moz-range-thumb {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  border: 5px solid #fff;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  background: $green;
  cursor: pointer;
  background: none;
  opacity: 0;
}
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #cccccc;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  cursor: pointer;
  overflow: unset;
  border-radius: 10px;
  position: absolute;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  appearance: none;
  width: 34px;
  height: 25px;
  /*background: url('/img/rectangle.svg') no-repeat;*/
  background: none;
  opacity: 0;
  cursor: pointer;
  position: relative;
  z-index: 1000;
  top: em(7px);
  left: em(-6px);
  outline: none;
  overflow: unset;
}

.range-slider {
  position: relative;
  height: em(6px);
  background-color: $grey;
  border-radius: em(3px);

  &__input {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
  }

  &__ranged {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    background-color: $blue;
    border-radius: em(7px);
    /*padding-right: em(10px);*/
  }

  &__thumb {
    @extend %center;
    position: absolute;
    top: em(-4px);
    width: em(28px);
    height: em(14px);
    border: 1px solid $grey;
    box-sizing: border-box;
    border-radius: em(7px);
    background-color: $white;
    box-shadow: 0 em(2px) em(5px) $grey;
    cursor: pointer;

    &-icon {
      stroke: $grey;
      width: em(9px);
      height: em(4px);
    }
  }
}
</style>
