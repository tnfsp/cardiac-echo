import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CheckboxGroup from "./CheckboxGroup";
import MeasurementInput from "./MeasurementInput";

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
  substep: '2d' | 'mmode' | 'color' | 'doppler';
}

export default function PSAXView({ data, onChange, substep }: PSAXViewProps) {
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
        )}

        {substep === 'mmode' && (
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
        )}

        {substep === 'color' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Color Doppler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">PV color</label>
                <Select 
                  value={data.pvColor} 
                  onValueChange={(value) => onChange({ pvColor: value })}
                >
                  <SelectTrigger data-testid="select-pv-color" className="min-h-11">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="ps">PS</SelectItem>
                    <SelectItem value="pr">PR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">TV color</label>
                <Select 
                  value={data.tvColor} 
                  onValueChange={(value) => onChange({ tvColor: value })}
                >
                  <SelectTrigger data-testid="select-tv-color" className="min-h-11">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="tr">TR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">AV color</label>
                <Select 
                  value={data.avColor} 
                  onValueChange={(value) => onChange({ avColor: value })}
                >
                  <SelectTrigger data-testid="select-av-color" className="min-h-11">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="as">AS</SelectItem>
                    <SelectItem value="ar">AR</SelectItem>
                  </SelectContent>
                </Select>
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
        )}
      </div>
    </div>
  );
}
