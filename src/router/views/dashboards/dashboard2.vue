<script>
import countTo from 'vue-count-to'

import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'

import Portlet from '@src/components/portlet'
import {
  widgetData,
  lifetimeSalesAreaChart,
  incomeAmountsLineChart,
  totalUsersPieChart,
  productData,
} from './dashboard-2'

/**
 * Dashboard-2 component
 */
export default {
  page: {
    title: 'Dashboard-2',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { countTo, Layout, PageHeader, Portlet },
  data() {
    return {
      widgetData: widgetData,
      lifetimeSalesAreaChart: lifetimeSalesAreaChart,
      incomeAmountsLineChart: incomeAmountsLineChart,
      totalUsersPieChart: totalUsersPieChart,
      productData: productData,
      title: 'Dashboard 2',
      headerTitle1: 'Lifetime Sales',
      headerTitle2: 'Income Amounts',
      headerTitle3: 'Total Users',
      tableTitle: 'Top Selling Products',
      items: [
        {
          text: 'UBold',
          href: '/',
        },
        {
          text: 'Dashboard 2',
          active: true,
        },
      ],
    }
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div v-for="widget in widgetData" :key="widget.value" class="col-md-6 col-xl-3">
        <div class="card-box">
          <div class="row">
            <div class="col-6">
              <div :class="`avatar-sm bg-${widget.color} rounded`">
                <i :class="`${widget.icon} avatar-title font-22 text-white`"></i>
              </div>
            </div>
            <div class="col-6">
              <div class="text-right">
                <h3 class="text-dark my-1">
                  <span>
                    <countTo :end-val="widget.value" :duration="3000"></countTo>
                  </span>
                </h3>
                <p class="text-muted mb-1 text-truncate">{{widget.text}}</p>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <h6 class="text-uppercase">
              Target
              <span class="float-right">{{ widget.progressValue }}%</span>
            </h6>
            <b-progress
              :value="widget.progressValue"
              :variant="`progressbar bg-${widget.color}`"
              height="5px"
            ></b-progress>
          </div>
        </div>
        <!-- end card-box-->
      </div>
      <!-- end col -->
    </div>

    <div class="row">
      <div class="col-xl-4">
        <Portlet :headertitle="headerTitle1">
          <div class="card-body mt-0">
            <!-- Lifetime Sales area chart-->
            <apexchart
              height="260"
              type="area"
              :series="lifetimeSalesAreaChart.series"
              :options="lifetimeSalesAreaChart.chartOptions"
            ></apexchart>
            <!-- end Lifetime Sales chart-->

            <div class="row">
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Target</p>
                <h4>
                  <i class="fe-arrow-down text-danger mr-1"></i>$7.8k
                </h4>
              </div>
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Last week</p>
                <h4>
                  <i class="fe-arrow-up text-success mr-1"></i>$1.4k
                </h4>
              </div>
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Last Month</p>
                <h4>
                  <i class="fe-arrow-down text-danger mr-1"></i>$9.8k
                </h4>
              </div>
            </div>
          </div>
          <!-- end row -->
        </Portlet>
      </div>

      <div class="col-xl-4">
        <Portlet :headertitle="headerTitle2">
          <div class="card-body pt-0">
            <!-- Income Amounts area chart-->
            <apexchart
              height="285"
              type="bar"
              :series="incomeAmountsLineChart.series"
              :options="incomeAmountsLineChart.chartOptions"
            ></apexchart>
            <!-- end Income Amounts chart-->

            <div class="row">
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Target</p>
                <h4>
                  <i class="fe-arrow-up text-success mr-1"></i>641
                </h4>
              </div>
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Last week</p>
                <h4>
                  <i class="fe-arrow-down text-danger mr-1"></i>234
                </h4>
              </div>
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Last Month</p>
                <h4>
                  <i class="fe-arrow-up text-success mr-1"></i>3201
                </h4>
              </div>
            </div>
            <!-- end row -->
          </div>
        </Portlet>
      </div>

      <div class="col-xl-4">
        <Portlet :headertitle="headerTitle3">
          <div class="card-body pt-0">
            <!-- Total users pie chart-->
            <apexchart
              height="265"
              type="pie"
              :series="totalUsersPieChart.series"
              :options="totalUsersPieChart.chartOptions"
            ></apexchart>
            <!-- end Total users pie chart-->

            <div class="row mt-4">
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Target</p>
                <h4>
                  <i class="fe-arrow-down text-danger mr-1"></i>18k
                </h4>
              </div>
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Last week</p>
                <h4>
                  <i class="fe-arrow-up text-success mr-1"></i>3.25k
                </h4>
              </div>
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Last Month</p>
                <h4>
                  <i class="fe-arrow-up text-success mr-1"></i>28k
                </h4>
              </div>
            </div>
            <!-- end row -->
          </div>
        </Portlet>
      </div>
    </div>

    <div class="row">
      <!-- Table -->
      <div class="col-xl-12">
        <Portlet :headertitle="tableTitle">
          <div class="card-body pt-0">
            <div class="table-responsive mb-0">
              <table class="table table-hover table-centered mb-0">
                <thead>
                  <tr>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Sales</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="sellingData in productData" :key="sellingData.price">
                    <td>{{ sellingData.productid }}</td>
                    <td>{{ sellingData.name }}</td>
                    <td>{{ sellingData.price }}</td>
                    <td>{{ sellingData.quantity }}</td>
                    <td>{{ sellingData.amount }}</td>
                    <td>{{ sellingData.date }}</td>
                    <td>{{ sellingData.sales }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Portlet>
      </div>
    </div>
  </Layout>
</template>