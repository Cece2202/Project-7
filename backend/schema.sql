-- Table: public.Posts

-- DROP TABLE IF EXISTS public."Posts";

CREATE TABLE IF NOT EXISTS public."Posts"
(
    id integer NOT NULL DEFAULT nextval('"Posts_id_seq"'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    content character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    "mediaUrl" character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    reads integer[] DEFAULT ARRAY[]::integer[],
    CONSTRAINT "Posts_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Posts"
    OWNER to postgres;


    