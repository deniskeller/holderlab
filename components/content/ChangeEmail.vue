<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState('page', [])
  },

  methods: {
    ...mapMutations('page', ['setPopup']),

    ...mapActions('page', ['requestUserInfo', 'postChangeEmail']),

    upgradePopup() {
      this.postChangeEmail();
      this.setPopup(null);
    },

    upgradePopupCansel() {
      this.requestUserInfo();
      this.setPopup(null);
    }
  }
};
</script>

<template>
  <BaseSmallPopup class="change-email-popup">
    <BaseHeadline 
      title="A you shure?" 
      class="base-popup__headline">
      Change email?
    </BaseHeadline>

    <div class="rebalancing-load-portfolio-popup__buttons">
      <BaseButton
        type="secondary"
        class="rebalancing-load-portfolio-popup__button rebalancing-load-portfolio-popup__button-left"
        @click.native="upgradePopupCansel()"
      >
        CANCEL
      </BaseButton>

      <BaseButton
        type="primary"
        class="rebalancing-load-portfolio-popup__button"
        @click.native="upgradePopup()"
      >
        GO
      </BaseButton>
    </div>
  </BaseSmallPopup>
</template>

<style lang="scss" scoped>
.base-popup__container {
  max-width: 548px;
}
.rebalancing-load-portfolio-popup {
  &__input {
    margin-bottom: em(43px);
  }
  &__add-assets {
    margin: em(10px) 0 em(40px) 0;
  }
  &__buttons {
    @include ifmobile {
      text-align: center;
    }
  }
  &__button {
    @include ifmobile {
      $size: 10px;
      font-size: em($size);
    }
  }
  &__button-left {
    margin-right: em(28px);
  }
  .base-headline {
    border: none;
  }
  &__tags {
    margin: em(20px) 0 em(40px);
  }
  &__add-title {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
    margin-top: em(44px, $size);
  }
}
</style>
