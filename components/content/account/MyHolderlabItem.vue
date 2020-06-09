<script>
import { mapMutations } from 'vuex';

import SaveIcon from '~/components/icons/SaveIcon';
/* eslint-disable */
const emailCheckRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
/* eslint-enable */
export default {
  components: {
    SaveIcon
  },
  props: {
    functions: {
      type: Function,
      default: () => ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    data: {
      type: String,
      default: null
    },
    editable: {
      type: Boolean,
      default: false
    },
    verifyed: {
      type: String,
      default: null
    },
    button: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: ''
    },
    checkbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      edit: false,
      new_data: null,
      authenticator: '',
      email: null,
      isEmailTouched: false
    };
  },
  computed: {
    show_data() {
      if (this.new_data) {
        return this.new_data;
      } else {
        return this.data;
      }
    },

    isEmailValid() {
      return emailCheckRegex.test(this.email);
    },

    isEmailError() {
      return !this.isEmailValid && this.isEmailTouched;
    }
  },
  mounted() {
    this.new_data = this.data;
  },
  methods: {
    ...mapMutations('page', ['setPopup']),

    editStart() {
      this.edit = true;
      setTimeout(() => {
        this.$refs.input.focus();
      });
    },

    editEnd() {
      if (this.type === 'email' && this.isEmailValid) {
        // console.log('change-email-popup');
        this.edit = true;
        this.$refs.input.focus();
      } else {
        this.edit = false;
        this.new_data = this.$refs.input.value;
        this.functions(this.new_data);
      }

      this.$emit('input', this.new_data);

      if (this.type === 'email') {
        this.new_data = null;
        this.setPopup('change-email-popup');
      }
    }
  }
};
</script>

<template>
  <div
    :class="{ 'my-holderlab-item_row': !editable }"
    class="my-holderlab-item"
  >
    <div
      
      class="my-holderlab-item__info">
      <div class="my-holderlab-item__label">
        {{ label }}
      </div>
      <div 
        v-if="!edit && show_data"
        
        class="my-holderlab-item__data">
        {{ show_data }}
      </div>
        
      <input
        v-if="edit && type === 'email'"
        ref="input"
        
        :value="new_data"
        :placeholder="placeholder"
        :type="type"
        v-model="email"
        :class="{ error: isEmailError }"
        required
        class="my-holderlab-item__input"
        @blur="isEmailTouched = true"
      >
      <input
        v-if="edit && type != 'email'"
        ref="input"
        :value="new_data"
        :placeholder="placeholder"
        :type="type"
        required
        class="my-holderlab-item__input"
      >
      
      <slot />
    </div>

    <div class="my-holderlab-item__aside">
      <div
        v-if="verifyed"
        :class="{
          'my-holderlab-item__verifyed_green': verifyed === 'VERIFYED'
        }"
        class="my-holderlab-item__verifyed"
      >
        {{ verifyed }}
      </div>
      <BaseSettings
        v-if="!edit && editable"
        class="my-holderlab-item__settings"
        @click.native="editStart"
      />
      <SaveIcon
        v-if="edit"
        class="my-holderlab-item__save"
        @click.native="editEnd"
      />

      <BaseButton 
        v-if="button" 
        :to="link" 
        class="my-holderlab-item__button">
        {{ button }}
      </BaseButton>

      <BaseCheckboxSlider 
        v-if="checkbox" 
        class="my-holderlab-item__checkbox" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.my-holderlab-item {
  position: relative;
  min-height: em(86px);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .error {
    color: $red;
  }
  &_row {
    @include ifmobile {
      display: block;
    }
  }
  @include ifdesktop {
    padding: em(20px) 0;
    border-top: 1px solid $grey;
  }
  @include ifmobile {
    padding: em(15px);
    border-bottom: 1px solid $grey;
  }
  &__info {
    /*position: relative;*/
    @include ifdesktop {
      width: em(423px);
    }
    @include ifmobile {
      width: em(300px);
    }
  }
  &__label {
    $size: 14px;
    font-size: em($size);
    text-transform: uppercase;
    color: $grey;
  }
  &__settings,
  &__save {
    fill: $grey;
    transition: fill $speed;
    vertical-align: middle;

    &:hover {
      fill: $black;
    }
    &:active {
      fill: $blue;
    }
  }
  &__save {
    width: em(18px);
    height: em(18px);
    cursor: pointer;
  }

  &__verifyed {
    $size: 12px;
    font-size: em($size);
    display: inline-block;
    vertical-align: middle;
    padding: em(3px, $size) em(15px, $size);
    background: $red;
    color: $white;
    font-weight: bold;
    border-radius: em(30px);
    margin-right: em(15px, $size);

    @include ifmobile {
      display: none;
    }

    &_green {
      background: $green;
    }
  }

  &__input {
    $size: 16px;
    font-size: em($size);
    font-family: $font-Circe;
    width: 100%;
    border: none;
    background-color: $white;
    color: $blue;
    outline: none;

    &::placeholder {
      color: #dedede;
    }
  }

  &__checkbox {
    @include ifdesktop {
      display: block;
      margin: em(60px) 0 0 auto;
    }
    @include ifmobile {
      vertical-align: middle;
      margin-left: em(60px);
    }
  }

  &__button {
    @include ifmobile {
      margin-top: em(15px);
    }
  }
}
</style>
