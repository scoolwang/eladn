<template>
  <div class="product-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-card class="box-card">
          <el-tabs v-model="activeName">
            <el-tab-pane label="产品选购" name="first">
              <p class="title">产品介绍</p>
              <p class="desc_title">购买须知</p>
              <p class="desc">购买周期越久价格优惠力度越大。</p>
              <p class="title2">产品选择</p>
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%;">
                <el-table-column :label="$t('table.product_name')" width="100">
                  <template slot-scope="scope">
                    <span>名称内容</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('table.product_desc')" width="220">
                  <template slot-scope="scope">
                    <span>这是一个很长的介绍内容内容</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('table.product_price')" width="120">
                  <template slot-scope="scope">
                    <span>¥100.00</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('table.product_discount')" width="480">
                  <template slot-scope="scope">
                    <el-radio-group v-model="scope.row.id" class="product_discount">
                      <el-radio-button label="1月">1月</el-radio-button>
                      <el-radio-button label="2月">2月</el-radio-button>
                      <el-radio-button label="3月">3月</el-radio-button>
                      <el-radio-button label="1年"><el-badge value="8.3折">1年</el-badge></el-radio-button>
                      <el-radio-button label="2年"><el-badge value="7.0折">2年</el-badge></el-radio-button>
                      <el-radio-button label="3年"><el-badge value="6.0折">3年</el-badge></el-radio-button>
                      <el-radio-button label="4年"><el-badge value="5.0折">4年</el-badge></el-radio-button>
                      <el-radio-button label="5年"><el-badge value="4.0折">5年</el-badge></el-radio-button>
                    </el-radio-group>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('table.product_buy')" class-name="fixed-width">
                  <template slot-scope="scope">
                    <el-button>立即购买</el-button>
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
