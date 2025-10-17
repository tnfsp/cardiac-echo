import PLAXView from '../PLAXView';
import { useState } from 'react';

export default function PLAXViewExample() {
  const [data, setData] = useState({
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

  return (
    <PLAXView 
      data={data} 
      onChange={(updates) => setData({ ...data, ...updates })}
    />
  );
}
