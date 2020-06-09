<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import ReadyMadeIntro from '~/components/content/ready-made/ReadyMadeIntro';
import ReadyMadeCard from '~/components/content/ready-made/ReadyMadeCard';
import StarIcon from '~/components/icons/StarIcon';
import AddToReadyMadePopup from '~/components/content/dashboard/AddToReadyMadePopup';
import readyMadeCards from '~/assets/data/ready-made-cards.json';

export default {
  components: {
    ReadyMadeIntro,
    ReadyMadeCard,
    StarIcon,
    AddToReadyMadePopup
  },

  data() {
    return {
      readyMadeCards,
      crons_mask_for_filter_grafs: ['ALL TIME', 'DAY', 'MONTH', 'YEAR'],
      show_portfolio_type: 0,
      is_subscribers_sort: false,
      is_best_sort: false,
      is_favorit_sort: false
    };
  },

  computed: {
    ...mapState('page', ['readyMadePortfolioList', 'userInfo', 'activeMarket']),

    active_market() {
      /* all or any name market */
      return this.activeMarket;
    },

    ready_made_portfolio_list: {
      // """return best Reade Made Portfolio from store"""
      get() {
        if (this.active_market.market_title == 'all')
          return this.readyMadePortfolioList;
        let rdm = [];
        for (let item of this.readyMadePortfolioList) {
          if (item.market.market_title === this.active_market.market_title) {
            rdm.push(item);
          }
        }
        return rdm;
      }
    },

    puplication_date_day() {
      return Date.now() / 1000 - 86400;
    },

    puplication_date_month() {
      return Date.now() / 1000 - 2629743;
    },

    puplication_date_year() {
      return Date.now() / 1000 - 31556926;
    },

    showFavorit() {
      let fav = [];

      if (this.is_favorit_sort) {
        for (let item of this.ready_made_portfolio_list) {
          if (item.is_favorites) {
            fav.push(item);
          }
        }
        return fav;
      } else {
        return this.ready_made_portfolio_list;
      }
    },

    get_portfolio_list() {
      let buff = [];

      if (this.showFavorit.length === 0) {
        return buff;
      }

      switch (Number(this.show_portfolio_type)) {
        case 0:
          return this.showFavorit;

        case 1:
          for (let item of this.showFavorit) {
            if (item.publication_date >= this.puplication_date_day) {
              buff.push(item);
            }
          }
          return buff;

        case 2:
          for (let item of this.showFavorit) {
            if (item.publication_date >= this.puplication_date_month) {
              buff.push(item);
            }
          }
          return buff;

        case 3:
          for (let item of this.showFavorit) {
            if (item.publication_date >= this.puplication_date_year) {
              buff.push(item);
            }
          }
          return buff;
      }
    },

    listSorted() {
      // чет такое себе говнище
      function compare(a, b) {
        if (a.subscribers > b.subscribers) return -1;
        if (a.subscribers < b.subscribers) return 1;
        return 0;
      }
      function compare_time_day(a, b) {
        if (Number(a.statistics.day) > Number(b.statistics.day)) return -1;
        if (Number(a.statistics.day) < Number(b.statistics.day)) return 1;
        return 0;
      }
      function compare_time_month(a, b) {
        if (Number(a.statistics.month) > Number(b.statistics.month)) return -1;
        if (Number(a.statistics.month) < Number(b.statistics.month)) return 1;
        return 0;
      }
      function compare_time_year(a, b) {
        if (Number(a.statistics.year) > Number(b.statistics.year)) return -1;
        if (Number(a.statistics.year) < Number(b.statistics.year)) return 1;
        return 0;
      }

      if (this.is_subscribers_sort) {
        return this.get_portfolio_list.slice().sort(compare);
      }

      if (this.is_best_sort) {
        switch (Number(this.show_portfolio_type)) {
          case 0:
            return this.get_portfolio_list.slice().sort(compare_time_year);
          case 1:
            return this.get_portfolio_list.slice().sort(compare_time_day);
          case 2:
            return this.get_portfolio_list.slice().sort(compare_time_month);
          case 3:
            return this.get_portfolio_list.slice().sort(compare_time_year);
        }
      } else return this.get_portfolio_list;
    },

    status_account() {
      // """return status account"""
      return this.userInfo.status_account;
    }
  },

  mounted() {
    // if (!this.$cookies.get('secret_token')) {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    this.getReadyMadePortfel();
    // }
  },

  methods: {
    ...mapMutations('page', ['setPopup']),

    ...mapActions('page', ['getReadyMadePortfel']),

    clickCheckBoxBest(is_best_sort) {
      if (is_best_sort) this.is_subscribers_sort = false;
    },

    clickCheckBoxSubs(is_subscribers_sort) {
      if (is_subscribers_sort) this.is_best_sort = false;
    }
  }
};
</script>

<template>
  <div class="ready-made">
    <BaseContainer :single="true">
      <div class="ready-made__headline-title">
        <BaseHeadline 
          title="Ready-made" 
          class="ready-made__headline">
          <div class="ready-made__filter">
            <div class="ready-made__filter-items">
              <div
                class="ready-made__favorites"
                @click = "is_favorit_sort = !is_favorit_sort, showFavorit"
              >
                <StarIcon
                  :class="{ 'ready-made__star-icon-favorit' : is_favorit_sort }" 
                  class="ready-made__star-icon" 
                />
                Selected
              </div>

              <BaseCheckbox 
                :is_active="is_best_sort"
                v-model="is_best_sort"
                class="ready-made__chekbox"
                @click.native = "clickCheckBoxBest(is_best_sort)">
                Best
              </BaseCheckbox>

              <BaseCheckbox
                :is_active="is_subscribers_sort"
                v-model="is_subscribers_sort"
                class="ready-made__chekbox"
                @click.native = "clickCheckBoxSubs(is_subscribers_sort)">
                
                Subscribers
              </BaseCheckbox>
            </div>

            <BaseSwitch
              :items="crons_mask_for_filter_grafs"
              :active="show_portfolio_type"
              v-model="show_portfolio_type"
              class="ready-made__time-switch"
            />

            <BaseButton
              type="secondary"
              class="ready-made-intro__button"
              @click.native="setPopup('add-to-ready-made-popup')"
            >
              ADD YOUR PORTFOLIO
            </BaseButton>
          </div>
        </BaseHeadline>
      </div>

      <div class="ready-made__cards">
        <ReadyMadeIntro 
          v-if ="active_market.market_title != 'all'"
          class="ready-made__intro ready-made__card" />
        <ReadyMadeCard
          v-for="(item, index) in listSorted"
          :key="index"
          :id_portfolio="item.id_portfolio"
          :id_rm_portfolio="item.id_rm_portfolio"
          :subscribers="item.subscribers"
          :title="item.name"
          :star="item.is_favorites"
          :text="item.description"
          :day="item.statistics.day"
          :mon="item.statistics.month"
          :year="item.statistics.year"
          :link="item.id"
          :currency="item.market.market_title"
          :marketid="item.market.market_id"
          :coins="item.first_five_coin"
          :statusaccount="status_account"
          class="ready-made__card"
        />
      </div>
    </BaseContainer>
    <AddToReadyMadePopup class="ready-made__add-to-ready-made-popup" />
  </div>
</template>

<style lang="scss" scoped>
.ready-made__headline-title {
  @include ifmobile {
    background: $purple;
    text-align: center;
    color: $white;
  }
}
.ready-made-intro__button {
  display: none;
  @include ifmobile {
    display: block;
    margin: 0 auto;
    margin-top: em(30px);
  }
}
.ready-made {
  &__headline {
    @include ifdesktop {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    @include ifmobile {
      padding-bottom: 0;
    }
  }

  &__filter {
    @include ifdesktop {
      display: flex;
      align-items: center;
    }
    @include ifmobile {
      background: $white;
      color: $black;
      margin-top: 1em;
      padding: em(40px) 0;
      text-align: center;
    }
    .ready-made__filter-items {
      width: 100%;
      display: flex;
      justify-content: space-around;
    }
  }

  &__favorites {
    display: flex;
    margin-right: em(30px);
    cursor: pointer;
    @include ifmobile {
      display: inline-flex;
      margin-right: 0;
    }
  }

  &__chekbox {
    margin-right: em(30px);
    @include ifmobile {
      margin-right: 0;
    }
  }

  &__time-switch {
    @include ifdesktop {
      margin-left: em(30px);
    }
    @include ifmobile {
      background: $white;
      margin-left: 0;
      margin-top: em(20px);
      padding: em(15px) 0;
      justify-content: center;
    }
  }
  &__intro {
    @include ifmobile {
      display: none;
    }
  }

  &__cards {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @include ifmobile {
      padding: 0 em(10px) em(30px);
    }
  }

  &__card {
    margin: em(5px) 0;
  }

  &__banner {
    width: 100%;
    /*height: em(100px);*/
    margin: em(15px) 0;
  }

  &__star-icon {
    width: em(24px);
    height: em(23px);
    fill: $grey;
    margin-right: em(10px);
  }
  &__star-icon-favorit {
    fill: $yellow;
  }
}
</style>
