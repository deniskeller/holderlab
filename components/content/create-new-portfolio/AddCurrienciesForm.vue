<script>
/*AddCurrienciesForm*/
import { mapMutations, mapState } from 'vuex';
import CreatePortfolioCurrencies from '~/components/content/create-new-portfolio/CreatePortfolioCurrencies';
import AddCurrenciesTags from '~/components/content/AddCurrenciesTags';
export default {
  components: {
    CreatePortfolioCurrencies,
    AddCurrenciesTags
  },

  props: {
    portfolio_data: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {};
  },

  computed: {
    ...mapState('page', ['userInfo']),

    get_status_account() {
      return this.userInfo.status_account;
    },

    isVipAcc() {
      if (this.get_status_account == 2 || this.get_status_account == 1) {
        return true;
      } else {
        return false;
      }
    }
  },

  mounted() {},

  methods: {
    ...mapMutations('page', [
      'setPopup',
      'setNewPortfolio',
      'makeBackupAnalyzedPortfolios'
    ]),

    route_to_correlation_matrix() {
      this.makeBackupAnalyzedPortfolios();
      this.$router.push({ path: '/create-new-portfolio/correlation-matrix' });
    },

    route_to_dashboard() {
      this.setNewPortfolio(null);
      this.$router.push({ path: '/dashboard' });
    }
  }
};
</script>

<template>
  <div class="add-curriencies-form">
    <BaseTitle 
      type="h3" 
      class="add-curriencies-form__title">
      CHOOSE ASSETS AND START ANALYSIS
    </BaseTitle>
    <div class="add-curriencies-form__text">
      You can research any assets in your plan.
      <a 
        v-if = "!isVipAcc"
        href="upgrade" 
        @click.prevent="setPopup('upgrade-popup')">
        Look at the plans.
      </a>
    </div>

    <CreatePortfolioCurrencies
      :search="true"
      :pages="true"
      :tags="true"
      :portfolio_data="portfolio_data"
      class="add-curriencies-form__add-assets"
    />

    <div class="add-curriencies-form__btn-block">
      <BaseButton
        type="primary"
        class="add-curriencies-form__button"
        @click.native="route_to_correlation_matrix"
      >
        START ANALYSIS
      </BaseButton>

      <div class="or">OR</div>

      <BaseButton
        type="secondary"
        class="aside-packs__button"
        @click.native="route_to_dashboard"
      >
        GO TO DASHBOARD
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss">
.add-curriencies-form {
  position: relative;
  &__title {
    @include ifmobile {
      padding: 0 em(15px);
    }
  }
  &__text {
    @include ifmobile {
      padding: 0 em(15px);
    }
  }
  &__add-assets {
    margin: em(40px) 0;
  }
  &__button {
    margin-left: em(15px);
    @include ifmobile {
      margin: 0;
    }
  }
  &__btn-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    @include ifmobile {
      flex-direction: column;
      justify-content: center;
    }
    .add-curriencies-form__button {
      @include ifmobile {
        margin: 0;
      }
    }
    .or {
      font-size: em(12px);
      font-weight: bold;
      color: $black;
      margin: 0 em(23px);
      @include ifmobile {
        margin: em(23px) 0;
      }
    }
    .aside-packs__button {
      margin: 0;
    }
  }
}
</style>
