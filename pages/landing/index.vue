<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import Header from '~/components/landing/Header';
import LandingFooter from '~/components/landing/LandingFooter';
import ReadyMadeCard from '~/components/landing/ReadyMadeCard';
import PhoneSwiper from '~/components/landing/PhoneSwiper';
import PhoneSwiper2 from '~/components/landing/PhoneSwiper2';
import Socnets from '~/components/socnets/Socnets';
import landingReadyMadeCards from '~/assets/data/landing-ready-made-cards.json';
import landingRebalancePortfolio from '~/assets/data/landing-rebalance-portfolio.json';
import LandingUpgradePopup from '~/components/content/LandingUpgradePopup';
import MobileMenu from '~/components/landing/MobileMenu';

export default {
  layout: 'landing',
  components: {
    ReadyMadeCard,
    Socnets,
    Header,
    LandingFooter,
    PhoneSwiper,
    PhoneSwiper2,
    LandingUpgradePopup,
    MobileMenu
  },
  data() {
    return {
      landingReadyMadeCards,
      landingRebalancePortfolio,
      options: {
        //Навигация
        anchors: [
          'cryptoportfolio',
          'crypto-portfolio-optimization',
          'crypto-rebalancing-bot',
          'cryptocurrency-exchanges',
          'crypto-community',
          'backtest-crypto',
          'page7'
        ],
        licenseKey: 'BD248322-9EB841BD-B1C411E9-DD1AD436',
        navigation: true,
        navigationPosition: 'left',
        showActiveTooltip: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        //Скроллинг
        // css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        scrollOverflow: true,

        //Design
        animateAnchor: true,
        controlArrows: false,

        sectionSelector: '.section',
        slideSelector: '.slide'
      },
      show: true
    };
  },
  computed: {
    ...mapState('page', ['popup', 
    'isMenuVisible', 
    'landingData', 
    'bestReadeMadePortfolio']),

    best_reade_made_portfolio_info: {
      // """return best ReadeMade Portfolio from store"""
      get() {
        return this.bestReadeMadePortfolio;
      }
    }
  },
  watch: {
    isMenuVisible: function(val) {
      this.$refs.fullpage.api.setAllowScrolling(!val);
    }
  },
  mounted() {
    this.getLandingData();
    
    window.onload = function() {
      this.show = true;
    };
    
  },
  methods: {
    ...mapMutations('page', ['setPopup', 'setIsMenuVisible']),
    
    ...mapActions('page', ['getLandingData']),
    
    goto(id) {
      console.log(this.$refs.fullpage.api);
      this.$refs.fullpage.api.moveTo(id);
    }
  }
};
</script>

<template>
  <div class="fp-responsive">
    <div class="overflow">
      <div class="container">
        <MobileMenu class="mobile-menu-landing"/>
      </div>
    </div>
    

    <no-ssr>
      <full-page 
        id="fullpage" 
        ref="fullpage" 
        :options="options">
        
        <div class="content">
          
          <div 
            id="first-slide" 
            class="section">
            <div 
              id="first" 
              class="content-block content-block__first">
              
              <div class="container">
                <Header 
                  class="desktop-menu-landing"
                />
                
                <div 
                  class="content-block__first-left" 
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  v-animate-css="'fadeIn'">
                  <BaseLandingHeadline
                  
                    class="landing-headlinet"
                    title="Welcome HOLDER to your"
                    title_orange="crypto PoRTFOLIO LAB"
                    subtitle="GET YOUR CRYPTO PORTFOLIO READY IN 5 MINUTES"
                  />
                
                  <div class="landing-headline__text">
                    <span class="orange">Holderlab</span> is a fully automated
                    <span class="orange">Bitcoin cryptocurrency portfolio</span> management laboratory. Analyzes the
                    <span class="orange">cryptocurrencies correlation</span>,
                    searching for the
                    <span 
                      class="orange"
                    >optimal cryptocurrency portfolio weights.</span
                    >
                    Uses <span class="orange">crypto trading bots</span> and the
                    <span 
                      class="orange"
                    >automated efficient cryptocurrency portfolio index</span
                    >
                    and more.
                  </div>
                  
                  <BaseButton
                    class="landing-btn"
                    to="/landing-modal/welcome"
                    type="orange">
                    GET STARTED FREE
                  </BaseButton>
                </div>
                
                <div 
                  class="content-block__first-img"
                  data-aos="fade-left"
                  data-aos-duration="1500">
                  <img 
                    src="/img/holderlab.svg" 
                    alt="">
                </div>
                
              </div>
            </div>
          </div>

          <div class="section">
            <div 
              id="second" 
              class="content-block content-block__second">
              <div class="container">
                
                <Header 
                  class="desktop-menu-landing" 
                  data-aos="fade-down"
                  data-aos-duration="1500"/>
                
                <div class="content-block-items">
                  
                  <div 
                    class="content-block-items__left" 
                    data-aos="fade-right"
                    data-aos-duration="1500">
                    <BaseLandingHeadline
                      class="landing-headline"
                      subtitle="FIND YOUR ASSETS WEIGHTS EASILY"
                      title="Find optimal assetS weights"
                      title_orange="with efficient frontier tool"
                    />
                    <div class="landing-headline__text">
                      Holderlab analyzes from
                      <span class="orange">5,000 to 50,000 portfolios</span> in
                      search of an
                      <span 
                        class="orange"
                      >optimal cryptocurrency portfolio.</span
                      >
                      <br >
                      You can find the optimal weights of your cryptocurrency
                      portfolio with an efficient frontier tool.
                    </div>
                    
                    <BaseButton
                      class="content-block__second-btn desktop"
                      to="/landing-modal/welcome"
                      type="orange"
                    >
                      GET STARTED FREE
                    </BaseButton>
                
                  </div>

                  <div 
                    data-aos="fade-left" 
                    data-aos-duration="1500" 
                    class="content-block-items__right" 
                  >
                    <img 
                      class="phone-desktop" 
                      src="/img/phone-bg.png" 
                      alt="" >

                    <div class="slide-container">
                      <PhoneSwiper class="swiper-desktop" />
                      <!--<PhoneSwiper2 class="swiper-mobile"/>-->
                    </div>
                  </div>
                  
                </div>
                
                <BaseButton
                  class="content-block__second-btn mobile"
                  to="/landing-modal/welcome"
                  type="orange"
                >
                  GET STARTED FREE
                </BaseButton>
                
              </div>
            </div>
          </div>

          <div class="section">
            <div 
              id="third" 
              class="content-block content-block__third">
              <div class="container">
                
                <Header 
                  class="desktop-menu-landing" 
                  data-aos="fade-down"
                  data-aos-duration="1500"/>
                
                <div class="content-block-items">
                  <div 
                    class="content-block-items__left"
                    data-aos="fade-right"
                    data-aos-duration="1500">
                    <BaseLandingHeadline
                      class="landing-headline"
                      subtitle="STRATEGIC WEAPON OF YOUR PORTFOLIO"
                      title="Automatic"
                      title_orange="Asset Rebalancing"
                    />

                    <div class="landing-headline__text">
                      Create your own rebalancing strategy. You can choose a
                      <span class="orange">calendar rebalancing</span> by
                      setting time period, or rebalancing by deviation by
                      selecting
                      <span class="orange">threshold rebalancing</span>, or use
                      they together! Holderlab have one of the
                      <span 
                        class="orange"
                      >most largest Bitcoin cryptocurrency base</span
                      >
                      for crypto trading. Holderlab save more than 336 hours on
                      manual rebalancing of assets annually.
                    </div>
                    
                    <BaseButton 
                      class="landing-btn desktop" 
                      to="/landing-modal/welcome" 
                      type="orange">
                      REBALANCE NOW
                    </BaseButton>
                    
                  </div>

                  <div 
                    class="content-block-items__right" 
                    data-aos="fade-left"
                    data-aos-duration="1500">
                    <div
                      v-for="(item, index) in landingData"
                      :key="index"
                      :title="item.title"
                      :price="item.now"
                      :change="item.change"
                      :image="item.url"
                      :class="{ is_active: index === 0 }"
                    >
                      <div :class="item.class">
                        <div class="bytecoin-items">
                          <div class="bytecoin-items__name">
                            {{ item.title }}
                          </div>
                          <div class="bytecoin-items__price">
                            {{ item.price }}
                          </div>
                          <div
                            :class="[
                              item.change.charAt(0) === '-'
                                ? 'bytecoin-items__change-red'
                                : 'bytecoin-items__change-green'
                            ]"
                            class="bytecoin-items__change"
                          >
                            {{ item.change }}%
                          </div>
                        </div>
                        <img 
                          :src="item.image" 
                          alt="" >
                      </div>
                    </div>
                  </div>
                  
                  <!--<BaseButton -->
                  <!--  class="landing-btn mobile" -->
                  <!--  to="/landing-modal/welcome" -->
                  <!--  type="orange">-->
                  <!--  REBALANCE NOW-->
                  <!--</BaseButton>-->
                    
                </div>

                
              </div>
            </div>
          </div>

          <div class="section">
            <div 
              id="fourth" 
              class="content-block content-block__fourth">
              <div class="container">
                
                <Header 
                  class="desktop-menu-landing" 
                  data-aos="fade-down"
                  data-aos-duration="1500"/>
                
                <div class="content-block-items">
                  <div 
                    class="content-block-items__left" 
                    data-aos="fade-right"
                    data-aos-duration="1500">
                    <BaseLandingHeadline
                      class="landing-headline"
                      subtitle="FAST CONNECTION WITH YOUR EXCHANGE"
                      title="WE SUPPORT"
                      title_orange="EXCHANGES"
                    />
                    <div class="landing-headline__text">
                      <span 
                        class="orange"
                      >Connect your favorite crypto exchange with API
                      keys.</span
                      >
                      Holderlab.io has handy tools so that you can analyze data
                      from another crypto exchange in one window. We store keys
                      using 256 hash encryption.
                    </div>
                    
                    <BaseButton 
                      class="landing-btn content-block__fourth-btn desktop" 
                      to="/landing-modal/welcome" 
                      type="orange">
                      CONNECT
                    </BaseButton>
                  </div>

                  <div 
                    class="content-block-items__right" 
                    data-aos="fade-left"
                    data-aos-duration="1500">
                    <div class="coin-items">
                      <div class="left-coins">
                        <img 
                          src="/img/coins/binance.png" 
                          alt="" >
                        <img 
                          src="/img/coins/kucoin.png" 
                          alt="" >
                        <img 
                          src="/img/coins/bittrex.png" 
                          alt="" >
                        <img 
                          class="huobi" 
                          src="/img/coins/huobi.png" 
                          alt="" >
                        <img 
                          src="/img/coins/bibox.png" 
                          alt="" >
                      </div>
                      <div class="right-coins">
                        <img
                          class="poloniex"
                          src="/img/coins/poloniex.png"
                          alt=""
                        >
                        <img
                          class="bitfinex"
                          src="/img/coins/bitfinex.png"
                          alt=""
                        >
                        <img
                          class="kraken"
                          src="/img/coins/kraken.png"
                          alt=""
                        >
                        <img
                          class="hitbtc"
                          src="/img/coins/hitbtc.png"
                          alt=""
                        >
                        <img 
                          src="/img/coins/okex.png" 
                          alt="" >
                      </div>
                    </div>

                    <div class="other-text">AND OTHER SOON</div>
                  </div>
                  
                </div>
                
                <BaseButton 
                  class="landing-btn content-block__fourth-btn mobile" 
                  to="/landing-modal/welcome" 
                  type="orange">
                  CONNECT
                </BaseButton>
                
              </div>
            </div>
          </div>

          <!--<div class="section">-->
          <!--  <div -->
          <!--    id="fifth" -->
          <!--    class="content-block content-block__fifth">-->
          <!--    <div class="container">-->
          <!--      <BaseLandingHeadline-->
          <!--        class="landing-headline"-->
          <!--        subtitle="DIFFERENT FILTERS TO FIND BEST CRYPTO PERFORMANCE"-->
          <!--        title="Market scan tool"-->
          <!--        title_orange="SCAN your cryptocurrency"/>-->

          <!--      <div class="landing-headline__text">Find most undervalued cryptocurrencies, look at their past performance and evaluate return of investment.</div>-->

          <!--      <BaseButton-->
          <!--        class="landing-btn content-block__fifth-btn"-->
          <!--        to="/landing-modal/welcome"-->
          <!--        type="orange"-->
          <!--      >-->
          <!--        START SCANING-->
          <!--      </BaseButton>-->
          <!--    </div>-->
          <!--  </div>-->
          <!--</div>-->

          <div class="section ">
            <div 
              id="sixth" 
              class="content-block content-block__sixth">
              <div class="container">
                
                <Header 
                  class="desktop-menu-landing" 
                  data-aos="fade-down"
                  data-aos-duration="1500"/>
                
                <div class="content-block-items">
                  
                  <div 
                    class="content-block-items__left" 
                    data-aos="fade-right"
                    data-aos-duration="1500">
                    <BaseLandingHeadline
                      class="landing-headline"
                      subtitle="REAL PORTFOLIOS SHARE THEIR PERFORMANCE"
                      title="Ready made portfolio"
                    />

                    <div class="landing-headline__text">
                      Join the
                      <span class="orange">cryptocurrency community</span> and
                      look at the composition of most of the
                      <span class="orange">performance portfolios</span>,
                      collected both with the help of the efficient frontier and
                      with various
                      <span class="orange">rebalancing strategies</span>.
                    </div>

                  </div>
                  
                  <div 
                    class="content-block-items__right" 
                    data-aos="fade-left"
                    data-aos-duration="1500">
                    <div class="card-container">
                      <ReadyMadeCard
                        v-for="(item, index) in landingReadyMadeCards"
                        :key="index"
                        :title="item.title"
                        :star="item.star"
                        :text="item.text"
                        :day="item.day"
                        :mon="item.mon"
                        :year="item.year"
                        :link="item.link"
                        :currency="item.currency"
                        :coins="item.coins"
                        class="ready-made-portfolio-card"
                      />
                    </div>
                  </div>
                    
                </div>
                
                <BaseButton 
                  class="landing-btn mobile" 
                  to="/landing-modal/welcome" 
                  type="orange">
                  START ANALYSIS
                </BaseButton>
                
              </div>
            </div>
          </div>

          <div 
            id="section-seventh" 
            class="section">
            <div 
              id="seventh" 
              class="content-block content-block__seventh">
              <div class="container">
                
                <Header 
                  class="desktop-menu-landing" 
                  data-aos="fade-down"
                  data-aos-duration="1500"/>
                
                <div class="content-block-items">
                  <div 
                    class="content-block-items__left" 
                    data-aos="fade-right"
                    data-aos-duration="1500">
                    <BaseLandingHeadline
                      class="landing-headline"
                      subtitle="TEST YOUR CRYPTO PORTFOLIO"
                      title="ALREADY HAS A CRYPTO PORTFOLIO?"
                      title_orange="BACKTEST IT!"
                    />
                    <div class="landing-headline__text">
                      Have you collected your perfect cryptocurrency portfolio?
                      Test it, check its performance over the past period, test
                      different periods of rebalancing and threshold
                      rebalancing.
                    </div>
                    <BaseButton
                      class="landing-btn"
                      to="/landing-modal/welcome"
                      type="orange"
                    >
                      GET STARTED FREE
                    </BaseButton>
                    <span @click="goto(1)">
                      <BaseButton type="default">
                        UP
                      </BaseButton>
                    </span>
                  </div>

                  <div 
                    class="content-block-items__right" 
                    data-aos="fade-left"
                    data-aos-duration="1500">
                    <BaseHelpBanner2
                      class="landing-helper-banner"
                      href="https://docs.holderlab.io/"
                      style="background-image: url(/img/landing-support.png)"
                    >
                      START TODAY with a <br> 7 day free trial! <br> CREDIT CARD NOT <br> REQUIRED
                    </BaseHelpBanner2>
                    <Socnets class="landing-socnets" />
                  </div>
                </div>
                <div class="footer">
                  <LandingFooter 
                    :goto-id="goto" 
                    v-model="id" 
                    class="landing__footer" 
                    data-aos="fade-up"
                    data-aos-duration="1500"/>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
      </full-page>
      <LandingUpgradePopup class="landing-upgrade-popup" />
    </no-ssr>
  </div>
</template>

<style lang="scss">
.desktop {
  display: block;
  @include ifmobile {
    display: none;
  }
}
.mobile {
  display: none;
  @include ifmobile {
    display: block;
    margin: 0 auto;
  }
}
.overflow {
  /*position: absolute;*/
  /*top: 20px;*/
  /*z-index: 100000;*/
}
.mobile-menu-landing {
  display: none;
  @include ifmobile {
    display: block;
  }
}
.container {
  position: relative;
  @include ifdesktop {
    max-width: em(1138px);
    width: 100%;
    margin: 0 auto;
  }
}
.desktop-menu-landing {
  position: absolute;
  top: em(-220px);
  z-index: 1000;
  max-width: em(1138px);
  width: 100%;
  @include ifmobile {
    display: none;
    padding-bottom: 30px;
  }
}
.section {
  position: relative;
}
.content {
  z-index: 900;
  position: relative;
  /*min-height: 100vh;*/
  height: 100%;
  .content-block {
    background-size: cover;
    /*min-height: 100vh;*/
    height: 100%;
  }

  .content-block__first {
    background: url('/img/landing-bg1.svg') no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    padding-top: em(220px);
    padding-bottom: em(269px);
    @include ifmobile {
      text-align: center;
      padding-top: em(100px);
      padding-bottom: em(50px);
      height: 100%;
    }
    .landing-headline {
      margin-bottom: em(30px);
      &__text {
        max-width: 23.125em;
        margin-bottom: em(100px);
      }
      @include ifmobile {
        z-index: 1;
        margin-bottom: em(30px);
      }
    }
    &-img {
      display: block;
      width: em(640px);
      height: em(450px);
      position: absolute;
      right: 0px;
      top: 60px;
      /*background: url('/img/img1.svg') no-repeat center;*/
      background-size: cover;
      img {
        width: 100%;
        height: 100%;
      }
      @include ifmobile {
        display: none;
      }
    }
  }

  .content-block__second {
    background: url('/img/landing-bg2.png') no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    padding-top: em(220px);
    padding-bottom: em(188px);
    height: 100%;
    position: relative;
    @include ifmobile {
      text-align: center;
      padding-top: em(100px);
      padding-bottom: em(50px);
    }
    .content-block-items {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      @include ifmobile {
        flex-wrap: wrap;
      }

      .content-block-items__left {
        width: 100%;
        .landing-headline {
          margin-bottom: em(30px);
          @include ifmobile {
            z-index: 1;
            margin-bottom: em(30px);
          }
        }
      }
      .content-block-items__right {
        position: relative;
        max-width: em(505px);
        width: 100%;
        height: 40em;
        @include ifmobile {
          height: 21em;
        }

        .phone-desktop {
          position: absolute;
          width: 22em;
          right: calc(30% - 11.1em);
          top: 1em;
          @include ifmobile {
            width: 10em;
            right: calc(50% - 5em);
          }
        }

        .slide-container {
          position: relative;
          @include ifdesktop {
            width: 16em;
            height: 25.375em;
            right: calc(-12% - 11.02em);
            top: 10em;
          }

          @include ifmobile {
            width: 10em;
            right: calc(50% - 18.5em);
            top: 5.5em;
          }
          .swiper-desktop {
            width: 100%;
            height: 100%;
            overflow: hidden;
            @include ifmobile {
              // display: none;
            }
            img {
              width: 15em;
              height: 100%;
              -webkit-background-size: cover;
              background-size: cover;
              @include ifmobile {
                width: 7em;
              }
            }
          }
          // .swiper-mobile {
          //   display: none;
          //   width: 100%;
          //   height: 100%;
          //   overflow: hidden;
          //   @include ifmobile {
          //     display: block;
          //   }
          //   img {
          //     /*width: 10em;*/
          //     /*height: 100%;*/
          //     -webkit-background-size: cover;
          //     background-size: cover;
          //   }
          // }
        }
      }
    }
    &-btn {
      @include ifdesktop {
        position: absolute;
        left: 0;
        top: em(530px);
      }
      @include ifmobile {
        position: relative;
      }
    }
  }

  .content-block__third {
    background: url('/img/landing-bg3b.png') no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    padding-top: em(220px);
    padding-bottom: em(90px);
    height: 100%;

    @include ifmobile {
      text-align: center;
      padding-top: em(100px);
      padding-bottom: em(50px);
    }
    .content-block-items {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      @include ifmobile {
        flex-wrap: wrap;
      }
      &__left {
        width: 100%;
        @include ifmobile {
          margin-bottom: em(30px);
        }
        .landing-headline {
          margin-bottom: em(30px);
          @include ifmobile {
            z-index: 1;
            margin-bottom: em(30px);
          }
        }
        .landing-headline__text {
          max-width: em(423px);
        }
      }
      &__right {
        position: relative;
        max-width: em(500px);
        width: 100%;
        @include ifmobile {
          height: 25em;
        }
        .bytecoin {
          text-align: center;
          position: relative;
          .bytecoin-items {
            position: absolute;
            &__name {
              width: 100%;
              font-size: em(10px);
              font-weight: 600;
              color: $black;
              text-transform: uppercase;
            }
            &__price {
              width: 100%;
              font-size: em(14px);
              font-weight: 600;
              color: $black;
            }
            &__change {
              width: 100%;
              font-size: em(16px);
              color: $black;
              &-red {
                color: $red;
              }
              &-green {
                color: $green;
              }
            }
          }
        }
        .bytecoin1 {
          position: absolute;
          left: 5%;
          top: 2%;
          z-index: 10;
          @include ifmobile {
            left: 2%;
            top: -13%;
          }
          .bytecoin-items {
            top: 44%;
            left: 40%;
          }
          img {
            width: em(240px);
            height: em(240px);
          }
        }
        .bytecoin2 {
          position: absolute;
          left: 30%;
          top: 41%;
          z-index: 9;
          @include ifmobile {
            left: 23%;
          }
          .bytecoin-items {
            left: 38%;
            top: 40%;
          }
          img {
            width: em(200px);
            height: em(200px);
          }
        }
        .bytecoin3 {
          position: absolute;
          right: 15%;
          top: 23%;
          @include ifmobile {
            right: 4%;
            top: 20%;
          }
          .bytecoin-items {
            top: 43%;
            left: 28%;
          }
          img {
            width: em(116px);
            height: em(116px);
          }
        }
        .bytecoin4 {
          position: absolute;
          right: 7%;
          top: 44%;
          @include ifmobile {
            top: -10%;
            right: 12%;
          }
          .bytecoin-items {
            right: 19%;
            top: 38%;
            &__change {
              font-size: em(14px);
              line-height: em(28px);
            }
          }
          img {
            width: em(82px);
            height: em(97px);
          }
        }
        .bytecoin5 {
          position: absolute;
          left: 10%;
          bottom: 25%;
          @include ifmobile {
            left: 2%;
            bottom: 33%;
          }
          .bytecoin-items {
            top: 38%;
            left: 26%;
            &__change {
              font-size: em(12px);
              line-height: em(28px);
            }
          }
          img {
            width: em(82px);
            height: em(86px);
          }
        }
      }
    }
  }

  .content-block__fourth {
    background: url('/img/landing-bg4b.png') no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    padding-top: em(220px);
    padding-bottom: em(80px);
    @include ifmobile {
      text-align: center;
      padding-top: em(100px);
      padding-bottom: em(50px);
    }
    .content-block-items {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      max-width: em(1138px);
      // margin-bottom: em(63px);
      @include ifmobile {
        flex-wrap: wrap;
        margin-bottom: 1.9375em;
      }
      &__left {
        width: 100%;
        .landing-headline {
          margin-bottom: em(30px);
          @include ifmobile {
            z-index: 1;
            margin-bottom: em(30px);
            text-align: center;
          }
        }
        .landing-headline__text {
          max-width: em(300px);
          @include ifmobile {
            max-width: 100%;
          }
        }
      }
      &__right {
        max-width: em(507px);
        width: 100%;
        display: flex;
        flex-direction: column;
        @include ifmobile {
          max-width: 16em;
          margin: 0 auto;
        }
        .coin-items {
          width: 100%;
          max-width: em(506px);
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .left-coins {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: em(57px);
            @include ifmobile {
              margin-right: 1.5625em;
            }
            img {
              width: 100%;
              height: auto;
            }
            .huobi {
              margin: em(30px) 0px;
              @include ifmobile {
                margin: 0.875em 0px;
              }
            }
          }
          .right-coins {
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              width: 100%;
              height: auto;
            }
            .poloniex {
              margin-top: 13px;
              margin-bottom: em(64px);
              @include ifmobile {
                margin-top: 5px;
                margin-bottom: 2.2em;
              }
            }
            .bitfinex {
              margin-bottom: em(50px);
              @include ifmobile {
                margin-bottom: 1.525em;
              }
            }
            .kraken {
              margin-bottom: em(41px);
              @include ifmobile {
                margin-bottom: 1.0625em;
              }
            }
            .hitbtc {
              margin-bottom: -15px;
              @include ifmobile {
                margin-bottom: 0;
              }
            }
          }
        }
        .other-text {
          font-size: em(24px);
          color: $white;
          align-self: center;
          margin-top: em(40px);
          @include ifmobile {
            font-size: em(10px);
            margin-top: em(15px);
          }
        }
      }
    }
    &-btn {
      position: absolute;
      bottom: 7.875em;
      @include ifmobile {
        position: relative;
        bottom: em(0px);
      }
    }
  }

  // .content-block__fifth {
  //   background: url('/img/landing-bg5.png') no-repeat;
  //   -webkit-background-size: cover;
  //   background-size: cover;
  //   padding-top: em(220px);
  //   padding-bottom: em(320px);
  //   @include ifmobile {
  //     padding-top: em(100px);
  //     padding-bottom: em(50px);
  //   }
  //   .landing-headline {
  //     margin-bottom: em(30px);
  //     @include ifmobile {
  //       z-index: 1;
  //       margin-bottom: em(30px);
  //     }
  //   }
  //   .landing-headline__text {
  //     max-width: em(365px);
  //     margin-bottom: em(50px);
  //   }
  //   .content-block__fifth-btn {
  //     margin-left: em(368px);
  //     @include ifmobile {
  //       margin-left: 20px;
  //     }
  //   }
  // }

  .content-block__sixth {
    background: url('/img/landing-bg6.png') no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    padding-top: em(220px);
    padding-bottom: em(210px);
    @include ifmobile {
      text-align: center;
      padding-top: em(100px);
      padding-bottom: em(50px);
    }
    .content-block-items {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      @include ifmobile {
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: em(50px);
      }
      &__right {
        .card-container {
          position: relative;
          @include ifmobile {
          }
          .ready-made-portfolio-card {
            margin-top: 45px;
            z-index: 1000;
            border-radius: 10px;
            @include ifmobile {
              width: 15.6875em;
              margin-top: 0px;
            }
          }
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
            border-radius: 10px;
          }
          &::before {
            top: em(8px);
            left: em(8px);
            z-index: 0;
            box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.3);
          }
          &::after {
            top: em(4px);
            left: em(4px);
            z-index: 1;
            box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.3);
          }
        }
      }
    }
    .landing-headline {
      margin-bottom: em(30px);
      @include ifmobile {
        z-index: 1;
        margin-bottom: em(30px);
      }
    }
    .landing-headline__text {
      max-width: em(365px);
    }
  }

  .content-block__seventh {
    background: url('/img/landing-bg7.png') no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    padding-top: em(220px);
    padding-bottom: em(32px);
    @include ifmobile {
      padding-top: em(100px);
      // background: url('/img/landing-bg7-m.png') no-repeat;
    }
    .content-block-items {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: em(70px);
      @include ifmobile {
        flex-wrap: wrap;
        text-align: center;
        margin-bottom: 1.375em;
      }
      &__left {
        width: 100%;
        @include ifmobile {
          margin-bottom: em(100px);
        }
        .landing-headline {
          margin-bottom: em(30px);
          @include ifmobile {
            z-index: 1;
            margin-bottom: em(30px);
          }
        }
        .landing-headline__text {
          max-width: em(410px);
          @include ifmobile {
            text-align: center;
          }
        }
        .landing-btn {
          margin-right: em(14px);
        }
      }
      &__right {
        max-width: 263px;
        width: 100%;
        height: auto;
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        justify-content: flex-end;
        @include ifmobile {
          max-width: 100%;
          flex-direction: row;
          justify-content: center;
        }
        .landing-helper-banner {
          width: em(350px);
          height: em(190px);
          margin-bottom: em(32px);
          align-self: center;
        }
        .landing-socnets {
          display: flex;
          flex-direction: row;
          align-self: center;
        }
      }
    }
  }

  .landing-headline__text {
    font-size: em(20px);
    line-height: em(35px);
    color: $white;
    margin-bottom: em(30px);
    @include ifmobile {
      font-size: em(14px);
      margin-left: 20px;
      margin-right: 20px;
      margin-bottom: 50px;
    }
  }

  span.orange {
    color: $light-orange;
  }
}
.fp-slidesNav.fp-bottom {
  bottom: 17px;
  @include ifmobile {
    display: none;
  }
}
#fp-nav {
  margin-left: calc(8% - 40px);
  @include ifmobile {
    display: none;
  }
}
#fp-nav ul li a span,
.fp-slidesNav ul li a span {
  width: em(10px);
  height: em(10px);
  margin: -8px 0 0 -5px;
  border: 1px solid $white;
  background: none;
}
#fp-nav ul li,
.fp-slidesNav ul li {
  margin: em(7px);
}
#fp-nav ul li a.active span,
.fp-slidesNav ul li a.active span,
#fp-nav ul li:hover a.active span,
.fp-slidesNav ul li:hover a.active span {
  width: em(10px);
  height: em(10px);
  margin: -8px 0 0 -5px;
  background: $white;
}

.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: -25%;
  @include ifmobile {
    display: none;
  }
}
.swiper-pagination {
  > .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    border: 1px solid $white;
    background: none;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    opacity: 1;
  }
  > .swiper-pagination-bullet-active {
    background: $white;
  }
}
.swiper-pagination-bullet:hover {
  background: $white;
  width: 10px;
  height: 10px;
}
.swiper-pagination-bullet-active {
  background: $white;
}
</style>


