<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {
    radioButtonValue: {
      get: function() {
        return this.value;
      },
      set: function() {
        this.$emit('change', this.label);
      }
    }
  },
  methods: {}
};
</script>

<template>
  <div
    :class="[value === label ? 'base-radio-button__checked' : '']"
    class="base-radio-button"
  >
    <input
      :value="label"
      :id="id"
      :name="name"
      v-model="radioButtonValue"
      type="radio"
    >

    <label 
      :for="id" 
      @click="$emit('input', label)">
      {{ label }}
    </label>
    <span class="check" />
  </div>
</template>

<style lang="scss">
.base-radio-button {
  position: relative;
  display: block;
  width: 100%;
  cursor: pointer;
}

.base-radio-button input[type='radio'] {
  position: absolute;
  visibility: hidden;
}

.base-radio-button label {
  display: block;
  position: relative;
  z-index: 9;
  cursor: pointer;
  -webkit-transition: all 0.25s linear;
  line-height: em(26px);
  padding-left: em(30px);
  white-space: nowrap;
}

.base-radio-button .check {
  display: block;
  position: absolute;
  border: 2px solid #ddd;
  border-radius: 100%;
  height: em(18px);
  width: em(18px);
  top: 0px;
  left: 0px;
  z-index: 5;
  transition: border 0.25s linear;
  -webkit-transition: border 0.25s linear;
}

.base-radio-button > .check::before {
  display: block;
  position: absolute;
  content: '';
  border-radius: 100%;
  height: em(11px);
  width: em(11px);
  top: 3px;
  left: 3px;
  margin: auto;
  transition: background 0.25s linear;
  -webkit-transition: background 0.25s linear;
}

.base-radio-button > input[type='radio']:checked ~ .check {
  border: 2px solid #003bf9;
}

.base-radio-button > input[type='radio']:checked ~ .check::before {
  background: #003bf9;
}

/*input[type=radio]:checked ~ label{*/
/*  color: #0DFF92;*/
/*}*/
</style>
