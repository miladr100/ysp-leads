import Vue from 'vue'
import VueToast from 'vue-toast-notification'
// Import one of the available themes
// import 'vue-toast-notification/dist/theme-default.css'
import 'vue-toast-notification/dist/theme-sugar.css'

Vue.use(VueToast, {
  // One of the options
  position: 'top-right',
  duration: 5000,
  dismissible: true,
})
// Vue.$toast.open({/* options */});
