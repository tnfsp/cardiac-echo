import SummaryView from '../SummaryView';
import { useState } from 'react';

export default function SummaryViewExample() {
  const [data, setData] = useState({
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

  return (
    <SummaryView 
      data={data} 
      onChange={(updates) => setData({ ...data, ...updates })}
    />
  );
}
