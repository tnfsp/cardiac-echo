import PatientHeader from '../PatientHeader';
import { useState } from 'react';

export default function PatientHeaderExample() {
  const [date, setDate] = useState('2025-10-17');
  const [physician, setPhysician] = useState('');
  const [patientId, setPatientId] = useState('');
  const [bedNumber, setBedNumber] = useState('');
  const [purposes, setPurposes] = useState<string[]>([]);

  const handlePurposeToggle = (purpose: string) => {
    setPurposes(prev => 
      prev.includes(purpose) 
        ? prev.filter(p => p !== purpose)
        : [...prev, purpose]
    );
  };

  return (
    <PatientHeader
      date={date}
      physician={physician}
      patientId={patientId}
      bedNumber={bedNumber}
      purposes={purposes}
      onDateChange={setDate}
      onPhysicianChange={setPhysician}
      onPatientIdChange={setPatientId}
      onBedNumberChange={setBedNumber}
      onPurposeToggle={handlePurposeToggle}
    />
  );
}
