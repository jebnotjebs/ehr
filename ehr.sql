/*
Navicat MySQL Data Transfer

Source Server         : %
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : ehr

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2025-02-08 13:26:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `dt_added` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', '1', '2025-02-07 16:34:44');

-- ----------------------------
-- Table structure for code_settings
-- ----------------------------
DROP TABLE IF EXISTS `code_settings`;
CREATE TABLE `code_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  `prefix` varchar(100) DEFAULT '',
  `last_value` int(11) DEFAULT '0',
  `suffix` varchar(5) DEFAULT '',
  `length` int(11) DEFAULT '2',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of code_settings
-- ----------------------------
INSERT INTO `code_settings` VALUES ('1', 'info_code', 'INFNT', '6', '', '5');

-- ----------------------------
-- Table structure for info
-- ----------------------------
DROP TABLE IF EXISTS `info`;
CREATE TABLE `info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `info_code` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `birth_place` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `blood_type` varchar(255) DEFAULT NULL,
  `mother_fname` varchar(255) DEFAULT NULL,
  `mother_lname` varchar(255) DEFAULT NULL,
  `mother_mname` varchar(255) DEFAULT NULL,
  `father_fname` varchar(255) DEFAULT NULL,
  `father_lname` varchar(255) DEFAULT NULL,
  `father_mname` varchar(255) DEFAULT NULL,
  `dt_added` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of info
-- ----------------------------
INSERT INTO `info` VALUES ('1', null, 'jeb', null, 'barcelona', null, null, null, null, null, null, null, null, null, null, null, '2025-02-07 16:14:00');
INSERT INTO `info` VALUES ('2', 'I00000001', null, 'sd', null, null, null, null, null, null, null, null, null, null, null, null, '2025-02-07 16:14:00');
INSERT INTO `info` VALUES ('3', 'INFNT00000002', 'SD', null, null, null, null, null, null, null, null, null, null, null, null, null, '2025-02-07 16:14:00');
INSERT INTO `info` VALUES ('4', 'INFNT00003', 'SD', null, null, null, null, null, null, null, null, null, null, null, null, null, '2025-02-07 16:14:00');
INSERT INTO `info` VALUES ('5', 'INFNT00004', 'sd', null, null, null, null, null, null, null, null, null, null, null, null, null, '2025-02-07 16:16:32');
INSERT INTO `info` VALUES ('6', 'INFNT00005', 'sd', null, null, null, null, null, null, null, null, null, null, null, null, null, '2025-02-07 16:16:39');
INSERT INTO `info` VALUES ('7', 'INFNT00006', null, 'sdssdsd', null, null, null, null, null, null, null, null, null, null, null, null, '2025-02-07 16:31:25');

-- ----------------------------
-- Table structure for l
-- ----------------------------
DROP TABLE IF EXISTS `l`;
CREATE TABLE `l` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(15) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `dt_added` datetime DEFAULT CURRENT_TIMESTAMP,
  `dt_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of l
-- ----------------------------
INSERT INTO `l` VALUES ('2', '11', '1', '2024-03-06 11:04:51', null);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `accounttype` enum('CUSTOMER','STORE','TEST','SUPER ACCOUNT') COLLATE utf8mb4_unicode_ci DEFAULT 'CUSTOMER',
  `googlesocialite_id` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accountcode` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT '-',
  `otp` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phonenumber` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secondary_pn` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` text COLLATE utf8mb4_unicode_ci,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT 'unverified',
  `hearts` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `secu_question` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secu_answer` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_status` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT 'CHANGED',
  `added_by` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
DROP TRIGGER IF EXISTS `codess`;
DELIMITER ;;
CREATE TRIGGER `codess` BEFORE INSERT ON `info` FOR EACH ROW begin

set new.info_code= (SELECT CONCAT(prefix ,lpad(last_value +1,`length`,'0') ,suffix) as xx FROM code_settings  WHERE `type`= 'info_code');

update code_settings   set last_value = last_value +1 WHERE `type`= 'info_code';

end
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `insert_otp`;
DELIMITER ;;
CREATE TRIGGER `insert_otp` BEFORE INSERT ON `users` FOR EACH ROW begin

if(new.registration = 'default') then

insert into sms_server.msg_que(cp_no,msg) values(concat(0,new.phonenumber),
concat('NEVER SHARE YOUR OTP especially on social media and SMS or email links. Mrs G will only need your MPIN or OTP when using the App. Your OTP code is '  ,new.otp,
'. If this was not you, please ignore.'));

end if;
end
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `dawdawdwa`;
DELIMITER ;;
CREATE TRIGGER `dawdawdwa` BEFORE UPDATE ON `users` FOR EACH ROW begin

if(new.status ='verified')then

if(old.status = 'unverified')then

    set new.accountcode =  (SELECT CONCAT(prefix , luhn_add(luhn_add(concat(lpad(last_value +1,`length`,'0')) )) ,IFNULL(suffix,''))fff FROM code_settings WHERE `type`= 'accountcode');
    UPDATE code_settings  SET `last_value`=`last_value`+1 WHERE `type` = 'accountcode';
   
   -- INSERT INTO vouchers (accountcode, amount, valid_from, valid_until, type, created_at, updated_at) 
   -- select new.accountcode, amount, now(), DATE_ADD(now(), INTERVAL days DAY), type, now(), now() FROM voucher_newr WHERE status = 'ACTIVE';

  
end if;

end if;

end
;;
DELIMITER ;
