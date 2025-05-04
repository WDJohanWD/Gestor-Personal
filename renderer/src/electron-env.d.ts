export { };

declare global {
    interface Window {
        electron: {
            ipcRenderer: {
                invoke<T = unknown>(channel: string, ...args: unknown[]): Promise<T>;
                on(channel: string, listener: (...args: unknown[]) => void): void;
                removeAllListeners(channel: string): void;
            };
        };
    }
}
