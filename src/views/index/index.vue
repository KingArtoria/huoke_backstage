<template>
  <div class="app-wrap">
    <div class="content_1">
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">注册人数</div>
          <div class="content_1_1_1_2">本日</div>
        </div>
        <div class="content_1_1_2">1000</div>
      </div>
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">注册人数</div>
          <div class="content_1_1_1_2">本日</div>
        </div>
        <div class="content_1_1_2">1000</div>
      </div>
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">注册人数</div>
          <div class="content_1_1_1_2">本日</div>
        </div>
        <div class="content_1_1_2">1000</div>
      </div>
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">注册人数</div>
          <div class="content_1_1_1_2">本日</div>
        </div>
        <div class="content_1_1_2">1000</div>
      </div>
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">注册人数</div>
          <div class="content_1_1_1_2">本日</div>
        </div>
        <div class="content_1_1_2">1000</div>
      </div>
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">注册人数</div>
          <div class="content_1_1_1_2">本日</div>
        </div>
        <div class="content_1_1_2">1000</div>
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
export default {
  data() {
    return {
      chartDom: "",
      myChart: "",
      option: {
        tooltip: {
          trigger: "axis",
        },
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
          // {
          //   name: "本日注册",
          //   type: "line",
          //   stack: "Total",
          //   data: [120, 132, 101, 134, 90, 230, 210],
          // },
          // {
          //   name: "本日会员",
          //   type: "line",
          //   stack: "Total",
          //   data: [220, 182, 191, 234, 290, 330, 310],
          // },
          {
            name: "本日注册",
            type: "line",
            smooth: true,
            showSymbol: false,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(32,128,247,.4)",
                },
                {
                  offset: 1,
                  color: "rgba(32,128,247,0)",
                },
              ]),
            },
            data: [
              30, 50, 53, 42, 66, 71, 20, 80, 20, 30, 50, 53, 42, 66, 71, 20,
              80, 20,
            ],
            // symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#2080F7",
                borderColor: "#2080F7",
                lineStyle: {
                  color: "#2080F7",
                },
              },
            },
          },
          {
            name: "本日会员",
            type: "line",
            smooth: true,
            showSymbol: false,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#ea899b",
                },
                {
                  offset: 1,
                  color: "#ffffff",
                },
              ]),
            },
            data: [
              35, 40, 57, 49, 61, 4, 2, 30, 12, 35, 40, 57, 49, 61, 4, 2, 30,
              12,
            ],
            // symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#fa92a5",
                borderColor: "#fa92a5",
                lineStyle: {
                  color: "#fa92a5",
                },
              },
            },
          },
        ],
      },
      chartResize: null,
    };
  },
  methods: {
    // 初始化参数
    initParams() {
      const month = new Date().getMonth() + 1;
      const days = new Date(new Date().getFullYear(), month, 0).getDate();
      for (let i = 1; i <= days; i++) {
        this.option.xAxis.data.push(month + "-" + i);
      }
      this.chartDom = document.getElementById("main");
      this.myChart = echarts.init(this.chartDom);
      this.option && this.myChart.setOption(this.option);
      this.chartResize = _.debounce(() => {
        this.myChart.resize();
      }, 300);
      // 监听窗口改动调整图表尺寸
      window.addEventListener("resize", this.chartResize);
    },
  },
  mounted() {
    // 初始化参数
    this.initParams();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.chartResize);
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
