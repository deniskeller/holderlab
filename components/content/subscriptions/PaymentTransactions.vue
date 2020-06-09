<script>
export default {
  components: {},
  props: {
    transactions: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      // transactions: [
      //   {
      //     type: 'PayPal',
      //     date: '12.06.2019',
      //     amount: '$ 13.99',
      //     details: 'Complete'
      //   }
      // amount: '$ 13.99',
      //   details: 'Complete'
      // },
      //   amount: '$ 13.99',
      //   details: 'transaction not completed'
      // ]
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="payment-complete-order">
    <section>
      <div class="tbl-header">
        <table 
          cellpadding="0" 
          cellspacing="0" 
          border="0">
          <caption class="payment-complete-order__title">
            TRANSACTIONS
          </caption>
          <thead>
            <tr>
              <th scope="col">TYPE</th>
              <th scope="col">DATE</th>
              <th scope="col">AMOUNT</th>
              <th scope="col">DETAILS</th>
            </tr>
          </thead>
        </table>
      </div>

      <BaseScrollBlock>
        <div class="tbl-content">
          <table 
            cellpadding="0" 
            cellspacing="0" 
            border="0">
            <tbody>
              <tr 
                v-for="transaction in transactions" 
                :key="transaction.id">
                <td aria-label="Type">{{ transaction.reason }}</td>
                <td aria-label="Date">{{ transaction.pdate }}</td>
                <td aria-label="Amount">{{ transaction.amount }}</td>
                <td aria-label="Amount">{{ transaction.status_transaction }}</td>
                <!--<td -->
                <!--  v-if = "transaction.is_complete"-->
                <!--  class="td-details" -->
                <!--  aria-label="Details">-->
                <!--  Complete-->
                <!--</td>-->
                <!--<td -->
                <!--  v-else-->
                <!--  class="td-details" -->
                <!--  aria-label="Details">-->
                <!--  Transaction not completed-->
                <!--</td>-->
              </tr>
            </tbody>
          </table>
        </div>
      </BaseScrollBlock>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.payment-complete-order {
  position: relative;
  display: block;
  padding: em(23px) em(15px) em(23px) em(10px);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  @include ifmobile {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    padding: em(40px) em(10px) em(40px) em(10px);
    overflow: hidden;
  }

  &__title {
    font-size: em(12px);
    line-height: em(18px);
    font-weight: 600;
    margin-bottom: em(24px);
  }
  .tbl-header {
    margin-bottom: em(15px);
  }
  thead > tr > th {
    font-size: em(12px);
    line-height: em(35px);
    font-weight: 600;
    color: $black;
  }
  tbody {
    width: 100%;
    overflow: auto;
  }
  tbody > tr > td {
    font-size: em(12px);
    line-height: em(45px);
    font-weight: 600;
    color: #c4c4c4;
    text-align: center;
  }
  .td-details {
    line-height: em(14px);
    font-size: em(10px);
  }

  table {
    width: em(263px);
    table-layout: fixed;
    @include ifmobile {
      width: em(340px);
    }
  }
  .tbl-content {
    height: em(180px);
  }
  th {
    text-align: center;
    font-weight: 600;
    font-size: em(12px);
  }
  td {
    text-align: center;
    vertical-align: middle;
    font-size: em(12px);
  }
}
</style>
