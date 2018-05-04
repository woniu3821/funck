# BlOGSCN-工作管理前台

>

## 体验步骤

```bash
# 安装
npm install

# 运行
npm run dev

# 打包
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目介绍

> 基于流行 vue 及 vue 全家桶、Element-UI、vue-socket.io-extended、axios 等流行的框架（库）打造的工作管理框架，可扩展性高，开发方便便捷。

## 功能实现

### 基础功能

* 登录，注册（用户名重复检测），找回密码（邮件安全验证，重置连接一次性使用，5 分钟内有效），图形验证码

### 任务管理

* 任务倒计时（任务详情会有剩余时间展示），任务跟踪（创建人可实时查看任务接收和完成情况），任务统计（个人、领导区别统计），任务通知（前台实时通知，邮件通知），任务创建，任务修改

### 日志管理

* 富文本编辑器，工作日志（支持图片上传）

### 通知中心

* 通知中心（掌握待完成、待接收数量），基于 vue-socket.io-extended 实时掌控工作情况，我在 vuex 单独分出了 module，可以监听后台 emit 的事件，在 actions 和 mutation 方便的对状态进行管理

### 权限管理

* 精确到个人的权限管理，支持个人和批量修改。可控制用户可见页面，调整页面顺序，页面中某项功能权限。组织管理基于树状结构，无限级分类，echarts 树状图展示一目了然。用户统计，观察用户增减情况。

### 个人中心

* 重置密码（原密码验证），工作邮箱设置（设置可通过邮件接收工作通知），个人头像修改，目前只做了几个基础的。其实还可以定制页面颜色。

#### 补充说明

> 页面数据请求时会进行 token 验证，某些使用了 session 验证。开发采用的前后台分离的模式。后台的话可以[点击此处](https://github.com/woniu3821/new)查看说明.由于完全是个人开发过程中遇到了很多的坑，还好有前人指路。为了尊重版权和原创特此附上部分连接
> [harsima 的博客](https://blog.csdn.net/harsima/article/details/77949623)、[vue-socket.io-extended 插件作者](https://www.npmjs.com/package/vue-socket.io-extended)、[element-ui 官网](http://element-cn.eleme.io/#/zh-CN)、[Vuex](https://vuex.vuejs.org/zh-cn/intro.html)。

### 写在后面

> 本人很喜欢挑战，喜欢那种拨云见日的快感。后面还会按照自己的想法开发个移动商城，在开发个个人博客。我还是个菜鸟，需要学习的还有很多，现在坚持每天打代码。希望我多年以后还可以一直打代码。能看到自己成长的痕迹。如果有志同道合的伙伴欢迎加我 qq 或者邮件交流讨论。

```bash
QQ : 643556567

Emial: cuimmcan@qq.com
```

![avatar](https://pic2.zhimg.com/80/v2-77b9128c9fbce90113cad063b6e60591_hd.jpg)
