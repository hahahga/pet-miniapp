// pages/profile/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: {
      avatar: '/assets/avatars/user1.jpg',
      nickname: '宠物家长',
      id: 'user12345',
      isVip: true
    },
    
    // 统计信息
    statsData: [
      { value: '0', label: '关注' },
      { value: '0', label: '粉丝' },
      { value: '0', label: '获赞' }
    ],
    
    // 菜单分组（包含新增的三个功能项）
    menuGroups: [
      {
        groupName: '我的服务',
        items: [
          {
            id: 'customer-service',
            title: '联系客服',
            icon: '/assets/icons/service(2).png',
            badge: '',
            pageUrl: '/pages/service/customer/index'
          },
          {
            id: 'wallet',
            title: '我的钱包',
            icon: '/assets/icons/wallet.png',
            badge: '',
            pageUrl: '/pages/wallet/index'
          },
          {
            id: 'location',
            title: '附近服务',
            icon: '/assets/icons/location.png',
            badge: 'NEW',
            pageUrl: '/pages/map/index'
          }
        ]
      },
      {
        groupName: '系统设置',
        items: [
          {
            id: 'settings',
            title: '设置',
            icon: '/assets/icons/settings.png',
            badge: '',
            pageUrl: '/pages/settings/index'
          }
        ]
      }
    ]
  },

  /**
   * 跳转到指定页面
   */
  navigateToPage(e) {
    const itemId = e.currentTarget.dataset.id;
    const targetItem = this.data.menuGroups
      .flatMap(group => group.items)
      .find(item => item.id === itemId);
    
    if (!targetItem?.pageUrl) {
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      });
      return;
    }

    wx.navigateTo({
      url: targetItem.pageUrl,
      success: () => {
        console.log(`成功跳转到: ${targetItem.title}`);
      },
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({
          title: '页面加载失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 可以在这里添加初始化逻辑
    console.log('个人中心页面加载');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 页面初次渲染完成
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时可能需要刷新数据
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // 页面隐藏
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 页面卸载
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 下拉刷新
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 上拉触底
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '发现这个超好用的宠物社交APP',
      path: '/pages/profile/index'
    };
  }
});