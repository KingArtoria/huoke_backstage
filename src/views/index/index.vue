<template>
  <div class="app-wrap">
    <div class="content_1">
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">注册人数</div>
          <div class="content_1_1_1_2">本日</div>
        </div>
        <div class="content_1_1_2">{{ statisticsData.today_sign }}</div>
      </div>
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">注册人数</div>
          <div class="content_1_1_1_2">本月</div>
        </div>
        <div class="content_1_1_2">{{ statisticsData.month_sign }}</div>
      </div>
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">新增会员</div>
          <div class="content_1_1_1_2">本日</div>
        </div>
        <div class="content_1_1_2">{{ statisticsData.today_vip }}</div>
      </div>
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">新增会员</div>
          <div class="content_1_1_1_2">本月</div>
        </div>
        <div class="content_1_1_2">{{ statisticsData.month_vip }}</div>
      </div>
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">活跃人数</div>
          <div class="content_1_1_1_2">本日</div>
        </div>
        <div class="content_1_1_2">{{ statisticsData.today_active }}</div>
      </div>
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">活跃人数</div>
          <div class="content_1_1_1_2">本月</div>
        </div>
        <div class="content_1_1_2">{{ statisticsData.month_active }}</div>
      </div>
    </div>
    <div class="app-card">
      <div id="main" />
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import _ from "lodash";
import { getIndexData } from "@/utils/api";
export default {
  data() {
    return {
      chartDom: "",
      myChart: "",
      option: {
        tooltip: {
          trigger: "axis",
        },
        colors: ["#2080F7", "#fa92a5"],
        legend: {
          data: ["本日注册", "本日会员"],
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
        yAxis: {
          type: "value",
          axisLine: {
            show: true,
          },
        },
        series: [
          {
            name: "本日注册",
            type: "line",
            smooth: false,
            showSymbol: false,
            data: [],
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#2080F7",
                borderColor: "#2080F7",
                borderWidth: 1,
                lineStyle: {
                  color: "#2080F7",
                },
                label: {
                  show: false,
                },
              },
            },
          },
          {
            name: "本日会员",
            type: "line",
            smooth: false,
            showSymbol: false,
            data: [],
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#fa92a5",
                borderColor: "#fa92a5",
                borderWidth: 1,
                lineStyle: {
                  color: "#fa92a5",
                },
                label: {
                  show: false,
                },
              },
            },
          },
        ],
      },
      chartResize: null,
      // 统计数据
      statisticsData: {},
    };
  },
  methods: {
    // 初始化参数
    initParams() {
      this.chartDom = document.getElementById("main");
      this.myChart = echarts.init(this.chartDom);
      this.chartResize = _.debounce(() => {
        this.myChart.resize();
      }, 300);
      // 监听窗口改动调整图表尺寸
      window.addEventListener("resize", this.chartResize);
    },
    // 获取统计数据
    getStatisticsData() {
      getIndexData().then((res) => {
        const { table_data, chart_data } = res.data;
        this.statisticsData = table_data;
        chart_data.member.forEach((val, ind) => {
          this.option.xAxis.data.push(val.date);
          this.option.series[0].data.push(chart_data.member[ind].num);
          this.option.series[1].data.push(chart_data.vip[ind].num);
        });
        this.myChart.setOption(this.option);
      });
    },
  },
  mounted() {
    // 初始化参数
    this.initParams();
    // 获取统计数据
    this.getStatisticsData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.chartResize);
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
