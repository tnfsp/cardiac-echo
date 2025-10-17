import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatientHeaderProps {
  date: string;
  physician: string;
  patientId: string;
  bedNumber: string;
  purposes: string[];
  onDateChange: (value: string) => void;
  onPhysicianChange: (value: string) => void;
  onPatientIdChange: (value: string) => void;
  onBedNumberChange: (value: string) => void;
  onPurposeToggle: (purpose: string) => void;
}

export default function PatientHeader({
  date,
  physician,
  patientId,
  bedNumber,
  purposes,
  onDateChange,
  onPhysicianChange,
  onPatientIdChange,
  onBedNumberChange,
  onPurposeToggle
}: PatientHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const purposeOptions = [
    { id: 'preop', label: '術前 (Pre-op)' },
    { id: 'postop', label: '術後 (Post-op)' },
    { id: 'ecmo', label: 'ECMO' },
    { id: 'valve', label: 'Valve/LV評估' }
  ];

  const hasRequiredData = date && physician && patientId && bedNumber;

  const purposeLabels = purposes.map(p => {
    const option = purposeOptions.find(opt => opt.id === p);
    return option?.label || p;
  }).join(', ');

  return (
    <div className="bg-card border-b border-card-border">
      {isExpanded ? (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                日期 (Date)
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => onDateChange(e.target.value)}
                data-testid="input-date"
                className="min-h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="physician" className="text-sm font-medium">
                檢查醫師 (Physician)
              </Label>
              <Input
                id="physician"
                value={physician}
                onChange={(e) => onPhysicianChange(e.target.value)}
                placeholder="Enter physician name"
                data-testid="input-physician"
                className="min-h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patientId" className="text-sm font-medium">
                病歷號 (Patient ID)
              </Label>
              <Input
                id="patientId"
                value={patientId}
                onChange={(e) => onPatientIdChange(e.target.value)}
                placeholder="Enter patient ID"
                data-testid="input-patient-id"
                className="min-h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedNumber" className="text-sm font-medium">
                床號 (Bed Number)
              </Label>
              <Input
                id="bedNumber"
                value={bedNumber}
                onChange={(e) => onBedNumberChange(e.target.value)}
                placeholder="Enter bed number"
                data-testid="input-bed-number"
                className="min-h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">目的 (Purpose)</Label>
            <div className="flex flex-wrap gap-4">
              {purposeOptions.map((option) => (
                <div key={option.id} className="flex items-center gap-2">
                  <Checkbox
                    id={option.id}
                    checked={purposes.includes(option.id)}
                    onCheckedChange={() => onPurposeToggle(option.id)}
                    data-testid={`checkbox-purpose-${option.id}`}
                  />
                  <Label htmlFor={option.id} className="font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {hasRequiredData && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(false)}
                data-testid="button-collapse-header"
                className="min-h-9"
              >
                <ChevronUp className="w-4 h-4 mr-2" />
                收起
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <span className="font-medium">{date}</span>
            <span className="text-muted-foreground">|</span>
            <span>{physician}</span>
            <span className="text-muted-foreground">|</span>
            <span>ID: {patientId}</span>
            <span className="text-muted-foreground">|</span>
            <span>床號: {bedNumber}</span>
            {purposeLabels && (
              <>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">{purposeLabels}</span>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            data-testid="button-expand-header"
            className="min-h-9"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            編輯
          </Button>
        </div>
      )}
    </div>
  );
}
