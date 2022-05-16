<template>
  <div>
    <div class="content app-page">
      <header class="app-header header">
        <el-button type="primary" @click="dialogFormVisible = true">创建订单</el-button>
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
      <el-form :model="form" label-width="1rem" label-position="left" width="10rem">
        <el-form-item label="账号">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" />
        </el-form-item>
        <el-form-item label="赠送时长">
          <el-input v-model="form.give_time" type="number" placeholder="天(只填数字!只填数字!只填数字!)" />
        </el-form-item>
        <el-form-item label="支付方式">
          <el-radio v-model="form.pay_type" label="wxpay">微信</el-radio>
          <el-radio v-model="form.pay_type" label="alipay">支付宝</el-radio>
        </el-form-item>
        <el-form-item label="会员类型">
          <el-select v-model="form.goods_id" placeholder="请选择">
            <el-option v-for="(item, index) in goodsList" :key="index" :label="item.title" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createOrder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '../../../utils';
import { getPayOrder, getGoodList, saveOrder } from '../../../utils/api';
export default {
  data() {
    return {
      // 已支付订单列表
      payOrderList: [],
      // 已支付订单总数
      total: 0,
      // 列表参数
      params: { page: 1, num: 10 },
      // 创建订单参数
      form: { give: 0, give_time: '' },
      // 创建订单弹窗
      dialogFormVisible: false,
      // 商品列表
      goodsList: [],
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
    // 获取商品列表
    getGoodsList() {
      getGoodList().then(res => {
        this.goodsList = res.data;
      });
    },
    // 创建订单
    createOrder() {
      this.form.give = this.form.give_time == '' ? 0 : 1;
      saveOrder(this.form).then(res => {
        console.log(res);
      });
    },
    // 微信支付
    wxPay() {

    }
  },
  mounted() {
    // 已支付订单
    this.getPayOrder();
    // 获取商品列表
    this.getGoodsList();
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
