<template>
  <div class="navbar">
    <!-- <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/> -->

    <!-- <breadcrumb class="breadcrumb-container"/> -->
    <div class="bar-left">
      <div class="logo">
        <!-- <item icon="dashboard"  /> -->
        <img src="@/assets/vue/logo.jpg" alt="" title="占位图">
      </div>
      <!-- <div class="index-link">
        <router-link to="/dashboard">
          <div class="link-inner">
            <div class="index-icon">
              <img src="../../../assets/vue/logo" alt="" title="占位图">
              <item icon="dashboard"  />
            </div>
            <div>
              产品主页
            </div>
          </div>

        </router-link>

      </div> -->
    </div>
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item"/>
        <el-tooltip :content="$t('navbar.question')" effect="dark" placement="bottom">
          <i class="el-icon-question right-menu-item"/>
        </el-tooltip>
        <el-tooltip :content="$t('navbar.notification')" effect="dark" placement="bottom">
          <router-link to="/notification/index"><i class="el-icon-message right-menu-item"/></router-link>
        </el-tooltip>

      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <svg-icon icon-class="user" /> GGuser <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              <router-link to="/account/personal">{{ $t('navbar.account') }}</router-link>
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import Item from './Sidebar/Item'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker,
    Item
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>
<style>
  .el-menu-item:hover {
    background-color: rgba(58, 101, 235, 0.06) !important;
  }
  .router-link-active .el-menu-item {
    background-color: rgba(58, 101, 235, 0.06) !important;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  position: fixed;
  z-index: 1002;
  top: 0;
  width: 100%;
  height: 56px;
  line-height: 56px;
  border-radius: 0px !important;
  box-shadow:  0 3px 4px 0 rgba(0,0,0,.04);
  overflow: hidden;
  background: #fff;
  .hamburger-container {
    line-height: 58px;
    height: 56px;
    float: left;
    padding: 0 10px;
  }

  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .bar-left {
    float: left;
    height: 56px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    .logo {
      /*width: 38px;*/
      height: 50px;
      margin-right: 60px;
      color: #3a65eb;
      font-size: 38px;
      img {
        /*width: 100%;*/
        height: 50px;
      }
    }
    .link-inner {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
    }
    .index-icon {
      /*width:  18px;
      height: 18px;*/
      /*line-height: 18px;*/
      margin-right: 20px;
      color: #3a65eb;
      font-size: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 56px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 22px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
