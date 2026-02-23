Page({
  data: {
    servicePhone: '400-123-4567'
  },

  callCustomerService() {
    wx.makePhoneCall({
      phoneNumber: this.data.servicePhone
    })
  },

  startOnlineChat() {
    wx.navigateTo({
      url: '/pages/service/chat/index'
    })
  }
})