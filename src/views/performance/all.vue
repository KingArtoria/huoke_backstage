<template>
  <div class="app-wrap">
    <div class="app-card">

      <Head :searchParams="templateParams" @searchList="doSearch" />
      <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
        element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
        <el-table-column label="姓名" prop="aid" align="center"></el-table-column>
        <el-table-column label="单数" prop="num" align="center"></el-table-column>
        <el-table-column label="业绩总额" prop="price" align="right"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getAllPerformance } from "@/utils/api";
import listMixin from "@/mixins/listMixin";
import Head from "../../components/Head/index.vue";
import { REPORT_DATE_TYPE } from "../../utils/const";
export default {
  mixins: [listMixin],
  components: { Head },
  data() {
    return {
      templateParams: [
        {
          key: "date",
          value: "",
          label: "统计类型",
          placeholder: "请选择",
          type: "select",
          data: REPORT_DATE_TYPE,
        },
      ],
    };
  },
  methods: {
    fetchData() {
      getAllPerformance(this.searchParams).then((res) => {
        this.tableData = res.data;
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


