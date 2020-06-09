export default {
  // новая, для авторизации
  setAuth(state, auth) {
    state.auth = auth;
  },

  setUrlData(state, value) {
    state.url_data = value;
  },

  setPPUrl(state, value) {
    state.pp_url = value;
  },

  setIsHiddendCompleteOrderWindow(state) {
    state.is_hiddend_complete_order_window = !state.is_hiddend_complete_order_window;
  },

  setTransactions(state, value) {
    state.transactions = value;
  },

  setTariffSettingCycles(state, value) {
    state.tariff_setting_cycles = value;
  },

  setTariffSettingPlan(state, value) {
    state.tariff_setting_plan = value;
  },

  setClickSubs(state, value) {
    state.is_click_subs = value;
  },

  setIsMenuVisible(state, value) {
    state.isMenuVisible = value;
  },

  setIsFullPreloadTrue(state) {
    state.isFullPreload = true;
  },

  setPassLog(state, value) {
    state.pass_log = value;
  },

  setRouterUrl(state, value) {
    state.router_url = value;
  },

  setActiveEmailReg(state,value) {
    state.activeEmailReg = value;
  },

  setIsFullPreloadFalse(state) {
    state.isFullPreload = false;
  },

  setLaterMessage(state, value) {
    state.laterMessage = value;
  },

  setActiveHistoryMessage(state, value) {
    state.activeHistoryMessage = value;
  },

  setLandingData(state, value) {
    state.landingData = value;
  },

  setCountDontViewed(state, value) {
    state.count_dont_viewed = value;
  },

  setListOrderActiveMessages(state, value) {
    state.listOrderActiveMessages = value;
  },

  // setOnIsFullPreload(state) {
  //   state.isFullPreload = true;
  // },

  changeTimer(state) {
    if (state.timer == 0) {
      state.timer = 60;
    } else {
      state.timer = state.timer - 1;
    }
  },

  setPaymantData(state, value) {
    state.paymantData = value;
  },

  setKeyInConnectData(state, value) {
    state.marketConnectData.key = value;
  },

  setSecretInConnectData(state, value) {
    state.marketConnectData.secret = value;
  },

  //----------------------------
  setReferralInfo(state, value) {
    state.referralInfo = value;
  },

  setConfirmCode(state, value) {
    state.confirm_code = value;
  },

  setQRCode(state, value) {
    state.qr_code = value;
  },

  setSecret_Token(state, value) {
    state.secret_token = value;
  },

  setPaymentInfo(state, value) {
    state.paymentInfo = value;
  },

  setCompanyInfo(state, value) {
    state.companyInfo = value;
  },

  changeCompanyName(state, value) {
    state.companyInfo.name = value;
  },

  changeCompanyNumber(state, value) {
    state.companyInfo.vat_number = value;
  },

  changeCompanyCountry(state, value) {
    state.companyInfo.country = value;
  },

  changeCompanyAddress(state, value) {
    state.companyInfo.address = value;
  },

  changeCompanyCity(state, value) {
    state.companyInfo.city = value;
  },

  changeCompanyPostal(state, value) {
    state.companyInfo.postal = value;
  },
  //----------------------------
  setUserInfo(state, value) {
    state.userInfo = value;
  },

  changeUserCountry(state, value) {
    state.userInfo.country = value;
  },

  change2faVerification(state, value) {
    state.userInfo.is_2fa_verification = value;
  },

  changeIpVerification(state, value) {
    state.userInfo.is_ip_verification = value;
  },

  changeUserPostal(state, value) {
    state.userInfo.postal = value;
  },

  changeUserCity(state, value) {
    state.userInfo.city = value;
  },

  changeUserAddress(state, value) {
    state.userInfo.address = value;
  },

  changeUserEmail(state, value) {
    state.userInfo.email = value;
  },

  changeUserLogin(state, value) {
    state.userInfo.login = value;
  },

  delConfirmedEmail(state) {
    state.userInfo.is_confirmed_email = false;
  },

  updateStatusUserInfo(state, value) {
    state.userInfo['status_account'] = value;
  },

  setDataGraphRMPortfolio(state, value) {
    state.dataGraphRMPortfolio = value;
  },

  setOptionsRMPortfolio(state, value) {
    state.optionsRMPortfolio = value;
  },

  setPassInConnectData(state, value) {
    state.marketConnectData.password = value;
  },

  setNamePortfolio(state, value) {
    state.name_portfolio = value;
  },

  setShowButtomConnect(state, value) {
    state.showButtomConnect = value;
  },

  setIdActiveSavedPortfels(state, value) {
    state.idActiveSavedPortfels = value;
  },

  setClearConnectData(state) {
    state.marketConnectData.key = '';
    state.marketConnectData.secret = '';
    state.marketConnectData.password = '';
  },

  setFlagShowEffectiveMargin(state, value) {
    state.flagShowEffectiveMargin = value;
  },

  setIsFlagPortfolioUpdate(state) {
    state.isFlagPortfolioUpdate = state.isFlagPortfolioUpdate;
  },

  setMessageSuccess(state, value) {
    state.messageSuccess = value;
  },

  setMessageError(state, value) {
    state.messageError = value;
  },

  setPopup(state, value) {
    state.popup = value;
  },

  setAddAsset(state, value) {
    state.addAsset = value;
  },

  setIdSavedNewPortfolio(state, value) {
    state.idSavedNewPortfolio = value;
  },

  setAddAsset2(state, value) {
    state.addAsset2 = value;
  },

  setRemoveAsset(state, value) {
    state.removeAsset = value;
  },

  setRemoveAsset2(state, value) {
    state.removeAsset2 = value;
  },

  setActiveRebalancePortfolio(state, value) {
    state.activeRebalancePortfolio = value;
  },

  setAddItemActiveRebalancePortfolio(state, value) {
    let buff = state.activeRebalancePortfolio;
    buff.push(value);
    state.activeRebalancePortfolio = buff;
  },

  setActivePortfelCoinList(state, value) {
    state.activePortfelCoinList = value;
  },

  setPortfolioInformations(state, value) {
    state.portfolioInformations = value;
  },

  setUserMarketList2(state, value) {
    state.userMarketList = value;
  },

  setUpdateAnalyzedPortfolios(state, value) {
    let buff_data = state.analyzedPortfolios;
    for (let item of buff_data) {
      item.percent = parseFloat(value[item.title]);
    }
    state.analyzedPortfolios = buff_data;
  },

  setUpdateAnalyzedNewPortfolio(state, value) {
    let temp = state.analyzedPortfolios;
    for (let item of temp) {
      if (item.title == value.title) {
        item.percent = parseFloat(value.percent);
      }
    }
    state.analyzedPortfolios = temp;
  },

  setNewRemoveAsset(state, value) {
    state.analyzedPortfolios = state.analyzedPortfolios.filter(item => {
      if (item.id_coin != value) return item;
    });
  },

  makeBackupAnalyzedPortfolios(state) {
    let buff = [];
    let data = state.analyzedPortfolios;
    for (let obj of data) {
      let clone = {}; // Создаем новый пустой объект
      for (let prop in obj) {
        // Перебираем все свойства копируемого объекта
        if (obj.hasOwnProperty(prop)) {
          clone[prop] = obj[prop];
        }
      }
      buff.push(clone);
    }
    state.backupAnalyzedPortfolios = buff;
  },

  loadBackupAnalyzedPortfolios(state) {
    let buff = [];
    let data = state.backupAnalyzedPortfolios;
    for (let obj of data) {
      let clone = {}; // Создаем новый пустой объект
      for (let prop in obj) {
        // Перебираем все свойства копируемого объекта
        if (obj.hasOwnProperty(prop)) {
          // Только собственные свойства
          clone[prop] = obj[prop]; // Или же просто копируем значение
        }
      }
      buff.push(clone);
    }
    state.analyzedPortfolios = buff;
  },

  setAnalyzedPortfolios(state, value) {
    let buff = state.analyzedPortfolios;
    buff.push(value);
    state.analyzedPortfolios = buff;
  },

  setAllAnalyzedPortfolios(state, value) {
    state.analyzedPortfolios = value;
  },

  setDeepCopyAnalyzedPortfolios(state, value) {
    let buff = [];
    let data = value;
    for (let obj of data) {
      let clone = {}; // Создаем новый пустой объект
      for (let prop in obj) {
        // Перебираем все свойства копируемого объекта
        if (obj.hasOwnProperty(prop)) {
          clone[prop] = obj[prop];
        }
      }
      buff.push(clone);
    }
    state.analyzedPortfolios = buff;
  },

  setDeepCopySelectedCoinList(state, value) {
    let buff = [];
    let data = value;
    for (let obj of data) {
      let clone = {}; // Создаем новый пустой объект
      for (let prop in obj) {
        // Перебираем все свойства копируемого объекта
        if (obj.hasOwnProperty(prop)) {
          clone[prop] = obj[prop];
        }
      }
      buff.push(clone);
    }
    state.selectedCoinList = buff;
  },

  //------------------------------selectedCoinList

  setUpdateSelectedCoinList1(state, value) {
    let buff_data = state.selectedCoinList;
    for (let item of buff_data) {
      item.percent = parseFloat(value[item.title]);
    }
    state.selectedCoinList = buff_data;
  },

  setUpdateSelectedCoinAccumulation(state, value) {
    let buff_data = state.selectedCoinList;
    for (let item of buff_data) {
      item.piece_of_coin = value.piece_of_coin;
    }
    state.selectedCoinList = buff_data;
  },

  setUpdateAllVariablesInItemFromSelectedCoinList(state, value) {
    // console.log(value);
    let temp = state.selectedCoinList;
    // console.log(temp);
    let all_variable_name = Object.keys(value);
    for (let item of temp) {
      if (item.title == value.title) {
        for (let variable of all_variable_name) {
          item[variable] = value[variable];
        }
      }
    }
    // console.log(temp);
    state.selectedCoinList = temp;
  },

  setUpdateSelectedCoinList2(state, value) {
    let temp = state.selectedCoinList;
    for (let item of temp) {
      if (item.title == value.title) {
        item.percent = parseFloat(value.percent);
      }
    }
    state.selectedCoinList = temp;
  },

  setDellItemInSelectedCoinList(state, value) {
    state.selectedCoinList = state.selectedCoinList.filter(item => {
      if (item.id_coin != value) return item;
    });
  },

  setAddItemInSelectedCoinList(state, value) {
    let buff = state.selectedCoinList;
    buff.push(value);
    state.selectedCoinList = buff;
  },

  setAllSelectedCoinList(state, value) {
    state.selectedCoinList = value;
  },

  // ---------------Portfolio coin

  setPercentPortfolioCoinList(state, type) {
    let percent = 0;
    try {
      for (let item of state[type]) {
        percent += parseFloat(item.percent) || 0;
      }
    } catch (error) {
      percent = 0;
    }
    if (type == 'portfolioCoinList') {
      state.percentPortfolioCoinList = Math.round(percent * 100) / 100;
    }
    if (type == 'analyzedPortfolios') {
      state.percentAnalyzedPortfolios = Math.round(percent * 100) / 100;
    }
    if (type == 'selectedCoinList') {
      state.percentSelectedCoinList = Math.round(percent * 100) / 100;
    }
  },

  setUpdatePortfolioCoinList1(state, value) {
    let buff_data = state.portfolioCoinList;
    for (let item of buff_data) {
      item.percent = parseFloat(value[item.title]);
    }
    state.portfolioCoinList = buff_data;
  },

  setUpdateSelectedCoinAccumulation(state, value) {
    let buff_data = state.portfolioCoinList;
    for (let item of buff_data) {
      item.piece_of_coin = value.piece_of_coin;
    }
    state.portfolioCoinList = buff_data;
  },

  setUpdateAllVariablesInItemFromPortfolioCoinList(state, value) {
    // console.log(value);
    let temp = state.portfolioCoinList;
    // console.log(temp);
    let all_variable_name = Object.keys(value);
    for (let item of temp) {
      if (item.title == value.title) {
        for (let variable of all_variable_name) {
          item[variable] = value[variable];
        }
      }
    }
    // console.log(temp);
    state.portfolioCoinList = temp;
  },

  setUpdatePortfolioCoinList2(state, value) {
    let temp = state.portfolioCoinList;
    for (let item of temp) {
      if (item.title == value.title) {
        item.percent = parseFloat(value.percent);
      }
    }
    state.portfolioCoinList = temp;
  },

  setDellItemInPortfolioCoinList(state, value) {
    state.portfolioCoinList = state.portfolioCoinList.filter(item => {
      if (item.id_coin != value) return item;
    });
  },

  setSecretToken(state, value) {
    state.secretToken = value;
  },

  setOptionsForDashboard(state, value) {
    state.optionsForDashboard = value;
  },

  setShortRMPortfolioList(state, value) {
    state.short_rm_portfolio_list = value;
  },

  setDellItemInStopList(state, value) {
    // state.portfolioCoinList = state.portfolioCoinList.filter(item => {
    //   if (item.id_coin != value) return item;
    // });
    for (let item of state.portfolioCoinList) {
      if (item.id_coin == value) {
        item.rebalance = !item.rebalance;
      }
    }
  },

  setAddItemInPortfolioCoinList(state, value) {
    let buff = state.portfolioCoinList;
    buff.push(value);
    state.portfolioCoinList = buff;
  },

  setAllPortfolioCoinList(state, value) {
    state.portfolioCoinList = value;
  },

  // set info from backend setSelectedCoinList
  // ---------------
  // Dashboard
  setIdActivePortfolio(state, value) {
    state.idActivePortfolio = value;
  },

  setUserMarketList(state, value) {
    state.userMarketsList = value;
  },

  setUserMarketBalanceList(state, value) {
    state.userMarketsBalanceList = value;
  },

  setShortStatisticsData(state, value) {
    state.shortStatisticsData = value;
  },

  setBalance(state, value) {
    state.balance = value;
  },

  setPortfel(state, value) {
    state.portfels = value;
  },

  setDataGrafForAllTime(state, value) {
    state.dataGrafForAllTime = value;
  },

  setDataGrafForDay(state, value) {
    state.dataGrafForDay = value;
  },

  setDataGrafForMonth(state, value) {
    state.dataGrafForMonth = value;
  },

  setDataGrafForYear(state, value) {
    state.dataGrafForYear = value;
  },

  setPortfelCoinList(state, value) {
    state.portfelCoinList = value;
  },

  setRMPortfelCoinList(state, value) {
    state.rmPortfelCoinList = value;
  },

  setShortPortfolioList(state, value) {
    state.shortPortfolioList = value;
  },

  setBestReadeMadePortfolio(state, value) {
    state.bestReadeMadePortfolio = value;
  },

  setReadyMadePortfolioList(state, value) {
    state.readyMadePortfolioList = value;
  },

  setNewPortfolio(state, value) {
    // массив всех монет с привязкой к бирже
    state.newPortfolio = value;
  },

  setActiveMarket(state, value) {
    state.activeMarket = value;
  },

  setRMPortfelDataGrafForAllTime(state, value) {
    state.dataRMPortfelGrafForAllTime = value;
  },

  setRMPortfelDataGrafForDay(state, value) {
    state.dataRMPortfelGrafForDay = value;
  },

  setRMPortfelDataGrafForMonth(state, value) {
    state.dataRMPortfelGrafForMonth = value;
  },

  setRMPortfelDataGrafForYear(state, value) {
    state.dataRMPortfelGrafForYear = value;
  },

  setReadyMadePortfolioId(state, value) {
    state.readyMadePortfolioId = value;
  },

  setReadyMadePortfolioShortData(state, value) {
    state.readyMadePortfolioShortData = value;
  },

  setSubscribers(state, value) {
    state.subscribers = value;
  },

  setDescriptions(state, value) {
    state.descriptions = value;
  },

  setFavorite(state, value) {
    state.favorite = value;
  },

  setIdRmPortfolio(state, value) {
    state.idRmPortfolio = value;
  },

  setMarketIndex(state, value) {
    state.marketIndex = value;
  },

  setBalanceChosenMarket(state, value) {
    state.balanceChosenMarket = value;
  },

  //  Correlation matrix in analis new portfolio
  setCorrelationDataForThreeMounth(state, value) {
    state.correlationDataForThreeMounth = value;
  },

  setCorrelationDataForSixMounth(state, value) {
    state.correlationDataForSixMounth = value;
  },

  setCorrelationDataForYear(state, value) {
    state.correlationDataForYear = value;
  },

  setCorrelationDataForTwoYear(state, value) {
    state.correlationDataForTwoYear = value;
  },

  setOptimalNewPortfolio(state, value) {
    state.optimalNewPortfolio = value;
  },

  setEfficientFrontierStatisticsData(state, value) {
    state.efficientFrontierStatisticsData = value;
  },

  clearEfficientFrontierStatisticsData(state, value) {
    state.efficientFrontierStatisticsData = value;
  },

  clearEfficientFrontierStatisticsData(state) {
    state.efficientFrontierStatisticsData = {
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
    };
  },

  setPoolWeightEfficientFrontier(state, value) {
    state.poolWeightEfficientFrontier = value;
  },

  clearPoolWeightEfficientFrontier(state, value) {
    state.poolWeightEfficientFrontier = {
      portfel_max_variance_port: [],
      portfel_sharpe_portfolio: [],
      portfel_min_variance_port: []
    };
  },

  // Correlation matrix
  setBigCorrelationData(state, value) {
    state.bigCorrelationData = value;
  },

  setBigCorrelationDataForThreeMounth(state, value) {
    state.bigCorrelationDataForThreeMounth = value;
  },

  setBigCorrelationDataForSixMounth(state, value) {
    state.bigCorrelationDataForSixMounth = value;
  },

  setBigCorrelationDataForYear(state, value) {
    state.bigCorrelationDataForYear = value;
  },

  setBigCorrelationDataForTwoYear(state, value) {
    state.bigCorrelationDataForTwoYear = value;
  },

  setWhiteListForMarkets(state, value) {
    /*
    is_uploaded: false,
    data:{
      Binance:[
      {}],
      .....
      HitBTC:[
      {}]
    }
    */
    state.whiteListForMarkets.data = value;
    state.whiteListForMarkets.is_uploaded = true;
  },

  /*EfficientFrontierParameters*/
  setBigPoolWeightEfficientFrontier(state, value) {
    state.bigPoolWeightEfficientFrontier = value;
  },

  clearBigPoolWeightEfficientFrontier(state) {
    state.bigPoolWeightEfficientFrontier = {
      portfel_max_variance_port: [],
      portfel_sharpe_portfolio: [],
      portfel_min_variance_port: []
    };
  },

  setBigStatisticDataEfficientFrontier(state, value) {
    state.bigStatisticDataEfficientFrontier = value;
  },

  cleatBigStatisticDataEfficientFrontier(state) {
    state.bigStatisticDataEfficientFrontier = {
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
    };
  },

  /*BackTest*/
  setPoolBackTest(state, value) {
    state.poolBackTest = value;
  },

  setDataGraphPerformanceBackTestUsd(state, value) {
    state.dataGraphPerformanceBackTestUsd = value;
  },

  setDataGraphPerformanceBackTestBtc(state, value) {
    state.dataGraphPerformanceBackTestBtc = value;
  },

  setDataGraphDeviation(state, value) {
    state.dataGraphDeviation = value;
  },

  setTimestampGraph(state, value) {
    state.timestampGraph = value;
  },

  setTableDataBackTest(state, value) {
    state.tableDataBackTest = value;
  },

  setFullStaticDataBackTest(state, value) {
    state.fullStaticDataBackTest = value;
  },

  setTest(state, value) {
    state.test = value;
  },

  setTestForOneItem(state, value) {
    state.test[value.id] = value;
  },

  delTestForOneItem(state, value) {
    delete state.test[value.id];
  },

  updateTestForOneItem(state, value) {
    state.test[value.id].percent = parseFloat(state.test[value.id].percent);
  },

  // ребаланс
  setLastRebalanceDate(state, value) {
    state.lastRebalanceDate = value;
  },

  setRebalanceOptions(state, value) {
    state.rebalanceOptions = value;
  },

  setIsRequestActivationNewPortfolioDone(state) {
    state.isDoneRequestActivationNewPortfolio = !state.isDoneRequestActivationNewPortfolio;
  },

  setIsSaveOptionButtom(state) {
    state.isSaveOptionButtom = !state.isSaveOptionButtom;
  },

  setSaveActivatePortfolio(state) {
    state.isSaveOptionButtomInActivatePortfolio = !state.isSaveOptionButtomInActivatePortfolio;
  },

  setIsChangePortfolioList(state) {
    state.isChangePortfolioList = !state.isChangePortfolioList;
  },

  setIsLoadsSavedPortfolio(state) {
    state.isLoadsSavedPortfolio = !state.isLoadsSavedPortfolio;
  },

  setIsChangeAndRebalansePortfolioList(state) {
    state.isChangeAndRebalansePortfolioList = !state.isChangeAndRebalansePortfolioList;
  },

  //загрузка бэкапа и сохраненного портфеля
  setBackupPortfolios(state, value) {
    state.backupPortfolios = value;
  },

  setSavedPortfolios(state, value) {
    state.savedPortfolios = value;
  },

  setIsShowItemFlagShortEffectiveMargin(state, value) {
    state.is_show_item_flag_short_effective_margin = value;
  },

  setTempSeriesShortEffectiveMargin(state, value) {
    state.tempSeriesShortEffectiveMargin = value;
  },

  clearTempSeriesShortEffectiveMargin(state) {
    state.tempSeriesShortEffectiveMargin = [];
  },

  setOnPathInNewPortfolio(state) {
    state.isPathOnNewPortfolio = true;
  },

  setOffPathInNewPortfolio(state) {
    state.isPathOnNewPortfolio = false;
  },

  setOnPathInDashboard(state) {
    state.isPathOnDashboard = true;
  },

  setOffPathInDashboard(state) {
    state.isPathOnDashboard = false;
  },

  setParamsBacktestTimeFilter(state, data) {
    /*
    data = {
      key:key,
      value:value
    }  
    */
    state.paramsBacktestTimeFilter = data;
  },

  changeParamsBacktestTimeFilter(state, data) {
    /*
    data = {
      key:key,
      value:value
    }  
    */
    state.paramsBacktestTimeFilter[data.key] = data.value;
  },

  clearParamsBacktestTimeFilter(state) {
    state.paramsBacktestTimeFilter = {
      threshold_rebalance: '0',
      rebalance_time_period: 1,
      rebalance_period: 'day'
    };
  },

  setParamsActivatePortfolioTimeFilter(state, value) {
    state.paramsActivatePortfolioTimeFilter = value;
  },

  copyOptionsBacktestTimeFilterFromActivatePortfolio(state) {
    // console.log('copyOptionsBacktestTimeFilterFromActivatePortfolio');
    state.paramsBacktestTimeFilter = {
      threshold_rebalance:
        state.paramsActivatePortfolioTimeFilter.threshold_rebalance,
      rebalance_time_period:
        state.paramsActivatePortfolioTimeFilter.rebalance_time_period,
      rebalance_period: state.paramsActivatePortfolioTimeFilter.rebalance_period
    };
  },

  copyOptionsActivatePortfolioFilterFromBacktestTime(state) {
    state.paramsActivatePortfolioTimeFilter = {
      threshold_rebalance: state.paramsBacktestTimeFilter.threshold_rebalance,
      rebalance_time_period:
        state.paramsBacktestTimeFilter.rebalance_time_period,
      rebalance_period: state.paramsBacktestTimeFilter.rebalance_period
    };
  },

  setOnLoadPortfolioButton(state) {
    state.loadPortfolioButton = true;
  },

  setOffLoadPortfolioButton(state) {
    state.loadPortfolioButton = false;
  },

  setDeletedPortfolio(state, value) {
    state.deletedPortfolio = value;
  },

  setIdSavedPortfolioUsedInDashboard(state, value) {
    state.idSavedPortfolioUsedInDashboard = value;
  },

  setMarketSavedPortfolioUsedInDashboard(state, value) {
    state.marketSavedPortfolioUsedInDashboard = value;
  },

  setReadyMadeInfo(state, value) {
    state.readyMadeInfo = value;
  },

  setFaq(state, value) {
    state.faq = value;
  },

  setSeriesEffectiveMargin(state, value) {
    state.seriesEffectiveMargin = value;
  },

  setNewIdSavedBacktest(state, value) {
    state.newIdSavedBacktest = value;
  },

  delNewIdSavedBacktest(state) {
    state.newIdSavedBacktest = null;
  },

  setNewIdSavedEffectiveMargin(state, value) {
    state.newIdSavedEffectiveMargin = value;
  },

  delNewIdSavedEffectiveMargin(state) {
    state.newIdSavedEffectiveMargin = null;
  },

  setIsPublishedReadyMadeInfo(state, value) {
    state.readyMadeInfo['is_published'] = value;
  },

  deleteShortPortfolioFromList(state, value) {
    state.shortPortfolioList = state.shortPortfolioList.filter(item => {
      if (item.id != value) return item;
    });
  },
  // ПИИсЬма
  uploadTodayMailStack(state, value) {
    state.messagePack.today_mail_stack = value;
  },

  uploadYesterdayMailStack(state, value) {
    state.messagePack.yesterday_mail_stack = value;
  },

  uploadWeeklyMailStack(state, value) {
    state.messagePack.weekly_mail_stack = value;
  },

  uploadMounthMailStack(state, value) {
    state.messagePack.mounth_mail_stack = value;
  },

  clearStore(state) {
      state.auth= false // новая, для авторизации
      state.email_log= null
      state.pass_log= null
      state.activeHistoryMessage= null
      state.landingData= null
      state.listOrderActiveMessages= null
      state.timer= 0
      state.count_dont_viewed= 0
      state.qr_code= null
      state.secret_token= null
      state.secretToken= null
      state.confirm_code= null
      state.isMenuVisible= false
      state.isFullPreload= false
      state.popup= null
      state.addAsset= null
      state.addAsset2= null
      state.removeAsset= 0
      state.balance= null
      state.porfels= null
      state.cronsMaskForFilterGrafs= null
      state.short_rm_portfolio_list = {
        hight_risk: [],
        medium_risk: [],
        low_risk: []
      }
      state.laterMessage= null
      state.messagePack= {
        today_mail_stack: null,
        yesterday_mail_stack: null,
        weekly_mail_stack: null,
        mounth_mail_stack: null
      }
      state.dataGraphRMPortfolio= {
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
      }
      state.optionsRMPortfolio= {
        porog: null,
        cron: null,
        period: null,
        rebalance_count: null,
        profitable_days: null,
        correlations: null
      }
      state.optionsForDashboard= {
        threshold: null,
        time: null,
        interval: null
      }
      state.activeEmailReg=null
      state.showButtomConnect= true
      // header
      state.activePortfelCoinList= []
      state.portfolioInformations= {
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
      }
      state.userMarketList= []
      // dashboard
      state.userMarketsBalanceList= ['0']
      state.userMarketsList= ['All']
      state.selectedCoinList= [] //список монет для их редактирования
      state.rebalanceCoinList= [] //список монет для страницы ребаланс
      state.portfelCoinList= [
        {
          name: '',
          market: {
            market_title: '',
            market_id: '0'
          },
          values: []
        }
      ]
      state.portfelList= []
      state.shortStatisticsData =  {
        totalreturn: '0',
        portfoliovalue: '0',
        maxdrawndawn: '0'
      }
      state.shortPortfolioList = []
      state.marketConnectData = {
        key: '',
        secret: '',
        password: ''
      }
      state.paymantData = null
      state.tempSeriesShortEffectiveMargin = []
      state.is_show_item_flag_short_effective_margin = false
      state.name_portfolio = null
      state.bestReadeMadePortfolio =  null
      state.isFlagPortfolioUpdate= false
      state.newPortfolio= []
      state.transactions= []
      state.readyMadePortfolioList= []
      state.idActivePortfolio= 'all'
      state.readyMadePortfolioId= '0'
      state.subscribers= '0'
      state.descriptions= ''
      state.idRmPortfolio= '0'
      state.favorite= false
      state.rmPortfelCoinList= []
      state.balanceChosenMarket= 0
      state.analyzedPortfolios= [] // Список монет при создании нового портфел
      state.backupAnalyzedPortfolios= []
      state.optimalNewPortfolio= []
      state.flagRequest= false

      state.dataGraphDeviation= []
      state.poolBackTest= []
      state.dataGraphPerformanceBackTestUsd= []
      state.dataGraphPerformanceBackTestBtc= []
      state.timestampGraph= []
      state.tableDataBackTest= []
      state.rebalanceEditPortfolioPercent= []
      state.portfolioCoinList= []
      state.activeRebalancePortfolio= []
      state.test= {}
      state.newIdSavedEffectiveMargin= null
      state.newIdSavedBacktest= null
      state.idActiveSavedPortfels= null
      state.lastRebalanceDate= ''
      state.isSaveOptionButtom= true
      state.isSaveOptionButtomInActivatePortfolio= true
      state.isChangePortfolioList= true
      state.isLoadsSavedPortfolio= true
      state.isChangeAndRebalansePortfolioList= true
      state.isPathOnNewPortfolio= true
      state.isPathOnDashboard= false
      state.percentPortfolioCoinList= 0
      state.percentAnalyzedPortfolios= 0
      state.percentSelectedCoinList= 0
      state.messageSuccess= ''
      state.messageError= ''
      state.isDoneRequestActivationNewPortfolio= false
      state.idSavedNewPortfolio= null
      state.loadPortfolioButton= false
      
      state.flagShowEffectiveMargin= false
      
      state.backupRebalancePortfolios= []
      state.idSavedPortfolioUsedInDashboard= null
      state.marketSavedPortfolioUsedInDashboard= null
      state.faq = []
      state.readyMadePortfolioShortData = {
        portfel_name: '',
        isDefault: true
      }
      state.marketIndex = {
        day: { market_index: '0' },
        year: { market_index: '0' },
        month: { market_index: '0' }
      }
      state.paymentInfo = {
        balance: '0',
        date_end_vip: null
      }
      state.companyInfo = {
        name: null,
        vat_number: null,
        country: null,
        address: null,
        city: null,
        postal: null
      }
      state.referralInfo = {
        invait: 0,
        free_mounth: 0
      }
      state.userInfo = {
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
      }
      state.readyMadeInfo = {
        is_owner_portfolio: true,
        is_private: false,
        is_published: false
      }
      state.activeMarket = {
        market_title: 'all',
        market_id: '0',
        portfel_id: '0',
        balance: null
      }
      state.backupPortfolios = {
        date: [],
        events: []
      }
      state.savedPortfolios = {
        name: [],
        coins: []
      }
      state.correlationDataForThreeMounth = {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      }
      state.correlationDataForSixMounth = {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      }
      state.correlationDataForYear = {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      }
      state.correlationDataForTwoYear = {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      }
      state.efficientFrontierStatisticsData = {
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
      }
      state.poolWeightEfficientFrontier = {
        portfel_max_variance_port: [],
        portfel_sharpe_portfolio: [],
        portfel_min_variance_port: []
      }
      state.bigCorrelationData = {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      }
      state.bigCorrelationDataForThreeMounth = {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      }
      state.bigCorrelationDataForSixMounth = {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      }
      state.bigCorrelationDataForYear = {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      }
      state.bigCorrelationDataForTwoYear = {
        cor_for_one_coin: [],
        data_for_chart: [],
        average: 0,
        is_default: true
      }
      state.bigPoolWeightEfficientFrontier = {
        portfel_max_variance_port: [],
        portfel_sharpe_portfolio: [],
        portfel_min_variance_port: []
      }
      state.bigStatisticDataEfficientFrontier = {
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
      }
      state.fullStaticDataBackTest = {
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
      }
      state.rebalanceOptions = {
        pdate: '',
        porog: '',
        cron: '',
        bPorog: '',
        coef_rebalance: '',
        cripto_index: '',
        cripto_index_data: ''
      }
      state.paramsBacktestTimeFilter = {
        threshold_rebalance: '0',
        rebalance_time_period: 1,
        rebalance_period: 'day'
      }
      state.paramsActivatePortfolioTimeFilter = {
        threshold_rebalance: '0',
        rebalance_time_period: 1,
        rebalance_period: 'day'
      }
      state.deletedPortfolio = {
        market: {
          market_id: '',
          market_title: '',
          type_loads_portfolio: 'saved'
        }
      }
      state.seriesEffectiveMargin = [
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
      ]
      state.dataGrafForAllTime = {
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
      }
      state.dataGrafForDay = {
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
      }
      state.dataGrafForMonth = {
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
      }
      state.dataGrafForYear = {
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
      }
      state.whiteListForMarkets = {
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
      }

      state.dataRMPortfelGrafForAllTime = {
        graf: [],
        return_persent_time_stamp: 0,
        return_drawdown_time_stamp: 0
      }
      state.dataRMPortfelGrafForDay = {
        graf: [],
        return_persent_time_stamp: 0,
        return_drawdown_time_stamp: 0
      }
      state.dataRMPortfelGrafForMonth = {
        graf: [],
        return_persent_time_stamp: 0,
        return_drawdown_time_stamp: 0
      }
      state.dataRMPortfelGrafForYear = {
        graf: [],
        return_persent_time_stamp: 0,
        return_drawdown_time_stamp: 0
      }
  }
};
