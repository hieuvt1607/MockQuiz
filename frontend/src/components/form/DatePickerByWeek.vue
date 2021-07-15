<template>
    <div v-click-outside="hidenCalendar" class="calendar-picker-wrap d-flex flex-wrap align-center">
        <div class="calendar-time-view clickable mr-1" @click="openCalendar">
            <div class="date-calendar text-left mr-4">
                {{ dateStr }}
            </div>
            <v-icon small>
                mdi-calendar
            </v-icon>
        </div>
        <v-expand-transition>
            <validation-provider
                v-if="open"
                :vid="vid || name"
                v-slot="{ errors }"
                :rules="rules"
                :name="name"
                class="datepicker-popup"
                tag="div"
            >
                <div class="wrap-text-field">
                    <Datepicker
                        class="custom-date"
                        :multiple="multiple"
                        :inline="true"
                        :type="'date'"
                        v-model="picker"
                        :format="format"
                        :placeholder="placeholder"
                        :lang="$t('common.langDateTime')"
                        :disabled="disabled"
                        :clearable="clearable"
                        :editable="editable"
                        :open.sync="open"
                        :value-type="'date'"
                        @pick="handlePick"
                        :get-classes="getClasses"
                    />
                    <div
                        class="text-error error--text fade-transition"
                        v-show="errors && errors.length"
                    >
                        {{ (errors[0] || []).includes('I18n') ? $t(errors[0]) : errors[0] }}
                    </div>
                    <div class="datepicker-popup-footer">
                        <v-btn
                            small
                            outlined
                            class="mr-2 text-capitalize btn-close"
                            @click="onClose"
                            color="#9E9E9E"
                        >
                            {{ $t('common.close') }}
                        </v-btn>
                        <v-btn
                            small
                            color="blue"
                            class="mr-0 text-capitalize btn-confirm"
                            @click="applyDate"
                        >
                            {{ $t('common.confirm') }}
                        </v-btn>
                    </div>
                </div>
            </validation-provider>
        </v-expand-transition>
        <div class="btn-arrow d-flex">
            <v-btn small icon rounded @click="prev">
                <v-icon>
                    mdi-chevron-left
                </v-icon>
            </v-btn>
            <v-btn small icon rounded @click="next">
                <v-icon>
                    mdi-chevron-right
                </v-icon>
            </v-btn>
        </div>
        <div class="current-week">
            <v-btn
                small
                outlined
                color="primary"
                class="text-capitalize py-2 mx-3"
                @click.native="currentWeek"
            >
                {{ $t('common.currentWeek') }}
            </v-btn>
        </div>
    </div>
</template>
<script>
import Datepicker from 'vue2-datepicker';
import * as moment from 'moment';
import { date } from '@/modules/common/constants';

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
            default: 'YYYY-MM-DD',
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
        multiple: {
            type: Boolean,
            default: () => true,
        },
    },

    components: {
        Datepicker,
    },

    data() {
        return {
            open: false,
            now: moment(),
            from: moment(),
            to: moment().add(6, date.DAYS),
            picker: [],
        };
    },

    mounted() {
        if (this.value) {
            this.picker = this.value;
        } else {
            this.picker = this.buildRangeDate();
        }
    },

    computed: {
        dateStr() {
            const from = moment(this.from);
            const to = moment(this.to);
            return [from.format(this.format), to.format(this.format)].join(' ~ ') || '';
        },
    },

    methods: {
        handlePick(pickDate) {
            const w = [];
            for (let d = 1; d < 7; d += 1) {
                const item = new Date(pickDate.getTime() + d * 24 * 60 * 60 * 1000);
                w.push(item);
            }

            w.unshift(pickDate);

            this.picker = w;
        },
        getClasses(cellDate, currentDates) {
            if (this.multiple && Array.isArray(currentDates)) {
                const cellDateTime = new Date(cellDate).getTime();
                const items = currentDates.map((item) => item.getTime());
                const minDate = Math.min(...items);
                const maxDate = Math.max(...items);

                if (cellDateTime >= minDate && cellDateTime <= maxDate) {
                    return 'active';
                }
            }

            return '';
        },
        hidenCalendar() {
            this.applyDate();
            this.open = false;
        },

        openCalendar() {
            this.open = true;
        },

        currentWeek() {
            this.from = this.now.clone();
            this.to = this.from.clone().add(6, date.DAYS);
            this.updateStoreDate();
        },

        refresh() {
            this.updateStoreDate();
        },

        next() {
            this.updateCalendar(true);
        },

        prev() {
            this.updateCalendar(false);
        },

        updateCalendar(isNext) {
            const [from, to] = [this.from.clone(), this.to.clone()];
            if (isNext) {
                this.from = from.add(1, date.DAY);
                this.to = to.add(1, date.DAY);
            } else {
                this.from = from.add(-1, date.DAY);
                this.to = to.add(-1, date.DAY);
            }

            this.updateStoreDate();
        },

        async updateStoreDate() {
            this.picker = this.buildRangeDate();
            this.$emit('date-value', this.picker);
        },

        onClose() {
            this.open = false;
        },

        applyDate() {
            const [from, to] = [this.picker[0], this.picker[this.picker.length - 1]];
            this.from = moment(from);
            this.to = moment(to);
            this.updateStoreDate();
            this.onClose();
        },

        buildRangeDate() {
            const days = this.to.diff(this.from, date.DAY);
            const pickers = [];
            for (let d = 0; d <= days; d += 1) {
                const item = this.from.clone().add(d, date.DAYS).toDate();
                pickers.push(item);
            }
            return pickers;
        },
    },
};
</script>
<style scoped lang="scss">
.calendar-picker-wrap {
    position: relative;
    .calendar-time-view {
        display: flex;
        border-bottom: 1px solid #eeeeee;
        padding: 5px;
        justify-content: space-between;
        align-items: center;
        cursor: text;
        position: relative;
    }

    .datepicker-popup {
        position: absolute;
        background-color: white;
        width: 270px;
        z-index: 25;
        top: 40px;
        box-shadow: 0 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),
            0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14), 0 0.0625rem 0.3125rem 0 rgba(0, 0, 0, 0.12);
        .datepicker-popup-content {
            padding: 12px 20px;
        }
        .datepicker-popup-footer {
            padding: 12px;
            text-align: right;
        }
    }
}

.calendar-picker {
    position: relative;
}

.wrap-text-field {
    position: relative;
}
.text-error {
    position: absolute;
    line-height: 1.5;
}
::v-deep input:-webkit-autofill {
    background-color: transparent !important;
    -webkit-box-shadow: 0 0 0 50px white inset;
}
::v-deep .mx-datepicker {
    .mx-icon-calendar {
        right: 17px !important;
    }
    .mx-icon-clear {
        right: 16px !important;
    }
    .mx-calendar {
        width: 100%;
    }
}
</style>
