<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    value: {
      type: String,
      default: null
    },
    id_market: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    limit_in_coin: {
      type: Number,
      default: null
    },
    reduction_name: {
      type: String,
      default: null
    },
    reduction_value: {
      type: Number,
      default: null
    },
    min_limits_cost: {
      type: Number,
      default: null
    },
    dtype: {
      type: Number,
      default: 0
    },
    is_error: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      detailIsHidden: true,
    };
  },
  computed: {
    // ...mapState('page', ['activeHistoryMessage', 'listOrderActiveMessages']),

    // active_history_message() {
    //   return this.activeHistoryMessage;
    // },
    // title() {
    //   if (this.active_history_message) {
    //     return this.active_history_message.title;
    //   } else {
    //     return '';
    //   }
    // },
    // date() {
    //   if (this.active_history_message) {
    //     return this.active_history_message.date;
    //   } else {
    //     return '';
    //   }
    // },
    // type() {
    //   if (this.active_history_message) {
    //     if (this.active_history_message.type == 'portfel_history') return true;
    //     else return false;
    //   } else {
    //     return false;
    //   }
    // },
    // time() {
    //   if (this.active_history_message) {
    //     return this.active_history_message.time;
    //   } else {
    //     return '';
    //   }
    // },
    // from() {
    //   if (this.active_history_message) {
    //     return this.active_history_message.from;
    //   } else {
    //     return '';
    //   }
    // },
    // text() {
    //   if (this.active_history_message) {
    //     return this.active_history_message.data.content.text;
    //   } else {
    //     return '';
    //   }
    // },
    
    change_more_list() {
      if (!this.detailIsHidden) {
        return 'scaleY(-1)';
      }
    },
    is_error_comp(){
      if (this.value==0){
        return true
      }else{
        return false
      }
      
    }
    
  },
  mounted() {},
  methods: {
    ...mapMutations('page', ['setPopup']),
    
    showDetails() {
      this.detailIsHidden = !this.detailIsHidden;
    }
  }
};
</script>

<template>
  
  <div 
          class="message-popup-rate__row">
          <div class="message-popup-rate__item" @click="showDetails()">
            
            <div class="item-main-content" >
              <BaseCurrency 
                :id_market="id_market" 
                :title="title" 
                type="coins" />
                
              <div class="message-popup-rate__price">
                $ {{ value }}
              </div>
            </div>
            
            <div
              v-if = "is_error_comp"
              :class="{ is_hidden: detailIsHidden }"
              class="hidden-content">
              
              <div class="hidden-content__title">ESTIMATED AMOUNT LESS</div>
              <div
                class="hidden-content__value"
              >
                {{ limit_in_coin }} LESS {{ min_limits_cost }} {{ reduction_name }}
              </div>
              
            </div>
            
            <span 
              v-if = "is_error_comp"
              class="more-info">
              <svg 
                :style="{ transform: change_more_list }" 
                class="more-info__list"
                viewBox="0 0 8 6">
                <path
                  d="M0.9375 0.71875L4 3.78125L7.0625 0.71875L8 1.65625L4 5.65625L0 1.65625L0.9375 0.71875Z"
                />
              </svg>
            </span>
            
          </div>
          
          <div 
            v-if= "dtype"
            class="message-popup-rate__label label-brought">
            BOUGHT
          </div>
          <div 
            v-else
            class="message-popup-rate__label label-sold">
            SOLD
          </div>
          
        </div>
      
  
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
    bottom: -3px;
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
    min-height: em(60px);
    transition: max-height $speed linear;

    &.is_hidden {
      max-height: 0;
      min-height: 0;
    }
    
    &__title {
      font-size: em(14px);
    }
    &__value {
      font-size: em(12px);
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
