<script>
import { mapMutations } from 'vuex';

import AsideAllocatedAsset from '~/components/aside/AsideAllocatedAsset';
import AsidePlus from '~/components/aside/AsidePlus';

export default {
  components: {
    AsideAllocatedAsset,
    AsidePlus
  },

  props: {
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    plus: {
      type: Boolean,
      default: true
    },

    aside_allocated_assets: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },

  data() {
    return {
      buttonInactive: true
    };
  },

  computed: {
    percent() {
      let percent = 0;
      for (let item of this.aside_allocated_assets) {
        percent += parseFloat(item.percent) || 0;
      }
      return Math.round(percent * 100) / 100;
    }
  },

  watch: {
    aside_allocated_assets() {
      this.calculate();
    },
    percent() {
      this.$emit('input', this.percent);
    }
  },

  mounted() {
    this.calculate();
    this.$emit('input', this.percent);
  },

  methods: {
    ...mapMutations('page', ['setPopup']),

    calculate() {
      if (this.percent === 100) {
        this.buttonInactive = false;
      } else {
        this.buttonInactive = true;
      }
    }
  }
};
</script>

<template>
  <div class="aside-allocated-assets">
    <BaseTitle 
      type="h3" 
      class="aside-allocated-assets__aside-title">
      {{ title }}
    </BaseTitle>

    <BaseAllocatedHeader 
      :percent="percent" 
      :title="subtitle" />

    <BaseScrollBlock2 class="aside-allocated-assets__scroll-block">
      <AsideAllocatedAsset
        v-for="(item, index) in aside_allocated_assets"
        :key="index"
        :title="item.title"
        :rank="item.rank"
        :price="item.price"
        :id_coin="item.id_coin"
        :hour24="item.change"
        :percent="item.percent"
        :link="item.link"
        class="aside-allocated-assets__item"
      />
    </BaseScrollBlock2>
    <AsidePlus
      v-if="plus"
      class="aside-allocated-assets__plus"
      @open-customize="setPopup('efficient-frontier-popup')"
    />

    <!--<BaseButton-->
    <!--  v-if="plus"-->
    <!--  :is-inactive="buttonInactive"-->
    <!--  type="primary"-->
    <!--  class="aside-allocated-assets__button">-->
    <!--  SAVE AND CONTINUE-->
    <!--</BaseButton>-->
  </div>
</template>

<style lang="scss" scoped>
.aside-allocated-assets {
  &__aside-title {
    padding: 0 em(15px);
  }
  &__item {
    margin-bottom: em(6px);
  }
  &__plus {
    margin-bottom: em(40px);
  }
  &__button {
    margin-left: em(15px);
  }
  &__scroll-block {
    /*height: em(516px);*/
  }
}
</style>
