<template>
  <div class="app-wrap">
    <div class="app-card">
      <Head :searchParams="templateParams" @searchList="doSearch" />
      <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
        element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
        <el-table-column label="编号" prop="sn"></el-table-column>
        <el-table-column label="姓名" prop="aid" width="150" align="center"></el-table-column>
        <el-table-column label="标题" prop="title" align="center"></el-table-column>
        <el-table-column label="单额" prop="price" align="right"></el-table-column>
        <el-table-column label="手机" prop="phone" width="150" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="create_time" width="150" align="center"></el-table-column>
        <el-table-column label="备注" prop="remark_pic" width="80" align="center">
          <template slot-scope="scope">
            <el-image v-if="scope.row.remark_pic" class="img" :src="scope.row.remark_pic"
              :preview-src-list="[scope.row.remark_pic]">
            </el-image>
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
import { getOwnerPerformance } from "@/utils/api";
import listMixin from "@/mixins/listMixin";
import Head from "../../components/Head/index.vue";
import { formatDate } from "../../utils/index";
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
        res.data.list.forEach((item) => {
          item.create_time = formatDate(
            item.create_time * 1000,
            "yyyy-MM-dd hh:mm"
          );
        });
        this.tableData = res.data.list;
        this.total = res.data.rows;
        this.templateParams[0].data = res.data.select.map((v) => {
          return {
            key: v.real_name,
            value: v.id,
          };
        });
      });
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


