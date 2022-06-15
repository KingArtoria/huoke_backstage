<template>
  <div class="app-wrap">
    <div class="app-card">
      <el-table :data="tableData" :header-cell-style="_headerCellStyle" border>
        <el-table-column prop="id" label="id" width="60" align="center" />
        <el-table-column prop="phone" label="账号" width="110" align="center" />
        <el-table-column prop="is_vip" label="vip" width="50" align="center" />
        <el-table-column prop="add_time" label="注册时间" width="140" align="center" />
        <el-table-column prop="source" label="来源" width="60" align="center" />
        <el-table-column prop="support_level" label="等级" width="50" align="center" />
        <el-table-column prop="keyWord" label="关键词" show-overflow-tooltip />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="uid" label="支持" width="60" />
        <el-table-column prop="IMEI" label="设备信息" show-overflow-tooltip />
        <el-table-column prop="pixel_point" label="像素点" width="110" />
      </el-table>
      <footer class="app-pagination-wrap">
        <el-pagination background layout="total,prev, pager, next, jumper" :total="total" :page-size="10"
          @current-change="handleCurrentChange" />
      </footer>
    </div>
  </div>
</template>

<script>
import { getAllMember } from '../../utils/api'
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        page: 1
      },
    }
  },
  methods: {
    getAllMember() {
      getAllMember(this.params).then(res => {
        this.tableData = res.data.list
        this.total = res.data.rows
      })
    },
    handleCurrentChange(page) {
      this.params.page = page
      this.getAllMember()
    },
  },
  mounted() {
    this.getAllMember()
  },
}
</script>

<style lang="scss" scoped>
@import './user_list.scss';
</style>