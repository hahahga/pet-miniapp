Page({
  data: {
    services: [],
    ratings: [1, 2, 3, 4, 5]
  },
  onLoad: function() {
    this.getServices();
  },
  getServices: function() {
    // 模拟服务数据
    this.setData({
      services: [
        { id: 1, name: '宠物美容', provider: '宠物美容中心' },
        { id: 2, name: '宠物医疗', provider: '宠物医院' }
      ]
    });
  },
  submitReview: function(e) {
    const serviceId = e.currentTarget.dataset.id;
    const rating = e.detail.value;
    console.log('提交评价:', serviceId, rating);
  }
})