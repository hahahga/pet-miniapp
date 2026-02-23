Page({
  data: {
    longitude: 116.404,
    latitude: 39.915,
    activeTab: 'hospital',
    serviceTypes: [
      { id: 'hospital', name: '宠物医院' },
      { id: 'shop', name: '宠物商店' },
      { id: 'grooming', name: '美容服务' },
      { id: 'hotel', name: '宠物寄养' }
    ],
    services: [
      {
        id: 1,
        name: '爱心宠物医院',
        distance: 1.2,
        address: '朝阳区建国路88号',
        image: '/assets/images/hospital.jpg',
        tags: ['24小时', '专家坐诊']
      },
      {
        id: 2,
        name: '萌宠用品店',
        distance: 0.8,
        address: '朝阳区大望路32号',
        image: '/assets/images/shop.jpg',
        tags: ['用品齐全', '会员折扣']
      }
    ],
    markers: [
      {
        id: 1,
        longitude: 116.404,
        latitude: 39.915,
        iconPath: '/assets/icons/marker.png',
        width: 30,
        height: 30
      }
    ]
  },

  onLoad() {
    this.getLocation()
  },

  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
  },

  switchTab(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.id
    })
    // 这里实际项目中应该根据tab切换请求不同数据
  }
})