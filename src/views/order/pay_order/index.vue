<template>
  <div>
    <div class="content app-page">
      <header class="app-header header">
        <el-button type="primary">创建订单</el-button>
      </header>
      <el-table border :header-cell-style="_headerCellStyle" :data="payOrderList">
        <el-table-column prop="create_time" label="购买时间" width="140" align="center" />
        <el-table-column prop="title" label="购买种类" />
        <el-table-column prop="price" label="购买金额" width="80" align="end" />
        <el-table-column prop="aid" label="支持" width="60" align="center" />
      </el-table>
      <div class="content_1">
        <el-pagination background layout="prev, pager, next,jumper" :total="total" @current-change="changePage" />
      </div>
    </div>
    <el-dialog title="创建订单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '../../../utils';
import { getPayOrder } from '../../../utils/api';
export default {
  data() {
    return {
      // 已支付订单列表
      payOrderList: [],
      // 已支付订单总数
      total: 0,
      // 列表参数
      params: { page: 1, num: 10 },
    };
  },
  methods: {
    // 更改页码
    changePage(page) {
      this.params.page = page;
      this.getPayOrder();
    },
    // 已支付订单
    getPayOrder() {
      getPayOrder(this.params).then(res => {
        res.data.list.forEach(item => {
          item.create_time = formatDate(item.create_time * 1000, 'yyyy-MM-dd hh:mm');
        });
        this.payOrderList = res.data.list;
        this.total = res.data.rows;
      });
    },
  },
  mounted() {
    // 已支付订单
    this.getPayOrder();
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
