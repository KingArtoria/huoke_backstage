<template>
  <div class="app-wrap">
    <div class="app-card">

      <Head :searchParams="templateParams" @searchList="doSearch" />
      <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
        element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
        <el-table-column label="姓名" prop="aid" align="center"></el-table-column>
        <el-table-column label="单数" prop="num" align="center"></el-table-column>
        <el-table-column label="业绩总额" prop="price" align="right"></el-table-column>
        <!-- <el-table-column label="数据类型" prop="version" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.version === 'new' ? 'primary' : 'info'">{{ scope.row.version === 'new' ? '新数据' : '旧数据' }}</el-tag>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
import { getOwnerPerformance } from "@/utils/api";
import listMixin from "@/mixins/listMixin";
import Head from "../../components/Head/index.vue";
export default {
  mixins: [listMixin],
  components: { Head },
  data() {
    return {
      templateParams: [
        {
          key: "uid",
          value: "",
          label: "姓名",
          placeholder: "请选择",
          type: "select",
          data: [], // 用户下拉框
        },
      ],
    };
  },
  methods: {
    fetchData() {
      getOwnerPerformance(this.searchParams).then((res) => {
        this.tableData = res.data.list;
        this.templateParams[0].data = res.data.select.map((v) => {
          return {
            label: v,
            value: v,
          };
        });
      });
    },
    doSearch(params) {
      this.searchParams = params;
      this.search();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
</style>


