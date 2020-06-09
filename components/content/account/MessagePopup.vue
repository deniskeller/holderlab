<script>
import { mapMutations, mapState } from 'vuex';

import HistoryRebalanceItem from '~/components/content/account/HistoryRebalanceItem.vue';
export default {
  components: {
    HistoryRebalanceItem
  },
  props: {
    // title: {
    //   type: String,
    //   default: null
    // },
    // date: {
    //   type: String,
    //   default: null
    // },
    // from: {
    //   type: String,
    //   default: null
    // }
  },
  data() {
    return {
      detailIsHidden: true,
      limit_in_coin: 3571.23,
      reduction_name: 'EOEURS',
      limit_in_usd: 'LESS',
      reduction_value: 2.89,
    };
  },
  computed: {
    ...mapState('page', ['activeHistoryMessage', 'listOrderActiveMessages']),

    active_history_message() {
      return this.activeHistoryMessage;
    },
    title() {
      if (this.active_history_message) {
        return this.active_history_message.title;
      } else {
        return '';
      }
    },
    date() {
      if (this.active_history_message) {
        return this.active_history_message.date;
      } else {
        return '';
      }
    },
    type() {
      if (this.active_history_message) {
        if (this.active_history_message.type == 'portfel_history') return true;
        else return false;
      } else {
        return false;
      }
    },
    time() {
      if (this.active_history_message) {
        return this.active_history_message.time;
      } else {
        return '';
      }
    },
    from() {
      if (this.active_history_message) {
        return this.active_history_message.from;
      } else {
        return '';
      }
    },
    text() {
      if (this.active_history_message) {
        return this.active_history_message.data.content.text;
      } else {
        return '';
      }
    },
    
    change_more_list() {
      if (!this.detailIsHidden) {
        return 'scaleY(-1)';
      }
    },
    
  },
  mounted() {},
  methods: {
    ...mapMutations('page', ['setPopup']),
    
    // showDetails() {
    //   this.detailIsHidden = !this.detailIsHidden;
    // }
  }
};
</script>

<template>
  <BaseMiddlePopup class="message-popup">

    <div class="message-popup__head">
      <div class="message-popup__title">
        {{ title }}
      </div>
      <div class="message-popup__date">
        {{ date }} {{time}}
      </div>
      <div class="message-popup__from">
        <span class="message-popup__from-label">
          From
        </span>
        <span class="message-popup__from-text">
          {{ from }}
        </span>
      </div>
    </div>
    <div class="message-popup__content" >
      <span v-if = "type">
        <span
          >
          <HistoryRebalanceItem
            v-for="(item, index) in listOrderActiveMessages"
            :key="index"
            :value="item.value"
            :id_market="item.id_coin" 
            :title="item.coin" 
            :dtype="item.dtype" 
            :limit_amount="item.trade_info.limit_amount"
            :amount="item.trade_info.amount"
            :coin_cost="item.trade_info.coin_cost"
            :min_limits_cost="item.trade_info.min_limits_cost"
            :type_error_limit="item.trade_info.type_error_limit"
            :def_message="item.trade_info.info"
            :reduction_name="item.currency_pair"
            :reduction_value="item.amount"
            :is_error="item.error" 
            />
        </span>
      </span>
      <span v-else>
        {{ text }}
      </span>
    </div>
    <BaseButton 
      class="message-popup__button" 
      @click.native="setPopup(null)">
      CLOSE
    </BaseButton>
  </BaseMiddlePopup>
</template>

<style lang="scss" scoped>
.message-popup {
  
  .label-brought {
    color: #2CAD8E;
  }
  .label-sold {
    color: #FF5934;
  }
  
  .message-popup-rate__item{
    position: relative;
  }
  .message-popup-rate__row {
    position: relative;
  }
  .message-popup-rate__label {
    position: absolute;
    right: 0;
    top: em(35px);
  }
  .more-info {
    position: absolute;
    text-align: center;
    bottom: 0px;
    left: 50%;
    &__list {
      width: em(12px);
      height: em(9px);
      fill: $grey;
    }
  }
  
  .hidden-content {
    width: 100%;
    overflow: hidden;
    min-height: em(75px);
    transition: max-height $speed linear;

    &.is_hidden {
      max-height: 0;
      min-height: 0;
    }
  }

  .base-popup__container {
    border: 1px solid $grey;
    box-shadow: 0 em(2px) em(1px) rgba(0, 0, 0, 0.1);
    @include ifdesktop {
      padding: em(50px);
    }
    @include ifmobile {
      padding: em(15px);
    }
  }

  .base-popup__close {
    display: none;
  }

  &__head {
    padding-bottom: em(20px);
    border-bottom: 1px solid $grey;
  }

  &__date {
    color: $grey;
  }

  &__from {
    &-label {
      color: $grey;
    }
    &-text {
      color: $blue;
    }
  }

  &__content {
    margin: em(20px) 0 em(30px);
    .message-popup-rate__item {
      max-width: em(390px);
      width: 100%;  
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: em(6px);
    position: relative;
  }
  
  .item-main-content {
    height: em(70px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 em(24px);
    box-sizing: border-box;

    @include ifdesktop {
      width: em(390px);
    }
  }
  
  &__label {
    position: absolute;
    right: 0;
    $size: 12px;
    font-size: em($size);
    color: $grey;
  }
  
}
</style>
