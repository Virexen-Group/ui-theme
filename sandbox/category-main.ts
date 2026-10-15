import {createApp} from 'vue';
import DocsCategory from './DocsCategory.vue';
import '../src/theme.css';
import '../src/styles/components.css';
import '../src/styles/master.css';
import '../src/styles/layout.css';
const category = document.querySelector<HTMLMetaElement>('meta[name="vx-category"]')?.content || 'foundations';
createApp(DocsCategory,{category}).mount('#app');
