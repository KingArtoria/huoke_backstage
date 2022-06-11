<template>
  <div>
    <div class="content app-page">
      <header class="app-header header">
        <el-button type="primary" @click="dialogFormVisible = true">创建订单</el-button>
      </header>
      <el-table border :header-cell-style="_headerCellStyle" :data="payOrderList">
        <el-table-column prop="create_time" label="购买时间" width="140" align="center" />
        <el-table-column prop="phone" label="联系方式" width="100" align="center" />
        <el-table-column prop="source" label="用户来源" />
        <el-table-column prop="title" label="购买种类" />
        <el-table-column prop="price" label="购买金额" width="80" align="right" />
        <el-table-column prop="aid" label="支持" width="60" align="center" />
        <el-table-column prop="sn" label="订单编号" />
        <el-table-column label="标记">
          <template slot-scope="scope">
            <el-image v-if="scope.row.remark_pic" class="img" :src="scope.row.remark_pic"
              :preview-src-list="[scope.row.remark_pic]">
            </el-image>
            <!-- <img :src="s.row.remark_pic" v-if="s.row.remark_pic" /> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="50" align="center">
          <template slot-scope="s">
            <el-button type="text" @click="markOrder(s.row)">标记</el-button>
          </template>
        </el-table-column>
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
        <el-form-item label="商品类型">
          <el-select v-model="form.goods_id" placeholder="请选择">
            <el-option v-for="(item, index) in goodsList" :key="index" :label="item.title" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-radio v-model="form.pay_type" label="wxpay">微信</el-radio>
          <el-radio v-model="form.pay_type" label="alipay">支付宝</el-radio>
          <el-radio v-model="form.pay_type" label="yhk">银行卡</el-radio>
          <el-radio v-model="form.pay_type" label="dgzh">对公打款</el-radio>
          <el-radio v-model="form.pay_type" label="bd">补单</el-radio>
        </el-form-item>
        <el-form-item label="赠送时长">
          <el-input v-model="form.give_time" type="number" placeholder="天(只填数字!只填数字!只填数字!)" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createOrder">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="扫码支付" :visible.sync="isQRCodeShow">
      <div style="text-align: center">
        <img src="http://huoke_backend.channel.bdhuoke.com/img/logo.png" style="margin-bottom: 20px" />
        <div style="font-size: 18px; margin-bottom: 20px; color: red">价格：{{ qrCodeInfo.price }}</div>
        <div style="font-size: 18px; margin-bottom: 20px; color: red">商品：火客-{{ qrCodeInfo.title }}</div>
        <div id="qrcode" ref="qrcode" style="display: inline-block" />
      </div>
    </el-dialog>
    <el-dialog title="标记订单" :visible.sync="orderMarkShow">
      <el-form :model="form" label-width="1rem" label-position="left" width="10rem">
        <el-form-item label="上传图片">
          <el-upload class="upload-demo" action="http://nad.bdhuoke.com/admin/support/uploadImg" :multiple="false" :limit="1" :headers="{ token }" :on-success="uploadSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderMarkShow = false">取 消</el-button>
        <el-button type="primary" @click="orderMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import { formatDate } from '../../../utils';
import { getPayOrder, getGoodList, saveOrder, wxPay, order_mark } from '../../../utils/api';
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
      form: { give: 0, give_time: '', pay_type: 'wxpay' },
      // 创建订单弹窗
      dialogFormVisible: false,
      // 商品列表
      goodsList: [],
      // 展示二维码
      isQRCodeShow: false,
      // 二维码信息
      qrCodeInfo: {},
      orderMarkShow: false,
      token: '',
      // 标记订单参数
      markForm: {},
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
        if (res.code == 1) {
          // 根据id获取商品列表item
          let item = this.goodsList.find(item => item.id == this.form.goods_id);
          this.qrCodeInfo = { price: this.form.price, title: item.title };
          this.wxPay(res.data.sn);
        } else if (res.code == 2) {
          this.$message.success('操作成功');
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.msg)
        }
      });
    },
    // 微信支付
    wxPay(order_sn) {
      wxPay({ order_sn }).then(res => {
        this.isQRCodeShow = true;
        this.dialogFormVisible = false;
        this.$nextTick(() => {
          document.getElementById('qrcode').innerHTML = '';
          new QRCode('qrcode', { width: 200, height: 200, text: res.data.code_url });
        });
      });
    },
    // 标记订单前置
    markOrder(item) {
      this.markForm = { oid: item.id, version: item.version };
      this.orderMarkShow = true;
    },
    // 标记订单
    orderMark() {
      order_mark(this.markForm).then(res => {
        if (res.code == 1) {
          this.$message.success('操作成功');
          this.orderMarkShow = false;
          this.getPayOrder();
        }
      });
    },
    // 图片上传成功回调
    uploadSuccess(res) {
      this.markForm.remark_pic = `http://nad.bdhuoke.com/${res.data}`;
    },
  },
  mounted() {
    this.token = localStorage.getItem('token');
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
