<template>
  <div class="app-wrap">
    <div class="app-card">
      <header class="app-header app-flex-end">
        <el-button type="primary">创建订单</el-button>
      </header>
      <el-table border :header-cell-style="_headerCellStyle" :data="tableData">
        <el-table-column prop="create_time" label="购买时间" width="140" align="center" />
        <el-table-column prop="title" label="购买种类" />
        <el-table-column prop="price" label="购买金额" width="80" align="end" />
        <el-table-column prop="aid" label="支持" width="60" align="center" />
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
import { formatDate } from "../../../utils";
import { getUnPayOrder } from "../../../utils/api";
import listMixin from "@/mixins/listMixin";
export default {
  mixins: [listMixin],
  data() {
    return {};
  },
  methods: {
    fetchData() {
      getUnPayOrder(this.searchParams).then((res) => {
        res.data.list.forEach((item) => {
          item.create_time = formatDate(
            item.create_time * 1000,
            "yyyy-MM-dd hh:mm"
          );
        });
        this.tableData = res.data.list;
        this.total = res.data.rows;
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
