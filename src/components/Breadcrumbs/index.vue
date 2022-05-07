<template>
  <div class="breadcrumbs">
    <el-tag size="small" v-for="(item, index) in breadcrumbs" :key="index" :closable="item.key != '首页'" :type="item.type" hit disable-transitions class="breadcrumbs_1" @click="handleClick(item)" @close="handleClose(item)" effect="dark">{{ item.key }} </el-tag>
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
      const index = this.breadcrumbs.findIndex(item2 => item2.key === item.key);
      if (index > -1) {
        this.breadcrumbs.splice(index, 1);
        // 如果删除的type为success，则将前一个的type改为success
        if (item.type === 'success') {
          if (index == this.breadcrumbs.length) {
            this.breadcrumbs[index - 1].type = 'success';
          } else {
            this.breadcrumbs[index].type = 'success';
          }
        }
      }
    },
    // 点击面包屑
    handleClick(item) {
      // 将数组里的type全部改为info
      this.breadcrumbs.forEach(item2 => {
        item2.type = 'info';
      });
      // 根据指定的key更改type为success
      const index = this.breadcrumbs.findIndex(item2 => item2.key === item.key);
      if (index > -1) {
        this.breadcrumbs[index].type = 'success';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
