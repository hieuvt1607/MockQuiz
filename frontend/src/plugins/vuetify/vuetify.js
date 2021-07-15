import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import '@/sass/overrides.sass';
import '@/assets/css/materialdesignicons.min.css';
import './custom.scss';
import ja from 'vuetify/lib/locale/ja';
import en from 'vuetify/lib/locale/en';

Vue.use(Vuetify);

const theme = {
    primary: '#E91E63',
    secondary: '#9C27b0',
    accent: '#9C27b0',
    info: '#00CAE3',
    grey: '#cccccc',
};

export default new Vuetify({
    theme: {
        themes: {
            dark: theme,
            light: theme,
        },
    },
    lang: {
        locales: { ja, en },
        current: 'ja',
    },
});
