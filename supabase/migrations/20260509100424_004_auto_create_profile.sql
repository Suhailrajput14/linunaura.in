/*
  # Auto-create profile on user signup

  1. New Function
    - `handle_new_user()` - Trigger function that creates a profile
      entry in the `profiles` table when a new user signs up via
      Supabase Auth. Reads full_name from user metadata.

  2. New Trigger
    - `on_auth_user_created` - Fires after INSERT on auth.users
      to call handle_new_user()

  3. Notes
    - Uses SECURITY DEFINER to run with elevated privileges
    - Reads raw_user_meta_data for the full_name field
*/

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'customer'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
