import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CheckboxGroup from "./CheckboxGroup";
import MeasurementInput from "./MeasurementInput";
import SeveritySelect from "./SeveritySelect";

interface A4CData {
  lvSize: string | null;
  lvContraction: string | null;
  simpsonEF: string;
  rvSize: string | null;
  rvContraction: string | null;
  tapse: string;
  septalMotion: string | null;
  ms: string;
  mr: string;
  mrEROA: string;
  mrVC: string;
  tr: string;
  trVC: string;
  mvE: string;
  mvA: string;
  decelTime: string;
  trVmax: string;
  rvsp: string;
  tdiSept: string;
  tdiLat: string;
  eRatio: string;
}

interface A4CViewProps {
  data: A4CData;
  onChange: (data: Partial<A4CData>) => void;
  substep: '2d' | 'color' | 'doppler';
}

export default function A4CView({ data, onChange, substep }: A4CViewProps) {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {substep === '2d' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">2D Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CheckboxGroup
                    label="LV 大小"
                    options={[
                      { id: 'normal', label: 'Normal' },
                      { id: 'enlarged', label: 'Enlarged' }
                    ]}
                    value={data.lvSize}
                    onChange={(value) => onChange({ lvSize: value })}
                    testIdPrefix="lv-size"
                  />
                  <CheckboxGroup
                    label="LV 收縮"
                    options={[
                      { id: 'normal', label: 'Normal' },
                      { id: 'mild', label: '↓Mild' },
                      { id: 'mod', label: '↓Mod' },
                      { id: 'sev', label: '↓Sev' }
                    ]}
                    value={data.lvContraction}
                    onChange={(value) => onChange({ lvContraction: value })}
                    testIdPrefix="lv-contraction"
                  />
                </div>
                <MeasurementInput
                  label="Simpson EF"
                  value={data.simpsonEF}
                  onChange={(value) => onChange({ simpsonEF: value })}
                  unit="%"
                  testId="input-simpson-ef"
                />
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CheckboxGroup
                    label="RV 大小"
                    options={[
                      { id: 'normal', label: 'Normal' },
                      { id: 'enlarged', label: 'Enlarged' }
                    ]}
                    value={data.rvSize}
                    onChange={(value) => onChange({ rvSize: value })}
                    testIdPrefix="rv-size"
                  />
                  <CheckboxGroup
                    label="RV 收縮"
                    options={[
                      { id: 'normal', label: 'Normal' },
                      { id: 'mild', label: '↓Mild' },
                      { id: 'mod', label: '↓Mod' },
                      { id: 'sev', label: '↓Sev' }
                    ]}
                    value={data.rvContraction}
                    onChange={(value) => onChange({ rvContraction: value })}
                    testIdPrefix="rv-contraction"
                  />
                </div>
                <MeasurementInput
                  label="TAPSE"
                  value={data.tapse}
                  onChange={(value) => onChange({ tapse: value })}
                  unit="mm"
                  testId="input-tapse"
                />
              </div>

              <CheckboxGroup
                label="Septal motion"
                options={[
                  { id: 'normal', label: 'Normal' },
                  { id: 'paradoxical', label: 'Paradoxical' }
                ]}
                value={data.septalMotion}
                onChange={(value) => onChange({ septalMotion: value })}
                testIdPrefix="septal-motion"
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
              <SeveritySelect
                label="MS (Mitral Stenosis)"
                value={data.ms}
                onChange={(value) => onChange({ ms: value })}
                testId="select-ms-a4c"
              />
              
              <div className="space-y-3">
                <SeveritySelect
                  label="MR (Mitral Regurgitation)"
                  value={data.mr}
                  onChange={(value) => onChange({ mr: value })}
                  testId="select-mr-a4c"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MeasurementInput
                    label="EROA"
                    value={data.mrEROA}
                    onChange={(value) => onChange({ mrEROA: value })}
                    unit="cm²"
                    testId="input-mr-eroa"
                  />
                  <MeasurementInput
                    label="VC"
                    value={data.mrVC}
                    onChange={(value) => onChange({ mrVC: value })}
                    unit="mm"
                    testId="input-mr-vc"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <SeveritySelect
                  label="TR (Tricuspid Regurgitation)"
                  value={data.tr}
                  onChange={(value) => onChange({ tr: value })}
                  testId="select-tr"
                />
                <MeasurementInput
                  label="VC"
                  value={data.trVC}
                  onChange={(value) => onChange({ trVC: value })}
                  unit="mm"
                  testId="input-tr-vc"
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MeasurementInput
                  label="MV PW inflow E"
                  value={data.mvE}
                  onChange={(value) => onChange({ mvE: value })}
                  unit="cm/s"
                  testId="input-mv-e"
                />
                <MeasurementInput
                  label="A"
                  value={data.mvA}
                  onChange={(value) => onChange({ mvA: value })}
                  unit="cm/s"
                  testId="input-mv-a"
                />
                <MeasurementInput
                  label="Decel time"
                  value={data.decelTime}
                  onChange={(value) => onChange({ decelTime: value })}
                  unit="ms"
                  testId="input-decel-time"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MeasurementInput
                  label="TR CW Vmax"
                  value={data.trVmax}
                  onChange={(value) => onChange({ trVmax: value })}
                  unit="m/s"
                  testId="input-tr-vmax-a4c"
                />
                <MeasurementInput
                  label="RVSP"
                  value={data.rvsp}
                  onChange={(value) => onChange({ rvsp: value })}
                  unit="mmHg"
                  testId="input-rvsp-a4c"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MeasurementInput
                  label="TDI e' sept"
                  value={data.tdiSept}
                  onChange={(value) => onChange({ tdiSept: value })}
                  unit="cm/s"
                  testId="input-tdi-sept"
                />
                <MeasurementInput
                  label="lat"
                  value={data.tdiLat}
                  onChange={(value) => onChange({ tdiLat: value })}
                  unit="cm/s"
                  testId="input-tdi-lat"
                />
                <MeasurementInput
                  label="E/e'"
                  value={data.eRatio}
                  onChange={(value) => onChange({ eRatio: value })}
                  unit=""
                  testId="input-e-ratio"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
