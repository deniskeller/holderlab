<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="payment-next">
    <div class="payment-next__content">
      <div class="payment-next__title">
        NEXT PAYMENT
      </div>
      <div class="payment-next__date">
        24.04.2020
      </div>
      <div class="payment-next__subtitle">
        Pending earnings
      </div>
      <div class="payment-next__text">
        This is an estimate based on current leader/follow infotmation. The
        finalized amout will be calculated on the next payment date.
      </div>
    </div>

    <div class="payment-next__price">
      $ 0.00
    </div>
  </div>
</template>

<style lang="scss" scoped>
.payment-next {
  position: relative;
  @include ifmobile {
    padding: 0 em(15px);
  }
  &__content {
    max-width: em(400px);
  }
  &__title {
    $size: 14px;
    font-size: em($size);
    text-transform: uppercase;
    color: $grey;
    font-weight: bold;
  }

  &__text {
    color: $grey;
  }

  &__price {
    $size: 20px;
    font-size: em($size);
    color: $grey;
    @include ifdesktop {
      position: absolute;
      right: 0;
      top: em(50px, $size);
    }
  }
}
</style>
