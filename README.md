# 订阅阅读器测试

## 项目实现

通过使用Jasmine测试框架测试程序页面每一个交互

## 具体实现
* 测试 `allFeeds` 变量被定义了而且不是空的
```js
it('are defined', function() {
    expect(allFeeds).toBeDefined();
    expect(allFeeds.length).not.toBe(0);
});
```

* 测试遍历 `allFeeds` 对象里面的所有的源来保证有链接字段而且链接不是空的
```js
it('all url exist and not empty', function(){
    allFeeds.forEach(function(data){
        expect(data.url).toBeDefined();
        expect(data.url.length).not.toBe(0);
    });

});
```

* 测试遍历 `allFeeds` 对象里面的所有的源来保证有名字字段而且不是空的
```js 
it('all name exist and not empty', function(){
    allFeeds.forEach(function(data){
        expect(data.name).toBeDefined();
        expect(data.name.length).not.toBe(0);
    });
});
```

* 测试菜单元素默认是隐藏的
```js 
it('slide-menu hidden by default', function(){
    expect($('.menu-hidden').length).not.toBe(0);
});
```

* 测试保证当菜单图标被点击的时候菜单会切换可见状态
```js 
it('click menu-icon-link switch the visible of slide-menu', function(){
    //第一次点击按钮测试菜单显示
    $('.menu-icon-link').click();
    expect($('.menu-hidden').length).toBe(0);

    //第二次点击按钮测试菜单隐藏
    $('.menu-icon-link').click();
    expect($('.menu-hidden').length).not.toBe(0);
});
```

* 测试保证 `loadFeed` 函数被调用而且工作正常
```js 
var entryLength;

beforeEach(function(done){
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; 
    //运行loadFeed函数取得初始化后页面内容长度
    loadFeed(0, function(){
        entryLength = $('.feed .entry').length;
        done();
    });
});

it('should be Initial loadFeed', function(done){
    //测试长度不为0
    expect(entryLength).not.toBe(0);
    done();
}); 

afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
```

* 测试保证当用 `loadFeed` 函数加载一个新源的时候内容会真的改变
```js 
var feedUdacity, 
    feedCss;

beforeEach(function(done){
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    //运行loadFeed函数获取Udacity页面内容
    loadFeed(0, function(){
        feedUdacity = $('.feed').html();
        done();
    });
    //运行loadFeed函数获取CSS页面内容
    loadFeed(1, function(){
        feedCss = $('.feed').html();
        done();
    });

});
/* TODO:
 * 测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
 */
it('content changed success', function(done){
    //测试Udacity页面内容与CSS页面内容不相等，确保页面确实切换了
    expect(feedCss).not.toEqual(feedUdacity);
    done();
});

afterEach(function(){
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
```
