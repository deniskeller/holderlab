<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import PaymentSelectItem from '~/components/content/subscriptions/PaymentSelectItem';
import PaymentCompleteOrder from '~/components/content/subscriptions/PaymentCompleteOrder';
import PaymentTransactions from '~/components/content/subscriptions/PaymentTransactions';
import SubscriptionsPopup from '~/components/content/subscriptions/SubscriptionsPopup';
import ChangeTariff from '~/components/content/ChangeTariff';
export default {
  components: {
    PaymentSelectItem,
    PaymentCompleteOrder,
    PaymentTransactions,
    ChangeTariff,
    SubscriptionsPopup
  },
  data() {
    return {
      isHidden: false
    };
  },
  computed: {
    ...mapState('page', [
      'removeAsset',
      'paymentInfo',
      'transactions',
      'paymantData',
      'userInfo'
    ]),

    country() {
      return this.userInfo.country;
    },

    is_vip() {
      return this.userInfo;
    },

    paymant_data() {
      return this.paymantData;
    },

    next_payment() {
      return this.paymentInfo.next_payment;
    },

    get_transactions() {
      return this.transactions;
    },

    date_next_payment() {
      return this.paymentInfo.date_end_vip;
    },

    next_payment_color() {
      if (this.next_payment >= 0) {
        return '#81D540';
      } else {
        return '#E92A00';
      }
    }
  },

  watch: {
    isHidden() {
      this.setPaymantData(null);
    }
  },

  mounted() {
    if (this.country == '') {
      this.setPopup('subscriptions-popup');
    }
    this.getTransactions();
  },

  beforeDestroy() {
    this.setPaymantData(null);
  },

  methods: {
    ...mapMutations('page', ['setPopup', 'setPaymantData']),

    ...mapActions('page', ['getTransactions', 'getOrderPaymant']),

    get_order_paymant(value) {
      this.setPaymantData(null);
      if (this.is_vip){
        this.setPopup('change-tariff-popup');
      }
      if (this.isHidden) {
        this.getOrderPaymant({ 
                              how_long: 'year', 
                              holder_plan: value 
        });
      } else {
        this.getOrderPaymant({ 
                              how_long: 'month',
                              holder_plan: value 
        });
      }
    }
  }
};
</script>

<template>
  <div class="payment">
    <BaseContainer>
      <BaseMaxContent>
        <div class="payment__headline">
          <div class="dashboard__headline-title">
            <BaseHeadline
              title="Subscriptions"
              class="payment__headline-title"
            />
          </div>

          <BaseButton
            v-scroll-to="{
              el: '#element',
              offset: -130
            }"
            class="payment__headline-choose"
            type="orange"
          >
            CHOOSE SUBSRIPTION
          </BaseButton>

          <BaseButton
            class="payment__headline-btn"
            @click.native="setPopup('subscriptions-popup')"
          >
            EDIT SUBSCRIPTION PROFILE
          </BaseButton>
        </div>

        <div class="payment-card payment__card payment-card-mobile">
          <div class="payment-card__title">NEXT PAYMENT</div>
          <div
          id = "balance"
            :style="{ color: next_payment_color }" 
            class="payment-card__value">
            {{ next_payment }}$
          </div>
          <div
            :class="[
              next_payment >= '0'
                ? 'payment-card__text'
                : 'payment-card__text-hidden'
            ]"
            class="payment-card__text"
          >
            <div class="payment-card__text-left">DATE</div>
            <div class="payment-card__text-right">{{ date_next_payment }}</div>
          </div>
        </div>

        <PaymentSelectItem
          class="payment__select-item-option payment__select-item-option-desktop"
        />

        <div class="payment__details">
          <PaymentCompleteOrder
            v-if = "paymant_data"
            id="complete"
            :paymant_data = "paymant_data" 
            class="details__complete-order" />
          <PaymentSelectItem
            id="select"
            class="payment__select-item-option payment__select-item-option-mobile"
          />
          <PaymentTransactions 
            :transactions = "get_transactions"
            class="details__transactions" />
        </div>
      </BaseMaxContent>

      <BaseAside>
        <BaseHelpBanner
          v-scroll-to="{
            el: '#subscribe',
            offset: -110
          }"
          style="background-image: url(/img/help/1.png)"
        >
          UPGRADE TO ENJOY OUR PREMIUM FEATURES
        </BaseHelpBanner>
        <div class="payment-card payment__card payment-card-desktop">
          <div class="payment-card__title">NEXT PAYMENT</div>
          <div 
            :style="{ color: next_payment_color }" 
            class="payment-card__value">
            {{ next_payment }}$
          </div>
          <div
            :class="[
              next_payment >= '0'
                ? 'payment-card__text'
                : 'payment-card__text-hidden'
            ]"
            class="payment-card__text"
          >
            <div  v-if = "next_payment"
                class="payment-card__text-left"> DATE </div>
            <div v-if = "next_payment"
                class="payment-card__text-right"> {{ date_next_payment }} </div>
          </div>
        </div>
      </BaseAside>
    </BaseContainer>

    <BaseContainer 
      id="element" 
      :single="true" 
      class="payment-basecontainer">
      <BaseCenterTitle 
        class="payment__subscriptions-title"
      >Choose Plan</BaseCenterTitle
      >

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
            class="sale-red"
          >Save -12%</span
          >
        </div>
      </div>

      <div class="landing-plans-content">
        <div
          class="landing-plans-content-block landing-plans-content-block-hidden"
        >
          <div class="landing-plans-content-block__img">
            <img 
              class="" 
              src="/img/free-plans.png" 
              alt="" >
          </div>

          <div class="landing-plans-content-block__title">FREE HOLDER PLAN</div>
          <ul class="landing-plans-content-block__items">
            <li class="narrow">Link Any available Exchange and Create Portfolio Step by Step</li>
            <li>Use Correlation Matrix</li>
            <li class="narrow">Portfolio Optimization in Step by Step Portfolio</li>
            <li>Allocation Crypto Assets</li>
            <li class="narrow">
              All in One Portfolios in Dashboard
            </li>
          </ul>

          <div class="landing-plans-content-block__price">
            <div class="price">$0.00</div>
            <div class="price-sale">
              <span class="price-sale__after" />
              <span class="price-sale__save" />
            </div>

            <div class="price-btn">
              <BaseButton
                class="landing-plans__btn"
                to="/landing-modal/welcome"
                type="translucent"
              >
                GET STARTED FREE
              </BaseButton>
            </div>
          </div>
        </div>

        <div class="landing-plans-content-block">
          <div class="landing-plans-content-block__img">
            <img 
              class="" 
              src="/img/default-plans.png" 
              alt="" >
          </div>

          <div class="landing-plans-content-block__title">HOLDER PLAN</div>
          <ul class="landing-plans-content-block__items">
            <li>Link any Available Exchange</li>
            <li>Use Correlation Matrix</li>
            <li>Portfolio Optimization</li>
            <li>Allocation Crypto Assets</li>
            <li class="narrow">
              Automatic Portfolio Rebalancing (threshold or periodic or their
              combination)
            </li>
            <li>Backtest Any Portfolio</li>
            <li>Save and Load Portfolio</li>
            <li>Ready - Made Portfolio</li>
          </ul>

          <div class="landing-plans-content-block__price">
            <div 
              v-if="!isHidden" 
              class="price-before">
              <div class="price">$7.99 / MONTH</div>
              <div class="price-sale">
                <span class="price-sale__after" />
                <span class="price-sale__save" />
              </div>
            </div>

            <div 
              v-if="isHidden" 
              class="price-after">
              <div class="price">$7.03 / MONTH</div>
              <div class="price-sale">
                <span class="price-sale__after">$7.99 /M</span>
                <span class="price-sale__save">Save $11.51</span>
              </div>
            </div>

            <div class="price-btn">
              <BaseButton
                v-scroll-to="{
                  el: '#balance',
                  offset: -110
                }"
                class="landing-plans__btn"
                type="primary"
                @click.native = "get_order_paymant('holder')"
              >
                SUBSCRIBE
              </BaseButton>
            </div>
          </div>
        </div>

        <div class="landing-plans-content-block">
          <div class="landing-plans-content-block__img">
            <img 
              class="" 
              src="/img/pro-plans.png" 
              alt="" >
          </div>
          <div class="landing-plans-content-block__title">HOLDER PRO</div>
          <ul class="landing-plans-content-block__items">
            <li>Link any Available Exchange</li>
            <li>Use Correlation Matrix</li>
            <li>Find Efficient Frontier portfolio</li>
            <li>Adjust Optimal Portfolio Weights</li>
            <li class="narrow">
              Automatic portfolio rebalancing (threshold or periodic or their
              combination)
            </li>
            <li>Backtest Any Portfolio</li>
            <li>Save and Load Portfolio</li>
            <li>Ready - Made Portfolio</li>
            <!--<li>Market scan tool</li>-->
            <li>Trailing Stop</li>
            <li>Emergency Option</li>
            <li>Efficient Crypto Index Strategy</li>
          </ul>

          <div class="landing-plans-content-block__price">
            <div 
              v-if="!isHidden" 
              class="price-before">
              <div class="price">$14.99 / MONTH</div>
              <div class="price-sale">
                <span class="price-sale__after" />
                <span class="price-sale__save" />
              </div>
            </div>

            <div 
              v-if="isHidden" 
              class="price-after">
              <div class="price">$13.19 / MONTH</div>
              <div class="price-sale">
                <span class="price-sale__after">$14.99 /M</span>
                <span class="price-sale__save">Save $21.59</span>
              </div>
            </div>

            <BaseButton
              v-scroll-to="{
                el: '#balance',
                offset: -110
              }"
              id = "subscribe"
              class="landing-plans__btn"
              type="orange"
              @click.native = "get_order_paymant('pro')"
            >
              SUBSCRIBE
            </BaseButton>
          </div>
        </div>
      </div>
    </BaseContainer>
    <SubscriptionsPopup class="subscriptions__popup" />
    <ChangeTariff class="change-tariff-popup" />
  </div>
</template>

<style lang="scss" scoped>
.dashboard__headline-title {
  @include ifmobile {
    background: $purple;
    text-align: center;
    color: $white;
    width: 100%;
    margin-bottom: em(30px);
  }
}
.payment {
  &__headline {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5em;
    @include ifmobile {
      flex-direction: column;
      margin-bottom: 0;
    }
    &-title {
      margin-bottom: 0px;
    }
    &-choose {
      display: none;
      @include ifmobile {
        display: block;
        width: em(292px);
        margin-bottom: em(30px);
      }
    }
  }
  &__select-item-option {
    margin-bottom: em(25px);
    @include ifmobile {
      margin-bottom: 0;
    }
  }
  &__details {
    display: flex;
    flex-direction: row;
    margin-bottom: em(28px);
    @include ifmobile {
      flex-wrap: wrap;
      margin-bottom: 0;
    }
    .details__complete-order {
      margin-right: em(23px);
      max-width: em(396px);
      width: 100%;
      @include ifmobile {
        margin-right: 0;
      }
    }
    .details__transactions {
      max-width: em(293px);
      width: 100%;
      @include ifmobile {
        max-width: 100%;
      }
    }
  }
  &__subscriptions-title {
    margin-bottom: em(20px);
  }
  .payment-basecontainer {
    padding-top: 0;
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
  .landing-plans-content {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: em(75px);
    max-width: em(794px);
    margin: 0 auto;
    @include ifmobile {
      flex-wrap: wrap;
      padding: 0 em(10px);
    }
    .landing-plans-content-block {
      width: em(220px);
      min-height: em(490px);
      background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      text-align: center;
      padding-bottom: em(38px);
      @include ifmobile {
        width: 100%;
        max-width: em(175px);
        margin-bottom: em(40px);
      }
      &__img {
        width: em(220px);
        height: em(118px);
        position: relative;
        margin-bottom: em(30px);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        @include ifmobile {
          width: 100%;
          height: em(80px);
        }
        img {
          width: 100%;
          height: 100%;
          -webkit-background-size: cover;
          background-size: cover;
        }
      }
      &__title {
        font-size: em(18px);
        line-height: em(18px);
        font-weight: 600;
      }
      &__items {
        text-align: left;
        padding-left: em(26px);
        padding-right: em(26px);
        margin-bottom: em(40px);
        @include ifmobile {
          padding-left: em(15px);
          padding-right: em(15px);
        }
        li {
          list-style: none;
          font-size: em(12px);
          line-height: 3em;
          color: #5b5959;
          text-decoration: underline;
          padding-bottom: em(15px);
        }
        .narrow {
          line-height: 1.5em;
        }
      }
      &__price {
        margin-top: auto;
        .price {
          font-size: em(20px);
          line-height: em(27px);
          font-weight: 600;
        }
        .price-sale {
          margin-bottom: em(18px);
          &__after {
            font-size: em(14px);
            font-weight: 600;
            color: #e92a00;
            text-decoration: line-through;
            margin-right: em(10px);
          }
          &__save {
            font-size: em(14px);
            font-weight: 600;
            color: #c4c4c4;
          }
        }
      }
    }
  }
  .payment-card {
    border: 1px solid #dedede;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: em(16px);
    padding: em(35px) em(27px) em(27px) em(27px);
    text-align: center;
    @include ifmobile {
      border: none;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    }
    &__title {
      font-size: em(20px);
      font-weight: 600;
    }
    &__value {
      font-size: em(36px);
      font-weight: 600;
    }
    &__text {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      font-size: em(12px);
      font-weight: 600;
      @include ifmobile {
        justify-content: space-around;
      }
      &-hidden {
        display: none;
      }
    }
  }
}
.payment-card-mobile {
  display: none;
  @include ifmobile {
    display: block;
  }
}
.payment-card-desktop {
  @include ifmobile {
    display: none;
  }
}
.payment__select-item-option-desktop {
  @include ifmobile {
    display: none;
  }
}
.payment__select-item-option-mobile {
  display: none;
  @include ifmobile {
    display: block;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    padding-top: em(40px);
  }
}
.landing-plans-content-block-hidden {
  @include ifmobile {
    display: none !important;
  }
}
</style>
