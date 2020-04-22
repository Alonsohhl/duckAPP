<template>
  <div class="">
    <div class="row">
      <router-link
        tag="a"
        class="btn btn-danger waves-effect waves-light mb-2 d-print-none"
        :to="{ name: 'dataFedInsert' }"
        data-animation="fadein"
        data-plugin="custommodal"
        data-overlaycolor="#38414a"
        >Add data entry</router-link
      >
      <div class="ml-1 text-right d-print-none">
        <a
          href="javascript:window.print()"
          class="btn btn-primary waves-effect waves-light"
          ><i class="mdi mdi-printer mr-1"></i> Print</a
        >
      </div>
    </div>

    <div class="row">
      <div class="col-xl-6">
        <div class="card-box">
          <h4 class="header-title mb-3">Entries</h4>

          <div class="table-responsive mb-0">
            <b-table
              striped
              hover
              :items="tableItems"
              class="table table-borderless table-hover table-centered m-0"
              :fields="tableFields"
              :busy="tableBusy"
              :perPage="5"
            >
              <template v-slot:cell(time)="data">
                {{ data.item.time | toMomentJs }}
              </template>
            </b-table>
          </div>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="card-box">
          <h4 class="header-title mb-3">Data Analytics</h4>
          <!-- sales analytics chart -->
          <div style="height: 375px;">
            <apexchart
              height="370"
              type="line"
              :options="chartOptions"
              :series="chart.series"
            ></apexchart>
          </div>
          <!-- end chart -->
        </div>
        <!-- end card-box -->
      </div>
      <!-- end col-->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import {
  // widgetData,
  revenueRadialChart,
  salesMixedChart,
  // userBalanceData,
  // revenueData,
} from './data'

import _ from 'lodash'

export default {
  data() {
    return {
      // widgetData: widgetData,
      salesMixedChart: salesMixedChart,
      revenueRadialChart: revenueRadialChart,
      // userBalanceData: userBalanceData,
      // revenueData: revenueData,
      state: {
        date: new Date(),
      },
      tableItems: [],
      tableBusy: false,
      tableFields: [
        { key: 'user.name', label: 'User' },
        { key: 'time', label: 'Date' },
        { key: 'quantityDucks', label: 'Qty. Ducks' },
        { key: 'food.name', label: 'Food' },
        { key: 'quantityFood', label: 'Qty. Food' },
        { key: 'actions', label: '' },
      ],
      chart: {
        series: [
          {
            name: 'Ducks Feed',
            type: 'column',
            data: [],
          },
          // {
          //   name: 'Email Marketing',
          //   type: 'area',
          //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 100],
          // },
          // {
          //   name: 'Marketplaces',
          //   type: 'area',
          //   data: [1, 2, 3, 4, 5, 6],
          // },
        ],
      },

      chartOptions: {
        chart: {
          padding: {
            right: 0,
            left: 0,
          },
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: [0, 2, 4],
          curve: 'straight',
        },
        colors: ['#1abc9c', '#e3eaef', '#4a81d4'],

        plotOptions: {
          bar: {
            columnWidth: '50%',
          },
        },
        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
          },
        },
        labels: [],
        markers: {
          size: 0,
        },
        legend: {
          show: false,
        },
        xaxis: {
          // type: 'text',
          categories: [],
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          title: {
            text: '',
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter(y) {
              if (typeof y !== 'undefined') {
                return y.toFixed(0) + ' entries'
              }
              return y
            },
          },
        },
        grid: {
          borderColor: '#f1f3fa',
        },
      },
    }
  },

  beforeCreate: function() {
    // this.fillTable()
  },
  created: function() {
    this.fillTable()
  },
  mounted: function() {
    // this.fillTable()
  },
  methods: {
    fillTable: function(value) {
      this.tableBusy = true

      return axios
        .get('api/feds/fetch')
        .then((response) => {
          this.tableItems = response.data
          this.tableBusy = false

          this.chartData = _.chain(response.data)
            .groupBy((datum) => moment(datum.time).format('MMM DD YYYY'))
            .map((objs, key) => ({
              day: key,
              dailyFood: _.sumBy(objs, 'quantityFood'),
              ducksFeed: _.sumBy(objs, 'quantityDucks'),
            }))
            .sortBy('day')
            .value()
        })
        .then(() => {
          this.chartOptions = {
            xaxis: {
              categories: _.chain(this.chartData)
                .map('day')
                .value(),
            },
          }
          // this.chart.series[0].data = _.chain(this.chartData)
          //   .map('ducksFeed')
          //   .value()

          this.chart = {
            series: [
              {
                name: 'Ducks Feed',
                type: 'column',
                data: _.chain(this.chartData)
                  .map('ducksFeed')
                  .value(),
              },
              // {
              //   name: 'Extra',
              //   type: 'area',
              //   data: [44, 55, 41, 67, 22, 43],
              // },
              {
                name: 'Food',
                type: 'area',
                data: _.chain(this.chartData)
                  .map('dailyFood')
                  .value(),
              },
            ],
          }
        })

        .catch(function(error) {
          console.log(error)
        })
    },
  },
}
</script>

<style></style>
