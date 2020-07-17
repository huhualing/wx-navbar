# 微信小程序自定义导航栏

  特色:

  + 灵活新高
  + 完美兼容所有手机
  + 兼容页面滚动渐现展示
  + 可指定要导好内容

## 引入组件

  在 page.json 中引入组件
  

``` 
    "usingComponents": {
    "nav-bar": "/components/navbar/navbar"
  }
  ```

  在 page.wxml 中引入组件
  

``` 
   <nav-bar navbar-data="{{navbarData}}" id="navBar">
      <view style="width:100rpx">自定义</view>
    </nav-bar>
  ```

  在 page.js 中配置参数

  

``` 
   data: {
    navbarData: {
      isBottom: true,  //是否需要broder
      isOpacity:true, //是否改变透明的 
      backColor:'white',  //状态栏的默认颜色
      opacity: 0,  //导航栏透明度   --- 配合 isOpacity 一起使用
      showCapsule: 1, //左上角图标   1.胶囊模式    2.表示自定义模式  3.表示无图标模式
      title: '首页', //导航栏 中间的标题
  },
  ```

## 页面滚动渐现

在 page.js 中设置监听

  

``` 
  //绑定navbar

 onLoad: function () {
    this.navBar = this.selectComponent("#navBar");
  },

//页面滚动监听
  onPageScroll:function(obj){
    const { scrollTop } = obj;
  this.navBar.initOpacity(scrollTop);
  }
  ```

## 属性列表

属性	类型	默认值	必填	说明

|  属性   |  类型   |  默认值  |  必填   |   说明    |
|-------|-------|-------|-------|-------|
| isBottom | boolean | false |否|是否需要底边|
| isOpacity | boolean | false |否|是否改变透明的 需要配合透明度一起使用|
| opacity | number | 1 |否|导航栏透明度 需要配合 isOpacity 一起使用|
| title | string | '' |否|导航栏标题|
| showCapsule | number | 3 |否|左上角图标模式  1.胶囊模式    2.表示自定义模式  3.表示无图标模式 |
| backColor | string | 'black' |否| 渐变模式时 状态栏改变的颜色|

## 注意事项
 + 左侧图标默认使用iconfont 如需要修改样式可在app.wxss 中引入;
 + 如果需要修改滚动渐变频率可以在组件中_turnOpacity中修改tip;
 + 目前暂不支持监听按钮点击事件 若需要可自行修改组件
 ## 问题更新

 + 修复了部分左上方有摄像头的android手机 造成左胶囊样式定位错误问题
 ## END

 + 如果有什么问题或意见的欢迎打扰;
 + 开发不易,希望能点个star :star: 支持 :pray::pray::pray::pray: