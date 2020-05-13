export enum OS {
    Windows = 'windows',
    MacOS = 'macos',
    Ubuntu = 'ubuntu',
    UNIX = 'unix',
    Linux = 'linux',
}

export function detectOs() {
    if (window.navigator.userAgent.indexOf('Win') !== -1) {
        return OS.Windows;
    }

    if (window.navigator.userAgent.indexOf('Mac') !== -1) {
        return OS.MacOS;
    }

    if (window.navigator.userAgent.indexOf('Ubuntu') !== -1) {
        return OS.Ubuntu;
    }

    if (window.navigator.userAgent.indexOf('Unix') !== -1) {
        return OS.UNIX;
    }

    if (window.navigator.userAgent.indexOf('Linux') !== -1) {
        return OS.Linux;
    }

    return 'Unknown OS';
}
