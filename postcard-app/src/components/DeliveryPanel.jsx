import Input from "./ui/Input";

export default function DeliveryPanel({ recipientName, recipientEmail, errors, onChange }) {
  return (
    <div className="space-y-4">
      <Input
        label="Recipient Name"
        value={recipientName}
        onChange={(e) => onChange("recipientName", e.target.value)}
        error={errors.recipientName}
        placeholder="Who is this postcard for?"
      />
      <Input
        label="Recipient Email"
        type="email"
        value={recipientEmail}
        onChange={(e) => onChange("recipientEmail", e.target.value)}
        error={errors.recipientEmail}
        placeholder="friend@example.com"
      />
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
        ✦ We only send a beautiful link — the recipient opens the postcard inside the app.
      </div>
    </div>
  );
}