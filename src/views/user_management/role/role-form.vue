<template>
  <el-dialog
    title="添加角色"
    :visible.sync="dialog.show"
    width="800px"
    :close-on-click-modal="false"
    :before-close="close"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="formData.name"
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
export default {
  name: "groupForm",
  mixins: [formMixin],
  data() {
    return {
      formData: {
        name: "", // 角色名称
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    open() {
      this.dialog.show = true;
      this.dialog.loading = false;
    },
    saveOrUpdate() {
      // savePublish(this.formData).then(() => {
      //   this.$message.success("添加成功");
      //   this.$emit("update-data");
      //   this.close();
      // });
    },
  },
};
</script>

<style lang="scss">
</style>
