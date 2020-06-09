<script>
import HelpItem from '~/components/content/help/HelpItem';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    HelpItem
  },
  data() {
    return {
      search_item: ''
    };
  },

  computed: {
    ...mapState('page', ['faq']),

    filteredData: function() {
      var search_array = this.faq,
        search_item = this.search_item;

      if (!search_item) {
        return search_array;
      }

      search_item = search_item.trim().toLowerCase();

      search_array = search_array.filter(item => {
        if (item.question.toLowerCase().indexOf(search_item) !== -1) {
          return item;
        }
      });

      return search_array;
    }
  },
  mounted() {
    // if (!this.$cookies.get('secret_token')) {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    this.makeRequesGetFaq();
    // }
  },
  methods: {
    ...mapActions('page', ['makeRequesGetFaq'])
  }
};
</script>

<template>
  <div class="help">
    <BaseContainer>
      <BaseContent>
        <div class="help__headline">
          <BaseHeadline 
            title="How can we help?" 
            class="help__headline-title">
            <BaseSearchField 
              v-model="search_item" 
              class="help__search"
              placeholder="SEARCH" />
          </BaseHeadline>
        </div>
        
        <!--{{ faq }}-->

        <HelpItem
          v-for="(item, index) in filteredData"
          :key="index"
          :id="item.id"
          :title="item.question"
          :text="item.answer"
          :link="item.slug"
          :search_item="search_item"
          class="help__item"
        />
        
      </BaseContent>

      <BaseAside>
        <BaseHelpBanner2
          href="https://docs.holderlab.io/"
          icon="question"
          style="background-image: url(/img/help/1.png)"
        >
          Can't find what you were looking for?
        </BaseHelpBanner2>
      </BaseAside>
    </BaseContainer>
  </div>
</template>

<style lang="scss" scoped>
.help {
  &__headline {
    @include ifmobile {
      background: $purple;
      text-align: center;
      color: $white;
      width: 100%;
    }
  }

  &__search {
    margin-top: em(30px);
    @include ifmobile {
      display: none;
    }
  }
}
</style>
