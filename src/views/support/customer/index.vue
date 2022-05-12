<template>
  <div class="app-page">
    <header class="app-header">
      <el-button type="primary" @click="$refs.form.open()">添加角色</el-button>
    </header>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      :header-cell-style="_headerCellStyle"
      border
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中，请稍候……"
    >
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="账号" prop="role_name"></el-table-column>
      <el-table-column label="昵称" prop="role_name"></el-table-column>
      <el-table-column label="真实姓名" prop="role_name"></el-table-column>
      <el-table-column label="公司" prop="role_name"></el-table-column>
      <el-table-column label="头像" prop="role_name"></el-table-column>
      <el-table-column label="手机" prop="role_name"></el-table-column>
      <el-table-column label="vip" prop="role_name"></el-table-column>
      <el-table-column label="注册时间" prop="role_name"></el-table-column>
      <el-table-column label="用户来源" prop="role_name"></el-table-column>
      <el-table-column label="支持" prop="role_name"></el-table-column>
      <el-table-column label="数据来源" prop="role_name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="$refs.form.open(scope.row)">
            编辑
          </el-button>
          <el-button type="text" @click="del({ id: scope.row.id })">
            删除
          </el-button>
          <el-button type="text">赠送道具卡</el-button>
          <el-button type="text">查看记录</el-button>
          <el-button type="text">拉取</el-button>
        </template>
      </el-table-column>
    </el-table>
    <footer class="app-pagination-wrap">
      <el-pagination
        :page-sizes="pageSizes"
        background
        layout="prev, pager, next, jumper"
        :total="total"
        :page-size="searchParams.num"
        :current-page="searchParams.page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </footer>
  </div>
</template>

<script>
import {
  getAllMember,
  getPubMember,
  getGroMember,
  getPerMember,
  releaseMember,
  supMember,
} from "@/utils/api";
import listMixin from "@/mixins/listMixin";
export default {
  mixins: [listMixin],
  data() {
    return {
      type: "",
      // 页面类型与对应的获取数据方法
      fetchMethod: {
        PubMember: getPubMember,
        GroMember: getGroMember,
        PerMember: getPerMember,
      },
    };
  },
  watch: {
    $route() {
      /* 
      PubMember 公海池
      GroMember 组长池
      PerMember 个人池
      */
      this.type = this.$route.name;
      this.fetchData();
    },
  },
  methods: {
    fetchData() {
      const method = this.fetchMethod[this.type];
      method(this.searchParams).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.rows;
      });
    },
  },
  mounted() {
    this.type = this.$route.name;
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
</style>
