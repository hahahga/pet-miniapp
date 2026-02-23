// 宠物档案页逻辑
Page({
  data: {
    searchValue: '',
    pets: [
      {
        id: 1,
        name: "豆豆",
        breed: "金毛犬",
        ownerName: "张医生",
        healthStatus: "healthy",
        avatar: "/assets/pets/dog1.jpg",
        medicalRecords: ["2023-05-15 完成年度体检"]
      },
      {
        id: 2,
        name: "球球",
        breed: "布偶猫",
        ownerName: "李女士",
        healthStatus: "need-care",
        avatar: "/assets/pets/cat1.jpg",
        medicalRecords: ["2023-06-10 皮肤病复查"]
      }
    ]
  },

  // 计算属性（过滤宠物列表）
  get filteredPets() {
    const keyword = this.data.searchValue.toLowerCase()
    return this.data.pets.filter(pet => 
      pet.name.toLowerCase().includes(keyword) || 
      pet.ownerName.toLowerCase().includes(keyword)
    )
  },

  // 搜索处理
  handleSearch(e) {
    this.setData({ searchValue: e.detail.value })
  },

  // 查看详情
  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id
    const pet = this.data.pets.find(p => p.id === id)
    wx.navigateTo({
      url: `/pages/pet/detail?id=${id}`,
      success: () => {
        wx.setStorageSync('currentPet', pet)
      }
    })
  },

  // 添加宠物
  navigateToAdd() {
    wx.navigateTo({
      url: '/pages/pet/add'
    })
  },

  onLoad() {
    // 实际开发中替换为网络请求
    // wx.request({
    //   url: 'https://api.example.com/pets',
    //   success: res => this.setData({ pets: res.data })
    // })
  }
})