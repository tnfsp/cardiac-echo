import SeveritySelect from '../SeveritySelect';
import { useState } from 'react';

export default function SeveritySelectExample() {
  const [value, setValue] = useState('none');

  return (
    <div className="p-4 max-w-sm">
      <SeveritySelect
        label="MR (Mitral Regurgitation)"
        value={value}
        onChange={setValue}
        testId="select-mr"
      />
    </div>
  );
}
