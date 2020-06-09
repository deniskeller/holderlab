<script>
import RelatedArticlesItem from '~/components/content/help/RelatedArticlesItem';
export default {
  components: {
    RelatedArticlesItem
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
  <div class="related-articles">
    <div class="related-articles__title">
      REALTED ARTICLES
    </div>
    <RelatedArticlesItem 
      link="#" 
      class="related-articles__item">
      I live outside of the U.S. Can I open an account?
    </RelatedArticlesItem>
    <RelatedArticlesItem 
      link="#" 
      class="related-articles__item">
      Can I transfer my outside account into HolderLab?
    </RelatedArticlesItem>
  </div>
</template>

<style lang="scss">
.related-articles {
  &__title {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    margin-bottom: em(16px, $size);
    @include ifmobile {
      padding: 0 em(15px, $size);
    }
  }
}
</style>
