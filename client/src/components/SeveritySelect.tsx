import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SeveritySelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  testId?: string;
}

export default function SeveritySelect({ label, value, onChange, testId }: SeveritySelectProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="min-h-11" data-testid={testId}>
          <SelectValue placeholder="Select severity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="mild">Mild</SelectItem>
          <SelectItem value="mod">Moderate</SelectItem>
          <SelectItem value="sev">Severe</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
