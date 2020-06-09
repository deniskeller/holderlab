<script>
import { mapMutations, mapActions } from 'vuex';
export default {
  data() {
    return {
      old_password: null,
      new_password1: null,
      new_password2: null
    };
  },
  computed: {
    error_password() {
      if (
        this.new_password1 != this.new_password2 ||
        this.new_password2 == ''
      ) {
        return false;
      }
    }
  },

  mounted() {},

  beforeDestroy() {
    this.old_password = '';
    this.new_password1 = '';
    this.new_password2 = '';
  },

  methods: {
    ...mapActions('page', ['changePassword']),
    ...mapMutations('page', ['setPopup']),
    methodsChangePassword() {
      this.changePassword({
        old_password: this.old_password,
        new_password1: this.new_password1,
        new_password2: this.new_password2
      });
      this.setPopup(null);
    }
  }
};
</script>

<template>
  <BaseSmallPopup class="password-setting-popup">
    <BaseTitle 
      class="password-setting-popup__title" 
      type="h2">
      Password settings
    </BaseTitle>

    <div class="password-setting-popup__content">
      <BaseInput
        v-model = "old_password"
        type="password"
        name="key"
        icon="key"
        placeholder="Current password"
        class="update-keys-form__input"
      />

      <BaseInput
        v-model = "new_password1"
        type="password"
        name="secret"
        icon="secret"
        placeholder="New password"
        class="update-keys-form__input"
      />

      <BaseInput
        v-model = "new_password2"
        type="password"
        name="secret"
        icon="secret"
        placeholder="Confirm password"
        class="add-api-key-form__input"
      />
    </div>

    <BaseButton 
      type="primary" 
      class="password-setting-popup__button"
      @click.native = "methodsChangePassword">
      CHANGE PASSWORD
    </BaseButton>
  </BaseSmallPopup>
</template>

<style lang="scss" scoped>
.password-setting-popup {
  @include ifdesktop {
    width: em(412px);
    left: 50%;
    margin-left: em(-206px);
  }

  &__title {
    margin-top: em(10px);
    margin-bottom: em(10px);
    text-align: center;
  }

  &__content {
    width: 100%;
    max-width: em(262px);
    margin: 0 auto;
    margin-bottom: em(40px);
  }

  &__button {
    display: block;
    margin: 0 auto;
  }
}
</style>
