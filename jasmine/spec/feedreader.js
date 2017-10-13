/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在应用上面运行的测试。
 */

/* 把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {

    /* TODO:  "RSS Feeds" 的测试用例 */
    describe('RSS Feeds', function() {
        /* TODO:
         * 测试 allFeeds 变量被定义了而且不是空的。
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO:
         * 测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
        it('all url exist and not empty', function(){
            allFeeds.forEach(function(data){
                expect(data.url).toBeDefined();
                expect(data.url.length).not.toBe(0);
            });

        });

        /* TODO:
         * 测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
        it('all name exist and not empty', function(){
            allFeeds.forEach(function(data){
                expect(data.name).toBeDefined();
                expect(data.name.length).not.toBe(0);
            });
        });

    });


    /* TODO:  "The menu" 的测试用例 */
    describe('The menu', function(){

        /* TODO:
         * 测试菜单元素默认是隐藏的。
         */
        it('slide-menu hidden by default', function(){
            expect($('.menu-hidden').length).not.toBe(0);
        });

         /* TODO:
          * 测试保证当菜单图标被点击的时候菜单会切换可见状态。 
          * 当点击图标的时候菜单是否显示，再次点击的时候是否隐藏。
          */
        it('click menu-icon-link switch the visible of slide-menu', function(){
            //第一次点击按钮测试菜单显示
            $('.menu-icon-link').click();
            expect($('.menu-hidden').length).toBe(0);

            //第二次点击按钮测试菜单隐藏
            $('.menu-icon-link').click();
            expect($('.menu-hidden').length).not.toBe(0);
        });
    });
    /* TODO:  "Initial Entries" 的测试用例 */
    describe('Initial Entries', function(){

        /* TODO:
         * 测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         */
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
    });
    /* TODO:  "New Feed Selection" 的测试用例 */
    describe('New Feed Selection', function(){
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
    });
        
}());
