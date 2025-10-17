import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import StepProgress from "@/components/StepProgress";
import PatientHeader from "@/components/PatientHeader";
import PLAXView from "@/components/PLAXView";
import PSAXView from "@/components/PSAXView";
import A4CView from "@/components/A4CView";
import SummaryView from "@/components/SummaryView";
import ViewHeader from "@/components/ViewHeader";
import ValveDetailView from "@/components/ValveDetailView";
import { useToast } from "@/hooks/use-toast";

export default function ExamPage() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState('plax-2d');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Patient info state
  const [patientData, setPatientData] = useState({
    date: new Date().toISOString().split('T')[0],
    physician: '',
    patientId: '',
    bedNumber: '',
    purposes: [] as string[]
  });

  // PLAX data state
  const [plaxData, setPlaxData] = useState({
    avMvStructure: null as string | null,
    pericardialEffusion: null as string | null,
    aorticRoot: '',
    la: '',
    lvot: '',
    ivs: '',
    lvesd: '',
    lvpw: '',
    lvedd: '',
    mr: 'none',
    ms: 'none',
    ar: 'none',
    as: 'none'
  });

  // PSAX data state
  const [psaxData, setPsaxData] = useState({
    avStatus: null as string | null,
    mvStatus: null as string | null,
    lvStatus: null as string | null,
    rvotStatus: null as string | null,
    rvotDiameter: '',
    paDiameter: '',
    lvFS: '',
    lvFSLevel: null as string | null,
    pvColor: '',
    tvColor: '',
    avColor: '',
    trVmax: '',
    rvsp: ''
  });

  // A4C data state
  const [a4cData, setA4cData] = useState({
    lvSize: null as string | null,
    lvContraction: null as string | null,
    simpsonEF: '',
    rvSize: null as string | null,
    rvContraction: null as string | null,
    tapse: '',
    septalMotion: null as string | null,
    ms: 'none',
    mr: 'none',
    mrEROA: '',
    mrVC: '',
    tr: 'none',
    trVC: '',
    mvE: '',
    mvA: '',
    decelTime: '',
    trVmax: '',
    rvsp: '',
    tdiSept: '',
    tdiLat: '',
    eRatio: ''
  });

  // Valve detail data
  const [valveDetailData, setValveDetailData] = useState({});

  // Track which valve details to show
  const [valveDetailsToShow, setValveDetailsToShow] = useState<Array<'AS' | 'AR' | 'MS' | 'MR'>>([]);

  // Summary data state
  const [summaryData, setSummaryData] = useState({
    lvFunction: '',
    ef: '',
    fs: '',
    rvFunction: '',
    tapse: '',
    valvular: '',
    asdVsd: '',
    aorta: '',
    pericardium: '',
    conclusion: ''
  });

  const baseSteps = [
    { id: 'plax-2d', label: 'PLAX - 2D', shortLabel: 'P2D' },
    { id: 'plax-mmode', label: 'PLAX - M-mode', shortLabel: 'PMM' },
    { id: 'plax-color', label: 'PLAX - Color', shortLabel: 'PC' },
    { id: 'plax-doppler', label: 'PLAX - Doppler', shortLabel: 'PD' },
    { id: 'psax-2d', label: 'PSAX - 2D', shortLabel: 'S2D' },
    { id: 'psax-mmode', label: 'PSAX - M-mode', shortLabel: 'SMM' },
    { id: 'psax-color', label: 'PSAX - Color', shortLabel: 'SC' },
    { id: 'psax-doppler', label: 'PSAX - Doppler', shortLabel: 'SD' },
    { id: 'a4c-2d', label: 'A4C - 2D', shortLabel: 'A2D' },
    { id: 'a4c-color', label: 'A4C - Color', shortLabel: 'AC' },
    { id: 'a4c-doppler', label: 'A4C - Doppler', shortLabel: 'AD' },
    { id: 'a2c', label: 'A2C/A3C/A5C', shortLabel: 'A2C' },
    { id: 'subcostal', label: 'Subcostal', shortLabel: 'Sub' },
  ];

  const valveSteps = valveDetailsToShow.map(valve => ({
    id: `valve-${valve.toLowerCase()}`,
    label: valve,
    shortLabel: valve
  }));

  const steps = [
    ...baseSteps,
    ...valveSteps,
    { id: 'summary', label: 'Summary', shortLabel: 'Sum' }
  ];

  // Simplified navigation steps (main views only)
  const getMainSteps = () => {
    const mainSteps = [
      { id: 'plax-2d', label: 'PLAX', shortLabel: 'PLAX' },
      { id: 'psax-2d', label: 'PSAX', shortLabel: 'PSAX' },
      { id: 'a4c-2d', label: 'A4C', shortLabel: 'A4C' },
      { id: 'a2c', label: 'A2C/A3C/A5C', shortLabel: 'A2C' },
      { id: 'subcostal', label: 'Subcostal', shortLabel: 'Sub' },
    ];

    // Add valve details if needed
    if (valveDetailsToShow.length > 0) {
      mainSteps.push({
        id: `valve-${valveDetailsToShow[0].toLowerCase()}`,
        label: 'Valve Details',
        shortLabel: 'Valve'
      });
    }

    mainSteps.push({ id: 'summary', label: 'Summary', shortLabel: 'Sum' });
    
    return mainSteps;
  };

  // Check for valve severity and update valve details to show
  useEffect(() => {
    const newValveDetails: Array<'AS' | 'AR' | 'MS' | 'MR'> = [];
    
    // Check PLAX data
    if (plaxData.mr === 'mod' || plaxData.mr === 'sev') {
      if (!newValveDetails.includes('MR')) newValveDetails.push('MR');
    }
    if (plaxData.ms === 'mod' || plaxData.ms === 'sev') {
      if (!newValveDetails.includes('MS')) newValveDetails.push('MS');
    }
    if (plaxData.ar === 'mod' || plaxData.ar === 'sev') {
      if (!newValveDetails.includes('AR')) newValveDetails.push('AR');
    }
    if (plaxData.as === 'mod' || plaxData.as === 'sev') {
      if (!newValveDetails.includes('AS')) newValveDetails.push('AS');
    }

    // Check A4C data
    if (a4cData.mr === 'mod' || a4cData.mr === 'sev') {
      if (!newValveDetails.includes('MR')) newValveDetails.push('MR');
    }
    if (a4cData.ms === 'mod' || a4cData.ms === 'sev') {
      if (!newValveDetails.includes('MS')) newValveDetails.push('MS');
    }
    if (a4cData.tr === 'mod' || a4cData.tr === 'sev') {
      // TR doesn't have detail view in requirements, skip
    }

    setValveDetailsToShow(newValveDetails);
  }, [plaxData, a4cData]);

  const currentIndex = steps.findIndex(s => s.id === currentStep);

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleStepClick = (stepId: string) => {
    // Map main view clicks to their first substep
    const viewMapping: Record<string, string> = {
      'plax-2d': 'plax-2d',
      'psax-2d': 'psax-2d',
      'a4c-2d': 'a4c-2d',
      'a2c': 'a2c',
      'subcostal': 'subcostal',
      'summary': 'summary'
    };

    // For valve details, if clicking the main "valve" tab, go to first valve detail
    if (stepId.startsWith('valve-')) {
      setCurrentStep(stepId);
    } else {
      setCurrentStep(viewMapping[stepId] || stepId);
    }
  };

  const handlePurposeToggle = (purpose: string) => {
    setPatientData(prev => ({
      ...prev,
      purposes: prev.purposes.includes(purpose)
        ? prev.purposes.filter(p => p !== purpose)
        : [...prev.purposes, purpose]
    }));
  };

  const handleGenerateReport = () => {
    console.log('Generating report with data:', {
      patient: patientData,
      plax: plaxData,
      psax: psaxData,
      a4c: a4cData,
      valveDetails: valveDetailData,
      summary: summaryData
    });

    toast({
      title: "Report Generated",
      description: "Examination report has been generated and uploaded to Google Sheets.",
    });
  };

  // Auto-populate summary based on collected data
  useEffect(() => {
    if (currentStep === 'summary') {
      const updates: any = {};
      
      // LV function
      if (a4cData.lvContraction && a4cData.simpsonEF) {
        const lvDesc = a4cData.lvContraction === 'normal' ? 'Normal' : `Decreased (${a4cData.lvContraction})`;
        updates.lvFunction = lvDesc;
        updates.ef = a4cData.simpsonEF;
      }
      if (psaxData.lvFS) {
        updates.fs = psaxData.lvFS;
      }

      // RV function
      if (a4cData.rvContraction && a4cData.tapse) {
        const rvDesc = a4cData.rvContraction === 'normal' ? 'Normal' : `Decreased (${a4cData.rvContraction})`;
        updates.rvFunction = rvDesc;
        updates.tapse = a4cData.tapse;
      }

      // Valvular
      const valvularParts = [];
      if (plaxData.mr !== 'none') valvularParts.push(`MR: ${plaxData.mr}`);
      if (plaxData.ms !== 'none') valvularParts.push(`MS: ${plaxData.ms}`);
      if (plaxData.ar !== 'none') valvularParts.push(`AR: ${plaxData.ar}`);
      if (plaxData.as !== 'none') valvularParts.push(`AS: ${plaxData.as}`);
      if (a4cData.tr !== 'none') valvularParts.push(`TR: ${a4cData.tr}`);
      if (valvularParts.length > 0) {
        updates.valvular = valvularParts.join(', ');
      }

      // Aorta/LA
      if (plaxData.aorticRoot || plaxData.la) {
        const parts = [];
        if (plaxData.aorticRoot) parts.push(`Ao: ${plaxData.aorticRoot}mm`);
        if (plaxData.la) parts.push(`LA: ${plaxData.la}mm`);
        updates.aorta = parts.join(', ');
      }

      // Pericardium
      if (plaxData.pericardialEffusion && plaxData.pericardialEffusion !== 'none') {
        updates.pericardium = `Pericardial effusion: ${plaxData.pericardialEffusion}`;
      }

      setSummaryData(prev => ({ ...prev, ...updates }));
    }
  }, [currentStep, plaxData, psaxData, a4cData]);

  const getViewColor = (stepId: string) => {
    if (stepId.startsWith('plax-')) return 'bg-[#0B5394]';
    if (stepId.startsWith('psax-')) return 'bg-[#1155CC]';
    if (stepId.startsWith('a4c-')) return 'bg-[#0B8043]';
    if (stepId === 'a2c') return 'bg-[#B45F06]';
    if (stepId === 'subcostal') return 'bg-[#741B47]';
    if (stepId.startsWith('valve-')) return 'bg-[#E67C73]';
    if (stepId === 'summary') return 'bg-[#34A853]';
    
    return 'bg-primary';
  };

  const getViewTitle = (stepId: string) => {
    if (stepId.startsWith('valve-')) {
      const valve = stepId.replace('valve-', '').toUpperCase();
      return `${valve} - Detailed Assessment`;
    }
    
    const titles: Record<string, string> = {
      'plax-2d': 'PLAX - 2D Assessment',
      'plax-mmode': 'PLAX - M-mode',
      'plax-color': 'PLAX - Color Doppler',
      'plax-doppler': 'PLAX - Doppler',
      'psax-2d': 'PSAX - 2D Assessment',
      'psax-mmode': 'PSAX - M-mode',
      'psax-color': 'PSAX - Color Doppler',
      'psax-doppler': 'PSAX - Doppler',
      'a4c-2d': 'A4C - 2D Assessment',
      'a4c-color': 'A4C - Color Doppler',
      'a4c-doppler': 'A4C - Doppler',
      'a2c': 'Apical 2/3/5 Chamber (A2C/A3C/A5C)',
      'subcostal': 'Subcostal View',
      'summary': 'Summary & Impression'
    };
    
    return titles[stepId] || stepId.toUpperCase();
  };

  const renderStepContent = () => {
    if (currentStep.startsWith('valve-')) {
      const valveType = currentStep.replace('valve-', '').toUpperCase() as 'AS' | 'AR' | 'MS' | 'MR';
      return (
        <ValveDetailView
          valveType={valveType}
          data={valveDetailData}
          onChange={(updates) => setValveDetailData({ ...valveDetailData, ...updates })}
        />
      );
    }

    // PLAX substeps
    if (currentStep.startsWith('plax-')) {
      const substep = currentStep.replace('plax-', '') as '2d' | 'mmode' | 'color' | 'doppler';
      return (
        <PLAXView
          data={plaxData}
          onChange={(updates) => setPlaxData({ ...plaxData, ...updates })}
          substep={substep}
        />
      );
    }

    // PSAX substeps
    if (currentStep.startsWith('psax-')) {
      const substep = currentStep.replace('psax-', '') as '2d' | 'mmode' | 'color' | 'doppler';
      return (
        <PSAXView
          data={psaxData}
          onChange={(updates) => setPsaxData({ ...psaxData, ...updates })}
          substep={substep}
        />
      );
    }

    // A4C substeps
    if (currentStep.startsWith('a4c-')) {
      const substep = currentStep.replace('a4c-', '') as '2d' | 'color' | 'doppler';
      return (
        <A4CView
          data={a4cData}
          onChange={(updates) => setA4cData({ ...a4cData, ...updates })}
          substep={substep}
        />
      );
    }

    switch (currentStep) {
      case 'a2c':
      case 'subcostal':
        return (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                {getViewTitle(currentStep)}
              </h3>
              <p className="text-muted-foreground">
                Examination form for this view coming soon
              </p>
            </div>
          </div>
        );
      case 'summary':
        return (
          <SummaryView
            data={summaryData}
            onChange={(updates) => setSummaryData({ ...summaryData, ...updates })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <PatientHeader
        date={patientData.date}
        physician={patientData.physician}
        patientId={patientData.patientId}
        bedNumber={patientData.bedNumber}
        purposes={patientData.purposes}
        onDateChange={(value) => setPatientData({ ...patientData, date: value })}
        onPhysicianChange={(value) => setPatientData({ ...patientData, physician: value })}
        onPatientIdChange={(value) => setPatientData({ ...patientData, patientId: value })}
        onBedNumberChange={(value) => setPatientData({ ...patientData, bedNumber: value })}
        onPurposeToggle={handlePurposeToggle}
      />

      <div className="border-b border-border bg-card">
        <StepProgress
          steps={getMainSteps()}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={handleStepClick}
        />
      </div>

      <ViewHeader
        title={getViewTitle(currentStep)}
        colorClass={getViewColor(currentStep)}
      />

      <div className="flex-1 overflow-hidden">
        {renderStepContent()}
      </div>

      <div className="border-t border-border bg-card p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            data-testid="button-previous"
            className="min-h-11"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep === 'summary' ? (
            <Button
              onClick={handleGenerateReport}
              data-testid="button-generate-report"
              className="bg-secondary text-secondary-foreground hover:bg-secondary min-h-11"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={currentIndex === steps.length - 1}
              data-testid="button-next"
              className="min-h-11"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
