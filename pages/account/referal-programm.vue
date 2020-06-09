<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import NavAccount from '~/components/nav/NavAccount';
import ShareIcon from '~/components/icons/ShareIcon';
import ReferalProgrammYourReferal from '~/components/content/account/ReferalProgrammYourReferal';
import ReferalProgrammShare from '~/components/content/account/ReferalProgrammShare';

export default {
  components: {
    NavAccount,
    ShareIcon,
    ReferalProgrammShare,
    ReferalProgrammYourReferal
  },
  head: {
    bodyAttrs: {
      class: 'account'
    }
  },

  computed: {
    ...mapState('page', ['userInfo']),

    referral_code() {
      return 'https://www.holderlab.io/promo-' + this.userInfo.referral_code;
    }
  },
  mounted() {
    this.refelals();
  },

  methods: {
    ...mapMutations('page', ['setPopup', 'setReferralInfo']),

    ...mapActions('page', ['refelals']),

    async copySomething() {
      try {
        await this.$copyText(this.referral_code);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<template>
  <div class="referal-programm">
    <BaseContainer>
      <BaseContent>
        <div class="matrix__headline">
          <BaseHeadline
            title="Holderlab Promo Program"
            class="matrix__headline-title"
          >
            <div class="matrix__headline-subtitle">
              Howdy Holder! Invite friends and take your free subscription
              month. Just invite 3 friends with your promo link. After they
              create portfolio, you take one free month on Holder Plan!
            </div>
          </BaseHeadline>
        </div>

        <div class="referal-programm-your-referal__title">
          COPY PROMO LINK:
        </div>

        <div class="referal-programm__link">
          {{ referral_code }}
          <ShareIcon 
            class="referal-programm__share-icon"
            @click.native = "copySomething()" />
        </div>

        <ReferalProgrammShare />

        <ReferalProgrammYourReferal class="referal-programm__your-referal" />
      </BaseContent>

      <BaseAside>
        <NavAccount class="referal-programm__nav" />
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

.referal-programm {
  .referal-programm-your-referal__title {
    $size: 14px;
    font-size: em($size);
    color: $grey;
    @include ifmobile {
      padding-top: em(20px);
      padding-left: em(17px);
    }
  }
  &__nav {
    margin-bottom: em(50px);
  }
  &__link {
    position: relative;
    color: $blue;
    padding: em(10px) 0;
    border-bottom: 1px solid $grey;
    margin-bottom: em(20px);
    @include ifmobile {
      padding: em(10px) em(15px);
    }
  }
  &__share-icon {
    position: absolute;

    top: 50%;
    transform: translateY(-50%);
    width: em(18px);
    height: em(20px);
    fill: $blue;
    cursor: pointer;
    @include ifdesktop {
      right: 0;
    }
    @include ifmobile {
      right: em(15px);
    }
  }
  &__your-referal {
    margin-top: em(50px);
    @include ifmobile {
      padding: 0 em(15px);
    }
  }
}
</style>
