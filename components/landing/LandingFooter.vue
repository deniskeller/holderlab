<script>
import { mapState, mapMutations } from 'vuex';

import Logo from '~/components/header/Logo';

export default {
  components: {
    Logo
  },

  props: {
    gotoId: {
      type: Function,
      default: () => ''
    }
  },

  data() {
    return {
      id: ''
    };
  },

  maunted: {
    ...mapState('page', ['popup'])
  },

  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>
<template>
  <div class="footer">
    <div class="footer-left">
      <div class="footer-left__title">
        <Logo class="footer-left__title__logo" />
        <div class="footer-left__title__copyright">
          © 2019 HOLDERLAB.IO All rights reserved.
        </div>
      </div>
      
      <div class="footer-left__text">
        By using this website, you understand that the information is provided for
        informational purposes only, and agrees with our
        <a
          target="_blank"
          class="footer-left__text-link"
          href="https://holderlab.io/landing-terms-of-service/"
        >terms of use</a
        >
        and
        <a
          target="_blank"
          class="footer-left__text-link"
          href="https://holderlab.io/landing-privacy-policy/"
        >privacy policy</a
        >. This website does not provide any financial, investment advice, legal
        or tax advice. The user should not rely on any advice or information
        contained on this website. Any recommendations or advice on this web site are general and have not been prepared specifically for you. When making any decision, this website does not recommend buying or selling cryptocurrency or other assets. Before making any decision, we recommend that you contact or engage in any trade or investment, the user should seek advice from a financial, tax, legal or other professional experts in the desired field.
      </div>
      
    </div>
    
    <div class="footer-right">
      
      <Logo class="footer-right__mobile-logo" />
      
      <div class="footer-right-item">
        <div class="footer-right-item__title">ADVANTAGES</div>
        
        <span
          class="footer-right-item__link"
          @click="gotoId(2)">
          PORTFOLIO OPTIMIZATION
        </span>
        
        <span 
          class="footer-right-item__link"
          @click="gotoId(3)">
          cryptocurrency portfolio rebalancing
        </span>
        
        <span 
          class="footer-right-item__link"
          @click="gotoId(3)">
          READY-made portfolios
        </span>
        
        <a
          target="_blank"
          href="https://docs.holderlab.io/knowledge-base/cryptocurrency-backtesting-platform/"
          class="footer-right-item__link"
        >
          Backtest portfolio
        </a>
        
        <a
          target="_blank"
          href="https://docs.holderlab.io/knowledge-base/cryptocurrency-correlation-matrix/"
          class="footer-right-item__link">
          CRYPTOCURRENCY CORRELATION MATRIX
        </a>
        
        <a
          target="_blank"
          href=""
          class="footer-right-item__link">
          CRYPTO INDEX
        </a>
        
      </div>
      
      <div class="footer-right-item">
        <div class="footer-right-item__title">RESOURCES</div>
        
        <a
          target="_blank"
          href="https://docs.holderlab.io/article-categories/getting-started/"
          class="footer-right-item__link">
          GETTING STARTED
        </a>
        
        <a 
          target="_blank"
          href="https://docs.holderlab.io/article-categories/portfolio-management/" 
          class="footer-right-item__link">
          PORTFOLIO MANAGEMENT
        </a>
        
        <a 
          target="_blank"
          href="https://docs.holderlab.io/article-categories/account-management/" 
          class="footer-right-item__link">
          ACCOUNT MANAGEMENT
        </a>
        
        <a 
          target="_blank"
          href="https://docs.holderlab.io/article-categories/work-with-exchanges/" 
          class="footer-right-item__link">
          WORK WITH CRYPTOCURRENCY EXCHANGES
        </a>
        
        <a 
          target="_blank"
          href="https://docs.holderlab.io/" 
          class="footer-right-item__link">
          KNOWLEDGE BASE
        </a>
        
        <a
          target="_blank"
          href="https://blog.holderlab.io"
          class="footer-right-item__link">
          BLOG
        </a>
        
      </div>
      
      <div class="footer-right-item">
        <div class="footer-right-item__title">INFORMATION</div>
          
        <a
          target="_blank"
          href="https://holderlab.io/landing-privacy-policy/"
          class="footer-right-item__link"
        >
          PRIVACY POLICY
        </a>
        
        <a
          target="_blank"
          href="https://holderlab.io/landing-terms-of-service/"
          class="footer-right-item__link"
        >
          TERMS OF USE
        </a>
          
        <a
          href="mailto:contacts@holderlab.io"
          class="footer-right-item__link">
          CONTACT US
        </a>
        
        <nuxt-link 
          to="/landing-plans/" 
          class="footer-right-item__link">
          SUBSCRIPTIONS
        </nuxt-link>
        
      </div>
      
    </div>

    
  </div>
</template>

<style lang="scss" scoped>
.footer {
  line-height: 1.4;
  display: flex;
  flex-direction: row;
  justify-content: space-beetwen;
  align-items: flex-start;
  width: 100%;

  @include ifmobile {
    justify-content: center;
    flex-direction: column-reverse;
    flex-wrap: wrap;
  }

  .footer-left {
    width: 100%;
    @include ifmobile {
      display: flex;
      justify-content: center;
      flex-direction: column-reverse;
    }
    .footer-left__title {
      margin-bottom: em(30px);
      &__logo {
        margin-bottom: em(8px);
        @include ifmobile {
          display: none;
        }
      }
      &__copyright {
        $size: 14px;
        font-size: em($size);
        color: $white;
        @include ifmobile {
          width: 100%;
          text-align: center;
          $size: 12px;
          font-size: em($size);
          margin-top: em(30px);
        }
      }
    }

    .footer-left__text {
      width: 100%;
      max-width: em(640px);
      font-size: em(12px);
      line-height: 21px;
      color: rgba(255, 255, 255, 0.5);
      @include ifmobile {
        font-size: 8px;
        line-height: 14px;
        text-align: center;
        max-width: 270px;
        margin: 0 auto;
      }
      a {
        color: $white;
        &:hover {
          color: $yellow;
        }
      }
    }
  }

  .footer-right {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-top: em(35px);
    @include ifmobile {
      flex-wrap: wrap;
    }

    &__mobile-logo {
      display: none;
      @include ifmobile {
        display: block;
        margin: 0 auto;
        margin-bottom: em(25px);
      }
    }
    &-item {
      display: flex;
      flex-direction: column;

      text-align: left;
      width: em(190px);
      margin-right: em(20px);

      @include ifmobile {
        justify-content: center;
        flex-wrap: wrap;
        text-align: center;
        width: 100%;
        margin-right: 0;
        margin-bottom: em(22px);
      }
      &__title {
        font-size: em(15px);
        font-weight: bold;
        color: $white;
        text-decoration: none;
        margin-bottom: em(10px);
      }
      &__link {
        font-size: em(12px);
        font-weight: bold;
        color: $white;
        text-decoration: none;
        margin-bottom: em(7px);
        transition: color $speed;
        text-transform: uppercase;
        cursor: pointer;
        &:last-child {
          margin-bottom: 0;
        }
        &:hover {
          color: $yellow;
        }
      }
    }

    &-item:last-child {
      width: em(115px);
      margin-right: 0;
      @include ifmobile {
        justify-content: center;
        flex-wrap: wrap;
        text-align: center;
        width: 100%;
        margin-bottom: em(40px);
      }
    }
  }
}
</style>
