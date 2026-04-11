export function validatePostcard(values) {
  const errors = {};

  if (!values.recipientName?.trim()) {
    errors.recipientName = "Recipient name is required.";
  }

  if (!values.recipientEmail?.trim()) {
    errors.recipientEmail = "Recipient email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.recipientEmail)) {
    errors.recipientEmail = "Please enter a valid email address.";
  }

  if (!values.content?.trim()) {
    errors.content = "Message content is required.";
  }

  return errors;
}