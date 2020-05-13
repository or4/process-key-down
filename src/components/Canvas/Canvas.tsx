import * as React from 'react';
import { block } from 'bem-cn';

import './Canvas.scss';

const b = block('header');

export function Canvas() {
    return <div className={b()}>Canvas</div>;
}
