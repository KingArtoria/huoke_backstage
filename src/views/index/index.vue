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
        colors: ['#2080F7', '#fa92a5'],
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
      this.option.series[0].data = this.test(days);
      this.option.series[1].data = this.test(days);
      this.chartDom = document.getElementById("main");
      this.myChart = echarts.init(this.chartDom);
      this.option && this.myChart.setOption(this.option);
      this.chartResize = _.debounce(() => {
        this.myChart.resize();
      }, 300);
      // 监听窗口改动调整图表尺寸
      window.addEventListener("resize", this.chartResize);
    },
    test(len) {
      const arr = [];
      for (let i = 0; i < len; i++) {
        arr.push(this.getRandom(5, 50));
      }
      return arr;
    },
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
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
