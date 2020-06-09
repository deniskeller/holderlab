<script>
/*DashboardPopup*/
import { mapMutations } from 'vuex';

import PopupAllocations from '~/components/content/PopupAllocations';
import UpdateKeysForm from '~/components/content/UpdateKeysForm';
import ShareIcon from '~/components/icons/ShareIcon';

import allocatedAssets from '~/assets/data/allocated-assets.json';
export default {
  components: {
    PopupAllocations,
    UpdateKeysForm,
    ShareIcon
  },

  props: {
    get_one_portfel_coin_list: {
      type: Object,
      default: function() {
        return {
          name: '',
          market: { market_title: '', market_id: '0' },
          values: []
        };
      }
    },

    portfolio_id: {
      type: String,
      default: null
    },

    balance: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      allocatedAssets
    };
  },

  computed: {
    allocations() {
      return this.get_one_portfel_coin_list.values.length;
    }
  },

  mounted() {},

  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <BasePopup class="dashboard-popup">
    <BaseHeadline
      :editable="true"
      :title="get_one_portfel_coin_list.name"
      class="base-popup__headline dashboard-popup__headline"
    >
      <div class="dashboard-popup-money dashboard-popup__money">
        <BaseCurrency
          :title="get_one_portfel_coin_list.market.market_title"
          :id_market="get_one_portfel_coin_list.market.market_id"
          class="dashboard-popup-money__currency"
        />
        <div class="dashboard-popup-money__value">${{ balance }}</div>
      </div>
    </BaseHeadline>

    <div class="dashboard-popup__allocations">
      Allocations
      <span class="dashboard-popup__allocations-number">{{ allocations }}</span>
    </div>
    <PopupAllocations
      :coin_list="get_one_portfel_coin_list.values"
      class="dashboard-popup__allocations"
    />

    <UpdateKeysForm
      :portfolio_id="portfolio_id"
      class="dashboard-popup__update-keys-form"
    />

    <div class="dashboard-popup-footer dashboard-popup__footer">
      <div class="dashboard-popup-footer__info">
        <BaseTitle class="dashboard-popup-footer__title">
          Add portfolio from ready-made
        </BaseTitle>
        <div class="dashboard-popup-footer__text">
          Analyze all available portfolios in ready-made section. Copy the most
          performance portfolio and enjoy it!
        </div>
      </div>
      <!-- <nuxt-link
        to="#"
        class="dashboard-popup-footer__share">
        <ShareIcon class="dashboard-popup-footer__share-icon"/>
      </nuxt-link> -->
      <BaseButton
        to="/ready-made"
        type="orange"
        class="dashboard-popup-footer__button"
        @click.native="setPopup(null)"
      >
        READY-MADE
      </BaseButton>
    </div>
  </BasePopup>
</template>

<style lang="scss">
.dashboard-popup {
  &__headline {
    display: flex;
    align-items: center;
    padding-bottom: em(50px);
    border-bottom: 1px solid $grey;
  }
  &__allocations {
    $size: 14px;
    font-size: em($size);

    &-number {
      color: $grey;
    }
    margin-bottom: em(14px, $size);
  }

  &__update-keys-form {
    margin-top: em(44px);
  }

  &__footer {
    margin: em(60px) em(-130px) em(-70px) em(-97px);
  }
}
.dashboard-popup-money {
  display: flex;
  position: absolute;
  right: 0;

  &__value {
    margin-left: em(40px);
  }
}

.dashboard-popup-footer {
  position: relative;
  padding: em(30px) em(134px) em(50px) em(97px);
  background-color: $dark-green;
  color: $white;

  display: flex;
  justify-content: space-between;

  &__info {
    max-width: em(390px);
  }

  &__title {
    $size: 26px;
    font-size: em($size);
  }

  &__share {
    $this: &;
    position: relative;
    width: em(30px);
    height: em(30px);
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: $white;
      border-radius: 100%;
      transition: all $speed;
      transform: scale(0);
      visibility: hidden;
    }
    @extend %center;

    &:hover {
      &::before {
        transform: scale(1);
        visibility: visible;
      }
      #{$this}-icon {
        fill: $blue;
      }
    }

    &:active {
      #{$this}-icon {
        fill: $grey;
      }
    }

    &-icon {
      position: relative;
      width: em(18px);
      height: em(20px);
      margin-right: em(3px);
      fill: $white;
      transition: fill $speed;
    }
  }
}
</style>
