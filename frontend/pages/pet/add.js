Page({
  data: {
    photo: '',
    gender: ''
  },
  chooseImage: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        this.setData({
          photo: res.tempFilePaths[0]
        })
      }
    })
  },
  bindGenderChange: function(e) {
    this.setData({
      gender: e.detail.value
    })
  },
  submitForm: function(e) {
    const formData = e.detail.value
    formData.gender = this.data.gender
    formData.photo = this.data.photo
    formData.user_id = 1 // 临时使用测试用户ID

    wx.request({
      url: 'http://localhost:5000/api/pets',
      method: 'POST',
      data: formData,
      success: res => {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
        wx.navigateBack()
      },
      fail: err => {
        console.error('添加宠物失败:', err)
        wx.showToast({
          title: '添加失败',
          icon: 'none'
        })
      }
    })
  }
})