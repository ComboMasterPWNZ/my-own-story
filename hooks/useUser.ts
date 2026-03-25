import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    let mounted = true

    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) {
          // If it's a 401 or similar, it's not necessarily an "error" we want to throw
          // but we should handle it.
          if (mounted) {
            setUser(null)
            setIsLoading(false)
          }
          return
        }
        if (mounted) {
          setUser(user)
        }
      } catch (error: any) {
        if (error.name !== 'AbortError' && mounted) {
          console.error('Error fetching user:', error)
          setUser(null)
        }
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null)
        setIsLoading(false)
      }
    })

    return () => {
      mounted = false
      authListener?.subscription.unsubscribe()
    }
  }, [supabase.auth])

  return { user, isLoading }
}
