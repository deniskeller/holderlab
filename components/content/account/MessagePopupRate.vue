<script>
import { mapMutations, mapState } from 'vuex';

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState('page', ['listOrderActiveMessages'])
  },
  mounted() {},
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="message-popup-rate">
    <span
      v-for="(item, index) in listOrderActiveMessages"
      :key="index">
      <div class="message-popup-rate__row">
        <div class="message-popup-rate__item">
          <BaseCurrency 
            :id_market="index.id_coin" 
            :title="index.coin" 
            type="coins" />
          <div class="message-popup-rate__price">
            {{ index.value }}
          </div>
        </div>
        <div 
          v-if= "dtype"
          class="message-popup-rate__label">
          BOUGHT
        </div>
        <div 
          v-else
          class="message-popup-rate__label">
          SOLD
        </div>
      </div>
    </span>
    
    <!--<div class="message-popup-rate__row">-->
    <!--  <div class="message-popup-rate__item">-->
    <!--    <BaseCurrency -->
    <!--      title="Bela" -->
    <!--      class="message-popup-rate__currency" />-->
    <!--    <div class="message-popup-rate__price">-->
    <!--      $ 4.47-->
    <!--    </div>-->
    <!--  </div>-->
    <!--  <div class="message-popup-rate__label">-->
    <!--    SOLD-->
    <!--  </div>-->
    <!--</div>-->
  </div>
</template>

<style lang="scss">
.message-popup-rate {
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: em(6px);
  }
  &__item {
    height: em(70px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 em(24px);
    box-sizing: border-box;
    border: 1px solid $grey;
    @extend %bottom-shadow;

    @include ifdesktop {
      width: em(390px);
    }
    @include ifmobile {
      width: em(270px);
    }
  }
  &__label {
    $size: 12px;
    font-size: em($size);
    color: $grey;
  }
}
</style>
