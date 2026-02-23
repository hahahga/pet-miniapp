Page({
  data: {
    searchHistory: ['宠物医生张', '金毛交流群'],
    recommendUsers: [
      {
        id: 1001,
        name: '柯基主人',
        avatar: '/assets/avatars/user3.jpg',
        desc: '3位共同好友'
      },
      {
        id: 1002,
        name: '布偶猫舍',
        avatar: '/assets/avatars/user4.jpg',
        desc: '宠物店'
      }
    ]
  },

  onSearchInput(e) {
    console.log('搜索输入:', e.detail.value)
  },

  addContact(e) {
    const userId = e.currentTarget.dataset.id
    wx.showToast({
      title: '好友请求已发送',
      icon: 'success'
    })
  },

  clearHistory() {
    this.setData({ searchHistory: [] })
  },

  retrySearch(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({ searchValue: keyword })
    // 实际项目这里应触发搜索
  }
})