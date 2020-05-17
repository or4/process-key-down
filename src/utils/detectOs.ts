export enum OS {
    Windows = 'windows',
    MacOS = 'macos',
    Ubuntu = 'ubuntu',
    UNIX = 'unix',
    Linux = 'linux',
}

export const osList: OS[] = [];

export function detectOs() {
    if (window.navigator.userAgent.indexOf('Win') !== -1) {
        osList.push(OS.Windows);
    }

    if (window.navigator.userAgent.indexOf('Mac') !== -1) {
        osList.push(OS.MacOS);
    }

    if (window.navigator.userAgent.indexOf('Ubuntu') !== -1) {
        osList.push(OS.Ubuntu);
    }

    if (window.navigator.userAgent.indexOf('Unix') !== -1) {
        osList.push(OS.UNIX);
    }

    if (window.navigator.userAgent.indexOf('Linux') !== -1) {
        osList.push(OS.Linux);
    }

    return osList;
}

detectOs();

export function isOS(os: OS) {
    return osList.includes(os);
}
