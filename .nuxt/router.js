import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2120ca5d = () => interopDefault(import('..\\pages\\404\\index.vue' /* webpackChunkName: "pages_404_index" */))
const _a70a4bb0 = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages_about_index" */))
const _f228fe70 = () => interopDefault(import('..\\pages\\account\\index.vue' /* webpackChunkName: "pages_account_index" */))
const _049b5686 = () => interopDefault(import('..\\pages\\backtest\\index.vue' /* webpackChunkName: "pages_backtest_index" */))
const _235ece15 = () => interopDefault(import('..\\pages\\create-new-portfolio\\index.vue' /* webpackChunkName: "pages_create-new-portfolio_index" */))
const _4acdcb41 = () => interopDefault(import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages_dashboard_index" */))
const _c97f13f4 = () => interopDefault(import('..\\pages\\efficient-frontier\\index.vue' /* webpackChunkName: "pages_efficient-frontier_index" */))
const _3d59cabe = () => interopDefault(import('..\\pages\\help\\index.vue' /* webpackChunkName: "pages_help_index" */))
const _32489a9e = () => interopDefault(import('..\\pages\\landing\\index.vue' /* webpackChunkName: "pages_landing_index" */))
const _60116921 = () => interopDefault(import('..\\pages\\landing-plans\\index.vue' /* webpackChunkName: "pages_landing-plans_index" */))
const _e5ad6c9c = () => interopDefault(import('..\\pages\\landing-privacy-policy\\index.vue' /* webpackChunkName: "pages_landing-privacy-policy_index" */))
const _721890f8 = () => interopDefault(import('..\\pages\\landing-terms-of-service\\index.vue' /* webpackChunkName: "pages_landing-terms-of-service_index" */))
const _338211a3 = () => interopDefault(import('..\\pages\\market\\index.vue' /* webpackChunkName: "pages_market_index" */))
const _25c7ce04 = () => interopDefault(import('..\\pages\\matrix\\index.vue' /* webpackChunkName: "pages_matrix_index" */))
const _0dbdb6e8 = () => interopDefault(import('..\\pages\\privacy-policy\\index.vue' /* webpackChunkName: "pages_privacy-policy_index" */))
const _4d447f00 = () => interopDefault(import('..\\pages\\ready-made\\index.vue' /* webpackChunkName: "pages_ready-made_index" */))
const _33ade847 = () => interopDefault(import('..\\pages\\rebalancing-tab\\index.vue' /* webpackChunkName: "pages_rebalancing-tab_index" */))
const _8008e7c2 = () => interopDefault(import('..\\pages\\subscriptions\\index.vue' /* webpackChunkName: "pages_subscriptions_index" */))
const _423c11e6 = () => interopDefault(import('..\\pages\\support\\index.vue' /* webpackChunkName: "pages_support_index" */))
const _4d6b73a8 = () => interopDefault(import('..\\pages\\terms-of-use\\index.vue' /* webpackChunkName: "pages_terms-of-use_index" */))
const _0c2e141d = () => interopDefault(import('..\\pages\\account\\exchange.vue' /* webpackChunkName: "pages_account_exchange" */))
const _7dea6c0a = () => interopDefault(import('..\\pages\\account\\history.vue' /* webpackChunkName: "pages_account_history" */))
const _693f04e8 = () => interopDefault(import('..\\pages\\account\\notification-setting.vue' /* webpackChunkName: "pages_account_notification-setting" */))
const _6c80c576 = () => interopDefault(import('..\\pages\\account\\referal-programm.vue' /* webpackChunkName: "pages_account_referal-programm" */))
const _5293d58e = () => interopDefault(import('..\\pages\\create-new-portfolio\\correlation-matrix.vue' /* webpackChunkName: "pages_create-new-portfolio_correlation-matrix" */))
const _55e6bba9 = () => interopDefault(import('..\\pages\\create-new-portfolio\\create-account.vue' /* webpackChunkName: "pages_create-new-portfolio_create-account" */))
const _191aeef4 = () => interopDefault(import('..\\pages\\create-new-portfolio\\efficient-frontier.vue' /* webpackChunkName: "pages_create-new-portfolio_efficient-frontier" */))
const _7f8a32c6 = () => interopDefault(import('..\\pages\\create-new-portfolio\\final-and-setting.vue' /* webpackChunkName: "pages_create-new-portfolio_final-and-setting" */))
const _3d9d5e70 = () => interopDefault(import('..\\pages\\create-new-portfolio\\portfolio-activation.vue' /* webpackChunkName: "pages_create-new-portfolio_portfolio-activation" */))
const _7678aab6 = () => interopDefault(import('..\\pages\\email\\confirm-email.vue' /* webpackChunkName: "pages_email_confirm-email" */))
const _6db7f7e2 = () => interopDefault(import('..\\pages\\help\\article.vue' /* webpackChunkName: "pages_help_article" */))
const _d90afe04 = () => interopDefault(import('..\\pages\\landing-modal\\hello.vue' /* webpackChunkName: "pages_landing-modal_hello" */))
const _147989ac = () => interopDefault(import('..\\pages\\landing-modal\\new-password.vue' /* webpackChunkName: "pages_landing-modal_new-password" */))
const _53e08146 = () => interopDefault(import('..\\pages\\landing-modal\\reset-password.vue' /* webpackChunkName: "pages_landing-modal_reset-password" */))
const _cb2ea132 = () => interopDefault(import('..\\pages\\landing-modal\\signing-up.vue' /* webpackChunkName: "pages_landing-modal_signing-up" */))
const _1bcbe68e = () => interopDefault(import('..\\pages\\landing-modal\\welcome.vue' /* webpackChunkName: "pages_landing-modal_welcome" */))
const _4e8355d8 = () => interopDefault(import('..\\pages\\ready-made\\card\\_id.vue' /* webpackChunkName: "pages_ready-made_card__id" */))
const _c0b47842 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/404",
    component: _2120ca5d,
    name: "404"
  }, {
    path: "/about",
    component: _a70a4bb0,
    name: "about"
  }, {
    path: "/account",
    component: _f228fe70,
    name: "account"
  }, {
    path: "/backtest",
    component: _049b5686,
    name: "backtest"
  }, {
    path: "/create-new-portfolio",
    component: _235ece15,
    name: "create-new-portfolio"
  }, {
    path: "/dashboard",
    component: _4acdcb41,
    name: "dashboard"
  }, {
    path: "/efficient-frontier",
    component: _c97f13f4,
    name: "efficient-frontier"
  }, {
    path: "/help",
    component: _3d59cabe,
    name: "help"
  }, {
    path: "/landing",
    component: _32489a9e,
    name: "landing"
  }, {
    path: "/landing-plans",
    component: _60116921,
    name: "landing-plans"
  }, {
    path: "/landing-privacy-policy",
    component: _e5ad6c9c,
    name: "landing-privacy-policy"
  }, {
    path: "/landing-terms-of-service",
    component: _721890f8,
    name: "landing-terms-of-service"
  }, {
    path: "/market",
    component: _338211a3,
    name: "market"
  }, {
    path: "/matrix",
    component: _25c7ce04,
    name: "matrix"
  }, {
    path: "/privacy-policy",
    component: _0dbdb6e8,
    name: "privacy-policy"
  }, {
    path: "/ready-made",
    component: _4d447f00,
    name: "ready-made"
  }, {
    path: "/rebalancing-tab",
    component: _33ade847,
    name: "rebalancing-tab"
  }, {
    path: "/subscriptions",
    component: _8008e7c2,
    name: "subscriptions"
  }, {
    path: "/support",
    component: _423c11e6,
    name: "support"
  }, {
    path: "/terms-of-use",
    component: _4d6b73a8,
    name: "terms-of-use"
  }, {
    path: "/account/exchange",
    component: _0c2e141d,
    name: "account-exchange"
  }, {
    path: "/account/history",
    component: _7dea6c0a,
    name: "account-history"
  }, {
    path: "/account/notification-setting",
    component: _693f04e8,
    name: "account-notification-setting"
  }, {
    path: "/account/referal-programm",
    component: _6c80c576,
    name: "account-referal-programm"
  }, {
    path: "/create-new-portfolio/correlation-matrix",
    component: _5293d58e,
    name: "create-new-portfolio-correlation-matrix"
  }, {
    path: "/create-new-portfolio/create-account",
    component: _55e6bba9,
    name: "create-new-portfolio-create-account"
  }, {
    path: "/create-new-portfolio/efficient-frontier",
    component: _191aeef4,
    name: "create-new-portfolio-efficient-frontier"
  }, {
    path: "/create-new-portfolio/final-and-setting",
    component: _7f8a32c6,
    name: "create-new-portfolio-final-and-setting"
  }, {
    path: "/create-new-portfolio/portfolio-activation",
    component: _3d9d5e70,
    name: "create-new-portfolio-portfolio-activation"
  }, {
    path: "/email/confirm-email",
    component: _7678aab6,
    name: "email-confirm-email"
  }, {
    path: "/help/article",
    component: _6db7f7e2,
    name: "help-article"
  }, {
    path: "/landing-modal/hello",
    component: _d90afe04,
    name: "landing-modal-hello"
  }, {
    path: "/landing-modal/new-password",
    component: _147989ac,
    name: "landing-modal-new-password"
  }, {
    path: "/landing-modal/reset-password",
    component: _53e08146,
    name: "landing-modal-reset-password"
  }, {
    path: "/landing-modal/signing-up",
    component: _cb2ea132,
    name: "landing-modal-signing-up"
  }, {
    path: "/landing-modal/welcome",
    component: _1bcbe68e,
    name: "landing-modal-welcome"
  }, {
    path: "/ready-made/card/:id",
    component: _4e8355d8,
    name: "ready-made-card-id"
  }, {
    path: "/",
    component: _c0b47842,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
