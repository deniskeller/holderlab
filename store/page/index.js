import mutations from './mutations';
import actions from './actions';

const store = {
  // namespaced: true, //мб раскоментить
  state() {
    return {
      auth: false, // новая, для авторизации
      is_click_subs:false,
      is_hiddend_complete_order_window:false,
      tariff_setting_plan: 'holder',
      tariff_setting_cycles: 'year',
      
      email_log: null,
      pass_log: null,
      router_url:null,
      pp_url: null,
      url_data: {
        'url':null,
        'invoice':null,
        'business':null,
        'amount':null,
        'currency_code':null,
        'item_name':null,
      },
      activeHistoryMessage: null,
      landingData: null,
      listOrderActiveMessages: null,
      timer: 0,
      count_dont_viewed: 0,
      qr_code: null,
      secret_token: null,
      secretToken: null,
      confirm_code: null,
      isMenuVisible: false,
      isFullPreload: false,
      popup: null,
      addAsset: null,
      addAsset2: null,
      removeAsset: 0,
      balance: null,
      porfels: null,
      cronsMaskForFilterGrafs: null,
      short_rm_portfolio_list: {
        hight_risk: [],
        medium_risk: [],
        low_risk: []
      },
      laterMessage: null,
      messagePack: {
        today_mail_stack: null,
        yesterday_mail_stack: null,
        weekly_mail_stack: null,
        mounth_mail_stack: null
      },
      dataGraphRMPortfolio: {
        0: {
          values: {
            pdate: [],
            value: []
          },
          btc_values: {
            pdate: [],
            value: []
          },
          return_persent: null,
          max_pros_perc: null
        },
        1: {
          values: {
            pdate: [],
            value: []
          },
          btc_values: {
            pdate: [],
            value: []
          },
          return_persent: null,
          max_pros_perc: null
        },
        2: {
          values: {
            pdate: [],
            value: []
          },
          btc_values: {
            pdate: [],
            value: []
          },
          return_persent: null,
          max_pros_perc: null
        },
        3: {
          values: {
            pdate: [],
            value: []
          },
          btc_values: {
            pdate: [],
            value: []
          },
          return_persent: null,
          max_pros_perc: null
        }
      },
      optionsRMPortfolio: {
        porog: null,
        cron: null,
        period: null,
        rebalance_count: null,
        profitable_days: null,
        correlations: null
      },
      optionsForDashboard: {
        threshold: null,
        time: null,
        interval: null
      },
      activeEmailReg:null,
      showButtomConnect: true,
      // header
      activePortfelCoinList: [],
      portfolioInformations: {
        market: null,
        is_trailing_stop: false,
        trailing_stop_coefficient: 0,
        short_statistics_data: {
          total_return: '0',
          total_return_in_btc: '0',
          portfolio_value: '0',
          max_drawndawn: '0',
          portfolio_value_in_btc: '0'
        }
      },
      userMarketList: [],

      // dashboard
      userMarketsBalanceList: ['0'],
      userMarketsList: ['All'],

      dataGrafForAllTime: {
        statistics: {
          return_persent: '0',
          return_usd: '0',
          return_btc: '0'
        },
        balance_in_bitcoins: {
          pdate: [],
          value: []
        },
        portfolios_data: {
          name: '',
          crons_mask_id: '1',
          market: '',
          capitalization: '0',
          profit_usd: '0',
          profit_persent: '0',
          max_pros_usd: '0',
          id: '0',
          values: {
            pdate: [],
            value: []
          }
        }
      },
      dataGrafForDay: {
        statistics: {
          return_persent: '0',
          return_usd: '0',
          return_btc: '0'
        },
        balance_in_bitcoins: {
          pdate: [],
          value: []
        },
        portfolios_data: {
          name: '',
          crons_mask_id: '1',
          market: '',
          capitalization: '0',
          profit_usd: '0',
          profit_persent: '0',
          max_pros_usd: '0',
          id: '0',
          values: {
            pdate: [],
            value: []
          }
        }
      },
      dataGrafForMonth: {
        statistics: {
          return_persent: '0',
          return_usd: '0',
          return_btc: '0'
        },
        balance_in_bitcoins: {
          pdate: [],
          value: []
        },
        portfolios_data: {
          name: '',
          crons_mask_id: '1',
          market: '',
          capitalization: '0',
          profit_usd: '0',
          profit_persent: '0',
          max_pros_usd: '0',
          id: '0',
          values: {
            pdate: [],
            value: []
          }
        }
      },
      dataGrafForYear: {
        statistics: {
          return_persent: '0',
          return_usd: '0',
          return_btc: '0'
        },
        balance_in_bitcoins: {
          pdate: [],
          value: []
        },
        portfolios_data: {
          name: '',
          crons_mask_id: '1',
          market: '',
          capitalization: '0',
          profit_usd: '0',
          profit_persent: '0',
          max_pros_usd: '0',
          id: '0',
          values: {
            pdate: [],
            value: []
          }
        }
      },

      selectedCoinList: [], //список монет для их редактирования
      rebalanceCoinList: [], //список монет для страницы ребаланс
      whiteListForMarkets: {
        /*Белый список монет сортированный по маркетам*/
        is_uploaded: false,
        data: {
          Binance: [],
          Bittrex: [],
          Kucoin: [],
          Poloniex: [],
          Coinbasepro: [],
          Okex: [],
          Kraken: [],
          HuobiGlobal: [],
          Bibox: [],
          Bitfinex: [],
          HitBTC: []
        }
      },

      dataRMPortfelGrafForAllTime: {
        graf: [],
        return_persent_time_stamp: 0,
        return_drawdown_time_stamp: 0
      },
      dataRMPortfelGrafForDay: {
        graf: [],
        return_persent_time_stamp: 0,
        return_drawdown_time_stamp: 0
      },
      dataRMPortfelGrafForMonth: {
        graf: [],
        return_persent_time_stamp: 0,
        return_drawdown_time_stamp: 0
      },
      dataRMPortfelGrafForYear: {
        graf: [],
        return_persent_time_stamp: 0,
        return_drawdown_time_stamp: 0
      },

      portfelCoinList: [
        {
          name: '',
          market: {
            market_title: '',
            market_id: '0'
          },
          values: []
        }
      ],
      portfelList: [],
      shortStatisticsData: {
        totalreturn: '0',
        portfoliovalue: '0',
        maxdrawndawn: '0'
      },
      shortPortfolioList: [],
      marketConnectData: {
        key: '',
        secret: '',
        password: ''
      },
      paymantData: null,
      tempSeriesShortEffectiveMargin: [],
      is_show_item_flag_short_effective_margin: false,
      name_portfolio: null,
      bestReadeMadePortfolio: null,

      isFlagPortfolioUpdate: false,

      newPortfolio: [],

      transactions: [],

      readyMadePortfolioList: [],

      paymentInfo: {
        balance: '0',
        date_end_vip: null
      },

      companyInfo: {
        name: null,
        vat_number: null,
        country: null,
        address: null,
        city: null,
        postal: null
      },

      referralInfo: {
        invait: 0,
        free_mounth: 0
      },

      userInfo: {
        login: '',
        email: '',
        is_confirmed_email: false,
        status_account: '0',
        is_trial_uses: false,

        referral_code: null,
        date_end_vip: null,
        is_business_account: null,

        address: null,
        city: null,
        postal: null,
        country: null,

        is_ip_verification: false,
        is_2fa_verification: false
      },

      readyMadeInfo: {
        is_owner_portfolio: true,
        is_private: false,
        is_published: false
      },

      activeMarket: {
        market_title: 'all',
        market_id: '0',
        portfel_id: '0',
        balance: null
      },

      idActivePortfolio: 'all',
      readyMadePortfolioId: '0',
      subscribers: '0',
      descriptions: '',
      idRmPortfolio: '0',
      favorite: false,
      readyMadePortfolioShortData: {
        portfel_name: '',
        isDefault: true
      },
      marketIndex: {
        day: { market_index: '0' },
        year: { market_index: '0' },
        month: { market_index: '0' }
      },
      rmPortfelCoinList: [],
      balanceChosenMarket: 0,
      analyzedPortfolios: [], // Список монет при создании нового портфел
      backupAnalyzedPortfolios: [],

      correlationDataForThreeMounth: {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      },

      correlationDataForSixMounth: {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      },
      correlationDataForYear: {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      },
      correlationDataForTwoYear: {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      },
      optimalNewPortfolio: [],
      flagRequest: false,
      efficientFrontierStatisticsData: {
        min_variance_port: {
          returns: null,
          volatility: null,
          sharpe_ratio: null
        },
        sharpe_portfolio: {
          returns: null,
          volatility: null,
          sharpe_ratio: null
        },
        max_variance_port: {
          returns: null,
          volatility: null,
          sharpe_ratio: null
        }
      },
      poolWeightEfficientFrontier: {
        portfel_max_variance_port: [],
        portfel_sharpe_portfolio: [],
        portfel_min_variance_port: []
      },
      bigCorrelationData: {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      },
      bigCorrelationDataForThreeMounth: {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      },

      bigCorrelationDataForSixMounth: {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      },

      bigCorrelationDataForYear: {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      },

      bigCorrelationDataForTwoYear: {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      },

      bigPoolWeightEfficientFrontier: {
        portfel_max_variance_port: [],
        portfel_sharpe_portfolio: [],
        portfel_min_variance_port: []
      },

      bigStatisticDataEfficientFrontier: {
        min_variance_port: {
          returns: null,
          volatility: null,
          sharpe_ratio: null
        },
        sharpe_portfolio: {
          returns: null,
          volatility: null,
          sharpe_ratio: null
        },
        max_variance_port: {
          returns: null,
          volatility: null,
          sharpe_ratio: null
        }
      },

      dataGraphDeviation: [],
      poolBackTest: [],
      dataGraphPerformanceBackTestUsd: [],
      dataGraphPerformanceBackTestBtc: [],
      timestampGraph: [],
      tableDataBackTest: [],
      fullStaticDataBackTest: {
        abs_profit_percent: 0,
        abs_profit_usd: 0,
        capitalization: 0,
        capitalization_end_period_btc: 0,
        capitalization_end_period_usd: 0,
        max_pros_num: 0,
        max_pros_perc: 0,
        profit_btc: '',
        profit_percent: '',
        profit_usd: '',
        standard_deviation: 0
      },
      rebalanceEditPortfolioPercent: [],
      portfolioCoinList: [],
      activeRebalancePortfolio: [],
      test: {},
      newIdSavedEffectiveMargin: null,
      newIdSavedBacktest: null,
      idActiveSavedPortfels: null,
      lastRebalanceDate: '',
      rebalanceOptions: {
        pdate: '',
        porog: '',
        cron: '',
        bPorog: '',
        coef_rebalance: '',
        cripto_index: '',
        cripto_index_data: ''
      },
      isSaveOptionButtom: true,
      isSaveOptionButtomInActivatePortfolio: true,
      isChangePortfolioList: true,
      isLoadsSavedPortfolio: true,
      isChangeAndRebalansePortfolioList: true,
      isPathOnNewPortfolio: true,
      isPathOnDashboard: false,
      backupPortfolios: {
        date: [],
        events: []
      },
      savedPortfolios: {
        name: [],
        coins: []
      },
      percentPortfolioCoinList: 0,
      percentAnalyzedPortfolios: 0,
      percentSelectedCoinList: 0,
      messageSuccess: '',
      messageError: '',
      paramsBacktestTimeFilter: {
        threshold_rebalance: '0',
        rebalance_time_period: 1,
        rebalance_period: 'day'
      },

      paramsActivatePortfolioTimeFilter: {
        threshold_rebalance: '0',
        rebalance_time_period: 1,
        rebalance_period: 'day'
      },
      isDoneRequestActivationNewPortfolio: false,
      idSavedNewPortfolio: null,
      loadPortfolioButton: false,
      deletedPortfolio: {
        market: {
          market_id: '',
          market_title: '',
          type_loads_portfolio: 'saved'
        }
      },

      flagShowEffectiveMargin: false,

      seriesEffectiveMargin: [
        {
          name: 'Optimal Portfolio',
          data: [[]]
        },
        {
          name: 'Max Volatility Portfolio',
          data: [[]]
        },
        {
          name: 'Min Volatility Portfolio',
          data: [[]]
        },
        {
          name: 'Other',
          data: []
        }
      ],
      backupRebalancePortfolios: [],
      idSavedPortfolioUsedInDashboard: null,
      marketSavedPortfolioUsedInDashboard: null,
      faq: []
    };
  },
  mutations,
  actions
};

export default store;
