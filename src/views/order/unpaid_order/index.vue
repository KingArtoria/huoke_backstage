<template>
  <div class="app-wrap">
    <div class="app-card">
      <!-- <header class="app-header app-flex-end">
        <el-button type="primary">创建订单</el-button>
      </header> -->
      <el-table border :header-cell-style="_headerCellStyle" :data="tableData">
        <el-table-column prop="create_time" label="购买时间" width="140" align="center" />
        <el-table-column prop="title" label="购买种类" />
        <el-table-column prop="price" label="购买金额" width="100" align="right" />
        <el-table-column prop="aid" label="支持" width="120" />
        <el-table-column prop="sn" label="订单编号" />
        <el-table-column label="操作" align="center" width="90">
          <template slot-scope="s">
            <el-button type="text" @click="wxPay(s.row)" v-if="s.row.aid && s.row.aid != 'admin'">刷新二维码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <footer class="app-pagination-wrap">
        <el-pagination :page-sizes="pageSizes" background layout="prev, pager, next, jumper" :total="total" :page-size="searchParams.num" :current-page="searchParams.page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </footer>
    </div>
    <el-dialog title="扫码支付" :visible.sync="isQRCodeShow">
      <div style="text-align: center">
        <img src="http://huoke_backend.channel.bdhuoke.com/img/logo.png" style="margin-bottom: 20px" />
        <div style="font-size: 18px; margin-bottom: 20px; color: red">价格：{{ qrCodeInfo.price }}</div>
        <div style="font-size: 18px; margin-bottom: 20px; color: red">商品：火客-{{ qrCodeInfo.title }}</div>
        <div id="qrcode" ref="qrcode" style="display: inline-block" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import { formatDate } from '../../../utils';
import { getUnPayOrder, wxPay } from '../../../utils/api';
import listMixin from '@/mixins/listMixin';
export default {
  mixins: [listMixin],
  data() {
    return {
      isQRCodeShow: false,
      qrCodeInfo: {},
    };
  },
  methods: {
    fetchData() {
      getUnPayOrder(this.searchParams).then(res => {
        res.data.list.forEach(item => {
          item.create_time = formatDate(item.create_time * 1000, 'yyyy-MM-dd hh:mm');
        });
        this.tableData = res.data.list;
        this.total = res.data.rows;
      });
    },
    // 微信支付
    wxPay(item) {
      wxPay({ order_sn: item.sn }).then(res => {
        this.isQRCodeShow = true;
        this.qrCodeInfo.price = item.price;
        this.qrCodeInfo.title = item.title;
        this.$nextTick(() => {
          document.getElementById('qrcode').innerHTML = '';
          new QRCode('qrcode', { width: 200, height: 200, text: res.data.code_url });
        });
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
