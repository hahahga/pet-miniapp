Page({
  data: {
    pets: [
      {
        id: 1,
        avatar: "/assets/pets/doudou.jpg",
        name: "豆豆",
        ownerName: "张医生",
        status: "健康",
        medicalHistory: ["2023-05-15 年度体检", "2023-03-10 疫苗接种"]
      },
      {
        id: 2,
        avatar: "/assets/pets/qiqiu.jpg",
        name: "球球",
        ownerName: "李女士",
        status: "术后恢复",
        medicalHistory: ["2023-06-05 绝育手术", "2023-05-20 术前检查"]
      }
    ],
    searchValue: ""
  },

  // 搜索宠物
  searchPets(e) {
    this.setData({
      searchValue: e.detail.value
    });
    // 实际开发中这里应该请求接口搜索
  },

  // 查看详情
  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/pet/detail?id=${id}`,
      success: () => {
        wx.setStorageSync('currentPet', this.data.pets.find(p => p.id === id));
      }
    });
  },

  // 添加宠物
  addPet() {
    wx.navigateTo({
      url: '/pages/pet/add'
    });
  },

  onLoad() {
    // 实际开发中这里应该请求接口获取数据
    // wx.request({...})
  }
});