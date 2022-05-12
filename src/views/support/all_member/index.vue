<template>
  <div>
    <div class="content app-page">
      <!-- <el-table border :header-cell-style="_headerCellStyle" :data="userList">
        <el-table-column prop="id" label="管理员ID" width="80" align="center" />
        <el-table-column prop="user_name" label="管理员名称" />
        <el-table-column prop="login_times" label="登录次数" />
        <el-table-column prop="source" label="来源" />
        <el-table-column prop="last_login_ip" label="上次登录IP" width="130" />
        <el-table-column prop="last_login_time" label="上次登录时间" width="160" align="center" />
        <el-table-column prop="real_name" label="真实姓名" />
        <el-table-column label="状态" width="70" align="center">
          <template slot-scope="s">
            <el-tag type="success" v-if="s.row.status === '正常'">{{ s.row.status }}</el-tag>
            <el-tag type="success" v-if="s.row.danger === '禁用'">{{ s.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="s">
            <el-button type="text" @click="userdel(s.row)" v-if="delPermission">删除管理员</el-button>
            <el-button type="text" @click="beforeEdit(s.row)" v-if="editPermission">编辑管理员</el-button>
          </template>
        </el-table-column>
      </el-table> -->
    </div>
  </div>
</template>

<script>
import { getAllMember } from '../../../utils/api';
export default {
  data() {
    return {
      // 查询所有用户参数
      params: { page: 1, num: 10 },
    };
  },
  methods: {
    // 查询所有用户
    getAllMember() {
      getAllMember(this.params).then(res => {
        console.log(res);
      });
    },
  },
  mounted() {
    // 查询所有用户
    this.getAllMember();
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
