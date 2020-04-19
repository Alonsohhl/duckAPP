<template>
  <div class="">
    <div class="row">
      <router-link
        tag="a"
        class="btn btn-danger waves-effect waves-light mb-2"
        :to="{ name: 'dataFedInsert' }"
        data-animation="fadein"
        data-plugin="custommodal"
        data-overlaycolor="#38414a"
        >Add data entry</router-link
      >
    </div>

    <div class="row">
      <div class="col-xl-6">
        <div class="card-box">
          <h4 class="header-title mb-3">Last 5 food entries</h4>

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
// import {
//   widgetData,
//   revenueRadialChart,
//   salesMixedChart,
//   userBalanceData,
//   revenueData,
// } from '../router/views/data'
import {
  // widgetData,
  revenueRadialChart,
  salesMixedChart,
  // userBalanceData,
  // revenueData,
} from './data'

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
          //   type: 'line',
          //   data: [1, 2, 3, 4, 5, 6, 7, 8, 3, 1],
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
        // labels: [
        //   '01/01/2003',
        //   '02/01/2003',
        //   '03/01/2003',
        //   '04/01/2003',
        //   '05/01/2003',
        //   '06/01/2003',
        //   '07/01/2003',
        //   '08/01/2003',
        //   '09/01/2003',
        //   '10/01/2003',
        // ],
        markers: {
          size: 0,
        },
        legend: {
          show: false,
        },
        xaxis: {
          // type: 'datetime',
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
                return y.toFixed(0) + ' feds'
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

  created: function() {
    this.fillTable()

    // this.chartOptions.labels = [
    //   moment()
    //     .subtract(10, 'days')
    //     .calendar(),
    //   moment()
    //     .subtract(9, 'days')
    //     .calendar(),
    //   moment()
    //     .subtract(8, 'days')
    //     .calendar(),
    //   moment()
    //     .subtract(7, 'days')
    //     .calendar(),
    // ]
  },
  methods: {
    fillTable: function(value) {
      this.tableBusy = true
      //   let axiosQuery = `${API_URL}ventas/fetchAll`
      //   if (value & (this.table.filter.selectedOption === 'id')) axiosQuery += `?id=${value}`
      //   if (value & (this.table.filter.selectedOption === 'Num_Boleta')) axiosQuery += `?Num_Boleta=${value}`

      axios
        .get('api/feds/fetch')
        .then((response) => {
          this.tableItems = response.data
          this.tableBusy = false
          this.tableItems.forEach((key, index) => {
            console.log(index)
            if (index < 10) {
              this.chart.series[0].data.unshift(key.quantityDucks)
              this.chartOptions.xaxis.categories.unshift(
                moment(key.time).format('Do , h:mm')
                // moment().format(key.time)
              )
            }
          })

          console.log(this.chartOptions.labels)
        })

        .catch(function(error) {
          console.log(error)
        })
    },
  },
}
</script>

<style></style>
