<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  data() {
    return {
      confirm_code_data: null
    };
  },
  computed: {
    ...mapState('page', ['secret_token', 'qr_code']),

    get_secret_token() {
      return this.secret_token;
    },

    get_qr_code() {
      return this.qr_code;
    }
  },
  mounted() {
    this.getQRCode();
  },
  methods: {
    ...mapActions('page', ['getQRCode', 'сonfirm2FAVerification']),

    ...mapMutations('page', ['setPopup', 'setConfirmCode']),

    newSetConfirmCode() {
      this.setConfirmCode(this.confirm_code_data);
      this.сonfirm2FAVerification();
      this.confirm_code_data = null;
    }
  }
};
</script>

<template>
  <BasePopup class="authenticator-popup">
    <BaseTitle class="authenticator-popup__title">
      Setup 2FA with Google Authenticator
    </BaseTitle>

    <BaseTitle 
      class="authenticator-popup__subtitle" 
      type="h3">
      Download the Google Authenticator App, then follow the instructions below.
    </BaseTitle>

    <BaseTitle 
      class="authenticator-popup__subtitle" 
      type="h3">
      Scan this QR code:
    </BaseTitle>
    
    <div class="authenticator-popup__content">
      <qrcode-vue 
        v-if = "get_qr_code" 
        :value="get_qr_code" 
        :size="215" 
        level="H"/>
    </div>

    

    <BaseTitle 
      class="authenticator-popup__subtitle" 
      type="h3">
      Enter 6-digit passcode from your Authenticator:
    </BaseTitle>

    <BaseInput
      v-model = "confirm_code_data"
      type="password"
      name="key"
      placeholder="Enter code:"
      class="authenticator-popup__input"
    />

    <BaseTitle
      class="authenticator-popup__subtitle authenticator-popup__subtitle-red"
      type="h3"
    >
      Backup this Secret Key, he can help you to recover your account:
    </BaseTitle>
    
    <BaseTitle 
      class="authenticator-popup__title" 
      type="h3">
      {{ get_secret_token }}
    </BaseTitle>
    <BaseButton 
      type="orange" 
      margin="0 auto"
      class="authenticator-popup__button"
      @click.native = "newSetConfirmCode()">
      CONFIRM
    </BaseButton>
  </BasePopup>
</template>

<style lang="scss" scoped>
.authenticator-popup {
  &__title {
    margin-top: em(10px);
    margin-bottom: em(30px);
    text-align: center;
    @include ifdesktop {
      white-space: nowrap;
    }
  }

  &__subtitle {
    font-size: em(16px);
    text-transform: inherit;
    text-align: center;
    margin-bottom: em(25px);
  }
  &__subtitle-red {
    color: $red;
  }

  &__content {
    width: 215px;
    /*height: em(215px);*/
    margin: 0 auto;
    margin-bottom: em(25px);
  }

  &__input {
    display: block;
    width: 100%;
    max-width: em(423px);
    margin: 0 auto;
    margin-bottom: em(30px);
  }

  &__button {
    display: block;
    margin: 0 auto;
  }
}
</style>
