<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import CloseModal from '~/components/landing-modal/CloseModal';

const emailCheckRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default {
  layout: 'modal',
  components: {
    CloseModal
  },
  data: function() {
    return {
      login: null,
      password: null,
      confirm_password: null,
      promo: null,
      email: null,
      isEmailTouched: false,
      isCheckboxFilter: false
    };
  },

  computed: {
    ...mapState('page', ['popup','activeEmailReg']),
    isEmailValid() {
      return this.email == '' || emailCheckRegex.test(this.email);
    }
  },

  watch: {
    secretToken() {
      this.$cookie.set('secret_token', this.secretToken, 10);
      this.$router.push({ path: '/dashboard' });
    }
  },

  mounted() {},
  
  methods: {
    ...mapActions('page', ['makeRegister']),

    ...mapMutations('page', ['setPopup','setActiveEmailReg','setPassLog']),

    registerUser() {
      this.setActiveEmailReg(this.email);
      this.setPassLog(this.password);
      this.makeRegister({
        login: this.login,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
        promo: this.promo
      })
      this.$router.push({ path: '/landing-modal/signing-up/' });
    }
  }
};
</script>

<template>
  <div class="content">
    <form @submit.prevent="someAction()">
      <div class="field">
        <div class="modal modal-hello">
          <div class="modal-header">
            <div class="modal-title">
              WELCOME <span class="modal-title__orange">HOLDER!</span>
            </div>
            <CloseModal class="close-modal" />
          </div>
          <div class="modal-inputs">
            <BaseInput
              :editable="true"
              v-model="login"
              type="text"
              name="name"
              placeholder="Holder name"
              class="modal-input modal-input__email"
            />
            <BaseInput
              :editable="true"
              v-model="email"
              :class="{ error: !isEmailValid }"
              name="name"
              type="email"
              placeholder="E-mail"
              class="modal-input modal-input__email"
            />
            <!--<div v-if="!isEmailValid">Поле заполено неверно </div> -->
            <BaseInput
              v-model="password"
              type="password"
              name="key"
              icon="eye"
              placeholder="Password"
              class="modal-input modal-input__password"
            />
            <BaseInput
              v-model="confirm_password"
              type="password"
              name="key"
              icon="eye"
              placeholder="Repeat password"
              class="modal-input modal-input__password"
            />
            <BaseInput
              v-model="promo"
              :editable="true"
              name="name"
              type="text"
              placeholder="Promo code"
              class="modal-input modal-input__email"
            />
          </div>

          <div class="modal-action">
            <BaseCheckboxFilter
              :is-active="isCheckboxFilter"
              v-model="isCheckboxFilter"
              class="modal-action__btn"
            />
            <div class="modal-action__text">
              Review our
              <a
                href="https://holderlab.io/landing-terms-of-service/"
                target="_blank"
                class="orange"
              >terms of service</a
              >
              and
              <a
                href="https://holderlab.io/landing-privacy-policy/"
                target="_blank"
                class="orange"
              >privacy policy</a
              >, if you agree and confirm that you are 18 years old or more.
            </div>
          </div>
          <div class="modal-btn">
            <BaseButton 
              to="/landing-modal/hello" 
              type="default">
              LOG IN
            </BaseButton>
            <BaseButton
              :is-inactive="
                !login ||
                  !isEmailValid ||
                  !password ||
                  !confirm_password ||
                  password != confirm_password ||
                  !isCheckboxFilter
              "
              type="orange"
              class="modal-btn__login"
              @click.native="registerUser"
            >
              GO
            </BaseButton>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.content {
  $this: &;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  height: 100%;
  background: url('/img/modal_welcome.png') no-repeat 100% 100%;
  -webkit-background-size: cover;
  background-size: cover;
  .modal {
    /*width: 100%;*/
    max-width: em(420px);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 0 auto;
    @include ifmobile {
      padding: em(20px);
    }
    .modal-header {
      margin-bottom: em(31px);
      .modal-title {
        font-size: em(36px);
        font-weight: 600;
        color: $white;
        line-height: em(32px);
        @include ifmobile {
          font-size: em(24px);
        }
        &__orange {
          color: $orange;
        }
      }
    }
    .modal-inputs {
      margin-bottom: em(20px);
      .modal-input {
        max-width: em(420px);
        width: 100%;
        margin-bottom: em(20px);
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .modal-action {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-bottom: em(25px);
      &__text {
        max-width: em(410px);
        font-size: em(12px);
        line-height: em(28px);
        color: $white;
        a.orange {
          color: $orange;
          cursor: pointer;
        }
      }
      &__btn {
        margin-right: em(25px);
      }
    }
    .modal-btn {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .close-modal {
      position: absolute;
      right: em(-20px);
      top: em(22px);
      @include ifmobile {
        right: em(20px);
        top: em(30px);
      }
    }
  }
}
.error {
  border-color: red;
}
</style>
