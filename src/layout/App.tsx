import * as React from 'react';
import { block } from 'bem-cn';

import { Header, Canvas } from 'components';
import { useKeyDown } from 'hooks';

import './App.scss';

const b = block('app');

export function App() {
    const pressedValue = useKeyDown();

    return (
        <div className={b()}>
            {React.useMemo(Header, [])}
            <Canvas value={pressedValue} />
        </div>
    );
}
