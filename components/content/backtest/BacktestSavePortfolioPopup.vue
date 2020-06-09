<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  components: {},
  data() {
    return {
      buttonInactive: true,
      is_saved_portfolio: false,
      id_saved_portfolio: { id: null },
      name: null
    };
  },

  computed: {
    ...mapState('page', ['savedPortfolios', 'activeMarket', 'userInfo']),

    get_is_saved_portfolio: {
      get() {
        return this.is_saved_portfolio;
      },
      set(value) {
        this.is_saved_portfolio = value;
      }
    },

    stack_saved_portfolios: {
      get() {
        return this.savedPortfolios;
      },
      set(value) {
        this.setSavedPortfolios(value);
      }
    }
  },
  watch: {
    get_is_saved_portfolio() {
      this.name = null;
      // if (!this.get_is_saved_portfolio) this.delNewIdSavedBacktest();
      this.delNewIdSavedBacktest();
    }
  },
  methods: {
    ...mapActions('page', ['postSaveBacktest']),
    ...mapMutations('page', ['delNewIdSavedBacktest', 'setNewIdSavedBacktest']),
    percentChange(value) {
      this.buttonInactive = value;
    },

    savePortfolio() {
      // console.log('click');
      this.setNewIdSavedBacktest(this.id_saved_portfolio.id);
      this.postSaveBacktest({
        name: this.name,
        market: this.activeMarket.market_title
      });
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
      v-if="!get_is_saved_portfolio"
      v-model = "name"
      :editable="true"
      name="name"
      icon="folder"
      placeholder="Create portfolio name"
      class="backtest-save-portfolio-popup__input"
    />

    <BaseSelectSavedPortfolio
      v-if="get_is_saved_portfolio"
      v-model = "id_saved_portfolio"
      :list="stack_saved_portfolios.name"
      :list-second="stack_saved_portfolios.coins"
      :currencies="true"
      :is_clear_data="flag_saved"
      placeholder="Saved Portfolios"
      type="form"
      name="exchange"
      class="backtest-save-portfolio-popup__input"
    >
      Saved Portfolios
    </BaseSelectSavedPortfolio>

    <BaseCheckbox
      v-model="get_is_saved_portfolio"
      :is_active="get_is_saved_portfolio"
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
        v-if = "!get_is_saved_portfolio"
        type="primary" 
        class="backtest-save-portfolio-popup__button"
        @click.native = "savePortfolio()">
        SAVE
      </BaseButton>
      <BaseButton 
        v-else
        type="primary" 
        class="backtest-save-portfolio-popup__button"
        @click.native = "savePortfolio()"
      >
        REPLACE
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
