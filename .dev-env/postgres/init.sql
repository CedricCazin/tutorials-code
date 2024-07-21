
CREATE ROLE postgres_admin_tutorials WITH
  LOGIN
  SUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  REPLICATION
  PASSWORD 'password';

CREATE DATABASE tutorials
    WITH
    OWNER = postgres_admin_tutorials
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE tutorials TO postgres_admin;

GRANT ALL ON DATABASE tutorials TO postgres_admin_tutorials;

GRANT TEMPORARY, CONNECT ON DATABASE tutorials TO PUBLIC;
