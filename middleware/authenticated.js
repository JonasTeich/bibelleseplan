export default async function ({ $supabase, redirect }) {
  const user = await $supabase.auth.user()
  if (!user) {
    redirect('/login')
  }
}