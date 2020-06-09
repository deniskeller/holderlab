<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import StarIcon from '~/components/icons/StarIcon';
// import DeletePortfolioPopup from '~/components/content/DeletePortfolioPopup';
export default {
  components: {
    StarIcon
    // DeletePortfolioPopup
  },
  props: {
    subscribers: {
      type: String,
      default: null
    },
    is_ready_made: {
      type: Boolean,
      default: false
    },
    status: {
      type: Boolean,
      default: false
    },
    id_ready_made: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: 0
    },
    market: {
      type: Object,
      default() {
        return {
          market_title: 'all',
          market_id: '0'
        };
      }
    },
    title: {
      type: String,
      default: null
    },
    star: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: null
    },
    day: {
      type: Number,
      default: null
    },
    mon: {
      type: Number,
      default: null
    },
    year: {
      type: Number,
      default: null
    },
    coins: {
      type: Array,
      default: null
    },
    delete_item: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      redirectFlag: true
    };
  },
  computed: {
    ...mapState('page', ['deletedPortfolio']),

    load_portfolio_button: {
      get: function() {
        return this.deletedPortfolio;
      },
      set: function(value) {
        this.setDeletedPortfolio(value);
      }
    },

    cut_text() {
      if (this.text.length > 90) return this.text.slice(0, 90) + '...';
      else {
        return this.text;
      }
    },

    computed_day() {
      if (this.day === null) {
        return 0;
      } else {
        return this.day;
      }
    },
    computed_mon() {
      if (this.mon === null) {
        return 0;
      } else {
        return this.mon;
      }
    },
    computed_year() {
      if (this.year === null) {
        return 0;
      } else {
        return this.year;
      }
    },
    //-----------------
    change_color_day() {
      if (this.computed_day < 0) {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    },
    change_color_mon() {
      if (this.computed_mon < 0) {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    },
    change_color_year() {
      if (this.computed_year < 0) {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    }
  },
  mounted() {
    // console.log('----mounted dashboard----');
    // if (!this.$cookies.get('secret_token')) {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    this.setDeletedPortfolio();
    // }
  },
  methods: {
    ...mapActions('page', [
      'getFullDataWithSavedPortfolioInAnalized',
      'deletedSavedPortfolio'
    ]),

    ...mapMutations('page', [
      'setPopup',
      'setOnPathInDashboard',
      'setOffPathInDashboard',
      'setIdSavedNewPortfolio',
      'setIdActivePortfolio',
      'setDeletedPortfolio',
      'setIdSavedPortfolioUsedInDashboard',
      'setMarketSavedPortfolioUsedInDashboard'
    ]),

    onClick() {
      // console.log('onClick');
      if (this.redirectFlag) {
        if (this.is_ready_made) {
          this.$router.push({
            path: '/ready-made/card/' + this.id_ready_made
          });
        } else {
          if (this.market.market_title != 'all') {
            this.setIdActivePortfolio(this.market.market_title);
            this.setOnPathInDashboard();
            this.setIdSavedNewPortfolio(Number(this.id));
            this.getFullDataWithSavedPortfolioInAnalized();
          }

          this.$router.push({
            path: '/create-new-portfolio/portfolio-activation'
          });
        }
      } else {
        this.redirectFlag = true;
      }
    },

    del() {
      this.setIdSavedPortfolioUsedInDashboard(this.id);
      this.setMarketSavedPortfolioUsedInDashboard(this.market.market_title);
      this.redirectFlag = false;
      if (!this.redirectFlag) {
        this.setPopup('delete-portfolio-popup');
      }
    }
  }
};
</script>

<template>
  <div 
    class="ready-made-card" 
    @click="onClick">
    <div
      v-if="subscribers"
      class="ready-made-card-subscribers ready-made-card__ready-made-card-subscribers"
    >
      <span class="ready-made-card-subscribers__title">SUBSCRIBERS</span>
      <span class="ready-made-card-subscribers__number">
        {{ subscribers }}
      </span>
      
    </div>

    <div class="ready-made-card__content">
      <div class="ready-made-card__title">
        {{ title }}
        <StarIcon
          v-if="star"
          :class="{
            'ready-made-card__star_right': !subscribers,
            'ready-made-card__star-icon--active': !status
          }"
          class="ready-made-card__star-icon"
        />
        <BaseClose
          v-if="delete_item && !is_ready_made"
          ref="deleteItem"
          class="delete-item"
          @click.native="del()"
        />
      </div>
      <div class="ready-made-card__text">
        {{ cut_text }}
      </div>
      <div class="ready-made-card-data ready-made-card__ready-made-card-data">
        
        <!--<BaseCurrency-->
        <!--  :title="market.market_title"-->
        <!--  :id_market="market.market_id"-->
        <!--  class="ready-made-card-footer__currency"-->
        <!--/>-->
        <div class="ready-made-card-data__items">
          <div class="ready-made-card-data__item">
            <div class="ready-made-card-data__time">
              <!--1 DAY-->
            </div>
            <div
              :style="{ color: change_color_day }"
              class="ready-made-card-data__percent"
            >
              <!--{{ computed_day }} %-->
            </div>
          </div>
          <div class="ready-made-card-data__item">
            <div class="ready-made-card-data__time">
              <!--1 MON.-->
            </div>
            <div
              :style="{ color: change_color_mon }"
              class="ready-made-card-data__percent"
            >
              <!--{{ computed_mon }} %-->
            </div>
          </div>
          <div class="ready-made-card-data__item">
            <div class="ready-made-card-data__time">
              <!--1 YEAR-->
            </div>
            <div
              :style="{ color: change_color_year }"
              class="ready-made-card-data__percent"
            >
              <!--{{ computed_year }} %-->
            </div>
          </div>
        </div>
        
        <div class="ready-made-card-footer__coins">
          <BaseCoinMini
            v-for="(item, index) in coins"
            v-show="index < 9"
            :key="index"
            :title="item.id_coin"
            class="ready-made-card-footer__coin"
          />
          <div 
            v-if="coins.length > 9" 
            class="ready-made-card-footer__bage">
            {{ coins.length }}
          </div>
        </div>
      </div>
    </div>
    <!--<DeletePortfolioPopup -->
    <!--  :id="id"-->
    <!--  :market = "market.market_title"-->
    <!--  class=""/>-->
  </div>
</template>

<style lang="scss" scoped>
.delete-item {
  position: absolute;
  top: 0;
  right: em(3px);
}
.ready-made-card {
  $this: &;
  position: relative;
  max-width: em(247px);
  width: 100%;
  min-height: em(129px);
  margin-bottom: em(30px);
  border: 1px solid $grey;

  box-sizing: border-box;
  background-color: $white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @include ifdesktop {
    padding: em(25px) em(11px) em(10px) em(15px);
  }
  @include ifmobile {
    padding: em(20px) em(15px) em(15px) em(15px);
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: em(110px);
    height: 1px;
    background-color: $blue;
    top: -1px;
    left: em(20px);
  }

  &__title {
    $size: 20px;
    font-size: em($size);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__text {
    font-size: em(10px);
    padding-right: em(44px);
    margin-bottom: em(35px);
  }

  &__star-icon {
    width: em(14px);
    height: em(13px);
    fill: $yellow;
    margin-left: em(2px);
    &_right {
      position: absolute;
      right: em(26px);
    }
  }
  &__star-icon--active {
    fill: $grey;
  }

  &__ready-made-card-data {
    margin-top: em(10px);
  }

  &__ready-made-card-subscribers {
    position: absolute;
    @include ifdesktop {
      top: em(33px);
      right: em(33px);
    }
    @include ifmobile {
      top: em(15px);
      right: em(15px);
    }
  }
}

.ready-made-card-data {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &__items {
    display: flex;
    flex-direction: row;
  }
  &__item {
    width: em(36px);
  }

  &__time {
    $size: 9px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
  }

  &__percent {
    $size: 9px;
    font-size: em($size);
  }
}

.ready-made-card-subscribers {
  &__title {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
  }

  &__number {
    $size: 14px;
    font-size: em($size);
  }
}

.ready-made-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__link {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
  }

  &__coins {
    display: flex;
    flex-direction: row-reverse;
    width: em(140px);
  }
  &__coin {
    margin-left: em(-8px);
  }
  &__bage {
    $size: 12px;
    font-size: em($size);
    @extend %center;
    @extend %bottom-shadow;
    width: em(24px, $size);
    height: em(24px, $size);
    border-radius: 100%;
    box-sizing: border-box;
    border: 1px solid $grey;
    background-color: $white;
    color: $blue;
  }
}
</style>
