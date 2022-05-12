<template>
  <div>
    <div class="content app-page">
      <el-table border :header-cell-style="_headerCellStyle" :data="userList">
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
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../../utils';
import { getAllMember } from '../../../utils/api';
export default {
  data() {
    return {
      // 查询所有用户参数
      params: { page: 1, num: 10 },
      // 所有用户列表
      userList: [],
      // 所有用户总数
      total: 0,
    };
  },
  methods: {
    // 查询所有用户
    getAllMember() {
      getAllMember(this.params).then(res => {
        res.data.list.forEach(item => {
          item.is_tel = item.is_tel == 1 ? '是' : '否';
          // 把item.phone中间4位替换成*
          item.phone = item.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
          item.vip_endtime = item.vip_endtime == 0 ? '未开通' : formatDate(item.vip_endtime, 'YYYY-MM-DD');
        });
        this.userList = res.data.list;
        this.total = res.data.rows;
      });
    },
  },
  mounted() {
    // 查询所有用户
    this.getAllMember();
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
