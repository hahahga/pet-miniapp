Page({
  data: {
    notifications: [
      {
        id: 1,
        icon: "/assets/icons/notice-system.png",
        title: "体检报告已生成",
        content: "您的宠物【豆豆】的年度体检报告已生成，点击查看详细结果",
        time: "2023-06-18 10:30",
        read: false
      },
      {
        id: 2,
        icon: "/assets/icons/notice-vaccine.png",
        title: "疫苗接种提醒",
        content: "【球球】的狂犬疫苗将于7月15日到期，请及时预约接种",
        time: "2023-06-15 14:20",
        read: true
      },
      {
        id: 3,
        icon: "/assets/icons/notice-appointment.png",
        title: "预约成功通知",
        content: "您已成功预约6月20日10:00的宠物美容服务",
        time: "2023-06-10 09:15",
        read: true
      }
    ]
  },

  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id;
    const notification = this.data.notifications.find(item => item.id === id);
    
    // 标记为已读
    const notifications = this.data.notifications.map(item => {
      if (item.id === id) {
        return { ...item, read: true };
      }
      return item;
    });
    
    this.setData({ notifications });
    
    wx.navigateTo({
      url: `/pages/notification/detail?id=${id}`,
      success: () => {
        wx.setStorageSync('currentNotification', notification);
      }
    });
  },

  onLoad() {
    // 实际开发中这里应该请求接口获取数据
    // wx.request({...})
  }
});