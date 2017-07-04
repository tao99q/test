# 同源(同域)/非同源(跨域)
## 同源(同域)
- 当前页面的URL:http://localhost:1234/index.html
- 获取数据的URL:http://localhost:1234/getUserList

可以使用AJAX获取数据
## 非同源(跨域)
- 当前页面的URL:http://localhost:1234/index.html
- 获取数据的URL:http://matchweb.sports.qq.com/kbs/hotMatchList

不可以使用AJAX请求
## 判断是否同源
页面地址和获取数据URL地址比较
1. 传输协议(http、https、ftp)
2. 域名 
3. 端口号

三个都相同就是同源，有一个不同就是跨域,跨域是不可以使用AJAX的

## 跨域请求使用场景
1. 在自己网站上展示其它网站上的数据，需要在服务器上获取其它网站服务器的数据，如：微博，腾讯等第三方平台的数据，这就是跨域。
2. 项目使用多台服务器管理，例如：资源文件在A服务器，数据在B服务器
3. 二级域名sports.qq.com向一级域名www.qq.com获取数据也是跨域

## 跨域请求方式
1. JSONP
2. iframe
3. postMessage
4. document.domain
5. crossDomain
...

一般使用JSONP
### 什么是JSONP，JSONP原理
JSON with padding(填充式 JSON 或参数式 JSON)
script标签是没有同源和非同源之分，不受限制地从其他域加载资源（script标签可以向其它服务器发送请求，并且其它服务器也可以接收到请求，把需要的内返回给客户端面）其它标签有：**link img audio video iframe**
JSONP原理：利用script不存在跨域限制，我们把需要的请求数据的地址赋值src属性，这样就可以从别人的服务上获取响应的数据，还需要 在JS中把浏览器获取出来的数据得到，来做后续的操作

JSONP请求是GET方式

JQuery中jsonp请求jquery默认给url后面加一个变量来清缓存
JQuery处理josnp请求时，会默认在请求地址后面创建一个callback=JQuery11113232_32434,这是一个随机生成的函数，



