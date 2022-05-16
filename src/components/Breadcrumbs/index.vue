<template>
  <div class="breadcrumbs">
    <el-tag size="small" v-for="(item, index) in breadcrumbs" :key="index" :closable="item.key != '/'" :type="item.type" hit disable-transitions class="breadcrumbs_1" @click="handleClick(item)" @close="handleClose(item)" effect="dark">{{ item.name }} </el-tag>
    <el-button class="exit" @click="exit">退出</el-button>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props: {
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // 关闭面包屑
    handleClose(item) {
      // 在数组中删除当前item
      this.breadcrumbs.splice(this.breadcrumbs.indexOf(item), 1);
      // 如果删除的type为success,则当前下标的type改为success
      if (item.type === 'success') {
        this.breadcrumbs[this.breadcrumbs.length - 1].type = 'success';
      }
    },
    // 点击面包屑
    handleClick(item) {
      this.breadcrumbs.forEach(item => {
        item.type = 'info';
      });
      item.type = 'success';
      this.$router.push(item.key);
      this.$emit('handleClick', `${item.key}/${item.name}`);
    },
    // 退出登录
    exit() {
      this.$confirm('确定退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        window.location.reload()
      }).catch(() => {
      })
    }
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
