// pages/discover/index.js
Page({
  data: {
    discoverItems: [
      {
        id: 1,
        icon: '/assets/discover/social.png',
        title: '宠物社交',
        url: '/pages/social/feed'
      },
      {
        id: 2,
        icon: '/assets/discover/activity.png',
        title: '活动推荐',
        url: '/pages/activity/list'
      },
      {
        id: 3,
        icon: '/assets/discover/service.png',
        title: '服务发现',
        url: '/pages/service/list'
      }
    ]
  },

  // 新增方法（解决报错的核心部分）
  gotoPetSocial: function() {
    wx.navigateTo({
      url: '/pages/social/feed'
    });
  },

  gotoActivity: function() {
    wx.navigateTo({
      url: '/pages/activity/list'
    });
  },

  gotoService: function() {
    wx.navigateTo({
      url: '/pages/service/list'
    });
  },

  gotoPost: function() {
    wx.navigateTo({
      url: '/pages/post/create'
    });
  },

  // 保留原有生命周期方法
  onLoad(options) {},
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {}
});