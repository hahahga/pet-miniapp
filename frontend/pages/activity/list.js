Page({
  data: {
    activities: []
  },
  onLoad: function() {
    // 获取社区活动数据
    this.getActivities();
  },
  getActivities: function() {
    // 模拟数据
    this.setData({
      activities: [
        { id: 1, title: '宠物聚会', date: '2023-04-01', location: '中央公园', image: '/assets/activity1.jpg' },
        { id: 2, title: '宠物训练课', date: '2023-04-15', location: '宠物训练中心', image: '/assets/activity2.jpg' }
      ]
    });
  },
  joinActivity: function() {
    wx.navigateTo({
      url: '/pages/activity/detail'
    });
  }
})