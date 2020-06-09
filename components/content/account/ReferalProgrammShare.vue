<script>
export default {
  components: {},
  data() {
    return {
      Facebook: {
        background: '#4966B7'
      },
      TweetPromo: {
        background: '#1B95E0'
      },
      LinkedIn: {
        background: '#0077B5'
      },
      Tumblr: {
        background: '#314358'
      },
      Vkontakte: {
        background: '#5081B8'
      },
      Telegram: {
        background: '#61A8DE'
      },
      Hacker: {
        background: '#FF6600'
      },
      Reddit: {
        background: '#FF4500'
      },
      Email: {
        background: '#924DAE'
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="referal-programm-share">
    <div class="referal-programm-share__title">
      SHARE IT:
    </div>
    <div
      class="referal-programm-share__items referal-programm-share__items-desktop"
    >
      <BaseButtonShare
        :style="Facebook"
        href=""
        class="referal-programm-share__item"
      >Share on Facebook</BaseButtonShare
      >
      <BaseButtonShare
        :style="TweetPromo"
        href=""
        class="referal-programm-share__item"
      >Tweet Promo</BaseButtonShare
      >
      <BaseButtonShare
        :style="LinkedIn"
        href=""
        class="referal-programm-share__item"
      >Share on LinkedIn</BaseButtonShare
      >
      <BaseButtonShare
        :style="Tumblr"
        href=""
        class="referal-programm-share__item"
      >Share on Tumblr</BaseButtonShare
      >
      <BaseButtonShare
        :style="Vkontakte"
        href=""
        class="referal-programm-share__item"
      >Share on Vkontakte</BaseButtonShare
      >
      <BaseButtonShare
        :style="Telegram"
        href=""
        class="referal-programm-share__item"
      >Share on Telegram</BaseButtonShare
      >
      <BaseButtonShare
        :style="Hacker"
        href=""
        class="referal-programm-share__item"
      >Submit to Hacker News</BaseButtonShare
      >
      <BaseButtonShare
        :style="Reddit"
        href=""
        class="referal-programm-share__item"
      >Submit to Reddit</BaseButtonShare
      >
      <BaseButtonShare
        :style="Email"
        href=""
        class="referal-programm-share__item"
      >Share via Email</BaseButtonShare
      >
    </div>

    <div
      class="referal-programm-share__items referal-programm-share__items-mobile"
    >
      <BaseButtonSocial
        icon="mail"
        href=""
        class="referal-programm-share__item"
      />

      <BaseButtonSocial
        icon="twitter"
        href=""
        class="referal-programm-share__item"
      />

      <BaseButtonSocial
        icon="facebook"
        href=""
        class="referal-programm-share__item"
      />

      <BaseButtonSocial
        icon="hacker-news"
        href=""
        class="referal-programm-share__item"
      />

      <BaseButtonSocial
        icon="linkedIn"
        href=""
        class="referal-programm-share__item"
      />

      <BaseButtonSocial
        icon="reddit"
        href=""
        class="referal-programm-share__item"
      />

      <BaseButtonSocial
        icon="tumblr"
        href=""
        class="referal-programm-share__item"
      />

      <BaseButtonSocial
        icon="vk"
        href=""
        class="referal-programm-share__item"
      />

      <BaseButtonSocial
        icon="telegram"
        href=""
        class="referal-programm-share__item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.referal-programm-share {
  &__title {
    $size: 14px;
    font-size: em($size);
    color: $grey;
    margin-bottom: em(20px);
    @include ifmobile {
      padding: 0 em(15px);
    }
  }
  &__items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: em(20px);
    @include ifmobile {
      padding: 0 em(15px);
    }
  }

  &__items-desktop {
    @include ifmobile {
      display: none;
    }
  }

  &__items-mobile {
    display: none;
    @include ifmobile {
      display: flex;
    }
  }

  &__item {
    margin-right: em(20px);
    margin-bottom: em(20px);
  }
}
</style>
