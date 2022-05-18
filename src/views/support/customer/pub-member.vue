<template>
  <!-- 公海池 -->
  <div class="app-wrap">
    <!-- <Search :searchParams="searchParams" @search="search" /> -->
    <div class="app-card">
      <Head :searchParams="templateParams" @searchList="doSearch" :functionParams="functionParams" @functionClick="functionClick" />
      <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
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
        <el-table-column label="注册时间" prop="add_time" width="140" align="center"></el-table-column>
        <el-table-column label="来源" prop="source"></el-table-column>
        <el-table-column label="支持" prop="uid"></el-table-column>
        <el-table-column v-if="historyPermission" label="操作" width="110" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="$router.push(`/support/history?id=${scope.row.id}`)">查看记录</el-button>
            <el-button type="text" @click="pull(scope.row.id)">拉取</el-button>
          </template>
        </el-table-column>
      </el-table>
      <footer class="app-pagination-wrap">
        <el-pagination :page-sizes="pageSizes" background layout="total,prev, pager, next, jumper" :total="total" :page-size="searchParams.num" :current-page="searchParams.page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </footer>
    </div>
  </div>
</template>

<script>
import { getPubMember, supMember } from '@/utils/api';
import { getPermission } from '@/utils/index';
import listMixin from '@/mixins/listMixin';
import Head from '@/components/Head/index.vue';
import { DATE_CONST, USER_RATE_CONST } from '@/utils/const';
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
      // 操作按钮参数
      functionParams: [],
      // 批量拉群参数
      batchParams: [],
    };
  },
  computed: {
    // 查看操作记录的权限
    historyPermission() {
      return getPermission('业务支持', '公海池', '操作记录');
    },
  },
  methods: {
    fetchData() {
      getPubMember(this.searchParams).then(res => {
        res.data.list.forEach(v => {
          v.head = 'https://asd.bdhuoke.com/' + v.head;
        });
        this.tableData = res.data.list;
        this.total = res.data.rows;
      });
    },
    pull(id) {
      this.$confirm('确定拉取吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          supMember({ id }).then(() => {
            this.$message.success('操作成功');
            this.fetchData();
          });
        })
        .catch(() => {});
    },
    doSearch(params) {
      this.searchParams = Object.assign(this.searchParams, params);
      this.search();
    },
    // 初始化参数
    initParams() {
      this.functionParams = [{ text: '批量拉取', callback: 'batchPull' }];
    },
    // 批量拉取
    batchPull() {
      this.batchParams.forEach(item => {
        supMember({ id: item }).then(() => {
          this.$message.success('操作成功');
          this.fetchData();
        });
      });
    },
    // 批量选中
    handleSelectionChange(value) {
      // 赋值value中所有的id
      this.batchParams = value.map(v => v.id);
    },
    // 按钮点击回调
    functionClick(params) {
      console.log(params);
      this[params]();
    },
  },
  mounted() {
    this.initParams();
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
