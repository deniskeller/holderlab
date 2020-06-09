<script>
export default {
  props: {
    last_rebalance_date: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  computed: {
    get_last_rebalance_date() {
      if (this.last_rebalance_date != '') {
        return this.last_rebalance_date;
      } else {
        return 'UNDEFINED';
      }
    }
  }
};
</script>
<template>
  <div class="rebalance-last-time">
    <!--<span class="rebalance-last-time__title">LAST REBALANCE</span> <span class="rebalance-last-time__value">47</span> <span class="rebalance-last-time__time-unit">MIN.</span>  AGO-->
    <span class="rebalance-last-time__title">LAST REBALANCE</span>
    {{ get_last_rebalance_date }}
  </div>
</template>
<style lang="scss">
.rebalance-last-time {
  font-size: em(12px);
  line-height: em(21px);
  text-transform: uppercase;
  color: #c4c4c4;
  @include ifmobile {
    order: 1;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
