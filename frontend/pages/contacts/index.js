const db = wx.cloud.database()

Page({
  data: {
    allContacts: [],      // 所有联系人
    filteredContacts: [], // 筛选后的联系人
    indexLetters: [],     // 字母索引
    activeIndex: '',      // 当前选中字母
    searchText: ''       // 搜索关键词
  },

  onLoad() {
    this.loadContacts()
  },

  // 加载联系人
  async loadContacts() {
    wx.showLoading({ title: '加载中' })
    try {
      const res = await db.collection('contacts')
        .where({ isDeleted: false })
        .orderBy('pinyin', 'asc')
        .get()

      const contacts = this.processContacts(res.data)
      const letters = [...new Set(contacts.map(item => item.letter))]

      this.setData({
        allContacts: contacts,
        filteredContacts: contacts,
        indexLetters: letters
      })
    } catch (e) {
      wx.showToast({ title: '加载失败', icon: 'none' })
    }
    wx.hideLoading()
  },

  // 处理联系人数据
  processContacts(contacts) {
    // 生成字母分类
    return contacts.map(item => {
      const firstChar = item.pinyin[0].toUpperCase()
      return {
        ...item,
        letter: /[A-Z]/.test(firstChar) ? firstChar : '#'
      }
    }).reduce((acc, cur) => {
      const lastGroup = acc[acc.length - 1]
      if (lastGroup && lastGroup.letter === cur.letter) {
        lastGroup.list.push(cur)
      } else {
        acc.push({ letter: cur.letter, list: [cur] })
      }
      return acc
    }, [])
  },

  // 搜索联系人
  onSearch(e) {
    const keyword = e.detail.value.toLowerCase()
    this.setData({
      searchText: keyword,
      filteredContacts: this.data.allContacts.filter(group => 
        group.list.some(item => 
          item.name.includes(keyword) || 
          item.phone.includes(keyword)
        )
      ).map(group => ({
        ...group,
        list: group.list.filter(item => 
          item.name.includes(keyword) || 
          item.phone.includes(keyword)
        )
      }))
    })
  },

  // 跳转到字母索引
  jumpToIndex(e) {
    const letter = e.currentTarget.dataset.item
    this.setData({ activeIndex: letter })
    wx.pageScrollTo({
      selector: `.letter-${letter}`,
      duration: 300
    })
  },

  // 删除联系人
  deleteContact(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该联系人吗？',
      success: async res => {
        if (res.confirm) {
          await db.collection('contacts').doc(id).update({
            data: { isDeleted: true }
          })
          this.loadContacts()
        }
      }
    })
  },

  // 新增功能开始 =================================
  // 添加好友跳转（已存在，保持原样）
  addFriend() {
    wx.navigateTo({ 
      url: '/pages/add_friend/index',
      success: () => console.log('跳转添加好友页成功'),
      fail: (err) => console.error('跳转失败:', err)
    })
  },

  // 群聊跳转（已存在，保持原样）
  showGroups() {
    wx.navigateTo({ 
      url: '/pages/group/index',
      success: () => console.log('跳转群聊页成功'),
      fail: (err) => console.error('跳转失败:', err)
    })
  },

  // 新增底部菜单功能
  showAddMenu() {
    wx.showActionSheet({
      itemList: ['添加朋友', '创建群聊'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.addFriend() // 复用已有方法
        } else if (res.tapIndex === 1) {
          this.createGroup() // 新增方法
        }
      },
      fail: (err) => console.error('菜单打开失败:', err)
    })
  },

  // 新增创建群聊方法
  createGroup() {
    wx.navigateTo({
      url: '/pages/group/index',
      success: () => console.log('跳转创建群聊页成功'),
      fail: (err) => console.error('跳转失败:', err)
    })
  }
  // 新增功能结束 =================================
})