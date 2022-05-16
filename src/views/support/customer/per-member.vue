<template>
  <!-- 个人池 -->
  <div class="app-wrap">
    <!-- <Search :searchParams="searchParams" @search="search" /> -->
    <div class="app-card">
      <Head :searchParams="templateParams" @searchList="doSearch" />
      <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
        element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
        <el-table-column label="ID" prop="id" width="60" align="center"></el-table-column>
        <el-table-column label="昵称" prop="nick_name"></el-table-column>
        <el-table-column label="手机" prop="phone" width="110" align="center"></el-table-column>
        <el-table-column label="是否电联" prop="is_tel" width="80" align="center"></el-table-column>
        <el-table-column label="来源" prop="source" width="150" align="center"></el-table-column>
        <el-table-column label="关键词" prop="keyWord"></el-table-column>
        <el-table-column label="注册时间" prop="add_time" width="140" align="center"></el-table-column>
        <el-table-column label="用户等级" prop="support_level"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <!-- <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button type="text" @click="$refs.form.open(scope.row)">设置备注</el-button>
            <el-button type="text" @click="release(scope.row.id)">释放</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <footer class="app-pagination-wrap">
        <el-pagination :page-sizes="pageSizes" background layout="prev, pager, next, jumper" :total="total"
          :page-size="searchParams.num" :current-page="searchParams.page" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </footer>
    </div>
    <RemarkForm ref="form" @update-data="fetchData" />
  </div>
</template>

<script>
import { getPerMember, releaseMember } from "@/utils/api";
import listMixin from "@/mixins/listMixin";
import RemarkForm from "./components/remark-form.vue";
import Head from "@/components/Head/index.vue";
import { DATE_CONST, USER_RATE_CONST } from '@/utils/const';
export default {
  mixins: [listMixin],
  components: { RemarkForm, Head },
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
  methods: {
    fetchData() {
      getPerMember(this.searchParams).then((res) => {
        res.data.list.forEach((v) => {
          v.head = "https://asd.bdhuoke.com/" + v.head;
          // 替换v.phone中间4位为*
          v.phone = v.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
          v.is_tel = v.is_tel == 1 ? "是" : "否";
        });
        this.tableData = res.data.list;
        this.total = res.data.rows;
      });
    },
    release(id) {
      this.$confirm("确定释放吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          releaseMember({ id }).then(() => {
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
