<script>
import ReadyMadeCard from '~/components/content/ready-made/ReadyMadeCard';
export default {
  components: {
    ReadyMadeCard
  },
  props: {
    ready_made_portfolio: {
      type: Object,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {},

  mounted() {},

  methods: {}
};
</script>

<template>
  <div class="dashboard-more">
    <div class="dashboard-more__info">
      <BaseTitle type="h2">
        Best ready-made portfolio
      </BaseTitle>
      Analyze all available portfolios in ready-made section. Copy the most
      performance portfolio and enjoy it!
      <BaseButton 
        to="/ready-made" 
        type="orange" 
        class="dashboard-more__button">
        READY-MADE
      </BaseButton>
    </div>
    
    <div 
      v-if ="ready_made_portfolio.name"
      class="dashboard-more__card-container">
      
      <ReadyMadeCard
        :subscribers="ready_made_portfolio.subscribers"
        :star="true"
        :id_portfolio="ready_made_portfolio.id_portfolio"
        :currency="ready_made_portfolio.market.market_title"
        :marketid="ready_made_portfolio.market.market_id"
        :coins="ready_made_portfolio.first_five_coin"
        :title="ready_made_portfolio.name"
        :text="ready_made_portfolio.description"
        :day="ready_made_portfolio.statistics.day"
        :mon="ready_made_portfolio.statistics.month"
        :year="ready_made_portfolio.statistics.year"
        class="dashboard-more__card"
      />
      
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-more {
  padding: em(60px);
  background-color: $dark-green;
  display: flex;
  justify-content: space-between;

  &__info {
    position: relative;
    color: $white;
    width: em(326px);
    padding-bottom: em(60px);
  }

  &__button {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &__card-container {
    position: relative;
    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: em(4px);
      left: em(4px);
      background-color: $white;
      border: 1px solid $grey;
    }
    &::before {
      top: em(8px);
      left: em(8px);
      z-index: 0;
    }
    &::after {
      top: em(4px);
      left: em(4px);
      z-index: 1;
    }
  }
  &__card {
    position: relative;
    z-index: 2;
  }
}
</style>
