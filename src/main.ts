import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import http from './utils/axios'
import elementResizeDetectorMaker from 'element-resize-detector'
import VueGtag from 'vue-gtag'

const app = createApp(App)
app.directive('resize', {
  mounted(el, binding, vnode) {
    el.$$erd = elementResizeDetectorMaker({
      strategy: 'scroll'
    })
    el.$$erd.listenTo({}, el, (element:HTMLElement) => {
      let width = element.offsetWidth
      let height = element.offsetHeight
      el.$$time && clearTimeout(el.$$time)
      el.$$time = setTimeout(() => {
        vnode.props?.onResize(width, height)
      }, 300)
    })
  },
  unmounted(el) {
    el.$$erd && el.$$erd.uninstall(el)
    el.$$time && clearTimeout(el.$$time)
  }
})
app.config.globalProperties.$http = http
app.use(router)
app.use(VueGtag, {
  config: { 
    id: "G-0TE9CBD37K",
  },
}, router);
app.mount('#app')