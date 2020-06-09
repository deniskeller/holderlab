<script>
import { mapActions } from 'vuex';
export default {
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    ...mapActions('page', ['postChangeRating']),

    use_yes_buttom() {
      this.postChangeRating({ id_: this.id, is_useful: true });
    },
    use_no_buttom() {
      this.postChangeRating({ id_: this.id, is_useful: false });
    }
  }
};
</script>

<template>
  <div class="help-helpful">
    <div class="help-helpful__title">
      WAS THIS ARTICLE HELPFUL
    </div>
    <div class="help-helpful__buttons">
      <BaseButton 
        type="secondary"
        @click.native ="use_no_buttom()">
        NO
      </BaseButton>
      <BaseButton 
        type="primary"
        @click.native ="use_yes_buttom()">
        YES, THANKS
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss">
.help-helpful {
  @include ifdesktop {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @include ifmobile {
    padding: 0 em(15px);
  }

  &__title {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    color: $blue;
  }
}
</style>
