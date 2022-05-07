<template>
  <div id="app">
    <Navigation @handleOpen="handleOpen" />
    <div class="app_1">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
    </div>
    <!-- <router-view /> -->
  </div>
</template>

<script>
import Navigation from './components/Navigation/index.vue';
import Breadcrumbs from './components/Breadcrumbs/index.vue';
export default {
  data() {
    return {
      // 面包屑数组
      breadcrumbs: [],
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
