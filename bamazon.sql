drop database if exists bamazon;

create database bamazon;

use bamazon;

drop table if exists products;

create table products (
id int not null auto_increment,
product_name varchar(255),
department_name varchar(255),
price decimal(10,2),
stock_quantity int,
primary key (id)
);

insert into products (product_name,department_name,price,stock_quantity)
values ("Drill","Tools",5.24,10)
,("Soccer Ball","Sporting Goods",10.25,25)
,("Football","Sporting Goods",8.50,20)
,("Ninja Warrior Kit", "Sporting Goods",895.25,5)
,("Board Game","Toys", 10.25,15)
,("Stuff","Misc", 5,10)
,("Stuff1","Misc", 5,10)
,("Stuff2","Misc", 5,10)
,("Stuff3","Misc", 5,10)
,("Stuff4","Misc", 5,10)