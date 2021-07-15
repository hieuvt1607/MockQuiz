import Vue from 'vue';
import {
 extend, localize, ValidationObserver, ValidationProvider,
} from 'vee-validate';
import * as veeValidateRules from 'vee-validate/dist/rules';
import { regex } from 'vee-validate/dist/rules';
import { Regex } from '@/helpers/constants';

import ja from 'vee-validate/dist/locale/ja.json';
import en from 'vee-validate/dist/locale/en.json';

import moment from 'moment';
import { get } from 'lodash';

import veeValidateLocale from './locale';

import TokenService from '../../helpers/token';

if (TokenService.getLang() === 'en') {
    localize('en', en);
} else {
    localize('ja', ja);
}

Object.entries(veeValidateRules).forEach(([rule, validation]) => {
    extend(rule, {
        ...validation,
    });
});

// Add locale for field name
localize({
    en: veeValidateLocale.en,
    ja: veeValidateLocale.ja,
});

// some common validations
// validate integer
const numberRegex = new RegExp(Regex.NUMBER_ONLY);
extend('commonIntegerRegex', {
    ...regex,
    message: () => 'common.common.validation.number|I18n',
    validate(value) {
        return numberRegex.test(value);
    },
});

extend('dateMin', {
    params: ['value', 'fieldName'],
    message: (_field, rules) => {
        const date = new Date(rules.value);
        const value = moment(date).format('YYYY/MM/DD');
        const field = rules.fieldName || 'common.common.fields.date';
        return `common.common.validation.date.min|field:${field}|value:${value}|I18n`;
    },
    validate(value, args) {
        const currentDate = moment(new Date(value));
        currentDate
            .hours(0)
            .minutes(0)
            .seconds(0);
        const mimDate = new Date(get(args, 'value'));
        const min = moment(mimDate);
        min.hours(0)
            .minutes(0)
            .seconds(0);
        return currentDate.isValid() && min.isValid() && min.isSameOrBefore(currentDate);
    },
});
extend('dateMax', {
    params: ['value', 'fieldName'],
    message: (_field, rules) => {
        const date = new Date(rules.value);
        const value = moment(date).format('YYYY/MM/DD');
        const field = rules.fieldName || 'common.common.fields.date';
        return `common.common.validation.date.max|field:${field}|value:${value}|I18n`;
    },
    validate(value, args) {
        const currentDate = moment(new Date(value));
        currentDate
            .hours(0)
            .minutes(0)
            .seconds(0);
        const maxDate = new Date(get(args, 'value'));
        const newMaxDate = moment(maxDate);
        newMaxDate.hours(0)
            .minutes(0)
            .seconds(0);
        return currentDate.isValid()
               && newMaxDate.isValid()
               && newMaxDate.isSameOrAfter(currentDate);
    },
});

Vue.component('validation-provider', ValidationProvider);
Vue.component('validation-observer', ValidationObserver);
