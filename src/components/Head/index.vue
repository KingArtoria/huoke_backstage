<template>
  <div>
    <header class="app-header header">
      <el-form inline>
        <el-form-item :label="item.label" v-for="(item, index) in searchParams" :key="index">
          <el-input v-model="item.value" clearable :placeholder="item.placeholder" @input="debounceInput"
            v-if="item.type === 'input'" />
          <el-select v-model="item.value" clearable :placeholder="item.placeholder" @change="searchList"
            v-if="item.type === 'select'">
            <el-option v-for="(item2, index2) in item.data" :key="index2" :value="item2.value" :label="item2.key" />
          </el-select>
          <el-date-picker v-model="item.value" :clearable="item.clearable === undefined ? true : item.clearable"
            :placeholder="item.placeholder" type="month" value-format="yyyy-MM" @change="searchList"
            v-if="item.type === 'month'">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </header>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    searchParams: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      // 输入防抖
      debounceInput: _.debounce(() => {
        this.searchList();
      }, 300),
    };
  },
  methods: {
    // 查询列表
    searchList() {
      let params = {};
      this.searchParams.forEach((item) => {
        params[item.key] = item.value;
      });
      this.$emit("searchList", params);
    },
  },
};
</script>

<style></style>
