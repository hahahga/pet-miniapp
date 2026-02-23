Page({
  data: {
    services: []
  },
  onLoad: function() {
    // 获取服务预约数据
    this.getServices();
  },
  getServices: function() {
    // 模拟数据
    this.setData({
      services: [
        { id: 1, name: '美容', date: '2023-03-10', status: '已预约' },
        { id: 2, name: '洗澡', date: '2023-03-15', status: '待确认' }
      ]
    });
  },
  addService: function() {
    wx.navigateTo({
      url: '/pages/service/add'
    });
  }
})