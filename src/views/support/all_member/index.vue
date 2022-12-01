<template>
  <div>
    <div class="content app-page">
      <Head :searchParams="headParams" @searchList="getAllMember" :functionParams="functionParams" @functionClick="functionClick" />
      <el-table border :header-cell-style="_headerCellStyle" :data="userList" v-loading="tableLoading">
        <el-table-column prop="id" label="用户ID" width="80" align="center" />
        <el-table-column prop="phone" label="联系方式" width="120" align="center" />
        <el-table-column prop="add_time" label="注册时间" width="140" align="center" />
        <el-table-column prop="is_tel" label="是否电联" width="80" align="center" />
        <el-table-column prop="uid" label="支持" width="70" align="center" />
        <el-table-column prop="keyWord" label="关键词" />
        <el-table-column prop="source" label="来源" />
        <el-table-column prop="support_level" label="用户等级" width="80" align="center" />
        <el-table-column prop="vip_endtime" label="会员到期时间" width="110" align="center" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
      <div class="content_1">
        <el-pagination background layout="total,prev, pager, next,jumper" :total="total" @current-change="changePage" />
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../../../components/Head/index.vue';
import { DATE_CONST, USER_RATE_CONST } from '../../../utils/const';
import { formatDate } from '../../../utils';
import { getAllMember } from '../../../utils/api';
import excel from '../../../vendor/Export2Excel';
export default {
  data() {
    return {
      // 查询所有用户参数
      params: { page: 1, num: 10 },
      // 所有用户列表
      userList: [],
      // 所有用户总数
      total: 0,
      // head参数
      headParams: [],
      functionParams: [{ text: '导出', callback: 'batchPull' }],
      tableLoading: false,
    };
  },
  methods: {
    // 查询所有用户
    getAllMember(params) {
      // 对象合并
      this.tableLoading = true;
      Object.assign(this.params, params);
      getAllMember(this.params).then(res => {
        res.data.list.forEach(item => {
          item.is_tel = item.is_tel == 1 ? '是' : '否';
          item.vip_endtime = item.vip_endtime == 0 ? '未开通' : formatDate(item.vip_endtime * 1000, 'yyyy-MM-dd');
        });
        this.userList = res.data.list;
        this.total = res.data.rows;
        this.tableLoading = false;
      });
    },
    // 更改页码
    changePage(page) {
      this.params.page = page;
      this.getAllMember();
    },
    // 初始化参数
    initParams() {
      this.headParams = [
        { key: 'phone', value: '', label: '手机号码', placeholder: '请输入手机号', type: 'input' },
        { key: 'source', value: '', label: '来源', placeholder: '请输入来源', type: 'input' },
        { key: 'uid', value: '', label: '支持', placeholder: '请输入支持', type: 'input' },
        { key: 'support_level', value: '', label: '用户等级', placeholder: '请选择用户等级', type: 'select', data: USER_RATE_CONST },
        { key: 'vip_end', value: '', label: '到期时间', placeholder: '请选择到期时间', type: 'select', data: DATE_CONST },
        { key: 'add_time', value: '', label: '注册时间', placeholder: '请选择到期时间', type: 'select', data: DATE_CONST },
      ];
    },
    batchPull() {
      this.params.num = this.total;
      getAllMember(this.params).then(res => {
        excel.exportArrayToExcel({
          title: ['用户名', '真实姓名', '手机号', '来源', '注册时间', '最后登录IP', '最后登录时间', '备注', '关键词'],
          key: ['real_name', 'nick_name', 'phone', 'source', 'add_time', 'last_login_ip', 'last_login_time', 'remark', 'keyWord'],
          data: res.data.list,
          autoWidth: true,
          filename: '用户',
        });
      });
    },
    // 按钮点击回调
    functionClick(params) {
      this[params]();
    },
  },
  mounted() {
    // 初始化参数
    this.initParams();
    // 查询所有用户
    this.getAllMember();
  },
  components: { Head },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
