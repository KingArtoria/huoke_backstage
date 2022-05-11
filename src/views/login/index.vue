<template>
  <div>
    <div class="content">
      <div class="content_1">
        <div class="content_1_1">
          <div class="content_1_1_1">账号：</div>
          <el-input placeholder="请输入账号" v-model="loginParams.user_name" class="content_1_1_2" />
        </div>
        <div class="content_1_1">
          <div class="content_1_1_1">密码：</div>
          <el-input placeholder="请输入密码" v-model="loginParams.password" type="password" class="content_1_1_2" />
        </div>
        <div class="content_1_2">
          <el-button type="success" class="content_1_2_1" @click="dologin">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { dologin } from '../../utils/api.js';
export default {
  data() {
    return {
      // 登录参数
      loginParams: {
        user_name: '',
        password: '',
      },
    };
  },
  methods: {
    dologin() {
      dologin(this.loginParams).then(res => {
        if (res.code != 1) {
          this.$message.error(res.msg);
          return;
        }
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('tree', JSON.stringify(res.data.tree));
        Vue.prototype._tree = res.data.tree;
        this.$router.push('/');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
