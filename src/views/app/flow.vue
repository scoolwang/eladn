<template>
  <div class="flow-container">
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <el-card class="box-card">
          <p class="title">规则介绍</p>
          <p class="desc_title">注意事项</p>
          <p class="desc">为减少服务器压力，订单记录只保留7天，超过周期会清除</p>
          <p class="title2">变动明细</p>
          <el-table
            v-loading="listLoading"
            :key="tableKey"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('table.change_created')" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.timestamp | parseTime('{y}/{m}/{d} {h}:{i}:{s}') }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.change_flow')" width="150">
              <template slot-scope="scope">
                <span>-92.21MB</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.change_desc')" width="200">
              <template slot-scope="scope">
                <span>下载流量扣除</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.change_order')" width="250">
              <template slot-scope="scope">
                <span>DL2019022722221089257</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.change_browser')" width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.status!='draft'">安卓浏览器</span>
                <span v-if="scope.row.status=='draft'">iOS浏览器</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.change_ip')">
              <template slot-scope="scope">
                <span>192.186.31.11</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
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
