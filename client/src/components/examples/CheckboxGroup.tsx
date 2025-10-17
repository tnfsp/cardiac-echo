import CheckboxGroup from '../CheckboxGroup';
import { useState } from 'react';

export default function CheckboxGroupExample() {
  const [value, setValue] = useState<string | null>(null);

  const options = [
    { id: 'normal', label: 'Normal' },
    { id: 'calcified', label: 'Calcified' },
    { id: 'restricted', label: 'Restricted' },
    { id: 'sam', label: 'SAM' }
  ];

  return (
    <div className="p-4">
      <CheckboxGroup
        label="AV / MV結構"
        options={options}
        value={value}
        onChange={setValue}
        testIdPrefix="av-mv"
      />
    </div>
  );
}
