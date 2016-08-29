DROP TABLE IF EXISTS `operation_type`;
CREATE TABLE operation_type (
  id int auto_increment NOT NULL,
  displayname varchar(64) NOT NULL,
  typeid varchar(64) NOT NULL,
  keyprop varchar(255) DEFAULT NULL,
  primary key (id) 
) engine=InnoDB auto_increment=1000000 default charset=utf8;

insert into operation_type (displayname, typeid, keyprop) values
('ADD', 'add', 'add_icon'),
('DELETE', 'delete', 'delete_icon'),
('EDIT', 'edit', 'edit_icon');

DROP TABLE IF EXISTS `permission_type`;
CREATE TABLE permission_type (
  id int auto_increment NOT NULL,
  displayname varchar(64) NOT NULL,
  typeid varchar(64) NOT NULL,
  keyprop varchar(255) DEFAULT NULL,
  primary key (id) 
) engine=InnoDB auto_increment=1000000 default charset=utf8;

insert into permission_type (displayname, typeid) values
('HIDDEN', 'hidden'),
('SHOW', 'show'),
('ACTIVE', 'active');

DROP TABLE IF EXISTS `theme`;
CREATE TABLE theme (
  id int auto_increment NOT NULL,
  displayname varchar(64) NOT NULL,
  description varchar(512) DEFAULT NULL,
  keyprop varchar(255) DEFAULT NULL,
  resource varchar(255) DEFAULT NULL,
  primary key (id) 
) engine=InnoDB auto_increment=1000000 default charset=utf8;

insert into theme (displayname, keyprop) values
('default theme', '#ff6600');

