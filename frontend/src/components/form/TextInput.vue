<template>
    <div class="input-group">
        <validation-provider :vid="vid || id" :name="name" :rules="rules" v-slot="{ errors }">
            <label class="label">
                {{ label }}
                <span class="label-required red--text" v-if="showRequired">
                    {{ $t('common.required') }}
                </span>
            </label>
            <div
                class="body-input"
                :class="{ inputError: (errors && errors.length) || message.length > 0 }"
            >
                <div class="wrapper-input" :class="{ hasIcon: !!icon }">
                    <v-icon class="icon" v-if="icon">
                        {{ icon }}
                    </v-icon>
                    <v-text-field
                        outlined
                        dense
                        v-model="currentData"
                        class="mt-2 input"
                        :class="{
                            inputError: (errors && errors.length) || message.length > 0,
                        }"
                        :type="type"
                        :disabled="disabled"
                        :placeholder="placeholder"
                        :clearable="clearable"
                        @keyup="onKeyup"
                        @keyup.enter="onEnter"
                        @focus="onFocus"
                        @blur="onBlur"
                        @keypress="keypress($event)"
                        :maxlength="maxlength"
                        :autocomplete="autocomplete"
                        :background-color="backgroundColor"
                        :color="color"
                    />
                </div>
            </div>
            <div class="relative">
                <div
                    class="error--text text-animation"
                    :class="errorTextInline ? 'relative' : ''"
                    v-if="errors && errors.length"
                >
                    {{ errors[0] }}
                </div>
                <div
                    class="error--text text-animation"
                    :class="errorTextInline ? 'relative' : ''"
                    v-else-if="message"
                >
                    {{ message }}
                </div>
            </div>
        </validation-provider>
    </div>
</template>

<script>
import { randomId } from '@/helpers/constants';

export default {
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        label: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        message: {
            type: String,
            default: '',
        },
        errorTextInline: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        rules: {
            type: [Object, String],
            default: () => {},
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        showRequired: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        maxlength: {
            type: Number,
            default: 500,
        },
        vid: {
            type: String,
            default: '',
        },
        autocomplete: {
            type: String,
            default: 'off',
        },
        backgroundColor: {
            type: String,
            default: '',
        },
        color: {
            type: String,
            default: '',
        },
        keypress: {
            type: Function,
            default: () => {},
        },
    },
    data() {
        const id = randomId();
        return {
            id,
        };
    },
    methods: {
        onKeyup(evt) {
            const input = evt?.target;
            const { value } = input;
            if (value && /^\s+/g.test(value)) {
                this.$nextTick(() => {
                    this.$set(this, 'currentData', value.trim());
                });
            }
        },

        onFocus(evt) {
            this.$emit('focus', evt);
        },

        onBlur(evt) {
            this.$emit('blur', evt);
        },

        onEnter(evt) {
            this.$emit('enter', evt);
        },
    },
    computed: {
        currentData: {
            // getter
            get() {
                return this.value;
            },
            // setter
            set(value) {
                this.$emit('input', value);
            },
        },
    },
};
</script>
<style lang="scss" scoped>
    .input-group {
        .relative {
            margin-top: -22px;
            position: absolute;
            .error--text {
                font-size: 12px;
            }
        }
        .wrapper-input {
            .v-input--is-focused.primary--text {
                color:#4CAF50 !important;
                caret-color: #4CAF50 !important;
            }
        }
    }
</style>
