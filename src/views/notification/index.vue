<template>
  <div class="flow-container">
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>消息中心</span>
          </div>
          <div>
            <div class="filter-container">
              <div class="filter-buttons">
                <el-button class="filter-item" icon="el-icon-delete">删除</el-button>
                <el-button class="filter-item">
                  <img src="@/assets/vue/qm.png" width="15px" height="15px" style="margin-right: 10px;">
                  <span>置为已读</span>
                </el-button>
              </div>
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
              <el-table-column :label="$t('table.notification_status')" width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.status!='draft'">已读</span>
                  <span v-if="scope.row.status=='draft'">未读</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.notification_content')">
                <template slot-scope="scope">
                  <span>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.date')" width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.timestamp | parseTime('{y}/{m}/{d} {h}:{i}:{s}') }}</span>
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
      },
      formInline: {
        keywords: '',
        status: ''
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
    },
    submitForm(formName) {
      console.log('submit!')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.flow-container {
  background-color: #fff;
  padding: 20px;
}
p.title{
  font-size: 14px;
  line-height: 20px;
}
p.desc_title{
  font-size: 12px;
  color: rgba(0,0,0,0.40);
  letter-spacing: 0;
  line-height: 18px;
  margin-left: 36px;
  border-left: 2px solid #2396F3;
  padding: 0 10px;
  margin-top: 30px;
}
p.desc{
  font-size: 12px;
  color: rgba(0,0,0,0.70);
  letter-spacing: 0;
  margin-left: 50px;
}
p.title2{
  font-size: 14px;
  line-height: 20px;
  margin-top: 50px;
}
</style>
