<template>
  <div class="account-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-card class="box-card">
          <el-tabs v-model="activeName">
            <el-tab-pane label="账号信息" name="first">
              <el-row>
                <el-col :xs="0" :sm="2" :lg="2">
                  <div style="min-height:165px;"/>
                </el-col>
                <el-col :xs="16" :sm="16" :lg="16">
                  <div style="min-height:165px;">
                    <div id="1" class="main_con">
                      <p class="text1">账户信息</p>
                      <el-form ref="infoForm" :model="infoForm" :rules="inforules" label-width="100px" class="demo-infoForm">
                        <el-form-item label="手机" prop="phone">
                          <el-input v-model="infoForm.phone" placeholder="请输入手机号码"/>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                          <el-input v-model="infoForm.password" placeholder="请输入密码" type="password"/>
                        </el-form-item>
                        <el-form-item label="昵称" prop="nickname">
                          <el-input v-model="infoForm.nickname" placeholder="请输入昵称"/>
                          <p class="text3">昵称职能包含数字、中文、英文，不能包含符号</p>
                        </el-form-item>
                        <el-form-item label="QQ" prop="qq">
                          <el-input v-model="infoForm.qq" placeholder="请输入QQ号码"/>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                          <el-input v-model="infoForm.email" placeholder="请输入邮箱地址"/>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="submitForm('infoForm')">保存</el-button>
                          <el-button @click="resetForm('infoForm')">重置</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div id="2" class="main_con">
                      <p class="text2">账户关联</p>
                      <el-form label-width="100px">
                        <el-form-item label="微信">
                          <el-row>
                            <el-col :xs="18" :sm="18" :lg="18">
                              <img src="@/assets/vue/wechat.png" width="48px" height="48px">
                              <img src="@/assets/vue/jt.png" width="48px" height="48px">
                              <img src="@/assets/vue/fei.png" width="48px" height="48px">
                            </el-col>
                            <el-col :xs="6" :sm="6" :lg="6">
                              <el-button>授权微信</el-button>
                            </el-col>
                          </el-row>
                        </el-form-item>
                        <el-form-item>
                          <hr style="border-top:none;border-bottom:1px dashed #B2B2B2;height:0;margin-bottom: 15px;">
                        </el-form-item>
                        <el-form-item label="QQ">
                          <el-row>
                            <el-col :xs="18" :sm="18" :lg="18">
                              <img src="@/assets/vue/qq.png" width="48px" height="48px">
                              <img src="@/assets/vue/jt.png" width="48px" height="48px">
                              <img src="@/assets/vue/fei.png" width="48px" height="48px">
                            </el-col>
                            <el-col :xs="6" :sm="6" :lg="6">
                              <el-button>授权QQ</el-button>
                            </el-col>
                          </el-row>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="0" :sm="6" :lg="6">
                  <div style="min-height:165px;">
                    <ul class="list">
                      <li><a href="#1">账户信息</a></li>
                      <li><a href="#2">账户关联</a></li>
                    </ul>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="实名认证" name="second">
              <el-alert
                title="注意事项：这是一条公告消息。"
                type="warning"
                show-icon/>
              <el-row :gutter="20" style="margin-top:65px;">
                <el-col :xs="1" :sm="1" :lg="3">
                  <div style="min-height:165px;"/>
                </el-col>
                <el-col :xs="23" :sm="23" :lg="21">
                  <div style="min-height:165px;">
                    <el-form ref="authenticationForm" :model="authenticationForm" :rules="authenticationrules" label-width="100px" class="demo-authenticationForm" style="width:800px;">
                      <el-form-item :label-position="labelPosition" label-width="160px" label="认证类型" prop="type">
                        <el-radio-group v-model="authenticationForm.type" @change="typeFilter">
                          <el-radio :label="1">个人（实时自动审核）</el-radio>
                          <el-radio :label="2">企业（24小时人工审核）</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div v-if="authentication_type == 1">
                        <el-form-item :label-position="labelPosition" label-width="160px" label="审核状态">
                          未提交审核
                        </el-form-item>
                        <el-form-item :label-position="labelPosition" label-width="160px" label="姓名" prop="realname">
                          <el-input v-model="authenticationForm.realname" placeholder="请输入真实姓名"/>
                        </el-form-item>
                        <el-form-item :label-position="labelPosition" label-width="160px" label="身份证号码" prop="identification">
                          <el-input v-model="authenticationForm.identification" placeholder="请输入身份证号码"/>
                        </el-form-item>
                        <el-form-item :label-position="labelPosition" label-width="160px" label="手持身份证信息面照片">
                          <el-row :gutter="20">
                            <el-col :xs="22" :sm="22" :lg="9">
                              <div style="min-height:165px;">
                                <el-upload
                                  action="https://jsonplaceholder.typicode.com/posts/">
                                  <img src="@/assets/vue/scsfz.png" width="240px" height="160px">
                                  <div slot="tip" class="el-upload__tip text3">上传手持身份证信息面，请确保信息清晰</div>
                                </el-upload>
                              </div>
                            </el-col>
                            <el-col :xs="22" :sm="22" :lg="14">
                              <div style="min-height:165px;">
                                <p class="text5">1、请上传本人手持身份证信息面照片，照片中含有本人头部或者上半身照片</p>
                                <p class="text5">2、照片中本人形象需为免冠且并未化妆，五官清晰</p>
                                <p class="text5">3、拍照时对焦点请置于身份证上，保证身份证信息清晰且未遮挡</p>
                                <p class="text5">4、拍照时对焦点请置于身份证上，保证身份证信息清晰且未遮挡</p>
                                <p class="text5">5、拍照时对焦点请置于身份证上，保证身份证信息清晰且未遮挡</p>
                                <p class="text5">6、只能上传 jpg 文件，大小限制10KB - 200KB</p>
                              </div>
                            </el-col>
                          </el-row>
                        </el-form-item>
                        <el-form-item :label-position="labelPosition" label-width="160px" label="身份证国徽面照片">
                          <el-row :gutter="20">
                            <el-col :xs="22" :sm="22" :lg="9">
                              <div style="min-height:165px;">
                                <el-upload
                                  action="https://jsonplaceholder.typicode.com/posts/">
                                  <img src="@/assets/vue/sfzfm.png" width="240px" height="160px">
                                  <div slot="tip" class="el-upload__tip text3">上传身份证国徽面，请确保信息清晰</div>
                                </el-upload>
                              </div>
                            </el-col>
                            <el-col :xs="22" :sm="22" :lg="14">
                              <div style="min-height:165px;">
                                <p class="text5">1、请上传本人手持身份证信息面照片，照片中含有本人头部或者上半身照片</p>
                                <p class="text5">2、照片中本人形象需为免冠且并未化妆，五官清晰</p>
                                <p class="text5">3、拍照时对焦点请置于身份证上，保证身份证信息清晰且未遮挡</p>
                                <p class="text5">4、拍照时对焦点请置于身份证上，保证身份证信息清晰且未遮挡</p>
                                <p class="text5">5、拍照时对焦点请置于身份证上，保证身份证信息清晰且未遮挡</p>
                                <p class="text5">6、只能上传 jpg 文件，大小限制10KB - 200KB</p>
                              </div>
                            </el-col>
                          </el-row>
                        </el-form-item>
                      </div>
                      <div v-if="authentication_type == 2">
                        <el-form-item :label-position="labelPosition" label-width="160px" label="企业名称" prop="company">
                          <el-input v-model="authenticationForm.company" placeholder="请输入企业名称"/>
                        </el-form-item>
                        <el-form-item :label-position="labelPosition" label-width="160px" label="联系人" prop="contact">
                          <el-input v-model="authenticationForm.contact" placeholder="请输入联系人"/>
                        </el-form-item>
                        <el-form-item :label-position="labelPosition" label-width="160px" label="手机号码" prop="phone">
                          <el-input v-model="authenticationForm.phone" placeholder="请输入手机号码"/>
                        </el-form-item>
                        <el-form-item :label-position="labelPosition" label-width="160px" label="区域" prop="region">
                          <el-select v-model="authenticationForm.province" placeholder="请选择省">
                            <el-option label="区域一" value="shanghai"/>
                            <el-option label="区域二" value="beijing"/>
                          </el-select>
                          <el-select v-model="authenticationForm.city" placeholder="请选择市">
                            <el-option label="区域一" value="shanghai"/>
                            <el-option label="区域二" value="beijing"/>
                          </el-select>
                          <el-select v-model="authenticationForm.region" placeholder="请选择区域">
                            <el-option label="区域一" value="shanghai"/>
                            <el-option label="区域二" value="beijing"/>
                          </el-select>
                        </el-form-item>
                        <el-form-item :label-position="labelPosition" label-width="160px" label="详细地址" prop="address">
                          <el-input v-model="authenticationForm.address" placeholder="请输入详细地址"/>
                        </el-form-item>
                        <el-form-item :label-position="labelPosition" label-width="160px" label="营业执照号码" prop="businessLicense">
                          <el-input v-model="authenticationForm.businessLicense" placeholder="请输入营业执照号码"/>
                        </el-form-item>
                        <el-form-item :label-position="labelPosition" label-width="160px" label="营业执照">
                          <el-row :gutter="20">
                            <el-col :xs="22" :sm="22" :lg="10">
                              <div style="min-height:165px;">
                                <el-upload
                                  action="https://jsonplaceholder.typicode.com/posts/">
                                  <img src="@/assets/vue/yyzz.png" width="240px" height="160px">
                                  <div slot="tip" class="el-upload__tip text3">上传营业执照正面，请确保信息清晰</div>
                                </el-upload>
                              </div>
                            </el-col>
                            <el-col :xs="22" :sm="22" :lg="12">
                              <div style="min-height:165px;">
                                <p class="text5">1、营业执照正面</p>
                                <p class="text5">2、可标注水印，但是不能有遮挡</p>
                                <p class="text5">3、单个照片建议小于2MB，仅支持JPG、PNG格式</p>
                              </div>
                            </el-col>
                          </el-row>
                        </el-form-item>
                        <el-form-item :label-position="labelPosition" label-width="160px" label="法人身份证正面照片">
                          <el-row :gutter="20">
                            <el-col :xs="22" :sm="22" :lg="10">
                              <div style="min-height:165px;">
                                <el-upload
                                  action="https://jsonplaceholder.typicode.com/posts/">
                                  <img src="@/assets/vue/sfz.png" width="240px" height="160px">
                                  <div slot="tip" class="el-upload__tip text3">上传法人身份证人像面，请确保信息清晰</div>
                                </el-upload>
                              </div>
                            </el-col>
                            <el-col :xs="22" :sm="22" :lg="12">
                              <div style="min-height:165px;">
                                <p class="text5">1、拿着身份证原件对应 bt.cn 官网拍照</p>
                                <p class="text5">2、可标注水印，但是不能有遮挡</p>
                                <p class="text5">3、单个照片建议小于2MB，仅支持JPG、PNG格式</p>
                              </div>
                            </el-col>
                          </el-row>
                        </el-form-item>
                        <el-form-item :label-position="labelPosition" label-width="160px" label="法人身份证反面照片">
                          <el-row :gutter="20">
                            <el-col :xs="22" :sm="22" :lg="10">
                              <div style="min-height:165px;">
                                <el-upload
                                  action="https://jsonplaceholder.typicode.com/posts/">
                                  <img src="@/assets/vue/sfzfm.png" width="240px" height="160px">
                                  <div slot="tip" class="el-upload__tip text3">上传法人身份证国徽面，请确保信息清晰</div>
                                </el-upload>
                              </div>
                            </el-col>
                            <el-col :xs="22" :sm="22" :lg="12">
                              <div style="min-height:165px;">
                                <p class="text5">1、拿着身份证原件对应 bt.cn 官网拍照</p>
                                <p class="text5">2、可标注水印，但是不能有遮挡</p>
                                <p class="text5">3、单个照片建议小于2MB，仅支持JPG、PNG格式</p>
                              </div>
                            </el-col>
                          </el-row>
                        </el-form-item>
                      </div>
                      <el-form-item label-width="160px">
                        <el-button type="primary" @click="submitForm('authenticationForm')">保存</el-button>
                        <el-button @click="resetForm('authenticationForm')">重置</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="其他资质" name="third">
              <el-row :gutter="20">
                <el-col :xs="1" :sm="1" :lg="3">
                  <div style="min-height:165px;"/>
                </el-col>
                <el-col :xs="23" :sm="23" :lg="21">
                  <div style="min-height:165px;">
                    <p class="text1">账户信息</p>
                    <p class="desc">根据相关规定，如果需要分发某些特定类型的APP，需要相关资质，请您参考下面的APP类型，上传相关资质文件。一般所需文件：</p>
                    <el-table
                      :data="tableData"
                      border
                      fit
                      highlight-current-row
                      style="width: 521px;margin-left: 50px;">
                      <el-table-column
                        prop="type"
                        label="应用类型"
                        width="120"
                        align="left"/>
                      <el-table-column
                        prop="name"
                        label="所需资质"
                        width="400"
                        align="left"/>
                    </el-table>
                    <p class="text2">账户信息</p>
                    <p class="desc">轻按上文规定，上传资质文件，内容内容内容内容内容内容内容内容。</p>
                    <el-form ref="otherForm" :model="otherForm" class="demo-otherForm" style="margin-left: 50px;">
                      <el-form-item>
                        <el-upload
                          action="https://jsonplaceholder.typicode.com/posts/"
                          list-type="picture-card">
                          <img src="@/assets/vue/yyzz.png" width="240px" height="160px">
                          <div slot="tip" class="el-upload__tip text3">请确保资质文件信息清晰</div>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" src="dialogImageUrl" alt="">
                        </el-dialog>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitForm('otherForm')">确认</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      labelPosition: 'right',
      infoForm: {
        phone: '',
        password: '',
        nickname: '',
        qq: '',
        email: ''
      },
      inforules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      authentication_type: 1,
      authenticationForm: {
        type: 1,
        company: '',
        contact: '',
        phone: '',
        province: '',
        city: '',
        region: '',
        address: '',
        businessLicense: '',
        realname: '',
        identification: ''
      },
      authenticationrules: {
        type: [
          { required: true, message: '请选择认证类型', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        businessLicense: [
          { required: true, message: '请输入营业执照号码', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        identification: [
          { required: true, message: '请输入身份号码', trigger: 'blur' }
        ]
      },
      otherForm: {
        phone: ''
      },
      tableData: [{
        type: '棋牌类',
        name: '文网文、ICP、软件著作权'
      }, {
        type: '直播类',
        name: '信息网络传播视听节目许可证、文网文、ICP、营业执照'
      }, {
        type: '金融类',
        name: '金融牌照、ICP、营业执照'
      }],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    typeFilter(value) {
      this.authentication_type = value
      console.log('改变之后的值是:' + value)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.account-container {
  background-color: #fff;
  padding: 20px;
}
.el-form {
  width: 460px;
  max-width: 100%;
}
p.text1{
  font-size: 14px;
  line-height: 20px;
}
p.desc{
  font-size: 12px;
  color: rgba(0,0,0,0.70);
  letter-spacing: 0;
  margin-left: 50px;
}
p.text2{
  font-size: 14px;
  line-height: 20px;
  margin-top: 50px;
}
p.text3{
  font-size: 12px;
  color: rgba(0,0,0,0.40);
  line-height: 18px;
  margin-top: 3px;
  margin-bottom: 0;
}
p.text5{
  font-size: 12px;
  color: rgba(0,0,0,0.40);
  line-height: 14px;
  margin: 3px;
}
.list li{
  list-style-type: none;
  line-height: 40px;
  border-left: 1px solid rgba(0,0,0,0.12);
  padding-left: 16px;
}
.list li:hover,.list li.active{
  border-left: 2px solid #1E7FFF;
}
.list a{
  font-size: 12px;
  color: rgba(0,0,0,0.70);
  line-height: 18px;
}
.list a:hover,.list a.active{
  font-size: 12px;
  color: #1E7FFF;
  line-height: 18px;
}
</style>
