<script>
/*DashboardCreateNewPortfolio */
import { mapMutations } from 'vuex';
import DashboardPortfolioCard from '~/components/content/dashboard/DashboardPortfolioCard';

export default {
  components: {
    DashboardPortfolioCard
  },

  props: {
    short_portfolio_list: {
      type: Array,
      default: null
    },
    name: {
      type: String,
      default: null
    }
  },

  data() {
    return {};
  },
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="rebalancing-tab-content">
    <div class="rebalancing-tab-headline">
      <div class="rebalancing-tab-headline__title">{{ name }} Portfolios</div>
    </div>
    <div 
      v-if ="short_portfolio_list"
      class="rebalancing-tab-container">
      
      <!--{{ short_portfolio_list }}-->
      
      <DashboardPortfolioCard
        v-for="(item, index) in short_portfolio_list"
        :title="item.name"
        :key="index"
        :id="item.id"
        :is_ready_made="item.is_ready_made"
        :id_ready_made="item.id_ready_made"
        :market="item.market"
        :subscribers="null"
        :star="true"
        :status="item.is_active"
        :coins="item.first_five_coin"
        :text="item.description"
        :day="item.statistics.day"
        :mon="item.statistics.month"
        :year="item.statistics.year"
        :delete_item="true"
        to="/create-new-portfolio"
        link="/"
        currency="Binance"
        class="dashboard-more__card"
      />
      <BaseCreateNewBanner
        to="/create-new-portfolio/"
        icon="lamp"
        style="background-image: url(/img/help/creatnew.png)"
        class="create-new-portfolio__banner"
      >
        CREATE NEW <br >
        PORTFOLIO
      </BaseCreateNewBanner>

      <BaseButton
        to="/ready-made"
        type="orange"
        class="rebalancing-tab__button"
      >
        READY-MADE
      </BaseButton>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
.rebalancing-tab-content {
  padding: 0 em(78px);
  @include ifmobile {
    padding: em(25px) em(40px) em(40px);
  }
  .rebalancing-tab-headline {
    text-align: center;
    font-weight: bold;
    margin-bottom: em(40px);
    &__title {
      font-size: em(20px);
      @include ifmobile {
        color: $white;
      }
    }
    &__subtitle {
      font-size: em(12px);
      color: #81d540;
    }
  }
  .rebalancing-tab-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    .dashboardportfoliocard-hidden {
      width: em(247px);
      height: 0px;
    }
    .dashboard-more__card {
      cursor: pointer;
      @include ifmobile {
        max-width: 100%;
      }
    }
    .create-new-portfolio__banner {
      height: em(175px);
      @include ifmobile {
        max-width: 100%;
      }
    }

    .rebalancing-tab__button {
      display: none;
      @include ifmobile {
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>
