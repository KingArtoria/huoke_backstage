<template>
  <div class="app-wrap">
    <div class="app-card">

      <Head :searchParams="templateParams" @searchList="doSearch" />
      <el-table v-loading="tableLoading" :data="tableData" :header-cell-style="_headerCellStyle" border
        element-loading-spinner="el-icon-loading" element-loading-text="加载中，请稍候……">
        <el-table-column label="姓名" prop="aid" align="center"></el-table-column>
        <el-table-column label="单数" prop="num" align="center"></el-table-column>
        <el-table-column label="业绩总额" prop="price" align="right"></el-table-column>
      </el-table>
    </div>
    <div class="app-card">
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<script>
import { getAllPerformance } from "@/utils/api";
import listMixin from "@/mixins/listMixin";
import Head from "../../components/Head/index.vue";
import { REPORT_DATE_TYPE } from "../../utils/const";
import * as echarts from "echarts";
import _ from "lodash";
export default {
  mixins: [listMixin],
  components: { Head },
  data() {
    return {
      templateParams: [
        {
          key: "date",
          value: "",
          label: "统计类型",
          placeholder: "请选择",
          type: "select",
          data: REPORT_DATE_TYPE,
        },
      ],
      option: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["业绩", "单数"],
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: [],
        },
        yAxis: [
          {
            type: "value",
            name: "单数",
            axisLine: {
              show: true,
            },
            splitLine: {
              show: false,
            },
          },
          {
            type: "value",
            name: "业绩",
            axisLine: {
              show: true,
            },
            splitLine: {
              show: true,
            },
          },
        ],
        series: [
          {
            name: "业绩",
            type: "line",
            smooth: false,
            showSymbol: true,
            data: [],
            symbolSize: 0,
            itemStyle: {
              normal: {
                color: "#fa92a5",
                borderColor: "#fa92a5",
                lineStyle: {
                  color: "#fa92a5",
                },
                label: {
                  show: true,
                },
              },
            },
            yAxisIndex: 1,
          },
          {
            name: "单数",
            type: "bar",
            barWidth: 20,
            showSymbol: true,
            data: [],
            symbolSize: 3,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#29acff",
                  },
                  {
                    offset: 1,
                    color: "#4bdfff",
                  },
                ]),
                barBorderRadius: [4, 4, 0, 0],
                label: {
                  show: true,
                  position: "top",
                },
              },
            },
            yAxisIndex: 0,
          },
        ],
      },
      chart: null,
      chartResize: null,
    };
  },
  methods: {
    fetchData() {
      getAllPerformance(this.searchParams).then((res) => {
        this.option.xAxis.data.length = 0;
        this.option.series[0].data.length = 0;
        this.option.series[1].data.length = 0;
        let maxPrice = 0;
        let maxNum = 0
        res.data.forEach((item) => {
          if (maxPrice < item.price) {
            maxPrice = item.price;
          }
          if (maxNum < item.num) {
            maxNum = item.num;
          }
          this.option.xAxis.data.push(item.aid);
          this.option.series[0].data.push(item.price);
          this.option.series[1].data.push(item.num);
        });
        this.option.yAxis[1].max = maxPrice + 20000;
        this.option.yAxis[0].max = maxNum + 200;
        this.tableData = res.data;
        this.chart.setOption(this.option);
      });
    },
    doSearch(params) {
      this.searchParams = params;
      this.search();
    },
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.chartResize = _.debounce(() => {
      this.chart.resize();
    }, 300);
    // 监听窗口改动调整图表尺寸
    window.addEventListener("resize", this.chartResize);
    this.fetchData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.chartResize);
  },
};
</script>

<style lang="scss" scoped>
.chart {
  height: 400px;
}
</style>


