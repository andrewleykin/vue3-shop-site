import { createApp } from 'vue'
import { VuelidatePlugin } from '@vuelidate/core'
import App from './App.vue'
import router from './router'
import store from './store'
import './settings'

import ToastService from 'primevue/toastservice'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'
import Menu from 'primevue/menu'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton'
import Paginator from 'primevue/paginator'
import InputNumber from 'primevue/inputnumber'
import InputMask from 'primevue/inputmask'
import Rating from 'primevue/rating'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'

const app = createApp(App)

app.use(ToastService)
app.component('BButton', Button)
app.component('InputText', InputText)
app.component('Menubar', Menubar)
app.component('MenuItem', Menu)
app.component('Card', Card)
app.component('Dropdown', Dropdown)
app.component('RadioButton', RadioButton)
app.component('Paginator', Paginator)
app.component('InputNumber', InputNumber)
app.component('InputMask', InputMask)
app.component('Rating', Rating)
app.component('Toast', Toast)
app.component('ProgressSpinner', ProgressSpinner)

app.use(VuelidatePlugin).use(store).use(router).mount('#app')
