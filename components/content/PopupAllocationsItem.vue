<script>
/*PopupAllocationsItem*/
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    day: {
      type: Number,
      default: null
    },
    mon: {
      type: Number,
      default: null
    },
    year: {
      type: Number,
      default: null
    },
    count: {
      type: Number,
      default: null
    },
    id_coin: {
      type: String,
      default: null
    }
  },
  computed: {
    change_color_day() {
      if (this.day >= 0) {
        return '#81D540';
      } else {
        return '#E92A00';
      }
    },
    change_color_mon() {
      if (this.mon >= 0) {
        return '#81D540';
      } else {
        return '#E92A00';
      }
    },
    change_color_year() {
      if (this.year >= 0) {
        return '#81D540';
      } else {
        return '#E92A00';
      }
    }
  }
};
</script>

<template>
  <div class="popup-allocations-item">
    <div class="popup-allocations-item__col popup-allocations-item__col_1">
      <BaseCurrency 
        :id_market="id_coin" 
        :title="title" 
        type="coins" />
    </div>

    <div class="popup-allocations-item__col popup-allocations-item__col_2">
      <div class="popup-allocations-item__label">
        1 DAY
      </div>
      <div
        :style="{ color: change_color_day }"
        class="popup-allocations-item__value"
      >
        {{ day }}%
      </div>
    </div>

    <div class="popup-allocations-item__col popup-allocations-item__col_3">
      <div class="popup-allocations-item__label">
        1 MON.
      </div>
      <div
        :style="{ color: change_color_mon }"
        class="popup-allocations-item__value"
      >
        {{ mon }}%
      </div>
    </div>

    <div class="popup-allocations-item__col popup-allocations-item__col_4">
      <div class="popup-allocations-item__label">
        1 YEAR
      </div>
      <div
        :style="{ color: change_color_year }"
        class="popup-allocations-item__value"
      >
        {{ year }}%
      </div>
    </div>

    <div class="popup-allocations-item__count">
      {{ count }}
    </div>
  </div>
</template>

<style lang="scss">
.popup-allocations-item {
  height: em(70px);
  padding: 0 em(22px);
  border: 1px solid $grey;
  box-sizing: border-box;
  @extend %bottom-shadow;
  background-color: $white;
  margin-bottom: em(6px);

  position: relative;
  display: flex;
  align-items: center;

  &__col {
    &_1 {
      width: 40%;
    }
    &_2,
    &_3,
    &_4 {
      width: 16%;
    }
  }

  &__label {
    $size: 12px;
    font-size: em($size);
    color: $grey;
    text-transform: uppercase;
  }

  &__value {
    $size: 14px;
    font-size: em($size);
  }

  &__count {
    text-align: right;
    width: 12%;
  }
}
</style>
