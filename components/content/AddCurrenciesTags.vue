<script>
/*AddCurrenciesTags*/
import AddCurrenciesTag from '~/components/content/add-currencies/AddCurrenciesTag';
export default {
  components: {
    AddCurrenciesTag
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="add-currencies-tags">
    <AddCurrenciesTag 
      title="Bytecoin Cash" 
      class="add-currencies-tags__tag">
      BTC
    </AddCurrenciesTag>
  </div>
</template>

<style lang="scss">
.add-currencies-tags {
}
</style>
