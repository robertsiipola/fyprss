-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public.subscriptions
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    feed uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone,
    CONSTRAINT subscriptions_pkey PRIMARY KEY (id),
    CONSTRAINT subscriptions_feed_user_id_key UNIQUE (feed, user_id),
    CONSTRAINT subscriptions_feed_fkey FOREIGN KEY (feed)
        REFERENCES public.feeds (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.subscriptions
    OWNER to postgres;

ALTER TABLE IF EXISTS public.subscriptions
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.subscriptions TO anon;

GRANT ALL ON TABLE public.subscriptions TO authenticated;

GRANT ALL ON TABLE public.subscriptions TO postgres;

GRANT ALL ON TABLE public.subscriptions TO service_role;
CREATE POLICY "Allow individual access"
    ON public.subscriptions
    AS PERMISSIVE
    FOR ALL
    TO public
    USING ((auth.uid() = user_id));

CREATE TRIGGER handle_updated_at_subscriptions
    BEFORE UPDATE 
    ON public.subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION extensions.moddatetime('updated_at');

ALTER TABLE IF EXISTS public.feeds
    ALTER COLUMN id SET DEFAULT uuid_generate_v4();