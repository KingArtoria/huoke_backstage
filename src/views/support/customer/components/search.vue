<template>
  <header class="app-header header">
      <el-form inline>
        <el-form-item label="来源">
          <el-input v-model="searchParams.source" maxlength="150" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchParams.phone" maxlength="150" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户评级">
          <el-select v-model="searchParams.support_level" clearable>
            <el-option
              v-for="item in supportLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员到期时间">
          <el-select v-model="searchParams.vip_end" clearable>
            <el-option
              v-for="item in vipEndOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </header>
</template>

<script>
export default {
  props: {
    searchParams: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 用户参数选项
      supportLevelOptions: [
        { label: 'B', value: 'B'},
        { label: 'C', value: 'C'},
        { label: 'A', value: 'A'},
        { label: 'S1', value: 'S1'},
        { label: 'S2', value: 'S2'},
      ],
      // 会员到期时间选项
      vipEndOptions: [
        { label: '1天', value: '86400'},
        { label: '3天', value: '259200'},
        { label: '7天', value: '604800'},
      ]
    };
  },
  methods: {
    search() {
      this.$emit('search')
    }
  },
};
</script>
<style scoped lang="scss">
.header {
  background: white;
  padding: 20px;
}
</style>
