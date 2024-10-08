import { createClient as _createClient} from '@supabase/supabase-js';

export const createClient = () => {
  _createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  )
}