import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SummaryData {
  lvFunction: string;
  ef: string;
  fs: string;
  rvFunction: string;
  tapse: string;
  valvular: string;
  asdVsd: string;
  aorta: string;
  pericardium: string;
  ivcVolume: string;
  notes: string;
}

interface SummaryViewProps {
  data: SummaryData;
  onChange: (data: Partial<SummaryData>) => void;
}

export default function SummaryView({ data, onChange }: SummaryViewProps) {
  const renderSummaryItem = (label: string, value: string, testId?: string) => {
    if (!value) return null;
    
    return (
      <div className="space-y-2" data-testid={testId}>
        <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
        <p className="text-base text-foreground leading-relaxed">{value}</p>
      </div>
    );
  };

  const hasAnySummaryData = data.lvFunction || data.rvFunction || data.valvular || 
                            data.asdVsd || data.aorta || data.pericardium || data.ivcVolume;

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6 p-6 max-w-4xl mx-auto pb-24">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Summary & Impression</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {hasAnySummaryData ? (
              <>
                {data.lvFunction && (
                  <div className="space-y-2" data-testid="summary-lv-function">
                    <Label className="text-sm font-medium text-muted-foreground">LV Function</Label>
                    <p className="text-base text-foreground leading-relaxed">
                      {data.lvFunction}
                      {data.ef && `, EF: ${data.ef}%`}
                      {data.fs && `, FS: ${data.fs}%`}
                    </p>
                  </div>
                )}

                {data.rvFunction && (
                  <div className="space-y-2" data-testid="summary-rv-function">
                    <Label className="text-sm font-medium text-muted-foreground">RV Function</Label>
                    <p className="text-base text-foreground leading-relaxed">
                      {data.rvFunction}
                      {data.tapse && `, TAPSE: ${data.tapse}mm`}
                    </p>
                  </div>
                )}

                {renderSummaryItem("MR / TR / AR / AS", data.valvular, "summary-valvular")}
                {renderSummaryItem("ASD / VSD", data.asdVsd, "summary-asd-vsd")}
                {renderSummaryItem("Ao / LA", data.aorta, "summary-aorta")}
                {renderSummaryItem("Pericardium", data.pericardium, "summary-pericardium")}
                {renderSummaryItem("IVC / Volume Status", data.ivcVolume, "summary-ivc-volume")}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Summary will be automatically generated from examination data
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={data.notes}
              onChange={(e) => onChange({ notes: e.target.value })}
              placeholder="輸入臨床筆記或其他備註..."
              className="min-h-48"
              data-testid="textarea-notes"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
