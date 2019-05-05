<template>
  <div class="fund-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>资金变动</span>
      </div>
      <div>
        <div class="filter-container">
          <el-row style="margin-top:10px;">
            <el-col :xs="6" :sm="4" :lg="2">
              <img src="@/assets/vue/balance.png" width="54px" height="49px" class="applogo">
            </el-col>
            <el-col :xs="10" :sm="6" :lg="3">
              <span>当前余额</span><br><span class="total"><i>¥</i>10.00</span>
            </el-col>
            <el-col :xs="8" :sm="6" :lg="3">
              <el-button type="primary" size="small" @click="dialogFormVisible = true">立即充值</el-button>
              <el-dialog :visible.sync="dialogFormVisible" title="账户充值">
                <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top" label-width="70px" style="width: 640px; margin:0 50px;">
                  <el-form-item label="选择充值金额" prop="paytype">
                    <el-radio-group v-model="temp.amount" class="radio_amount">
                      <el-radio label="500"/>
                      <el-radio label="1000"/>
                      <el-radio label="2000"/>
                      <el-radio label="5000"/>
                      <el-radio label="10000"/>
                      <el-radio label="50000"/>
                      <el-radio label="100000"/>
                      <el-radio>
                        <el-input-number v-model="temp.amount_num" :min="0" controls-position="right" @change="handleChange"/>
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="支付方式" prop="paytype">
                    <el-radio-group v-model="temp.paytype" class="radio_paytype">
                      <el-radio label="alipay" border>
                        <span class="paytype_text">支付宝支付</span>
                        <img src="@/assets/vue/alipay.png" width="26px" height="26px">
                      </el-radio>
                      <el-radio label="wechat" border>
                        <span class="paytype_text">微信支付</span>
                        <img src="@/assets/vue/wxpay.png" width="26px" height="24px">
                      </el-radio>
                      <el-radio label="transfer" border>
                        <span class="paytype_text">对公转账</span>
                        <img src="@/assets/vue/transfer.png" width="26px" height="18px" style="margin-top: 5px;">
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <p class="amount">充值 &nbsp;&nbsp;<span>¥60.00</span></p>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox v-model="temp.checked">账户余额可用来购买分发次数，企业签名、封装APP等服务，目前暂时不支持越提现功能</el-checkbox>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialogFormVisible = false">充值</el-button>
                  <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                </div>
              </el-dialog>

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
          <el-table-column :label="$t('table.fund_order')" width="260">
            <template slot-scope="scope">
              <span>Fei2019010223480910951</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.fund_source')" width="160">
            <template slot-scope="scope">
              <span>微信充值</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.fund_created')" width="220">
            <template slot-scope="scope">
              <span>{{ scope.row.timestamp | parseTime('{m}/{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.fund_amount')" width="160">
            <template slot-scope="scope">
              <span>+100.00</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.fund_total')">
            <template slot-scope="scope">
              <span>113.00</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        paytype: '',
        amount_num: 0
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      formLabelWidth: '120px',
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
    },
    openDialogForm() {
      this.dialogFormVisible = true
    },
    closeDialogForm() {
      this.dialogFormVisible = false
    },
    handleChange(value) {
      this.amount_num = value
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.fund-container {
  background-color: #fff;
  padding: 20px;
}
.filter-container{
  height: 130px;
  background-color: #f0f2f5;
  margin-bottom: 25px;
  padding: 33px;
}
.filter-container span{
  font-size: 12px;
  color: rgba(0,0,0,0.90);
  line-height: 20px;
}
.filter-container span.total{
  font-size: 28px;
  color: rgba(0,0,0,0.90);
  line-height: 36px;
}
.filter-container span.total i{
  font-size: 20px;
  line-height: 20px;
  font-style: normal;
}
.filter-container button{
  margin: 10px;
}
.radio_amount .el-radio{
  width: 100px;
  font-size: 12px;
  color: rgba(0,0,0,0.70);
  line-height: 18px;
}
.el-radio--medium.is-bordered{
  height: 48px;
  margin: 5px 10px;
  padding: 10px;
  width: 140px;
  display: block;
  float: left;
}
.paytype_text{
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
  padding: 5px;
  line-height: 18px;
  float: right;
  text-align: left;
  width: 80px;
}
.amount span{
  font-size: 26px;
  color: #EE6C3A;
  line-height: 20px;
}
.el-input-number--medium{
  width: 120px;
}

</style>
