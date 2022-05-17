<template>
  <div class="navigation">
    <el-menu @select="handleOpen" background-color="#545c64" text-color="#fff" ref="menu" :default-active="defaultActive">
      <el-menu-item index="首页" :route="{ path: '/' }">
        <i class="iconfont icon icon-xiazai44"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu :index="item.node_name" v-for="(item, index) in _tree" :key="index">
        <template slot="title">
          <i class="iconfont icon" :class="icon[item.node_name]"></i>
          <span>{{ item.node_name }}</span>
        </template>
        <el-menu-item :index="`/${item2.control_name}/${item2.action_name}/${item2.node_name}`" v-for="(item2, index2) in item.son" :key="index2">{{ item2.node_name }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    defaultActive: {
      type: String,
      default: '首页',
    },
  },
  data() {
    return {
      icon: {
        '用户管理': 'icon-yonghu',
        '业务支持': 'icon-kefu',
        '订单管理': 'icon-caigoudingdan',
        '业绩报表': 'icon-baobiao',
      }
    };
  },
  methods: {
    // 打开菜单回调
    handleOpen(key, keyPath) {
      this.$emit('handleOpen', key, keyPath);
      if (key === '首页') return this.$router.push('/');
      // 获取key最后一个/之前的内容
      let keyLastBefore = key.split('/').slice(0, -1).join('/');
      this.$router.push(keyLastBefore);
    },
    // 初始化参数
    initParams() {},
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
