# Grellow 
---
一个简洁、美观、高效的任务管理工具 
基于`react`+`Django`
(目前后端仍在开发中)

---

### 想法来源

记录每日的任务是学习生活中重要的环节。我使用过很多任务管理的应用，但是都不能让我满意：过于简陋，界面缺乏美感；功能过于复杂，难以使用；或者是运行的效率过低。因此，我决定自己开发一个任务管理工具，满足自己的需求。达到**简洁、美观、高效、功能实用**的目标。

### 项目搭建思路
 
##### 前端
- 使用`react`框架，采用组件化开发的核心思想，主要使用MUI组件库。
- 因为本项目使用个人主机作为服务器，为减小服务器压力，任务列表中的数据存储在`localStorage`中，统计图界面直接调用本地浏览器的数据进行统计。

##### 后端(开发中)
- 使用`Django`框架，主要用来实现用户注册登录功能，使用Django自带的`User`模型实现用户管理。
- 前后端分离运行，通过`axios`向后端发送请求，后端数据库中验证用户信息，返回验证结果。

### 项目主要结构

```
src/
├── App.js            
├── components/
│   ├── bar.js
│   ├── BarChart.js
│   ├── exportTo.js
│   ├── loginForm.js
│   ├── maiList.js
│   ├── navList.js
│   ├── ReminderBox.js
│   ├── SimplePieChart.js
│   ├── singleList.js
│   ├── textBox.js
│   └── gantt.js
├── hooks/
│   └── useAuth.js
└── pages/
    ├── home.js
    ├── chart.js
    ├── export.js
    ├── login.js
    ├── register.js
    ├── team.js
    └── account.js

```

### 功能介绍

- 任务列表
    你可以在主页面添加你的任务，支持选择日期、标记完成、删除任务
    任务元素框可以自由拖动改变长度，你可以使用这个功能来记录：
    - `任务预计需要消耗的时间`
    - `任务的完成进度`
    - `任务的重要程度`
![加载失败](https://github.com/Keiran810975/taskim/blob/main/1.png?raw=true)
- 统计
    你创建任务之后，会自动生成两个统计图，实时记录你的任务完成情况
    扇形统计图：直观显示已完成任务和未完成任务的比例以及数量
    柱状统计图：显示你近十天中每天的任务总数，以及每天的任务完成情况
![加载失败](https://github.com/Keiran810975/taskim/blob/main/2.png?raw=true)
- 导出
    你可以将你的任务导出为markdown、txt、或者word文件
![加载失败](https://github.com/Keiran810975/taskim/blob/main/3.png?raw=true)
- 注册/登录(开发中)
    你可以注册账号，登录后可以保存你的任务，下次登录时可以继续使用
    登录后，你的任务会自动同步到云端，即使你更换设备，也可以继续使用
- 团队(开发中)
    你可以创建团队，邀请你的朋友加入，一起管理任务
    在团队中，你可以查看其他成员的任务，也可以查看他们的统计图


### 使用 

GitHub仓库地址：
```
https://github.com/Keiran810975/TaskManagement.git
```

你可以通过以下命令部署到本地：

```
$ git clone https://github.com/Keiran810975/TaskManagement.git
```
安装依赖：
```
$ npm install
```

启动项目：

```
$ npm start
```

