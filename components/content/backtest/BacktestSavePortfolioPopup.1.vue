<script>
import { mapMutations } from 'vuex';

export default {
  components: {},
  data() {
    return {
      buttonInactive: true,
      saved_portfolio: false
    };
  },
  methods: {
    ...mapMutations('page', ['setPopup']),
    percentChange(value) {
      this.buttonInactive = value;
    }
  }
};
</script>

<template>
  <BaseSmallPopup class="backtest-save-portfolio-popup">
    <BaseHeadline 
      title="Save Portfolio" 
      class="backtest-base-popup__headline">
      Create new portfolio or replace existing
    </BaseHeadline>

    <BaseInput
      v-if="!saved_portfolio"
      :editable="true"
      name="name"
      icon="folder"
      placeholder="Create portfolio name"
      class="backtest-save-portfolio-popup__input"
    />

    <BaseSelectSavedPortfolio
      v-if="saved_portfolio"
      :list="['1', '2']"
      :list-second="['1', '2']"
      :currencies="true"
      placeholder="Saved Portfolios"
      type="form"
      name="exchange"
      class="backtest-save-portfolio-popup__input"
    >
      Saved Portfolios
    </BaseSelectSavedPortfolio>

    <BaseCheckbox
      v-model="saved_portfolio"
      :is_active="saved_portfolio"
      class="backtest-save-portfolio-popup__chekbox"
    >
      Replace existing portfolio
    </BaseCheckbox>

    <div class="backtest-save-portfolio-popup__buttons">
      <BaseButton
        type="secondary"
        class="backtest-save-portfolio-popup__button backtest-save-portfolio-popup__button-left"
        @click.native="setPopup(null)"
      >
        CANCEL
      </BaseButton>

      <BaseButton 
        type="primary" 
        class="backtest-save-portfolio-popup__button">
        SAVE
      </BaseButton>
    </div>
  </BaseSmallPopup>
</template>

<style lang="scss" scoped>
.base-popup__container {
  max-width: 548px;
}
.backtest-save-portfolio-popup {
  &__input {
    width: 100%;
    margin-bottom: em(20px);
  }
  &__add-assets {
    margin: em(10px) 0 em(40px) 0;
  }
  &__buttons {
    @include ifmobile {
      text-align: center;
    }
  }
  &__button {
    @include ifmobile {
      $size: 10px;
      font-size: em($size);
    }
  }
  &__button-left {
    margin-right: em(28px);
  }
  .base-headline {
    border: none;
    margin-bottom: em(25px);
  }
  &__tags {
    margin: em(20px) 0 em(40px);
  }
  &__add-title {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
    margin-top: em(44px, $size);
  }
}
.backtest-save-portfolio-popup__chekbox {
  margin-bottom: em(57px);
  margin-left: em(10px);
}
</style>
