// E:\宠物小程序\1\frontend\pages\health\chart.js
Page({
  data: {
    weightData: [18.5, 19.0, 18.8, 19.2], // 示例数据
    tempData: [38.2, 38.5, 38.3, 38.4],
    dates: ['周一', '周二', '周三', '周四'],
    canvasWidth: 428,
    canvasHeight: 200
  },

  onLoad() {
    this.loadHealthData();
  },

  onReady() {
    this.drawChart();
  },

  loadHealthData() {
    wx.showLoading({ title: '加载中...' });
    // 模拟API请求
    setTimeout(() => {
      this.setData({
        weightData: [18.5, 19.0, 18.8, 19.2, 19.5],
        tempData: [38.2, 38.5, 38.3, 38.4, 38.6],
        dates: ['9/1', '9/2', '9/3', '9/4', '9/5']
      }, () => {
        wx.hideLoading();
        this.drawChart();
      });
    }, 1000);
  },

  drawChart() {
    const ctx = wx.createCanvasContext('healthChart');
    const { weightData, tempData, dates, canvasWidth, canvasHeight } = this.data;
    
    // 1. 绘制背景
    ctx.setFillStyle('#FFFFFF');
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // 2. 绘制坐标轴
    ctx.setStrokeStyle('#CCCCCC');
    ctx.setLineWidth(1);
    
    // X轴
    ctx.moveTo(30, canvasHeight - 30);
    ctx.lineTo(canvasWidth - 20, canvasHeight - 30);
    
    // Y轴
    ctx.moveTo(30, 20);
    ctx.lineTo(30, canvasHeight - 30);
    ctx.stroke();
    
    // 3. 绘制体重折线（绿色）
    this.drawLineChart(ctx, weightData, '#07C160', '体重(kg)');
    
    // 4. 绘制体温折线（橙色）
    this.drawLineChart(ctx, tempData, '#FF9933', '体温(℃)');
    
    // 5. 绘制X轴标签
    dates.forEach((date, index) => {
      const x = 50 + (index * (canvasWidth - 80) / (dates.length - 1));
      ctx.setFontSize(10);
      ctx.setFillStyle('#666666');
      ctx.fillText(date, x - 10, canvasHeight - 10);
    });
    
    ctx.draw();
  },

  drawLineChart(ctx, data, color, label) {
    const { canvasWidth, canvasHeight } = this.data;
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    
    // 绘制折线
    ctx.beginPath();
    ctx.setStrokeStyle(color);
    ctx.setLineWidth(2);
    
    data.forEach((value, index) => {
      const x = 50 + (index * (canvasWidth - 80) / (data.length - 1));
      const y = canvasHeight - 40 - ((value - minValue) / range) * (canvasHeight - 80);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // 绘制数据点
    data.forEach((value, index) => {
      const x = 50 + (index * (canvasWidth - 80) / (data.length - 1));
      const y = canvasHeight - 40 - ((value - minValue) / range) * (canvasHeight - 80);
      
      ctx.beginPath();
      ctx.setFillStyle(color);
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    // 绘制图例
    ctx.setFontSize(12);
    ctx.setFillStyle(color);
    ctx.fillText(label, canvasWidth - 80, 20);
  },

  // 以下保持原有功能不变
  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  },
  
  showWeightDetail() {
    wx.navigateTo({
      url: `/pages/health/weight-detail?data=${JSON.stringify({
        title: '体重记录',
        data: this.data.weightData,
        dates: this.data.dates,
        unit: 'kg'
      })}`
    });
  },
  
  showTempDetail() {
    wx.navigateTo({
      url: `/pages/health/temp-detail?data=${JSON.stringify({
        title: '体温记录',
        data: this.data.tempData,
        dates: this.data.dates,
        unit: '℃'
      })}`
    });
  }
});