<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import NavAccount from '~/components/nav/NavAccount';
import PlateTip from '~/components/content/PlateTip';
import NotificationSettingItem from '~/components/content/account/NotificationSettingItem';

export default {
  components: {
    NavAccount,
    PlateTip,
    NotificationSettingItem
  },
  head: {
    bodyAttrs: {
      class: 'account'
    }
  },

  data() {
    return {
      // change: '13.99',
      // is_active: false
    };
  },

  computed: {
    ...mapState('page', ['popup', 'userInfo']),

    email: {
      get() {
        return this.userInfo.email;
      },

      set(value) {
        this.changeUserEmail(value);
      }
    },

    is_active() {
      if (this.email) {
        return true;
      }
      return false;
    }
  }
};
</script>

<template>
  <div class="notification-setting">
    <BaseContainer>
      <BaseContent>
        <!--<BaseHeadline-->
        <!--  title="Notification setting"-->
        <!--  class="notification-setting__headline">-->
        <!--  Holder receive important news and notifications from the service.-->
        <!--</BaseHeadline>-->

        <div class="matrix__headline">
          <BaseHeadline
            title="Notification setting"
            class="matrix__headline-title"
          >
            <div class="matrix__headline-subtitle">
              Holder receive important news and notifications from the service.
            </div>
          </BaseHeadline>
        </div>

        <PlateTip
          title="Checkbox where you want to receive notifications"
          class="notification-setting__plate-tip"
        />

        <NotificationSettingItem
          :is_active="is_active"
          v-model="is_active"
          :data="email"
          label="E-mail"
          class="notification-setting__item"
        />
        
        <NotificationSettingItem
          label="Telegram-bot"
          class="notification-setting__item"
        />
        
        <NotificationSettingItem
          label="Slack-bot"
          class="notification-setting__item"
        />
        
        <NotificationSettingItem
          label="Google Calendar"
          class="notification-setting__item"
        />

        <BaseButton 
          type="primary" 
          class="notification-setting__button">
          SAVE
        </BaseButton>
      </BaseContent>

      <BaseAside>
        <NavAccount class="notification-setting__nav" />
        <BaseHelpBanner
          to="/help"
          icon="email"
          style="background-image: url(/img/help/1.png)"
        >
          SUPPORT TEAM
        </BaseHelpBanner>
      </BaseAside>
    </BaseContainer>
  </div>
</template>

<style lang="scss">
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

.notification-setting {
  &__nav {
    margin-bottom: em(50px);
  }
  &__button {
    margin-top: em(40px);
    @include ifmobile {
      margin-left: em(15px);
    }
  }
}
</style>
