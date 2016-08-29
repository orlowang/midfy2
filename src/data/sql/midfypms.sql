
-- ----------------------------------------------------------------------

DROP TABLE if exists `functions`;
CREATE TABLE functions (
  id int auto_increment NOT NULL,
  displayname varchar(64) NOT NULL,
  description varchar(512) DEFAULT NULL,
  storeid varchar(255) NOT NULL,
  createtime datetime NOT NULL DEFAULT NOW(),
  primary key (id) 
) engine=InnoDB auto_increment=1000000 default charset=utf8;

insert into functions (displayname, storeid) values
('setting', 1000001);


DROP TABLE if exists `store_system_config`;
CREATE TABLE store_system_config (
  id int auto_increment NOT NULL,
  displayname varchar(64) NOT NULL,
  description varchar(512) DEFAULT NULL,
  theme int NOT NULL,
  emailnotice tinyint(1) DEFAULT 0,
  updatetime datetime NOT NULL DEFAULT NOW(),
  primary key (id) 
) engine=InnoDB auto_increment=1000000 default charset=utf8;

insert into store_system_config (displayname, theme) values
('setting', 1000001);

DROP TABLE if exists `user_info`;
CREATE TABLE user_info (
  id int auto_increment NOT NULL,
  account varchar(64) NOT NULL,
  fullname varchar(64) DEFAULT NULL,
  email varchar(512) DEFAULT NULL,
  avatar varchar(255) DEFAULT NULL,
  password varchar(255) NOT NULL,
  identifier varchar(255) DEFAULT NULL comment 'humanity ID',
  createtime datetime NOT NULL DEFAULT NOW(),
  primary key (id) 
) engine=InnoDB auto_increment=1000000 default charset=utf8;

insert into user_info (account, fullname, email, password) values
('admin', 'administration', 'admin@vanke.com', '');
