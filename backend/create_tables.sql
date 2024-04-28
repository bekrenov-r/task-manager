drop table if exists task;
create table task (
    id serial primary key,
    name text,
    description text,
    status text,
    created_at timestamp,
    owner_username text
);

drop table if exists "user";
create table "user"
(
    id         serial primary key,
    first_name text,
    last_name  text,
    username   text,
    password   text,
    enabled    boolean
);