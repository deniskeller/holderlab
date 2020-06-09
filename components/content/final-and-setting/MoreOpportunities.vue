<script>
import { mapMutations } from 'vuex';
import MoreOpportunitiesItem from '~/components/content/final-and-setting/MoreOpportunitiesItem';
import moreOpportunitiesItems from '~/assets/data/more-opportunities-items.json';

export default {
  components: {
    MoreOpportunitiesItem
  },
  data() {
    return {
      moreOpportunitiesItems
    };
  },
  computed: {},
  mounted() {},
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="more-opportunities">
    <BaseTitle 
      type="h2" 
      class="more-opportunities__title">
      More opportunities with our plans for different investors
    </BaseTitle>
    <div class="more-opportunities__items">
      <MoreOpportunitiesItem
        v-for="(item, index) in moreOpportunitiesItems"
        :key="index"
        :image="item.image"
        :title="item.title"
        :list="item.list"
        :link="item.link"
        :class="{ is_active: index === 0 }"
        class="more-opportunities__item"
      />
    </div>
    <div class="more-opportunities__buttons">
      <BaseButton
        class="more-opportunities__button"
        @click.native="setPopup('upgrade-popup')"
      >
        ALL PRICES CHART
      </BaseButton>
      <div class="more-opportunities__dots">
        <div
          v-for="(item, index) in moreOpportunitiesItems"
          :key="index"
          :class="{ is_active: index === 0 }"
          class="more-opportunities__dot"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.more-opportunities {
  padding: em(60px);
  background-color: $light-blue;

  &__items {
    display: flex;
    margin: em(24px) em(-60px) em(46px);
    padding-left: em(60px);
    overflow: hidden;
  }
  &__item {
    margin-right: em(6px);
    opacity: 0.5;
    flex-shrink: 0;

    &.is_active {
      opacity: 1;
    }
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__dots {
    display: flex;
  }
  &__dot {
    width: em(10px);
    height: em(10px);
    background: $grey;
    border-radius: 100%;
    margin: 0 em(8px);
    cursor: pointer;

    &.is_active {
      background: $blue;
    }
  }
}
</style>
