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

    validator: {
      type: Date,
      default: null
    },

    from: {
      type: Date,
      default: null
    },

    to: {
      type: Date,
      default: null
    },

    placeholder: {
      type: String,
      default: null
    },

    error: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      model: {
        date: ''
      },
      DatePickerFormat: 'dd/MM/yyyy'
    };
  },
  computed: {
    disabledDates() {
      return {
        from: this.from_date,
        to: this.to_date
      };
    },

    vasya() {
      return this.model.date;
    },
    //
    to_date() {
      if (this.to) {
        return this.to;
      } else {
        return new Date(null);
      }
    },

    from_date() {
      if (this.from) {
        return this.from;
      } else {
        return new Date(Date.now());
      }
    }
  },
  watch: {
    vasya() {
      this.$emit('input', this.model.date);
    }
  },
  methods: {}
};
</script>

<template>
  <div class="base-date-input">
    <datepicker
      v-model="model.date"
      :format="DatePickerFormat"
      :disabled-dates="disabledDates"
      :class="{ is_error: error }"
      :placeholder="placeholder"
      wrapper-class="datepicker-wrapper"
      input-class="datepicker"
      class="base-date-input__input"
      calendar-class="datepicker-calendar"
    />
    <div 
      v-if="error" 
      class="base-input__error">
      {{ error }}
    </div>
  </div>
</template>

<style lang="scss">
.base-date-input {
  $this: &;
  $size: 16px;
  position: relative;
  display: inline-block;

  input.datepicker {
    $size: 16px;
    font-size: em($size);
    font-family: $font-Circe;
    text-align: center;
    width: 100%;
    height: em(48px);
    padding: 0 em(23px, $size) 0 em(24px, $size);
    box-sizing: border-box;
    border: 2px solid $grey;
    border-radius: em(6px, $size);
    background-color: $white;
    outline: none;
    @include ifmobile {
      padding: 0 em(10px, $size) 0 em(10px, $size);
    }

    &.is_error {
      border-color: $red;
    }
  }
  .datepicker-calendar {
    max-width: em(300px);
    border-radius: 0.375em;
    box-shadow: 0 0.125em 1.875em #dedede;
    @include ifmobile {
      max-width: em(250px);
      font-size: 12px;
    }
  }

  .datepicker-wrapper.datepicker {
    background: $red;
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
