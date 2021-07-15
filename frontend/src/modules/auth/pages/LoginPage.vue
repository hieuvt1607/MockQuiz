<template>
    <v-container
        id="login"
        class="fill-height justify-center"
        tag="section"
    >
        <v-row justify="center">
            <v-slide-y-transition appear>
                <common-material-card
                    color="success"
                    light
                    max-width="100%"
                    width="400"
                    class="px-5 py-3 overflow-visible"
                >
                    <template v-slot:heading>
                        <div class="text-center">
                            <h1 class="display-2 font-weight-bold">
                                {{ $t('auth.login.title') }}
                            </h1>
                        </div>
                    </template>
                    <common-material-alert
                        v-if="errorMessage"
                        color="warning"
                        dark
                        class="mb-0 mt-2"
                    >
                        <span
                            class="text-uppercase"
                            v-text="$t(errorMessage)"
                        />
                    </common-material-alert>
                    <validation-observer v-slot="{handleSubmit}">
                        <v-card-text class="text-center">
                            <validation-provider
                                v-slot="{ errors }"
                                rules="required"
                                name="username"
                            >
                                <v-text-field
                                    v-model="username"
                                    color="secondary"
                                    :autofocus="true"
                                    :label="$t('auth.login.username')"
                                    prepend-icon="mdi-face"
                                    class="mt-2"
                                    :error-messages="errors"
                                    @keyup.enter="login"
                                    outlined
                                    autocorrect="off"
                                    spellcheck="false"
                                    autocomplete="off"
                                    readonly
                                    onfocus="this.removeAttribute('readonly');"
                                />
                            </validation-provider>
                            <validation-provider
                                v-slot="{ errors }"
                                rules="required"
                                name="password"
                            >
                                <v-text-field
                                    v-model="password"
                                    type="password"
                                    class="mb-2"
                                    color="secondary"
                                    :label="$t('auth.login.password')"
                                    prepend-icon="mdi-lock-outline"
                                    :error-messages="errors"
                                    outlined
                                    @keyup.enter="login"
                                    autocorrect="off"
                                    spellcheck="false"
                                    autocomplete="off"
                                    readonly
                                    onfocus="this.removeAttribute('readonly');"
                                />
                            </validation-provider>
                            <v-btn
                                color=""
                                class="v-btn--text success--text"
                                @click.prevent="handleSubmit(login)"
                            >
                                {{ $t('auth.login.login') }}
                            </v-btn>
                        </v-card-text>
                    </validation-observer>
                </common-material-card>
            </v-slide-y-transition>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            username: null,
            password: null,
            errorMessage: '',
            isLogin: false,
        };
    },
    methods: {
        async login() {
            const loginResult = await this.$store.dispatch('auth/login', {
                username: (this.username || '').trim(),
                password: (this.password || '').trim(),
            });
            if (loginResult) {
                const redirectPage = this.$route.query.redirect || '/products/list';
                this.$router.push(redirectPage);
            } else {
                this.errorMessage = 'auth.login.error';
            }
        },
    },
};
</script>
