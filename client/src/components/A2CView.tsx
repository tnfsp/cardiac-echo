import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CheckboxGroup from "./CheckboxGroup";
import MeasurementInput from "./MeasurementInput";
import SeveritySelect from "./SeveritySelect";

interface A2CData {
  lvWallMotion: string | null;
  avLvotStructure: string | null;
  lvotDiameter: string;
  mrAr: string;
  msAs: string;
  avVmax: string;
  avMeanPG: string;
  avAVA: string;
}

interface A2CViewProps {
  data: A2CData;
  onChange: (data: Partial<A2CData>) => void;
  substep: '2d' | 'color' | 'doppler';
}

export default function A2CView({ data, onChange, substep }: A2CViewProps) {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {substep === '2d' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">2D Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CheckboxGroup
                label="LV 壁段運動 (Wall Motion)"
                options={[
                  { id: 'normal', label: 'Normal' },
                  { id: 'rwma', label: 'RWMA' },
                  { id: 'akinetic', label: 'Akinetic' }
                ]}
                value={data.lvWallMotion}
                onChange={(value) => onChange({ lvWallMotion: value })}
                testIdPrefix="lv-wall-motion"
              />

              <CheckboxGroup
                label="AV / LVOT 結構 (Structure)"
                options={[
                  { id: 'normal', label: 'Normal' },
                  { id: 'thickened', label: 'Thickened' },
                  { id: 'calcified', label: 'Calcified' }
                ]}
                value={data.avLvotStructure}
                onChange={(value) => onChange({ avLvotStructure: value })}
                testIdPrefix="av-lvot-structure"
              />

              <MeasurementInput
                label="LVOT diameter"
                value={data.lvotDiameter}
                onChange={(value) => onChange({ lvotDiameter: value })}
                unit="mm"
                testId="input-lvot-diameter"
              />
            </CardContent>
          </Card>
        )}

        {substep === 'color' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Color Doppler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SeveritySelect
                  label="MR / AR"
                  value={data.mrAr}
                  onChange={(value) => onChange({ mrAr: value })}
                  testId="select-mr-ar"
                />
                <SeveritySelect
                  label="MS / AS"
                  value={data.msAs}
                  onChange={(value) => onChange({ msAs: value })}
                  testId="select-ms-as"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {substep === 'doppler' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Doppler - AV (AS) CW VTI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MeasurementInput
                  label="Vmax"
                  value={data.avVmax}
                  onChange={(value) => onChange({ avVmax: value })}
                  unit="m/s"
                  testId="input-av-vmax"
                />
                <MeasurementInput
                  label="Mean PG"
                  value={data.avMeanPG}
                  onChange={(value) => onChange({ avMeanPG: value })}
                  unit="mmHg"
                  testId="input-av-mean-pg"
                />
                <MeasurementInput
                  label="AVA"
                  value={data.avAVA}
                  onChange={(value) => onChange({ avAVA: value })}
                  unit="cm²"
                  testId="input-av-ava"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
