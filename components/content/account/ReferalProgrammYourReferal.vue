<script>
import { mapState, mapMutations } from 'vuex';
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState('page', ['userInfo', 'referralInfo']),

    invait() {
      return this.referralInfo.invait;
    },
    free_mounth() {
      return this.referralInfo.free_mounth;
    }
  },
  methods: {
    ...mapMutations('page', ['setPopup', 'setReferralInfo'])
  }
};
</script>

<template>
  <div class="referal-programm-your-referal">
    <div class="referal-programm-your-referal__title">
      YOUR REFERAL
    </div>
    <div class="referal-programm-your-referal__items">
      <div class="referal-programm-your-referal__item">
        <div class="referal-programm-your-referal__value">
          {{ invait }}
        </div>
        <div class="referal-programm-your-referal__label">
          INVITE
        </div>
      </div>
      <div class="referal-programm-your-referal__item">
        <div class="referal-programm-your-referal__value">
          {{ free_mounth }}
        </div>
        <div class="referal-programm-your-referal__label">
          FREE HOLDER MONTH
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.referal-programm-your-referal {
  &__title {
    $size: 14px;
    font-size: em($size);
    color: $grey;
  }
  &__items {
    display: flex;
    margin-top: em(20px);
  }
  &__item {
    width: em(200px);
  }
  &__value {
    $size: 26px;
    font-size: em($size);
  }
  &__label {
    $size: 12px;
    font-size: em($size);
  }
}
</style>
