import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import './registerServiceWorker'
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import Chat from 'vue-beautiful-chat'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Sentry.init({
  dsn: 'https://a60441bd2723422584d60fa556136ec1@sentry.io/4386614',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })],
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Chat,
  render: h => h(App)
}).$mount('#app')
