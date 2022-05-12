<template>
  <!-- 个人池 -->
  <div class="app-page">
    <Search :searchParams="searchParams" @search="search" />
    <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
      <el-table-column label="ID" prop="id" width="60" align="center"></el-table-column>
      <el-table-column label="昵称" prop="nick_name"></el-table-column>
      <el-table-column label="手机" prop="phone" width="110" align="center"></el-table-column>
      <el-table-column label="来源" prop="source"></el-table-column>
      <el-table-column label="注册时间" prop="add_time" align="center" width="140"></el-table-column>
      <el-table-column label="操作" width="240" align="center">
        <template slot-scope="scope">
          <el-button type="text">用户详情</el-button>
          <el-button type="text">设置备注</el-button>
          <el-button type="text">赠送道具卡</el-button>
          <el-button type="text">释放</el-button>
        </template>
      </el-table-column>
    </el-table>
    <footer class="app-pagination-wrap">
      <el-pagination :page-sizes="pageSizes" background layout="prev, pager, next, jumper" :total="total" :page-size="searchParams.num" :current-page="searchParams.page" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </footer>
  </div>
</template>

<script>
import Search from './components/search.vue';
import { getPerMember } from '@/utils/api';
import listMixin from '@/mixins/listMixin';
export default {
  mixins: [listMixin],
  components: { Search },
  data() {
    return {
      searchParams: {
        phone: '', // 手机号
        source: '', // 来源
        support_level: '', // 用户评级
        vip_end: '', // 会员到期时间
      },
    };
  },
  methods: {
    fetchData() {
      getPerMember(this.searchParams).then(res => {
        res.data.list.forEach(v => {
          v.head = 'https://asd.bdhuoke.com/' + v.head;
          // 替换v.phone中间4位为*
          v.phone = v.phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
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
.img {
  width: 40px;
  height: 40px;
}
</style>
