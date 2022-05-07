<template>
  <div class="navigation">
    <el-menu @select="handleOpen" background-color="#545c64" text-color="#fff" ref="menu" default-active="首页">
      <el-menu-item index="首页">
        <i class="el-icon-monitor"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 打开菜单回调
    handleOpen(key, keyPath) {
      this.$emit('handleOpen', key, keyPath);
    },
    // 初始化参数
    initParams() {
      // this.$refs['menu'].open('首页');
    },
  },
  mounted() {
    // 初始化参数
    this.initParams();
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
