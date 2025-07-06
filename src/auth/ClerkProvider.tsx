import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

export const useClerkSupabase = () => {
  const { getToken, userId } = useAuth()
  
  useEffect(() => {
    const setupSupabase = async () => {
      try {
        const token = await getToken({ template: 'supabase' })
        
        if (token && userId) {
          await supabase.auth.setSession({
            access_token: token,
            refresh_token: ''
          })
        }
      } catch (error) {
        console.error('Error setting up Supabase auth:', error)
      }
    }
    
    setupSupabase()
  }, [getToken, userId])
  
  return supabase
} 