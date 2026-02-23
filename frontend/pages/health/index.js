Page({
  data: {
    petId: null,
    healthStats: {}
  },
  onLoad: function(options) {
    this.setData({ petId: options.id });
    this.loadHealthStats();
  },
  loadHealthStats: function() {
    wx.request({
      url: `http://localhost:5000/api/pets/${this.data.petId}/health`,
      method: 'GET',
      success: res => {
        this.setData({ healthStats: res.data });
      },
      fail: err => {
        console.error('获取健康数据失败:', err);
        wx.showToast({
          title: '获取健康数据失败',
          icon: 'none'
        });
      }
    });
  }
})