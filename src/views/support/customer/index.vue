<template>
  <div class="app-page">
    <Search :searchParams="searchParams" @search="search" />
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      :header-cell-style="_headerCellStyle"
      border
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中，请稍候……"
    >
      <el-table-column label="ID" prop="id" width="80" align="center"></el-table-column>
      <el-table-column label="账号" prop="account"></el-table-column>
      <el-table-column label="昵称" prop="nick_name"></el-table-column>
      <el-table-column label="真实姓名" prop="real_name" width="80" align="center"></el-table-column>
      <el-table-column label="公司" prop="company"></el-table-column>
      <el-table-column label="头像" prop="head" width="80" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.head" alt="" class="img">
        </template>
      </el-table-column>
      <el-table-column label="手机" prop="phone" width="120" align="center"></el-table-column>
      <el-table-column label="vip" prop="is_vip" width="80" align="center"></el-table-column>
      <el-table-column label="注册时间" prop="add_time" width="150" align="center"></el-table-column>
      <el-table-column label="用户来源" prop="source"></el-table-column>
      <el-table-column label="支持" prop="role_name"></el-table-column>
      <el-table-column label="数据来源" prop="role_name"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="text" @click="$refs.form.open(scope.row)">
            编辑
          </el-button>
          <el-button type="text" @click="del({ id: scope.row.id })">
            删除
          </el-button>
          <el-button type="text">赠送道具卡</el-button>
          <el-button type="text">查看记录</el-button>
          <el-button type="text">拉取</el-button>
        </template>
      </el-table-column>
    </el-table>
    <footer class="app-pagination-wrap">
      <el-pagination
        :page-sizes="pageSizes"
        background
        layout="prev, pager, next, jumper"
        :total="total"
        :page-size="searchParams.num"
        :current-page="searchParams.page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </footer>
  </div>
</template>

<script>
import Search from './components/search.vue'
import {
  getAllMember,
  getPubMember,
  getGroMember,
  getPerMember,
  releaseMember,
  supMember,
} from "@/utils/api";
import listMixin from "@/mixins/listMixin";
export default {
  mixins: [listMixin],
  components: {Search},
  data() {
    return {
      // 页面类型
      type: "",
      // 页面类型与对应的获取数据方法
      fetchMethod: {
        PubMember: getPubMember,
        GroMember: getGroMember,
        PerMember: getPerMember,
      },
      searchParams: {
        phone: '', // 手机号
        source: '', // 来源
        support_level: '', // 用户评级
        vip_end: '', // 会员到期时间
      },
      // 用户参数选项
      supportLevelOptions: [
        { label: 'B', value: 'B'},
        { label: 'C', value: 'C'},
        { label: 'A', value: 'A'},
        { label: 'S1', value: 'S1'},
        { label: 'S2', value: 'S2'},
      ],
      // 会员到期时间选项
      vipEndOptions: [
        { label: '1天', value: '86400'},
        { label: '3天', value: '259200'},
        { label: '7天', value: '604800'},
      ]
    };
  },
  watch: {
    $route() {
      /* 
      PubMember 公海池
      GroMember 组长池
      PerMember 个人池
      */
      this.type = this.$route.name;
      this.fetchData();
    },
  },
  methods: {
    fetchData() {
      const method = this.fetchMethod[this.type];
      console.log(this.searchParams);
      method(this.searchParams).then((res) => {
        res.data.list.forEach(v => {
          v.head = 'https://asd.bdhuoke.com/' + v.head
        })
        this.tableData = res.data.list;
        this.total = res.data.rows;
      });
    },
  },
  mounted() {
    this.type = this.$route.name;
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
