<template>
  <el-scrollbar wrap-class="scrollbar-wrapper"  >
    <div @mouseover="openSideBar" @mouseout="closeSideBar" style="height: 100%;">
    <!-- <div class="sidebar-menu" style="height: 100%;"> -->


    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :default-openeds="['/app','/financial']"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#f9fafe"
      text-color="#5e6166"
      active-text-color="#3a65eb"
      @open="handleOpen"
      @close="handleClose"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>

    </el-menu>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch: {
    $route () {
      this.changing = true
      this.closeSideBar()
      setTimeout(() => {
        this.changing = false
      }, 1000)
    }
  },
  data () {
    return {
      changing: false
    }
  },
  methods: {
    openSideBar() {
      if (this.changing) {
        return
      }
      console.log('hover')
      this.$store.dispatch('openSideBar', { withoutAnimation: false })
    },
    closeSideBar() {
      console.log('hover')
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    },
    handleOpen(key, keyPath) {
      console.log(key)
    },
    handleClose(key, keyPath) {
      console.log(key)
    }
  },
  created () {
    console.log(this.permission_routers)
  }
}
</script>
<style>
  .hideSidebar .sidebar-container .el-menu-item span {
    display: none;
  }
</style>
<style scoped>

  /*.sidebar-menu:hover {
    width: 163px;
  }*/
</style>
