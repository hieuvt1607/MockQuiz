import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import router from './router';
import './helpers/commonComponents';

import 'vue2-datepicker/index.css';

// plugins
import vuetify from './plugins/vuetify/vuetify';
import i18n from './plugins/i18n';
import './plugins/sweetAlert2/sweetAlert2';
import './plugins/veeValidate/veeValidate';
import './plugins/lodash';
import './plugins/moment';
// mixins
import './mixins/index';
// filters
import './filters';

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
