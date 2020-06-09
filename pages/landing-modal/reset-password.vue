<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import CloseModal from '~/components/landing-modal/CloseModal';

const emailCheckRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export default {
  layout: 'modal',
  components: {
    CloseModal
  },
  data() {
    return {
      email: null,
      isEmailTouched: false
    };
  },
  computed: {
    ...mapState('page', ['popup']),
    isEmailValid() {
      return this.email == '' || emailCheckRegex.test(this.email);
    }
  },
  methods: {
    ...mapMutations('page', ['setPopup']),
    ...mapActions('page', ['resetPassword']),
    click_button() {
      this.resetPassword(this.email);
    }
  }
};
</script>

<template>
  <div class="content">
    <div class="modal modal-hello">
      <div class="modal-header">
        <div class="modal-title">
          RESET PASSWORD
        </div>
        <CloseModal class="close-modal" />
      </div>
      <div class="modal-inputs">
        <BaseInput
          v-model="email"
          :class="{ error: !isEmailValid }"
          name="name"
          type="email"
          placeholder="E-mail"
          class="modal-input modal-input__email"
        />
      </div>
      <div class="modal-action">
        <div class="modal-action__save">
          <div class="modal-action__save-title">
            Enter your email address and you will receive an email with <br >
            instructions for resetting your password.
          </div>
        </div>
      </div>
      <div class="modal-btn">
        <BaseButton
          :is-inactive="!isEmailValid"
          type="orange"
          class="modal-btn__save"
          @click.native = "click_button"
        >
          RESET
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
  background: url('/img/reset_password.png') no-repeat 100% 100%;
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
      width: 100%;
      margin-bottom: em(33px);
      .modal-input {
        max-width: em(420px);
        width: 100%;
      }
    }
    .modal-action {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: em(35px);
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
          line-height: em(29px);
          margin-right: em(20px);
        }
        .modal-action__save-btn {
          line-height: 0;
        }
      }
    }
    .modal-btn {
      display: flex;
      justify-content: flex-end;
      width: 100%;
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
