export interface KeyDownValue {
    char: string;
    charOrig: string;
    code: string;

    isCtrl?: boolean;
    isShift?: boolean;
    isAlt?: boolean;
    isMeta?: boolean;
}

export type ControlKeys = 'isCtrl' | 'isShift' | 'isAlt' | 'isMeta';
export const CONTROL_KEYS: ControlKeys[] = ['isCtrl', 'isShift', 'isAlt', 'isMeta'];
export const CONTROL_KEYS_OUTPUT: { [key in ControlKeys]: string } = {
    isCtrl: 'Ctrl+',
    isShift: 'Shift+',
    isAlt: 'Alt+',
    isMeta: 'Cmd+',
};
export const SKIP_KEY_DOWN_VALUES = ['Control', 'Shift', 'Alt', 'Meta'];
