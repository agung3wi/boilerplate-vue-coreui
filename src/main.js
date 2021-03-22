// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
import 'vue-select/dist/vue-select.css';
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'
import api from "./api"
import Alert from "./sw"

import vSelect from 'vue-select'
import InputGroup from "./components/InputGroup"
import InputText from "./components/InputText"
import InputSelect from "./components/InputSelect"
import TextArea from "./components/TextArea"
import SubmitButton from "./components/SubmitButton"

Vue.component('v-select', vSelect)
Vue.component('input-group', InputGroup)
Vue.component('input-text', InputText)
Vue.component('input-select', InputSelect)
Vue.component('text-area', TextArea)
Vue.component('submit-button', SubmitButton)

Vue.prototype.$http = api;
Vue.prototype.alert = Alert;
Vue.use(BootstrapVue)

Vue.mixin({
  data: () => {
    return {
      config: {
        tax_percentage: 10
      },
      typePaymentList: [
        "prepaid", "postpaid"
      ],
      branchType: [
        {
          id: 'C',
          branch_type: 'Cabang',
        },
        {
          id: 'M',
          branch_type: 'Mitra',
        }
      ],
      yesNoList: [
        {
          id: 'Y',
          label: 'Ya',
        },
        {
          id: 'N',
          label: 'Tidak',
        }
      ],
      statusPaid: [
        {
          id: 'Y',
          label: 'Lunas',
        },
        {
          id: 'N',
          label: 'Belum Lunas',
        }
      ]

    }

  },
  methods: {
    startDateReport: () => {
      return moment().toDate();
    },
    endDateReport: () => {
      return moment().toDate();
    },
    convertDateClassToDB: (value) => {
      if (value === undefined || value === null)
        return ''
      return moment(value, "DD/MM/YYYY").format('YYYYMMDD');
    },
    convertDateClassToMonthDB: (value) => {
      if (value === undefined || value === null)
        return ''
      return moment(value).format('YYYYMM');
    },
    displayDate(dateDB) {
      if (dateDB == null || dateDB == "")
        return moment(dateDB, 'YYYYMMDD').format("DD/MM/YYYY");
    }

  },
  computed: {
    hasPermission() {
      return permission => this.$store.getters.hasPermission(permission);
    }
  },
  created: async function () {

  },
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
