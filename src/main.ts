//styles
import '@/assets/styles/app.scss'
import '@/assets/styles/element.scss'
// Element UI
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/fr'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
