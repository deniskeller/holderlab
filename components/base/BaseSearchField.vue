<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      content: this.value
    };
  },
  methods: {
    handleInput() {
      this.$emit('input', this.content);
    }
  }
};
</script>

<template>
  <div class="base-search-field">
    <input
      v-model="content"
      :placeholder="placeholder"
      class="base-search-field__input"
      @input.stop="handleInput"
    >
    <svg 
      class="base-search-field__icon" 
      viewBox="0 0 18 18">
      <path
        d="M3.32812 9.70312C4.20312 10.5781 5.26562 11.0156 6.51562 11.0156C7.76562 11.0156 8.82812 10.5781 9.70312 9.70312C10.5781 8.82812 11.0156 7.76562 11.0156 6.51562C11.0156 5.26562 10.5781 4.20313 9.70312 3.32812C8.82812 2.45312 7.76562 2.01562 6.51562 2.01562C5.26562 2.01562 4.20312 2.45312 3.32812 3.32812C2.45312 4.20313 2.01562 5.26562 2.01562 6.51562C2.01562 7.76562 2.45312 8.82812 3.32812 9.70312ZM12.5156 11.0156L17.4844 15.9844L15.9844 17.4844L11.0156 12.5156V11.7188L10.7344 11.4375C9.54688 12.4688 8.14062 12.9844 6.51562 12.9844C4.70312 12.9844 3.15625 12.3594 1.875 11.1094C0.625 9.85938 0 8.32812 0 6.51562C0 4.70312 0.625 3.17188 1.875 1.92188C3.15625 0.640625 4.70312 0 6.51562 0C8.32812 0 9.85938 0.640625 11.1094 1.92188C12.3594 3.17188 12.9844 4.70312 12.9844 6.51562C12.9844 8.14062 12.4688 9.54688 11.4375 10.7344L11.7188 11.0156H12.5156Z"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.base-search-field {
  position: relative;
  padding-right: em(30px);
  box-sizing: border-box;
  border-bottom: 1px solid $grey;

  &__input {
    $size: 14px;
    font-size: em($size);
    font-family: $font-Circe;
    width: 100%;
    border: none;
    padding-bottom: em(10px, $size);
    background-color: $white;
    /*text-transform: uppercase;*/
    outline: none;

    @include ifmobile {
      padding: 0 em(15px);
    }

    &::placeholder {
      color: #dedede;
    }
  }

  &__icon {
    position: absolute;
    width: em(18px);
    fill: $blue;
    top: em(6px);
    @include ifdesktop {
      right: 0;
    }
    @include ifmobile {
      right: em(15px);
    }
  }
}
</style>
