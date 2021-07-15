/* eslint-disable */
import lodash from 'lodash'
import Vue from 'vue';

const genericInstall = (Vue) => {
  Vue._ = lodash
  Object.defineProperties(Vue.prototype, {
    _: { get() { return lodash } }
  })
}

const Lodash = {
  install (Vue, options) {
    if (options && options.name) {
      Vue[options.name] = lodash
      Object.defineProperties(Vue.prototype, {
        [options.name]: { get() { return lodash } }
      })
    }
    genericInstall(Vue)
    Vue.mixin({
      mounted() {
        // Just tell you that it is mounted
        // console.log('VueLodash');
      }
    })
    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(Lodash)
    }
  }
}
Vue.use(Lodash);
