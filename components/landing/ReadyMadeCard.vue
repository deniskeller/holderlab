<script>
import { mapMutations } from 'vuex';
import StarIcon from '~/components/icons/StarIcon';
export default {
  components: {
    StarIcon
  },
  // props: {
  //   statusaccount: {
  //     type: String,
  //     default: null
  //   },

  //   subscribers: {
  //     type: String,
  //     default: null
  //   },

  //   title: {
  //     type: String,
  //     default: null
  //   },

  //   star: {
  //     type: Boolean,
  //     default: false
  //   },

  //   text: {
  //     type: String,
  //     default: null
  //   },

  //   day: {
  //     type: String,
  //     default: null
  //   },

  //   mon: {
  //     type: String,
  //     default: null
  //   },

  //   year: {
  //     type: String,
  //     default: null
  //   },

  //   link: {
  //     type: String,
  //     default: null
  //   },

  //   currency: {
  //     type: String,
  //     default: null
  //   },

  //   coins: {
  //     type: Array,
  //     default: null
  //   }
  // },
  props: {
    statusaccount: {
      type: String,
      default: null
    },
    subscribers: {
      type: String,
      default: ''
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
      if (this.day.charAt(0) === '-') {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    },
    change_color_mon() {
      if (this.mon.charAt(0) === '-') {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    },
    change_color_year() {
      if (this.year.charAt(0) === '-') {
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
      // this.$router.push({
      //   path: '/ready-made/card',
      //   id_portfel: '12',
      //   props: true
      // });

      // this.$router.push({
      //   path: '/ready-made/card',
      //   params: { id_portfel: '123' }
      // });
      // this.$router.push({ path: `/ready-made/card/123`});
      this.$router.push({
        path: '/ready-made/card',
        params: { id_portfel: '123' },
        props: true
      });
    }
  }
};
</script>

<template>
  <div class="landing-ready-made-card">
    <div
      v-if="subscribers"
      class="landing-ready-made-card-subscribers landing-ready-made-card__ready-made-card-subscribers"
    >
      <span 
        class="landing-ready-made-card-subscribers__title"
      >SUBSCRIBERS</span
      >
      <span class="landing-ready-made-card-subscribers__number">
        {{ subscribers }}
      </span>
    </div>

    <div class="landing-ready-made-card__content">
      <div class="landing-ready-made-card__title">
        {{ title }}
        <StarIcon
          v-if="star"
          :class="{ 'landing-ready-made-card__star_right': !subscribers }"
          class="landing-ready-made-card__star-icon"
        />
      </div>
      <div class="landing-ready-made-card__text">
        {{ text }}
      </div>

      <div
        class="landing-ready-made-card-data landing-ready-made-card__ready-made-card-data"
      >
        <div class="landing-ready-made-card-data__item">
          <div class="landing-ready-made-card-data__time">
            1 DAY
          </div>
          <div
            :style="{ color: change_color_day }"
            class="landing-ready-made-card-data__percent"
          >
            {{ day }}
          </div>
        </div>
        <div class="landing-ready-made-card-data__item">
          <div class="landing-ready-made-card-data__time">
            1 MON.
          </div>
          <div
            :style="{ color: change_color_mon }"
            class="landing-ready-made-card-data__percent"
          >
            {{ mon }}
          </div>
        </div>
        <div class="landing-ready-made-card-data__item">
          <div class="landing-ready-made-card-data__time">
            1 YEAR
          </div>
          <div
            :style="{ color: change_color_year }"
            class="landing-ready-made-card-data__percent"
          >
            {{ year }}
          </div>
        </div>
      </div>
    </div>

    <div
      class="landing-ready-made-card-footer landing-ready-made-card__ready-made-card-footer"
    >
      <a
        v-if="statusaccount === '0'"
        href="upgrade"
        class="landing-ready-made-card-footer__link"
        @click.prevent="setPopup('upgrade-popup')"
      >
        GET PACK
      </a>

      <a
        v-else
        target="_blank"
        href="https://holderlab.io/landing-plans/"
        class="landing-ready-made-card-footer__link"
        @click.native="checkStatus"
      >
        GET PACK
      </a>

      <BaseCurrencyMobile
        :title="currency"
        :id_market="marketid"
        class="landing-ready-made-card-footer__currency"
      />

      <div class="landing-ready-made-card-footer__coins">
        <BaseCoinMobile
          v-for="(item, index) in coins"
          v-show="index < 9"
          :key="index"
          :title="item"
          class="landing-ready-made-card-footer__coin"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.landing-ready-made-card {
  position: relative;
  width: em(500px);
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
    height: 9.5em;
  }

  &__title {
    $size: 20px;
    font-size: em($size);
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include ifmobile {
      font-size: em(10px);
    }
  }

  &__text {
    padding-right: em(44px);
    @include ifmobile {
      font-size: em(10px);
      text-align: left;
    }
  }

  &__star-icon {
    width: em(14px);
    height: em(13px);
    fill: $yellow;
    margin-left: em(2px);

    &_right {
      position: absolute;
      right: em(26px);
    }
  }

  .landing-ready-made-card-data {
    margin-top: em(10px);
  }

  .landing-ready-made-card-subscribers {
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

.landing-ready-made-card-data {
  display: flex;

  &__item {
    width: em(80px);
    @include ifmobile {
      text-align: left;
      font-size: em(10px);
    }
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

.landing-ready-made-card-subscribers {
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

.landing-ready-made-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__link {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    cursor: pointer;
    color: $blue;
    @include ifmobile {
      font-size: em(8px);
    }
  }

  &__coins {
    display: flex;
    flex-direction: row-reverse;
    width: em(140px);
    @include ifmobile {
      width: em(40px);
    }
  }
  &__coin {
    margin-left: em(-12px);
    @include ifmobile {
      margin-left: -0.425em;
    }
  }
}
</style>
