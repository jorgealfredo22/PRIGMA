"use server"

import "server-only"

import { revalidatePath } from "next/cache"
import { createAdminSupabaseClient } from "@/lib/supabase/admin"

export interface SenderName {
  id: string
  display_name: string
  email_address: string
  is_default: boolean
  created_at: string
}

export async function getSenderNamesAction(): Promise<SenderName[]> {
  const supabase = createAdminSupabaseClient()
  const { data, error } = await supabase
    .from("saved_sender_names")
    .select("*")
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: true })

  if (error) {
    console.warn("saved_sender_names table not found, using fallback:", error.message)
    return [
      {
        id: "fallback",
        display_name: "PRIGMA",
        email_address: "notificaciones@prigma.net",
        is_default: true,
        created_at: "",
      },
    ]
  }
  return data ?? []
}

function getString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim()
}

export async function addSenderNameAction(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const displayName = getString(formData, "displayName")
    const emailAddress = getString(formData, "emailAddress")

    if (!displayName) return { success: false, error: "El nombre es obligatorio" }
    if (!emailAddress || !emailAddress.includes("@"))
      return { success: false, error: "Email inválido" }

    const supabase = createAdminSupabaseClient()

    const { count } = await supabase
      .from("saved_sender_names")
      .select("*", { count: "exact", head: true })

    const { error } = await supabase.from("saved_sender_names").insert({
      display_name: displayName,
      email_address: emailAddress,
      is_default: count === 0,
    })

    if (error) throw new Error(error.message)

    revalidatePath("/dashboard/admin/email")
    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error desconocido",
    }
  }
}

export async function updateSenderNameAction(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const id = getString(formData, "id")
    const displayName = getString(formData, "displayName")
    const emailAddress = getString(formData, "emailAddress")

    if (!id) return { success: false, error: "ID requerido" }
    if (!displayName) return { success: false, error: "El nombre es obligatorio" }
    if (!emailAddress || !emailAddress.includes("@"))
      return { success: false, error: "Email inválido" }

    const supabase = createAdminSupabaseClient()

    const { error } = await supabase
      .from("saved_sender_names")
      .update({
        display_name: displayName,
        email_address: emailAddress,
      })
      .eq("id", id)

    if (error) throw new Error(error.message)

    revalidatePath("/dashboard/admin/email")
    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error desconocido",
    }
  }
}

export async function setDefaultSenderAction(
  senderId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminSupabaseClient()

    // First: set ALL to false
    const { error: unsetError } = await supabase
      .from("saved_sender_names")
      .update({ is_default: false })
      .neq("id", "00000000-0000-0000-0000-000000000000") // dummy to update all

    if (unsetError) throw new Error(unsetError.message)

    // Then: set the chosen one to true
    const { error } = await supabase
      .from("saved_sender_names")
      .update({ is_default: true })
      .eq("id", senderId)

    if (error) throw new Error(error.message)

    revalidatePath("/dashboard/admin/email")
    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error desconocido",
    }
  }
}

export async function deleteSenderNameAction(
  senderId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminSupabaseClient()

    const { data: sender } = await supabase
      .from("saved_sender_names")
      .select("is_default")
      .eq("id", senderId)
      .single()

    if (sender?.is_default) {
      return { success: false, error: "No podés eliminar el remitente predeterminado" }
    }

    const { error } = await supabase
      .from("saved_sender_names")
      .delete()
      .eq("id", senderId)

    if (error) throw new Error(error.message)

    revalidatePath("/dashboard/admin/email")
    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error desconocido",
    }
  }
}
