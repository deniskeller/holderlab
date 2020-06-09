<script>
/*EfficientFrontierPopup*/
import { mapMutations, mapState } from 'vuex';
import AddCurrencies from '~/components/content/add-currencies/AddCurrencies';
import AllocatedAssets from '~/components/content/AllocatedAssets';

export default {
  components: {
    AddCurrencies,
    AllocatedAssets
  },

  props: {
    aside_allocated_assets: {
      type: Array,
      default: function() {
        return [];
      }
    },
    data_with_market: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },

  data() {
    return {
      buttonInactive: false,
      is_new_portfolio: true,
      is_pages: true
    };
  },
  computed: {
    ...mapState('page', ['activeMarket']),

    is_save_portfolio() {
      let percent = 0;
      for (let item of this.aside_allocated_assets) {
        if (parseFloat(item.percent) === 0) return true;
        else percent += parseFloat(item.percent) || 0;
      }
      percent = Math.round(percent * 100) / 100;
      if (this.aside_allocated_assets.length != 0 && percent === 100)
        return false;
      else return true;
    },
    balance_in_market() {
      return this.activeMarket.balance;
    }
  },
  mounted() {},
  methods: {
    ...mapMutations('page', [
      'setPopup',
      'makeBackupAnalyzedPortfolios',
      'loadBackupAnalyzedPortfolios'
    ]),

    action_on_save_buttom() {
      this.makeBackupAnalyzedPortfolios();
      this.setPopup(null);
    },

    action_on_cancel_buttom() {
      this.loadBackupAnalyzedPortfolios();
      this.setPopup(null);
    },

    percentChange(value) {
      this.buttonInactive = value;
    }
  }
};
</script>

<template>
  <BasePopup class="efficient-frontier-popup">
    <BaseHeadline
      title="Set your optimal asset weight"
      class="efficient-frontier-popup__headline"
    >
      You can add any selected assets and set a percentage for any cryptocurrency
    </BaseHeadline>
    
    <AllocatedAssets
      :aside_allocated_assets="aside_allocated_assets"
      :balance="balance_in_market"
      class="efficient-frontier-popup__allocated-assets"
      @percent="percentChange"
    />
    <div class="efficient-frontier-popup__add-title">
      ADD ASSETS
    </div>
    <AddCurrencies
      :search="true"
      :tags="true"
      :coin_list="aside_allocated_assets"
      :whitelist="data_with_market"
      :is_new_portfolio="is_new_portfolio"
      :pages="is_pages"
      class="efficient-frontier-popup__add-assets"
    />

    <BaseButton 
      type="secondary" 
      @click.native="action_on_cancel_buttom">
      CANCEL
    </BaseButton>
    <BaseButton
      :is-inactive="is_save_portfolio"
      type="primary"
      @click.native="action_on_save_buttom"
    >
      SAVE
    </BaseButton>
  </BasePopup>
</template>

<style lang="scss">
.efficient-frontier-popup {
  &__add-title {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
    margin: em(16px, $size) 0 em(10px, $size);
  }
  &__add-assets {
    margin-bottom: em(40px);
  }
  .base-headline {
    border: none;
  }
  &__tags {
    margin: em(20px) 0 em(40px);
  }
}
</style>
