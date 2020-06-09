<script>
import NavCreateNewPortfolio from '~/components/nav/NavCreateNewPortfolio';
import PlateTip from '~/components/content/PlateTip';
import ReasonItem from '~/components/content/final-and-setting/ReasonItem';

import chooseReason from '~/assets/data/choose-reason.json';

export default {
  components: {
    NavCreateNewPortfolio,
    PlateTip,
    ReasonItem
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
        <BaseHeadline title="The portfolio is created!">
          Greetings! You have created a wonderful portfolio. We will ask you a
          set of questions to get you started.
        </BaseHeadline>

        <PlateTip
          title="What is your primary reason for investing?"
          type="light-blue"
          class="final-and-setting__plate-tip"
        />

        <div class="final-and-setting__choose-reason">
          <ReasonItem
            v-for="(item, index) in chooseReason"
            :key="index"
            :title="item.title"
            :link="item.link"
            :is-active="index === active"
            @click.native="active = index"
          />
        </div>

        <BaseButton type="secondary">
          BACK
        </BaseButton>
        <BaseButton 
          to="create-account" 
          type="primary">
          SKIP TEST
        </BaseButton>
      </BaseContent>

      <BaseAside>
        <BaseHelpBanner
          to="/help"
          style="background-image: url(/img/help/4.png)"
        >
          WHERE IS MY NEW PORTFOLIO
        </BaseHelpBanner>
      </BaseAside>
    </BaseContainer>
  </div>
</template>

<style lang="scss" scoped>
.final-and-setting {
  &__choose-reason {
    margin: em(10px) 0 em(48px);
  }
}
</style>
