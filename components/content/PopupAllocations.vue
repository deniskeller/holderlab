<script>
/*PopupAllocations*/
import popupAllocationsData from '~/assets/data/popup-allocations.json';
import PopupAllocationsItem from '~/components/content/PopupAllocationsItem';
export default {
  // components: {
  //   PopupAllocationsItem
  // },
  components: {
    PopupAllocationsItem
  },
  props: {
    coin_list: {
      type: Array,
      default: function() {
        return [
          {
            full_name: '',
            statistics: {
              day: '0',
              month: '0',
              year: '0'
            },
            balance: 0
          }
        ];
      }
    }
  },
  data() {
    return {
      popupAllocationsData
    };
  }
};
</script>

<template>
  <div class="popup-allocations">
    <BaseScrollBlock class="popup-allocations__scroll-block">
      <PopupAllocationsItem
        v-for="(item, index) in coin_list"
        :key="index"
        :title="item.full_name"
        :id_coin="item.id_coin"
        :day="item.statistics.day"
        :mon="item.statistics.month"
        :year="item.statistics.year"
        :count="item.balance"
        class="popup-allocations__item"
      />
    </BaseScrollBlock>
  </div>
</template>

<style lang="scss">
.popup-allocations {
  &__scroll-block {
    height: em(380px);
  }
}
</style>
