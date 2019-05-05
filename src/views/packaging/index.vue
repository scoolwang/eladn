<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-card class="box-card">
          <div style="min-height:165px;">
            <el-tabs v-model="activeName">
              <el-tab-pane label="iOS扫码" name="ios">
                <el-row>
                  <el-col :xs="0" :sm="2" :lg="2">
                    <div style="min-height:165px;"/>
                  </el-col>
                  <el-col :xs="24" :sm="16" :lg="16">
                    <div style="min-height:165px;">
                      <el-form ref="packagingForm" :model="packagingForm" :rules="packagingrules" label-width="100px" class="packagingForm">
                        <div id="1" class="main_con">
                          <el-form-item label="基本信息填写" class="boldtext"/>
                          <el-form-item label="APP名称" prop="appname">
                            <el-input v-model="packagingForm.appname" placeholder="请输入APP名称"/>
                            <p class="text3">名称不能为空，且仅支持中文、英文或者数字</p>
                          </el-form-item>
                          <el-form-item label="网站链接" prop="weblink">
                            <el-input v-model="packagingForm.weblink" placeholder="请输入网站链接"/>
                          </el-form-item>
                          <el-form-item label="设备类型" prop="type">
                            <el-radio-group v-model="packagingForm.type">
                              <el-radio label="apk">安卓</el-radio>
                              <el-radio label="ipa">苹果</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="App图标">
                            <el-upload
                              action="https://jsonplaceholder.typicode.com/posts/">
                              <img src="@/assets/vue/upload.png" width="120px" height="120px">
                              <div slot="tip" class="el-upload__tip text3">200*200尺寸，小于1MPNG、JPG格式</div>
                            </el-upload>
                          </el-form-item>
                        </div>
                        <div id="2" class="main_con">
                          <el-form-item label="有效期选择" class="boldtext"/>
                          <el-form-item label="有效期">
                            <el-radio-group v-model="packagingForm.term">
                              <el-radio label="3day">3天免费试用</el-radio>
                              <el-radio label="6month">6个月</el-radio>
                              <el-radio label="1year" class="discount_label"><el-badge value="限时优惠">1年</el-badge></el-radio>
                              <el-radio label="2year">2年</el-radio>
                              <el-radio label="3year">3年</el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </div>
                        <div id="3" class="main_con">
                          <el-form-item label="支付方式选择" class="boldtext"/>
                          <el-form-item label="支付方式" prop="paytype">
                            <el-radio-group v-model="packagingForm.paytype" class="radio_paytype">
                              <el-radio label="alipay" border>
                                <span class="paytype_text">支付宝支付</span>
                                <img src="@/assets/vue/alipay.png" width="26px" height="26px">
                              </el-radio>
                              <el-radio label="wechat" border>
                                <span class="paytype_text">微信支付</span>
                                <img src="@/assets/vue/wxpay.png" width="26px" height="24px">
                              </el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="应支付" prop="amount">
                            <p class="amount">¥60.00</p>
                          </el-form-item>
                          <el-form-item label-width="110px">
                            <el-button type="primary">去支付</el-button>
                            <el-button>上一步</el-button>
                          </el-form-item>
                        </div>
                      </el-form>
                    </div>
                  </el-col>
                  <el-col :xs="0" :sm="6" :lg="6">
                    <div style="min-height:165px;">
                      <ul class="list">
                        <li><a href="#1">基本信息</a></li>
                        <li><a href="#2">有效期</a></li>
                        <li><a href="#3">支付方式</a></li>
                      </ul>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="APP免审上架" name="app">
                <el-row>
                  <el-col :xs="1" :sm="1" :lg="2">
                    <div style="min-height:165px;"/>
                  </el-col>
                  <el-col :xs="22" :sm="22" :lg="22">
                    <div style="min-height:165px;">
                      <el-form ref="appForm" :model="appForm" :rules="apprules" label-width="100px" class="appForm">
                        <el-steps :active="appactive" style="margin: 50px 0 50px 100px;">
                          <el-step title="步骤 1"/>
                          <el-step title="步骤 2"/>
                          <el-step title="步骤 3"/>
                        </el-steps>
                        <div v-if="show_appstep1==1" class="appstep appstep1">
                          <el-form-item label-width="160px" label="基本信息填写" class="boldtext"/>
                          <el-form-item label-width="160px" label="APP名称" prop="appname">
                            <el-input v-model="appForm.appname" placeholder="请输入APP名称"/>
                            <p class="text3">名称不能为空，且仅支持中文、英文或者数字</p>
                          </el-form-item>
                          <el-form-item label-width="160px" label="网站链接" prop="weblink">
                            <el-input v-model="appForm.weblink" placeholder="请输入网站链接"/>
                          </el-form-item>
                          <el-form-item label-width="160px" label="设备类型" prop="type">
                            <el-radio-group v-model="appForm.type">
                              <el-radio label="apk">安卓</el-radio>
                              <el-radio label="ipa">苹果</el-radio>
                            </el-radio-group>
                            <p class="text3">封装好的苹果APP无法直接安装、需要做企业签名才可以安装</p>
                          </el-form-item>
                          <el-form-item label-width="160px" label="横竖屏" prop="screen">
                            <el-radio-group v-model="appForm.screen">
                              <el-radio label="1">自适应</el-radio>
                              <el-radio label="2">始终横屏</el-radio>
                              <el-radio label="3">始终竖屏</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label-width="160px" label="版本号" prop="version">
                            <el-radio-group v-model="appForm.version ">
                              <el-radio label="default">默认</el-radio>
                              <el-radio label="custom">自定义</el-radio>
                            </el-radio-group>
                            <el-input v-if="appForm.version=='custom'" v-model="appForm.version_custom" placeholder="请输入自定义版本号"/>
                          </el-form-item>
                          <el-form-item label-width="160px" label="包名(Bungie ID)" prop="bungieid">
                            <el-radio-group v-model="appForm.bungieid">
                              <el-radio label="default">默认</el-radio>
                              <el-radio label="custom">自定义</el-radio>
                            </el-radio-group>
                            <el-input v-if="appForm.bungieid=='custom'" v-model="appForm.version_custom" placeholder="请输入自定义包名(Bungie ID)"/>
                          </el-form-item>
                          <el-form-item label-width="160px" label="启动图">
                            <el-upload
                              action="https://jsonplaceholder.typicode.com/posts/">
                              <img src="@/assets/vue/uploadqd.png" width="120px" height="210px">
                              <div slot="tip" class="el-upload__tip text3">1242*2208尺寸，小于1MPNG、JPG格式</div>
                            </el-upload>
                          </el-form-item>
                          <el-form-item label-width="160px" label="启动图时间显示" prop="showtime">
                            <el-radio-group v-model="appForm.showtime">
                              <el-radio label="1">1秒</el-radio>
                              <el-radio label="2">2秒</el-radio>
                              <el-radio label="3">3秒</el-radio>
                              <el-radio label="4">4秒</el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </div>
                        <div v-if="show_appstep2==1" class="appstep appstep2">
                          <el-form-item label-width="160px" label="插件选择" class="boldtext"/>
                          <el-form-item label-width="160px" label="基础插件" class="plugin_checkbox_group">
                            <el-checkbox-group v-model="appForm.basic_plugin">
                              <el-checkbox label="加载动画" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>加载动画</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="清理缓存" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>清理缓存</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="浏览器内核" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>浏览器内核</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="下载拉新" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>下载拉新</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="退出演示" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>退出演示</p>
                                </div>
                              </el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                          <el-form-item label-width="160px" label="高级插件">
                            <el-checkbox-group v-model="appForm.advanced_plugin" class="plugin_checkbox_group">
                              <el-checkbox label="状态标题栏" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>状态标题栏</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="导航栏(底部)" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>导航栏(底部)</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="微信分享" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>微信分享</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="长按图片保存" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>长按图片保存</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="URL拉起APP" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>URL拉起APP</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="侧边栏" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>侧边栏</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="极光推送" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>极光推送</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="友盟统计" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>友盟统计</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="引导页" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>引导页</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="识别二维码" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>识别二维码</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="网页错误" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>网页错误</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="浏览器UA" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>浏览器UA</p>
                                </div>
                              </el-checkbox>
                            </el-checkbox-group>
                            <div class="plugin_checkbox_more">
                              <p><i class="el-icon-loading"/></p>
                              <p>更多插件，敬请期待</p>
                            </div>
                          </el-form-item>
                        </div>
                        <div v-if="show_appstep3==1" class="appstep appstep3">
                          <el-form-item label-width="160px" label="有效期选择" class="boldtext"/>
                          <el-form-item label-width="160px" label="有效期">
                            <el-radio-group v-model="packagingForm.term">
                              <el-radio label="3day">3天免费试用</el-radio>
                              <el-radio label="6month">6个月</el-radio>
                              <el-radio label="1year" class="discount_label"><el-badge value="限时优惠">1年</el-badge></el-radio>
                              <el-radio label="2year">2年</el-radio>
                              <el-radio label="3year">3年</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label-width="160px" label="支付方式选择" class="boldtext"/>
                          <el-form-item label-width="160px" label="支付方式" prop="paytype">
                            <el-radio-group v-model="appForm.paytype" class="radio_paytype">
                              <el-radio label="alipay" border>
                                <span class="paytype_text">支付宝支付</span>
                                <img src="@/assets/vue/alipay.png" width="26px" height="26px">
                              </el-radio>
                              <el-radio label="wechat" border>
                                <span class="paytype_text">微信支付</span>
                                <img src="@/assets/vue/wxpay.png" width="26px" height="24px">
                              </el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label-width="160px" label="应支付" prop="amount">
                            <p class="amount">¥60.00</p>
                          </el-form-item>
                        </div>
                        <el-form-item label-width="160px">
                          <el-button v-if="appactive<2" type="primary" @click="appnext">下一步</el-button>
                          <el-button v-if="appactive==2" type="primary" @click="appnext">去支付</el-button>
                          <el-button v-if="appactive" @click="appprev">上一步</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-col>
                  <el-col :xs="1" :sm="1" :lg="2">
                    <div style="min-height:165px;"/>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="传统封装" name="package">
                <el-row>
                  <el-col :xs="1" :sm="1" :lg="2">
                    <div style="min-height:165px;"/>
                  </el-col>
                  <el-col :xs="22" :sm="22" :lg="22">
                    <div style="min-height:165px;">
                      <el-form ref="packageForm" :model="packageForm" :rules="packagerules" label-width="100px" class="packageForm">
                        <el-steps :active="packageactive" style="margin: 50px 0 50px 100px;">
                          <el-step title="步骤 1"/>
                          <el-step title="步骤 2"/>
                          <el-step title="步骤 3"/>
                        </el-steps>
                        <div v-if="show_packagestep1==1" class="packagestep packagestep1">
                          <el-form-item label-width="160px" label="基本信息填写" class="boldtext"/>
                          <el-form-item label-width="160px" label="APP名称" prop="appname">
                            <el-input v-model="packageForm.appname" placeholder="请输入APP名称"/>
                            <p class="text3">名称不能为空，且仅支持中文、英文或者数字</p>
                          </el-form-item>
                          <el-form-item label-width="160px" label="网站链接" prop="weblink">
                            <el-input v-model="packageForm.weblink" placeholder="请输入网站链接"/>
                          </el-form-item>
                          <el-form-item label-width="160px" label="设备类型" prop="type">
                            <el-radio-group v-model="packageForm.type">
                              <el-radio label="apk">安卓</el-radio>
                              <el-radio label="ipa">苹果</el-radio>
                            </el-radio-group>
                            <p class="text3">封装好的苹果APP无法直接安装、需要做企业签名才可以安装</p>
                          </el-form-item>
                          <el-form-item label-width="160px" label="横竖屏" prop="screen">
                            <el-radio-group v-model="packageForm.screen">
                              <el-radio label="1">自适应</el-radio>
                              <el-radio label="2">始终横屏</el-radio>
                              <el-radio label="3">始终竖屏</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label-width="160px" label="版本号" prop="version">
                            <el-radio-group v-model="packageForm.version ">
                              <el-radio label="default">默认</el-radio>
                              <el-radio label="custom">自定义</el-radio>
                            </el-radio-group>
                            <el-input v-if="packageForm.version=='custom'" v-model="packageForm.version_custom" placeholder="请输入自定义版本号"/>
                          </el-form-item>
                          <el-form-item label-width="160px" label="包名(Bungie ID)" prop="bungieid">
                            <el-radio-group v-model="packageForm.bungieid">
                              <el-radio label="default">默认</el-radio>
                              <el-radio label="custom">自定义</el-radio>
                            </el-radio-group>
                            <el-input v-if="packageForm.bungieid=='custom'" v-model="packageForm.bungieid_custom" placeholder="请输入自定义包名(Bungie ID)"/>
                          </el-form-item>
                          <el-form-item label-width="160px" label="App图标">
                            <el-upload
                              action="https://jsonplaceholder.typicode.com/posts/">
                              <img src="@/assets/vue/upload.png" width="120px" height="120px">
                              <div slot="tip" class="el-upload__tip text3">200*200尺寸，小于1MPNG、JPG格式</div>
                            </el-upload>
                          </el-form-item>
                          <el-form-item label-width="160px" label="启动图">
                            <el-upload
                              action="https://jsonplaceholder.typicode.com/posts/">
                              <img src="@/assets/vue/uploadqd.png" width="120px" height="210px">
                              <div slot="tip" class="el-upload__tip text3">1242*2208尺寸，小于1MPNG、JPG格式</div>
                            </el-upload>
                          </el-form-item>
                          <el-form-item label-width="160px" label="启动图时间显示" prop="showtime">
                            <el-radio-group v-model="packageForm.showtime">
                              <el-radio label="1">1秒</el-radio>
                              <el-radio label="2">2秒</el-radio>
                              <el-radio label="3">3秒</el-radio>
                              <el-radio label="4">4秒</el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </div>
                        <div v-if="show_packagestep2==1" class="packagestep packagestep2">
                          <el-form-item label-width="160px" label="插件选择" class="boldtext"/>
                          <el-form-item label-width="160px" label="基础插件">
                            <el-checkbox-group v-model="packageForm.basic_plugin" class="plugin_checkbox_group">
                              <el-checkbox label="加载动画" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>加载动画</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="清理缓存" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>清理缓存</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="浏览器内核" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>浏览器内核</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="下载拉新" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>下载拉新</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="退出演示" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>退出演示</p>
                                </div>
                              </el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                          <el-form-item label-width="160px" label="高级插件">
                            <el-checkbox-group v-model="packageForm.advanced_plugin" class="plugin_checkbox_group">
                              <el-checkbox label="状态标题栏" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>状态标题栏</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="导航栏(底部)" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>导航栏(底部)</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="微信分享" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>微信分享</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="长按图片保存" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>长按图片保存</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="URL拉起APP" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>URL拉起APP</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="侧边栏" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>侧边栏</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="极光推送" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>极光推送</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="友盟统计" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>友盟统计</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="引导页" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>引导页</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="识别二维码" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>识别二维码</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="网页错误" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>网页错误</p>
                                </div>
                              </el-checkbox>
                              <el-checkbox label="浏览器UA" border>
                                <div class="plugin_checkbox">
                                  <p><i class="el-icon-loading"/></p>
                                  <p>浏览器UA</p>
                                </div>
                              </el-checkbox>
                            </el-checkbox-group>
                            <div class="plugin_checkbox_more">
                              <p><i class="el-icon-loading"/></p>
                              <p>更多插件，敬请期待</p>
                            </div>
                          </el-form-item>
                        </div>
                        <div v-if="show_packagestep3==1" class="packagestep packagestep3">
                          <el-form-item label-width="160px" label="有效期选择" class="boldtext"/>
                          <el-form-item label-width="160px" label="有效期">
                            <el-radio-group v-model="packagingForm.term">
                              <el-radio label="3day">3天免费试用</el-radio>
                              <el-radio label="6month">6个月</el-radio>
                              <el-radio label="1year" class="discount_label"><el-badge value="限时优惠">1年</el-badge></el-radio>
                              <el-radio label="2year">2年</el-radio>
                              <el-radio label="3year">3年</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label-width="160px" label="支付方式选择" class="boldtext"/>
                          <el-form-item label-width="160px" label="支付方式" prop="paytype">
                            <el-radio-group v-model="packageForm.paytype" class="radio_paytype">
                              <el-radio label="alipay" border>
                                <span class="paytype_text">支付宝支付</span>
                                <img src="@/assets/vue/alipay.png" width="26px" height="26px">
                              </el-radio>
                              <el-radio label="wechat" border>
                                <span class="paytype_text">微信支付</span>
                                <img src="@/assets/vue/wxpay.png" width="26px" height="24px">
                              </el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label-width="160px" label="应支付" prop="amount">
                            <p class="amount">¥60.00</p>
                          </el-form-item>
                        </div>
                        <el-form-item label-width="160px">
                          <el-button v-if="packageactive<2" type="primary" @click="packagenext">下一步</el-button>
                          <el-button v-if="packageactive==2" type="primary" @click="packagenext">去支付</el-button>
                          <el-button v-if="packageactive" @click="packageprev">上一步</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-col>
                  <el-col :xs="1" :sm="1" :lg="2">
                    <div style="min-height:165px;"/>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="订单记录" name="order">
                <div class="filter-container">
                  <div class="filter-search" style="float: right;">
                    <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
                      <el-form-item>
                        <el-select v-model="input" placeholder="全部" size="medium">
                          <el-option label="华北" value="huabei"/>
                          <el-option label="华南" value="huanan"/>
                          <el-option label="华东" value="huadong"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item >
                        <el-input v-model="input" placeholder="请输入应用名称进行搜索" suffix-icon="el-icon-search"/>
                      </el-form-item>
                    </el-form>
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
                  <el-table-column type="index" width="50" align="center"/>
                  <el-table-column :label="$t('table.logo')" width="78" align="center">
                    <template slot-scope="scope">
                      <img src="@/assets/vue/momo.jpg" width="44px" height="44px" class="applogo">
                      <img v-if="scope.row.status=='draft'" src="@/assets/vue/ipa.png" width="16px" height="14px" class="ipaimg">
                      <img v-if="scope.row.status!='draft'" src="@/assets/vue/apk.png" width="16px" height="14px" class="apkimg">
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('table.appname')" width="132">
                    <template slot-scope="scope">
                      <span>这里是名称</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('table.packaging_system')" width="80" align="center">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status=='draft'">iOS</span>
                      <span v-if="scope.row.status!='draft'">安卓</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('table.packaging_weblink')" width="200">
                    <template slot-scope="scope">
                      <span>http://www/wanmi.cc</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('table.packaging_type')" width="100">
                    <template slot-scope="scope">
                      <span>基础版</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('table.packaging_expiretime')" width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.timestamp | parseTime('{y}/{m}/{d}') }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('table.packaging_bag')" width="80" align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-download" style="font-size: 18px;"/>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('table.actions')" width="350">
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" class="opt_button">
                        查看
                      </el-button>
                      <el-button type="primary" size="small" class="opt_button">
                        续费
                      </el-button>
                      <el-button size="small" class="opt_button">
                        编辑
                      </el-button>
                      <el-button size="small" class="opt_button">
                        删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>

                <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
              </el-tab-pane>
            </el-tabs>
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
      activeName: 'ios',
      packagingForm: {
        appname: '',
        weblink: '',
        type: '',
        term: '',
        paytype: ''
      },
      packagingrules: {
        appname: [
          { required: true, message: '请输入APP名称', trigger: 'blur' }
        ],
        weblink: [
          { required: true, message: '请输入网站链接', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ]
      },
      appForm: {
        appname: '',
        weblink: '',
        type: '',
        screen: '',
        version: '',
        bungieid: '',
        showtime: '',
        basic_plugin: [],
        advanced_plugin: [],
        term: '',
        paytype: ''
      },
      apprules: {
        appname: [
          { required: true, message: '请输入APP名称', trigger: 'blur' }
        ],
        weblink: [
          { required: true, message: '请输入网站链接', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ]
      },
      packageForm: {
        appname: '',
        weblink: '',
        type: '',
        screen: '',
        version: '',
        bungieid: '',
        showtime: '',
        basic_plugin: [],
        advanced_plugin: [],
        term: '',
        paytype: ''
      },
      packagerules: {
        appname: [
          { required: true, message: '请输入APP名称', trigger: 'blur' }
        ],
        weblink: [
          { required: true, message: '请输入网站链接', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ]
      },
      appactive: 0,
      show_appstep1: 1,
      show_appstep2: 0,
      show_appstep3: 0,
      packageactive: 0,
      show_packagestep1: 1,
      show_packagestep2: 0,
      show_packagestep3: 0,
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
    appnext() {
      if (this.appactive++ > 1) this.appactive = 0
      if (this.appactive === 0) {
        this.show_appstep1 = 1
        this.show_appstep2 = 0
        this.show_appstep3 = 0
      }
      if (this.appactive === 1) {
        this.show_appstep1 = 0
        this.show_appstep2 = 1
        this.show_appstep3 = 0
      }
      if (this.appactive === 2) {
        this.show_appstep1 = 0
        this.show_appstep2 = 0
        this.show_appstep3 = 1
      }
    },
    appprev() {
      if (this.appactive-- < 1) this.appactive = 0
      if (this.appactive === 0) {
        this.show_appstep1 = 1
        this.show_appstep2 = 0
        this.show_appstep3 = 0
      }
      if (this.appactive === 1) {
        this.show_appstep1 = 0
        this.show_appstep2 = 1
        this.show_appstep3 = 0
      }
      if (this.appactive === 2) {
        this.show_appstep1 = 0
        this.show_appstep2 = 0
        this.show_appstep3 = 1
      }
    },
    packagenext() {
      if (this.packageactive++ > 1) this.packageactive = 0
      if (this.packageactive === 0) {
        this.show_packagestep1 = 1
        this.show_packagestep2 = 0
        this.show_packagestep3 = 0
      }
      if (this.packageactive === 1) {
        this.show_packagestep1 = 0
        this.show_packagestep2 = 1
        this.show_packagestep3 = 0
      }
      if (this.packageactive === 2) {
        this.show_packagestep1 = 0
        this.show_packagestep2 = 0
        this.show_packagestep3 = 1
      }
    },
    packageprev() {
      if (this.packageactive-- < 1) this.packageactive = 0
      if (this.packageactive === 0) {
        this.show_packagestep1 = 1
        this.show_packagestep2 = 0
        this.show_packagestep3 = 0
      }
      if (this.packageactive === 1) {
        this.show_packagestep1 = 0
        this.show_packagestep2 = 1
        this.show_packagestep3 = 0
      }
      if (this.packageactive === 2) {
        this.show_packagestep1 = 0
        this.show_packagestep2 = 0
        this.show_packagestep3 = 1
      }
    },
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
  padding: 20px;
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
.el-form {
  width: 700px;
  max-width: 100%;
}
p.text3{
  font-size: 12px;
  color: rgba(0,0,0,0.40);
  line-height: 18px;
  margin-top: 3px;
  margin-bottom: 0;
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
.el-radio--medium.is-bordered{
  height: 48px;
  margin: 5px 10px;
  padding: 10px;
}
.paytype_text{
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
  padding: 5px;
  line-height: 18px;
  float: right;
}
p.amount{
  font-size: 26px;
  color: #EE6C3A;
  line-height: 20px;
  margin-top: 5px;
  margin-left: 10px;
}
.appstep{
  margin-top: 50px;
}
.discount_label{
  width: 100px;
}
.plugin_checkbox,.plugin_checkbox_more {
  display: block;
  border-left: 1px solid #dcdfe6;
  padding: 5px 20px;
  text-align: center;
}
.plugin_checkbox p,.plugin_checkbox_more p{
  margin: 0;
  font-size: 12px;
  color: #cccccc;
}
.plugin_checkbox i,.plugin_checkbox_more i{
  font-size: 18px;
  color: #606266;
}
.plugin_checkbox_more{
  border: 1px solid #dcdfe6;
  height: 64px;
  width: 145px;
  padding: 7px 10px;
  border-radius: 4px;
  line-height: 24px;
}
</style>
