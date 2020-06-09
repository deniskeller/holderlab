<script>
import { mapState, mapMutations } from 'vuex';
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    id_coin: {
      type: String,
      default: '0'
    },
    short: {
      type: String,
      default: null
    },
    percent: {
      type: Number,
      default: null
    },
    close: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      intermediate_value: 0,
      edit: false
    };
  },
  computed: {
    ...mapState('page', ['selectedCoinList']),

    isVisible() {
      for (let item of this.selectedCoinList) {
        if (this.id_coin === item.id_coin) {
          return true;
        }
      }
      return false;
    },

    value: {
      get: function() {
        if (isNaN(this.percent)) {
          return '0';
        } else {
          return this.percent;
        }
      },

      set: function(newValue) {
        this.setUpdateSelectedCoinList2({
          title: this.title,
          percent: String(newValue)
        });
      }
    }
  },

  mounted() {},

  methods: {
    ...mapMutations('page', [
      'setUpdateSelectedCoinList2',
      'setDellItemInSelectedCoinList'
    ]),

    onlyForCurrency($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      // let temp;
      // temp = (this.value.toString().match(new RegExp('.', 'g')) || []).length;
      // if (temp === 1 && keyCode == 46) {
      //   $event.preventDefault();
      // }

      if (keyCode === 46 && this.value.length == 0) {
        $event.preventDefault();
      }
      // only allow number and one dot
      if (
        (keyCode < 48 || keyCode > 57) &&
        (keyCode !== 46 || this.value.toString().indexOf('.') != -1)
      ) {
        // 46 is dot
        $event.preventDefault();
      }

      // restrict to 2 decimal places
      if (
        this.value != null &&
        this.value.toString().indexOf('.') > -1 &&
        this.value.toString().split('.')[1].length > 1
      ) {
        $event.preventDefault();
      }
    },

    onInput(e) {
      this.value = this.$refs.input.value || 0;
      this.$emit('change');
    },

    onClose() {
      this.setDellItemInSelectedCoinList(this.id_coin);
      setTimeout(() => {
        this.$emit('close');
      }, 300);
    },

    onChange() {
      this.$emit('change');
    },

    // событие вызова поля ввода
    toggleEdit: function(value, e) {
      this.edit = true;
      this.$nextTick(() => {
        this.$refs.input.select();
      });
    },
    // сохранение значения инпута
    saveEdit: function(value) {
      this.edit = false;
    },
    // валидация кнопки %
    handleChange: function(value) {
      if (this.value < 0) {
        this.value = 0;
      }
      if (this.value > 100) {
        this.value = 100;
      }
    }
  }
};
</script>

<template>
  <transition name="aside-allocated-asset-fade">
    <div 
      v-if="isVisible" 
      class="aside-allocated-asset">
      <BaseCurrency3
        :id_market="id_coin"
        :title="title"
        type="coins"
        class="aside-allocated-asset__currency"
      />
      <div class="short-name">{{ short }}</div>

      <div class="aside-allocated-asset__info">
        <span
          v-show="!edit"
          :class="{ is_error: value <= 0 }"
          class="aside-allocated-asset__percent"
          @click.prevent="toggleEdit(edit, $event)"
        >
          {{ value }}%
        </span>

        <input
          v-show="edit"
          ref="input"
          :name="name"
          :placeholder="placeholder"
          :class="{ is_error: value <= 0 }"
          v-model="value"
          type="text"
          min="1"
          max="100"
          class="aside-allocated-asset__percent aside-allocated-asset__percent_input-2"
          @input="$emit('input', $event.value)"
          @change="handleChange(value)"
          @blur="saveEdit(value)"
          @keyup.enter="saveEdit(value)"
          @keypress="onlyForCurrency"
        >

        <BaseClose
          class="aside-allocated-asset__close"
          @click.native="onClose"
        />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.aside-allocated-asset {
  position: relative;
  background-color: $light-blue;
  padding: em(25px);
  @extend %inner-shadow;
  display: flex;
  flex-direction: column;

  @include ifmobile {
    padding: em(16px) em(8px) em(8px);
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    align-items: flex-start;
  }

  &__info {
    margin: em(10px) 0 0 em(38px);
    line-height: 1.4;
  }

  &__label {
    $size: 12px;
    font-size: em($size);
    color: $grey;
  }

  &__value {
    $size: 14px;
    font-size: em($size);
    margin-bottom: em(6px, $size);
    &_green {
      color: $green;
    }
  }
  &__more-link {
    $size: 14px;
    font-size: em($size);
    color: $blue;
    cursor: pointer;
  }

  &__currency {
    @include ifdesktop {
      max-width: em(150px);
      width: 100%;
    }

    @include ifmobile {
      font-size: em(10px);
    }
  }

  .short-name {
    margin-left: em(35px);
    @include ifmobile {
      font-size: em(10px);
      line-height: em(22px);
      margin-left: 0;
      position: absolute;
      top: 15px;
      left: 22px;
    }
  }

  &__percent {
    $size: 14px;
    font-size: em($size);
    position: absolute;
    background-color: $white;
    width: em(50px, $size);
    height: em(30px, $size);
    line-height: em(30px, $size);
    text-align: center;
    border-radius: em(6px, $size);
    right: em(40px, $size);
    top: em(20px, $size);
    outline: none;
    border: 1px solid transparent;
    transition: border-color $speed;

    @include ifmobile {
      right: em(25px, $size);
      top: em(38px, $size);
    }

    &:focus {
      border-color: $blue;
    }

    &.is_error {
      border-color: $red;
    }
  }

  &__close {
    position: absolute;
    right: em(10px);
    top: em(10px);
    @include ifmobile {
      right: em(5px);
      top: em(5px);
    }
  }

  &__more {
    overflow: hidden;
  }
}

.aside-allocated-asset-fade-enter-active,
.aside-allocated-asset-fade-leave-active {
  transition-property: max-height, opacity;
  transition-duration: 0.2s;
  max-height: em(500px);
}
.aside-allocated-asset-fade-enter,
.aside-allocated-asset-fade-leave-to {
  max-height: 0;
  opacity: 0;
}

.aside-allocated-asset-more-fade-enter-active,
.aside-allocated-asset-more-fade-leave-active {
  transition-property: max-height;
  transition-duration: 0.2s;
  max-height: em(300px);
}
.aside-allocated-asset-more-fade-enter,
.aside-allocated-asset-more-fade-leave-to {
  max-height: 0;
}
</style>
