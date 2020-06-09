<script>
import Logo from '~/components/header/Logo';
import DesktopMenu from '~/components/landing/DesktopMenu';

export default {
  components: {
    Logo,
    DesktopMenu
  }
};
</script>

<template>
  <div class="landing-header">
    
    <Logo class="landing-header__logo" />
    
    <div class="landing-header__menu">
      
      <DesktopMenu class="menu-desktop" />
      
      <div class="menu-btn">
        <BaseButton
          to="/landing-modal/hello"
          type="default"
          class="menu-btn__login"
        >
          LOG IN
        </BaseButton>

        <BaseButton 
          type="orange" 
          to="/landing-modal/welcome">
          GET STARTED
        </BaseButton>
      </div>
      
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
.landing-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: em(20px);
  width: 100%;
  align-items: center;

  /*position: fixed;*/
  /*top: 0;*/
  @include ifmobile {
    display: none;
  }

  &__logo {
    @include ifmobile {
      display: none;
    }
  }

  &__menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    .menu-desktop {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .menu-btn {
      display: flex;
      flex-direction: row;

      &__login {
        margin-right: em(15px);
        margin-left: em(45px);
      }
    }
  }
}
</style>
