drop table if exists `systems`;
create table `systems` (
  id int not null,
  name varchar(64) not null,
  icon varchar(64),
  brief varchar(256),
  primary key (id) 
) engine=InnoDB auto_incremary=1000000 default charset=utf8;