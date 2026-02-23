Page({
  data: {
    posts: []
  },
  onLoad: function() {
    // 获取社交动态数据
    this.getPosts();
  },
  getPosts: function() {
    // 模拟数据
    this.setData({
      posts: [
        { id: 1, username: '宠物主人1', time: '10分钟前', content: '今天带狗狗去公园玩', avatar: '/assets/avatar1.jpg', image: '/assets/post1.jpg' },
        { id: 2, username: '宠物主人2', time: '1小时前', content: '猫咪的新玩具', avatar: '/assets/avatar2.jpg', image: '/assets/post2.jpg' }
      ]
    });
  },
  likePost: function(e) {
    const postId = e.currentTarget.dataset.id;
    console.log('点赞帖子:', postId);
  },
  commentPost: function(e) {
    const postId = e.currentTarget.dataset.id;
    console.log('评论帖子:', postId);
  },
  createPost: function() {
    wx.navigateTo({
      url: '/pages/social/create'
    });
  }
})