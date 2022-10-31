import { expose, ProxyMarked } from 'comlink';

const GlobalData = {
    prompt: '',
};
const listeners = [];
const api = {
    async changeData(newValue: Partial<typeof GlobalData>) {
        const needUpdate = Object.entries(newValue).some(([key, value]) => {
            if (GlobalData[key] !== value) {
                GlobalData[key] = value;
                return true;
            }
            return false;
        });
        if (needUpdate) listeners.forEach((i) => i());
        return GlobalData;
    },
    getData() {
        return GlobalData;
    },
    onUpdate(cb: (data: typeof GlobalData) => void) {
        listeners.push(() => cb(GlobalData));
    },
};
export type SharedDataAPI = typeof api;
globalThis.onconnect = (event) => {
    const port = event.ports[0];
    expose(api, port);
};
