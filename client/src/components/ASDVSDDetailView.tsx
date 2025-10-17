import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CheckboxGroup from "./CheckboxGroup";
import MeasurementInput from "./MeasurementInput";

interface ASDVSDDetailData {
  rvotPWVmax: string;
  rvotPWVTI: string;
  rvotCWPVVmax: string;
  rvotCWPVVTI: string;
  asdShunt: string | null;
  asdFlowVelocity: string;
  vsdShunt: string | null;
  vsdFlowVelocity: string;
}

interface ASDVSDDetailViewProps {
  data: ASDVSDDetailData;
  onChange: (data: Partial<ASDVSDDetailData>) => void;
}

export default function ASDVSDDetailView({ data, onChange }: ASDVSDDetailViewProps) {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">RVOT Measurements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MeasurementInput
                label="RVOT PW Vmax"
                value={data.rvotPWVmax}
                onChange={(value) => onChange({ rvotPWVmax: value })}
                unit="m/s"
                testId="input-rvot-pw-vmax"
              />
              <MeasurementInput
                label="RVOT PW VTI"
                value={data.rvotPWVTI}
                onChange={(value) => onChange({ rvotPWVTI: value })}
                unit="cm"
                testId="input-rvot-pw-vti"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MeasurementInput
                label="RVOT CW PV Vmax"
                value={data.rvotCWPVVmax}
                onChange={(value) => onChange({ rvotCWPVVmax: value })}
                unit="m/s"
                testId="input-rvot-cw-pv-vmax"
              />
              <MeasurementInput
                label="RVOT CW PV VTI"
                value={data.rvotCWPVVTI}
                onChange={(value) => onChange({ rvotCWPVVTI: value })}
                unit="cm"
                testId="input-rvot-cw-pv-vti"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">ASD Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CheckboxGroup
              label="ASD Shunt"
              options={[
                { id: 'none', label: 'None' },
                { id: 'l-r', label: 'L→R' },
                { id: 'r-l', label: 'R→L' },
                { id: 'bidirectional', label: 'Bidirectional' }
              ]}
              value={data.asdShunt}
              onChange={(value) => onChange({ asdShunt: value })}
              testIdPrefix="asd-shunt"
            />

            <MeasurementInput
              label="ASD Flow Velocity"
              value={data.asdFlowVelocity}
              onChange={(value) => onChange({ asdFlowVelocity: value })}
              unit="m/s"
              testId="input-asd-flow-velocity"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">VSD Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CheckboxGroup
              label="VSD Shunt"
              options={[
                { id: 'none', label: 'None' },
                { id: 'l-r', label: 'L→R' },
                { id: 'r-l', label: 'R→L' },
                { id: 'bidirectional', label: 'Bidirectional' }
              ]}
              value={data.vsdShunt}
              onChange={(value) => onChange({ vsdShunt: value })}
              testIdPrefix="vsd-shunt"
            />

            <MeasurementInput
              label="VSD Flow Velocity"
              value={data.vsdFlowVelocity}
              onChange={(value) => onChange({ vsdFlowVelocity: value })}
              unit="m/s"
              testId="input-vsd-flow-velocity"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
