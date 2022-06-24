<template>
  <div>
    <div class="content app-page">

      <Head @searchList="getComprehensiveList" :searchParams="searchParams" />
      <el-table border :header-cell-style="_headerCellStyle" :data="data">
        <el-table-column label="标题" prop="title" show-overflow-tooltip />
        <el-table-column label="介绍" prop="info" show-overflow-tooltip />
        <el-table-column label="操作" width="50" align="center">
          <template slot-scope="s">
            <el-button type="text" @click="ComprehensiveDel(s.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="content_1">
        <el-pagination background layout="prev, pager, next,jumper" :total="total" @current-change="changePage"
          :current-page="params.page" />
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../../components/Head/index.vue'
import { ComprehensiveDel, getComprehensiveList } from '../../utils/api'
export default {
  data() {
    return {
      total: 0,
      params: { page: 1, limit: 10 },
      data: [],
      searchParams: [
        { value: "", placeholder: "项目标题", type: "input", label: "项目标题", key: "title" }
      ]
    }
  },
  methods: {
    getComprehensiveList(params) {
      this.params = params
      getComprehensiveList(this.params).then(res => {
        res.data.list.forEach(item => {
          if (item.info == null) item.info = item.product_advantage
        });
        this.data = res.data.list
        this.total = res.data.num
      })
    },
    changePage(page) {
      this.params.page = page
      this.getComprehensiveList(this.params)
    },
    ComprehensiveDel(id) {
      ComprehensiveDel({ id }).then(res => {
        if (res.code != 1) return this.$message.error(res.msg)
        this.$message.success('删除成功')
        this.getComprehensiveList(this.params)
      })
    },
  },
  mounted() {
    this.getComprehensiveList(this.params)
  },
  components: { Head }
}
</script>

<style lang="scss" scoped>
@import './list.scss';
</style>