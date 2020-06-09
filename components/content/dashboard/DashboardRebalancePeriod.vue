<script>
export default {
  components: {},
  props: {
    periods: {
      type: Object,
      default() {
        return {
          threshold: null,
          time: '',
          interval: null
        };
      }
    }
    // myvalue: {
    //   type: Object,
    //   default: function() {
    //     return { market_title: '', market_id: 0 };
    //   }
    // }
  },
  data() {
    return {
      // periods: {
      //   threshold: 10,
      //   interval: 1,
      //   time: 'day'
      // },
      image: '/img/reload.svg'
    };
  },
  computed: {},
  mounted() {
    // console.log(typeof this.periods.threshold + 'kek');
  },
  methods: {}
};
</script>

<template>
  <div class="rebalance-period">
    <div class="rebalance-period__period">
      <span 
        v-if="periods.threshold > 0" 
        class="period__threshold">{{ periods.threshold }}</span><span v-if="periods.threshold">%</span>
      <span v-if="periods.threshold && periods.interval">+</span>
      <span 
        v-if="periods.interval > 0 && periods.time != 'off'" 
        class="period__time">{{ periods.interval }}</span>
      <span 
        v-if="periods.time != 'off' && periods.interval != 0" 
        class="period__interval">{{ periods.time }}</span>
        
      <span 
        v-if="periods.threshold == null && periods.time == null" 
        class="period__norebalance">NO REBALANCE</span>
        
      <img 
        v-else 
        :src="image" 
        alt="" 
        class="rebalance-period__img">
      
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rebalance-period {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  &__period {
    display: block;
    color: #c4c4c4;
    font-size: em(11px);
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
    .period__unit {
      margin-right: em(3px);
      white-space: nowrap;
    }
    .period__norebalance {
      display: block;
      text-align: center;
    }
  }
  &__img {
    display: block;
    width: 100%;
    height: 20px;
    margin: 0 auto;
  }
}
</style>
