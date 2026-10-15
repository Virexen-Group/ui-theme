import { createApp } from 'vue';
import Demo from './IdentityDemo.vue';
import '../src/theme.css';
import '../src/styles/components.css';
import '../src/styles/theme-modes.css';
import '../src/styles/identity.css';
import { createVirexenUI } from '../src/config/virexen-ui';
import uiConfig from './virexen-ui.config';
createApp(Demo).use(createVirexenUI(uiConfig)).mount('#app');
