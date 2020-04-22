<template>
  <div
    class="row"
    :class="
      submitStatus === 'SUBMITED'
        ? 'fadeOutRightBig animated'
        : 'fadeInLeft animated'
    "
  >
    <div class="col-xl-8">
      <div class="card">
        <div class="card-body">
          <h2 class="header-title mb-4">Insert Schedule</h2>

          <schedule :id="$route.params.id"></schedule>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import schedule from '@components/dataFed/schedule'

export default {
  components: { schedule },
  data() {
    return { submitStatus: '' }
  },
  created: function() {},
}
</script>

<style></style>
