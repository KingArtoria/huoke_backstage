<template>
  <div>
    <div class="content app-page">

      <Head @searchList="getComprehensiveList" :searchParams="searchParams" />
      <el-table border :header-cell-style="_headerCellStyle" :data="data">
        <el-table-column label="标题" prop="title" show-overflow-tooltip />
        <el-table-column label="介绍" prop="info" show-overflow-tooltip />
        <el-table-column label="操作" width="90" align="center">
          <template slot-scope="s">
            <el-button type="text" @click="ComprehensiveDel(s.row.id)">删除</el-button>
            <el-button type="text" @click="ComprehensiveEdit(s.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="content_1">
        <el-pagination background layout="prev, pager, next,jumper" :total="total" @current-change="changePage"
          :current-page="params.page" />
      </div>
    </div>
    <el-dialog title="修改项目" :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="项目名称">
          <el-input autocomplete="off" v-model="dialogParams.title" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input autocomplete="off" v-model="dialogParams.contact" />
        </el-form-item>
        <el-form-item label="微信">
          <el-input autocomplete="off" v-model="dialogParams.wx" />
        </el-form-item>
        <el-form-item label="QQ">
          <el-input autocomplete="off" v-model="dialogParams.qq" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="ComprehensiveEditSure">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Head from '../../components/Head/index.vue'
import { ComprehensiveDel, ComprehensiveEdit, getComprehensiveList } from '../../utils/api'
export default {
  data() {
    return {
      total: 0,
      params: { page: 1, limit: 10 },
      data: [],
      searchParams: [
        { value: "", placeholder: "项目标题", type: "input", label: "项目标题", key: "title" }
      ],
      // 修改项目对话框
      dialogVisible: false,
      // 修改项目参数
      dialogParams: {}
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
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ComprehensiveDel({ id }).then(res => {
          if (res.code != 1) return this.$message.error(res.msg)
          this.$message.success('删除成功')
          this.getComprehensiveList(this.params)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 修改项目前置
    ComprehensiveEdit(item) {
      // 赋值参数id 标题 联系电话 微信 qq
      this.dialogParams = { id: item.id, title: item.title, contact: item.contact, wx: item.wx, qq: item.qq }
      // 打开对话框
      this.dialogVisible = true
    },
    // 确定修改
    ComprehensiveEditSure() {
      // 关闭对话框
      this.dialogVisible = false
      // 修改接口API
      ComprehensiveEdit(this.dialogParams).then(res => {
        // 抛出异常
        if (res.code != 1) return this.$message.error(res.msg)
        // 成功提示
        this.$message.success('修改成功')
        // 刷新列表
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