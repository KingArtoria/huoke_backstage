<template>
  <div class="app-wrap">
    <div class="app-card">
      <el-button type="primary" class="back" @click="$router.back()">返回</el-button>
      <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
        element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column label="时间" prop="time"></el-table-column>
        <el-table-column label="操作" prop="remark"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getLogList } from "@/utils/api";
import listMixin from "@/mixins/listMixin";
export default {
  mixins: [listMixin],
  data() {
    return {};
  },
  methods: {
    fetchData() {
      getLogList({ id: this.$route.query.id }).then((res) => {
        this.tableData = res.data;
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.app-card {
  margin-top: 0;
}
.back {
  margin-bottom: 16px;
}
</style>
