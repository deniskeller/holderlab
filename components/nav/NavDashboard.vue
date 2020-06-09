<script>
import Nav from '~/components/nav/Nav';
import NavItem from '~/components/nav/NavItem';
export default {
  components: {
    Nav,
    NavItem
  }
};
</script>

<template>
  <Nav class="nav-dashboard">
    <nuxt-link to="/dashboard/"><NavItem>DASHBOARD</NavItem></nuxt-link>
    <nuxt-link 
      to="/rebalancing-tab"
    ><NavItem>REBALANCE TAB</NavItem></nuxt-link
    >
    <nuxt-link to="/ready-made"><NavItem>READY-MADE</NavItem></nuxt-link>
  </Nav>
</template>
