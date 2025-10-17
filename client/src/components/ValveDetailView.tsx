import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MeasurementInput from "./MeasurementInput";
import CheckboxGroup from "./CheckboxGroup";

interface ValveDetailData {
  // AS fields
  lvotVTI?: string;
  lvotVelocity?: string;
  asCWVTI?: string;
  asVmax?: string;
  asMeanPG?: string;
  asAVA?: string;
  
  // AR fields
  arVC?: string;
  arVmax?: string;
  arPHT?: string;
  
  // MS fields
  msMeanPG?: string;
  msPHT?: string;
  msMVA?: string;
  mvFishmouth?: string | null;
  mvaMeasured?: string;
  
  // MR fields
  mrVC?: string;
  mrPISA?: string;
  mrEROA?: string;
  mrVmax?: string;
  mrVTI?: string;
  pvSWave?: string;
  pvDWave?: string;
  pvAWave?: string;
}

interface ValveDetailViewProps {
  valveType: 'AS' | 'AR' | 'MS' | 'MR';
  data: ValveDetailData;
  onChange: (data: Partial<ValveDetailData>) => void;
}

export default function ValveDetailView({ valveType, data, onChange }: ValveDetailViewProps) {
  const renderContent = () => {
    switch (valveType) {
      case 'AS':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">AS - Aortic Stenosis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MeasurementInput
                    label="LVOT PW VTI"
                    value={data.lvotVTI || ''}
                    onChange={(value) => onChange({ lvotVTI: value })}
                    unit="cm"
                    testId="input-lvot-vti"
                  />
                  <MeasurementInput
                    label="Velocity"
                    value={data.lvotVelocity || ''}
                    onChange={(value) => onChange({ lvotVelocity: value })}
                    unit="cm/s"
                    testId="input-lvot-velocity"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MeasurementInput
                    label="AV (AS) CW VTI Vmax"
                    value={data.asVmax || ''}
                    onChange={(value) => onChange({ asVmax: value })}
                    unit="m/s"
                    testId="input-as-vmax"
                  />
                  <MeasurementInput
                    label="Mean PG"
                    value={data.asMeanPG || ''}
                    onChange={(value) => onChange({ asMeanPG: value })}
                    unit="mmHg"
                    testId="input-as-mean-pg"
                  />
                </div>

                <MeasurementInput
                  label="AVA"
                  value={data.asAVA || ''}
                  onChange={(value) => onChange({ asAVA: value })}
                  unit="cm²"
                  testId="input-as-ava"
                />
              </CardContent>
            </Card>
          </div>
        );

      case 'AR':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">AR - Aortic Regurgitation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MeasurementInput
                  label="AR VC"
                  value={data.arVC || ''}
                  onChange={(value) => onChange({ arVC: value })}
                  unit="mm"
                  testId="input-ar-vc"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MeasurementInput
                    label="AV (AR) CW Vmax"
                    value={data.arVmax || ''}
                    onChange={(value) => onChange({ arVmax: value })}
                    unit="m/s"
                    testId="input-ar-vmax"
                  />
                  <MeasurementInput
                    label="AR slope (PHT)"
                    value={data.arPHT || ''}
                    onChange={(value) => onChange({ arPHT: value })}
                    unit="ms"
                    testId="input-ar-pht"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'MS':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">MS - Mitral Stenosis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <MeasurementInput
                    label="MS CW mean PG"
                    value={data.msMeanPG || ''}
                    onChange={(value) => onChange({ msMeanPG: value })}
                    unit="mmHg"
                    testId="input-ms-mean-pg"
                  />
                  <MeasurementInput
                    label="PHT"
                    value={data.msPHT || ''}
                    onChange={(value) => onChange({ msPHT: value })}
                    unit="ms"
                    testId="input-ms-pht"
                  />
                  <MeasurementInput
                    label="MVA"
                    value={data.msMVA || ''}
                    onChange={(value) => onChange({ msMVA: value })}
                    unit="cm²"
                    testId="input-ms-mva"
                  />
                </div>

                <div className="space-y-3">
                  <CheckboxGroup
                    label='MV "fish-mouth"'
                    options={[
                      { id: 'normal', label: 'Normal' },
                      { id: 'restricted', label: 'Restricted' }
                    ]}
                    value={data.mvFishmouth || null}
                    onChange={(value) => onChange({ mvFishmouth: value })}
                    testIdPrefix="mv-fishmouth"
                  />
                  <MeasurementInput
                    label="MVA (measured)"
                    value={data.mvaMeasured || ''}
                    onChange={(value) => onChange({ mvaMeasured: value })}
                    unit="cm²"
                    testId="input-mva-measured"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'MR':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">MR - Mitral Regurgitation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MeasurementInput
                  label="MR VC"
                  value={data.mrVC || ''}
                  onChange={(value) => onChange({ mrVC: value })}
                  unit="mm"
                  testId="input-mr-vc-detail"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MeasurementInput
                    label="MR PISA"
                    value={data.mrPISA || ''}
                    onChange={(value) => onChange({ mrPISA: value })}
                    unit=""
                    testId="input-mr-pisa"
                  />
                  <MeasurementInput
                    label="EROA"
                    value={data.mrEROA || ''}
                    onChange={(value) => onChange({ mrEROA: value })}
                    unit="cm²"
                    testId="input-mr-eroa-detail"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MeasurementInput
                    label="MR CW Vmax"
                    value={data.mrVmax || ''}
                    onChange={(value) => onChange({ mrVmax: value })}
                    unit="m/s"
                    testId="input-mr-vmax"
                  />
                  <MeasurementInput
                    label="VTI"
                    value={data.mrVTI || ''}
                    onChange={(value) => onChange({ mrVTI: value })}
                    unit="m/s"
                    testId="input-mr-vti"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <MeasurementInput
                    label="PV S wave"
                    value={data.pvSWave || ''}
                    onChange={(value) => onChange({ pvSWave: value })}
                    unit=""
                    testId="input-pv-s-wave"
                  />
                  <MeasurementInput
                    label="D wave"
                    value={data.pvDWave || ''}
                    onChange={(value) => onChange({ pvDWave: value })}
                    unit=""
                    testId="input-pv-d-wave"
                  />
                  <MeasurementInput
                    label="A wave"
                    value={data.pvAWave || ''}
                    onChange={(value) => onChange({ pvAWave: value })}
                    unit=""
                    testId="input-pv-a-wave"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 max-w-4xl mx-auto pb-24">
        {renderContent()}
      </div>
    </div>
  );
}
