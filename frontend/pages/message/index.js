Page({
  data: {
    systemNotice: {
      unread: 3,
      lastTime: '12:30'
    },
    chatList: [
      {
        id: 1,
        avatar: '/assets/avatars/user1.jpg',
        name: '张医生',
        lastMsg: { content: '您预约的体检时间已确认', time: '10:30' },
        unread: 2
      },
      {
        id: 2,
        avatar: '/assets/avatars/user2.jpg',
        name: '宠物美容院',
        lastMsg: { content: '本周六有优惠活动', time: '昨天' },
        unread: 0
      }
    ]
  },

  goToSystemNotice() {
    wx.navigateTo({
      url: '/pages/system-notice/index'
    });
  },

  goToChat(e) {
    const chatId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/chat/index?id=${chatId}`
    });
  },
  
  goToSearch() {
    wx.navigateTo({
      url: '/pages/search/index'
    });
  }
})