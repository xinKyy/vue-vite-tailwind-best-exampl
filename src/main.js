import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from "@arco-design/web-vue";
import { Message } from '@arco-design/web-vue';
import "@arco-design/web-vue/dist/arco.css";
import router from './router'

const app = createApp(App);
Message._context = app._context;
import './styles/index.css'

app.use(router);
app.use(ArcoVue);
app.mount('#app')
