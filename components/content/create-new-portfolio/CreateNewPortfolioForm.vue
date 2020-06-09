<script>
/*CreateNewPortfolioForm*/
import { mapState, mapMutations } from 'vuex';

import marketList from '~/assets/data/market-list.json';
import AddApiKeyForm from '~/components/content/AddApiKeyForm';
import MyHolderlabItem from '~/components/content/account/MyHolderlabItem';

export default {
  components: {
    AddApiKeyForm,
    MyHolderlabItem
  },

  props: {
    is_show_item: {
      type: Boolean,
      default: false
    },

    active_market: {
      type: Object,
      default: null
    },

    balance: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      marketList,
      selected: {
        market_title: '',
        market_id: ''
      },
      name: '',
      market: '',
      apikey: ''
    };
  },

  computed: {
    check() {
      return (
        this.selected.market_title == 'Kucoin' ||
        this.selected.market_title == 'Okex'
      );
    }
  },

  watch: {
    active_market() {
      if (this.active_market) {
        try {
          if (this.selected.market_title != this.active_market.market_title) {
            this.selected = this.active_market;
          }
        } catch (e) {
          // console.log(e);
        }
      } else {
        this.selected = { market_title: '', market_id: '' };
      }
    },

    selected() {
      this.setShowButtomConnect(true);
      this.setBalanceChosenMarket(0);
      this.setNewPortfolio([]);
      this.setAllAnalyzedPortfolios([]);
    }
  },

  mounted() {
    if (this.active_market) {
      this.selected = this.active_market;
    }
  },

  methods: {
    ...mapMutations('page', [
      'setBalanceChosenMarket',
      'setShowButtomConnect',
      'setNewPortfolio',
      'setAllAnalyzedPortfolios'
    ])
  }
};
</script>

<template>
  <div class="create-new-portfolio-form">
    <BaseInput
      :editable="true"
      v-model="name"
      :maxlength="15"
      name="name"
      icon="folder"
      icon-second="save"
      placeholder="Add portfolio name"
      class="create-new-portfolio-form__input"
    />

    <BaseSelect
      v-model="selected"
      :active_item="active_market"
      :list="marketList"
      :currencies="true"
      type="form"
      name="exchange"
      class="create-new-portfolio-form__input"
    >
      Exchange
    </BaseSelect>

    <AddApiKeyForm
      :is_show_item="is_show_item"
      :name_portfel="name"
      :selected="selected"
      :balance="balance"
      class="create-new-portfolio-form__add-api-key-form"
    />
  </div>
</template>

<style lang="scss">
.create-new-portfolio-form {
  &__input {
    display: block;
    width: 100%;
    margin-bottom: em(20px);
  }
  &__hint-form {
    margin-bottom: em(45px);
  }
  &__hint-form-price {
    margin-left: em(38px);
  }
}
</style>
