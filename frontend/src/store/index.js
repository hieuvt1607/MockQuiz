import Vue from 'vue';
import Vuex from 'vuex';
import TokenService from '@/helpers/token';
import common from '../modules/common/store/common';
import auth from '../modules/auth/store/auth';
import user from '../modules/user/store/user';

Vue.use(Vuex);

const plugins = [];

// set root state, action & mutation
const rootState = {
    showLoadingIndicator: false,
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
    drawer: null,
    currentLang: TokenService?.getLang() || 'en',
};
const rootActions = {
    setLoadingIndicator(context, showLoadingIndicator) {
        context.commit('SET_SHOW_LOADING_INDICATOR', showLoadingIndicator);
    },
    setCurrentLang(context, currentLang) {
        context.commit('SET_CURRENT_LANG', currentLang);
    },
};
const rootMutations = {
    SET_SHOW_LOADING_INDICATOR(state, showLoadingIndicator) {
        state.showLoadingIndicator = showLoadingIndicator;
    },
    SET_BAR_IMAGE(state, payload) {
        state.barImage = payload;
    },
    SET_DRAWER(state, payload) {
        state.drawer = payload;
    },
    SET_SCRIM(state, payload) {
        state.barColor = payload;
    },
    SET_CURRENT_LANG(state, currentLang) {
        state.currentLang = currentLang;
    },
};

export default new Vuex.Store({
    modules: {
        auth,
        common,
        user,
    },
    state: rootState,
    mutations: rootMutations,
    actions: rootActions,
    plugins,
});
