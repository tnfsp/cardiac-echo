import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CheckboxGroup from "./CheckboxGroup";
import MeasurementInput from "./MeasurementInput";
import SeveritySelect from "./SeveritySelect";

interface PSAXData {
  avStatus: string | null;
  mvStatus: string | null;
  lvStatus: string | null;
  rvotStatus: string | null;
  rvotDiameter: string;
  paDiameter: string;
  lvFS: string;
  lvFSLevel: string | null;
  pvColor: string;
  tvColor: string;
  avColor: string;
  trVmax: string;
  rvsp: string;
}

interface PSAXViewProps {
  data: PSAXData;
  onChange: (data: Partial<PSAXData>) => void;
}

export default function PSAXView({ data, onChange }: PSAXViewProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6 p-6 max-w-4xl mx-auto pb-24">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">2D Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <CheckboxGroup
              label="AV 三瓣開閉"
              options={[
                { id: 'normal', label: 'Normal' },
                { id: 'fusion', label: 'Fusion' },
                { id: 'bicuspid', label: 'Bicuspid' }
              ]}
              value={data.avStatus}
              onChange={(value) => onChange({ avStatus: value })}
              testIdPrefix="av-status"
            />

            <CheckboxGroup
              label='MV "fish-mouth"'
              options={[
                { id: 'normal', label: 'Normal' },
                { id: 'restricted', label: 'Restricted' }
              ]}
              value={data.mvStatus}
              onChange={(value) => onChange({ mvStatus: value })}
              testIdPrefix="mv-status"
            />

            <CheckboxGroup
              label="LV Papillary muscle level"
              options={[
                { id: 'normal', label: 'Normal' },
                { id: 'hypokinetic', label: 'Hypokinetic' },
                { id: 'akinetic', label: 'Akinetic' },
                { id: 'asymmetric', label: '不對稱收縮' }
              ]}
              value={data.lvStatus}
              onChange={(value) => onChange({ lvStatus: value })}
              testIdPrefix="lv-status"
            />

            <CheckboxGroup
              label="RVOT"
              options={[
                { id: 'normal', label: 'Normal' },
                { id: 'dilated', label: 'Dilated' },
                { id: 'compression', label: 'Compression' },
                { id: 'dshaped', label: 'D-shaped' }
              ]}
              value={data.rvotStatus}
              onChange={(value) => onChange({ rvotStatus: value })}
              testIdPrefix="rvot-status"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MeasurementInput
                label="RVOT diameter"
                value={data.rvotDiameter}
                onChange={(value) => onChange({ rvotDiameter: value })}
                unit="mm"
                testId="input-rvot-diameter"
              />
              <MeasurementInput
                label="PA"
                value={data.paDiameter}
                onChange={(value) => onChange({ paDiameter: value })}
                unit="mm"
                testId="input-pa-diameter"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">M-mode</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MeasurementInput
                label="LV FS%"
                value={data.lvFS}
                onChange={(value) => onChange({ lvFS: value })}
                unit="%"
                testId="input-lv-fs"
              />
              <div className="space-y-2">
                <CheckboxGroup
                  label="Level"
                  options={[
                    { id: 'normal', label: 'Normal' },
                    { id: 'mild', label: '↓Mild' },
                    { id: 'mod', label: '↓Mod' },
                    { id: 'sev', label: '↓Sev' }
                  ]}
                  value={data.lvFSLevel}
                  onChange={(value) => onChange({ lvFSLevel: value })}
                  testIdPrefix="lv-fs-level"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Color Doppler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <MeasurementInput
              label="PV color"
              value={data.pvColor}
              onChange={(value) => onChange({ pvColor: value })}
              unit=""
              placeholder="描述"
              testId="input-pv-color"
            />
            <MeasurementInput
              label="TV color"
              value={data.tvColor}
              onChange={(value) => onChange({ tvColor: value })}
              unit=""
              placeholder="描述"
              testId="input-tv-color"
            />
            <MeasurementInput
              label="AV color"
              value={data.avColor}
              onChange={(value) => onChange({ avColor: value })}
              unit=""
              placeholder="描述"
              testId="input-av-color"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Doppler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MeasurementInput
                label="TR CW Vmax"
                value={data.trVmax}
                onChange={(value) => onChange({ trVmax: value })}
                unit="m/s"
                testId="input-tr-vmax"
              />
              <MeasurementInput
                label="RVSP"
                value={data.rvsp}
                onChange={(value) => onChange({ rvsp: value })}
                unit="mmHg"
                testId="input-rvsp"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
