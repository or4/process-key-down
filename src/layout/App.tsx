import * as React from 'react';
import { block } from 'bem-cn';

import { Header, Canvas } from 'components';
import { useKeyPress } from 'hooks/useKeyPress';

import './App.scss';

const b = block('app');

export function App() {
    const pressedValue = useKeyPress();

    return (
        <div className={b()}>
            {React.useMemo(Header, [])}
            <Canvas value={pressedValue} />
        </div>
    );
}
