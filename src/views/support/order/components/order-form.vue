<template>
  <el-dialog id="remark-form" title="设置备注" :visible.sync="dialog.show" width="600px" :close-on-click-modal="false"
    :before-close="close">
    <el-form ref="form" :model="formData" label-position="top">
      <el-form-item label="备注">
        <el-input v-model="formData.remark" placeholder="请输入备注" maxlength="150" />
      </el-form-item>
      <el-form-item label="用户评级">
        <el-select v-model="formData.support_level" clearable style="width: 100%;">
          <el-option v-for="item in supportLevelOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名片——文字">
        <el-input v-model="formData.card_str" placeholder="请输入名片——文字" maxlength="150" />
      </el-form-item>
      <el-form-item label="名片——图片">
        <el-upload class="avatar-uploader" :action="baseUrl" :show-file-list="false" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload" :headers="headers">
          <img v-if="formData.card_pic" :src="formData.card_pic" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button type="default" @click="close">取消</el-button>
      <el-button type="primary" :loading="dialog.loading" @click="submit">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import formMixin from "@/mixins/formMixin";
import { setRemark } from "@/utils/api";
export default {
  role_name: "RemarkForm",
  mixins: [formMixin],
  data() {
    return {
      formData: {
        remark: "", // 备注
        card_str: "", // 名片-文字
        card_pic: "", // 名片-图片
        support_level: "", // 用户评级
        member_id: "", // 用户id
      },
      baseUrl: "http://nad.bdhuoke.com/admin/support/uploadImg",
      supportLevelOptions: [
        { label: "B", value: "B" },
        { label: "C", value: "C" },
        { label: "A", value: "A" },
        { label: "S1", value: "S1" },
        { label: "S2", value: "S2" },
      ],
    };
  },
  computed: {
    headers() {
      return {
        'token': localStorage.getItem('token')
      }
    }
  },
  methods: {
    open(row) {
      this.dialog.show = true;
      this.dialog.loading = false;
      this.formData = {
        remark: row.remark, // 备注
        card_str: row.card_str, // 名片-文字
        card_pic: row.card_pic, // 名片-图片
        support_level: row.support_level, // 用户评级
        member_id: row.id, // 用户id
      };
    },
    saveOrUpdate() {
      setRemark(this.formData).then(() => {
        this.$message.success("操作成功");
        this.$emit("update-data");
        this.close();
      });
    },
    handleAvatarSuccess(res) {
      this.formData.card_pic = "http://nad.bdhuoke.com/" + res.data;
    },
    beforeAvatarUpload(file) {
      const isJPGOrPNG =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJPGOrPNG) {
        this.$message.info("上传图片只能是 JPG 或 PNG 格式!");
      }
      return isJPGOrPNG;
    },
  },
};
</script>

<style lang="scss" scope>
#remark-form {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
