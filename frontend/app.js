App({
  // 全局数据
  globalData: {
    userInfo: null,      // 用户信息
    isLoggedIn: false,   // 登录状态
    cloudEnv: 'prod-xxx' // 替换为您的云环境ID
  },

  onLaunch() {
    // 保留原有检查逻辑
    this.checkAPIAvailable();
    this.checkSDKVersion();

    // 新增初始化流程
    this.initCloud();
    this.checkLogin();
  },

  // 保留原有方法
  checkAPIAvailable() {
    /* 原有代码不变 */
  },

  checkSDKVersion() {
    /* 原有代码不变 */
  },

  compareVersion(v1, v2) {
    /* 原有代码不变 */
  },

  // 新增方法：初始化云开发
  initCloud() {
    wx.cloud.init({
      env: this.globalData.cloudEnv,
      traceUser: true
    });
  },

  // 新增方法：检查登录状态
  checkLogin() {
    // 1. 检查本地缓存
    const token = wx.getStorageSync('auth_token');
    const userInfo = wx.getStorageSync('user_info');

    if (token && userInfo) {
      // 2. 验证token有效性（实际开发中需调用后台接口验证）
      this.globalData.userInfo = userInfo;
      this.globalData.isLoggedIn = true;
    } else {
      // 3. 跳转到登录页（确保已在app.json注册）
      wx.redirectTo({
        url: '/pages/login/index'
      });
    }
  },

  // 新增方法：登录操作
  login(credentials) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'login',
        data: credentials
      }).then(res => {
        // 1. 保存登录状态
        this.globalData.userInfo = res.result.userInfo;
        this.globalData.isLoggedIn = true;
        
        // 2. 持久化存储
        wx.setStorageSync('auth_token', res.result.token);
        wx.setStorageSync('user_info', res.result.userInfo);
        
        resolve(res);
      }).catch(reject);
    });
  }
});