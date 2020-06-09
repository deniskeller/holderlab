<script>
import { mapMutations, mapState } from 'vuex';

import marketList from '~/assets/data/market-list.json';
import NavAccount from '~/components/nav/NavAccount';
import AddApiKeyForm from '~/components/content/AddApiKeyForm';
import ExchangePopup from '~/components/content/account/ExchangePopup';

export default {
  components: {
    NavAccount,
    AddApiKeyForm,
    ExchangePopup
  },
  head: {
    bodyAttrs: {
      class: 'account'
    }
  },
  data() {
    return {
      marketList,
      noSelected: false,
      selected: {
        market_title: '',
        market_id: ''
      },
      flag: false,
      is_update: true
    };
  },
  computed: {
    ...mapState('page', ['userMarketList']),

    check() {
      return (
        this.selected.market_title == 'Kucoin' ||
        this.selected.market_title == 'Okex'
      );
    },

    user_markets_list() {
      let buff = {
        market: [],
        value: []
      };
      for (let item of this.userMarketList) {
        try {
          if (item.market.market_title != 'all') {
            buff.market.push(item.market);
          }
        } catch (e) {
          console.log(e);
        }
      }
      return buff;
    }
  },

  methods: {
    ...mapMutations('page', ['setPopup']),

    changeCurrency() {
      this.noSelected = false;
    }
  }
};
</script>

<template>
  <div class="account-exchange">
    <BaseContainer>
      <BaseContent>
        <div class="matrix__headline">
          <BaseHeadline 
            title="Exchange" 
            class="matrix__headline-title" />
        </div>

        <div class="account-exchange__form">
          <div class="account-exchange__currency-container">
            <BaseSelect
              v-model="selected"
              :list="user_markets_list.market"
              :currencies="true"
              type="form"
              name="exchange"
              class="account-exchange__exchange-input"
            >
              Exchange
            </BaseSelect>
            <!--<BaseSelect  -->
            <!--  v-model="selected"-->
            <!--  :list="['Binance', 'Bittrex', 'Kucoin', 'Bytecoin Cash', 'Bitcryctall', 'Bela', 'BlackCoin', 'BitShares']"-->
            <!--  :list-second="['$767.00981', '$32.900.902', '$1.102', '$767.00981', '$32.900.902', '$1.102', '$767.00981', '$32.900.902']"-->
            <!--  :currencies="true"-->
            <!--  type="form"-->
            <!--  name="exchange"-->
            <!--  class="account-exchange__exchange-input"-->
            <!--  @input="changeCurrency">-->
            <!--  Exchange-->
            <!--</BaseSelect>-->

            <BaseButton
              :is-inactive="noSelected"
              type="primary"
              class="account-exchange__manage-button"
              @click.native="setPopup('exchange-popup')"
            >
              MANAGE EXCHANGE
            </BaseButton>
          </div>
          <!--<div v-if="check">{{ selected }}</div>-->

          <AddApiKeyForm
            :selected="selected"
            :is_update = "is_update"
            :is_def_show_add_api_key_component="flag"
            title="ADD API KEY"
            question="/help/"
            class="account-exchange__add-api-key-form"
          />
        </div>
      </BaseContent>

      <BaseAside>
        <NavAccount class="account-exchange__nav" />
        <BaseHelpBanner
          to="/help"
          icon="email"
          style="background-image: url(/img/help/1.png)"
        >
          SUPPORT TEAM
        </BaseHelpBanner>
      </BaseAside>
    </BaseContainer>
    <ExchangePopup class="account-exchange__exchange-popup" />
  </div>
</template>

<style lang="scss">
.matrix__headline {
  @include ifmobile {
    background: $purple;
    text-align: center;
    color: $white;
    width: 100%;
  }
}

.account-exchange {
  &__form {
    @include ifmobile {
      padding: em(50px) em(15px) 0;
    }
  }
  &__nav {
    margin-bottom: em(50px);
  }
  &__currency-container {
    @include ifdesktop {
      display: flex;
      justify-content: space-between;
    }
    @include ifmobile {
      text-align: center;
    }
  }
  &__exchange-input {
    @include ifdesktop {
      width: em(423px);
    }
    @include ifmobile {
      width: 100%;
    }
  }
  &__add-api-key-form {
    margin-top: em(20px);
  }
  &__manage-button {
    @include ifmobile {
      margin-top: em(15px);
    }
  }
}
</style>
