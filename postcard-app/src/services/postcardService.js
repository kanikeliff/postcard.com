import { supabase } from "../lib/supabase";
import { createShareToken } from "../lib/utils";

export async function createPostcard(payload) {
  const shareToken = createShareToken();
  const now = new Date().toISOString();
  const { data: { user } } = await supabase.auth.getUser();

  const record = {
    sender_user_id: user?.id ?? null,
    sender_email: user?.email ?? null,
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
  const { data, error } = await supabase
    .from("postcards")
    .select("*")
    .eq("share_token", shareToken)
    .eq("is_public", true)
    .single();

  if (error) throw error;
  return data;
}

export async function getSentPostcards() {
  const { data: { user } } = await supabase.auth.getUser();

  let query = supabase
    .from("postcards")
    .select("*")
    .order("created_at", { ascending: false });

  if (user?.email) {
    query = query.eq("sender_email", user.email);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getProfileStats(email) {
  const { data, error } = await supabase
    .from("postcards")
    .select("id, status, created_at")
    .eq("sender_email", email);

  if (error) throw error;

  const total = data?.length ?? 0;
  const read = data?.filter((p) => p.status === "read").length ?? 0;
  const sent = data?.filter((p) => p.status === "sent").length ?? 0;

  return { total, read, sent };
}

export async function markPostcardAsRead(shareToken) {
  const { error } = await supabase
    .from("postcards")
    .update({ status: "read", updated_at: new Date().toISOString() })
    .eq("share_token", shareToken);

  if (error) throw error;
}
