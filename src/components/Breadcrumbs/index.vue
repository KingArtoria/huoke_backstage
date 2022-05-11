<template>
  <div class="breadcrumbs">
    <el-tag size="small" v-for="(item, index) in breadcrumbs" :key="index" :closable="item.key != '/'" :type="item.type" hit disable-transitions class="breadcrumbs_1" @click="handleClick(item)" @close="handleClose(item)" effect="dark">{{ item.name }} </el-tag>
  </div>
</template>

<script>
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
      console.log(item.key);
      this.$router.push(item.key);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
