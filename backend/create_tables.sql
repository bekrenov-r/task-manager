drop table if exists task;
create table task (
    id serial primary key,
    name text,
    description text,
    status text,
    created_at timestamp
);