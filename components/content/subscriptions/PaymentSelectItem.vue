<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  components: {},
  data() {
    return {
      images: [
        {
          img: '/img/bitcoin.svg'
        },
        {
          img: '/img/ethereum.svg'
        },
        {
          img: '/img/litecoin.svg'
        },
        {
          img: '/img/dashcoin.svg'
        }
      ]
    };
  },
  computed: {},
  mounted() {},
  methods: {
    ...mapActions('page', ['paypal'])
  }
};
</script>

<template>
  <div class="payment-avalible">
    <div class="payment-avalible__title">
      SELECT PAYMENT OPTION
    </div>

    <div class="payment-avalible__content">
      <div class="payment-avalible__content-paypal-button">
        <BaseButton 
          v-scroll-to="{
            el: '#subscribe',
            offset: -130
          }"
          type="primary" 
          class="payment-avalible-button">
          PAYPAL
        </BaseButton>
        <svg 
          class="payment-avalible-paypal-icon" 
          viewBox="0 0 24 24">
          <path
            d="M7.45 4.5L4.625 17.375H8.35L9.25 13.125H11.9C14.425 13.125 16.55 11.55 17.125 8.9C17.775 5.875 15.7 4.5 13.775 4.5H7.45ZM17.775 7.1C18.15 7.775 18.275 8.675 18.05 9.8C17.475 12.475 15.375 14.025 12.825 14.025H10.15L9.25 18.3H7L6.75 19.5H10.475L11.375 15.225H14.025C16.55 15.225 18.675 13.65 19.25 11C19.675 9 18.9 7.725 17.775 7.1ZM10.575 7.125H12.4C13.3 7.125 13.9 7.9 13.65 8.9L13.625 8.975L13.6 9.075L13.55 9.15L13.5 9.25V9.325L13.45 9.4L13.425 9.5L13.375 9.575L13.325 9.65L13.25 9.725L13.2 9.8L13.125 9.875L13.05 9.95L13 10L12.925 10.05L12.85 10.125L12.775 10.175L12.7 10.25L12.625 10.3L12.55 10.35L12.45 10.4L12.375 10.45L12.3 10.5H12.225L12.15 10.525L12.05 10.55L11.975 10.575L11.875 10.6L11.8 10.625H11.725H11.625H11.55H9.825L10.575 7.125Z"
          />
        </svg>
      </div>
      <div class="payment-avalible__content-select-items">
        <div
          v-for="image in images"
          :key="image.id"
          class="content-select-items__item"
        >
          <img 
            :src="image.img" 
            alt="" >
        </div>
      </div>
      <div class="payment-avalible__content-coinpayments">
        <img 
          src="@/static/img/coin-payments.svg" 
          alt="" >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.payment-avalible {
  position: relative;
  padding: em(23px) em(20px) em(40px);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &__title {
    font-size: em(12px);
    line-height: em(18px);
    font-weight: 600;
    margin-bottom: em(10px);
    @include ifmobile {
      text-align: center;
      margin-bottom: em(40px);
    }
  }
  &__content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 em(18px);
    &-paypal-button {
      position: relative;
      margin-right: em(45px);
      .payment-avalible-button {
        padding-left: 4em;
      }
      .payment-avalible-paypal-icon {
        position: absolute;
        width: em(24px);
        height: em(24px);
        top: em(9px);
        left: em(14px);
        fill: $white;
        pointer-events: none;
      }
    }
    &-select-items {
      display: flex;
      flex-direction: row;
      margin-right: em(20px);
      @include ifmobile {
        display: none;
      }
      .content-select-items__item {
        width: em(70px);
        height: em(70px);
        background: rgba(222, 222, 222, 0.37);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: em(20px);
        box-sizing: border-box;
        img {
          width: 70%;
          height: 70%;
        }

        &:last-child {
          margin-right: 0;
        }
        &:hover {
          border: 1px solid #003bf9;
        }
        &:active {
          border: 1px solid #003bf9;
        }
      }
    }
    &-coinpayments {
      cursor: pointer;
      img {
        width: 100%;
      }
    }
  }
}
</style>
