Page({
  data: {
    groups: [
      {
        id: 2001,
        name: '金毛交流群',
        avatar: '/assets/group/group1.jpg',
        lastMsg: '小王: 明天公园聚会',
        time: '12:30'
      },
      {
        id: 2002,
        name: '猫咪养护群',
        avatar: '/assets/group/group2.jpg',
        lastMsg: '小李: 新买的猫粮不错',
        time: '昨天'
      }
    ]
  },

  enterGroup(e) {
    const groupId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/chat/group-chat?id=${groupId}`
    })
  },

  createGroup() {
    wx.navigateTo({
      url: '/pages/contacts/select-members'
    })
  }
})