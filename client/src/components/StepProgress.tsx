import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
  shortLabel?: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: string;
  completedSteps: string[];
  onStepClick?: (stepId: string) => void;
}

export default function StepProgress({ steps, currentStep, completedSteps, onStepClick }: StepProgressProps) {
  // Determine which main view tab should be highlighted based on current substep
  const getCurrentMainView = () => {
    if (currentStep.startsWith('plax-')) return 'plax-2d';
    if (currentStep.startsWith('psax-')) return 'psax-2d';
    if (currentStep.startsWith('a4c-')) return 'a4c-2d';
    if (currentStep.startsWith('valve-')) return steps.find(s => s.id.startsWith('valve-'))?.id || currentStep;
    return currentStep;
  };

  const mainViewId = getCurrentMainView();
  const currentIndex = steps.findIndex(s => s.id === mainViewId);

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-center justify-between min-w-max gap-2 px-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === mainViewId;
          const isPast = index < currentIndex;

          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => onStepClick?.(step.id)}
                data-testid={`step-${step.id}`}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors min-h-11",
                  isCurrent && "bg-primary text-primary-foreground",
                  isCompleted && !isCurrent && "bg-secondary text-secondary-foreground",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground hover-elevate"
                )}
              >
                {isCompleted && !isCurrent && (
                  <Check className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{step.shortLabel || step.label}</span>
              </button>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-8 h-0.5 mx-1",
                  isPast || isCompleted ? "bg-secondary" : "bg-border"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
