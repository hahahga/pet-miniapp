Page({
  data: {
    userInfo: {},
    pets: []
  },
  onLoad: function() {
    this.getUserInfo();
    this.getPets();
  },
  getUserInfo: function() {
    // 模拟用户数据
    this.setData({
      userInfo: {
        name: '宠物主人',
        avatar: '/assets/avatar.jpg',
        joinDate: '2023-01-01'
      }
    });
  },
  getPets: function() {
    // 模拟宠物数据
    this.setData({
      pets: [
        { id: 1, name: '小白', type: '狗', age: 2 },
        { id: 2, name: '小花', type: '猫', age: 1 }
      ]
    });
  },
  editProfile: function() {
    wx.navigateTo({
      url: '/pages/index/edit'
    });
  }
})