export default function ({ $supabase, redirect }) {
  if (!$supabase.auth.user()) {
    redirect('/login')
  }
}