<script>
import { mapActions } from 'vuex';

export default {
  components: {},
  props: {
    portfolio_id: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      market_key: null,
      market_secret: null,
      market_password: null
    };
  },

  computed: {},

  mounted() {},

  methods: {
    ...mapActions('page', ['makeRequestExchangeAuthPortfelData']),
    exchangeAuthPortfelData() {
      this.makeRequestExchangeAuthPortfelData({
        portfel_id: this.portfolio_id,
        market_key: this.market_key,
        market_secret: this.market_secret,
        market_password: this.market_password,
        exchange_portfels_button: ''
      });
    }
  }
};
</script>

<template>
  <div class="update-keys-form">
    <div class="update-keys-form__label">
      <div class="update-keys-form__title">
        UPDATE KEYS
      </div>
    </div>

    <div class="update-keys-form__form">
      <BaseInput
        v-model="market_key"
        type="password"
        name="key"
        icon="key"
        placeholder="API key"
        class="update-keys-form__input"
      />

      <BaseInput
        v-model="market_secret"
        type="password"
        name="secret"
        icon="secret"
        placeholder="API secret"
        class="update-keys-form__input"
      />

      <BaseInput
        v-model="market_password"
        type="password"
        name="secret"
        icon="secret"
        placeholder="PASSPHRASE"
        class="add-api-key-form__input"
      />

      <BaseButton
        :is-inactive="false"
        type="primary"
        class="update-keys-form__button"
        @click.native="exchangeAuthPortfelData"
      >
        UPDATE KEYS
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss">
.update-keys-form {
  display: flex;
  align-items: flex-start;

  &__label {
    display: flex;
    align-items: center;
    margin-top: em(12px);
    @include ifdesktop {
      margin-right: em(60px);
    }
  }

  &__title {
    $size: 14px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
  }

  &__form {
    width: em(262px);
    text-align: center;
  }

  &__input {
    margin-bottom: em(20px);
  }

  &__button {
    margin: em(20px) em(6px) 0;
  }
}
</style>
