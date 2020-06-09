<script>
/*AddApiKeyForm*/
import { mapState, mapMutations, mapActions } from 'vuex';
// import ApiService from '@/services/ApiService';
import QuestionIcon from '~/components/icons/QuestionIcon';
import HintForm from '~/components/content/create-new-portfolio/HintForm';

export default {
  components: {
    QuestionIcon,
    HintForm
  },

  props: {
    name_portfel: {
      type: String,
      default: ''
    },

    is_update: {
      type: Boolean,
      default: false
    },

    is_def_show_add_api_key_component: {
      type: Boolean,
      default: true
    },

    is_show_item: {
      type: Boolean,
      default: null
    },

    selected: {
      type: Object,
      default() {
        return {
          market_title: '',
          market_id: ''
        };
      }
    },

    balance: {
      type: Number,
      default: 0
    }
  },

  data: function() {
    return {};
  },

  computed: {
    ...mapState('page', [
      'userMarketList',
      'activeMarket',
      'showButtomConnect',
      'marketConnectData'
    ]),

    computedShowButtomConnect() {
      return this.showButtomConnect;
    },

    key: {
      get() {
        return this.marketConnectData.key;
      },
      set(value) {
        this.setKeyInConnectData(value);
      }
    },

    secret: {
      get() {
        return this.marketConnectData.secret;
      },
      set(value) {
        this.setSecretInConnectData(value);
      }
    },

    password: {
      get() {
        return this.marketConnectData.password;
      },
      set(value) {
        this.setPassInConnectData(value);
      }
    },

    user_markets_list: {
      // """return user  market-list from store"""
      get() {
        let buff = {
          market: [],
          value: []
        };
        for (let item of this.userMarketList) {
          buff.market.push(item.market);
          buff.value.push(item.balance_portfel_usd);
        }
        return buff;
      },
      set(value) {
        this.setUserMarketList2(value);
      }
    },

    is_show_add_api_key_component() {
      // показываем блок add_api_key
      if (this.is_def_show_add_api_key_component) {
        for (let item of this.userMarketList) {
          try {
            if (this.selected.market_title == item.market.market_title) {
              return false;
            }
          } catch (err) {
            return true;
          }
        }
        return true;
      } else {
        return true;
      }
    },

    active_market: {
      /* all or any name market */
      get() {
        if (this.activeMarket.market_title == 'all') return null;
        else {
          return this.activeMarket;
        }
      },
      set(value) {
        this.setActiveMarket(value);
      }
    },

    is_base_button() {
      if (this.is_show_add_api_key_component) {
        if (
          this.key === '' ||
          this.secret === '' ||
          this.selected.market_title == ''
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },

  methods: {
    ...mapActions('page', [
      'makeRequestCreatePortfolio',
      'makeRequestExchangeAuthPortfelData'
    ]),
    ...mapMutations('page', [
      'setActiveMarket',
      'setUserMarketList2',
      'setKeyInConnectData',
      'setSecretInConnectData',
      'setPassInConnectData',
      'setNamePortfolio',
      'setIdSavedNewPortfolio',
      'setShowButtomConnect',
      'setAllAnalyzedPortfolios'
    ]),

    // hide_buttom_connect() {
    //   this.setShowButtomConnect(false);
    // },

    useButtomConnect() {
      if (this.is_update) {
        this.exchangeAuthPortfelData();
      } else {
        this.createPortfel();
      }
      this.key = ''
      this.secret = ''
      this.password = ''
    },
    createPortfel() {
      this.setNamePortfolio(this.name_portfel);
      let params = {
        name_portfel: this.name_portfel,
        market: this.selected.market_title,
        key: this.key,
        secret: this.secret,
        password: this.password
      };
      this.setIdSavedNewPortfolio(null);
      this.setAllAnalyzedPortfolios([]);
      this.makeRequestCreatePortfolio({
        data: params,
        selected: this.selected
      });
    },

    exchangeAuthPortfelData() {
      let params = {
        portfel_id: this.selected.market_title,
        market_key: this.key,
        market_secret: this.secret,
        market_password: this.password
      };
      // console.log(params);
      this.makeRequestExchangeAuthPortfelData(params);
    }
  }
};
</script>

<template>
  <div class="add-api-key-form">
    <div 
      v-show="is_show_add_api_key_component" 
      class="add-api-key-form__label">
      <div class="add-api-key-form__title">
        ADD API KEY
      </div>

      <BaseLink
        href="https://docs.holderlab.io/knowledge-base/how-connect-exchange-via-api/"
        class="add-api-key-form__question-link"
      >
        <QuestionIcon class="add-api-key-form__question" />
      </BaseLink>
    </div>

    <div class="add-api-key-form__form">
      <BaseInput
        v-show="is_show_add_api_key_component"
        v-model="key"
        type="password"
        name="key"
        icon="key"
        placeholder="API key"
        class="add-api-key-form__input"
      />

      <BaseInput
        v-show="is_show_add_api_key_component"
        v-model="secret"
        type="password"
        name="secret"
        icon="secret"
        placeholder="API secret"
        class="add-api-key-form__input"
      />

      <BaseInput
        v-show="is_show_add_api_key_component"
        v-if="
          selected.market_title == 'Kucoin' || selected.market_title == 'Okex'
        "
        v-model="password"
        type="password"
        name="secret"
        icon="secret"
        placeholder="PASSPHRASE"
        class="add-api-key-form__input"
      />

      <HintForm
        v-show="is_show_item"
        class="create-new-portfolio-form__hint-form"
      >
        <BaseCurrency
          :id_market="selected.market_id"
          :title="selected.market_title"
        />
        <div class="create-new-portfolio-form__hint-form-price">
          {{ balance }}$
        </div>
      </HintForm>
      <BaseButton
        v-show = "computedShowButtomConnect"
        :is-inactive="is_base_button"
        type="primary"
        class="add-api-key-form__button"
        @click.native="useButtomConnect"
      >
        CONNECT
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-api-key-form {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: em(423px);
  @include ifmobile {
    flex-direction: column;
  }

  &__input {
    display: block;
    width: 100%;
    margin-bottom: em(20px);
  }

  &__label {
    @include ifdesktop {
      margin-top: em(12px);
      display: flex;
      align-items: center;
    }
    @include ifmobile {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: em(20px);
      margin-bottom: em(40px);
    }
  }

  &__title {
    $size: 14px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
    @include ifmobile {
      margin-right: em(15px);
    }
  }

  &__question-link {
    height: em(20px);
  }

  &__question {
    width: em(20px);
    height: em(20px);
    fill: $blue;
    transition: fill $speed;

    @include ifdesktop {
      margin-left: em(30px);
    }
    @include ifmobile {
      /*margin-top: em(20px);*/
    }

    &:hover {
      fill: lighten($blue, 10%);
    }
  }

  &__form {
    width: em(262px);
    @include ifmobile {
      margin: 0 auto;
      text-align: center;
    }
  }

  &__button {
    margin-top: em(20px);
  }
}
</style>
