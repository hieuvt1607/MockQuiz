<template>
    <v-app-bar id="app-bar" absolute app color="transparent" flat height="64">
        <v-btn v-if="isLogin" class="mr-3" elevation="1" fab small @click="toggleSidebar">
            <v-icon v-if="value">
                mdi-view-quilt
            </v-icon>

            <v-icon v-else>
                mdi-dots-vertical
            </v-icon>
        </v-btn>

        <common-breadcrumb
            class="hidden-sm-and-down font-weight-light"
            :breadcrumb="_.get($route, 'meta.breadcrumb', [])"
        />

        <v-spacer />

        <div class="mx-3" />

        <v-menu
            bottom
            left
            min-width="200"
            offset-y
            origin="top right"
            transition="scale-transition"
            class="language"
        >
            <template v-slot:activator="{ on }">
                <v-btn class="ml-2 change__language" text v-on="on">
                    <img
                        v-if="lang === 'en'"
                        src="../../assets/images/flags/en.png"
                        class="mr-2"
                        width="15"
                        height="15"
                        alt=""
                    >
                    <img
                        v-if="lang === 'ja'"
                        src="../../assets/images/flags/ja.png"
                        class="mr-2"
                        width="15"
                        height="15"
                        alt=""
                    >
                    <span>{{
                        lang === 'en' ? $t('common.language.english') : $t('common.language.japan')
                    }}</span>
                </v-btn>
            </template>

            <v-list :tile="false" flat nav>
                <span
                    class="language--link d-flex align-center w-100 px-4"
                    @click="setLocale('en')"
                >
                    <img
                        src="../../assets/images/flags/en.png"
                        class="mr-2"
                        width="15"
                        height="15"
                        alt=""
                    >
                    <span>{{ $t('common.language.english') }}</span>
                </span>

                <span
                    class="language--link d-flex align-center w-100 px-4"
                    @click="setLocale('ja')"
                >
                    <img
                        src="../../assets/images/flags/ja.png"
                        class="mr-2"
                        width="15"
                        height="15"
                        alt=""
                    >
                    <span>{{ $t('common.language.japan') }}</span>
                </span>
            </v-list>
        </v-menu>
        <v-menu
            v-if="isLogin"
            bottom
            left
            min-width="200"
            offset-y
            origin="top right"
            transition="scale-transition"
        >
            <template v-slot:activator="{ attrs, on }">
                <v-btn min-width="0" text v-bind="attrs" v-on="on">
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </template>

            <v-list :tile="false" flat nav>
                <app-bar-item class="d-none" />
                <a class="d-block btn-logout" @click="logout">
                    {{ $t('common.logout') }}
                </a>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from 'vuetify/lib';
import { localize } from 'vee-validate';
import { mapState, mapMutations } from 'vuex';
import moment from 'moment';
import ja from 'vee-validate/dist/locale/ja';
import en from 'vee-validate/dist/locale/en';
import TokenService from '../../helpers/token';

export default {
    name: 'DashboardCoreAppBar',
    components: {
        AppBarItem: {
            render(h) {
                return h(VHover, {
                    scopedSlots: {
                        default: ({ hover }) => h(
                                VListItem,
                                {
                                    attrs: this.$attrs,
                                    class: {
                                        'black--text': !hover,
                                        'white--text secondary elevation-12': hover,
                                    },
                                    props: {
                                        activeClass: '',
                                        dark: hover,
                                        link: true,
                                        ...this.$attrs,
                                    },
                                },
                                this.$slots.default,
                            ),
                    },
                });
            },
        },
    },

    props: {
        value: {
            type: Boolean,
            default: false,
        },
        isLogin: {
            type: Boolean,
            default: true,
        },
    },

    data: () => ({
        lang: TokenService.getLang() || 'ja',
    }),

    computed: {
        ...mapState(['drawer']),
    },

    methods: {
        ...mapMutations({
            setDrawer: 'SET_DRAWER',
        }),
        async logout() {
            const result = await this.$store.dispatch('auth/logout');
            if (result) {
                this.$router.push('/login');
            }
        },
        setLocale(lang) {
            this.lang = lang;
            TokenService.setLang(lang);
            this.$i18n.locale = lang;
            if (lang === 'en') {
                localize(lang, en);
            } else {
                localize(lang, ja);
            }
            this.$store.dispatch('setCurrentLang', lang);

            moment.locale(lang);
        },
        toggleSidebar() {
            if (this.$vuetify.breakpoint.smAndDown) {
                this.setDrawer(!this.drawer);
            } else {
                this.$emit('input', !this.value);
            }
        },
    },
};
</script>
<style lang="scss" scoped></style>
