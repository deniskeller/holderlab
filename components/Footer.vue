<template>
  <div class="footer">
    <div class="footer__links">
      <nuxt-link 
        to="/dashboard/" 
        class="footer__link">
        DASHBOARD
      </nuxt-link>
      <nuxt-link 
        to="/subscriptions/" 
        class="footer__link">
        SUBSCRIPTIONS
      </nuxt-link>
      <nuxt-link 
        to="/privacy-policy/" 
        class="footer__link">
        PRIVACY POLICY
      </nuxt-link>
      <nuxt-link 
        to="/terms-of-use/" 
        class="footer__link">
        TERM OF USE
      </nuxt-link>
      <a 
        href="https://blog.holderlab.io" 
        target="_blank" 
        class="footer__link">
        BLOG
      </a>
      <a
        href="https://docs.holderlab.io/"
        target="_blank"
        class="footer__link"
      >
        DOCS
      </a>
    </div>

    <div class="footer__copyright">
      © 2019 HOLDERLAB.IO All rights reserved
      <br >
      <a 
        href="mailto:contacts@holderlab.io" 
        class="footer__email">
        contacts@holderlab.io
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  line-height: 1.4;
  @include ifmobile {
  }

  &__links {
    @include ifmobile {
      display: none;
    }
  }

  &__link {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    color: $white;
    text-decoration: none;
    margin-right: em(40px, $size);
    transition: color $speed;
    cursor: pointer;

    &:hover {
      color: $yellow;
    }
  }
  &__copyright {
    $size: 14px;
    font-size: em($size);
    color: $white;
    @include ifmobile {
      width: 100%;
      text-align: center;
      margin: em(30px) 0;
    }
  }
  &__email {
    color: $yellow;
  }
}
</style>
