<script>
import { mapState, mapActions, mapMutations } from 'vuex';

import CloseModal from '~/components/landing-modal/CloseModal';
// import ApiService from '@/services/ApiService';

const emailCheckRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export default {
  layout: 'modal',
  components: {
    CloseModal
  },
  data() {
    return {
      password: null,
      email: null,
      code_2fa: null,
      isEmailTouched: false
    };
  },
  computed: {
    ...mapState('page', [
      'popup'
      // 'secretToken'
    ]),
    isEmailValid() {
      return this.email == '' || emailCheckRegex.test(this.email);
    },
    is_2fa() {
      return this.$store.state.is_2fa;
    }
  },

  watch: {
    // secretToken() {
    //   this.$cookie.set('secret_token', this.secretToken, 10);
    //   this.$router.push({ path: '/dashboard' });
    // }
  },
  mounted() {
    // if  (this.$route.params){
    //   this.confirmEmail({
    //     uidb64:this.$route.params.uidb64,
    //     token:this.$route.params.token})
    // }
  },
  
  methods: {
    ...mapActions('page', ['makeLogin', 'confirmEmail']),
    
    ...mapMutations('page', ['setActiveEmailReg','setPassLog']),
    
    custom_login(){
      this.setActiveEmailReg(this.email);
      this.setPassLog(this.password);
      this.login()
    },
    
    async login() {
      await this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
        code_2fa: this.code_2fa
      });
    }
  }
};
</script>

<template>
  <div class="content">
    <div class="modal modal-hello">
      <div class="modal-header">
        <div class="modal-title">
          HELLO, <span class="modal-title__orange">HOLDER!</span>
        </div>
        <CloseModal class="close-modal" />
      </div>
      <div class="modal-inputs">
        <BaseInput
          :editable="true"
          v-model="email"
          :class="{ error: !isEmailValid }"
          name="name"
          type="email"
          placeholder="E-mail"
          class="modal-input modal-input__email"
        />

        <BaseInput
          v-model="password"
          type="password"
          name="key"
          icon="eye"
          placeholder="Password"
          class="modal-input modal-input__password"
        />

        <BaseInput
          v-if = "is_2fa"
          v-model="code_2fa"
          type="text"
          placeholder="Enter 2FA code"
          class="modal-input modal-input__code"
        />
      </div>
      <div class="modal-action">
        <nuxt-link
          to="/landing-modal/reset-password"
          class="modal-action__forgot"
        >Forgot password?</nuxt-link
        >
        <div class="modal-action__save">
          <div class="modal-action__save-title">Remember me</div>
          <div class="modal-action__save-btn">
            <BaseCheckboxFilter />
          </div>
        </div>
      </div>
      <div class="modal-btn">
        <BaseButton
          :is-inactive="!isEmailValid || !password"
          type="orange"
          class="modal-btn__login"
          @click.native="custom_login"
        >
          LOG IN
        </BaseButton>
        <BaseButton 
          to="/landing-modal/welcome" 
          type="default">
          SIGN UP
        </BaseButton>
      </div>
    </div>
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
  background: url('/img/modal_hello.png') no-repeat 100% 100%;
  -webkit-background-size: cover;
  background-size: cover;
  .modal {
    width: 100%;
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
      margin-bottom: em(123px);
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
      margin-bottom: em(33px);
      .modal-input {
        max-width: em(420px);
        width: 100%;
      }
      .modal-input__email {
        margin-bottom: em(20px);
      }
      .modal-input__password {
        margin-bottom: em(20px);
      }
    }
    .modal-action {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: em(95px);
      &__forgot {
        font-size: em(16px);
        line-height: em(20px);
        color: $white;
        cursor: pointer;
        &:hover {
          color: #0395ff;
        }
      }
      &__save {
        display: flex;
        flex-direction: row;
        align-items: center;
        .modal-action__save-title {
          color: $white;
          font-size: em(12px);
          line-height: em(14px);
          margin-right: em(20px);
        }
        .modal-action__save-btn {
          line-height: 0;
        }
      }
    }
    .modal-btn {
      display: flex;
      flex-direction: row;
      justify-content: center;
      &__login {
        margin-right: em(10px);
      }
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
</style>
