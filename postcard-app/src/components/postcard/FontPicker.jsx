import { POSTCARD_FONTS } from "../../constants/fonts";
import Select from "../ui/Select";

const fontOptions = POSTCARD_FONTS.map((f) => ({ value: f.id, label: f.label }));

export default function FontPicker({ titleFont, bodyFont, onTitleFontChange, onBodyFontChange }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Select
        label="Title Font"
        value={titleFont}
        onChange={(e) => onTitleFontChange(e.target.value)}
        options={fontOptions}
      />
      <Select
        label="Body Font"
        value={bodyFont}
        onChange={(e) => onBodyFontChange(e.target.value)}
        options={fontOptions}
      />
    </div>
  );
}
