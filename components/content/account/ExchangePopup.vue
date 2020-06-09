<script>
import PopupAllocations from '~/components/content/PopupAllocations';
import UpdateKeysForm from '~/components/content/UpdateKeysForm';

import allocatedAssets from '~/assets/data/allocated-assets.json';
export default {
  components: {
    PopupAllocations,
    UpdateKeysForm
  },
  data() {
    return {
      allocatedAssets
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <BasePopup class="exchange-popup">
    <BaseHeadline
      title="Bestbruho13"
      class="base-popup__headline exchange-popup__headline"
    >
      <div class="exchange-popup-money exchange-popup__money">
        <BaseCurrency 
          title="Binance" 
          class="exchange-popup-money__currency" />
        <div class="exchange-popup-money__value">
          $767.00981
        </div>
      </div>
    </BaseHeadline>

    <div class="exchange-popup__allocations-headline">
      Allocations
      <span class="exchange-popup__allocations-headline-number">19</span>
    </div>
    <PopupAllocations class="exchange-popup__allocations" />

    <UpdateKeysForm class="exchange-popup__update-keys-form" />
  </BasePopup>
</template>

<style lang="scss">
.exchange-popup {
  &__headline {
    @include ifdesktop {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  &__allocations-headline {
    $size: 14px;
    font-size: em($size);

    @include ifmobile {
      padding: 0 em(15px);
    }

    &-number {
      color: $grey;
    }
    margin-bottom: em(14px, $size);
  }

  &__update-keys-form {
    @include ifdesktop {
      margin-top: em(44px);
    }
    @include ifmobile {
      margin: em(30px) em(15px);
    }
  }

  &__footer {
    margin: em(60px) em(-130px) em(-70px) em(-97px);
  }
}
.exchange-popup-money {
  display: flex;
  @include ifmobile {
    justify-content: center;
  }
  &__value {
    margin-left: em(40px);
  }
}
</style>
