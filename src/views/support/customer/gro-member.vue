<template>
  <!-- 组长池 -->
  <div class="app-page">
    <Search :searchParams="searchParams" @search="search" />
    <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
      element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
      <el-table-column label="ID" prop="id" width="80" align="center"></el-table-column>
      <el-table-column label="账号" prop="account"></el-table-column>
      <el-table-column label="昵称" prop="nick_name"></el-table-column>
      <el-table-column label="真实姓名" prop="real_name" width="80" align="center"></el-table-column>
      <el-table-column label="公司" prop="company"></el-table-column>
      <el-table-column label="头像" prop="head" width="80" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.head" alt="" class="img" />
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
          <el-button type="text" @click="$refs.form.open(scope.row)">编辑</el-button>
          <el-button type="text" @click="del({ id: scope.row.id })">删除</el-button>
          <el-button type="text">赠送道具卡</el-button>
          <el-button type="text">查看记录</el-button>
          <el-button type="text">拉取</el-button>
        </template>
      </el-table-column>
    </el-table>
    <footer class="app-pagination-wrap">
      <el-pagination :page-sizes="pageSizes" background layout="prev, pager, next, jumper" :total="total"
        :page-size="searchParams.num" :current-page="searchParams.page" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </footer>
  </div>
</template>

<script>
import Search from "./components/search.vue";
import { getGroMember } from "@/utils/api";
import listMixin from "@/mixins/listMixin";
export default {
  mixins: [listMixin],
  components: { Search },
  data() {
    return {
      searchParams: {
        phone: "", // 手机号
        source: "", // 来源
        support_level: "", // 用户评级
        vip_end: "", // 会员到期时间
      },
    };
  },
  methods: {
    fetchData() {
      getGroMember(this.searchParams).then((res) => {
        res.data.list.forEach((v) => {
          v.head = "https://asd.bdhuoke.com/" + v.head;
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
