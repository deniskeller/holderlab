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
    day: {
      type: String,
      default: null
    },
    month: {
      type: String,
      default: null
    },
    year: {
      type: String,
      default: null
    }
  },
  computed: {
    change_color_day() {
      if (Number(this.day)<0 ) {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    },
    change_color_month() {
      if (Number(this.month<0) ) {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    },
    change_color_year() {
      if (Number(this.year<0 )) {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    }
  },
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="matrix-aside-pack">
    <div 
      class="matrix-aside-pack__title" 
      v-html="title" />
    <div 
      class="matrix-aside-pack__text" 
      v-html="text" />

    <div class="matrix-pack-percent matrix-aside-pack__percent">
      <div 
        v-if="day" 
        class="matrix-pack-percent__item">
        <div class="matrix-pack-percent__time">
          1 day
        </div>
        <div
          :style="{ color: change_color_day }"
          class="matrix-pack-percent__value"
          v-html="day"
        />
      </div>

      <div 
        v-if="month" 
        class="matrix-pack-percent__item">
        <div class="matrix-pack-percent__time">
          1 mon.
        </div>
        <div
          :style="{ color: change_color_month }"
          class="matrix-pack-percent__value"
          v-html="month"
        />
      </div>

      <div 
        v-if="year" 
        class="matrix-pack-percent__item">
        <div class="matrix-pack-percent__time">
          1 year.
        </div>
        <div
          :style="{ color: change_color_year }"
          class="matrix-pack-percent__value"
          v-html="year"
        />
      </div>
    </div>

    <a
      href="upgrade"
      class="matrix-aside-pack__link"
      @click.prevent="setPopup('upgrade-popup')"
    >
      GET PACK
    </a>
  </div>
</template>

<style lang="scss" scoped>
.matrix-aside-pack {
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

.matrix-pack-percent {
  display: flex;
  margin-top: em(8px);
  margin-bottom: em(22px);

  &__item {
    margin-right: em(20px);
  }

  &__time {
    $size: 12px;
    font-size: em($size);
    color: $grey;
    text-transform: uppercase;
    font-weight: bold;
  }
}
</style>
