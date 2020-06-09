<script>
/*_id.vue*/
import { mapMutations, mapActions, mapState } from 'vuex';
import DashboardGraph from '~/components/content/dashboard/DashboardGraph';
import StarIcon from '~/components/icons/StarIcon';
import ReadyMadePortfolioItem from '~/components/content/ready-made/ReadyMadePortfolioItem';
import ClearCopyPopup from '~/components/content/ready-made/ClearCopyPopup';

export default {
  components: {
    DashboardGraph,
    StarIcon,
    ReadyMadePortfolioItem,
    ClearCopyPopup
  },

  data() {
    return {
      index: '1',
      crons_mask_for_filter_grafs: ['ALL TIME', 'DAY', 'MONTH', 'YEAR'],
      switchactive: 0,
      toolsVisible: false,
      toolsVisible2: false,
      isCapitalicationsInBtc: false
    };
  },

  computed: {
    ...mapState('page', [
      'optionsRMPortfolio',
      'dataRMPortfelGrafForAllTime',
      'dataRMPortfelGrafForDay',
      'dataRMPortfelGrafForMonth',
      'dataRMPortfelGrafForYear',
      'readyMadePortfolioList',
      'readyMadePortfolioId',
      'readyMadePortfolioShortData',
      'subscribers',
      'favorite',
      'portfelCoinList',
      'descriptions',
      'shortStatisticsData',
      'idRmPortfolio',
      'dataGraphRMPortfolio',
      'marketIndex',
      'rmPortfelCoinList'
    ]),

    getOptionsRMPortfolio() {
      return this.optionsRMPortfolio;
    },

    get_time_stamp_data() {
      return this.dataGraphRMPortfolio[Number(this.index)];
    },

    return_persent() {
      return this.get_time_stamp_data.return_persent;
    },

    max_pros_perc() {
      return this.get_time_stamp_data.max_pros_perc;
    },

    data_graf() {
      let params = {
        pdate: this.get_time_stamp_data.values.pdate,
        series: [
          {
            name: 'Capitalizations(%)',
            data: this.get_time_stamp_data.values.value
          }
        ]
      };

      // if (this.isCapitalicationsInBtc) {
      //   params.series = [
      //     {
      //       name: 'Capitalizations in BTC',
      //       data: this.get_time_stamp_data.btc_values.value
      //     }
      //   ];
      // } else {
      // params.series = [
      //   {
      //     name: 'Capitalizations in USD',
      //     data: this.get_time_stamp_data.values.value
      //   }
      // ];
      // }
      return params;
    },

    color_return_persent() {
      if (this.return_persent >= 0) {
        return '#81d540';
      } else {
        return '#e92a00';
      }
    },

    color_max_pros_perc() {
      if (this.max_pros_perc >= 0) {
        return '#81d540';
      } else {
        return '#e92a00';
      }
    },

    color_get_market_index() {
      if (this.get_market_index < 0) {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    },

    title_index_market() {
      switch (this.index) {
        case '0':
          return 'ALL TIME';
        case '1':
          return '24H';
        case '2':
          return 'MONTH';
        case '3':
          return 'YEAR';
        default:
          this.$toast
            .error('Error timestamp index (' + this.index + ')')
            .goAway(1500);
          return 'NONE';
      }
    },

    get_rm_portfel_coin_list() {
      // """return portfel coin list"""
      return this.rmPortfelCoinList;
    },

    get_market_index() {
      switch (this.index) {
        case '0':
          return this.marketIndex.year;
        case '1':
          return this.marketIndex.day;
        case '2':
          return this.marketIndex.month;
        case '3':
          return this.marketIndex.year;
        default:
          this.$toast
            .error('Error timestamp index (' + this.index + ')')
            .goAway(1500);
          return 0;
      }
    },

    is_owner() {
      return false;
    },

    get_favorite: {
      get() {
        return this.favorite;
      },
      set(value) {
        this.setFavorite(value);
      }
    },

    get_subscribers() {
      return this.subscribers;
    },

    get_descriptions() {
      return this.descriptions;
    },

    id_portfel() {
      return this.$route.params.id;
    },

    id_rm_portfolio() {
      return this.idRmPortfolio;
    },

    rm_portfolio_name() {
      for (let rm_portfolio of this.readyMadePortfolioList) {
        if (rm_portfolio.id_portfolio == this.id_portfel) {
          return rm_portfolio.name;
        }
      }
      return '';
    }
  },

  mounted() {
    this.getSubscribers(this.id_portfel);

    this.makeRequestGetMarketIndex();

    this.getRMPortfels(this.id_portfel);

    this.getRMPortfelsStatistik(this.id_portfel);

    let params = {
      params: {
        hidden_crons_mask: 1,
        set_crons_mask_button: ''
      },
      id_portfel: this.id_portfel
    };

    this.makeRequesPostTimeStampRMPortfelData(params);
  },

  methods: {
    ...mapActions('page', [
      'getSubscribers',
      'makeRequestGetMarketIndex',
      'makeRequesPostTimeStampRMPortfelData',
      'getRMPortfelsStatistik',
      'getRMPortfels',
      'makeRequestSetFavoritePortfel'
    ]),

    ...mapMutations('page', [
      'setPopup',
      'setRMPortfelDataGrafForAllTime',
      'setRMPortfelDataGrafForDay',
      'setRMPortfelDataGrafForMonth',
      'setRMPortfelDataGrafForYear',
      'setReadyMadePortfolioId',
      'setSubscribers',
      'setDescriptions',
      'setFavorite',
      'setIdRmPortfolio',
      'setMarketIndex',
      'setReadyMadePortfolioShortData',
      'setDataGraphRMPortfolio',
      'setRMPortfelCoinList',
      'changeTimeStamp'
    ]),

    // setChangeTimestamp() {
    // let temp_params = {
    //   params: {
    //     index: this.index,
    //     hidden_crons_mask: this.index,
    //     set_crons_mask_button: ''
    //   },
    //   id_portfel: this.id_portfel
    // };
    // this.changeTimeStamp(temp_params);
    // },

    changeFavoritePortfel() {
      this.makeRequestSetFavoritePortfel({
        id_portfels: this.id_rm_portfolio
      });
    }
  }
};
</script>

<template>
  <div class="ready-made-card">
    <BaseContainer class="ready-made-card__container">
      <div class="ready-made-card__content">
        <div class="ready-made-card__top-container">
          <BaseHeadline
            v-if="is_owner"
            :title="rm_portfolio_name"
            class="ready-made-card__headline"
          >
            <div class="ready-made-card__headline-subtitle">
              Greetings! You have created a wonderful portfolio. We will ask you
              a set of questions to get you started. {{ get_descriptions }}
            </div>
          </BaseHeadline>

          <BaseHeadline
            v-else
            :title="rm_portfolio_name"
            class="ready-made-card__headline"
          >
            <div class="ready-made-card__headline-subtitle">
              {{ get_descriptions }}
            </div>
          </BaseHeadline>

          <div class="ready-made-card__headline-aside">
            <div
              class="ready-made-card__favorites"
              @click="changeFavoritePortfel"
            >
              <StarIcon
                :class="{ 'ready-made-card__star-icon_added': get_favorite }"
                class="ready-made-card__star-icon"
              />
              <div
                v-if="!get_favorite"
                class="ready-made-card__favorites-title"
              >
                Select
              </div>
              <div 
                v-if="get_favorite" 
                class="ready-made-card__favorites-title">
                Selected
              </div>
            </div>
            <div class="ready-made-card__subscribers">
              <span 
                class="ready-made-card__subscribers-title"
              >SUBSCRIBERS</span
              >
              <span class="ready-made-card__subscribers-count">{{
                get_subscribers
              }}</span>
            </div>
          </div>
        </div>
        <BaseButton
          type="primary"
          class="ready-made-card__copy-button ready-made-card__copy-button-mobile"
          @click.native="setPopup('clear-copy-popup')"
        >
          COPY PORTFOLIO
        </BaseButton>
        <BaseSwitch
          :items="crons_mask_for_filter_grafs"
          :active="switchactive"
          :index="index"
          v-model="index"
          class="ready-made-card__time-switch ready-made-card__time-switch-mobile"
        />
        <DashboardGraph 
          :series="data_graf.series"
          :timestamp_graph="data_graf.pdate"
          class="ready-made-card__graph" />
      </div>

      <BaseAside>
        <div
          class="ready-made-card__top-container ready-made-card__top-container_aside"
        >
          <BaseButton
            type="primary"
            class="ready-made-card__copy-button ready-made-card__copy-button-desktop"
            @click.native="setPopup('clear-copy-popup')"
          >
            COPY PORTFOLIO
          </BaseButton>
          <BaseSwitch
            :items="crons_mask_for_filter_grafs"
            :active="switchactive"
            :index="index"
            v-model="index"
            class="ready-made-card__time-switch ready-made-card__time-switch-desktop"
          />
          <!--@click.native="setChangeTimestamp"-->
        </div>
        <div 
          :class="{ is_visible: toolsVisible }" 
          class="dashboard-tools">
          <div
            class="dashboard-tools__title"
            @click="toolsVisible = !toolsVisible"
          >
            PORTFOLIO TOOLS
            <svg 
              class="dashboard-tools__arrow-list" 
              viewBox="0 0 8 6">
              <path
                d="M0.9375 0.71875L4 3.78125L7.0625 0.71875L8 1.65625L4 5.65625L0 1.65625L0.9375 0.71875Z"
              />
            </svg>
          </div>
          <div class="dashboard-tools__items">
            <div class="ready-made-card-item ready-made-card__item">
              <div
                :style="{ color: color_return_persent }"
                class="ready-made-card-item__value"
              >
                {{ return_persent }}%
              </div>
              <div class="ready-made-card-item__text">
                RETURN %
              </div>
            </div>

            <div class="ready-made-card-item ready-made-card__item">
              <div
                :style="{ color: color_max_pros_perc}"
                class="ready-made-card-item__value"
              >
                {{ max_pros_perc }}%
              </div>
              <div class="ready-made-card-item__text">
                DRAWDOWN
              </div>
            </div>

            <div class="ready-made-card-item ready-made-card__item">
              <div 
                :style="{ color: color_get_market_index }" 
                class="ready-made-card-item__value">
                {{ get_market_index }}%
              </div>
              <div class="ready-made-card-item__text">
                MARKET INDEX {{ title_index_market }}
              </div>
            </div>
          </div>
        </div>

        <div
          :class="{ is_visible2: toolsVisible2 }"
          class="dashboard-tools aside-mobile"
        >
          <div
            class="dashboard-tools__title"
            @click="toolsVisible2 = !toolsVisible2"
          >
            STATS HOLDER
            <svg 
              class="dashboard-tools__arrow-list" 
              viewBox="0 0 8 6">
              <path
                d="M0.9375 0.71875L4 3.78125L7.0625 0.71875L8 1.65625L4 5.65625L0 1.65625L0.9375 0.71875Z"
              />
            </svg>
          </div>
          <div class="dashboard-tools__items">
            <div 
              v-show = "getOptionsRMPortfolio.rebalance_count"
              class="ready-made-card-item ready-made-card__item">
              <div class="ready-made-card-item__value">
                {{ getOptionsRMPortfolio.rebalance_count }}
              </div>
              <div class="ready-made-card-item__text">
                REBALANCING
              </div>
              <div
                class="ready-made-card-item__icon ready-made-card-item__icon_1"
              >
                <svg viewBox="0 0 18 21">
                  <path
                    d="M11.0156 14.0156V15.9844H3.98438V14.0156H11.0156ZM15.9844 18.9844V8.01562H2.01562V18.9844H15.9844ZM15.9844 3C16.5156 3 16.9844 3.20312 17.3906 3.60938C17.7969 4.01563 18 4.48438 18 5.01562V18.9844C18 19.5156 17.7969 19.9844 17.3906 20.3906C16.9844 20.7969 16.5156 21 15.9844 21H2.01562C1.45312 21 0.96875 20.7969 0.5625 20.3906C0.1875 19.9844 0 19.5156 0 18.9844V5.01562C0 4.48438 0.1875 4.01563 0.5625 3.60938C0.96875 3.20312 1.45312 3 2.01562 3H3V0.984375H5.01562V3H12.9844V0.984375H15V3H15.9844ZM14.0156 9.98438V12H3.98438V9.98438H14.0156Z"
                  />
                </svg>
              </div>
            </div>

            <div 
              v-show = "getOptionsRMPortfolio.cron"
              class="ready-made-card-item ready-made-card__item">
              <div class="ready-made-card-item__value">
                {{ getOptionsRMPortfolio.cron }} {{ getOptionsRMPortfolio.period }}
              </div>
              <div class="ready-made-card-item__text">
                REBALANCING PERIOD
              </div>
              <div
                class="ready-made-card-item__icon ready-made-card-item__icon_2"
              >
                <svg viewBox="0 0 20 20">
                  <path
                    d="M10.5156 4.98438V10.2344L15.0156 12.9062L14.2656 14.1719L9.01562 10.9844V4.98438H10.5156ZM4.32812 15.6719C5.92188 17.2344 7.8125 18.0156 10 18.0156C12.1875 18.0156 14.0625 17.2344 15.625 15.6719C17.2188 14.0781 18.0156 12.1875 18.0156 10C18.0156 7.8125 17.2188 5.9375 15.625 4.375C14.0625 2.78125 12.1875 1.98438 10 1.98438C7.8125 1.98438 5.92188 2.78125 4.32812 4.375C2.76562 5.9375 1.98438 7.8125 1.98438 10C1.98438 12.1875 2.76562 14.0781 4.32812 15.6719ZM2.92188 2.96875C4.89062 1 7.25 0.015625 10 0.015625C12.75 0.015625 15.0938 1 17.0312 2.96875C19 4.90625 19.9844 7.25 19.9844 10C19.9844 12.75 19 15.1094 17.0312 17.0781C15.0938 19.0156 12.75 19.9844 10 19.9844C7.25 19.9844 4.89062 19.0156 2.92188 17.0781C0.984375 15.1094 0.015625 12.75 0.015625 10C0.015625 7.25 0.984375 4.90625 2.92188 2.96875Z"
                  />
                </svg>
              </div>
            </div>
            
            <div 
              v-show = "getOptionsRMPortfolio.porog"
              class="ready-made-card-item ready-made-card__item">
              <div class="ready-made-card-item__value">
                {{ getOptionsRMPortfolio.porog }} %
              </div>
              <div class="ready-made-card-item__text">
                REBALANCING PERIOD
              </div>
              <div
                class="ready-made-card-item__icon ready-made-card-item__icon_2"
              >
                <svg viewBox="0 0 20 20">
                  <path
                    d="M10.5156 4.98438V10.2344L15.0156 12.9062L14.2656 14.1719L9.01562 10.9844V4.98438H10.5156ZM4.32812 15.6719C5.92188 17.2344 7.8125 18.0156 10 18.0156C12.1875 18.0156 14.0625 17.2344 15.625 15.6719C17.2188 14.0781 18.0156 12.1875 18.0156 10C18.0156 7.8125 17.2188 5.9375 15.625 4.375C14.0625 2.78125 12.1875 1.98438 10 1.98438C7.8125 1.98438 5.92188 2.78125 4.32812 4.375C2.76562 5.9375 1.98438 7.8125 1.98438 10C1.98438 12.1875 2.76562 14.0781 4.32812 15.6719ZM2.92188 2.96875C4.89062 1 7.25 0.015625 10 0.015625C12.75 0.015625 15.0938 1 17.0312 2.96875C19 4.90625 19.9844 7.25 19.9844 10C19.9844 12.75 19 15.1094 17.0312 17.0781C15.0938 19.0156 12.75 19.9844 10 19.9844C7.25 19.9844 4.89062 19.0156 2.92188 17.0781C0.984375 15.1094 0.015625 12.75 0.015625 10C0.015625 7.25 0.984375 4.90625 2.92188 2.96875Z"
                  />
                </svg>
              </div>
            </div>

            <div 
              v-show = "getOptionsRMPortfolio.profitable_days"
              class="ready-made-card-item ready-made-card__item">
              <div class="ready-made-card-item__value">
                {{ getOptionsRMPortfolio.profitable_days }}
              </div>
              <div class="ready-made-card-item__text">
                PROFITABLE DAYS
              </div>
              <div
                class="ready-made-card-item__icon ready-made-card-item__icon_3"
              >
                <svg viewBox="0 0 20 14">
                  <path
                    d="M1.51562 13.4688L0.015625 11.9688L7.51562 4.46875L11.5 8.5L18.5781 0.53125L19.9844 1.9375L11.5 11.5L7.51562 7.46875L1.51562 13.4688Z"
                  />
                </svg>
              </div>
            </div>

            <div 
              v-show = "getOptionsRMPortfolio.correlations"
              class="ready-made-card-item ready-made-card__item">
              <div class="ready-made-card-item__value">
                {{ getOptionsRMPortfolio.correlations }}
              </div>
              <div class="ready-made-card-item__text">
                PORTFOLIO CORRELATION
              </div>
              <div
                class="ready-made-card-item__icon ready-made-card-item__icon_3"
              >
                <svg viewBox="0 0 20 14">
                  <path
                    d="M1.51562 13.4688L0.015625 11.9688L7.51562 4.46875L11.5 8.5L18.5781 0.53125L19.9844 1.9375L11.5 11.5L7.51562 7.46875L1.51562 13.4688Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </BaseAside>
    </BaseContainer>

    <BaseContainer>
      <div class="ready-made-card__content">
        <BaseTitle 
          type="h3" 
          class="ready-made-card__subtitle">
          PORTFOLIO
        </BaseTitle>

        <BaseScrollBlock class="ready-made-card__scroll-block">
          <div class="ready-made-card__average">
            <ReadyMadePortfolioItem
              v-for="(item, index) in get_rm_portfel_coin_list"
              :key="index"
              :title="item.full_name"
              :id_coin="item.id_coin"
              :invested="item.percent"
              :pl="item.change"
            />
          </div>
        </BaseScrollBlock>
      </div>

      <BaseAside class="aside-desktop">
        <BaseTitle 
          type="h3" 
          class="ready-made-card__subtitle">
          STATS HOLDER
        </BaseTitle>

        <div 
          v-show = "getOptionsRMPortfolio.rebalance_count"
          class="ready-made-card-item ready-made-card__item">
          <div class="ready-made-card-item__value">
            {{ getOptionsRMPortfolio.rebalance_count }}
          </div>
          <div class="ready-made-card-item__text">
            REBALANCES
          </div>
          <div class="ready-made-card-item__icon ready-made-card-item__icon_1">
            <svg viewBox="0 0 18 21">
              <path
                d="M11.0156 14.0156V15.9844H3.98438V14.0156H11.0156ZM15.9844 18.9844V8.01562H2.01562V18.9844H15.9844ZM15.9844 3C16.5156 3 16.9844 3.20312 17.3906 3.60938C17.7969 4.01563 18 4.48438 18 5.01562V18.9844C18 19.5156 17.7969 19.9844 17.3906 20.3906C16.9844 20.7969 16.5156 21 15.9844 21H2.01562C1.45312 21 0.96875 20.7969 0.5625 20.3906C0.1875 19.9844 0 19.5156 0 18.9844V5.01562C0 4.48438 0.1875 4.01563 0.5625 3.60938C0.96875 3.20312 1.45312 3 2.01562 3H3V0.984375H5.01562V3H12.9844V0.984375H15V3H15.9844ZM14.0156 9.98438V12H3.98438V9.98438H14.0156Z"
              />
            </svg>
          </div>
        </div>

        <div 
          v-show = "getOptionsRMPortfolio.cron"
          class="ready-made-card-item ready-made-card__item">
          <div class="ready-made-card-item__value">
            {{ getOptionsRMPortfolio.period }} {{ getOptionsRMPortfolio.cron }}
          </div>
          <div class="ready-made-card-item__text">
            REBALANCING PERIOD
          </div>
          <div class="ready-made-card-item__icon ready-made-card-item__icon_2">
            <svg viewBox="0 0 20 20">
              <path
                d="M10.5156 4.98438V10.2344L15.0156 12.9062L14.2656 14.1719L9.01562 10.9844V4.98438H10.5156ZM4.32812 15.6719C5.92188 17.2344 7.8125 18.0156 10 18.0156C12.1875 18.0156 14.0625 17.2344 15.625 15.6719C17.2188 14.0781 18.0156 12.1875 18.0156 10C18.0156 7.8125 17.2188 5.9375 15.625 4.375C14.0625 2.78125 12.1875 1.98438 10 1.98438C7.8125 1.98438 5.92188 2.78125 4.32812 4.375C2.76562 5.9375 1.98438 7.8125 1.98438 10C1.98438 12.1875 2.76562 14.0781 4.32812 15.6719ZM2.92188 2.96875C4.89062 1 7.25 0.015625 10 0.015625C12.75 0.015625 15.0938 1 17.0312 2.96875C19 4.90625 19.9844 7.25 19.9844 10C19.9844 12.75 19 15.1094 17.0312 17.0781C15.0938 19.0156 12.75 19.9844 10 19.9844C7.25 19.9844 4.89062 19.0156 2.92188 17.0781C0.984375 15.1094 0.015625 12.75 0.015625 10C0.015625 7.25 0.984375 4.90625 2.92188 2.96875Z"
              />
            </svg>
          </div>
        </div>

        <div
          v-show = "getOptionsRMPortfolio.porog"
          class="ready-made-card-item ready-made-card__item">
          <div class="ready-made-card-item__value">
            {{ getOptionsRMPortfolio.porog }} %
          </div>
          <div class="ready-made-card-item__text">
            THRESHOLD REBALANCE
          </div>
          <div class="ready-made-card-item__icon ready-made-card-item__icon_2">
            <svg viewBox="0 0 20 20">
              <path
                d="M10.5156 4.98438V10.2344L15.0156 12.9062L14.2656 14.1719L9.01562 10.9844V4.98438H10.5156ZM4.32812 15.6719C5.92188 17.2344 7.8125 18.0156 10 18.0156C12.1875 18.0156 14.0625 17.2344 15.625 15.6719C17.2188 14.0781 18.0156 12.1875 18.0156 10C18.0156 7.8125 17.2188 5.9375 15.625 4.375C14.0625 2.78125 12.1875 1.98438 10 1.98438C7.8125 1.98438 5.92188 2.78125 4.32812 4.375C2.76562 5.9375 1.98438 7.8125 1.98438 10C1.98438 12.1875 2.76562 14.0781 4.32812 15.6719ZM2.92188 2.96875C4.89062 1 7.25 0.015625 10 0.015625C12.75 0.015625 15.0938 1 17.0312 2.96875C19 4.90625 19.9844 7.25 19.9844 10C19.9844 12.75 19 15.1094 17.0312 17.0781C15.0938 19.0156 12.75 19.9844 10 19.9844C7.25 19.9844 4.89062 19.0156 2.92188 17.0781C0.984375 15.1094 0.015625 12.75 0.015625 10C0.015625 7.25 0.984375 4.90625 2.92188 2.96875Z"
              />
            </svg>
          </div>
        </div>

        <div 
          v-show = "getOptionsRMPortfolio.profitable_days"
          class="ready-made-card-item ready-made-card__item">
          <div class="ready-made-card-item__value">
            {{ getOptionsRMPortfolio.profitable_days }} %
          </div>
          <div class="ready-made-card-item__text">
            PROFITABLE DAYS
          </div>
          <div class="ready-made-card-item__icon ready-made-card-item__icon_3">
            <svg viewBox="0 0 20 14">
              <path
                d="M1.51562 13.4688L0.015625 11.9688L7.51562 4.46875L11.5 8.5L18.5781 0.53125L19.9844 1.9375L11.5 11.5L7.51562 7.46875L1.51562 13.4688Z"
              />
            </svg>
          </div>
        </div>

        <div 
          v-show = "getOptionsRMPortfolio.correlations"
          class="ready-made-card-item ready-made-card__item">
          <div class="ready-made-card-item__value">
            {{ getOptionsRMPortfolio.correlations }}
          </div>
          <div class="ready-made-card-item__text">
            PORTFOLIO CORRELATION
          </div>
          <div class="ready-made-card-item__icon ready-made-card-item__icon_3">
            <svg viewBox="0 0 20 14">
              <path
                d="M1.51562 13.4688L0.015625 11.9688L7.51562 4.46875L11.5 8.5L18.5781 0.53125L19.9844 1.9375L11.5 11.5L7.51562 7.46875L1.51562 13.4688Z"
              />
            </svg>
          </div>
        </div>
      </BaseAside>
    </BaseContainer>
    <ClearCopyPopup
      :id_portfel="id_portfel"
      class="ready-made-card-item__clear-copy-popup"
    />
  </div>
</template>

<style lang="scss" scoped>
.ready-made-card {
  &__content {
    @include ifdesktop {
      width: em(720px);
    }
  }

  &__headline {
    @include ifmobile {
      text-align: center;
      padding-top: em(20px);
    }
    &-subtitle {
      @include ifmobile {
        text-align: left;
        padding: 0px em(20px);
        margin-top: em(20px);
        margin-bottom: em(20px);
      }
    }
  }

  &__headline-aside {
    position: absolute;
    right: 0;
    top: em(20px);
    display: flex;
    align-items: center;
    @include ifmobile {
      position: static;
      width: 100%;
      justify-content: center;
    }
  }

  &__favorites {
    display: flex;
    cursor: pointer;
    margin-right: em(30px);
  }

  &__star-icon {
    fill: $grey;
    width: em(22px);
    height: em(22px);
    margin-right: em(8px);

    &_added {
      fill: $yellow;
    }
  }

  &__subscribers {
    $size: 12px;
    font-size: em($size);
    &-title {
      color: $grey;
      font-weight: bold;
    }
  }

  &__top-container {
    position: relative;
    height: em(140px);
    margin-bottom: em(25px);
    @include ifmobile {
      height: 100%;
      margin-bottom: em(50px);
    }

    &_aside {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
    }
  }

  &__graph {
    @include ifmobile {
      margin: 0 em(2px);
    }
  }

  &__time-switch {
    $size: 13.3px;
    font-size: em($size);
    @include ifmobile {
      /*display: none;*/
    }
  }

  &__container {
    padding-bottom: 0;
  }

  &__item {
    margin-bottom: em(6px);
  }

  &__scroll-block {
    /*height: em(760px);*/
    max-width: em(620px);
  }

  &__average {
    width: em(560px);
    @include ifmobile {
      width: 100%;
    }
  }

  &__subtitle {
    margin-bottom: em(30px);
  }
}

.ready-made-card-item {
  position: relative;
  box-sizing: border-box;
  height: em(103px);
  border: 1px solid $grey;
  padding: em(10px) em(30px);
  @include ifmobile {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    border: none;
    border-bottom: 1px solid #dedede;
    height: em(76px);
    padding: 0.9375em 0;
    margin-bottom: 0.9375em;
  }

  &__value {
    $size: 26px;
    font-size: em($size);
    @include ifmobile {
      padding-right: em(30px);
    }

    &_green {
      color: $green;
    }

    &_red {
      color: $red;
    }
  }

  &__icon {
    position: absolute;
    fill: $grey;
    top: em(12px);
    right: em(16px);
    @include ifmobile {
      top: em(24px);
    }

    &_1 {
      width: em(18px);
      height: em(21px);
    }
    &_2 {
      width: em(20px);
      height: em(20px);
    }
    &_3 {
      width: em(20px);
      height: em(14px);
    }
  }
  &__text {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
  }
}

.ready-made-card__copy-button-mobile {
  display: none;
  @include ifmobile {
    display: block;
    margin: 0 auto;
    margin-bottom: em(80px);
  }
}
.ready-made-card__copy-button-desktop {
  @include ifmobile {
    display: none;
  }
}
.ready-made-card__time-switch-mobile {
  display: none;
  @include ifmobile {
    display: block;
    text-align: center;
    margin-bottom: em(50px);
  }
}
.ready-made-card__time-switch-desktop {
  @include ifmobile {
    display: none;
  }
}

.ready-made-card__subtitle {
  @include ifmobile {
    $size: 14px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
    text-align: center;
  }
}
.dashboard-tools {
  display: flex;
  flex-direction: column;
  height: 100%;
  @include ifmobile {
    display: block;
    padding: em(20px) em(30px) em(20px);
  }

  &__items {
    @include ifmobile {
      overflow: hidden;
      max-height: 0;
      transition: max-height $speed linear;
    }
    @include ifparent('.is_visible') {
      min-height: em(280px);
    }
    @include ifparent('.is_visible2') {
      min-height: em(380px);
    }
  }
  &__title {
    $size: 14px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    @include ifdesktop {
      display: none;
    }
  }
  &__arrow-list {
    width: em(12px);
    height: em(9px);
    fill: $grey;
    position: absolute;
    right: 17px;
    top: 5px;

    @include ifdesktop {
      display: none;
    }

    @include ifparent('.is_visible') {
      transform: scaleY(-1);
    }
    @include ifparent('.is_visible2') {
      transform: scaleY(-1);
    }
  }
}
.aside-mobile {
  display: none;
  @include ifmobile {
    display: block;
  }
}
.aside-desktop {
  @include ifmobile {
    display: none;
  }
}
</style>
