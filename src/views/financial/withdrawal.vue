<template>
  <div class="withdrawal-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的余额</span>
      </div>
      <div>
        <div class="filter-container">
          <el-row>
            <el-col :xs="8" :sm="8" :lg="8">
              <div class="balance_img"><img src="@/assets/vue/balance.png" width="54px" height="49px"></div>
              <div class="balance_text"><span>账户余额</span><br><span class="total"><i>¥</i>10,000.00</span></div>
            </el-col>
            <el-col :xs="8" :sm="8" :lg="8">
              <div class="balance_img"><img src="@/assets/vue/balance.png" width="54px" height="49px"></div>
              <div class="balance_text"><span>可提现金额</span><br><span class="total"><i>¥</i>10,000.00</span></div>
            </el-col>
            <el-col :xs="8" :sm="8" :lg="8">
              <div class="balance_img"><img src="@/assets/vue/balance.png" width="54px" height="49px"></div>
              <div class="balance_text"><span>不可提现金额</span><br><span class="total"><i>¥</i>10,000.00</span></div>
            </el-col>
          </el-row>
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="提现申请" name="apply">
            <el-alert
              title="还未完成实名认证，认证后即可提现。"
              type="warning"
              show-icon/>
            <el-form ref="applyForm" :model="applyForm" :rules="applyrules" class="applyForm">
              <el-form-item label-width="160px" label="账户信息" class="boldtext"/>
              <el-form-item label-width="160px" label="姓名" prop="realname">
                <el-input v-model="applyForm.realname" placeholder="请输入姓名"/>
              </el-form-item>
              <el-form-item label-width="160px" label="提现金额" prop="amount">
                <el-input v-model="applyForm.amount" placeholder="请输入提现金额"/>
              </el-form-item>
              <el-form-item label-width="160px" label="提现方式" prop="paytype">
                <el-radio-group v-model="applyForm.paytype" class="radio_paytype">
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
              <el-form-item label-width="160px" label="提现二维码">
                <div class="qrcode_bg"><img src="@/assets/vue/qrcode.png" width="100px" height="100px"></div>
              </el-form-item>
              <el-form-item label-width="160px" label="提现金额" prop="amount">
                <p class="amount">¥60.00</p>
              </el-form-item>
              <el-form-item label-width="160px">
                <el-button type="primary">确认提现</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="提现列表" name="list">
            <el-table
              v-loading="listLoading"
              :key="tableKey"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%;margin-top: 15px;">
              <el-table-column :label="$t('table.withdrawal_order')" width="260">
                <template slot-scope="scope">
                  <span>Fei2019010223480910951</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.withdrawal_created')" width="220">
                <template slot-scope="scope">
                  <span>{{ scope.row.timestamp | parseTime('{y}/{m}/{d} {h}:{i}:{s}') }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.withdrawal_amount')" width="120">
                <template slot-scope="scope">
                  <span>100.00</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.withdrawal_type')" width="140">
                <template slot-scope="scope">
                  <span v-if="scope.row.status!='draft'">微信</span>
                  <span v-if="scope.row.status=='draft'">支付宝</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.withdrawal_account')" width="140">
                <template slot-scope="scope">
                  <el-popover
                    placement="top-start"
                    title="提现账号"
                    width="160"
                    trigger="click">
                    <img src="@/assets/vue/momo1.png" width="135px" height="135px">
                    <div style="text-align: right; margin: 0">
                      <el-button type="text" size="mini">确定</el-button>
                    </div>
                    <el-button slot="reference" type="text">查看</el-button>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.withdrawal_status')">
                <template slot-scope="scope">
                  <el-badge v-if="scope.row.status!='draft'" is-dot class="order_status" type="success">处理完成</el-badge>
                  <el-badge v-if="scope.row.status=='draft'" is-dot class="order_status">等待处理</el-badge>
                </template>
              </el-table-column>
            </el-table>

            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
          </el-tab-pane>
        </el-tabs>
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
      activeName: 'apply',
      applyForm: {
        realname: '',
        amount: '',
        paytype: ''
      },
      applyrules: {
        realname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请输入提现金额', trigger: 'blur' }
        ]
      },
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
.withdrawal-container {
  background-color: #fff;
  padding: 20px;
}
.applyForm {
  width: 700px;
  max-width: 100%;
  margin-left: 50px;
  margin-top: 50px;
}
.filter-container{
  height: 130px;
  background-color: #f0f2f5;
  margin-bottom: 25px;
  padding: 33px;
}
.balance_img{
  float: left;
  margin-top: 10px;
  margin-right: 20px;
}
.balance_text{
  font-size: 12px;
  color: rgba(0,0,0,0.90);
  line-height: 20px;
}
.balance_text span.total{
  font-size: 28px;
  color: rgba(0,0,0,0.90);
  line-height: 36px;
}
.balance_text span.total i{
  font-size: 20px;
  line-height: 20px;
  font-style: normal;
}
.el-radio--medium.is-bordered{
  height: 48px;
  margin: 5px 0;
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
.amount{
  font-size: 26px;
  color: #EE6C3A;
  line-height: 26px;
  margin: 5px;
}
.qrcode_bg{
  background-image: url(../../assets/vue/qrcode_bg.png);
  background-repeat: no-repeat;
  background-size: 120px;
  padding: 10px;
}
.order_status{
  margin-left: 10px;
}
.el-col{
  padding-left: 10%;
}
.el-col + .el-col{
  border-left: 1px solid #ccc;
}
</style>
