drop table if exists task;
create table task (
    id serial primary key,
    name text,
    description text,
    status text,
    created_at timestamp,
    owner_username text
);

drop table if exists users;
create table users (
    username text,
    password text
);

drop table if exists authorities;
create table authorities (
    username text,
    authority text
);