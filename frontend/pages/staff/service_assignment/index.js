Page({
  data: {
    statusOptions: ['全部状态', '待分配', '进行中', '已完成'],
    statusIndex: 0,
    services: [
      {
        id: 1,
        title: "年度体检服务",
        petName: "豆豆",
        ownerName: "张医生",
        status: "待分配",
        detail: "需在6月30日前完成"
      },
      {
        id: 2,
        title: "疫苗接种",
        petName: "球球",
        ownerName: "李女士",
        status: "进行中",
        detail: "已预约6月20日10:00"
      },
      {
        id: 3,
        title: "绝育手术",
        petName: "小白",
        ownerName: "王先生",
        status: "已完成",
        detail: "术后恢复良好"
      }
    ]
  },

  // 状态筛选
  filterByStatus(e) {
    this.setData({
      statusIndex: e.detail.value
    })
    // 实际开发中这里应该请求接口筛选数据
  },

  // 查看详情
  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/staff/schedule_management/detail?id=${id}`,
      success: () => {
        wx.setStorageSync('currentService', this.data.services.find(s => s.id === id))
      }
    })
  },

  // 分配服务
  assignService(e) {
    e.stopPropagation()
    const id = e.currentTarget.dataset.id
    wx.showActionSheet({
      itemList: ['张医生', '李医生', '王护士'],
      success: (res) => {
        const services = this.data.services.map(item => {
          if (item.id === id) {
            return {
              ...item,
              status: "已分配",
              assignee: ['张医生', '李医生', '王护士'][res.tapIndex]
            }
          }
          return item
        })
        this.setData({ services })
        wx.showToast({ title: '分配成功' })
      }
    })
  },

  onLoad() {
    // 实际开发中这里应该请求接口获取数据
    // wx.request({...})
  }
})