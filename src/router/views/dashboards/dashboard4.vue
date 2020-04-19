<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import Portlet from '@src/components/portlet'

import {
  incomeAmountAreaChart,
  statisticsBarChart,
  lifetimeDonutChart,
  widgetData,
  projectData,
} from './dashboard-4'

/**
 * Dashboard-4 component
 */
export default {
  page: {
    title: 'Dashboard-4',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, PageHeader, Portlet },
  data() {
    return {
      lifetimeDonutChart: lifetimeDonutChart,
      incomeAmountAreaChart: incomeAmountAreaChart,
      statisticsBarChart: statisticsBarChart,
      widgetData: widgetData,
      projectData: projectData,
      title: 'Dashboard 4',
      headerTitle1: 'Lifetime Sales',
      headerTitle2: 'Statistics',
      headerTitle3: 'Income Amounts',
      tableTitle: 'Projects',
      items: [
        {
          text: 'UBold',
          href: '/',
        },
        {
          text: 'Dashboard 4',
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
      <div class="col-xl-4">
        <!-- Portlet card -->
        <Portlet :headertitle="headerTitle1">
          <div class="card-body pt-0">
            <div class="text-center">
              <div class="row">
                <div class="col-4">
                  <h3>3,487</h3>
                  <p class="text-muted font-13 mb-0 text-truncate">Total Sales</p>
                </div>
                <div class="col-4">
                  <h3>814</h3>
                  <p class="text-muted font-13 mb-0 text-truncate">Open Campaign</p>
                </div>
                <div class="col-4">
                  <h3>5,324</h3>
                  <p class="text-muted font-13 mb-0 text-truncate">Daily Sales</p>
                </div>
              </div>
              <!-- end row -->
              <div class="mt-3">
                <apexchart
                  type="donut"
                  height="260"
                  :options="lifetimeDonutChart.chartOptions"
                  :series="lifetimeDonutChart.series"
                ></apexchart>
              </div>
            </div>
          </div>
        </Portlet>
      </div>
      <!-- end card-body-->
      <div class="col-xl-4">
        <Portlet :headertitle="headerTitle2">
          <div class="card-body pt-0 pb-0">
            <div class="text-center">
              <div class="row">
                <div class="col-6">
                  <h3 data-plugin="counterup">1,284</h3>
                  <p class="text-muted font-13 mb-0 text-truncate">Total Sales</p>
                </div>
                <div class="col-6">
                  <h3 data-plugin="counterup">7,841</h3>
                  <p class="text-muted font-13 mb-0 text-truncate">Open Campaign</p>
                </div>
              </div>
            </div>
            <apexchart
              type="bar"
              height="260"
              :options="statisticsBarChart.chartOptions"
              :series="statisticsBarChart.series"
            ></apexchart>
          </div>
        </Portlet>
      </div>
      <div class="col-xl-4">
        <Portlet :headertitle="headerTitle3">
          <div class="card-body pt-0 pb-0">
            <div class="text-center">
              <div class="row">
                <div class="col-4">
                  <h3>2,845</h3>
                  <p class="text-muted font-13 mb-0 text-truncate">Total Sales</p>
                </div>
                <div class="col-4">
                  <h3>6,487</h3>
                  <p class="text-muted font-13 mb-0 text-truncate">Open Campaign</p>
                </div>
                <div class="col-4">
                  <h3>201</h3>
                  <p class="text-muted font-13 mb-0 text-truncate">Daily Sales</p>
                </div>
              </div>
            </div>
            <!-- end row -->
            <div>
              <apexchart
                height="260"
                type="area"
                :series="incomeAmountAreaChart.series"
                :options="incomeAmountAreaChart.chartOptions"
              ></apexchart>
            </div>
          </div>
        </Portlet>
      </div>
    </div>
    <div class="row">
      <div v-for="widget in widgetData" :key="widget.id" class="col-md-6 col-xl-3">
        <div
          class="widget-rounded-circle card-box"
          :class="{ 'bg-blue': (`${widget.designation}` === 'Premium User') }"
        >
          <div class="row align-items-center">
            <div class="col-auto">
              <div class="avatar-lg">
                <img :src="`${widget.image}`" class="img-fluid rounded-circle" alt="user-img" />
              </div>
            </div>
            <div class="col">
              <h5
                class="mb-1 mt-2 font-16"
                :class="{ 'text-white': (`${widget.designation}` === 'Premium User') }"
              >{{ widget.name }}</h5>
              <p
                class="mb-2 text-muted"
                :class="{ 'text-white-50': (`${widget.designation}` === 'Premium User') }"
              >{{ widget.designation }}</p>
            </div>
          </div>
          <!-- end row-->
        </div>
        <!-- end widget-rounded-circle-->
      </div>
      <!-- end col-->
    </div>
    <div class="row">
      <div class="col-12">
        <Portlet :headertitle="tableTitle">
          <div class="card-body pt-0">
            <div class="table-responsive mb-0">
              <table class="table table-centered table-borderless">
                <thead class="thead-light">
                  <tr>
                    <th>Project Name</th>
                    <th>Start Date</th>
                    <th>Due Date</th>
                    <th>Team</th>
                    <th>Status</th>
                    <th>Clients</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="table in projectData" :key="table.name">
                    <td>{{ table.name }}</td>
                    <td>{{ table.startdate }}</td>
                    <td>{{ table.duedate }}</td>
                    <td>
                      <div class="avatar-group">
                        <a href="javascript: void(0);" class="avatar-group-item">
                          <img
                            :src=" `${table.team[0]}`"
                            class="rounded-circle avatar-xs"
                            alt="friend"
                          />
                        </a>

                        <a href="javascript: void(0);" class="avatar-group-item">
                          <img
                            :src=" `${table.team[1]}`"
                            class="rounded-circle avatar-xs"
                            alt="friend"
                          />
                        </a>

                        <a href="javascript: void(0);" class="avatar-group-item">
                          <img
                            :src=" `${table.team[2]}`"
                            class="rounded-circle avatar-xs"
                            alt="friend"
                          />
                        </a>

                        <a
                          v-if="table.team[3]"
                          href="javascript: void(0);"
                          class="avatar-group-item"
                        >
                          <img
                            :src=" `${table.team[3]}`"
                            class="rounded-circle avatar-xs"
                            alt="friend"
                          />
                        </a>
                      </div>
                    </td>
                    <td>
                      <span
                        class="badge p-1"
                        :class="{ 'bg-soft-warning text-warning': `${table.status}` === 'Pending',
                              'bg-soft-success text-success': `${table.status}` === 'Completed',
                              'bg-soft-info text-info': `${table.status}` === 'Work in Progress',
                              'bg-soft-dark text-dark': `${table.status}` === 'Coming Soon' }"
                      >{{ table.status }}</span>
                    </td>
                    <td>{{ table.client }}</td>
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

