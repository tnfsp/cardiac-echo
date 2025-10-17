import MeasurementInput from '../MeasurementInput';
import { useState } from 'react';

export default function MeasurementInputExample() {
  const [value, setValue] = useState('');

  return (
    <div className="p-4 max-w-sm">
      <MeasurementInput
        label="Aortic root at diastolic"
        value={value}
        onChange={setValue}
        unit="mm"
        testId="input-aortic-root"
      />
    </div>
  );
}
