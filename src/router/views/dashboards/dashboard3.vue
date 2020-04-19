<script>
import countTo from 'vue-count-to'

import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import Chat from '@components/chat'
import Todo from '@components/todo'
import Inbox from '@components/inbox'

import { widgetData } from './dashboard-3'
import LineChart from '../charts/LineChart'
import BarChart from '../charts/BarChart'

/**
 * Dashboard-3 component
 */
export default {
  page: {
    title: 'Dashboard-3',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    countTo,
    Layout,
    PageHeader,
    Chat,
    Todo,
    Inbox,
    LineChart,
    BarChart,
  },
  data() {
    return {
      widgetData: widgetData,
      title: 'Dashboard 3',
      items: [
        {
          text: 'UBold',
          href: '/',
        },
        {
          text: 'Dashboard 3',
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
          <i
            v-b-tooltip.hover.bottom
            class="fa fa-info-circle text-muted float-right"
            title="More Info"
            placement="bottom"
          ></i>
          <h4 class="mt-0 font-16">{{widget.title}}</h4>
          <h2 class="text-primary my-3 text-center">
            <span>
              <countTo :end-val="widget.value" :duration="3000"></countTo>
            </span>
          </h2>
          <p class="text-muted mb-0">
            {{widget.text}}
            <span class="float-right">
              <i class="fa fa-caret-up text-success mr-1"></i>
              {{widget.revenue}}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <div class="float-right d-none d-md-inline-block">
              <div class="btn-group mb-2">
                <button type="button" class="btn btn-xs btn-secondary">Today</button>
                <button type="button" class="btn btn-xs btn-light">Weekly</button>
                <button type="button" class="btn btn-xs btn-light">Monthly</button>
              </div>
            </div>
            <h4 class="header-title">Revenue</h4>
            <div class="row mt-4 text-center">
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
                  <i class="fe-arrow-down text-danger mr-1"></i>$15k
                </h4>
              </div>
            </div>
            <LineChart :height="350" />
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <div class="float-right d-none d-md-inline-block">
              <div class="btn-group mb-2">
                <button type="button" class="btn btn-xs btn-secondary">Today</button>
                <button type="button" class="btn btn-xs btn-light">Weekly</button>
                <button type="button" class="btn btn-xs btn-light">Monthly</button>
              </div>
            </div>
            <h4 class="header-title">Projections Vs Actuals</h4>
            <div class="row mt-4 text-center">
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Target</p>
                <h4>
                  <i class="fe-arrow-down text-danger mr-1"></i>$3.8k
                </h4>
              </div>
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Last week</p>
                <h4>
                  <i class="fe-arrow-up text-success mr-1"></i>$1.1k
                </h4>
              </div>
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Last Month</p>
                <h4>
                  <i class="fe-arrow-down text-danger mr-1"></i>$25k
                </h4>
              </div>
            </div>
            <BarChart :height="350" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- INBOX -->
      <div class="col-xl-4">
        <Inbox />
      </div>

      <!-- CHAT -->
      <div class="col-xl-4">
        <Chat />
      </div>
      <!-- END CHAT-->

      <!-- TODO -->
      <div class="col-xl-4">
        <Todo />
      </div>
      <!-- END TODO -->
    </div>
  </Layout>
</template>