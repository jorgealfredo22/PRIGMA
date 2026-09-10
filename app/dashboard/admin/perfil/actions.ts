"use server"

import "server-only"
import { getCurrentUser } from "@/lib/auth"
import { createAdminSupabaseClient } from "@/lib/supabase/admin"

export interface ChangePasswordResponse {
  success: boolean
  error?: string
}

export async function changePasswordAction(
  formData: FormData
): Promise<ChangePasswordResponse> {
  try {
    const user = await getCurrentUser()
    if (!user || !user.id) {
      return { success: false, error: "No has iniciado sesión o tu sesión ha expirado" }
    }

    const newPassword = String(formData.get("newPassword") ?? "").trim()
    const confirmPassword = String(formData.get("confirmPassword") ?? "").trim()

    if (!newPassword) {
      return { success: false, error: "La nueva contraseña es requerida" }
    }

    if (newPassword.length < 8) {
      return { success: false, error: "La contraseña debe tener al menos 8 caracteres" }
    }

    if (newPassword !== confirmPassword) {
      return { success: false, error: "Las contraseñas no coinciden" }
    }

    const supabase = createAdminSupabaseClient()
    const { error } = await supabase.auth.admin.updateUserById(user.id, {
      password: newPassword,
    })

    if (error) {
      throw new Error(error.message)
    }

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error al actualizar la contraseña",
    }
  }
}
