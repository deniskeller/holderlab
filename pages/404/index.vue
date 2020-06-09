<script>
export default {
  components: {},
  data() {
    return {};
  }
};
</script>

<template>
  <div class="help">
    <BaseContainer class="container-error">
      <div class="error">
        <div class="error__title">
          <span class="error__title-item">4</span>
          <span class="error__title-img">
            <img 
              src="@/static/img/rocket404.png" 
              alt="" >
          </span>
          <span class="error__title-item">4</span>
        </div>

        <div class="error__subtitle">
          Unfortunately, such a page does not exist. It was probably removed or
          it was never here. <br >
          Come back
        </div>

        <div class="error__btn">
          <BaseButton 
            to="/" 
            type="primary" 
            class="">
            GO BACK
          </BaseButton>

          <BaseButton 
            to="/dashboard" 
            type="orange" 
            class="">
            RETURN TO DASHBOARD
          </BaseButton>
        </div>
      </div>
    </BaseContainer>
  </div>
</template>

<style lang="scss" scoped>
.container-error {
  @include ifmobile {
    padding-left: em(20px);
    padding-right: em(20px);
  }
}
.error {
  width: 100%;
  padding-top: em(150px);
  padding-bottom: em(150px);
  @include ifmobile {
    padding-top: em(50px);
    padding-bottom: em(50px);
  }

  &__title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: em(30px);
    &-item {
      font-size: em(288px);
      font-weight: bold;
      @include ifmobile {
        font-size: em(142px);
      }
    }
    &-img {
      width: em(260px);
      height: em(400px);
      position: relative;
      img {
        position: absolute;
        top: em(-230px);
        height: em(650px);
        width: 100%;
        @include ifmobile {
          top: em(-110px);
          height: em(450px);
        }
      }
    }
  }

  &__subtitle {
    width: 100%;
    max-width: em(610px);
    margin: 0 auto;
    font-size: em(24px);
    font-weight: bold;
    margin-bottom: em(60px);
    @include ifmobile {
    }
  }

  &__btn {
    width: 100%;
    max-width: em(350px);
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
