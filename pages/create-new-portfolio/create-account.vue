<script>
import NavCreateNewPortfolio from '~/components/nav/NavCreateNewPortfolio';
import CreateAccountForm from '~/components/content/final-and-setting/CreateAccountForm';
import MoreOpportunities from '~/components/content/final-and-setting/MoreOpportunities';

import chooseReason from '~/assets/data/choose-reason.json';

export default {
  components: {
    NavCreateNewPortfolio,
    CreateAccountForm,
    MoreOpportunities
  },
  data() {
    return {
      chooseReason,
      active: 1
    };
  }
};
</script>

<template>
  <div class="final-and-setting">
    <NavCreateNewPortfolio class="final-and-setting__nav" />

    <BaseContainer>
      <BaseContent>
        <BaseHeadline title="Create account">
          Let's see what we have mathematical tools. To try a free account (3
          months) and started. By clicking continue you agree to the transfer of
          <a href="#">personal data.</a>
        </BaseHeadline>
        <CreateAccountForm class="final-and-setting__create-account-form" />
      </BaseContent>

      <BaseAside>
        <BaseHelpBanner
          to="/help"
          style="background-image: url(/img/help/4.png)"
          class="final-and-setting__help-banner"
        >
          WHERE IS MY NEW PORTFOLIO
        </BaseHelpBanner>
        <BaseHelpBanner
          :test="true"
          to="/help"
          style="background-image: url(/img/help/risk-test.png)"
          class="final-and-setting__risk-test"
        >
          RISK TEST
        </BaseHelpBanner>
      </BaseAside>
    </BaseContainer>

    <MoreOpportunities class="final-and-setting__more-opportunities" />
  </div>
</template>

<style lang="scss" scoped>
.final-and-setting {
  &__nav {
    @include ifmobile {
      display: none;
    }
  }
  &__choose-reason {
    margin: em(10px) 0 em(48px);
  }

  &__help-banner {
    margin-bottom: em(20px);
  }

  &__create-account-form {
    width: em(423px);
    margin-top: em(40px);
  }
}
</style>
