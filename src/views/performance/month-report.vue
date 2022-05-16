<template>
  <div class="app-wrap">
    <div class="app-card">

      <Head :searchParams="templateParams" @searchList="doSearch" />
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<script>
import { getMonthReport } from "@/utils/api";
import listMixin from "@/mixins/listMixin";
import Head from "../../components/Head/index.vue";
import * as echarts from "echarts";
import _ from "lodash";
import { formatDate } from "../../utils/index";
export default {
  mixins: [listMixin],
  components: { Head },
  data() {
    return {
      templateParams: [
        {
          key: "uid",
          value: "",
          label: "姓名",
          placeholder: "请选择",
          type: "select",
          data: [], // 用户下拉框
        },
        {
          key: "date",
          value: "",
          label: "月份",
          placeholder: "请选择",
          type: "month",
          clearable: false,
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
          boundaryGap: false,
          data: [],
        },
        yAxis: [
          {
            type: "value",
            name: "单数",
            axisLine: {
              show: true,
            },
            max: 100,
          },
          {
            type: "value",
            name: "业绩",
            axisLine: {
              show: true,
            },
            max: 10000,
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
                barBorderRadius: 0,
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
      getMonthReport(this.searchParams).then((res) => {
        this.option.xAxis.data.length = 0;
        this.option.series[0].data.length = 0;
        this.option.series[1].data.length = 0;
        res.data.list.forEach((item) => {
          this.option.xAxis.data.push(item.date);
          this.option.series[0].data.push(item.price);
          this.option.series[1].data.push(item.num);
        });
        this.tableData = res.data.list;
        this.templateParams[0].data = res.data.select.map((v) => {
          return {
            key: v.real_name,
            value: v.id,
          };
        });
        this.chart.setOption(this.option);
      });
      this.chart = echarts.init(this.$refs.chart);
      this.chartResize = _.debounce(() => {
        this.chart.resize();
      }, 300);
      // 监听窗口改动调整图表尺寸
      window.addEventListener("resize", this.chartResize);
    },
    doSearch(params) {
      this.searchParams = Object.assign(this.searchParams, params);
      this.search();
    },
  },
  mounted() {
    this.templateParams[1].value = formatDate(new Date(), "yyyy-MM");
    this.fetchData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.chartResize);
  },
};
</script>

<style lang="scss" scoped>
.chart {
  height: 500px;
}
</style>


