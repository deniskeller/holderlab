<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
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
    error: {
      type: String,
      default: null
    },
    prefix: {
      type: String,
      default: null
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      edit: true
    };
  },
  // computed: {
  //   fields() {
  //     if (this.value === 0) {
  //       return [
  //         {
  //           value: '',
  //           edit: false,
  //           id: '1'
  //         }
  //       ];
  //     } else {
  //       return [
  //         {
  //           value: String(this.value),
  //           edit: false,
  //           id: '1'
  //         }
  //       ];
  //     }
  //   }
  // },
  methods: {
    onChange() {
      this.$emit('input', this.$event.change.value);
    },
    // событие вызова поля ввода
    toggleEdit: function() {
      this.edit = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    // сохранение значения инпута
    saveEdit: function() {
      this.edit = false;
    },
    // валидация кнопки %
    handleChange: function() {
      if (this.value < 0) {
        this.value = 0;
      }
      if (this.value > 100) {
        this.value = 110;
      }
    }
  }
};
</script>

<template>
  <div class="base-input">
    <span
      v-show="!edit"
      :class="{ 'base-input__input-before': value.length >= 1 }"
      class="base-input__input-after"
      @click.prevent="toggleEdit(edit, $event)"
    >
      {{ value }}<span v-if="value.length > 0">%</span>
      <span v-if="value.length == 0">0%</span>
    </span>

    <input
      v-show="edit"
      ref="input"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :class="{ is_error: error }"
      v-model="value"
      :value="value"
      min="1"
      max="100"
      class="base-input__input"
      @input="$emit('input', $event.value)"
      @change="handleChange(value)"
      @blur="saveEdit(value)"
      @keyup.enter="saveEdit(value)"
    >

    <div 
      v-if="error" 
      class="base-input__error">
      {{ error }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-input__input-after {
  display: block;
  /*line-height: em(30px);*/
  font-size: em(26px);
  font-family: $font-Circe;
  color: $grey;
  width: 100%;
  height: em(30px);
  padding: 0 em(5px) 0 em(15px);
  box-sizing: border-box;
  border: 2px solid $grey;
  border-radius: em(6px);
  background-color: $white;
  outline: none;
  text-align: left;
}
.base-input__input-before {
  border: none;
  color: $red;
  padding-left: 0;
}
.base-input {
  position: relative;
  display: inline-block;

  &__input {
    font-size: em(26px);
    font-family: $font-Circe;
    width: 100%;
    height: em(30px);
    padding: 0 em(5px) 0 em(15px);
    box-sizing: border-box;
    border: 2px solid $grey;
    border-radius: em(6px);
    background-color: $white;
    outline: none;
    text-align: left;

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
}
</style>
