import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/templates/LandingPage.vue'
import Auth from '@/modules/Auth.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage
    },
    {
      path: '/login-redirect',
      name: 'loginRedirect',
      component: () => import(/* webpackChunkName: "about" */ '@/templates/LoginRedirect.vue')
    },
    {
      path: '/redirect',
      name: 'redirect',
      component: () => import(/* webpackChunkName: "about" */ '@/components/Redirect.vue'),
      meta: { noAuth: true }
    },
    {
      path: '/password-reset',
      name: 'passwordreset',
      component: () => import(/* webpackChunkName: "about" */ '@/components/organisms/PasswordReset.vue'),
      meta: { noAuth: true }
    },
    {
      path: '/activation',
      name: 'activation',
      component: () => import(/* webpackChunkName: "about" */ '@/components/organisms/ActivationForm.vue'),
      meta: { noAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: "/search-result-landing/:query",
      name: 'SSearchResultFromLandingPage',
      component: () => import(/* webpackChunkName: "about" */ '@/components/organisms/SSearchResults.vue')
    },
    {
      path: "/contact-us",
      name: 'ContactUs',
      meta: { noAuth: true },
      component: () => import(/* webpackChunkName: "about" */ '@/templates/ContactUs.vue')
    },
    {
      path: "/footer",
      name: 'footer',
      component: () => import(/* webpackChunkName: "about" */ '@/templates/Footer.vue')
    },
    {
      path: "/header",
      name: 'header',
      component: () => import(/* webpackChunkName: "about" */ '@/templates/Header.vue')
    },
    {
      path: "/landing-page",
      name: 'LandingPage',
      component: () => import(/* webpackChunkName: "about" */ '@/templates/LandingPage.vue')
    },
    {
      path: "/left-sticky-bar",
      name: 'LeftStickyBar',
      component: () => import(/* webpackChunkName: "about" */ '@/templates/LeftStickyBar.vue')
    },
    {
      path: "/right-sticky-bar",
      name: 'RightStickyBar',
      component: () => import(/* webpackChunkName: "about" */ '@/templates/RightStickyBar.vue')
    },
    {
      path: "/header-group",
      name: 'HeaderGroup',
      component: () => import(/* webpackChunkName: "about" */ '@/components/organisms/HeaderGroup.vue')
    },
    {
      path: "/group-search",
      name: 'GroupSearch',
      component: () => import(/* webpackChunkName: "about" */ '@/components/organisms/GroupSearch.vue')
    },
    {
      path: "/new-group-member-message-to-me-as-moderator",
      name: 'SNewGroupMemberMessageToMeAsModerator',
      component: () => import(/* webpackChunkName: "about" */ '@/components/organisms/SNewGroupMemberMessageToMeAsModerator.vue')
    },
    {
      path: "/landing-help",
      name: 'LandingHelp',
      component: () => import(/* webpackChunkName: "about" */ '@/components/atoms/LandingHelp.vue'),
      meta: { noAuth: true }
    },
    {
      path: "/landing-terms",
      name: 'LandingTerms',
      component: () => import(/* webpackChunkName: "about" */ '@/components/atoms/LandingTerms.vue'),
      meta: { noAuth: true }
    },
    {
      path: "/landing-privacy",
      name: 'LandingPrivacy',
      component: () => import(/* webpackChunkName: "about" */ '@/components/atoms/LandingPrivacy.vue'),
      meta: { noAuth: true }
    },
    {
      path: "/landing-blog",
      name: 'LandingBlog',
      component: () => import(/* webpackChunkName: "about" */ '@/components/atoms/LandingBlog.vue'),
      meta: { noAuth: true }
    },
    {
      path: "/contact-us",
      name: 'LandingContact',
      component: () => import(/* webpackChunkName: "about" */ '@/components/atoms/LandingContact.vue'),
      meta: { noAuth: true }
    },
    {
      path: "/s-app",
      component: () =>
        import(/* webpackChunkName: "bars" */ "@/views/Bars.vue"),
      children: [
        {
          path: "",
          name: "S-app",
          redirect: "news-feed"
        },
        {
          path: "sandbox",
          name: "sandbox",
          component: () => import(/* webpackChunkName: "sandbox" */ "@/views/Sandbox.vue")
        },
        {
          path: "news-feed",
          name: 'NewsFeed',
          component: () => import(/* webpackChunkName: "newsfeed" */ '@/templates/NewsFeed.vue')
        },
        {
          path: "profile-page/:id",
          name: 'ProfilePage',
          component: () => import(/* webpackChunkName: "about" */ '@/templates/ProfilePage.vue')
        },
        {
          path: "account-dashboard",
          name: 'AccountDashboard',
          component: () => import(/* webpackChunkName: "about" */ '@/templates/AccountDashboard.vue')
        },
        {
          path: "s-new-member",
          name: 'SNewMembers',
          component: () => import(/* webpackChunkName: "about" */ '@/components/organisms/SNewMember.vue')
        },
        {
          path: "item-details/:id",
          name: 'SItemDetail',
          component: () => import(/* webpackChunkName: "about" */ '@/components/organisms/SItemDetail.vue')
        },
        {
          path: "search-result",
          name: 'SSearchResult',
          component: () => import(/* webpackChunkName: "about" */ '@/components/organisms/SSearchResults.vue')
        },
        {
          path: "search-result/:query",
          name: 'SSearchResultQuery',
          component: () => import(/* webpackChunkName: "about" */ '@/components/organisms/SSearchResults.vue')
        },
        {
          path: "my-groups",
          name: 'MyGroups',
          component: () => import(/* webpackChunkName: "about" */ '@/templates/MyGroups.vue')
        },
        {
          path: "requests-area",
          name: 'SRequestsArea',
          component: () => import(/* webpackChunkName: "about" */ '@/templates/SRequestsArea.vue')
        },
        {
          path: "items",
          name: 'SItemGrid',
          component: () => import(/* webpackChunkName: "about" */ '@/components/organisms/SItemGrid.vue')
        },
        {
          path: "chat-center",
          name: 'ChatMessages',
          component: () => import(/* webpackChunkName: "about" */ '@/components/organisms/ChatMessages.vue')
        },
        {
          path: "group-page/:id",
          name: 'GroupPage',
          component: () => import(/* webpackChunkName: "about" */ '@/templates/GroupPage.vue')
        },
        {
          path: "logged-out",
          name: 'LoggedOut',
          component: () => import(/* webpackChunkName: "about" */ '@/components/molecules/LoggedOut.vue')
        },
        {
          path: "personal-info",
          name: 'PersonalInfo',
          component: () => import(/* webpackChunkName: "about" */ '@/components/molecules/PersonalInfo.vue')
        },
        {
          path: "form-password",
          name: 'FormPassword',
          component: () => import(/* webpackChunkName: "about" */ '@/components/molecules/FormPassword.vue')
        },
        {
          path: "form-email",
          name: 'FormEmail',
          component: () => import(/* webpackChunkName: "about" */ '@/components/molecules/FormEmail.vue')
        },
        {
          path: "/card-member",
          name: 'CardMember',
          component: () => import(/* webpackChunkName: "about" */ '@/components/atoms/CardMember.vue'),
          meta: { noAuth: true }
        },
        {
          path: "/s-new-group-message",
          name: 'SNewGroupMessage',
          component: () => import(/* webpackChunkName: "about" */ '@/components/organisms/SNewGroupMessage.vue'),
          meta: { noAuth: true }
        },
        {
          path: "inventory",
          name: 'Inventory',
          component: () => import(/* webpackChunkName: "about" */ '@/templates/Inventory.vue')
        },
        {
          path: "item-review",
          name: 'itemReview',
          component: () => import(/* webpackChunkName: "about" */ '@/components/organisms/ItemReview.vue')
        },
        {
          path: "my-post-area",
          name: "MyPostArea",
          component: () => import(/* webpackChunkName: "myPostArea" */ '@/components/organisms/MyPostArea.vue')
        },
        {
          path: "points-area",
          name: "PointsArea",
          component: () => import(/* webpackChunkName: "myPostArea" */ '@/components/organisms/PointsArea.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip("hide");
  if (to.matched.some(record => record.meta.noAuth)) {
    next()
  } else {
    if (!Auth.isUserAuthenticated() && (to.path !== '/')) {
      if (to.name === "SSearchResultFromLandingPage") {
        next()
      } else if (to.name === "loginRedirect") {
        next()
      } else {
        const routeToRedirect = to.fullPath.replace("search-result-landing", "s-app");
        next({
          name: "loginRedirect",
          query: { redirect: routeToRedirect }
        })
      }
    } else if (
      Auth.isUserAuthenticated() && (to.path === "/" || to.name === "loginRedirect")
    ) {
      next({
        // name: 'profile'
        // TO DO
        path: `/s-app/news-feed`
      })
    } else {
      next()
    }
  }
})

export default router;
