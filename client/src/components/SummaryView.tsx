import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
  conclusion: string;
}

interface SummaryViewProps {
  data: SummaryData;
  onChange: (data: Partial<SummaryData>) => void;
}

export default function SummaryView({ data, onChange }: SummaryViewProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6 p-6 max-w-4xl mx-auto pb-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Clinical Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">LV function</Label>
            <div className="flex gap-4">
              <Input
                value={data.lvFunction}
                onChange={(e) => onChange({ lvFunction: e.target.value })}
                placeholder="Enter LV function description"
                className="flex-1 min-h-11"
                data-testid="input-lv-function"
              />
              <Input
                value={data.ef}
                onChange={(e) => onChange({ ef: e.target.value })}
                placeholder="EF %"
                className="w-24 min-h-11"
                data-testid="input-ef"
              />
              <Input
                value={data.fs}
                onChange={(e) => onChange({ fs: e.target.value })}
                placeholder="FS %"
                className="w-24 min-h-11"
                data-testid="input-fs"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">RV function</Label>
            <div className="flex gap-4">
              <Input
                value={data.rvFunction}
                onChange={(e) => onChange({ rvFunction: e.target.value })}
                placeholder="Enter RV function description"
                className="flex-1 min-h-11"
                data-testid="input-rv-function"
              />
              <Input
                value={data.tapse}
                onChange={(e) => onChange({ tapse: e.target.value })}
                placeholder="TAPSE mm"
                className="w-32 min-h-11"
                data-testid="input-tapse"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="valvular" className="text-sm font-medium">MR / TR / AR / AS</Label>
            <Input
              id="valvular"
              value={data.valvular}
              onChange={(e) => onChange({ valvular: e.target.value })}
              placeholder="Enter valvular assessment"
              className="min-h-11"
              data-testid="input-valvular"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="asdVsd" className="text-sm font-medium">ASD / VSD</Label>
            <Input
              id="asdVsd"
              value={data.asdVsd}
              onChange={(e) => onChange({ asdVsd: e.target.value })}
              placeholder="Enter septal defect assessment"
              className="min-h-11"
              data-testid="input-asd-vsd"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="aorta" className="text-sm font-medium">Ao / Asc Ao / LA</Label>
            <Input
              id="aorta"
              value={data.aorta}
              onChange={(e) => onChange({ aorta: e.target.value })}
              placeholder="Enter aortic assessment"
              className="min-h-11"
              data-testid="input-aorta"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="pericardium" className="text-sm font-medium">Pericardium / IVC</Label>
            <Input
              id="pericardium"
              value={data.pericardium}
              onChange={(e) => onChange({ pericardium: e.target.value })}
              placeholder="Enter pericardial assessment"
              className="min-h-11"
              data-testid="input-pericardium"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="conclusion" className="text-sm font-medium">Conclusion / Impression</Label>
            <Textarea
              id="conclusion"
              value={data.conclusion}
              onChange={(e) => onChange({ conclusion: e.target.value })}
              placeholder="Enter clinical conclusion and impression"
              className="min-h-32"
              data-testid="textarea-conclusion"
            />
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
