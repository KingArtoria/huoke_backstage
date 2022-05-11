<template>
  <div>
    <div class="content app-page">
      <el-table border :header-cell-style="_headerCellStyle">
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
import { getUserList } from '../../../utils/api';
export default {
  data() {
    return {};
  },
  methods: {
    // 管理员列表
    getUserList() {
      getUserList().then(res => {
        console.log(res);
      });
    },
  },
  mounted() {
    // 管理员列表
    this.getUserList();
  },
};
</script>

<style></style>
