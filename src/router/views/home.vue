<script>
// import countTo from 'vue-count-to'

import appConfig from '@src/app.config'
import Layout from '@layouts/main'
// import axios from 'axios'

/**
 * Dashboard-1 Component
 */
export default {
  page: {
    title: 'Dashboard',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
  data() {
    return {
      state: {
        date: new Date(),
      },
    }
  },
}
</script>

<template>
  <Layout>
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right"> </div>
          <h4 class="page-title">Ducks APP</h4>
        </div>
      </div>
    </div>
    <router-view />
  </Layout>
</template>
