<script>
import { mapMutations, mapState } from 'vuex';
import Nav from '~/components/nav/Nav';
import NavItem from '~/components/nav/NavItem';
export default {
  components: {
    Nav,
    NavItem
  },
  computed: {
    ...mapState('page', ['isPathOnDashboard']),

    computed_isPathOnDashboard() {
      return this.isPathOnDashboard;
    }
  }
};
</script>

<template>
  <Nav class="nav-create-new-portfolio">
    <nuxt-link 
      v-show = "!computed_isPathOnDashboard"
      to="/create-new-portfolio/"
    ><NavItem>CREATE NEW PORTFOLIO</NavItem></nuxt-link
    >
    <nuxt-link 
      v-show = "!computed_isPathOnDashboard"
      to="/create-new-portfolio/correlation-matrix"
    ><NavItem>CORRElATION MATRIX</NavItem></nuxt-link
    >
    <nuxt-link 
      v-show = "!computed_isPathOnDashboard"
      to="/create-new-portfolio/efficient-frontier"
    ><NavItem>PORTFOLIO OPTIMIZATION</NavItem></nuxt-link
    >
    <nuxt-link 
      to="/create-new-portfolio/portfolio-activation"
    ><NavItem>PORTFOLIO ACTIVATION</NavItem></nuxt-link
    >
    <nuxt-link to="/dashboard"><NavItem>DASHBOARD</NavItem></nuxt-link>
    <!-- <nuxt-link to="/create-new-portfolio/final-and-setting"><NavItem>FINAL AND SETTING</NavItem></nuxt-link> -->
  </Nav>
</template>
