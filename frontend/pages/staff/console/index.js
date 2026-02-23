Page({
  data: {
    menus: [
      { icon: 'assignment', name: '服务分配', path: '../service_assignment/index' },
      { icon: 'pets', name: '宠物管理', path: '../pet_management/index' },
      { icon: 'notifications', name: '通知管理', path: '../notifications/index' },
      { icon: 'schedule', name: '排班管理', path: '../schedule_management/index' },
      { icon: 'records', name: '健康档案', path: '../health_records/index' }
    ]
  },
  
  onLoad() {
    // 权限验证
    if (wx.getStorageSync('userRole') !== 'staff') {
      wx.redirectTo({ url: '/pages/unauthorized/index' })
    }
  },
  
  navigateTo(e) {
    const path = e.currentTarget.dataset.path
    wx.navigateTo({
      url: path,
      fail(err) {
        console.error('跳转失败:', err)
        wx.showToast({ title: '功能开发中', icon: 'none' })
      }
    })
  }
})