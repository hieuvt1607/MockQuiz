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
import layoutLocale from '@/layouts/locale';
import TokenService from '../helpers/token';

import commonLocale from '../modules/common/locale';
import authLocale from '../modules/auth/locale';
import userLocale from '../modules/user/locale';
import productLocale from '../modules/products/locale';

export const defaultLocale = 'ja';

Vue.use(VueI18n);
const locale = TokenService.getLang() || defaultLocale;

const i18n = new VueI18n({
    locale,
    fallbackLocale: 'en',
    messages: {
        en: {
            auth: authLocale.en,
            layout: layoutLocale.en,
            common: commonLocale.en,
            user: userLocale.en,
            products: productLocale.en,
        },
        ja: {
            auth: authLocale.ja,
            layout: layoutLocale.ja,
            common: commonLocale.ja,
            user: userLocale.ja,
            products: productLocale.ja,
        },
    },
});

export default i18n;
