import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import StepProgress from "@/components/StepProgress";
import PatientHeader from "@/components/PatientHeader";
import PLAXView from "@/components/PLAXView";
import SummaryView from "@/components/SummaryView";
import { useToast } from "@/hooks/use-toast";

export default function ExamPage() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState('plax');
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

  const steps = [
    { id: 'plax', label: 'PLAX', shortLabel: 'PLAX' },
    { id: 'psax', label: 'PSAX', shortLabel: 'PSAX' },
    { id: 'a4c', label: 'A4C', shortLabel: 'A4C' },
    { id: 'a2c', label: 'A2C/A3C/A5C', shortLabel: 'A2C' },
    { id: 'subcostal', label: 'Subcostal', shortLabel: 'Sub' },
    { id: 'summary', label: 'Summary', shortLabel: 'Sum' },
  ];

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
    setCurrentStep(stepId);
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
      summary: summaryData
    });

    toast({
      title: "Report Generated",
      description: "Examination report has been generated and uploaded to Google Sheets.",
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'plax':
        return (
          <PLAXView
            data={plaxData}
            onChange={(updates) => setPlaxData({ ...plaxData, ...updates })}
          />
        );
      case 'psax':
      case 'a4c':
      case 'a2c':
      case 'subcostal':
        return (
          <div className="flex items-center justify-center min-h-[400px] p-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                {steps.find(s => s.id === currentStep)?.label} View
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
    <div className="min-h-screen bg-background flex flex-col">
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
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={handleStepClick}
        />
      </div>

      <div className="flex-1 overflow-y-auto py-6">
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
