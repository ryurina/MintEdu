import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'

// Polyfills for HashConnect
import { Buffer } from 'buffer'
window.Buffer = Buffer
window.global = window

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
