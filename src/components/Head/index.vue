<template>
  <div>
    <header class="app-header header">
      <el-form inline>
        <el-form-item :label="item.label" v-for="(item, index) in searchParams" :key="index">
          <el-input v-model="item.value" clearable :placeholder="item.placeholder" @input="searchList" v-if="item.type === 'input'" />
          <el-select v-model="item.value" clearable :placeholder="item.placeholder" @change="searchList" v-if="item.type === 'select'">
            <el-option v-for="(item2, index2) in item.data" :key="index2" :value="item2.value" :label="item2.key" />
          </el-select>
        </el-form-item>
      </el-form>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    searchParams: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    // 查询列表
    searchList() {
      let params = {};
      this.searchParams.forEach(item => {
        params[item.key] = item.value;
      });
      this.$emit('searchList', params);
    },
  },
};
</script>

<style></style>
