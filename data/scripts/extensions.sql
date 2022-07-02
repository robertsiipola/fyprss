drop extension if exists moddatetime;
create extension if not exists moddatetime schema extensions;

drop extension if exists "uuid-ossp";
create extension if not exists "uuid-ossp" with schema extensions;