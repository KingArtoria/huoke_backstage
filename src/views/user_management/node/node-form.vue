<template>
  <el-dialog
    title="添加节点"
    :visible.sync="dialog.show"
    width="800px"
    :close-on-click-modal="false"
    :before-close="close"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="节点名称" prop="node_name">
        <el-input
          v-model="formData.node_name"
          placeholder="请输入节点名称"
          maxlength="150"
        />
      </el-form-item>
      <el-form-item label="路由名称">
        <el-input
          v-model="formData.control_name"
          placeholder="一级路由用#号代替"
          maxlength="150"
        />
      </el-form-item>
      <el-form-item label="权限名称">
        <el-input
          v-model="formData.action_name"
          placeholder="一级权限用#号代替"
          maxlength="150"
        />
      </el-form-item>
      <el-form-item label="节点类型" prop="node_name">
        <el-radio-group v-model="formData.is_menu">
          <el-radio :label="2">菜单</el-radio>
          <el-radio :label="1">权限</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button type="default" @click="close">取消</el-button>
      <el-button type="primary" :loading="dialog.loading" @click="submit">
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import formMixin from "@/mixins/formMixin";
import { saveNode, updateNode } from "@/utils/api";
export default {
  node_name: "groupForm",
  mixins: [formMixin],
  data() {
    return {
      formData: {
        id: null,
        p_id: null,
        node_name: "", // 节点名称
        control_name: "", // 路由名称
        action_name: "", // 权限名称
        is_menu: 2, // 是否是菜单（2=菜单，1=权限）
      },
      rules: {
        node_name: [
          { required: true, message: "请输入节点名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    /**
     * row 行数据
     * p_id 父级id
     */
    open(row, p_id = 0) {
      this.dialog.show = true;
      this.dialog.loading = false;
      this.formData.p_id = p_id;
      if (row) {
        this.formData = JSON.parse(JSON.stringify(row));
      }
    },
    saveOrUpdate() {
      const promise = this.formData.id
        ? updateNode(this.formData)
        : saveNode(this.formData);
      promise.then(() => {
        this.$message.success("操作成功");
        this.$emit("update-data");
        this.close();
      });
    },
  },
};
</script>

<style lang="scss">
</style>
