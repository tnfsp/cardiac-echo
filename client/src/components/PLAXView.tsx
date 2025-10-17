import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CheckboxGroup from "./CheckboxGroup";
import MeasurementInput from "./MeasurementInput";
import SeveritySelect from "./SeveritySelect";

interface PLAXData {
  avMvStructure: string | null;
  pericardialEffusion: string | null;
  aorticRoot: string;
  la: string;
  lvot: string;
  ivs: string;
  lvesd: string;
  lvpw: string;
  lvedd: string;
  mr: string;
  ms: string;
  ar: string;
  as: string;
}

interface PLAXViewProps {
  data: PLAXData;
  onChange: (data: Partial<PLAXData>) => void;
  substep: '2d' | 'mmode-aortic' | 'mmode-lvot' | 'mmode-lv' | 'color' | 'doppler';
}

export default function PLAXView({ data, onChange, substep }: PLAXViewProps) {
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
                label="AV / MV結構 (Structure)"
                options={[
                  { id: 'normal', label: 'Normal' },
                  { id: 'calcified', label: 'Calcified' },
                  { id: 'restricted', label: 'Restricted' },
                  { id: 'sam', label: 'SAM (+/–)' }
                ]}
                value={data.avMvStructure}
                onChange={(value) => onChange({ avMvStructure: value })}
                testIdPrefix="av-mv"
              />

              <CheckboxGroup
                label="Pericardial effusion"
                options={[
                  { id: 'none', label: 'None' },
                  { id: 'mild', label: 'Mild' },
                  { id: 'mod', label: 'Moderate' },
                  { id: 'tamponade', label: 'Tamponade' }
                ]}
                value={data.pericardialEffusion}
                onChange={(value) => onChange({ pericardialEffusion: value })}
                testIdPrefix="pericardial"
              />
            </CardContent>
          </Card>
        )}

        {substep === 'mmode-aortic' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">M-mode - Aortic Root & LA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MeasurementInput
                  label="Aortic root at diastolic"
                  value={data.aorticRoot}
                  onChange={(value) => onChange({ aorticRoot: value })}
                  unit="mm"
                  testId="input-aortic-root"
                />
                <MeasurementInput
                  label="LA"
                  value={data.la}
                  onChange={(value) => onChange({ la: value })}
                  unit="mm"
                  testId="input-la"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {substep === 'mmode-lvot' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">M-mode - LVOT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MeasurementInput
                label="LVOT"
                value={data.lvot}
                onChange={(value) => onChange({ lvot: value })}
                unit="mm"
                testId="input-lvot"
              />
            </CardContent>
          </Card>
        )}

        {substep === 'mmode-lv' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">M-mode - LV</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MeasurementInput
                  label="IVS"
                  value={data.ivs}
                  onChange={(value) => onChange({ ivs: value })}
                  unit="mm"
                  testId="input-ivs"
                />
                <MeasurementInput
                  label="LVESd"
                  value={data.lvesd}
                  onChange={(value) => onChange({ lvesd: value })}
                  unit="mm"
                  testId="input-lvesd"
                />
                <MeasurementInput
                  label="LVPW"
                  value={data.lvpw}
                  onChange={(value) => onChange({ lvpw: value })}
                  unit="mm"
                  testId="input-lvpw"
                />
              </div>

              <MeasurementInput
                label="LVEDd"
                value={data.lvedd}
                onChange={(value) => onChange({ lvedd: value })}
                unit="mm"
                testId="input-lvedd"
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
                  label="MR (Mitral Regurgitation)"
                  value={data.mr}
                  onChange={(value) => onChange({ mr: value })}
                  testId="select-mr"
                />
                <SeveritySelect
                  label="MS (Mitral Stenosis)"
                  value={data.ms}
                  onChange={(value) => onChange({ ms: value })}
                  testId="select-ms"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {substep === 'doppler' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Doppler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SeveritySelect
                  label="AR (Aortic Regurgitation)"
                  value={data.ar}
                  onChange={(value) => onChange({ ar: value })}
                  testId="select-ar"
                />
                <SeveritySelect
                  label="AS (Aortic Stenosis)"
                  value={data.as}
                  onChange={(value) => onChange({ as: value })}
                  testId="select-as"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
