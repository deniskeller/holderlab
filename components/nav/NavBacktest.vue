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
    <nuxt-link to="/dashboard/"><NavItem>GO TO DASHBOARD</NavItem></nuxt-link>
  </Nav>
</template>
