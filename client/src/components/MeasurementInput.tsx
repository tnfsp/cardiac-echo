import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MeasurementInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
  placeholder?: string;
  testId?: string;
}

export default function MeasurementInput({ 
  label, 
  value, 
  onChange, 
  unit, 
  placeholder = "0",
  testId 
}: MeasurementInputProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-h-11 text-lg"
          data-testid={testId}
          step="0.1"
        />
        <span className="text-sm font-medium text-muted-foreground min-w-[3rem]">{unit}</span>
      </div>
    </div>
  );
}
