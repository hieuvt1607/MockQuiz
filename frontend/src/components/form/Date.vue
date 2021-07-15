<template>
    <div class="input-group">
        <validation-provider :vid="vid || name" v-slot="{ errors }" :rules="rules" :name="name">
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
                <div class="wrapper-input">
                    <Datepicker
                        class="custom-date mt-2"
                        ref="datePicker"
                        :type="type"
                        v-model="dateValue"
                        :default-value="new Date()"
                        :range="range"
                        :disabled-date="disabledDate"
                        :format="format"
                        value-type="format"
                        :placeholder="placeholder"
                        :lang="$t('common.langDateTime')"
                        :disabled="disabled"
                        :clearable="clearable"
                        :editable="editable"
                        :minute-step="minuteStep"
                        :hour-options="hourOptions"
                        :disabled-time="disabledTime"
                        :open.sync="open"
                        @blur="handleBlur"
                        @close="closePopup"
                        @open="openPopup"
                        @change="handleChange"
                        :show-time-header="true"
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
import moment from 'moment';
import Datepicker from 'vue2-datepicker';
import Cleave from 'cleave.js';

export default {
    props: {
        name: {
            type: String,
            default: '',
        },
        vid: {
            type: String,
            default: '',
        },
        rules: {
            type: Object,
            default: () => {},
        },
        value: {
            type: [String, Array],
            default: '',
        },
        disabledDate: {
            type: Function,
            default: () => false,
        },
        format: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        message: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        range: {
            type: Boolean,
            default: false,
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
            default: true,
        },
        editable: {
            type: Boolean,
            default: false,
        },
        minuteStep: {
            type: Number,
            default: null,
        },
        hourOptions: {
            type: Number,
            default: null,
        },
        disabledTime: {
            type: Function,
            default: () => false,
        },
    },
    components: {
        Datepicker,
    },
    data() {
        return {
            open: false,
            selectedValue: '',
            cleaveInstance: null,
        };
    },
    computed: {
        dateValue: {
            get() {
                return moment(this.value).format(this.format);
            },
            set(value) {
                this.$emit('input', value);
            },
        },
        datePicker: {
            get() {
                return this.$refs.datePicker;
            },
        },
    },
    methods: {
        handleChange(value, type) {
            if (type === 'minute' && this.type === 'time') {
                this.open = false;
            }
            this.$refs.datePicker.focus();
            this.selectedValue = value;
        },
        closePopup() {
            if (this.selectedValue) this.$emit('input', this.selectedValue);
            this.$refs.datePicker.focus();
            this.open = false;
            this.$emit('close-popup');
        },
        openPopup() {
            this.$emit('open-popup');
        },
        handleBlur(event) {
            if (event.relatedTarget && event.relatedTarget.type === 'text') {
                this.closePopup();
            }
        },
    },
    mounted() {
        const cleaveOption = {};
        if (this.type === 'time') {
            Object.assign(cleaveOption, {
                time: true,
                delimiter: ':',
                timePattern: ['h', 'm'],
                onValueChanged: (event) => {
                    this.selectedValue = event?.target?.value;
                },
            });
        } else if (this.type === 'date' && !this.range) {
            Object.assign(cleaveOption, {
                date: true,
                delimiter: '-',
                datePattern: ['Y', 'm', 'd'],
                onValueChanged: (event) => {
                    this.selectedValue = event?.target?.value;
                },
            });
        }

        this.cleaveInstance = new Cleave(this.datePicker.$refs.input, cleaveOption);
    },
    beforeDestroy() {
        this.cleaveInstance.destroy();
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

            .mx-datepicker {
                width: 100%;
            }

            .custom-date {

                input {
                    height: 300px;
                }
            }
        }
    }
</style>
