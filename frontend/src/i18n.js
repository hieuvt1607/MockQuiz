/**
 * Vue i18n
 *
 * @library
 *
 * http://kazupon.github.io/vue-i18n/en/
 */

// Lib imports
import Vue from 'vue';
import VueI18n from 'vue-i18n';
// import messages from './locales';
import TokenService from './helpers/token';

export const defaultLocale = 'en';

Vue.use(VueI18n);
const locale = TokenService.getLang() || defaultLocale;

const i18n = new VueI18n({
    locale,
    fallbackLocale: 'en',
    // messages,
});

export default i18n;
