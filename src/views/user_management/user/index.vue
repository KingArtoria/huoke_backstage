<template>
  <div>
    <div class="content app-page">
      <el-table border :header-cell-style="headerCellStyle">
        <el-table-column prop="date" label="管理员ID" />
        <el-table-column prop="date" label="管理员名称" />
        <el-table-column prop="date" label="管理员角色" />
        <el-table-column prop="date" label="登录次数" />
        <el-table-column prop="date" label="上次登录IP" />
        <el-table-column prop="date" label="上次登录时间" />
        <el-table-column prop="date" label="真实姓名" />
        <el-table-column prop="date" label="状态"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style></style>
