<template>
  <div class="product-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-card class="box-card">
          <el-tabs v-model="activeName">
            <el-tab-pane label="订单列表" name="first">
              <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="搜索订单或商品名称" prop="keywords">
                  <el-input v-model="formInline.keywords" placeholder="搜索订单或商品名称"/>
                </el-form-item>
                <el-form-item label="选择状态" prop="status">
                  <el-select v-model="formInline.status" placeholder="选择状态">
                    <el-option label="成功" value="success"/>
                    <el-option label="失败" value="error"/>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('formInline')">查询</el-button>
                  <el-button @click="resetForm('formInline')">重置</el-button>
                </el-form-item>
              </el-form>
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%;">
                <el-table-column :label="$t('table.order_number')" width="220">
                  <template slot-scope="scope">
                    <span>Fei2019010223480910951</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('table.order_product')" width="140">
                  <template slot-scope="scope">
                    <span>企业签名</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('table.order_paytime')" width="200">
                  <template slot-scope="scope">
                    <span>{{ scope.row.timestamp | parseTime('{y}/{m}/{d} {h}:{i}:{s}') }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('table.order_payment')" width="150">
                  <template slot-scope="scope">
                    <span>微信支付</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('table.order_amount')" width="125">
                  <template slot-scope="scope">
                    <span>13.00</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('table.order_status')">
                  <template slot-scope="scope">
                    <el-badge v-if="scope.row.status!='draft'" is-dot class="order_status" type="success">成功</el-badge>
                    <el-badge v-if="scope.row.status=='draft'" is-dot class="order_status">失败</el-badge>
                  </template>
                </el-table-column>
              </el-table>
              <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
            </el-tab-pane>
          </el-tabs>
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
.product-container {
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
.order_status{
  margin-left: 10px;
}

</style>
