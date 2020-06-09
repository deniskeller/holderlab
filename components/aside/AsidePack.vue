<script>
import { mapMutations } from 'vuex';
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },

    id_portfolio: {
      type: String,
      default: ''
    },

    statusaccount: {
      type: String,
      default: '0'
    },

    day: {
      type: Number,
      default: 0
    },
    month: {
      type: Number,
      default: 0
    },
    year: {
      type: Number,
      default: 0
    }
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
      if (this.month < 0) {
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
  <div class="aside-pack">
    <div class="aside-pack__title"> {{ title }} </div>
    <div class="aside-pack__text"> {{ text }} </div>

    <div class="pack-percent aside-pack__percent">
      <div 
        v-if="day" 
        class="pack-percent__item">
        <div class="pack-percent__time">
          1 day
        </div>
        <div 
          :style="{ color: change_color_day }" 
          class="pack-percent__value">{{ day }}%</div>
      </div>

      <div 
        v-if="month" 
        class="pack-percent__item">
        <div class="pack-percent__time">
          1 mon.
        </div>
        <div 
          :style="{ color: change_color_mon }" 
          class="pack-percent__value"
        >{{ month }}% </div>
      </div>

      <div 
        v-if="year" 
        class="pack-percent__item">
        <div class="pack-percent__time">
          1 year.
        </div>
        <div 
          :style="{ color: change_color_year }" 
          class="pack-percent__value"
        >{{ year }}% </div>
      </div>
    </div>
    
    <a
      v-if="statusaccount === '0'"
      href="upgrade"
      class="aside-pack__link"
      @click.prevent="setPopup('upgrade-popup')"
    >
      GET PACK
    </a>

    <a
      v-else
      class="aside-pack__link"
      @click.prevent="checkStatus"
    >
      GET PACK
    </a>
  </div>
</template>

<style lang="scss">
.aside-pack {
  position: relative;
  border: 1px solid $grey;
  box-sizing: border-box;
  padding: em(30px);

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -1px;
    left: em(30px);
    right: em(30px);
    height: 1px;
    background-color: $blue;
  }

  &__title {
    $size: 20px;
    font-size: em($size);
  }

  &__link {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
  }
}

.pack-percent {
  display: flex;
  flex-wrap: wrap;
  margin-top: em(8px);
  margin-bottom: em(22px);

  &__item {
    margin-right: em(20px);
    &:last-child {
      margin-right: 0;
    }
  }

  &__time {
    $size: 12px;
    font-size: em($size);
    color: $grey;
    text-transform: uppercase;
    font-weight: bold;
  }

  &__value {
    color: $green;
  }
}
</style>
