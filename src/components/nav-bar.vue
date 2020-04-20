<script>
import { authComputed } from '@state/helpers'
import store from '@state/store'

export default {
  props: {
    user: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {}
  },
  computed: {
    ...authComputed,
  },
  methods: {
    navlogOut() {
      store.dispatch('auth/logOut')
      this.$router.push({ name: 'login' })
    },
    toggleMenu() {
      this.$parent.toggleMenu()
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar()
    },
  },
}
</script>

<template>
  <!-- Topbar Start -->
  <div class="navbar-custom">
    <ul class="list-unstyled topnav-menu float-right mb-0">
      <b-nav-item-dropdown
        right
        class="notification-list"
        menu-class="profile-dropdown"
      >
        <template slot="button-content">
          <div class="nav-user mr-0">
            <span class="mr-auto pr-2">
              <strong>{{ user ? user.user : 'user' }}</strong>
            </span>

            <img
              src="@assets/images/users/user-1.jpg"
              alt="user-image"
              class="rounded-circle"
            />
            <span class="pro-user-name ml-1">
              {{ user ? user.name : 'xxx' }}
              <i class="mdi mdi-chevron-down"></i>
            </span>
          </div>
        </template>

        <b-dropdown-divider></b-dropdown-divider>
        <!-- <b-dropdown-item href="/logout" v-on:click="counter += 1"> -->
        <b-dropdown-item @click="navlogOut">
          <i class="fe-log-out mr-1"></i>
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </ul>

    <!-- LOGO -->

    <ul class="list-unstyled topnav-menu topnav-menu-left m-0 ml-5">
      <b-nav-item-dropdown class="d-none d-lg-block">
        <template slot="button-content">
          Create
          <i class="mdi mdi-chevron-down"></i>
        </template>
        <b-dropdown-item href="#">
          <i class="fe-briefcase mr-1"></i>
          <span>New Entry</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </ul>
  </div>
  <!-- end Topbar -->
</template>

<style lang="scss">
.noti-scroll {
  height: 220px;
}
.ps > .ps__scrollbar-y-rail {
  width: 8px !important;
  background-color: transparent !important;
}
.ps > .ps__scrollbar-y-rail > .ps__scrollbar-y,
.ps.ps--in-scrolling.ps--y > .ps__scrollbar-y-rail > .ps__scrollbar-y,
.ps > .ps__scrollbar-y-rail:active > .ps__scrollbar-y,
.ps > .ps__scrollbar-y-rail:hover > .ps__scrollbar-y {
  width: 6px !important;
}
.button-menu-mobile {
  outline: none !important;
}
</style>
