<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card">
          <div style="min-height:165px;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="应用分发" name="first">
                <el-upload
                  class="upload-container"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/">
                  <div class="el-upload__text" style="background: #EDF1F7;height: 100%;">
                    <div><i class="el-icon-upload"/></div>
                    <div style="color:#000000;font-size: 12px;line-height: 26px;">严禁上传色情、反动、直播类、非法博彩类APP，违反该规则的APP将被删除。</div>
                    <div style="color:#999999;font-size: 12px;line-height: 22px;">将文件拖到此处，或点击上传。大小限制200MB以内！</div>
                    <div>
                      <el-button class="upload-item" type="primary" size="small" style="margin: 5px;">
                        <span>立即上传</span>
                      </el-button>
                    </div>
                  </div>
                </el-upload>
              </el-tab-pane>
              <el-tab-pane label="大型应用分发" name="second">
                <el-upload
                  class="upload-container"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/">
                  <div class="el-upload__text" style="background: #EDF1F7;height: 100%;">
                    <div><i class="el-icon-upload"/></div>
                    <div style="color:#000000;font-size: 12px;line-height: 26px;">严禁上传色情、反动、直播类、非法博彩类APP，违反该规则的APP将被删除。</div>
                    <div style="color:#999999;font-size: 12px;line-height: 22px;">将文件拖到此处，或点击上传。大小无限制!</div>
                    <div>
                      <el-button class="upload-item" type="primary" size="small" style="margin: 5px;">
                        <span>立即上传</span>
                      </el-button>
                    </div>
                  </div>
                </el-upload>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>流量剩余</span>
          </div>
          <div style="min-height:165px;">
            <el-row :gutter="20">
              <el-col :xs="12" :sm="12" :lg="12">
                <div class="text-center" style="height:160px;background: #5568A7;color:#ffffff;">
                  <span style="padding: 30px 0 30px;display: block;">自费流量</span>
                  <span style="font-size: 40px;display: block;">1000MB</span>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :lg="12">
                <div class="text-center" style="height:160px;background: #32BEA3;color:#ffffff;">
                  <span style="padding: 30px 0 30px;display: block;">赠送流量</span>
                  <span style="font-size: 40px;display: block;">500MB</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>福利公告</span>
          </div>
          <div style="min-height:165px;">
            <el-carousel trigger="click" height="160px">
              <el-carousel-item v-for="item in 4" :key="item">
                <img src="@/assets/vue/banner.png" width="100%" alt="图1">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>管理系统</span>
          </div>
          <div>
            <div class="filter-container">
              <el-row>
                <el-col :xs="24" :sm="24" :lg="18">
                  <div class="filter-buttons">
                    <el-button class="filter-item" icon="el-icon-delete">删除</el-button>
                    <el-button class="filter-item">
                      <img src="@/assets/vue/hb.png" width="16px" height="14px" style="margin-right: 10px;">
                      <span>合并</span>
                    </el-button>
                    <el-button class="filter-item">
                      <img src="@/assets/vue/rz.png" width="13px" height="16px" style="margin-right: 10px;">
                      <span>认证</span>
                    </el-button>
                    <el-button class="filter-item">
                      <img src="@/assets/vue/qm.png" width="15px" height="15px" style="margin-right: 10px;">
                      <span>签名</span>
                    </el-button>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6">
                  <div class="filter-search">
                    <el-input v-model="input" placeholder="请输入内容" suffix-icon="el-icon-search"/>
                  </div>
                </el-col>
              </el-row>
            </div>

            <el-table
              v-loading="listLoading"
              :key="tableKey"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%;">
              <el-table-column type="selection" align="center"/>
              <el-table-column :label="$t('table.logo')" width="78" align="center">
                <template slot-scope="scope">
                  <img src="@/assets/vue/momo.jpg" width="44px" height="44px" class="applogo">
                  <img v-if="scope.row.status=='draft'" src="@/assets/vue/ipa.png" width="16px" height="14px" class="ipaimg">
                  <img v-if="scope.row.status!='draft'" src="@/assets/vue/apk.png" width="16px" height="14px" class="apkimg">
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.appname')" width="132" align="left">
                <template slot-scope="scope">
                  <span>这里是名称</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.bundleid')" width="180" align="left">
                <template slot-scope="scope">
                  <span>com.tencent.mqq</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.version')" width="100" align="left">
                <template slot-scope="scope">
                  <span>1.0.0</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.size')" width="100" align="left">
                <template slot-scope="scope">
                  <span>95.3MB</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.uploadtime')" width="124" align="left">
                <template slot-scope="scope">
                  <span>{{ scope.row.timestamp | parseTime('{m}/{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.updatetime')" width="124" align="left">
                <template slot-scope="scope">
                  <span>{{ scope.row.timestamp | parseTime('{m}/{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.link')" width="200" align="left">
                <template slot-scope="scope">
                  <span>https://fei.cn/app/uesi</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.qrcode')" width="78" align="center">
                <template slot-scope="scope">
                  <el-popover
                    placement="top-start"
                    width="160"
                    trigger="hover">
                    <img src="@/assets/vue/momo1.png" width="135px" height="135px">
                    <img slot="reference" src="@/assets/vue/momo1.png" width="44px" height="44px">
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.actions')" align="left" class-name="fixed-width" width="300px">
                <template slot-scope="scope">
                  <el-button class="opt_button">
                    <i class="el-icon-document"/>
                  </el-button>
                  <el-button class="opt_button">
                    <i class="el-icon-edit-outline"/>
                  </el-button>
                  <el-button class="opt_button">
                    <i class="el-icon-download"/>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      activeName: 'first',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    background-color: #fff;
}
.applogo{
  box-shadow: 1px 1px 2px 0 rgba(0,0,0,.15);
  border-radius: 7px;
}
.ipaimg,.apkimg{
  position: absolute;
  bottom: 16px;
  right: 16px;
}
.opt_button{
  padding: 5px;
  border: none;
  font-size: 18px;
}
.upload-container {
  .el-upload {
    width: 100%;

    .el-upload-dragger {
      width: 100%;
      height: 150px;
      .el-icon-upload {
        font-size: 47px;
        color: #c0c4cc;
        margin: 16px 0 6px;
        line-height: 38px;
      }
    }
  }
}
</style>
