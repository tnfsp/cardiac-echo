import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Option {
  id: string;
  label: string;
}

interface CheckboxGroupProps {
  label: string;
  options: Option[];
  value: string | null;
  onChange: (value: string | null) => void;
  testIdPrefix?: string;
}

export default function CheckboxGroup({ label, options, value, onChange, testIdPrefix }: CheckboxGroupProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-2">
            <Checkbox
              id={`${testIdPrefix}-${option.id}`}
              checked={value === option.id}
              onCheckedChange={(checked) => onChange(checked ? option.id : null)}
              data-testid={`checkbox-${testIdPrefix}-${option.id}`}
            />
            <Label htmlFor={`${testIdPrefix}-${option.id}`} className="font-normal cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
