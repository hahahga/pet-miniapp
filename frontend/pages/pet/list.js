Page({
  data: {
    pets: []
  },
  onLoad: function() {
    this.loadPets();
  },
  loadPets: function() {
    wx.request({
      url: 'http://localhost:5000/api/pets',
      method: 'GET',
      success: res => {
        this.setData({ pets: res.data });
      },
      fail: err => {
        console.error('获取宠物列表失败:', err);
        wx.showToast({
          title: '获取宠物列表失败',
          icon: 'none'
        });
      }
    });
  },
  navigateToAddPet: function() {
    wx.navigateTo({
      url: '/pages/pet/add'
    });
  },
  navigateToEditPet: function(e) {
    const petId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/pet/edit?id=${petId}`
    });
  },
  deletePet: function(e) {
    const petId = e.currentTarget.dataset.id;
    wx.request({
      url: `http://localhost:5000/api/pets/${petId}`,
      method: 'DELETE',
      success: res => {
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        });
        this.loadPets();
      },
      fail: err => {
        console.error('删除宠物失败:', err);
        wx.showToast({
          title: '删除失败',
          icon: 'none'
        });
      }
    });
  }
})