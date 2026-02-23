Page({
  data: {
    // 登录/注册状态
    isLogin: true,
    
    // 登录表单数据
    loginForm: {
      username: '',
      password: ''
    },
    
    // 注册表单数据
    registerForm: {
      username: '',
      phone: '',
      password: '',
      identity: 'owner' // owner/admin
    }
  },

  // 切换登录/注册状态
  switchAuthMode() {
    this.setData({
      isLogin: !this.data.isLogin,
      loginForm: { username: '', password: '' },
      registerForm: { ...this.data.registerForm, password: '' }
    });
  },

  // 通用输入处理
  handleInput(e) {
    const { field, form } = e.currentTarget.dataset;
    this.setData({
      [`${form}.${field}`]: e.detail.value
    });
  },

  // 身份选择
  handleIdentityChange(e) {
    this.setData({
      'registerForm.identity': e.detail.value
    });
  },

  // 处理登录
  async handleLogin() {
    const { username, password } = this.data.loginForm;
    
    if (!username || !password) {
      wx.showToast({ title: '请输入账号密码', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '登录中...' });
    
    try {
      // 模拟登录接口
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 实际开发中替换为：
      // const res = await wx.cloud.callFunction({
      //   name: 'userLogin',
      //   data: { username, password }
      // });
      
      // 保存登录状态
      getApp().globalData.userInfo = { 
        username,
        identity: 'user' // 实际应从接口获取
      };
      
      wx.switchTab({ url: '/pages/message/index' });
    } catch (err) {
      wx.showToast({ title: '登录失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  },

  // 处理注册
  async handleRegister() {
    const { username, phone, password, identity } = this.data.registerForm;
    
    if (!username || !phone || !password) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '注册中...' });
    
    try {
      // 模拟注册接口
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 实际开发中替换为：
      // const res = await wx.cloud.callFunction({
      //   name: 'userRegister',
      //   data: { username, phone, password, identity }
      // });
      
      // 注册后自动填充登录表单
      this.setData({
        isLogin: true,
        loginForm: { username, password }
      });
      
      wx.showToast({ title: '注册成功，请登录' });
    } catch (err) {
      wx.showToast({ title: '注册失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  }
});