# 南土豆前端项目文档

南京大学软件学院2023秋 人机交互设计 课程大作业前端项目

作者：张宏鑫、周豪、胡书毓、唐扬

## 1. 项目介绍

南土豆（nantodo）是一款专为大学生（主要面向南大本科生）设计的小组在线分工合作系统，旨在解决当代大学生在进行小组作业时常常遇到的招募队友困难、任务分配意见不一致、需要多人协作、与课程关联度低等问题，为南大学生搭建一个开放多元的组队平台，为教师提供一个针对小组作业的作业发布与管理平台。

## 2. 功能说明

### 2.1 特色功能

南土豆聚焦大学生完成小组作业时的一些痛点难点，实现了下列功能：

- **接入课程管理系统**：用户日常中的组队大部分是为完成课程的小组作业设置的，南土豆为实现小组作业从发布到验收的一站式流程，允许教师用户开设课程，便于教师发布和查验作业，并管理课程内所有小组。

- **任务随机分配**：当小组作业分工不均时，会出现某些任务大家抢着做，某些任务大家都不想做的情况。比较传统的做法是使用群聊自带的摇骰子或一些在线的抽奖网站进行分配，这种方法不仅效率低下而且存在作弊的可能。南土豆在小组管理界面提供了“随机分配”功能，一键实现点对点的任务随机分配，后台分配保证公平公正。

- **个性化的任务提醒**：对于一些有拖延症的同学，任务提醒是必要且重要的功能。南土豆采用了类似闹铃的提醒功能，可在任务到期前的一段时间内每隔一定时间向用户发送提醒邮件，也支持类似手机通知的“勿扰模式”。用户可以在个人中心定制个性化的提醒逻辑。

- **多人协作***：南土豆内置了一些常见的多人协作平台的接口（如腾讯文档、飞书云文档、github等），方便用户进行在线的多人协作。（后端正在开发中）

- **AI助手***：南土豆接入了chatgpt-3.5-turbo，可为用户提供关于任务详情的智能建议以供参考。（由于使用的是免费版本，该功能目前使用会受到一定限制）

### 2.2 首页

- **任务展示**：南土豆将用户的来自各个小组的任务统一收集并按顺序展示在首页，类似于一个Todo List的效果。用户可以浏览当前所有任务、通过多人协作完成任务等。支持搜索、筛选等功能。

- **数据可视化**：南土豆会将用户当前的任务数据以可视化（如图表、日历）的形式展现。

- **任务提醒**：当任务处于紧急状态（默认为当任务距deadline不足3天时，可在“个人中心”处设置）时会给用户显目提醒，并发送提醒邮件。

### 2.3 小组页

- **小组展示**：此页面可查看用户所有已加入的（作为组员）和可管理的（作为组长）的小组详情，包括任务列表、成员详情等。

- **小组管理**：组长可以对其创建的小组进行更为丰富的管理操作，如创建和分配任务、管理组员（审核进组申请、踢出成员等）、复制邀请码、管理多人协作等。

- **多人协作与数据监控**：组长可设置本组使用的一些在线协作平台，同时南土豆会监控这些在线平台的相关数据并以可视化形式呈现（如每位成员在文档内贡献的字数、github项目提交次数等），以供任务权重参考。

### 2.4 课程页

- **课程展示**：此页面展示了所有接入南土豆系统的课程，学生用户可以选择加入对应的课程。允许搜索和筛选课程。

- **课程组队**：学生可在课程详情页内自由组队（创建小组或加入已存在的小组），此外南土豆允许使用邀请码，无需审核即可加入小组。

- **课程作业**：教师可发布小组作业，当小组提交作业后每个小组的多人协作内容也可以由教师查看并验收。

### 2.5 发现页

- **开放平台**：“组队”的理念不应该局限于课程的小组作业。南土豆致力于为南大学生打造一个开放多元的弱社交平台，在这里你可以自由的组建任意类型的小组，比如比赛组队、游戏组队、志愿者招募等等。你可以在这里找到与你志同道合的伙伴，参与你所感兴趣的活动，充实多彩的大学生活。

### 2.6 个人中心

- **消息通知**：当产生新事件时（如有其他用户申请加入你的小组、你的申请被同意/拒绝等），南土豆会发送消息通知，可在右上角铃铛图标处查看。

- **个性化设置**：除了基本的个人信息设置外，南土豆允许用户定制个性化的任务提醒逻辑，让南土豆更贴合每位用户的需求。
