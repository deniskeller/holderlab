<script>
/*matrixAverageAssets*/
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    degree: {
      type: Number(),
      default: 0
    },
    id_coin: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {};
  },
  computed: {
    correlation_color() {
      if (this.degree >= 0.7 && this.degree <= 1) {
        // high positive correlation
        return '#E92A00';
      } else if (this.degree >= 0.4 && this.degree < 0.7) {
        // medium positive correlation
        return '#FE846A';
      } else if (this.degree >= 0.1 && this.degree < 0.4) {
        // low positive correlation
        return '#FEC36A';
      } else if (this.degree >= -0.1 && this.degree < 0.1) {
        // no correlation
        return '#C4C4C4';
      } else if (this.degree <= -0.1 && this.degree > -0.4) {
        // low negative correlation
        return '#0395FF';
      } else if (this.degree <= -0.4 && this.degree > -0.7) {
        // medium negative correlation
        return '#003BF9';
      } else if (this.degree <= -0.7 && this.degree > -1) {
        // high negative correlation
        return '#5C26C8';
      }
    },
    correlation_name() {
      if (this.degree >= 0.7 && this.degree <= 1) {
        return 'high positive correlation';
      } else if (this.degree >= 0.4 && this.degree < 0.7) {
        return 'medium positive correlation';
      } else if (this.degree >= 0.01 && this.degree < 0.4) {
        return 'low positive correlation';
      } else if (this.degree >= -0.01 && this.degree < 0.01) {
        return 'no correlation';
      } else if (this.degree <= -0.01 && this.degree > -0.4) {
        return 'low negative correlation';
      } else if (this.degree <= -0.4 && this.degree > -0.7) {
        return 'medium negative correlation';
      } else if (this.degree <= -0.7 && this.degree > -1) {
        return 'high negative correlation';
      }
    }
  },
  mounted() {}
};
</script>

<template>
  <div class="average-assets-item">
    <BaseCurrency
      :id_market="id_coin"
      :title="title"
      type="coins"
      class="average-assets-item__currency"
    />
    <div
      :style="{ color: correlation_color }"
      class="average-assets-item__value"
      v-html="correlation_name"
    />
    <div 
      class="average-assets-item__degree" 
      v-html="degree" />
  </div>
</template>

<style lang="scss">
.average-assets-item {
  padding: em(10px) em(22px);
  height: em(70px);
  border: 1px solid $grey;
  box-sizing: border-box;
  background-color: $white;
  margin-bottom: em(6px);
  @extend %bottom-shadow;

  position: relative;
  display: flex;
  /*justify-content: space-between;*/
  align-items: center;
  &__currency {
    width: 60%;
  }
  &__value {
    width: 35%;
    text-align: center;
    font-size: em(18px);
    font-weight: 600;
    @include ifmobile {
      display: none;
    }
  }
  &__degree {
    width: 5%;
    $size: 14px;
    font-weight: 600;
    font-size: em($size);
    text-align: right;
    @include ifmobile {
      width: 40%;
    }
  }
}
</style>
