import StepProgress from '../StepProgress';
import { useState } from 'react';

export default function StepProgressExample() {
  const [currentStep, setCurrentStep] = useState('plax');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps = [
    { id: 'plax', label: 'PLAX', shortLabel: 'PLAX' },
    { id: 'psax', label: 'PSAX', shortLabel: 'PSAX' },
    { id: 'a4c', label: 'A4C', shortLabel: 'A4C' },
    { id: 'a2c', label: 'A2C/A3C/A5C', shortLabel: 'A2C' },
    { id: 'subcostal', label: 'Subcostal', shortLabel: 'Sub' },
    { id: 'summary', label: 'Summary', shortLabel: 'Sum' },
  ];

  return (
    <StepProgress 
      steps={steps} 
      currentStep={currentStep} 
      completedSteps={completedSteps}
      onStepClick={(id) => {
        console.log('Step clicked:', id);
        setCurrentStep(id);
      }}
    />
  );
}
