import * as React from 'react';
import { fromEvent } from 'rxjs';

import { KeyDownValue } from 'core/processText/types';
import { getCharOrig } from 'core/processText/utils';

const EVENT_TYPE = 'keydown';

export function useKeyDown() {
    const initValue = {
        char: '',
        charOrig: '',
        code: '',
    };

    const [pressedValue, setPressedValue] = React.useState<KeyDownValue>(initValue);

    React.useEffect(function() {
        const subscribe = fromEvent<KeyboardEvent>(document, EVENT_TYPE).subscribe(event => {
            event.preventDefault();
            event.stopPropagation();

            const { key: char, ctrlKey: isCtrl, shiftKey: isShift, altKey: isAlt, metaKey: isMeta, code } = event;
            const charOrig = getCharOrig(event);

            setPressedValue({
                char,
                charOrig,
                code,

                isCtrl,
                isShift,
                isAlt,
                isMeta,
            });
        });

        return function() {
            subscribe.unsubscribe();
        };
    }, []);

    return pressedValue;
}
