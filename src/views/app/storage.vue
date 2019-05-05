<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-card class="box-card">
          <div style="min-height:165px;">
            <el-tabs v-model="activeName">
              <el-tab-pane label="储存设置" name="first">
                <el-form ref="storageForm" :model="storageForm" :rules="storagerules" label-width="100px" class="storageForm">
                  <el-form-item label-width="160px" label="储存设置"/>
                  <el-form-item label-width="160px" label="储存方式" prop="s_type">
                    <el-select v-model="storageForm.s_type" placeholder="请选择储存方式" size="medium">
                      <el-option label="本地储存" value="free"/>
                      <el-option label="阿里云储存" value="aliyun"/>
                      <el-option label="七牛云" value="qiniu"/>
                      <el-option label="腾讯云" value="tencentyun"/>
                      <el-option label="又拍云" value="upyun"/>
                      <el-option label="自建服务器" value="ftp"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('storageForm')">保存</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="阿里云" name="aliyun">
                <el-form ref="aliyunForm" :model="aliyunForm" :rules="aliyunrules" label-width="100px" class="aliyunForm">
                  <el-form-item label-width="160px" label="阿里云设置"/>
                  <el-form-item label-width="160px" label="AccessKey" prop="accesskey">
                    <el-input v-model="aliyunForm.accesskey" placeholder="请输入AccessKey"/>
                  </el-form-item>
                  <el-form-item label-width="160px" label="Secretkey" prop="secretkey">
                    <el-input v-model="aliyunForm.secretkey" placeholder="请输入Secretkey"/>
                  </el-form-item>
                  <el-form-item label-width="160px" label="Bucket" prop="bucket">
                    <el-input v-model="aliyunForm.bucket" placeholder="请输入Bucket"/>
                  </el-form-item>
                  <el-form-item label-width="160px" label="绑定域名" prop="domain">
                    <el-input v-model="aliyunForm.domain" placeholder="请输入绑定域名"/>
                  </el-form-item>
                  <el-form-item label-width="160px" label="地区" prop="upserver">
                    <el-select v-model="aliyunForm.upserver" placeholder="请选择地区" size="medium">
                      <el-option label="华北" value="huabei"/>
                      <el-option label="华南" value="huanan"/>
                      <el-option label="华东" value="huadong"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('aliyunForm')">保存</el-button>
                    <el-button @click="resetForm('aliyunForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="七牛云" name="qiniu" disabled/>
              <el-tab-pane label="腾讯云" name="tencentyun" disabled/>
              <el-tab-pane label="又拍云" name="upyun" disabled/>
              <el-tab-pane label="自建服务器" name="ftp" disabled/>
            </el-tabs>
          </div>
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
      storageForm: {
        s_type: ''
      },
      storagerules: {
        s_type: [
          { required: true, message: '请选择储存方式', trigger: 'blur' }
        ]
      },
      aliyunForm: {
        accesskey: '',
        secretkey: '',
        bucket: '',
        domain: '',
        upserver: ''
      },
      aliyunrules: {
        accesskey: [
          { required: true, message: '请输入AccessKey', trigger: 'blur' }
        ],
        secretkey: [
          { required: true, message: '请输入Secretkey', trigger: 'blur' }
        ],
        bucket: [
          { required: true, message: '请输入Bucket', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  background-color: #fff;
  padding: 20px;
}
.el-form {
  width: 560px;
  max-width: 100%;
}
.storageForm,.aliyunForm{
  margin: 50px 0;
}
.el-select--medium{
  width: 100%;
}
</style>
