<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import NavAccount from '~/components/nav/NavAccount';
import MyHolderlabItem from '~/components/content/account/MyHolderlabItem';
import SubscriptionsPopup from '~/components/content/subscriptions/SubscriptionsPopup';
import PasswordSettingPopup from '~/components/content/account/PasswordSettingPopup';
import AuthenticatorPopup from '~/components/content/account/AuthenticatorPopup';
import ChangeEmail from '~/components/content/ChangeEmail';
import Delete2FA from '~/components/content/Delete2FA';
import UpgradePopup from '~/components/content/UpgradePopup';

export default {
  components: {
    NavAccount,
    MyHolderlabItem,
    PasswordSettingPopup,
    AuthenticatorPopup,
    SubscriptionsPopup,
    ChangeEmail,
    Delete2FA,
    UpgradePopup
  },
  head: {
    bodyAttrs: {
      class: 'account'
    }
  },
  data() {
    return {
      account_name: ''
    };
  },
  computed: {
    ...mapState('page', ['popup', 'userInfo']),

    is_confirmed_email: {
      get() {
        if (this.userInfo.is_confirmed_email) {
          return 'VERIFYED';
        } else {
          return 'NOT VERIFYED';
        }
      }
    },

    login: {
      get() {
        return this.userInfo.login;
      },

      set(value) {
        this.changeUserLogin(value);
      }
    },
    

    holder_plan: {
      get() {
        if (this.userInfo.status_account == 0)
          return 'Free';
        if (this.userInfo.status_account == 1)
          return 'Holder Plan';
        if (this.userInfo.status_account == 2)
          return 'Holder Pro Plan';
      }
    },
    
    email: {
      get() {
        return this.userInfo.email;
      },

      set(value) {
        this.changeUserEmail(value);
      }
    },
    date_end_vip: {
      get() {
        return this.userInfo.date_end_vip;
      }
    },
    is_business_account() {
      return this.userInfo.is_business_account;
    },

    is_ip_verification: {
      get() {
        return this.userInfo.is_ip_verification;
      },
      set(value) {
        return this.changeIpVerification(value);
      }
    },

    is_2fa_verification: {
      get() {
        return this.userInfo.is_2fa_verification;
      }
    }
  },

  methods: {
    ...mapActions('page', ['postChangeUsername', 'getQRCode']),
    ...mapMutations('page', [
      'setPopup',
      'changeUserEmail',
      'changeUserLogin',
      'changeUserName',
      'change2faVerification',
      'changeIpVerification'
    ]),

    upgrade_authenticator_popup() {
      if (!this.is_2fa_verification) {
        this.setPopup('authenticator-popup');
        this.getQRCode();
      } else {
        this.setPopup('delete-portfolio-popup');
      }
    }
  }
};
</script>

<template>
  <div class="my-holderlab">
    <BaseContainer>
      <BaseContent>
        <div class="matrix__headline">
          <BaseHeadline
            :editable="false"
            :account_name="login"
            title="Hello!"
            class="matrix__headline-title"
          >
            <div class="matrix__headline-subtitle">
              It’s your personal data.
            </div>
          </BaseHeadline>
        </div>

        <MyHolderlabItem
          v-model="login"
          :functions = "postChangeUsername"
          :editable="true"
          :data="login"
          label="HOLDERLAB NAME"
          placeholder="Change name"
          class="my-holderlab__item"
        />

        <MyHolderlabItem
          :editable="true"
          :verifyed="is_confirmed_email"
          :data="email"
          v-model = "email"
          type="email"
          label="E-MAIL"
          placeholder="Change e-mail"
          class="my-holderlab__item"
        />

        <MyHolderlabItem
          :editable="true"
          label="PASSWORD"
          placeholder="Change password"
          data="Password settings"
          class="my-holderlab__item"
          @click.native="setPopup('password-setting-popup')"
        />

        <MyHolderlabItem
          :data="date_end_vip"
          label="NEXT PAYMENT"
          class="my-holderlab__item"
        >
          <span
            class="my-holderlab__item-popup"
            href=""
            @click="setPopup('upgrade-popup')"
          >
            {{holder_plan}}
            </span>
        </MyHolderlabItem>

        <MyHolderlabItem
          label="SUBSCRIPTION PROFILE"
          class="my-holderlab__item"
        >
          Manage your subscription profile.
          <BaseButton
            
            class="my-holderlab__item-button"
            @click.native="setPopup('subscriptions-popup')"
          >
            EDIT PROFILE
          </BaseButton>
        </MyHolderlabItem>

        <MyHolderlabItem
          label="VERIFICATION OF IP ADDRESS"
          class="my-holderlab__item"
        >
          <div class="my-holderlab__item-text">
            You can enable IP address verification to protect your account.
          </div>
          <BaseCheckboxFilter
            v-model = "is_ip_verification"
            :is-active = "is_ip_verification"
            class="my-holderlab__item-checkbox" />
        </MyHolderlabItem>

        <MyHolderlabItem 
          label="ENABLE 2FA" 
          class="my-holderlab__item">
          <div class="my-holderlab__item-text">
            For the security of your account, we recommend that you enable 2FA
            verification via Google Authenticator. We will remember your device
            for one month.
          </div>
          <BaseCheckboxFilterProps
            :is_active = "is_2fa_verification"
            class="my-holderlab__item-checkbox"
            @click.native = "upgrade_authenticator_popup()"
          />
        </MyHolderlabItem>
      </BaseContent>

      <BaseAside>
        <NavAccount class="my-holderlab__nav" />
        <BaseHelpBanner
          to="/help"
          icon="email"
          style="background-image: url(/img/help/1.png)"
        >
          SUPPORT TEAM
        </BaseHelpBanner>
      </BaseAside>
    </BaseContainer>
    <SubscriptionsPopup class="subscriptions__popup" />
    <PasswordSettingPopup class="password-setting__popup" />
    <ChangeEmail class="change-email-popup" />
    <Delete2FA class="delete-portfolio-popup" />
    <AuthenticatorPopup class="authenticator__popup" />
    <UpgradePopup class="upgrade__popup" />
  </div>
</template>

<style lang="scss" scoped>
.matrix__headline {
  @include ifmobile {
    background: $purple;
    text-align: center;
    color: $white;
    width: 100%;
  }
  .matrix__headline-subtitle {
    @include ifmobile {
      display: none;
    }
  }
}

.my-holderlab {
  &__nav {
    @include ifdesktop {
      margin-bottom: em(50px);
    }
  }
  &__item-popup {
    color: $blue;
    cursor: pointer;
  }
  &__item-checkbox {
    position: absolute;
    right: 0;
    top: 50%;
    @include ifmobile {
      position: static;
      margin-top: em(15px);
    }
  }
  &__item-button {
    position: absolute;
    right: 0;
    top: 30%;
    @include ifmobile {
      position: static;
      margin-top: em(15px);
    }
  }
}
</style>
