<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },

    id_coin: {
      type: String,
      default: null
    },

    invested: {
      type: Number,
      default: null
    },

    pl: {
      type: String,
      default: null
    }
  }
};
</script>

<template>
  <div class="ready-made-portfolio-item">
    <BaseCurrency
      :title="title"
      :id_market="id_coin"
      type="coins"
      class="ready-made-portfolio-item__title"
    />

    <div class="ready-made-portfolio-item__col">
      <div class="ready-made-portfolio-item__label">
        INVESTED
      </div>
      <div 
        class="ready-made-portfolio-item__value"> {{ invested }}%</div>
    </div>

    <div class="ready-made-portfolio-item__col">
      <div class="ready-made-portfolio-item__label">
        P/L
      </div>
      <div
        :class="[
          pl.charAt(0) === '-'
            ? 'ready-made-portfolio-item__value_red'
            : 'ready-made-portfolio-item__value_green'
        ]"
        class="ready-made-portfolio-item__value"> {{ pl }}%</div>
    </div>
  </div>
</template>

<style lang="scss">
.ready-made-portfolio-item {
  padding: em(10px) em(22px);
  height: em(70px);
  border: 1px solid $grey;
  box-sizing: border-box;
  background-color: $white;
  margin-bottom: em(6px);
  @extend %bottom-shadow;

  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__col {
    width: 25%;
  }
  &__title {
    width: 50%;
  }
  &__label {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
  }
  &__value {
    &_green {
      color: $green;
    }
    &_red {
      color: $red;
    }
  }
}
</style>
