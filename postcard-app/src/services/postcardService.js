import { supabase } from "../lib/supabase";
import { createShareToken } from "../lib/utils";

export async function createPostcard(payload) {
  if (!supabase) throw new Error("Supabase is not configured. Please set environment variables.");
  
  const shareToken = createShareToken();
  const now = new Date().toISOString();

  const record = {
    sender_user_id: payload.senderUserId ?? null,
    recipient_name: payload.recipientName,
    recipient_email: payload.recipientEmail,
    title: payload.title,
    content: payload.content,
    template_id: payload.templateId,
    custom_image: payload.customImage,
    title_font: payload.titleFont,
    body_font: payload.bodyFont,
    text_align: payload.textAlign,
    signature: payload.signature,
    status: "sent",
    share_token: shareToken,
    is_public: true,
    created_at: now,
    updated_at: now,
  };

  const { data, error } = await supabase
    .from("postcards")
    .insert(record)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getPublicPostcardByToken(shareToken) {
  if (!supabase) throw new Error("Supabase is not configured. Please set environment variables.");
  
  const { data, error } = await supabase
    .from("postcards")
    .select("*")
    .eq("share_token", shareToken)
    .eq("is_public", true)
    .single();

  if (error) throw error;
  return data;
}

export async function getSentPostcards(senderUserId) {
  if (!supabase) return [];
  
  let query = supabase
    .from("postcards")
    .select("*")
    .order("created_at", { ascending: false });

  if (senderUserId) {
    query = query.eq("sender_user_id", senderUserId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function markPostcardAsRead(shareToken) {
  if (!supabase) return;
  
  const { error } = await supabase
    .from("postcards")
    .update({ status: "read", updated_at: new Date().toISOString() })
    .eq("share_token", shareToken);

  if (error) throw error;
}