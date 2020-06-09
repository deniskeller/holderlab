<script>
import CreateAccountSocnets from '~/components/content/final-and-setting/CreateAccountSocnets';
export default {
  components: {
    CreateAccountSocnets
  }
};
</script>

<template>
  <div class="create-account-form">
    <CreateAccountSocnets class="create-account-form__socnets" />

    <BaseInput
      name="name"
      icon="user"
      placeholder="First name"
      class="create-account-form__input"
    />

    <BaseInput
      name="lastname"
      icon="user"
      placeholder="Last name"
      class="create-account-form__input"
    />

    <BaseInput
      name="email"
      type="email"
      icon="email"
      placeholder="E-mail"
      class="create-account-form__input"
    />

    <BaseInput
      name="password"
      type="password"
      icon="eye"
      placeholder="Password"
      class="create-account-form__input"
    />

    <BaseInput
      error="Password is required"
      name="confirm"
      type="password"
      icon="eye"
      placeholder="Confirm password"
      class="create-account-form__input"
    />

    <BaseButton type="primary">
      CONTINUE
    </BaseButton>
    <BaseButton 
      :is-inactive="true" 
      type="primary">
      GO TO DASHBOARD
    </BaseButton>
  </div>
</template>

<style lang="scss">
.create-account-form {
  position: relative;
  &__input {
    display: block;
    width: 100%;
    margin-bottom: em(20px);
  }

  &__socnets {
    position: absolute;
    top: 0;
    right: em(-120px);
  }
}
</style>
