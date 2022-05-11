<template>
  <el-dialog
    title="添加角色"
    :visible.sync="dialog.show"
    width="800px"
    :close-on-click-modal="false"
    :before-close="close"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="角色名称" prop="role_name">
        <el-input
          v-model="formData.role_name"
          placeholder="请输入角色名称"
          maxlength="150"
        />
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button type="default" @click="close">取消</el-button>
      <el-button type="primary" :loading="dialog.loading" @click="submit"
        >保存</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import formMixin from "@/mixins/formMixin";
import { saveRole, updateRole } from '@/utils/api'
export default {
  role_name: "groupForm",
  mixins: [formMixin],
  data() {
    return {
      formData: {
        id: null,
        role_name: "", // 角色名称
      },
      rules: {
        role_name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    open(row) {
      this.dialog.show = true;
      this.dialog.loading = false;
      if (row) {
        this.formData = row
      }
    },
    saveOrUpdate() {
      const promise = this.formData.id ? updateRole(this.formData) : saveRole(this.formData)
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
