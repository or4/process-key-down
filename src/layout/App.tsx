import * as React from 'react';
import { block } from 'bem-cn';

import { Header, Canvas } from 'components';

import './App.scss';

const b = block('app');

export function App() {
    return (
        <div className={b()}>
            <Header />
            <Canvas />
        </div>
    );
}
