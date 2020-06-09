import ApiService from '@/services/ApiService';
import ApiServiceOther from '@/services/ApiServiceOther';
import ApiServiceRebalance from '@/services/ApiServiceRebalance';
import ApiServiceHeader from '@/services/ApiServiceHeader';
import ApiServiceCreatePortfolio from '@/services/ApiServiceCreatePortfolio';
import ApiServiceFaq from '@/services/ApiServiceFaq';
import ApiServicePayment from '@/services/ApiServicePayment';
import ApiServiceLanding from '@/services/ApiServiceLanding';

export default {
  async template({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      const main_response = await ApiService.get_short_portfel_list();
      let response = main_response.data;
      /*-----------------------*/
      // ......
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },
  
  async sandbox_paypal({state, dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    let params = {
      "cmd":"_xclick-subscriptions",
      "no_note":"1",
      "no_shipping":"1",
      "src":"1",
      "p3":"1",
      "t3":"M",
      "business":state.url_data.business,
      "invoice":state.url_data.invoice,
      "a3": state.url_data.amount,
      "currency_code":state.url_data.currency_code,
      "item_name":state.url_data.item_name,
      "notify_url":state.url_data.id_notify_url,
      "cancel_return":state.url_data.id_cancel_return,
      "return_url": state.url_data.id_return_url,
    }
    try {
      const main_response = await ApiServicePayment.post_test_paypal_order(params);
      let response = main_response.data;
      /*-----------------------*/
      console.log(response)
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },
  
  async getLandingData({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      const main_response = await ApiServiceLanding.get_landing_data();
      let response = main_response.data;
      if (response.status == 'ok'){
        /*-----------------------*/
        commit('setLandingData', response.data.load_data)
        /*-----------------------*/
      }
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      // dispatch('getMessage', {
      //   message: error.message,
      //   status: 'error'
      // });
    }
  },
  
  async confirmEmail({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    try {
      const main_response = await ApiService.confirm_email(params);
      let response = main_response.data;
      /*-----------------------*/
      // ......
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async resetPassword({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      const main_response = await ApiService.reset_password({ email: params });
      let response = main_response.data;
      /*-----------------------*/
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },
  
  async passwordResetConfirm({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      const main_response = await ApiService.reset_password(params);
      let response = main_response.data;
      /*-----------------------*/
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async getHistoryLatestMessage({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      const main_response = await ApiService.get_user_logs_later();
      let response = main_response.data;
      /*-----------------------*/
      commit('setLaterMessage', response.data.later_mail_stack);
      commit('setCountDontViewed', response.data.count_dont_viewed);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async getHistoryMessage({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      const main_response = await ApiService.get_user_logs();
      let response = main_response.data;
      /*-----------------------*/
      if (response.status == 'ok'){
        commit('uploadTodayMailStack', response.data.mail_stack.today_mail_stack);
  
        commit(
          'uploadYesterdayMailStack',
          response.data.mail_stack.yesterday_mail_stack
        );
  
        commit(
          'uploadWeeklyMailStack',
          response.data.mail_stack.weekly_mail_stack
        );
        commit(
          'uploadMounthMailStack',
          response.data.mail_stack.mounth_mail_stack
        );
        commit('changeTimer');
      }
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async createPaypalOrder({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    console.log('--- createPaypalOrder ---');
    try {
      const main_response = await ApiServicePayment.post_create_paypal_order(params);
      let response = main_response.data;
      /*-----------------------*/
      // ......
      dispatch('requestUserInfo');
      dispatch('getTransactions');
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },
  
  async getOrderPaymant({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      const main_response = await ApiServicePayment.get_order_paymant(params);
      let response = main_response.data;
        /*-----------------------*/
        if (response.status == 'ok') {
          if (response.data) {
            commit('setTariffSettingCycles', params.how_long);
            commit('setTariffSettingPlan', params.holder_plan);
            
            commit('setPaymantData', response.data);
            commit('setPPUrl',response.data.full_url);
            commit('setUrlData',response.data.url_data);
            commit('setClickSubs', 1);
          }
        }
        /*-----------------------*/
        dispatch('getMessage', {
          message: response.message,
          status: response.status
        });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async getTransactions({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      const main_response = await ApiServicePayment.get_transactions();
      let response = main_response.data;
      /*-----------------------*/
      commit('setTransactions', response.data.transactions);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async del2faVerification({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      const main_response = await ApiService.post_del_2fa_verification();
      let response = main_response.data;
      /*-----------------------*/
      dispatch('requestUserInfo');
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async сonfirm2FAVerification({ state, dispatch, commit }, params) {
    try {
      let params = {
        code_2fa: state.confirm_code
      };
      console.log(params);
      const main_response = await ApiService.post_confirm_2fa_verification(
        params
      );
      let response = main_response.data;
      /*-----------------------*/
      if (response.data.is_confirm) {
        commit('setPopup', null);
        dispatch('requestUserInfo');
      } else {
        // dispatch('getQRCode');
      }
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
      commit('setConfirmCode', null);
    } catch (error) {
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async getQRCode({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      const main_response = await ApiService.get_qr_code();
      let response = main_response.data;
      /*-----------------------*/
      commit('setQRCode', response.data.config_url);
      commit('setSecret_Token', response.data.secret_token);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async refelals({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      const main_response = await ApiServiceOther.get_lk_referals();
      let response = main_response.data;
      /*-----------------------*/
      commit('setReferralInfo', response.data);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);

      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  // -------------- auth --------------
  async makeRegister({ state, dispatch, commit }, params) {
    // console.log('--- makeRegister ---');
    try {
      const main_response = await ApiService.register(params);
      let response = main_response.data;
      /*-----------------------*/
      if (response.status == 'ok') {
        commit('setSecretToken', response.secret_token);
      }
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(makeRegister)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async makeLogin({ state, dispatch, commit }, params) {
    // console.log('--- makeLogin ---');
    try {
      const main_response = await ApiService.login(params);
      let response = main_response.data;
      /*-----------------------*/
      if (response.status == 'ok') {
        commit('setSecretToken', response.secret_token);
      }
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(makeLogin)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async postSavedPortfolios({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- postSavedPortfolios ---');
    try {
      const main_response = await ApiServiceOther.get_saved_portfolios(params);
      let response = main_response.data;
      /*-----------------------*/

      commit('setBackupPortfolios', response.data.stack_backup);
      commit('setSavedPortfolios', response.data.stack_saved_portfolios);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(postSavedPortfolios)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },
  // --------------LK--------------
  async makeRequestExchangeAuthPortfelData({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- makeRequestExchangeAuthPortfelData ---');
    try {
      params['exchange_portfels_button'] = '';
      const main_response = await ApiService.post_exchange_auth_portfel_data(
        params
      );
      let response = main_response.data;
      commit('setShowButtomConnect', false);
      /*-----------------------*/

      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(makeRequestExchangeAuthPortfelData)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async postChangeUsername({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- postChangeUsername ---');
    try {
      const main_response = await ApiService.post_change_username({
        name: params
      });
      let response = main_response.data;
      /*-----------------------*/
      commit('changeUserLogin', response.data.name);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(postChangeUsername)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async postChangeEmail({ state, dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- postChangeEmail ---');
    try {
      const main_response = await ApiService.post_change_email({
        email: state.userInfo.email
      });
      let response = main_response.data;
      /*-----------------------*/
      // ......
      commit('changeUserEmail', response.data.email);
      /*-----------------------*/
      if (response.status == 'ok') {
        commit('delConfirmedEmail');
      }
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(postChangeEmail)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async requestUserInfo({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      const main_response = await ApiService.lk_user();
      let response = main_response.data;
      /*-----------------------*/
      commit('setUserInfo', response.data.user_info);
      commit('setPaymentInfo', response.data.payment_info);
      if (response.data.user_company) {
        commit('setCompanyInfo', response.data.user_company);
      }
      // ......
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async changePassword({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- changePassword ---');
    try {
      const main_response = await ApiService.post_change_password(params);
      let response = main_response.data;
      /*-----------------------*/
      // ......
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(changePassword)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async savedUserInfo({ state, dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      const main_response = await ApiService.post_saved_user_info({
        address: state.userInfo.address,
        city: state.userInfo.city,
        country: state.userInfo.country,
        postal: state.userInfo.postal
      });
      let response = main_response.data;
      /*-----------------------*/
      // ......
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async savedUserCompanyInfo({ state, dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      console.log(state.companyInfo)
      const main_response = await ApiService.post_saved_user_company_info({
        address: state.companyInfo.address,
        city: state.companyInfo.city,
        country: state.companyInfo.country,
        name: state.companyInfo.name,
        postal: state.companyInfo.postal,
        vat_number: state.companyInfo.vat_number
      });
      let response = main_response.data;
      /*-----------------------*/
      // ......
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },
  // --------------dashboard--------------
  async makeRequesPostTimeStampPortfelData({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- makeRequesPostTimeStampPortfelData ---');
    try {
      const main_response = await ApiService.get_time_stamp_portfel_data(
        params.params,
        params.id_portfel
      );
      let response = main_response.data;
      /*-----------------------*/
      // console.log(params);
      switch (params.params.hidden_crons_mask) {
        case 0:
          commit('setDataGrafForAllTime', response.data);
          break;
        case 1:
          commit('setDataGrafForDay', response.data);
          break;
        case 2:
          commit('setDataGrafForMonth', response.data);
          break;
        case 3:
          commit('setDataGrafForYear', response.data);
          break;
        default:
          dispatch('getMessage', {
            message:
              'Error timestamp index (' + params.params.hidden_crons_mask + ')',
            status: 'error'
          });
      }
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(makeRequesPostTimeStampPortfelData)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async getShortPortfolioInfo({ dispatch, commit }) {
    // console.log('getShortPortfolioInfo');
    try {
      const main_response = await ApiService.get_short_portfel_list();
      let response = main_response.data;

      var buff = response.data.portfel_short_list;
      commit('setShortPortfolioList', buff);
      if (response.data.message != '') {
        dispatch('getMessage', {
          message: response.data.message,
          status: response.data.status
        });
      }
    } catch (error) {
      // console.log('Error(getShortPortfolioInfo)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async getBestReadyMadePortfolio({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- getBestReadyMadePortfolio ---');
    try {
      const main_response = await ApiService.get_best_ready_made_portfel();
      let response = main_response.data;
      /*-----------------------*/
      commit('setBestReadeMadePortfolio', response.data);
      /*-----------------------*/

      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(getBestReadyMadePortfolio)' + error.message);
      // dispatch('getMessage', {
      //   message: error.message,
      //   status: 'error'
      // });
    }
  },

  async makeRequestSetTrellinStopCoefficient({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- makeRequestSetTrellinStopCoefficient ---');
    try {
      const main_response = await ApiService.set_treiling_stop_coefficient(
        params
      );
      let response = main_response.data;
      /*-----------------------*/
      // ......
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log(
      //   'Error(makeRequestSetTrellinStopCoefficient)' + error.message
      // );
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async getFullDataWithSavedPortfolioInAnalized({ state, dispatch, commit }) {
    // console.log('--- getFullDataWithSavedPortfolioInAnalized ---');
    let params = {
      id_: state.idSavedNewPortfolio,
      market: state.idActivePortfolio,
      type_loads_portfolio: 'saved'
    };
    // console.log(params);
    if (params.market === 'all') {
      dispatch('getMessage', {
        message: 'Invalid market',
        status: 'error'
      });
      return null;
    }

    if (params.id_ != '' && params.id_) {
      try {
        const main_response = await ApiService.api_post_full_data_with_saved_portfolio(
          params
        );
        let response = main_response.data;
        /*-----------------------*/
        commit('setAllAnalyzedPortfolios', response.data.portfolio_data);
        commit('setParamsActivatePortfolioTimeFilter', response.data.options);
        commit('setNamePortfolio', response.data.portfolio_name);
        /*-----------------------*/
        dispatch('getMessage', {
          message: response.message,
          status: response.status
        });
      } catch (error) {
        // console.log(
        //   'Error(getFullDataWithSavedPortfolioInAnalized)' + error.message
        // );
        dispatch('getMessage', {
          message: error.message,
          status: 'error'
        });
      }
    } else {
      dispatch('getMessage', {
        message: 'Invalid data',
        status: 'error'
      });
    }
  },

  async getFullDataWithSavedPortfolioInSelect(
    { state, dispatch, commit },
    data
  ) {
    // console.log('--- getFullDataWithSavedPortfolioInSelect ---');
    let params = {
      id_: data.id_,
      market: data.market,
      type_loads_portfolio: 'saved'
    };

    // if (params.market === 'all') {
    //   dispatch('getMessage', {
    //     message: 'Invalid market',
    //     status: 'error'
    //   });
    //   return null;
    // }

    if (params.id_ != '' && params.id_) {
      try {
        const main_response = await ApiService.api_post_full_data_with_saved_portfolio(
          params
        );
        let response = main_response.data;
        /*-----------------------*/
        commit('setAllSelectedCoinList', response.data.portfolio_data);
        if (data.page == 'backtest') {
          commit('setParamsActivatePortfolioTimeFilter', response.data.options);
        }

        commit('setNamePortfolio', response.data.portfolio_name);
        /*-----------------------*/
        dispatch('getMessage', {
          message: response.message,
          status: response.status
        });
      } catch (error) {
        // console.log(
        //   'Error(getFullDataWithSavedPortfolioInSelect)' + error.message
        // );
        dispatch('getMessage', {
          message: error.message,
          status: 'error'
        });
      }
    } else {
      dispatch('getMessage', {
        message: 'Invalid data',
        status: 'error'
      });
    }
  },

  async postChangeNamePortflio({ state, dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- postChangeNamePortflio ---');
    // console.log(state.idActiveSavedPortfels);
    try {
      params['id_portfels'] = state.idActiveSavedPortfels;
      const main_response = await ApiService.post_change_name_portfolio(params);
      let response = main_response.data;
      /*-----------------------*/

      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
      if (response.status != 'error') {
        dispatch('getPortfels', state.activeMarket.market_title);
      }
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async postRebalanceWithBtc({ state, dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- postRebalanceWithBtc ---');
    try {
      let params = {
        id_portfels: state.activeMarket.market_title
      };
      const main_response = await ApiService.api_rebalance_with_btc(params);
      let response = main_response.data;
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
      if (response.status != 'error') {
        dispatch('getPortfels', state.activeMarket.market_title);
      }
    } catch (error) {
      // console.log('Error(postRebalanceWithBtc)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async postRebalanceWithUsd({ state, dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- postRebalanceWithUsd ---');
    try {
      let params = {
        id_portfels: state.activeMarket.market_title
      };
      const main_response = await ApiService.post_rebalance_with_usdt(params);
      let response = main_response.data;
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
      if (response.status != 'error') {
        dispatch('getPortfels', state.activeMarket.market_title);
      }
    } catch (error) {
      // console.log('Error(postRebalanceWithUsd)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  // --------------rebalance. --------------
  // экшены направленные на взаимодействия с ребалансом
  async getRebalanceNow({state, dispatch, commit }, data) {
    // console.log('---getRebalanceNow---');
    try {
      const response = await ApiServiceRebalance.rebalance_now(data);

      dispatch('getMessage', {
        message: response.data.message,
        status: response.data.status
      });

      if (response.status == 'ok'){
        dispatch('getPortfels', state.activeMarket.market_title);
      }
    } catch (error) {
      // console.log('Error(getRebalanceNow)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async publishReadyMadePortfolio({ dispatch, commit }, params) {
    // console.log('---makePublishReadyMadePortfolio---');
    try {
      const response = await ApiService.publish_ready_made_portfolio(params);
      if (response.status != 'error') {
        commit('setIsPublishedReadyMadeInfo', true);
        dispatch('getReadyMadePortfel');
      }
      commit('setPopup', null);
      dispatch('getMessage', {
        message: response.data.message,
        status: response.data.status
      });
    } catch (error) {
      // console.log('Error(publishReadyMadePortfolio)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async loadedSavedPortfolio({ state, dispatch, commit }, params) {
    // console.log('---loadedSavedPortfolio---');
    try {
      const response = await ApiServiceOther.post_loaded_saved_portfolio(
        params
      );
      // commit('setIdSavedNewPortfolio', response.data.id_saved_portfels);
      dispatch('getMessage', {
        message: response.data.message,
        status: response.data.status
      });
    } catch (error) {
      // console.log('Error(loadedSavedPortfolio)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async postChangeOtionsPortfolio({ dispatch, commit }, params) {
    // console.log('---postChangeOtionsPortfolio---');
    try {
      const response = await ApiServiceRebalance.post_change_options_portfolio(
        params
      );
      dispatch('getMessage', {
        message: response.data.message,
        status: response.data.status
      });
    } catch (error) {
      // console.log('Error(postChangeOtionsPortfolio)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async showActualPortfolio({ dispatch, commit }, param) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- showActualPortfolio ---');
    try {
      const main_response = await ApiServiceRebalance.post_show_actual_portfolio(
        param
      );
      let response = main_response.data;
      /*-----------------------*/
      commit('setActiveRebalancePortfolio', response.data.portfolio_coin_list);
      let buff = [];
      for (let item of response.data.portfolio_coin_list) {
        buff.push({
          id_coin: item.id_coin,
          asset_price: item.asset_price,
          piece_of_coin: item.piece_of_coin,
          is_accumulation: item.is_accumulation,
          percent: item.percent,
          percent_real: item.percent_real,
          rebalance: item.rebalance,
          change: item.change,
          short: item.short,
          title: item.title,
          statistics: item.statistics
        });
      }
      commit('setAllPortfolioCoinList', buff);
      commit('setLastRebalanceDate', response.data.date_last_rebalance);
      commit('setRebalanceOptions', response.data.options);

      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(showActualPortfolio)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async postChangePortfolioCoinList({ dispatch, commit }, param) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- postChangePortfolioCoinList ---');
    try {
      const main_response = await ApiServiceRebalance.post_change_portfolio_coin_list(
        param
      );
      let response = main_response.data;
      /*-----------------------*/
      dispatch('showActualPortfolio', {
        id_portfels: param.id_portfels
      });
      dispatch('setIsFlagPortfolioUpdate');
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(postChangePortfolioCoinList)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async getRMPortfelsStatistik({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- getRMPortfelsStatistik ---');
    try {
      const main_response = await ApiService.get_rm_portfels_statistik(params);
      let response = main_response.data;
      /*-----------------------*/
      commit('setOptionsRMPortfolio', response.data);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(getRMPortfelsStatistik)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async makeRequesPostTimeStampRMPortfelData({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- makeRequesPostTimeStampRMPortfelData ---');
    try {
      const main_response = await ApiService.get_time_stamp_rm_portfel_data(
        params.params,
        params.id_portfel
      );
      let response = main_response.data;
      /*-----------------------*/
      let data = {};
      data[0] = {
        values: {
          pdate: response.data[0].values.pdate,
          value: response.data[0].values.value
        },
        // btc_values: {
        //   pdate: response.data[0].balance_in_bitcoins.pdate,
        //   value: response.data[0].balance_in_bitcoins.value
        // },
        return_persent: response.data[0].statistics.return_persent,
        max_pros_perc: response.data[0].statistics.max_pros_perc
      };
      data[1] = {
        values: {
          pdate: response.data[1].values.pdate,
          value: response.data[1].values.value
        },
        // btc_values: {
        //   pdate: response.data[1].balance_in_bitcoins.pdate,
        //   value: response.data[1].balance_in_bitcoins.value
        // },
        return_persent: response.data[1].statistics.return_persent,
        max_pros_perc: response.data[1].statistics.max_pros_perc
      };
      data[2] = {
        values: {
          pdate: response.data[2].values.pdate,
          value: response.data[2].values.value
        },
        // btc_values: {
        //   pdate: response.data[2].balance_in_bitcoins.pdate,
        //   value: response.data[2].balance_in_bitcoins.value
        // },
        return_persent: response.data[2].statistics.return_persent,
        max_pros_perc: response.data[2].statistics.max_pros_perc
      };
      data[3] = {
        values: {
          pdate: response.data[3].values.pdate,
          value: response.data[3].values.value
        },
        // btc_values: {
        //   pdate: response.data[3].balance_in_bitcoins.pdate,
        //   value: response.data[3].balance_in_bitcoins.value
        // },
        return_persent: response.data[3].statistics.return_persent,
        max_pros_perc: response.data[3].statistics.max_pros_perc
      };
      commit('setDataGraphRMPortfolio', data);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log(
      //   'Error(makeRequesPostTimeStampRMPortfelData)' + error.message
      // );
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  // -------------- header --------------
  // экшены вызываемые в хэдере
  async getPortfels({ dispatch, commit }, id_portfel) {
    // console.log('--- Actions getPortfels ---');
    let buff_id_portfel;
    try {
      if (id_portfel == '0') {
        buff_id_portfel = 'all';
      } else {
        buff_id_portfel = id_portfel;
      }
    } catch (e) {
      // console.log(e);
      buff_id_portfel = 'all';
    }
    try {
      const response_main = await ApiServiceHeader.get_portfels_new(
        buff_id_portfel
      );
      let response = response_main.data;
      let params = {
        market: response.data.show_portfel.id,
        is_trailing_stop: response.data.show_portfel.trailing_stop_flag,
        trailing_stop_coefficient:
          response.data.show_portfel.trailing_stop_coefficient,
        short_statistics_data: {
          total_return: String(response.data.total_information.total_return),
          portfolio_value: String(
            response.data.total_information.portfolio_value
          ),
          max_drawndawn: String(response.data.total_information.max_drawndawn),
          total_return_in_btc: String(
            response.data.total_information.total_return_in_btc
          ),
          portfolio_value_in_btc: String(
            response.data.total_information.portfolio_value_in_btc
          )
        }
      };
      commit('setOptionsForDashboard', response.data.options_portfel);
      commit('setPortfolioInformations', params);
      if (response.data.portfel_data[0]) 
        {
          commit(
          'setIdActiveSavedPortfels',
          response.data.portfel_data[0].id_active_saved_portfels);
        }
      commit('setActivePortfelCoinList', response.data.portfel_data);
      commit('setReadyMadeInfo', response.data.ready_made_info);
      if (response.data.show_portfel.id != 'all') {
        commit('setBackupRebalancePortfolios', response.data.portfel_data);
      }
      // При смене портфеля монеты существующего портфеля
      //  подгружаются в активный портфель в сторе и отображаются на страницах анализа
      commit('setAllSelectedCoinList', []);
      /*----------------------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(getPortfels)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async makeRequestWhiteList({ dispatch, commit }) {
    // console.log('--- makeRequestWhiteList ---');
    try {
      const response = await ApiServiceHeader.get_white_list_for_markets();
      commit('setWhiteListForMarkets', response.data.data.white_list_coins);

      dispatch('getMessage', {
        message: response.data.message,
        status: response.data.status
      });
    } catch (error) {
      // console.log('Error(makeRequestWhiteList)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async getBalance({ state, dispatch, commit }, id_portfel) {
    // console.log('--- getBalance ---');
    try {
      const main_response = await ApiService.get_balance();
      let response = main_response.data;
      /*-----------------------*/
      let user_markets = [];
      if (response.data.length == 0) {
        user_markets = [
          {
            market_title: 'all',
            market_id: '0',
            portfel_id: '0',
            balance: null
          }
        ];
      } else {
        user_markets = response.data;
      }
      commit('setUserMarketList2', user_markets);
      let active_market;
      for (let item of state.userMarketList) {
        if (id_portfel == item.market.market_title) {
          active_market = {
            market_title: item.market.market_title,
            market_id: item.market.market_id,
            portfel_id: item.market.portfel_id,
            balance: item.balance_portfel_usd
          };
          break;
        }
      }
      commit('setActiveMarket', active_market);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(getBalance)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  // -------------- Create portfel --------------
  //------------------------- index
  async makeRequestCreatePortfolio({ dispatch, commit }, params) {
    // console.log('--- makeRequestCreatePortfolio ---');
    try {
      const main_response = await ApiServiceCreatePortfolio.post_create_portfel(
        params.data
      );
      let response = main_response.data;
      
      if ( response.status=='ok')
      {
        commit('setShowButtomConnect', false);
        /*-----------------------*/
        commit('setAllAnalyzedPortfolios', []);
        commit('setOptimalNewPortfolio', null);
        commit('setActiveMarket', params.selected);
  
        // commit('setIdActivePortfolio', params.selected.market_title);
        dispatch('getBalance', params.selected.market_title);
        commit('setClearConnectData');
        commit('setNewPortfolio', response.data.new_portfel);
        commit('setBalanceChosenMarket', response.data.balance_new_portfel_usd);
      }
        
      /*-----------------------*/
      if (response.status == 'info') {
        commit('setPopup', 'upgrade-popup');
      }
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(makeRequestCreatePortfolio)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },
  //------------------------- efficient-frontier
  async makeRequesShortEffectiveMargin({ dispatch, commit }, params) {
    // console.log('--- template ---');
    try {
      const main_response = await ApiServiceCreatePortfolio.short_effective_margin(
        params
      );
      let response = main_response.data;
      /*-----------------------*/
      commit(
        'setUpdateAnalyzedPortfolios',
        response.data.effective_margin_data.portfel_sharpe_portfolio
      );
      commit('setPoolWeightEfficientFrontier', {
        portfel_max_variance_port:
          response.data.effective_margin_data.portfel_max_variance_port,
        portfel_sharpe_portfolio:
          response.data.effective_margin_data.portfel_sharpe_portfolio,
        portfel_min_variance_port:
          response.data.effective_margin_data.portfel_min_variance_port
      });
      commit('setEfficientFrontierStatisticsData', {
        min_variance_port:
          response.data.effective_margin_data.min_variance_port,
        sharpe_portfolio: response.data.effective_margin_data.sharpe_portfolio,
        max_variance_port: response.data.effective_margin_data.max_variance_port
      });
      commit('setTempSeriesShortEffectiveMargin', [
        {
          name: 'Optimal Portfolio',
          data: [
            [
              response.data.effective_margin_data.sharpe_portfolio.volatility,
              response.data.effective_margin_data.sharpe_portfolio.returns
            ]
          ]
        },
        {
          name: 'Max Volatility Portfolio',
          data: [
            [
              response.data.effective_margin_data.max_variance_port.volatility,
              response.data.effective_margin_data.max_variance_port.returns
            ]
          ]
        },
        {
          name: 'Min Volatility Portfolio',
          data: [
            [
              response.data.effective_margin_data.min_variance_port.volatility,
              response.data.effective_margin_data.min_variance_port.returns
            ]
          ]
        },
        {
          name: 'Other',
          data: response.data.effective_margin_data.show_data
        }
      ]);
      commit('setIsShowItemFlagShortEffectiveMargin', true);
      commit('makeBackupAnalyzedPortfolios');

      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },
  //------------------------- portfolio-activation
  async makeRequesPostSavedPortfel({ state, dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- makeRequesPostSavedPortfel ---');
    try {
      if (state.idSavedNewPortfolio) {
        params['id_updated_portfolio'] = state.idSavedNewPortfolio;
      }
      const main_response = await ApiServiceCreatePortfolio.post_saved_portfel(
        params
      );
      let response = main_response.data;
      /*-----------------------*/
      // сохраняем id сохраненного портфеля в стор
      commit('setIdSavedNewPortfolio', response.data.id_saved_portfels);
      commit('setIsRequestActivationNewPortfolioDone');
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(makeRequesPostSavedPortfel)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  activationNewPortfolio({ dispatch, commit }, params) {
    dispatch('makeRequesPostSavedPortfel', params);
  },

  // -------------- other --------------
  async deletedSavedPortfolio({ dispatch, commit }, params) {
    // console.log('---deletedSavedPortfolio---');
    try {
      const response = await ApiServiceOther.post_delite_portfolio(params);

      dispatch('getMessage', {
        message: response.data.message,
        status: response.data.status
      });
      if (response.data.status != 'error') {
        commit('deleteShortPortfolioFromList', params.id_);
      }
    } catch (error) {
      // console.log('Error(deletedSavedPortfolio)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async getUnpublished({ dispatch, commit }, market) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- getUnpublished ---');
    try {
      const main_response = await ApiServiceOther.get_unpublished(
        market.market_title
      );
      let response = main_response.data;
      /*-----------------------*/
      if (response.status != 'error') {
        commit('setIsPublishedReadyMadeInfo', false);
      }
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(getUnpublished)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  // -------------- main backtest --------------
  async makeRequesBackTest({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- template ---');
    try {
      const main_response = await ApiService.back_test_post(params);
      let response = main_response.data;
      /*-----------------------*/
      commit(
        'setFullStaticDataBackTest',
        response.data.full_static_data_back_test
      );

      commit('setTableDataBackTest', response.data.table_data_back_test);

      commit('setTimestampGraph', response.data.time_array);

      commit(
        'setDataGraphPerformanceBackTestUsd',
        response.data.portfel_data_graph.balance_usd
      );

      commit(
        'setDataGraphDeviation',
        response.data.portfel_data_graph.difference
      );

      commit(
        'setDataGraphPerformanceBackTestBtc',
        response.data.portfel_data_graph.balance_btc
      );
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(template)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async postSaveBacktest({ state, dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- postSaveBacktest ---');
    try {
      if (state.newIdSavedBacktest) {
        params['id_new_portfolio'] = state.newIdSavedBacktest;
      }
      params['portfel_data'] = JSON.stringify(state.tableDataBackTest);
      const main_response = await ApiServiceOther.post_save_backtest(params);
      let response = main_response.data;
      /*-----------------------*/
      commit('setNewIdSavedBacktest', response.data.id_new_portfolio);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
      if (response.message != 'error') {
        dispatch('postSavedPortfolios', {
          market_name: state.activeMarket.market_title,
          type_portfolio: 'both'
        });
      }
    } catch (error) {
      // console.log('Error(postSaveBacktest)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  // -------------- FAQ --------------
  async makeRequesGetFaq({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- makeRequesGetFaq ---');
    try {
      const main_response = await ApiServiceFaq.get_faq();
      let response = main_response.data;
      /*-----------------------*/
      commit('setFaq', response.data.faq);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(makeRequesGetFaq)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async postChangeRating({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- postChangeRating ---');
    try {
      const main_response = await ApiServiceFaq.post_change_rating(params);
      let response = main_response.data;
      /*-----------------------*/
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(postChangeRating)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  // -------------- RM --------------
  async getReadyMadePortfel({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('---getReadyMadePortfel---');
    try {
      const main_response = await ApiService.ready_made_portfel();
      let response = main_response.data;
      /*-----------------------*/
      commit('setReadyMadePortfolioList', response.data.array_rm_portfels);

      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(getReadyMadePortfel)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async makeRequestGetMarketIndex({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- makeRequestGetMarketIndex ---');
    try {
      const main_response = await ApiService.get_market_index();
      let response = main_response.data;
      /*-----------------------*/
      commit('setMarketIndex', response.data.market_index);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(makeRequestGetMarketIndex)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async getRMPortfels({ dispatch, commit }, id_portfel) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- getRMPortfels ---');
    try {
      const main_response = await ApiService.get_rm_portfels(id_portfel);
      let response = main_response.data;
      /*-----------------------*/
      let short_rm_portfolio_data = {
        portfel_name: response.data.show_portfel.name,
        favorite: response.data.show_portfel.is_favorites,
        isDefault: false
      };
      commit('setReadyMadePortfolioShortData', short_rm_portfolio_data);
      // commit('setTimeStampSwitchCase', response.data.statistics);
      commit('setRMPortfelCoinList', response.data.show_portfel.coin_list);
      commit('setFavorite', response.data.show_portfel.is_favorites);

      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(getRMPortfels)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async makeRequestSetFavoritePortfel({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- makeRequestSetFavoritePortfel ---');
    try {
      const main_response = await ApiService.change_favorite_portfel(params);
      let response = main_response.data;
      /*-----------------------*/
      commit('setFavorite', response.data.is_favorite);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(makeRequestSetFavoritePortfel)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async getSubscribers({ dispatch, commit }, id_portfel) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- getSubscribers ---');
    try {
      const main_response = await ApiService.get_subscribers(id_portfel);
      let response = main_response.data;
      /*-----------------------*/
      commit('setSubscribers', response.data.subscribers);
      commit('setDescriptions', response.data.descriptions);
      commit('setIdRmPortfolio', response.data.id_rm_portfel);
      commit('setFavorite', response.data.is_favorite);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(getSubscribers)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async setChangeTimestamp({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- getSubscribers ---');
    try {
      const main_response = await ApiService.change_timestamp_rm_portfolio(
        params.params,
        params.id_portfel
      );
      let response = main_response.data;
      /*-----------------------*/
      switch (params.index) {
        case '0':
          commit('setRMPortfelDataGrafForAllTime', response.data.statistics);
          break;
        case '1':
          commit('setRMPortfelDataGrafForDay', response.data.statistics);
          break;
        case '2':
          commit('setRMPortfelDataGrafForMonth', response.data.statistics);
          break;
        case '3':
          commit('setRMPortfelDataGrafForYear', response.data.statistics);
          break;
        default:
          dispatch('getMessage', {
            message: 'Error timestamp index (' + params.index + ')',
            status: 'error'
          });
      }
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(getSubscribers)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async makeRequestSubscription({ dispatch, commit }, id_portfel) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- makeRequestSubscription ---');
    // console.log(id_portfel);
    try {
      const main_response = await ApiService.subscription(id_portfel, {
        subscription_form_button: ''
      });
      let response = main_response.data;
      /*-----------------------*/
      // ......
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
      commit('setPopup', null);
    } catch (error) {
      // console.log('Error(makeRequestSubscription)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async getShortRMPortfolioList({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- getShortRMPortfolioList ---');
    try {
      const main_response = await ApiServiceOther.get_short_rm_portfolio_list();
      let response = main_response.data;
      /*-----------------------*/
      commit('setShortRMPortfolioList', response.data.array_rm_portfels);
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(getShortRMPortfolioList)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },
  // -------------- private --------------
  getMessage({ dispatch, commit }, params) {
    if (params.message != '' && params.message != null) {
      switch (params.status) {
        case 'ok':
          this.$toast.success(params.message).goAway(2500);
          break;
        case 'error':
          if (params.message != '500 (Internal Server Error)')
            this.$toast.error(params.message).goAway(2500);
          break;
        default:
          this.$toast.info(params.message).goAway(2500);
          break;
      }
    }
  },

  async post7DaysTrial({ dispatch, commit }) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- post7DaysTrial ---');
    try {
      const main_response = await ApiServiceOther.post_7days_trial();
      let response = main_response.data;
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
      dispatch('requestUserInfo');
    } catch (error) {
      // console.log('Error(post7DaysTrial)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  // -------------- efficient_frontier --------------
  async makeRequesFullEffectiveMargin({ state, dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- makeRequesFullEffectiveMargin ---');
    try {
      const main_response = await ApiService.full_effective_margin(params);
      let response = main_response.data;
      /*-----------------------*/
      if (!params.is_50000) {
        commit('setBigPoolWeightEfficientFrontier', {
          portfel_max_variance_port:
            response.data.effective_margin_data.portfel_max_variance_port,
          portfel_sharpe_portfolio:
            response.data.effective_margin_data.portfel_sharpe_portfolio,
          portfel_min_variance_port:
            response.data.effective_margin_data.portfel_min_variance_port
        });

        commit('setBigStatisticDataEfficientFrontier', {
          min_variance_port:
            response.data.effective_margin_data.min_variance_port,
          sharpe_portfolio:
            response.data.effective_margin_data.sharpe_portfolio,
          max_variance_port:
            response.data.effective_margin_data.max_variance_port
        });

        commit('setSeriesEffectiveMargin', [
          {
            name: 'Optimal Portfolio',
            data: [
              [
                response.data.effective_margin_data.sharpe_portfolio.volatility,
                response.data.effective_margin_data.sharpe_portfolio.returns
              ]
            ]
          },
          {
            name: 'Max Volatility Portfolio',
            data: [
              [
                response.data.effective_margin_data.max_variance_port
                  .volatility,
                response.data.effective_margin_data.max_variance_port.returns
              ]
            ]
          },
          {
            name: 'Min Volatility Portfolio',
            data: [
              [
                response.data.effective_margin_data.min_variance_port
                  .volatility,
                response.data.effective_margin_data.min_variance_port.returns
              ]
            ]
          },
          {
            name: 'Other',
            data: response.data.effective_margin_data.show_data
          }
        ]);

        commit('setFlagShowEffectiveMargin', true);

        commit('delNewIdSavedEffectiveMargin');
      }
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      // console.log('Error(makeRequesFullEffectiveMargin)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  async postSaveEfficientFrontier({ state, dispatch, commit }, params) {
    try {
      if (state.newIdSavedEffectiveMargin) {
        params['id_new_portfolio'] = state.newIdSavedEffectiveMargin;
      }
      const main_response = await ApiServiceOther.post_save_efficient_frontier(
        params
      );
      let response = main_response.data;
      commit('setNewIdSavedEffectiveMargin', response.data.id_new_portfolio);
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
      if (response.message != 'error') {
        dispatch('postSavedPortfolios', {
          market_name: state.activeMarket.market_title,
          type_portfolio: 'both'
        });
      }
    } catch (error) {
      // console.log('Error(postSaveEfficientFrontier)' + error.message);
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  },

  // -------------- correlation_matrix --------------
  async makeRequesShortCalculationMatrix({ dispatch, commit }, params) {
    /*шаблон для экшена с выводом оповещений и сообщений об ошибках*/
    // console.log('--- makeRequesShortCalculationMatrix ---');
    // console.log(params);
    try {
      const main_response = await ApiService.short_calculation_matrix(params);
      let response = main_response.data;
      /*-----------------------*/
      if (params.main) {
        commit('setBigCorrelationData', response.data);
      } else {
        switch (params.cron) {
          case '0':
            commit('setCorrelationDataForThreeMounth', response.data);
            break;
          case '1':
            commit('setCorrelationDataForSixMounth', response.data);
            break;
          case '2':
            commit('setCorrelationDataForYear', response.data);
            break;
          case '3':
            commit('setCorrelationDataForTwoYear', response.data);
            break;
        }
      }
      /*-----------------------*/
      dispatch('getMessage', {
        message: response.message,
        status: response.status
      });
    } catch (error) {
      dispatch('getMessage', {
        message: error.message,
        status: 'error'
      });
    }
  }
};
