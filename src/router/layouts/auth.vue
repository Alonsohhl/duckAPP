<script>
export default {
  components: {},
  created: () => {
    document.body.classList.add('authentication-bg')
    document.body.classList.add('authentication-bg-pattern')
  },
}
</script>

<template>
  <div>
    <div class="account-pages mt-5 mb-5">
      <div class="container">
        <slot />
      </div>
    </div>
    <footer class="footer footer-alt">
      FreshWorks Studio App Testing
      <a href class="text-muted">Alonso Huayta</a>
    </footer>
  </div>
</template>
