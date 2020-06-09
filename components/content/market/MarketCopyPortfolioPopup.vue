<script>
import { mapMutations } from 'vuex';
import MarketAddFilter from '~/components/content/market/MarketAddFilter';
export default {
  components: {
    MarketAddFilter
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <BasePopup class="market-copy-portfolio-popup">
    <BaseTitle class="market-copy-portfolio-popup__title">
      COPY PORTFOLIO
    </BaseTitle>
    <div class="market-copy-portfolio-popup__text">
      You are creating a new portfolio!
    </div>

    <MarketAddFilter
      :tags="true"
      class="market-copy-portfolio-popup__market-filters"
    />

    <BaseButton
      class="market-copy-portfolio-popup__button"
      @click.native="setPopup(null)"
    >
      CANCEL
    </BaseButton>
    <BaseButton 
      type="primary" 
      class="market-copy-portfolio-popup__button">
      COPY PORTFOLIO
    </BaseButton>
  </BasePopup>
</template>

<style lang="scss" scoped>
.market-copy-portfolio-popup {
  @include ifdesktop {
    width: em(548px);
    left: 50%;
    margin-left: em(-274px);
  }

  .base-popup__container {
    border: 1px solid $grey;
    box-shadow: 0 em(2px) em(1px) rgba(0, 0, 0, 0.1);
    @include ifdesktop {
      padding: em(72px) em(62px) em(45px);
    }
    @include ifmobile {
      padding: em(15px);
    }
  }
  &__text {
    margin-bottom: em(30px);
  }
  &__market-filters {
    margin-bottom: em(130px);
  }

  &__button {
    margin-right: em(20px);
  }
}
</style>
