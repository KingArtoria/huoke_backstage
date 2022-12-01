<template>
  <div class="app-wrap">
    <div class="content_1">
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">注册人数</div>
          <div class="content_1_1_1_2">本日</div>
        </div>
        <div class="content_1_1_2">{{ statisticsData.today_sign }}</div>
        <div class="content_1_1_3">昨日：{{ statisticsData.yesterday_sign }}&nbsp;&nbsp;&nbsp;{{ statisticsData.z_c_z_b }}%</div>
      </div>
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">下载活跃人数</div>
          <div class="content_1_1_1_2">本日</div>
        </div>
        <div class="content_1_1_2">{{ statisticsData.today_sign_active }}</div>
        <div class="content_1_1_3">昨日：{{ statisticsData.yesterday_sign_active }}&nbsp;&nbsp;&nbsp;{{ statisticsData.x_z_z_b }}%</div>
      </div>
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">注册人数</div>
          <div class="content_1_1_1_2">本月</div>
        </div>
        <div class="content_1_1_2">{{ statisticsData.month_sign }}</div>
        <div class="content_1_1_3">上月：{{ statisticsData.last_month_sign }}&nbsp;&nbsp;&nbsp;{{ statisticsData.y_z_c_z_b }}%</div>
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
        <div class="content_1_1_3">昨日：{{ statisticsData.yesterday_active }}&nbsp;&nbsp;&nbsp;{{ statisticsData.h_y_z_b }}%</div>
      </div>
      <div class="content_1_1">
        <div class="content_1_1_1">
          <div class="content_1_1_1_1">活跃人数</div>
          <div class="content_1_1_1_2">本月</div>
        </div>
        <div class="content_1_1_2">{{ statisticsData.month_active }}</div>
        <div class="content_1_1_3">上月：{{ statisticsData.last_month_active }}&nbsp;&nbsp;&nbsp;{{ statisticsData.y_h_y_z_b }}%</div>
      </div>
    </div>
    <div class="app-card">
      <div id="main" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import _ from 'lodash';
import { getIndexData } from '@/utils/api';
export default {
  data() {
    return {
      chartDom: '',
      myChart: '',
      option: {
        tooltip: {
          trigger: 'axis',
        },
        colors: ['#2080F7', '#fa92a5'],
        legend: {
          data: ['本日注册', '本日会员'],
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
          },
        },
        series: [
          {
            name: '本日注册',
            type: 'line',
            smooth: false,
            showSymbol: false,
            data: [],
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: '#2080F7',
                borderColor: '#2080F7',
                borderWidth: 1,
                lineStyle: {
                  color: '#2080F7',
                },
                label: {
                  show: false,
                },
              },
            },
          },
          {
            name: '本日会员',
            type: 'line',
            smooth: false,
            showSymbol: false,
            data: [],
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: '#fa92a5',
                borderColor: '#fa92a5',
                borderWidth: 1,
                lineStyle: {
                  color: '#fa92a5',
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
      this.chartDom = document.getElementById('main');
      this.myChart = echarts.init(this.chartDom);
      this.chartResize = _.debounce(() => {
        this.myChart.resize();
      }, 300);
      // 监听窗口改动调整图表尺寸
      window.addEventListener('resize', this.chartResize);
    },
    // 获取统计数据
    getStatisticsData() {
      getIndexData().then(res => {
        const { table_data, chart_data } = res.data;
        table_data.z_c_z_b = ((table_data.today_sign - table_data.yesterday_sign) / table_data.yesterday_sign) * 100;
        table_data.x_z_z_b = ((table_data.today_sign_active - table_data.yesterday_sign_active) / table_data.yesterday_sign_active) * 100;
        table_data.y_z_c_z_b = ((table_data.month_sign - table_data.last_month_sign) / table_data.last_month_sign) * 100;
        table_data.h_y_z_b = ((table_data.today_active - table_data.yesterday_active) / table_data.yesterday_active) * 100;
        table_data.y_h_y_z_b = ((table_data.month_active - table_data.last_month_active) / table_data.last_month_active) * 100;
        // 删除小数
        table_data.z_c_z_b = table_data.z_c_z_b.toFixed(0);
        table_data.x_z_z_b = table_data.x_z_z_b.toFixed(0);
        table_data.y_z_c_z_b = table_data.y_z_c_z_b.toFixed(0);
        table_data.h_y_z_b = table_data.h_y_z_b.toFixed(0);
        table_data.y_h_y_z_b = table_data.y_h_y_z_b.toFixed(0);
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
    window.removeEventListener('resize', this.chartResize);
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
