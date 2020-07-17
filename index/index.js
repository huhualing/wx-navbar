const app = getApp()

Page({
  data: {
    navbarData: {
      isBottom: true,  //是否需要broder
      isOpacity:true, //是否改变透明的 
      backColor:'white',  //状态栏的默认颜色
      opacity: 0,  //导航栏透明度   --- 配合 isOpacity 一起使用
      showCapsule: 1, //是否显示左上角图标   1.胶囊模式    2.表示自定义模式  3.表示无图标模式
      title: '首页', //导航栏 中间的标题
  },
  },
  onLoad: function () {
    this.navBar = this.selectComponent("#navBar");
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  onPageScroll:function(obj){
    const {
      scrollTop
  } = obj;
  this.navBar.initOpacity(scrollTop);
  }
})
