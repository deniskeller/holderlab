<script>
import HelpHelpful from '~/components/content/help/HelpHelpful';
import RelatedArticles from '~/components/content/help/RelatedArticles';
export default {
  components: {
    HelpHelpful,
    RelatedArticles
  },
  data() {
    return {};
  }
};
</script>

<template>
  <div class="help-article">
    <BaseContainer>
      <BaseContent>
        <BaseHeadline
          title="How much does Wealthfront charge for its service?"
          class="help-article__headline"
        />
        <div class="help-article__text">
          We charge an annual advisory fee of 0.25% on all assets under
          management deducted monthly.* Wealthfront does not charge any
          account-opening fees, withdrawal or account-closing fees,
          trading/commission fees, or account transfer fees.
          <br >
          <br >Example Advisory Fee Calculation:
          <br >
          <br >An account with an average monthly balance of $100K will have a
          monthly advisory fee of $20.55. Assuming 30 days in the month and 365
          days in the year, the math is as follows: $100,000 * 0.0025 * (30/365)
          = $20.55.
          <br >
          <br >The only other fee you incur is the expense ratio embedded in
          the ETFs and mutual funds you will own. The one expense ratio
          Wealthfront earns is the 0.25% we charge for the Wealthfront Risk
          Parity Mutual Fund, which can represent up to 20% of your portfolio.
          Wealthfront 529 account fees are slightly different. You can view our
          529 fee details here.
        </div>
        <br >
        <div class="help-article__text help-article__text_grey">
          * Assets under management is defined as all assets held at Wealthfront
          except for those included in Selling Plan. *If you signed up prior to
          April 1, 2018, you will receive your first $10,000 managed for free.
          For an account with an average monthly balance of $100,000, your
          monthly advisory fee is $18.49 ($90,000 * .0025 * (30/365)).
        </div>

        <HelpHelpful class="help-article__helpful" />

        <RelatedArticles class="help-article__related-articles" />

        <nuxt-link to="/help">
          <BaseButton class="help-article__back-button">BACK TO FAQ</BaseButton>
        </nuxt-link>
      </BaseContent>

      <BaseAside>
        <BaseHelpBanner
          to="/help"
          style="background-image: url(/img/help/1.png)"
        >
          NOT FINDING WHAT YOU ARE LOOKING FOR?
        </BaseHelpBanner>
      </BaseAside>
    </BaseContainer>
  </div>
</template>

<style lang="scss">
.help-article {
  &__headline {
    margin-bottom: em(50px);
  }
  &__back-button,
  &__helpful {
    margin-top: em(40px);
  }

  &__back-button {
    @include ifmobile {
      margin-left: em(15px);
    }
  }

  &__related-articles {
    @include ifdesktop {
      margin-top: em(111px);
    }
    @include ifmobile {
      margin-top: em(50px);
    }
  }

  &__text {
    &_grey {
      color: $grey;
    }
    @include ifmobile {
      padding: 0 em(15px);
    }
  }
}
</style>
