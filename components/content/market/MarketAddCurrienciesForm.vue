<script>
import { mapMutations } from 'vuex';
import MarketAddCurrencies from '~/components/content/market/MarketAddCurrencies';

export default {
  components: {
    MarketAddCurrencies
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="add-curriencies-form-market">
    <MarketAddCurrencies
      :search="true"
      :tags="true"
      class="add-curriencies-form__add-assets"
    />
  </div>
</template>

<style lang="scss" scoped>
.add-curriencies-form-market {
  position: relative;
  margin-bottom: 0;
  &__title {
    @include ifmobile {
      padding: 0 em(15px);
    }
  }
  &__text {
    @include ifmobile {
      padding: 0 em(15px);
    }
  }
  &__add-assets {
    margin: em(40px) 0;
  }
  &__button {
    margin-left: em(15px);
  }
}
</style>
