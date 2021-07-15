import moment from 'moment';

import Vue from 'vue';

Vue.filter('formatDate', (date) => {
    if (date) {
        return moment(date).format('YYYY-MM-DD h:mm A');
    }
    return '';
});

Vue.filter('fromNow', (date) => {
    if (date) {
        return moment(date).fromNow();
    }
    return '';
});
