drop table if exists `zhuzher_menu`;
create table `zhuzher_menu` (
  id int not null,
  sysid int not null,
  name varchar(64) not null,
  icon varchar(64),
  url varchar(256),
  primary key (id) 
) engine=InnoDB auto_incremary=1000000 default charset=utf8;