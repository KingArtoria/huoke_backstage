<template>
  <div class="content">
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
    <div id="main" />
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      chartDom: '',
      myChart: '',
      option: {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['本日注册', '本日会员'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '本日注册',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '本日会员',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      },
    };
  },
  methods: {
    // 初始化参数
    initParams() {
      this.chartDom = document.getElementById('main');
      this.myChart = echarts.init(this.chartDom);
      this.option && this.myChart.setOption(this.option);
    },
  },
  mounted() {
    // 初始化参数
    this.initParams();
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
