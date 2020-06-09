<template>
  <div class="landing-plans">
    <div class="container">
      <Header 
        id="header-menu" 
        class="landing-plans__header" />
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
            class="sale-white"
          >Save -12%</span
          >
        </div>
      </div>

      <div class="landing-plans-content">
        <div class="landing-plans-content-block">
          <div class="landing-plans-content-block__img">
            <img 
              class="" 
              src="/img/free-plans.svg" 
              alt="" >
          </div>

          <div class="landing-plans-content-block__title">FREE HOLDER PLAN</div>
          <ul class="landing-plans-content-block__items">
            <li class="narrow">link any available Exchange and create portfolio step by step</li>
            <li>use Correlation Matrix</li>
            <li class="narrow">Portfolio optimization in step by step portfolio</li>
            <li>Allocation crypto assets</li>
            <li class="narrow">
              All in one portfolios in dashboard
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
              src="/img/default-plans.svg" 
              alt="" >
          </div>
          <div class="landing-plans-content-block__title">HOLDER PLAN</div>
          <ul class="landing-plans-content-block__items">
            <li>Link any available Exchange</li>
            <li>Use Correlation Matrix</li>
            <li>Portfolio optimization</li>
            <li>Allocation crypto assets</li>
            <li class="narrow">
              Automatic portfolio rebalancing (threshold or periodic or their
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
                class="landing-plans__btn"
                to="/landing-modal/welcome"
                type="primary"
              >
                7 DAY FREE
              </BaseButton>
            </div>
          </div>
        </div>

        <div class="landing-plans-content-block">
          <div class="landing-plans-content-block__img">
            <img 
              class="" 
              src="/img/pro-plans.svg" 
              alt="" >
          </div>
          <div class="landing-plans-content-block__title">HOLDER PRO</div>
          <ul class="landing-plans-content-block__items">
            <li>Link any available Exchange</li>
            <li>Use Correlation Matrix</li>
            <li>Find Efficient Frontier portfolio</li>
            <li>adjust optimal portfolio weights</li>
            <li class="narrow">
              Automatic portfolio rebalancing (threshold or periodic or their
              combination)
            </li>
            <li>Backtest Any Portfolio</li>
            <li>Save and Load Portfolio</li>
            <li>Ready - Made Portfolio</li>
            <!--<li>Market scan tool</li>-->
            <li>Trailing stop</li>
            <li>Emergency option</li>
            <li>Efficient crypto index strategy</li>
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
              class="landing-plans__btn"
              to="/landing-modal/welcome"
              type="orange"
            >
              SUBSCRIBE
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import Header from '~/components/landing/Header';

export default {
  layout: 'plans',
  components: {
    Header
  },
  data() {
    return {
      isHidden: ''
    };
  },
  computed: {
    ...mapState('page', ['popup'])
  },
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<style lang="scss" scoped>
.landing-plans {
  background: url('/img/landing_plans-bg.png') no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  height: 100%;
  .container {
    position: relative;
    @include ifdesktop {
      max-width: em(1138px);
      width: 100%;
      margin: 0 auto;
    }
  }
  &__header {
    max-width: em(1138px);
    width: 100%;
    margin-bottom: em(130px);
    @include ifmobile {
      background: $purple;
      position: fixed;
      z-index: 1000;
    }
  }
  .landing-plans-switch {
    max-width: em(250px);
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
    margin-bottom: em(25px);
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
    @include ifmobile {
      padding-top: 150px;
    }
  }
  .landing-plans-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: em(75px);
    @include ifmobile {
      flex-wrap: wrap;
      padding-bottom: 0;
    }
    .landing-plans-content-block {
      width: em(320px);
      min-height: 727px;
      background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      text-align: center;
      padding-bottom: em(38px);
      @include ifmobile {
        width: 100%;
        /*margin-bottom: em(40px);*/
      }
      &__img {
        width: em(320px);
        height: em(171px);
        position: relative;
        margin-bottom: em(30px);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        @include ifmobile {
          width: 100%;
        }
        img {
          width: 100%;
          height: auto;
          background-size: cover;
        }
      }
      &__title {
        font-size: em(20px);
        line-height: em(27px);
        font-weight: 600;
        margin-bottom: em(19px);
      }
      &__items {
        text-align: left;
        padding-left: em(30px);
        padding-right: em(30px);
        margin-bottom: em(40px);
        li {
          list-style: none;
          font-size: em(16px);
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
}
</style>
