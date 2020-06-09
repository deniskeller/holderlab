<script>
import { mapMutations } from 'vuex';

import MarketGraph from '~/components/content/market/MarketGraph';
import MarketPastGraph from '~/components/content/market/MarketPastGraph';
import MarketAddCurrienciesForm from '~/components/content/market/MarketAddCurrienciesForm';
import MarketAddFilter from '~/components/content/market/MarketAddFilter';
import MarketCopyPortfolioPopup from '~/components/content/market/MarketCopyPortfolioPopup';

export default {
  components: {
    MarketGraph,
    MarketPastGraph,
    MarketAddCurrienciesForm,
    MarketAddFilter,
    MarketCopyPortfolioPopup
  },
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="market">
    <BaseContainer>
      <div class="market__top-container">
        <BaseHeadline 
          title="Market Scan" 
          class="market__headline">
          Market Scan Choose crypto and add filters, or filters
        </BaseHeadline>

        <div class="market__top-container-action">
          <BaseButton
            class="btn-copy"
            type="primary"
            @click.native="setPopup('market-copy-portfolio-popup')"
          >
            COPY PORTFOLIO
          </BaseButton>
          <BaseButton 
            to="/create-new-portfolio/" 
            type="secondary">
            ADD MY PORTFOLIO
          </BaseButton>
        </div>
      </div>
      <div class="market__content">
        <MarketGraph class="market__graph" />
        <BaseTitle 
          type="h3" 
          class="market__subtitle">
          PAST PERFORMANCE
        </BaseTitle>

        <MarketPastGraph class="market-past__graph" />

        <MarketAddCurrienciesForm
          class="create-new-portfolio__add-curriencies-form"
        />
      </div>

      <BaseAside>
        <BaseHelpBanner
          to="/help"
          style="background-image: url(/img/help/1.png)"
          class="create-new-portfolio__help-banner"
        >
          ABOUT <br >
          MARKET SCAN
        </BaseHelpBanner>

        <div class="market__dashboard-card">
          <div
            class="market__dashboard-card__value market__dashboard-card__value_green"
          >
            754%
          </div>
          <div class="market__dashboard-card__text">
            RETURN OF INVESTMENTS
          </div>
        </div>

        <div class="market__dashboard-card">
          <div
            class="market__dashboard-card__value market__dashboard-card__value_red"
          >
            -79%
          </div>
          <div class="market__dashboard-card__text">
            DRAWDOWN
          </div>
        </div>

        <div class="market__dashboard-card">
          <div class="market__dashboard-card__value">
            -0,2%
          </div>
          <div class="market__dashboard-card__text">
            7 DAY RETURNS
          </div>
        </div>

        <div class="market__select-filter">
          <BaseTitle 
            type="h3" 
            class="market__select-filter-title">
            SELECT FILTER:
          </BaseTitle>

          <MarketAddFilter 
            :tags="true" 
            class="market-filters" />

          <div class="filter-item filter-item__roi">
            <div class="filter-item__title">ROI</div>
            <img
              src="~/static/img/roi.svg"
              alt="img"
              class="filter-item__img"
            >
            <div class="filter-item__text">RETURN OF INVESTMENTS</div>
            <div class="filter-item__btn">
              <div class="item-btn item-btn__roi">MIN</div>
              <div class="item-btn item-btn__roi">MAX</div>
            </div>
          </div>

          <div class="filter-item filter-item__duration">
            <div class="filter-item__title">Duration</div>
            <img
              src="~/static/img/duration.svg"
              alt="img"
              class="filter-item__img"
            >
            <div class="filter-item__text">ON TOP</div>
            <div class="filter-item__btn">
              <div class="item-btn item-btn__duratiom">6 MONTH</div>
              <div class="item-btn item-btn__duratiom">1 YEAR</div>
              <div class="item-btn item-btn__duratiom">2 YEAR</div>
            </div>
          </div>

          <div class="filter-item filter-item__most">
            <div class="filter-item__title">Most</div>
            <img
              src="~/static/img/most.svg"
              alt="img"
              class="filter-item__img"
            >
            <div class="filter-item__text">DROWDOWN</div>
            <div class="filter-item__check-show">
              <BaseCheckboxFilter class="filter-item__checkbox-slider" />
              <div class="filter-item__btn-show">SHOW</div>
            </div>
          </div>

          <div class="filter-item filter-item__idea">
            <div class="filter-item__title-idea">
              SEND US YOUR FILTER <br >
              IDEA
            </div>
            <img
              src="~/static/img/message.svg"
              alt="img"
              class="filter-item__img"
            >
          </div>
        </div>
      </BaseAside>
    </BaseContainer>
    <MarketCopyPortfolioPopup />
  </div>
</template>

<style lang="scss" scoped>
.market {
  &__nav {
    @include ifmobile {
      display: none;
    }
  }
  &__content {
    @include ifdesktop {
      width: em(720px);
    }
    @include ifmobile {
      margin: 0 em(15px);
    }
  }
  &__top-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    @include ifdesktop {
      height: em(100px);
      margin-bottom: em(43px);
    }
    @include ifmobile {
      margin-bottom: em(15px);
    }
    .market__top-container-action {
      align-self: flex-end;
      @include ifmobile {
        margin: 0 em(10px);
      }
      .btn-copy {
        margin-right: em(19px);
        @include ifmobile {
          margin-right: 0;
          margin-bottom: em(10px);
        }
      }
      @include ifmobile {
        text-align: center;
        margin-bottom: em(10px);
      }
    }
  }
  &__choose-currency {
    width: 100%;
    margin-bottom: em(20px);
    @include ifmobile {
      display: none;
    }
  }
  &__time-switch {
    $size: 13.3px;
    font-size: em($size);
    @include ifmobile {
      display: none;
    }
  }
  &__time-switch-mobile {
    @include ifdesktop {
      display: none;
    }
    justify-content: center;
    margin: em(20px) 0 em(30px);
  }
  &__aside-help {
    margin-top: em(40px);
  }
  &__investment {
    margin-top: em(40px);
  }
  &__banner {
    display: block;
    width: 100%;
    margin-top: em(30px);
    @include ifmobile {
      display: none;
    }
  }

  &__settings-container {
    position: absolute;
    top: em(8px);
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__settings {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: em(34px);

    @include ifmobile {
      display: none;
    }

    &-title {
      $size: 12px;
      font-size: em($size);
      font-weight: bold;
      color: $blue;
      margin-right: em(8px, $size);
    }

    &-icon {
      fill: $blue;
      transition: fill $speed;
    }
  }

  &__card {
    margin-bottom: em(5px);
  }

  &__aside-button {
    margin-right: em(23px);
    @include ifmobile {
      display: none;
    }
  }

  &__more {
    @include ifmobile {
      display: none;
    }
  }

  &__graph {
    @include ifmobile {
      margin: 0 em(2px);
    }
  }

  &__rebalancing-tab {
    @include ifdesktop {
      display: none;
    }
  }
  &__rebalance-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: em(28px);
  }
}
.market__graph {
  margin-bottom: em(30px);
}
.market-past__graph {
  margin-bottom: em(34px);
}
.market__subtitle {
  margin-bottom: em(19px);
}
.create-new-portfolio__help-banner {
  margin-bottom: em(44px);
}
.market__dashboard-card {
  position: relative;
  box-sizing: border-box;
  margin-bottom: em(6px);

  @include ifdesktop {
    min-height: em(120px);
    border: 1px solid $grey;
    padding: em(20px) em(16px) em(16px) em(30px);
  }
  @include ifmobile {
    border-bottom: 1px solid $grey;
    padding: em(15px) 0;
    margin: 0 em(15px);
  }

  &__value {
    $size: 26px;
    font-size: em($size);
    &_red {
      color: $red;
    }
    &_green {
      color: $green;
    }
  }

  &__text {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
  }

  &__question {
    position: absolute;
    top: em(30px);
    right: em(18px);
    width: em(20px);
    height: em(20px);
    fill: $grey;
    transition: fill $speed;

    &:hover {
      fill: $blue;
    }
  }

  &__checkbox-slider {
    margin-top: em(12px);
    @include ifmobile {
      position: absolute;
      top: 25%;
      right: 0;
    }
  }

  &__question-link {
    @include ifmobile {
      display: none;
    }
  }
}
.market__select-filter {
  margin-top: em(27px);
}
.market__select-filter-title {
  margin-bottom: em(19px);
  line-height: 20px;
  @include ifmobile {
    margin: 0 em(15px);
  }
}
.market-filters {
  @include ifmobile {
    margin: 0 em(15px);
  }
}
.filter-item {
  position: relative;
  box-sizing: border-box;
  margin-bottom: em(6px);

  @include ifdesktop {
    min-height: em(90px);
    padding: em(20px) em(15px) em(16px) em(25px);
  }
  @include ifmobile {
    border-bottom: 1px solid $grey;
    padding: em(15px);
    margin: 0 em(15px) em(15px);
  }
  .filter-item__title {
    color: $white;
    font-size: em(26px);
  }
  .filter-item__title-idea {
    font-size: em(14px);
    color: $blue;
  }
  .filter-item__img {
    position: absolute;
    top: 1.875em;
    right: 1.25em;
    width: 1.25em;
    height: 1.25em;
  }
  .filter-item__text {
    color: $white;
    font-size: em(14px);
    margin-bottom: em(25px);
  }
  .filter-item__btn {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    /*flex-wrap: wrap;*/
    .item-btn {
      display: block;
      box-sizing: border-box;
      border: 2px solid $white;
      border-radius: 20px;
      padding: em(3px) em(13px);
      font-size: em(12px);
      text-transform: uppercase;
      color: $white;
      cursor: pointer;
      margin-right: em(6px);
      white-space: nowrap;
    }
    .item-btn__roi:hover {
      color: $red;
      background: $white;
    }
    .item-btn__duratiom:hover {
      color: $blue;
      background: $white;
    }
    .item-btn:last-child {
      margin-right: 0;
    }
  }
  .filter-item__check-show {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .filter-item__btn-show {
      color: $white;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
.filter-item__roi {
  background: #924dae;
}
.filter-item__duration {
  background: #003bf9;
}
.filter-item__most {
  background: #e4745c;
}
.filter-item__idea {
  background: #f1f7ff;
}
</style>
