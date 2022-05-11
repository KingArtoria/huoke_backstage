<template>
  <div class="app-page">
    <header class="app-search">
      <el-button type="primary" @click="$refs['form'].open()">添加</el-button>
    </header>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      :header-cell-style="headerCellStyle"
      stripe
      border
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中，请稍候……"
    >
      <el-table-column label="角色ID" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="$refs.form.open()">编辑</el-button>
          <el-button type="text" @click="$refs.form.open()">删除</el-button>
          <el-button type="text" @click="$refs.form.open()">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <footer class="app-pagination-wrap">
      <el-pagination
        :page-sizes="pageSizes"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-size="searchParams.pageSize"
        :current-page="searchParams.pageIndex"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </footer>
    <RoleForm ref="form" @update-data="fetchData"></RoleForm>
  </div>
</template>

<script>
import listMixin from "@/mixins/listMixin";
import RoleForm from "./role-form.vue";
import { getRoleList } from "../../../utils/api";
export default {
  mixins: [listMixin],
  components: { RoleForm },
  data() {
    return {
      tableData: [{ content: "sdfsdfs" }],
    };
  },
  methods: {
    // 获取发布内容列表
    fetchData() {
      getRoleList(this.searchParams).then((res) => {
        this.hideLoading();
        this.tableData = res.data;
      });
      this.showLoading();
    },
  },
  mounted() {
    // 获取发布内容列表
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
</style>
