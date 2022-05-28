import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import VueQuillEditor from 'vue-quill-editor'
import VModal from 'vue-js-modal'
import VueTagsInput from '@johmun/vue-tags-input';
import FeatherIcon from '@/components/FeatherIcon.vue';

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
Vue.use(VueQuillEditor)
Vue.use(require('vue-moment'));
Vue.use(VModal)
Vue.component('VueTagsInput', VueTagsInput);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('FeatherIcon', FeatherIcon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
