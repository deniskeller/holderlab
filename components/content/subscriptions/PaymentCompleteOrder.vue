<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  components: {},
  
  props: {
    paymant_data: {
      type: Object,
      default: null
    },
    
    is_click: {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {
      tarif:0,
      clickedButton: false
    };
  },
  
  computed: {
    ...mapState('page', ['url_data', 
                          'tariff_setting_plan',
                          'pp_url',
                          'tariff_setting_cycles',
                          ]),
    ...mapState(['uid']),
    
    get_is_click_subs() {
      return this.is_click_subs
    },
    
    get_url_data(){
      return this.url_data
    },
    
    get_pp_url(){
      return this.pp_url
    }
  },
  
  watch: {
    get_is_click_subs(){
      console.log('is_click_subs')
      // this.render_buttom()
    },
    is_click_subs(oldv, newv) {
      console.log('11is_click_subs')
      // this.render_buttom()
    }
  },
  mounted() {
    // this.$loadScript("https://www.paypalobjects.com/api/checkout.js")
  },
  
  methods: {
    ...mapMutations('page', [
      'setIsHiddendCompleteOrderWindow',
      'setPaymantData',
      ]),
      
    ...mapActions('page', [
      'createPaypalOrder',
      'sandbox_paypal',
      'getMessage',
      'getTransactions',
      'requestUserInfo',
    ]),
    
    render_buttom(){
      console.log('Render Buttom')
      this.clickedButton = true;
      // Script was unloaded successfully
      console.log('click')
      var CYCLES  = this.tariff_setting_cycles;
      var TARIF  = this.tariff_setting_plan;
      var UID  = this.uid;
      var getMessage  = this.getMessage;
      var setPaymantData  = this.setPaymantData;
      var requestUserInfo  = this.requestUserInfo;
      var getTransactions  = this.getTransactions;
      var CREATE_PAYMENT_URL  = 'https://api.holderlab.io/api/subs';
      var EXECUTE_PAYMENT_URL = 'https://api.holderlab.io/api/execute';
      paypal.Button.render({
          env: 'sandbox', // Or 'sandbox'
          commit: true, // Show a 'Pay Now' button
          locale: 'en_US',
          style: {
              size: 'medium',
              color: 'blue',
              shape: 'pill',
          },
          
          payment() {
            return paypal.request.post(CREATE_PAYMENT_URL,
            {
                uid: UID,
                tarif: TARIF,
                cycles: CYCLES,
                payment_system: 'PayPal',
            }
            ).then(function(data) {
                getMessage({
                  message: data.message,
                  status: data.status
                })
                return data.paymentToken;
            });
          },
  
          onAuthorize(data) {
            console.log('onAuthorize')
            return paypal.request.post(EXECUTE_PAYMENT_URL, {
                uid: UID,
                paymentToken: data.paymentToken,
                payerID:   data.payerID,
            }).then(function(res) {
                getMessage({
                  message: res.message,
                  status: res.status
                })
                setPaymantData(null);
                getTransactions();
                requestUserInfo();
                // The payment is complete!
                // You can now show a confirmation message to the customer
            });
          },
          
        //   getMessage({ dispatch, commit }, params) {
        //   console.log('getMessage')
        //   if (params.message != '' && params.message != null) {
        //     switch (params.status) {
        //       case 'ok':
        //         this.$toast.success(params.message).goAway(2500);
        //         break;
        //       case 'error':
        //         if (params.message != '500 (Internal Server Error)')
        //           this.$toast.error(params.message).goAway(2500);
        //         break;
        //       default:
        //         this.$toast.info(params.message).goAway(2500);
        //         break;
        //     }
        //   }
        // },
  
      }, '#paypal-button');
    
    }
  }
};
</script>

<template>
  <div class="payment-complete-order">
    <script src="https://www.paypalobjects.com/api/checkout.js"></script>
    <table class="payment-complete-order__table">
      <caption class="payment-complete-order__title">
        COMPLETE ORDER
      </caption>
      <thead>
        <tr>
          <th scope="col">SUBSCRIPTION</th>
          <th scope="col">PAYMENT PERIOD</th>
          <th scope="col">PRICE</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-border-bottom row-black">
          <td aria-label="Subscription">{{ paymant_data.holder_plan }}</td>
          <td aria-label="Payment period">{{ paymant_data.how_long }}</td>
          <td 
            class="price" 
            aria-label="Price">{{ paymant_data.price }}$</td>
        </tr>
        <tr class="row-border-bottom">
          <td 
            scope="row" 
            aria-label="Subscription">DISCOUNT</td>
          <td aria-label="Payment period">{{ paymant_data.discount }}%</td>
          <td 
            class="price" 
            aria-label="Price">{{ paymant_data.discount_value }}$</td>
        </tr>
        <tr class="row-border-bottom">
          <td 
            scope="row" 
            aria-label="Subscription">VAT</td>
          <td aria-label="Payment period">{{ paymant_data.vat }}%</td>
          <td 
            class="price" 
            aria-label="Price">{{ paymant_data.vat_value }}$</td>
        </tr>
        <tr class="row-black">
          <td 
            scope="row" 
            aria-label="Subscription">TOTAL</td>
          <td aria-label="Payment period" />
          <td 
            class="price" 
            aria-label="Price">{{ paymant_data.total }}$</td>
        </tr>
      </tbody>
    </table>
    <a href="#" @click="render_buttom" v-if="!clickedButton">Pay via PayPal</a>
    <div class="payment-complete-order__button">
        <div id="paypal-button"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.payment-complete-order {
  position: relative;
  display: block;
  padding: em(23px);
  width: em(396px);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @include ifmobile {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    padding: em(40px) em(23px);
  }
  &__table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    margin-bottom: em(33px);
  }
  &__title {
    font-size: em(12px);
    line-height: em(18px);
    font-weight: 600;
    margin-bottom: em(24px);
  }
  thead > tr > th {
    font-size: em(12px);
    line-height: em(35px);
    font-weight: 600;
    color: #c4c4c4;
    border-bottom: 1px solid #000;
  }
  tbody > tr > td {
    font-size: em(12px);
    line-height: em(45px);
    font-weight: 600;
    color: #c4c4c4;
    text-align: center;
  }
  .row-border-bottom {
    border-bottom: 1px solid #c4c4c4;
  }
  .row-black td {
    color: $black;
  }
  .price {
    color: $black;
  }
  // @include ifmobile {
  //   table {
  //     border: 0;
  //   }
  //   table caption {
  //     font-size: 1.3em;
  //   }
  //   table thead {
  //     display: none;
  //   }
  //   table tr {
  //     border-bottom: 3px solid #ddd;
  //     display: block;
  //     margin-bottom: 0.625em;
  //   }
  //   table td {
  //     border-bottom: 1px solid #ddd;
  //     display: block;
  //     font-size: 0.8em;
  //     text-align: right;
  //   }
  //   table td:before {
  //     content: attr(aria-label);
  //     float: left;
  //     font-weight: bold;
  //     text-transform: uppercase;
  //   }
  //   table td:last-child {
  //     border-bottom: 0;
  //   }
  // }
  &__button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    @include ifmobile {
      justify-content: center;
    }
  }
}
</style>
