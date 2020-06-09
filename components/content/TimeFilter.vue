<script>
export default {
  props: {
    button: {
      type: Boolean,
      default: true
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
  <div class="time-filter">
    <input 
      type="text" 
      class="time-filter__input" 
      value="1" >

    <BaseSelect
      :list="['hour', 'day', 'week', 'off']"
      name="time"
      class="time-filter__select"
    >
      week
    </BaseSelect>

    <button 
      v-if="button" 
      class="time-filter__button">
      SAVE
    </button>
  </div>
</template>

<style lang="scss">
.time-filter {
  display: flex;
  align-items: center;

  &__input {
    $size: 12px;
    font-size: em($size);
    border: none;
    border-radius: em(6px, $size);
    height: em(30px, $size);
    width: em(40px, $size);
    box-sizing: border-box;
    margin-right: em(6px, $size);
    text-align: center;
  }

  &__button {
    $size: 12px;
    font-size: em($size);
    border: none;
    color: $white;
    width: em(50px, $size);
    height: em(30px, $size);
    border-radius: em(6px, $size);
    box-sizing: border-box;
    transition: all $speed;
    outline: none;
    cursor: pointer;

    @include ifdesktop {
      background: none;
      margin-left: em(30px, $size);
      font-weight: bold;
    }
    @include ifmobile {
      margin-left: em(6px, $size);
      background: rgba(255, 255, 255, 0.2);
    }

    &:hover {
      color: $blue;
      background-color: $white;
    }
    &:active {
      background-color: $light-blue;
    }
  }
}
</style>
