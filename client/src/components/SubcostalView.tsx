import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CheckboxGroup from "./CheckboxGroup";
import MeasurementInput from "./MeasurementInput";

interface SubcostalData {
  asd: string | null;
  vsd: string | null;
  pericardialEffusion: string | null;
  ivcDiameter: string;
  ivcCollapseRatio: string;
  volumeStatus: string | null;
  raIvcFlow: string | null;
}

interface SubcostalViewProps {
  data: SubcostalData;
  onChange: (data: Partial<SubcostalData>) => void;
  substep: 'asd-vsd' | 'ivc';
}

export default function SubcostalView({ data, onChange, substep }: SubcostalViewProps) {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {substep === 'asd-vsd' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">ASD / VSD / Pericardium</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CheckboxGroup
                label="ASD (Atrial Septal Defect)"
                options={[
                  { id: 'intact', label: 'Intact' },
                  { id: 'defect', label: 'Defect visible' }
                ]}
                value={data.asd}
                onChange={(value) => onChange({ asd: value })}
                testIdPrefix="asd"
              />

              <CheckboxGroup
                label="VSD (Ventricular Septal Defect)"
                options={[
                  { id: 'intact', label: 'Intact' },
                  { id: 'defect', label: 'Defect visible' }
                ]}
                value={data.vsd}
                onChange={(value) => onChange({ vsd: value })}
                testIdPrefix="vsd"
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
                testIdPrefix="pericardial-effusion"
              />
            </CardContent>
          </Card>
        )}

        {substep === 'ivc' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">IVC Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MeasurementInput
                  label="IVC diameter"
                  value={data.ivcDiameter}
                  onChange={(value) => onChange({ ivcDiameter: value })}
                  unit="cm"
                  testId="input-ivc-diameter"
                />
                <MeasurementInput
                  label="IVC collapse ratio"
                  value={data.ivcCollapseRatio}
                  onChange={(value) => onChange({ ivcCollapseRatio: value })}
                  unit="%"
                  testId="input-ivc-collapse-ratio"
                />
              </div>

              <CheckboxGroup
                label="Volume status"
                options={[
                  { id: 'adequate', label: 'Adequate' },
                  { id: 'low', label: 'Low' },
                  { id: 'congested', label: 'Congested' }
                ]}
                value={data.volumeStatus}
                onChange={(value) => onChange({ volumeStatus: value })}
                testIdPrefix="volume-status"
              />

              <CheckboxGroup
                label="RA / IVC flow"
                options={[
                  { id: 'laminar', label: 'Laminar' },
                  { id: 'turbulent', label: 'Turbulent' }
                ]}
                value={data.raIvcFlow}
                onChange={(value) => onChange({ raIvcFlow: value })}
                testIdPrefix="ra-ivc-flow"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
