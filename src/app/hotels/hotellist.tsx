// ❌ Jangan pakai "use client" di sini!
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ClientHotelList from './page'

export default async function HotelPage() {
  const supabase = createServerComponentClient({ cookies })

  const { data: hotels, error } = await supabase.from('hotels').select('*')
  if (error) {
    return <div>Error loading hotels: {error.message}</div>
  }

  return <ClientHotelList hotels={hotels} />
}
