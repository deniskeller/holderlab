<script>
export default {
  props: {
    type: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    maxlength: {
      type: String,
      default: '11'
    },
    error: {
      type: String,
      default: null
    },
    prefix: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      value: ''
    };
  },
  computed: {},
  methods: {
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    onChange() {
      if (this.value.charAt(0) === this.prefix) {
        this.value = this.value.substr(1);
      }

      if (this.value === '' || isNaN(this.value)) {
        this.value = '';
        // return (this.value = '');
      } else {
        this.value = this.prefix + parseInt(this.value);
      }

      this.$emit('input', this.value);
    },

    changeType(from) {
      if (from == 'eye') {
        this.icon = 'eye-off';
        this.type = 'text';
      } else {
        this.icon = 'eye';
        this.type = 'password';
      }
    }
  }
};
</script>

<template>
  <div class="base-input">
    <input
      ref="input"
      :type="type"
      :name="name"
      :value="value"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :class="{ is_error: error }"
      v-model="value"
      min="1"
      class="base-input__input"
      @input="onChange"
      @keypress="isNumber(event)"
    >

    <div 
      v-if="error" 
      class="base-input__error">
      {{ error }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.over {
  color: $grey;
}
.base-input {
  position: relative;
  display: inline-block;

  &__input {
    $size: 16px;
    font-size: em($size);
    font-family: $font-Circe;
    width: 100%;
    height: em(48px);
    padding: 0 em(24px, $size) 0 em(24px, $size);
    box-sizing: border-box;
    border: 2px solid $grey;
    border-radius: em(6px, $size);
    background-color: $white;
    outline: none;
    text-align: right;

    &.is_error {
      border-color: $red;
    }
  }

  &__error {
    position: absolute;
    color: $red;
    width: em(200px);
    right: em(-230px);
    top: 50%;
    transform: translateY(-50%);
  }

  &__icon {
    position: absolute;
    right: em(18px);
    top: 50%;
    transform: translateY(-50%);
    fill: $grey;
    pointer-events: none;

    &_folder {
      width: em(20px);
      height: em(18px);
    }
    &_key {
      width: em(24px);
      height: em(12px);
    }
    &_secret {
      width: em(18px);
      height: em(22px);
    }
    &_user {
      width: em(18px);
      height: em(18px);
    }
    &_email {
      width: em(20px);
      height: em(18px);
    }
    &_eye {
      position: absolute;
      right: 0.525em;
      top: 40%;
      cursor: pointer;
      width: em(24px);
      height: em(16px);
    }
    &_eye-off {
      position: absolute;
      right: 0.525em;
      top: 40%;
      cursor: pointer;
      width: em(24px);
      height: em(16px);
    }
  }
}
</style>
