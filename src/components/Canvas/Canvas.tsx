import * as React from 'react';
import { block } from 'bem-cn';
import { detectOs } from 'utils/detectOs';

import './Canvas.scss';

const b = block('canvas');

interface IProps {
    value: string;
}

function drawData(canvas: HTMLCanvasElement | null, value: string) {
    if (!canvas) {
        return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
        return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '30px Arial';
    context.fillText(`${detectOs()}: ${value}`, 20, 35);
}

export function Canvas(props: IProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    drawData(canvasRef.current, props.value);

    return (
        <canvas ref={canvasRef} height="320" width="480" className={b()}>
            Update Browser
        </canvas>
    );
}
