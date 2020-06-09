<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="ready-made-intro">
    <div class="ready-made-intro__info">
      <BaseTitle 
        type="h2" 
        class="ready-made-intro__title">
        Show what your portfolio can!
      </BaseTitle>
      <div class="ready-made-intro__text">
        Holderlab unites cryptoinvestors around the world, join to community and
        share your results!
      </div>
    </div>
    <BaseButton
      type="white"
      class="ready-made-intro__button"
      @click.native="setPopup('add-to-ready-made-popup')"
    >
      ADD YOUR PORTFOLIO
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.ready-made-intro {
  position: relative;
  box-sizing: border-box;
  background-color: $dark-green;
  color: $white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  @include ifdesktop {
    width: em(500px);
    height: em(280px);
    padding: em(33px) em(77px) em(40px) em(33px);
  }
  @include ifmobile {
    padding: em(15px) em(60px) em(25px) em(15px);
  }
  &__button {
    flex: none;
    @include ifmobile {
      margin-top: em(30px);
    }
  }
}
</style>
