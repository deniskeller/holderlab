<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('page', ['userInfo']),

    user_info() {
      // """return best ReadeMade Portfolio from store"""
      return this.userInfo;
    }
  },

  mounted() {
    // console.log('----mounted----');
    // if (!this.$cookies.get('secret_token')) {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    this.requestUserInfo();
    // }
  },

  methods: {
    ...mapMutations('page', ['setIsMenuVisible', 'setUserInfo']),
    ...mapActions('page', ['requestUserInfo'])
  }
};
</script>

<template>
  <nuxt-link
    to="/account/"
    tag="div"
    class="user"
    @click.native="setIsMenuVisible(false)"
  >
    <div 
      class="user__avatar" 
      style="background-image: url(/img/avatar.png)" />
    <div class="user__name">Hi, {{ user_info.login }}</div>
  </nuxt-link>
</template>

<style lang="scss" scoped>
.user {
  $this: &;

  display: flex;
  align-items: center;
  cursor: pointer;

  @include ifdesktop {
    height: em(40px);
  }
  @include ifmobile {
    height: em(24px);
  }

  &:hover {
    #{$this}__avatar {
      box-shadow: 0 0 em(10px) $white;
    }
  }

  &__avatar {
    position: relative;
    border-radius: 100%;
    background-color: $grey;
    @extend %background-cover;
    transition: box-shadow $speed;

    @include ifdesktop {
      width: em(40px);
      height: em(40px);
      margin-right: em(14px);
    }
    @include ifmobile {
      width: em(24px);
      height: em(24px);
    }
  }

  &__name {
    $size: 16px;
    font-size: em($size);
    color: $white;

    width: em(110px, $size);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @include ifmobile {
      display: none;
    }
  }
}
</style>
