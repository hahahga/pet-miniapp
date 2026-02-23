Page({
  data: {
    records: []
  },
  onLoad: function() {
    // 获取健康记录数据
    this.getRecords();
  },
  getRecords: function() {
    // 模拟数据
    this.setData({
      records: [
        { id: 1, date: '2023-01-01', type: '疫苗', description: '狂犬疫苗' },
        { id: 2, date: '2023-02-15', type: '体检', description: '年度体检' }
      ]
    });
  },
  addRecord: function() {
    wx.navigateTo({
      url: '/pages/health/add'
    });
  }
})