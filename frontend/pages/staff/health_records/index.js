Page({
  data: {
    petOptions: ['全部宠物', '豆豆', '球球', '小白'],
    petIndex: 0,
    records: [
      {
        id: 1,
        date: '2023-06-15',
        petName: '豆豆',
        type: '年度体检',
        status: '已完成',
        detail: '各项指标正常，体重5.2kg'
      },
      {
        id: 2,
        date: '2023-06-10',
        petName: '球球',
        type: '疫苗接种',
        status: '已预约',
        detail: '预约6月20日接种狂犬疫苗'
      },
      {
        id: 3,
        date: '2023-06-05',
        petName: '小白',
        type: '皮肤病复查',
        status: '待复查',
        detail: '需继续用药一周后复查'
      }
    ]
  },

  // 筛选宠物
  filterByPet(e) {
    this.setData({
      petIndex: e.detail.value
    })
    // 实际开发中这里应该请求接口筛选数据
  },

  // 查看详情
  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id
    const record = this.data.records.find(item => item.id === id)
    wx.navigateTo({
      url: `/pages/health-records/detail?id=${id}`,
      success: () => {
        wx.setStorageSync('currentRecord', record)
      }
    })
  },

  // 更新记录
  updateRecord(e) {
    e.stopPropagation()
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/health-records/update?id=${id}`
    })
  },

  // 添加记录
  addRecord() {
    wx.navigateTo({
      url: '/pages/health-records/add'
    })
  },

  onLoad() {
    // 实际开发中这里应该请求接口获取数据
    // wx.request({...})
  }
})