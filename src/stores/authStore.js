import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../composables/useSupabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const profile = ref(null)
  const loading = ref(false)

  const signUp = async (email, password, role, additionalData) => {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            role,
            full_name: additionalData.fullName,
            phone: additionalData.phone
          }
        }
      })

      if (error) throw error

      // Create profile with additional fields
      await supabase.from('profiles').insert({
        id: data.user.id,
        email,
        role,
        full_name: additionalData.fullName,
        phone: additionalData.phone,
        username: additionalData.username,
        country: additionalData.country,
        date_of_birth: additionalData.dateOfBirth
      })

      user.value = data.user
      profile.value = { 
        role, 
        email,
        full_name: additionalData.fullName,
        phone: additionalData.phone,
        username: additionalData.username,
        country: additionalData.country,
        date_of_birth: additionalData.dateOfBirth
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  const signIn = async (email, password) => {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      user.value = data.user
      
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()
      
      profile.value = profileData
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    user.value = null
    profile.value = null
  }

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession()
    if (data.session) {
      user.value = data.session.user
      
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.session.user.id)
        .single()
      
      profile.value = profileData
    }
  }

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    checkAuth
  }
})
