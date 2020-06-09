<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  components: {},
  props: {
    type_: {
      type: String,
      default: 'both'
    },
    page_: {
      type: String,
      default: 'other'
    }
  },
  data() {
    return {
      buttonInactive: true,
      flagShowModalLoadPortfolio: true,
      stack_active: null
    };
  },

  computed: {
    ...mapState('page', [
      'backupPortfolios',
      'savedPortfolios',
      'activeMarket',
      'selectedCoinList',
      'idActivePortfolio',
      'userInfo'
    ]),

    get_status_account() {
      return this.userInfo.status_account;
    },

    isVipAcc() {
      if (this.get_status_account == 2 || this.get_status_account == 1) {
        return true;
      } else {
        return false;
      }
    },

    get_trial_status() {
      return this.userInfo.is_trial_uses;
    },

    is_trial() {
      if (this.get_trial_status && !this.isVipAcc) {
        return true;
      } else false;
    },

    is_computed_flag_show_modal: {
      get() {
        if (this.isVipAcc) return false;
        else return this.flagShowModalLoadPortfolio;
      }
    },

    selected_coins: {
      get() {
        return this.selectedCoinList;
      },
      set(value) {
        this.setAddItemInSelectedCoinList(value);
      }
    },

    show_select_backup() {
      if (this.type_ == 'both' || this.type_ == 'backup') return true;
      else return false;
    },

    show_select_saved() {
      if (this.type_ == 'both' || this.type_ == 'saved') return true;
      else return false;
    },

    flag_saved() {
      if (this.stack_active == null) {
        return false;
      } else {
        if (this.stack_active.type == 'backup') {
          return true;
        } else {
          return false;
        }
      }
    },

    active_market: {
      /* all or any name market */
      get() {
        return this.activeMarket;
      }
    },

    is_active_buttom() {
      if (this.stack_active == null) return true;
      else return false;
    },

    flag_backup() {
      if (this.stack_active == null) {
        return false;
      } else {
        if (this.stack_active.type == 'saved') {
          return true;
        } else {
          return false;
        }
      }
    },

    id_portfel: {
      get() {
        return this.idActivePortfolio;
      }
    },
    stack_backup: {
      get() {
        return this.backupPortfolios;
      },
      set(value) {
        this.setBackupPortfolios(value);
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

  // watch: {
  //   id_portfel() {
  //     this.make_request_get_saved_portfolios(this.id_portfel);
  //   }
  // },

  mounted() {
    // console.log('----mounted dashboard----');
    // if (!this.$cookies.get('secret_token')) {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    //   // this.make_request_get_saved_portfolios(this.id_portfel);
    // }
  },

  methods: {
    ...mapActions('page', [
      'postSavedPortfolios',
      'getFullDataWithSavedPortfolioInSelect'
    ]),
    ...mapMutations('page', [
      'setPopup',
      'setBackupPortfolios',
      'setIsLoadsSavedPortfolio'
    ]),

    // make_request_get_saved_portfolios(market_name) {
    // this.postSavedPortfolios({
    //   market_name: market_name,
    //   type_portfolio: 'saved'
    // });
    // },

    upgradeSetPopup() {
      this.setPopup(null);
    },

    usePro() {
      if (this.is_computed_flag_show_modal) {
        this.setPopup('upgrade-popup');
      } else {
        this.loadPortfolio();
      }
    },

    loadPortfolio() {
      this.getFullDataWithSavedPortfolioInSelect({
        page: this.page_,
        market: this.id_portfel,
        id_: this.stack_active.id
      });
      this.setPopup(null);
    }
  }
};
</script>

<template>
  <BaseSmallPopup class="rebalancing-load-portfolio-popup">
    <BaseHeadline 
      title="Load Portfolio" 
      class="base-popup__headline">
      You can load your saved Portfolios
    </BaseHeadline>

    <BaseSelectSavedPortfolio
      v-if ="show_select_backup"
      v-model="stack_active"
      :list="stack_backup.name"
      :list-second="stack_backup.events"
      :currencies="true"
      :is_clear_data="flag_backup"
      placeholder="Backup Portfolios"
      type="form"
      name="exchange"
      class="create-new-portfolio-form__input"
    >
      Backup Portfolios
    </BaseSelectSavedPortfolio>

    <BaseSelectSavedPortfolio
      v-if ="show_select_saved"
      v-model="stack_active"
      :list="stack_saved_portfolios.name"
      :list-second="stack_saved_portfolios.coins"
      :currencies="true"
      :is_clear_data="flag_saved"
      placeholder="Saved Portfolios"
      type="form"
      name="exchange"
      class="create-new-portfolio-form__input rebalancing-load-portfolio-popup__input"
    >
      Saved Portfolios
    </BaseSelectSavedPortfolio>

    <div class="rebalancing-load-portfolio-popup__buttons">
      <BaseButton
        type="secondary"
        class="rebalancing-load-portfolio-popup__button rebalancing-load-portfolio-popup__button-left"
        @click.native="upgradeSetPopup"
      >
        CANCEL
      </BaseButton>

      <BaseButton
        :is-inactive="is_active_buttom"
        type="primary"
        class="rebalancing-load-portfolio-popup__button"
        @click.native="usePro()"
      >
        LOAD
      </BaseButton>
    </div>
  </BaseSmallPopup>
</template>

<style lang="scss" scoped>
.base-popup__container {
  max-width: 548px;
}
.rebalancing-load-portfolio-popup {
  &__input {
    margin-bottom: em(43px);
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
</style>
