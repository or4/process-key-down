import * as React from 'react';
import { block } from 'bem-cn';

import './Canvas.scss';

const b = block('header');

interface IProps {
    value: string;
}

export function Canvas(props: IProps) {
    return <div className={b()}>{props.value}</div>;
}
