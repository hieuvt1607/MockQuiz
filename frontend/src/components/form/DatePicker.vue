<template>
    <div>
        <validation-provider :vid="vid || name" v-slot="{ errors }" :rules="rules" :name="name">
            <div class="wrap-text-field">
                <Datepicker
                    class="custom-date mt-2"
                    ref="datePicker"
                    :type="type"
                    v-model="dateValue"
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
                    @close="closePopup"
                    @open="openPopup"
                    @change="handleChange"
                />
                <div
                    class="text-error error--text fade-transition"
                    v-show="errors && errors.length"
                >
                    {{ (errors[0] || []).includes('I18n') ? $t(errors[0]) : errors[0] }}
                </div>
            </div>
        </validation-provider>
    </div>
</template>
<script>
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
                return this.value;
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
                this.$refs.datePicker.focus();
            }
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
<style scoped>
.wrap-text-field {
    position: relative;
}
.text-error {
    position: absolute;
    line-height: 1.5;
}
/deep/input:-webkit-autofill {
    background-color: transparent !important;
    -webkit-box-shadow: 0 0 0 50px white inset;
}
/deep/ .mx-icon-calendar {
    right: 17px !important;
}
/deep/ .mx-icon-clear {
    right: 16px !important;
}
</style>
