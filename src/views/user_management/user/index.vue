<template>
  <div>
    <div class="content app-page">
      <div class="content_2">
        <el-button type="primary">添加管理员</el-button>
      </div>
      <el-table border :header-cell-style="_headerCellStyle" :data="userList">
        <el-table-column prop="id" label="管理员ID" width="80" align="center" />
        <el-table-column prop="user_name" label="管理员名称" />
        <el-table-column prop="login_times" label="登录次数" />
        <el-table-column prop="last_login_ip" label="上次登录IP" width="130" />
        <el-table-column prop="last_login_time" label="上次登录时间" width="160" align="center" />
        <el-table-column prop="real_name" label="真实姓名" />
        <el-table-column label="状态" width="70" align="center">
          <template slot-scope="s">
            <el-tag type="success" v-if="s.row.status === '正常'">{{ s.row.status }}</el-tag>
            <el-tag type="success" v-if="s.row.danger === '禁用'">{{ s.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="s">
            <el-button type="text" @click="userdel(s.row)">删除管理员</el-button>
            <el-button type="text" @click="beforeEdit(s.row)">修改管理员</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="content_1">
        <el-pagination background layout="prev, pager, next,jumper" :total="userListTotal" @current-change="changePage" />
      </div>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" label-position="left" width="10rem">
      <el-form :model="userItem" label-width="1.25rem">
        <el-form-item label="真实姓名">
          <el-input v-model="userItem.real_name" />
        </el-form-item>
        <el-form-item label="登录账号">
          <el-input v-model="userItem.user_name" />
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="userItem.password" type="password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="useredit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '../../../utils';
import { getUserList, userdel, useredit } from '../../../utils/api';
export default {
  data() {
    return {
      // 管理员列表参数
      userListParams: { page: 1, num: 10 },
      // 管理员列表
      userList: [],
      // 管理员列表总数
      userListTotal: 0,
      // 管理员信息
      userItem: {},
      // 管理员对话框
      dialogFormVisible: false,
    };
  },
  methods: {
    // 更改页码
    changePage(page) {
      this.userListParams.page = page;
      this.getUserList();
    },
    // 管理员列表
    getUserList() {
      getUserList(this.userListParams).then(res => {
        res.data.list.forEach(item => {
          item.last_login_time = formatDate(item.last_login_time * 1000, 'yyyy-MM-dd hh:mm:ss');
        });
        this.userList = res.data.list;
        this.userListTotal = res.data.rows;
        console.log(res);
      });
    },
    // 删除管理员
    userdel(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        userdel({ id: item.id }).then(res => {
          if (res.code != 1) return this.$message.error(res.msg);
          this.$message.success('删除成功');
          this.getUserList();
        });
      });
    },
    // 修改管理员前置
    beforeEdit(row) {
      this.userItem = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
    },
    // 修改管理员
    useredit() {
      useredit(this.userItem).then(res => {
        if (res.code != 1) return this.$message.error(res.msg);
        this.$message.success('修改成功');
        this.dialogFormVisible = false;
        this.getUserList();
      });
    },
  },
  mounted() {
    // 管理员列表
    this.getUserList();
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
