<template>
  <div class="app-page">
    <header v-if="addPermission" class="app-header">
      <el-button type="primary" @click="$refs.form.open()">添加节点</el-button>
    </header>
    <el-tree :data="tableData" :props="{ children: 'son', label: 'node_name' }" default-expand-all>
      <div slot-scope="{ node, data }" class="tree-node">
        <span class="label">{{ node.label }}</span>
        <el-button v-if="editPermission" class="btn" type="text" @click="$refs.form.open(data)">
          编辑
        </el-button>
        <el-button v-if="delPermission" class="btn" type="text" @click="del({ id: data.id })">
          删除
        </el-button>
        <el-button v-if="addPermission" class="btn" type="text" @click="$refs.form.open(null, data.id)">
          添加节点
        </el-button>
      </div>
    </el-tree>
    <RoleForm ref="form" @update-data="fetchData"></RoleForm>
  </div>
</template>

<script>
import listMixin from "@/mixins/listMixin";
import RoleForm from "./node-form.vue";
import { getNodeList, delNode } from "../../../utils/api";
import { getPermission } from "../../../utils/index";
export default {
  mixins: [listMixin],
  components: { RoleForm },
  data() {
    return {
      mixinParams: {
        del: delNode,
      },
    };
  },
  computed: {
    // 【添加节点】权限
    addPermission() {
      return getPermission("用户管理", "节点管理", "添加节点");
    },
    // 【编辑节点】权限
    editPermission() {
      return getPermission("用户管理", "节点管理", "编辑节点");
    },
    // 【删除节点】权限
    delPermission() {
      return getPermission("用户管理", "节点管理", "删除节点");
    },
  },
  methods: {
    // 获取发布内容列表
    fetchData() {
      getNodeList(this.searchParams).then((res) => {
        this.hideLoading();
        res.data.forEach((v) => {
          v.is_menu_text = v.is_menu === 2 ? "菜单" : "权限";
        });
        this.tableData = res.data;
      });
      this.showLoading();
    },
  },
  mounted() {
    // 获取发布内容列表
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.tree-node {
  color: #606266;
  font-size: 14px;
  display: flex;
  align-items: center;
  &:hover {
    .btn {
      display: block;
    }
  }
  .label {
    margin-right: 20px;
  }
  .btn {
    display: none;
  }
}

.app-header {
  text-align: left;
}
</style>
