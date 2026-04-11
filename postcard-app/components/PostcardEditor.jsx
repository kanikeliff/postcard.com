import { useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Select from "./ui/Select";
import Button from "./ui/Button";
import TemplatePicker from "./TemplatePicker";
import FontPicker from "./FontPicker";
import DeliveryPanel from "./DeliveryPanel";
import { TEXT_ALIGN_OPTIONS } from "../../interfaces/postcard";
import { validatePostcard } from "../../lib/validators";
import { fileToBase64 } from "../../lib/utils";

export default function PostcardEditor({ value, onChange, onSubmit, isSubmitting }) {
  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, fieldValue) => {
    onChange(field, fieldValue);
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    handleFieldChange("customImage", base64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validatePostcard(value);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    await onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DeliveryPanel
        recipientName={value.recipientName}
        recipientEmail={value.recipientEmail}
        errors={errors}
        onChange={handleFieldChange}
      />

      <Input
        label="Title"
        value={value.title}
        onChange={(e) => handleFieldChange("title", e.target.value)}
        placeholder="Give your postcard a poetic title"
      />

      <Textarea
        label="Message"
        value={value.content}
        onChange={(e) => handleFieldChange("content", e.target.value)}
        error={errors.content}
        placeholder="Write something warm, soft, unforgettable..."
      />

      <Input
        label="Signature"
        value={value.signature}
        onChange={(e) => handleFieldChange("signature", e.target.value)}
        placeholder="Love, Elif"
      />

      <TemplatePicker
        selectedTemplate={value.templateId}
        onChange={(id) => handleFieldChange("templateId", id)}
      />

      <FontPicker
        titleFont={value.titleFont}
        bodyFont={value.bodyFont}
        onTitleFontChange={(id) => handleFieldChange("titleFont", id)}
        onBodyFontChange={(id) => handleFieldChange("bodyFont", id)}
      />

      <Select
        label="Text Alignment"
        value={value.textAlign}
        onChange={(e) => handleFieldChange("textAlign", e.target.value)}
        options={TEXT_ALIGN_OPTIONS}
      />

      <div className="space-y-2">
        <p className="text-sm font-medium text-stone-700">Custom Background</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700"
        />
        {value.customImage && (
          <button
            type="button"
            onClick={() => handleFieldChange("customImage", null)}
            className="text-xs text-red-500 hover:underline"
          >
            Remove image
          </button>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending postcard..." : "Send postcard link ✦"}
      </Button>
    </form>
  );
}