Page({
  data: {
    events: [],
    currentDate: ''
  },
  onLoad: function() {
    this.getCurrentDate();
    this.getEvents();
  },
  getCurrentDate: function() {
    const date = new Date();
    this.setData({
      currentDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    });
  },
  getEvents: function() {
    // 模拟活动数据
    this.setData({
      events: [
        { id: 1, title: '宠物聚会', date: '2023-06-15', location: '中央公园' },
        { id: 2, title: '宠物训练课', date: '2023-06-20', location: '宠物训练中心' }
      ]
    });
  },
  viewEventDetail: function(e) {
    const eventId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/activity/detail?id=' + eventId
    });
  }
})