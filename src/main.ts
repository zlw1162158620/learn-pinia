import { createApp, toRaw } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { piniaDataPersistencePlugin } from './plugins/dataPersistencePlugin'

const store = createPinia();
store.use(piniaDataPersistencePlugin({}));

const app = createApp(App);
app.use(store);
app.mount('#app')
