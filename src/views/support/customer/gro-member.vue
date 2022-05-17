<template>
  <!-- 组长池 -->
  <div class="app-wrap">
    <!-- <Search :searchParams="searchParams" @search="search" /> -->
    <div class="app-card">
      <Head :searchParams="templateParams" @searchList="doSearch" />
      <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
        element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
        <el-table-column label="ID" prop="id" width="60" align="center"></el-table-column>
        <el-table-column label="账号" prop="account"></el-table-column>
        <el-table-column label="昵称" prop="nick_name"></el-table-column>
        <el-table-column label="真实姓名" prop="real_name" width="80" align="center"></el-table-column>
        <el-table-column label="公司" prop="company"></el-table-column>
        <el-table-column label="头像" prop="head" width="80" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.head" alt="" class="img" />
          </template>
        </el-table-column>
        <el-table-column label="手机" prop="phone" width="120" align="center"></el-table-column>
        <el-table-column label="vip" prop="is_vip" width="80" align="center"></el-table-column>
        <el-table-column label="注册时间" prop="add_time" width="150" align="center"></el-table-column>
        <el-table-column label="来源" prop="source"></el-table-column>
        <el-table-column label="支持" prop="uid"></el-table-column>
        <el-table-column v-if="pullPermission" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="pull(scope.row.id)">拉取</el-button>
          </template>
        </el-table-column>
      </el-table>
      <footer class="app-pagination-wrap">
        <el-pagination :page-sizes="pageSizes" background layout="prev, pager, next, jumper" :total="total"
          :page-size="searchParams.num" :current-page="searchParams.page" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </footer>
    </div>
  </div>
</template>

<script>
import { getGroMember, supMember } from "@/utils/api";
import listMixin from "@/mixins/listMixin";
import Head from "@/components/Head/index.vue";
import { DATE_CONST, USER_RATE_CONST } from '@/utils/const';
import { getPermission } from "@/utils/index";
export default {
  mixins: [listMixin],
  components: { Head },
  data() {
    return {
      templateParams: [
        { key: 'phone', value: '', label: '手机号码', placeholder: '请输入手机号', type: 'input' },
        { key: 'source', value: '', label: '来源', placeholder: '请输入来源', type: 'input' },
        { key: 'uid', value: '', label: '支持', placeholder: '请输入支持', type: 'input' },
        { key: 'support_level', value: '', label: '用户等级', placeholder: '请选择用户等级', type: 'select', data: USER_RATE_CONST },
        { key: 'vip_end', value: '', label: '到期时间', placeholder: '请选择到期时间', type: 'select', data: DATE_CONST },
      ],
    };
  },
  computed: {
    // 【拉取】权限
    pullPermission() {
      return getPermission('业务支持', '组长池', '拉取')
    }
  },
  methods: {
    fetchData() {
      getGroMember(this.searchParams).then((res) => {
        res.data.list.forEach((v) => {
          v.head = "https://asd.bdhuoke.com/" + v.head;
          v.phone = v.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
          v.account = v.account.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
        });
        this.tableData = res.data.list;
        this.total = res.data.rows;
      });
    },
    pull(id) {
      this.$confirm("确定拉取吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          supMember({ id }).then(() => {
            this.$message.success("操作成功");
            this.fetchData();
          });
        })
        .catch(() => {});
    },
    doSearch(params) {
      this.searchParams = Object.assign(this.searchParams, params);
      this.search();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.img {
  width: 40px;
  height: 40px;
}
</style>
