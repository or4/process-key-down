import * as React from 'react';
import { block } from 'bem-cn';

import './Header.scss';

const b = block('header');

export function Header() {
    return <div className={b()}>Please, press any key</div>;
}
