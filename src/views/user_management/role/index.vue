<template>
  <div class="app-page">
    <header v-if="addPermission" class="app-header app-flex-end">
      <el-button type="primary" @click="$refs.form.open()">添加角色</el-button>
    </header>
    <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
      <el-table-column label="角色ID" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="role_name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="editPermission" type="text" @click="$refs.form.open(scope.row)"> 编辑 </el-button>
          <el-button v-if="delPermission" type="text" @click="del({ id: scope.row.id })"> 删除 </el-button>
          <el-button v-if="bindPermission" type="text" @click="$router.push(`/role/bind?id=${scope.row.id}&rule=${scope.row.rule}`)"> 分配权限 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <footer class="app-pagination-wrap">
      <el-pagination :page-sizes="pageSizes" background layout="prev, pager, next, jumper" :total="total" :page-size="searchParams.num" :current-page="searchParams.page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </footer>
    <RoleForm ref="form" @update-data="fetchData"></RoleForm>
  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin';
import RoleForm from './role-form.vue';
import { getRoleList, delRole } from '../../../utils/api';
import { getPermission } from '../../../utils/index';
export default {
  mixins: [listMixin],
  components: { RoleForm },
  data() {
    return {
      mixinParams: {
        del: delRole,
      },
    };
  },
  computed: {
    // 【添加】权限
    addPermission() {
      return getPermission('用户管理', '角色管理', '添加角色')
    },
    // 【编辑】权限
    editPermission() {
      return getPermission('用户管理', '角色管理', '编辑角色')
    },
    // 【删除】权限
    delPermission() {
      return getPermission('用户管理', '角色管理', '删除角色')
    },
    // 【分配权限】权限
    bindPermission() {
      return getPermission('用户管理', '角色管理', '分配权限')
    },
  },
  methods: {
    // 获取发布内容列表
    fetchData() {
      getRoleList(this.searchParams).then(res => {
        this.hideLoading();
        this.tableData = res.data.list;
        this.total = res.data.rows;
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

<style lang="scss" scoped></style>
