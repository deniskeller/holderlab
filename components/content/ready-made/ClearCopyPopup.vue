<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  props: {
    id_portfel: {
      type: String,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    ...mapMutations('page', ['setPopup']),
    ...mapActions('page', ['makeRequestSubscription']),
    subscribe() {
      this.makeRequestSubscription(this.id_portfel);
    }
  }
};
</script>

<template>
  <BaseSmallPopup class="clear-copy-popup">
    <BaseTitle class="clear-copy-popup__title">
      A you shure?
    </BaseTitle>
    <div class="clear-copy-popup__text">
      Clear and copy.
    </div>
    <BaseButton
      type="primary"
      class="clear-copy-popup__button"
      @click.native="subscribe()"
    >
      COPY PORTFOLIO
    </BaseButton>
    <BaseButton 
      class="clear-copy-popup__button" 
      @click.native="setPopup(null)">
      CANCEL
    </BaseButton>
  </BaseSmallPopup>
</template>

<style lang="scss" scoped>
.clear-copy-popup {
  @include ifdesktop {
    width: em(548px);
    left: 50%;
    margin-left: em(-274px);
  }

  .base-popup__close {
    display: none;
  }

  .base-popup__container {
    border: 1px solid $grey;
    box-shadow: 0 em(2px) em(1px) rgba(0, 0, 0, 0.1);
    @include ifdesktop {
      padding: em(40px) em(50px);
    }
    @include ifmobile {
      padding: em(15px);
    }
  }

  &__text {
    margin-bottom: em(20px);
  }

  &__button {
    margin-right: em(20px);
  }
}
</style>
