<template>
  <div id="app">
    <Navigation @handleOpen="handleOpen" v-if="isShow" />
    <div class="app_1">
      <Breadcrumbs :breadcrumbs="breadcrumbs" v-if="isShow" />
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
export default {
  data() {
    return {
      // 面包屑数组
      breadcrumbs: [{ key: '首页', type: 'success' }],
      // 是否现实组件
      isShow: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // 将数组里的type全部改为info
      this.breadcrumbs.forEach(item => {
        item.type = 'info';
      });
      const index = this.breadcrumbs.findIndex(item => item.key === key);
      if (index == -1) {
        this.breadcrumbs.push({ key, type: 'success' });
      } else {
        // 将数组里指定的key的type改为success
        this.breadcrumbs[index].type = 'success';
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
  },
  created() {
    Vue.prototype._tree = JSON.parse(localStorage.getItem('tree'));
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
</style>
<style lang="scss" scoped>
@import './App.scss';
</style>
