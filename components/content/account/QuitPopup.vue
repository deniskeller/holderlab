<script>
import { mapMutations } from 'vuex';
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    date: {
      type: String,
      default: null
    },
    from: {
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
    ...mapMutations('page', ['setPopup','clearStore']),
    async logout() {
      await this.$store.dispatch('logout');
      this.setPopup(null);
      // this.clearStore();
    }
  }
};
</script>

<template>
  <BaseSmallPopup class="quit-popup">
    <BaseHeadline 
      title="Quit?" 
      class="quit-popup__headline">
      You will not be able to see your portfolio after exit
    </BaseHeadline>
    <div class="quit-popup__buttons">
      <BaseButton
        type="primary"
        class="quit-popup__button quit-popup__button-exit"
        to="/landing/"
        @click.native="logout" 
      >
        EXIT
      </BaseButton>
      <BaseButton 
        class="quit-popup__button" 
        @click.native="setPopup(null)">
        CANCEL
      </BaseButton>
    </div>
  </BaseSmallPopup>
</template>

<style lang="scss" scoped>
.quit-popup {
  .base-popup__container {
    box-shadow: 0 em(2px) em(1px) rgba(0, 0, 0, 0.1);
    @include ifdesktop {
      padding: em(50px);
      border: 1px solid $grey;
    }
  }

  &__buttons {
    @include ifmobile {
      text-align: center;
      margin-top: em(50px);
    }
  }
  &__button-exit {
    margin-right: em(20px);
  }
  .base-popup__close {
    display: none;
  }
}
</style>
