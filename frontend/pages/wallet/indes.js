Page({
  data: {
    transactions: [
      {
        id: 1,
        title: '宠物美容消费',
        time: '今天 14:30',
        amount: '-¥128',
        type: 'expense',
        icon: '/assets/icons/expense.png'
      },
      {
        id: 2,
        title: '账户充值',
        time: '昨天 10:15',
        amount: '+¥500',
        type: 'income',
        icon: '/assets/icons/income.png'
      }
    ]
  },

  navigateToRecharge() {
    wx.navigateTo({
      url: '/pages/wallet/recharge/index'
    })
  },

  navigateToWithdraw() {
    wx.navigateTo({
      url: '/pages/wallet/withdraw/index'
    })
  }
})