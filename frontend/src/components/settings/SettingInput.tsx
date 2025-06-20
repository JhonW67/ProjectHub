import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SettingInputProps {
  label: string;
  id: string;
  name: string;
  value: string | number;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SettingInput = ({ label, id, name, value, onChange, type = "text" }: SettingInputProps) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} name={name} value={value} onChange={onChange} type={type} />
  </div>
);
