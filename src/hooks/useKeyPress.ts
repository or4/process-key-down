import * as React from 'react';

const EVENT_TYPE = 'keypress';

export function useKeyPress() {
    const [pressedValue, setPressedValue] = React.useState('');

    React.useEffect(function() {
        const listener = function(data: KeyboardEvent) {
            setPressedValue(data.key);
        };

        window.addEventListener(EVENT_TYPE, listener, false);

        return function() {
            window.removeEventListener(EVENT_TYPE, listener);
        };
    }, []);

    return pressedValue;
}
