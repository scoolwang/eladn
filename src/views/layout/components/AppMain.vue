<template>
<div class="app-main-wrap">
  <div v-if="!hasOneShowingChild()" class="submenu-side">
    <!-- 侧边栏{{key}} -->
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :default-openeds="['/app','/financial']"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#fff"
      text-color="#5e6166"
      active-text-color="#3a65eb"
    >
      <template v-for="child in curretRoute.children">
        <app-link :to="resolvePath(child.path)">

          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta" :icon="child.meta.icon" :title="generateTitle(child.meta.title)" />
          </el-menu-item>
        </app-link>
      </template>
    </el-menu>
      <!-- <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu" />

        <app-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta" :icon="child.meta.icon" :title="generateTitle(child.meta.title)" />
          </el-menu-item>
        </app-link>
      </template> -->
  </div>
  <section class="app-main">

    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</div>

</template>

<script>
import path from 'path'
import { generateTitle } from '@/utils/i18n'
import { mapGetters } from 'vuex'
import { isExternal } from '@/utils'
import AppLink from './Sidebar/Link'
import Item from './Sidebar/Item'
export default {
  name: 'AppMain',
  components: { Item, AppLink },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      console.log(this.$route, '当前路由')
      console.log(this.sidebar, 'sidebar')
      return this.$route.fullPath
    },
    curretRoute () {
      let str = []
      for (let route of this.permission_routers) {
        if (route.name === this.$route.name) {
          console.log(route, '泉路由')
          str = route
          return route
        } else {
          if (route.children) {
            for (let child of route.children) {
              if (child.name === this.$route.name) {
                console.log(route, '泉路由')
                str = route
                return route
              }
            }
          }
        }
      }
      console.log(str, '当前路由')
      return str
    }
  },
  created () {
    console.log(this.permission_routers, '所有路由')
  },
  methods: {
    generateTitle,
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
    hasOneShowingChild() {
      let children = this.curretRoute.children
      let parent = this.curretRoute
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.curretRoute.path, routePath)
    }
  }
}
</script>

<style scoped lang="scss">
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.app-main-wrap {
  display: flex;
}
.submenu-side {
    width: 240px;
    padding-left: 45px;
    box-sizing: border-box;
    background-color: #fff;
    border-right: 1px solid #e2e5ea;
    padding-top: 27px;
    .router-link-active .el-menu-item{
      border-top: 1px solid #e6e9f0;
      border-bottom: 1px solid #e6e9f0;
      border-right: 1px solid #fff;

      background: #fff !important;
    }
    .el-menu-item {
      border-right: 1px solid #e2e5ea;
      background: none !important;
      transition: none;
    }

    .el-menu {
      border: none;
      margin-right: -1px;
    }
}
</style>

