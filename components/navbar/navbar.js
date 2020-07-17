// components/navBar/navBar.js

/*获取当前页url*/
function getCurrentPageUrl() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  return url
}

let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navbarData: { //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      opacity: 1,
      backColor: 'black',
      shadow: false, // 阴影
      value: {},
      isBottom: true, //是否要border
      navBack: false,
      pageTitle: false,
      isOpacity: false, //是否改变透明的
      isSearhIcon: false, //是否改变查找图标
      isTurnTitle: false, //是否改变中间文字          
      observer: function (newVal, oldVal) { },
      isSearch: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
    setOpacity: null,
    oldOpacity: 0,
    navIcon: {},
  },
  attached: function () {

    const res = wx.getMenuButtonBoundingClientRect();
    const info = wx.getSystemInfoSync();
    const pages = getCurrentPages();
    this.setData({
      height: info.statusBarHeight + 46,
      navIcon: res
    })
    if (pages.length > 1) {
      this.setData({
        navBack: true,
      })
    }

  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 返回上一页面
    _navback: function () {

      const {
        isfromB
      } = this.properties.navbarData;
      if (isfromB) {
        wx.navigateBackMiniProgram()

      } else {
        wx.navigateBack()
      }


    },
    initOpacity: function (scrollTop) {
      let {
        backColor,
        navbarData,
        navbarData: {
          isOpacity,
          isSearhIcon,
          isTurnTitle,
          opacity,
          isSearch,
          pageTitle
        },
        height,
        setOpacity,
      } = this.data;

      if (isOpacity) {
        this._turnOpacity(scrollTop, navbarData, height, opacity);
        this._turnColor(navbarData, setOpacity, backColor);
      }
      if (isSearhIcon) {
        this._turnSearhIcon(isSearch, height, navbarData);
      }

      if (isTurnTitle) {
        this._turnTitle(pageTitle, height, navbarData);
      }

    },
    //改变透明的
    _turnOpacity: function (scrollTop, navbarData, height, opacity) {
      //修改透明度 
      if (scrollTop === 0) {
        navbarData.opacity = 0;
        this.setData({
          navbarData
        });
      } else if (height > scrollTop) {
        opacity = (scrollTop / height).toFixed(1);
        navbarData.opacity = opacity;
        this.setData({
          navbarData,
          oldOpacity: opacity
        });
      } else if (scrollTop >= height && opacity < 1) {
        navbarData.opacity = 1;
        this.setData({
          navbarData,
          oldOpacity: 1
        });
      }
    },
    //改变背景颜色
    _turnColor: function (navbarData, setOpacity, backColor) {
      //修改背景色
      if (navbarData.opacity && setOpacity !== 1) {
        backColor === "black" ? wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#ffffff'
        }) : wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#000000'
        })
        this.setData({
          setOpacity: 1
        });
      } else if (navbarData.opacity === 0 && setOpacity !== 0) {
        backColor === "black" ? wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#000000'
        }) : wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#ffffff'
        });
        this.setData({
          setOpacity: 0
        });
      }
    },
    //改变查找图标
    _turnSearhIcon: function (isSearch, height, navbarData) {

      wx.createSelectorQuery().select('#search').boundingClientRect((rect) => {
        if (rect) {
          let bottom = rect.bottom // 节点的下边界坐标
          let avg = bottom - height;
          if (avg <= 0 && !isSearch) {
            navbarData.isSearch = true;
            this.setData({
              navbarData
            });
          } else if (avg > 0 && isSearch) {
            navbarData.isSearch = false
            this.setData({
              navbarData
            });
          }
        }
      }).exec()
    },
    //改变标题
    _turnTitle: function (pageTitle, height, navbarData) {
      //监听修改文字
      console.log("进来了吗")
      wx.createSelectorQuery().select('#searchNav').boundingClientRect((rect) => {
        if (rect) {
          let bottom = rect.bottom // 节点的下边界坐标
          let avg = bottom - height - 2;
          if (avg <= 0 && !pageTitle) {
            navbarData.pageTitle = true;
            this.setData({
              navbarData
            });
          } else if (avg > 0 && pageTitle) {
            navbarData.pageTitle = false
            this.setData({
              navbarData
            });
          }
        }
      }).exec()
    },
    //返回到首页
    _backhome: function () {

      wx.switchTab({
        url: '/pages/index/index',
      })
    },
    _handleClick: function () {
      navigateTo(this, 'detail', `/pages/selectAddress/selectAddress`);
    },
    _onNavgationNewHouse: function () {
      navigateTo(this, 'house', `/pages/loupanList/loupanList`);
    },
    _navSelect: function () {
      const {
        navbarData
      } = this.data;
      const currentPage = getCurrentPageUrl();
      const url = navbarData.navigateTo ? navbarData.navigateTo : '/pages/selectAddress/selectAddress';
      if (currentPage === 'pages/selectList/selectList') {
        wx.navigateBack({
          url: "/pages/selectAddress/selectAddress?id=1"
        });
      } else {
        wx.navigateTo({
          url,
        });
      }
    }
  }
})