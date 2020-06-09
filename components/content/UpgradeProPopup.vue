<script>
import { mapMutations, mapActions } from 'vuex';
import TickIcon from '~/components/icons/TickIcon';

export default {
  components: {
    TickIcon
  },
  props: {},
  data() {
    return {
      isHidden: false
    };
  },

  watch: {
    isHidden() {
      this.setPaymantData(null);
    }
  },

  methods: {
    ...mapMutations('page', ['setPopup', 'setPaymantData']),

    ...mapActions('page', ['getTransactions', 'getOrderPaymant']),

    get_order_paymant(value) {
      this.setPaymantData(null);
      this.setPopup(null);
      if (this.isHidden) {
        this.getOrderPaymant({ how_long: 'year', holder_plan: value });
      } else {
        this.getOrderPaymant({ how_long: 'month', holder_plan: value });
      }
      this.$router.push({ path: '/subscriptions/' });
    }
  }
};
</script>

<template>
  <BasePopup class="ready-made-popap">
    <BaseHeadline
      title="Upgrade your holder plan level! Enjoy it"
      class="ready-made-popap__headline"
    />

    <div class="landing-plans-switch">
      <div class="landing-plans-switch__period">Monthly</div>
      <BaseSwitchPlans
        v-model="isHidden"
        class="landing-plans-switch__switch"
      />
      <div class="landing-plans-switch__sale">
        Yearly/
        <span 
          :class="{ sale_red: isHidden }" 
          class="sale-red">Save -12%</span>
      </div>
    </div>

    <table class="ready-made-popap__table">
      <tbody>
        <tr>
          <!--<td class="ready-made-popap__td ready-made-popap__td_1 ready-made-popap__td_first"/>-->
          <td
            class="ready-made-popap__td ready-made-popap__td_2 ready-made-popap__td_first"
          >
            AVAILABLE FEATURES
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2">
            FREE
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_3">
            HOLDER <br >
            <span v-if="!isHidden">$ 7.99/M</span
            ><span v-if="isHidden">$ 7.03/M</span>
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            HOLDER PRO <br >
            <span v-if="!isHidden">$ 14.99/M</span
            ><span v-if="isHidden">$ 13.19/M</span>
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Link any available exchange and create one portfolio step by step
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2">
            <TickIcon class="ready-made-popap__tick" />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_3">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Real-time portfolio performance in Dashboard. Allocation crypto assets
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2">
            <TickIcon class="ready-made-popap__tick" />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_3">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Cryptocurrency correlation matrix
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2">
            <TickIcon class="ready-made-popap__tick" />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_3">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Efficient frontier portfolio optimisation (analyzes 5000 portfolios)
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2">
            <!--<TickIcon class="ready-made-popap__tick" />-->
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_3">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Automatic portfolio rebalancing (threshold & period rebalancing). Asset accumulation strategy
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2">
            <!--<TickIcon class="ready-made-popap__tick" />-->
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_3">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Backtest any portfolio (save and load portfolio)
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2" />
          <td class="ready-made-popap__td ready-made-popap__td_3">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Ready-made portfolio. Unlimited portfolios step by step
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2" />
          <td class="ready-made-popap__td ready-made-popap__td_3">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Set your trailing stop for portfolio. Emergency options
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2" />
          <td class="ready-made-popap__td ready-made-popap__td_2" />
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Automatic rebalancing strategy with portfolio optimisation (crypto index)
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2" />
          <td class="ready-made-popap__td ready-made-popap__td_2" />
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Efficient frontier portfolio optimisation (analyzes 50 000 portfolios)
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2" />
          <td class="ready-made-popap__td ready-made-popap__td_2" />
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ready-made-popap__button-container">
      <BaseButton
        to="/subscriptions/"
        type="orange"
        class="ready-made-popap__button"
        @click.native = "get_order_paymant('pro')"
      >
        UPGRADE
      </BaseButton>
    </div>
  </BasePopup>
</template>

<style lang="scss" scoped>
.ready-made-popap {
  .base-popup__container {
    @include ifdesktop {
      padding-right: em(97px);
    }
  }
  &__headline {
    text-align: center;
    @include ifmobile {
      padding-top: em(20px);
    }
  }
  &__table {
    border-spacing: em(6px);
  }
  &__td {
    height: em(70px);
    box-sizing: border-box;

    &_1 {
      width: 40%;
      border: 1px solid $grey;
      padding: 0 em(24px);
    }
    &_2,
    &_3,
    &_4 {
      $size: 12px;
      font-size: em($size);
      width: 10%;
      text-align: center;
      font-weight: bold;
    }
    &_2 {
      background: $light-blue;
      color: $blue;
    }
    &_3,
    &_4 {
      background: $blue;
      color: $white;
    }

    &_first {
      border: none;
    }
  }

  &__td_first {
    height: em(95px);
    @include ifmobile {
    }
  }

  &__tick {
    width: em(12px);
    height: em(10px);
    fill: $blue;

    &_white {
      fill: $white;
    }
  }

  &__button-container {
    text-align: right;
    margin-top: em(30px);
    padding-right: em(6px);
  }
}

.landing-plans-switch {
  max-width: em(228px);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  margin-bottom: em(45px);
  &__period {
    font-size: em(14px);
    color: #c4c4c4;
  }
  &__switch {
    margin-left: em(10px);
    margin-right: em(10px);
  }
  &__sale {
    font-size: em(14px);
    color: #c4c4c4;
    .sale-white {
      color: $white;
    }
    .sale_red {
      color: $red;
    }
  }
}
</style>
