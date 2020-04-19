<script>
import { authComputed } from '@state/helpers'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: { VuePerfectScrollbar },
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
            <img
              src="@assets/images/users/user-1.jpg"
              alt="user-image"
              class="rounded-circle"
            />
            <span class="pro-user-name ml-1">
              {{ user ? user.name : '' }}
              <i class="mdi mdi-chevron-down"></i>
            </span>
          </div>
        </template>

        <b-dropdown-item href="#">
          <i class="fe-user mr-1"></i>
          <span>My Account</span>
        </b-dropdown-item>

        <b-dropdown-item href="#">
          <i class="fe-settings mr-1"></i>
          <span>Settings</span>
        </b-dropdown-item>

        <b-dropdown-item href="#">
          <i class="fe-lock mr-1"></i>
          <span>Lock Screen</span>
        </b-dropdown-item>

        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="/logout">
          <i class="fe-log-out mr-1"></i>
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </ul>

    <!-- LOGO -->

    <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
      <li>
        <button class="button-menu-mobile" @click="toggleMenu">
          <i class="fe-menu"></i>
        </button>
      </li>

      <b-nav-item-dropdown class="d-none d-lg-block">
        <template slot="button-content">
          Create
          <i class="mdi mdi-chevron-down"></i>
        </template>
        <b-dropdown-item href="#">
          <i class="fe-briefcase mr-1"></i>
          <span>New Projects</span>
        </b-dropdown-item>
        <b-dropdown-item href="#">
          <i class="fe-user mr-1"></i>
          <span>Create Users</span>
        </b-dropdown-item>
        <b-dropdown-item href="#">
          <i class="fe-bar-chart-line- mr-1"></i>
          <span>Revenue Report</span>
        </b-dropdown-item>
        <b-dropdown-item href="#">
          <i class="fe-settings mr-1"></i>
          <span>Settings</span>
        </b-dropdown-item>
        <b-dropdown-item href="#">
          <i class="fe-headphones mr-1"></i>
          <span>Help & Support</span>
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
