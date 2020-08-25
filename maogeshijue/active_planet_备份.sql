-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2020-08-02 16:23:13
-- 服务器版本： 5.6.32-log
-- PHP 版本： 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `active_planet`
--

-- --------------------------------------------------------

--
-- 表的结构 `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `balance` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `account`
--

INSERT INTO `account` (`id`, `username`, `balance`) VALUES
(1, 'cat', 3000),
(2, 'tom', 4000);

-- --------------------------------------------------------

--
-- 表的结构 `activity`
--

CREATE TABLE `activity` (
  `hid` int(11) NOT NULL COMMENT '活动id',
  `qid` int(11) NOT NULL COMMENT '星球id',
  `uid` int(11) NOT NULL COMMENT '参与者(用户)id',
  `topic` varchar(32) NOT NULL COMMENT '主题',
  `isTeam` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否要求以团队身份报名',
  `content` text NOT NULL COMMENT '内容',
  `imgUrl` text COMMENT '图片链接（json数组）',
  `regFormUrl` text COMMENT '在线报名表链接',
  `attendLimit` int(11) NOT NULL DEFAULT '1000' COMMENT '限制人数',
  `attendCount` int(11) NOT NULL DEFAULT '0' COMMENT '参与人数',
  `releaseTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  `registerDeadline` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '报名截止时间',
  `startTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '活动开始时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `activity`
--

INSERT INTO `activity` (`hid`, `qid`, `uid`, `topic`, `isTeam`, `content`, `imgUrl`, `regFormUrl`, `attendLimit`, `attendCount`, `releaseTime`, `registerDeadline`, `startTime`) VALUES
(1, 1, 1, '活动1', 0, '暂无介绍', NULL, 'abcde', 1000, 0, '2020-03-30 04:08:34', '2020-04-01 10:00:00', '2020-04-30 16:00:00'),
(2, 1, 1, '000', 0, '0000', 'https://www.imgurl.com', NULL, 1000, 0, '2020-03-30 04:44:49', '2020-02-29 16:00:00', '2020-03-31 16:00:00'),
(3, 1, 1, '全国小学生广播体操大赛', 1, '一起来跳七彩阳光吧', '', '', 100, 0, '2020-04-01 09:15:32', '2020-04-01 10:15:32', '2020-04-01 11:15:32'),
(4, 1, 1, '全国小学生广播体操大赛', 1, '一起来跳七彩阳光吧', '', '', 100, 0, '2020-04-01 09:15:32', '2020-04-01 10:15:32', '2020-04-01 11:15:32');

-- --------------------------------------------------------

--
-- 表的结构 `notificationList`
--

CREATE TABLE `notificationList` (
  `id` int(11) NOT NULL,
  `email` text NOT NULL COMMENT '接收通知者的邮箱',
  `title` text NOT NULL COMMENT '邮件标题',
  `content` text NOT NULL COMMENT '邮件内容'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `planet`
--

CREATE TABLE `planet` (
  `qid` int(11) NOT NULL COMMENT '活动星球id',
  `uid` int(11) DEFAULT NULL COMMENT '创建者id',
  `qname` varchar(20) NOT NULL COMMENT '星球名称',
  `qintroduce` text COMMENT '星球简介',
  `qimg` text COMMENT '星球头像',
  `visible` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否在发现页可见',
  `shutDown` tinyint(1) NOT NULL DEFAULT '0' COMMENT '关闭星球',
  `creatTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（自动生成）',
  `category` int(11) NOT NULL COMMENT '星球分类',
  `auth` int(11) NOT NULL DEFAULT '0' COMMENT '认证级别（-1开放 0 个人 1社团 2院级 3校级）'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `planet`
--

INSERT INTO `planet` (`qid`, `uid`, `qname`, `qintroduce`, `qimg`, `visible`, `shutDown`, `creatTime`, `category`, `auth`) VALUES
(1, 1, '活动港湾', '由拾浪团队开发制作', '/icons/default.png', 1, 0, '2020-03-30 04:00:30', 4, 0),
(2, 2, '数模协会', '暂无介绍~', '/icons/default.png', 1, 0, '2020-03-31 10:03:54', 4, 0),
(3, NULL, '公共港湾', '(｡･∀･)ﾉﾞ嗨~', '/icons/default.png', 1, 0, '2020-03-31 10:08:08', 4, -1),
(4, 31, '测试港湾1', '简单介绍简单介绍', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590640566507&di=f86c5e99af3e0263c53a87b95858624e&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg', 1, 0, '2020-05-27 03:10:39', 4, 0);

-- --------------------------------------------------------

--
-- 表的结构 `p_category`
--

CREATE TABLE `p_category` (
  `cid` int(11) NOT NULL COMMENT '类别id',
  `cName` varchar(8) NOT NULL COMMENT '类别名称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `p_category`
--

INSERT INTO `p_category` (`cid`, `cName`) VALUES
(1, '社团活动'),
(2, '宣讲活动'),
(3, '学校活动'),
(4, '个人组织活动');

-- --------------------------------------------------------

--
-- 表的结构 `team`
--

CREATE TABLE `team` (
  `tid` int(11) NOT NULL COMMENT '团队id',
  `tname` varchar(32) NOT NULL COMMENT '团队名称',
  `creatTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `dismiss` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否已经解散'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `team_activity`
--

CREATE TABLE `team_activity` (
  `id` int(11) NOT NULL COMMENT '团队-活动关系(即团队报名表)id',
  `hid` int(11) NOT NULL COMMENT '活动id',
  `tid` int(11) NOT NULL COMMENT '团队id',
  `memberList` text NOT NULL COMMENT '报名成功时的团队成员的uid列表(按json格式存储)',
  `signUpTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '报名时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL COMMENT '用户在系统内的表示符',
  `openID` char(32) DEFAULT NULL COMMENT '微信为用户分配的标识符',
  `avatarUrl` varchar(255) DEFAULT NULL COMMENT '用户头像链接',
  `nickName` varchar(32) DEFAULT NULL COMMENT '用户昵称',
  `name` varchar(20) DEFAULT NULL COMMENT '姓名',
  `sNo` varchar(10) DEFAULT NULL COMMENT '学号',
  `phone` varchar(14) DEFAULT NULL COMMENT '手机号',
  `email` varchar(64) DEFAULT NULL COMMENT '邮箱',
  `receive` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否接收邮件',
  `qid` int(11) DEFAULT NULL COMMENT '所管理的星球的ID',
  `manager` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否有查询所有星球状态的权限',
  `boss` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否拥有任免Manager的权限'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`uid`, `openID`, `avatarUrl`, `nickName`, `name`, `sNo`, `phone`, `email`, `receive`, `qid`, `manager`, `boss`) VALUES
(1, '1669dcaf45d80b98214a9ba7f9c7d0df', 'https://wx.qlogo.cn/mmopen/vi_32/6JLibFXCHRjYa5iadm7icH8myUFd5NqspHYLOF0GMBAKOuR0rcibfLp3fENH2KQkLhUosXuD804sG1ApJMdGnw720A/132', 'kbtx', '孟庆海', '2017303045', '18592014275', 'kbtxwer@126.com', 0, 1, 0, 0),
(2, 'aeca0a9526dbc21267cf6afcc6b94920', 'http://wx.qlogo.cn/mmopen/Ez609qkcZYYEUWxaHxn3F08XM2jUtPg5y8J2vYoPeqKpic0wdJH094eD77vAeLgbp4XUuKNEegTzEE49xfoX3oJ8lI81McdbB/96', '田磊', '', '', '', '', 1, 2, 0, 0),
(3, '7e4f882d2ea10f9f8a665f9d92e4087f', 'http://wx.qlogo.cn/mmopen/OM4v0FU2h0vTCictyBK4kjb6j8GqZ2GR1W1sOA2SlcOtYl6deqT1mLZKOJdypdELfTib9ia9WynKicNzXVg9Y2Xf1l1yz4oRm6q0/96', '青春天', '', '', '', '', 1, NULL, 0, 0),
(4, 'cbb6e3589f1ccbe52f2622130c1f3fb8', 'http://wx.qlogo.cn/mmopen/OM4v0FU2h0vTCictyBK4kjcdJ9yliaSoA9OR1ibXnxPic2zq5nibgJLCBIHO0dDsMu43dWYicGib0z0ib7EYCpyF7PPtxeSpMjOF8Jdo/132', '&#26228;&#22825;', NULL, NULL, NULL, NULL, 1, NULL, 0, 0),
(6, '8fbb33fd68bd525c572b840ba2f44089', 'https://wx.qlogo.cn/mmopen/vi_32/6JLibFXCHRjYa5iadm7icH8myUFd5NqspHYLOF0GMBAKOuR0rcibfLp3fENH2KQkLhUosXuD804sG1ApJMdGnw720A/132', '%E6%99%B4%E5%A4%A9', NULL, NULL, NULL, NULL, 1, NULL, 0, 0),
(7, '8fbb33fd68bd525c572121321', 'https://wx.qlogo.cn/mmopen/vi_32/6JLibFXCHRjYa5iadm7icH8myUFd5NqspHYLOF0GMBAKOuR0rcibfLp3fENH2KQkLhUosXuD804sG1ApJMdGnw720A/132', '晴天', NULL, NULL, NULL, NULL, 1, NULL, 0, 0),
(31, 'oEiNI4wGGj6ZK2IJCfw1XJRjn7LY', '/icons/default.png', 'nick', '王炳楠', '2018303112', '13593207745', '1789446861@qq.com', 0, 4, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `user_activity`
--

CREATE TABLE `user_activity` (
  `id` int(11) NOT NULL COMMENT '用户-活动关系(即个人报名表)的id',
  `hid` int(11) NOT NULL COMMENT '活动id',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `signUpTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '报名时间（自动生成）',
  `signTime` int(11) DEFAULT NULL COMMENT '签到时间',
  `state` tinyint(1) DEFAULT NULL COMMENT '报名是否成功'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `user_planet`
--

CREATE TABLE `user_planet` (
  `id` int(11) NOT NULL COMMENT '用户-星球关系的标识',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `qid` int(11) NOT NULL COMMENT '星球id',
  `visit` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上次访问时间',
  `manager` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否能管理星球'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_planet`
--

INSERT INTO `user_planet` (`id`, `uid`, `qid`, `visit`, `manager`) VALUES
(1, 3, 3, '2020-04-01 08:28:00', 0),
(25, 1, 1, '2020-04-01 08:43:50', 0),
(30, 31, 4, '2020-05-27 03:49:18', 0),
(31, 31, 1, '2020-05-27 03:55:08', 0),
(32, 31, 2, '2020-05-27 03:55:12', 0),
(33, 31, 3, '2020-05-27 03:55:14', 0);

-- --------------------------------------------------------

--
-- 表的结构 `user_team`
--

CREATE TABLE `user_team` (
  `id` int(11) NOT NULL COMMENT '团队记录的id',
  `tid` int(11) NOT NULL COMMENT '团队标识符',
  `uid` int(11) NOT NULL COMMENT '成员id',
  `leader` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否为队长'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转储表的索引
--

--
-- 表的索引 `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`hid`),
  ADD KEY `a_qid` (`qid`),
  ADD KEY `a_uid` (`uid`);

--
-- 表的索引 `notificationList`
--
ALTER TABLE `notificationList`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `planet`
--
ALTER TABLE `planet`
  ADD PRIMARY KEY (`qid`),
  ADD KEY `p_uid` (`uid`),
  ADD KEY `p_cid` (`category`);

--
-- 表的索引 `p_category`
--
ALTER TABLE `p_category`
  ADD PRIMARY KEY (`cid`);

--
-- 表的索引 `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`tid`);

--
-- 表的索引 `team_activity`
--
ALTER TABLE `team_activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ta_hid` (`hid`),
  ADD KEY `ta_tid` (`tid`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `openID` (`openID`),
  ADD KEY `u_qid` (`qid`);

--
-- 表的索引 `user_activity`
--
ALTER TABLE `user_activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ua_hid` (`hid`),
  ADD KEY `ua_uid` (`uid`);

--
-- 表的索引 `user_planet`
--
ALTER TABLE `user_planet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `up_uid` (`uid`),
  ADD KEY `up_qid` (`qid`);

--
-- 表的索引 `user_team`
--
ALTER TABLE `user_team`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ut_uid` (`uid`),
  ADD KEY `ut_tid` (`tid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `activity`
--
ALTER TABLE `activity`
  MODIFY `hid` int(11) NOT NULL AUTO_INCREMENT COMMENT '活动id', AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `notificationList`
--
ALTER TABLE `notificationList`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `planet`
--
ALTER TABLE `planet`
  MODIFY `qid` int(11) NOT NULL AUTO_INCREMENT COMMENT '活动星球id', AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `p_category`
--
ALTER TABLE `p_category`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '类别id', AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `team`
--
ALTER TABLE `team`
  MODIFY `tid` int(11) NOT NULL AUTO_INCREMENT COMMENT '团队id';

--
-- 使用表AUTO_INCREMENT `team_activity`
--
ALTER TABLE `team_activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '团队-活动关系(即团队报名表)id';

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户在系统内的表示符', AUTO_INCREMENT=32;

--
-- 使用表AUTO_INCREMENT `user_activity`
--
ALTER TABLE `user_activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户-活动关系(即个人报名表)的id';

--
-- 使用表AUTO_INCREMENT `user_planet`
--
ALTER TABLE `user_planet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户-星球关系的标识', AUTO_INCREMENT=34;

--
-- 使用表AUTO_INCREMENT `user_team`
--
ALTER TABLE `user_team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '团队记录的id';

--
-- 限制导出的表
--

--
-- 限制表 `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `a_qid` FOREIGN KEY (`qid`) REFERENCES `planet` (`qid`),
  ADD CONSTRAINT `a_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`);

--
-- 限制表 `planet`
--
ALTER TABLE `planet`
  ADD CONSTRAINT `p_cid` FOREIGN KEY (`category`) REFERENCES `p_category` (`cid`),
  ADD CONSTRAINT `p_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`);

--
-- 限制表 `team_activity`
--
ALTER TABLE `team_activity`
  ADD CONSTRAINT `ta_hid` FOREIGN KEY (`hid`) REFERENCES `activity` (`hid`),
  ADD CONSTRAINT `ta_tid` FOREIGN KEY (`tid`) REFERENCES `team` (`tid`);

--
-- 限制表 `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `u_qid` FOREIGN KEY (`qid`) REFERENCES `planet` (`qid`);

--
-- 限制表 `user_activity`
--
ALTER TABLE `user_activity`
  ADD CONSTRAINT `ua_hid` FOREIGN KEY (`hid`) REFERENCES `activity` (`hid`),
  ADD CONSTRAINT `ua_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`);

--
-- 限制表 `user_planet`
--
ALTER TABLE `user_planet`
  ADD CONSTRAINT `up_qid` FOREIGN KEY (`qid`) REFERENCES `planet` (`qid`),
  ADD CONSTRAINT `up_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`);

--
-- 限制表 `user_team`
--
ALTER TABLE `user_team`
  ADD CONSTRAINT `ut_tid` FOREIGN KEY (`tid`) REFERENCES `team` (`tid`),
  ADD CONSTRAINT `ut_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
