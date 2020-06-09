<script>
import { mapMutations } from 'vuex';
import StarIcon from '~/components/icons/StarIcon';
export default {
  components: {
    StarIcon
  },
  props: {
    statusaccount: {
      type: String,
      default: null
    },
    subscribers: {
      type: Number,
      default: null
    },
    id_portfolio: {
      type: String,
      default: ''
    },
    id_rm_portfolio: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'x'
    },
    star: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    day: {
      type: Number,
      default: 0
    },
    mon: {
      type: Number,
      default: 0
    },
    year: {
      type: Number,
      default: 0
    },
    link: {
      type: String,
      default: null
    },
    currency: {
      type: String,
      default: null
    },
    marketid: {
      type: String,
      default: null
    },
    coins: {
      type: Array,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {
    change_color_day() {
      if (this.day < 0) {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    },
    change_color_mon() {
      if (this.mon < 0) {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    },
    change_color_year() {
      if (this.year < 0) {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    }
  },
  mounted() {},
  methods: {
    ...mapMutations('page', ['setPopup']),

    checkStatus() {
      this.$router.push({
        path: '/ready-made/card/' + this.id_portfolio
      });
    }
  }
};
</script>

<template>
  <div class="ready-made-card">
    <div
      v-if="subscribers"
      class="ready-made-card-subscribers ready-made-card__ready-made-card-subscribers"
    >
      <span class="ready-made-card-subscribers__title">SUBSCRIBERS</span>
      <span class="ready-made-card-subscribers__number">
        {{ subscribers }}
      </span>
    </div>

    <div class="ready-made-card__content">
      <div class="ready-made-card__title">
        <span class="title-desktop">{{ title }}</span>
        <StarIcon
          v-if="star"
          :class="{ 'ready-made-card__star_right': !subscribers }"
          class="ready-made-card__star-icon"
        />
        <span class="title-mobile">{{ title }}</span>
      </div>
      <div class="ready-made-card__text">
        {{ text }}
      </div>

      <div class="ready-made-card-data ready-made-card__ready-made-card-data">
        <div class="ready-made-card-data__item">
          <div class="ready-made-card-data__time">
            1 DAY
          </div>
          <div
            :style="{ color: change_color_day }"
            class="ready-made-card-data__percent"
          >
            {{ day }}%
          </div>
        </div>
        <div class="ready-made-card-data__item">
          <div class="ready-made-card-data__time">
            1 MON.
          </div>
          <div
            :style="{ color: change_color_mon }"
            class="ready-made-card-data__percent"
          >
            {{ mon }}%
          </div>
        </div>
        <div class="ready-made-card-data__item">
          <div class="ready-made-card-data__time">
            1 YEAR
          </div>
          <div
            :style="{ color: change_color_year }"
            class="ready-made-card-data__percent"
          >
            {{ year }}%
          </div>
        </div>
      </div>
    </div>

    <div class="ready-made-card-footer ready-made-card__ready-made-card-footer">
      
      <a
        v-if="statusaccount === '0'"
        href="upgrade"
        class="ready-made-card-footer__link"
        @click.prevent="setPopup('upgrade-popup')"
      >
        GET PACK
      </a>

      <a
        v-else
        class="ready-made-card-footer__link"
        @click.prevent="checkStatus"
      >
        GET PACK
      </a>

      <BaseCurrency
        :title="currency"
        :id_market="marketid"
        class="ready-made-card-footer__currency"
      />

      <div class="ready-made-card-footer__coins">
        <BaseCoin
          v-for="(item, index) in coins"
          v-show="index < 9"
          :key="index"
          :title="item.id_coin"
          class="ready-made-card-footer__coin"
        />

        <div 
          v-if="coins.length > 9" 
          class="ready-made-card-footer__bage">
          {{ coins.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ready-made-card {
  position: relative;
  width: 100%;
  max-width: em(500px);
  height: em(280px);
  border: 1px solid $grey;

  box-sizing: border-box;
  background-color: $white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @include ifdesktop {
    padding: em(33px);
  }
  @include ifmobile {
    padding: em(15px);
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: em(222px);
    height: 1px;
    background-color: $blue;
    top: -1px;
    left: em(30px);
  }

  &__title {
    $size: 20px;
    font-size: em($size);

    position: relative;
    @include ifmobile {
      max-width: em(180px);
    }
  }

  &__text {
    padding-right: em(44px);
  }

  &__star-icon {
    width: em(14px);
    height: em(13px);
    fill: $yellow;
    margin-left: em(2px);
    @include ifmobile {
      position: absolute;
      top: 10%;
      right: 0;
    }

    &_right {
      position: absolute;
      right: em(26px);
    }
  }

  &__ready-made-card-data {
    margin-top: em(10px);
  }

  &__ready-made-card-subscribers {
    position: absolute;
    @include ifdesktop {
      top: em(33px);
      right: em(33px);
    }
    @include ifmobile {
      top: em(15px);
      right: em(15px);
    }
  }
}

.ready-made__card {
  @include ifmobile {
    padding: em(15px) em(15px) em(25px) em(25px);
  }
}

.ready-made-card-data {
  display: flex;

  &__item {
    width: em(80px);
  }

  &__time {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
  }

  &__percent {
    $size: 14px;
    font-size: em($size);
  }
}

.ready-made-card-subscribers {
  &__title {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
  }

  &__number {
    $size: 14px;
    font-size: em($size);
  }
}

.ready-made-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__link {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    cursor: pointer;
  }

  &__link-vip {
    color: $orange;
  }

  &__coins {
    display: flex;
    flex-direction: row-reverse;
    /*width: 100%;*/
    max-width: em(140px);
  }
  &__coin {
    margin-left: em(-12px);
  }
  &__bage {
    $size: 12px;
    font-size: em($size);
    @extend %center;
    @extend %bottom-shadow;
    width: em(24px, $size);
    height: em(24px, $size);
    border-radius: 100%;
    box-sizing: border-box;
    border: 1px solid $grey;
    background-color: $white;
    color: $blue;
  }
}

.title-desktop {
  @include ifmobile {
    display: none;
  }
}
.title-mobile {
  display: none;
  @include ifmobile {
    display: block;
  }
}
</style>
