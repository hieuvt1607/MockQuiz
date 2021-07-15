import Vue from 'vue';
import moment from 'moment';

Vue.mixin({
  methods: {
    formatDate(date) {
      if (date) {
        return moment(date)
          .format('YYYY-MM-DD');
      }
      return '';
    },
    formatPrice(value) {
      const valueABS = Math.abs(value);
      if (Number.isNaN(valueABS)) return value;
      if (valueABS > -1000 && valueABS < 1000) {
        return value;
      }
      const valueNumber = Intl.NumberFormat('ja-US').format(valueABS);
      if (Number(value) < 0) {
        return `-${valueNumber}`;
      }
      return valueNumber;
    },
    scrollToError(className = 'v-messages__message') {
      setTimeout(() => {
        const errorElement = document.getElementsByClassName(className);
        if (errorElement.length > 0) {
          this.$scrollTo(errorElement[0], {
            duration: 500,
            easing: 'ease-in',
            offset: -150,
            force: true,
            cancelable: true,
            x: false,
            y: true,
          });
        }
      }, 100);
    },
    getTotalItem(totalItem, limit = 10) {
      return Math.floor((totalItem - 1) / limit) + 1;
    },
  },
});
