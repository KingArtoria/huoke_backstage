<template>
  <!-- 公海池 -->
  <div class="app-wrap">
    <div class="app-card">
      <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
      element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
      <el-table-column label="购买时间" prop=""></el-table-column>
      <el-table-column label="版本" prop=""></el-table-column>
      <el-table-column label="序号" prop=""></el-table-column>
      <el-table-column label="手机号" prop=""></el-table-column>
      <el-table-column label="购买类型" prop=""></el-table-column>
      <el-table-column label="购买状态" prop=""></el-table-column>
      <el-table-column label="推广人" prop=""></el-table-column>
      <el-table-column label="来源" prop=""></el-table-column>
      <el-table-column label="头像" prop="head" width="80" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.head" alt="" class="img" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
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
import { getPayOrder } from "@/utils/api";
import listMixin from "@/mixins/listMixin";
import OrderForm from './components/order-form.vue'
export default {
  mixins: [listMixin],
  components: { OrderForm },
  data() {
    return {
      searchParams: {},
    };
  },
  methods: {
    fetchData() {
      getPayOrder(this.searchParams).then((res) => {
        // res.data.list.forEach((v) => {
        //   v.head = "https://asd.bdhuoke.com/" + v.head;
        // });
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
.img {
  width: 40px;
  height: 40px;
}
</style>
