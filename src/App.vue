<template>
  <div id="app">
    <Navigation @handleOpen="handleOpen" v-if="isShow" :defaultActive="defaultActive" />
    <div class="app_1" :class="{is_login: !isShow}">
      <Breadcrumbs :breadcrumbs="breadcrumbs" v-if="isShow" @handleClick="handleClick" />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation/index.vue';
``;
import Breadcrumbs from './components/Breadcrumbs/index.vue';
import { formatDate, getWeek } from './utils/index';
import Vue from 'vue';
import './assets/live2d/live2d.min.js';
import { initWidget } from './assets/live2d/waifu-tips';
export default {
  data() {
    return {
      // 面包屑数组
      breadcrumbs: [{ name: '首页', type: 'success', key: '/' }],
      // 是否现实组件
      isShow: true,
      // 当前选中的菜单栏
      defaultActive: '',
    };
  },
  methods: {
    handleClick(defaultActive) {
      if (defaultActive === '//首页') defaultActive = '首页';
      this.defaultActive = defaultActive;
    },
    handleOpen(key, keyPath) {
      this.breadcrumbs.forEach(item => {
        item.type = 'info';
      });
      // 获取key最后一个/之后的内容
      let keyLast = key.split('/').pop();
      // 获取key最后一个/之前的内容
      let keyLastBefore = key.split('/').slice(0, -1).join('/');
      // keyLast是否在数组中出现过
      let isExist = this.breadcrumbs.some(item => {
        return item.name === keyLast;
      });
      if (isExist) {
        // 将出现的某条数据的type改为success
        this.breadcrumbs.forEach(item => {
          if (item.name === keyLast) {
            item.type = 'success';
          }
        });
      } else {
        this.breadcrumbs.push({ name: keyLast, type: 'success', key: keyLastBefore });
      }
    },
    // 初始化参数
    initParams() {
      let title = `${formatDate(new Date(), 'MM-dd')} ${getWeek()}`;
      if (getWeek() === '星期六' || getWeek() === '星期日') {
        this.$notify({ title, message: '加班辛苦了🚵' });
      } else {
        this.$notify({ title, message: '今天也要加油呀!🎉' });
      }
    },
  },
  mounted() {
    // 初始化参数
    this.initParams();
    // 初始化live2d组件
    initWidget({
			cdnPath: "https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/"
    })
  },
  created() {
    Vue.prototype._tree = JSON.parse(localStorage.getItem('tree'));
    Vue.prototype._headerCellStyle = { background: '#f5f5f5', color: '#808080' };
    console.log(this._tree);
  },
  watch: {
    $route(to, from) {
      if (to.path === '/login') {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
  },
  components: { Navigation, Breadcrumbs },
};
</script>

<style>
@import './index.css';
@import './assets/live2d/waifu.css';
</style>
<style lang="scss" scoped>
@import './App.scss';
</style>
