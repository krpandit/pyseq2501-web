// From https://github.com/arlac77/svelte-websocket-store

import type { Subscriber, Unsubscriber, Updater, Readable, Writable } from "svelte/store"
/**
 * Create a writable store based on a web-socket.
 * Data is transferred as JSON.
 * Keeps socket open (reopens if closed) as long as there are subscriptions.
 * @param {string} url the WebSocket url
 * @param {string[]} socketOptions transparently passed to the WebSocket constructor
 * @return {Store}
 */
const reopenTimeouts = [2000, 5000, 10000, 30000, 60000];
type ValidType = string | ArrayBufferLike | Blob | ArrayBufferView;

export function websocketStore<T>(url: string, initialValue: T, f = (x: ValidType) => x): Writable<T> {
    let socket: WebSocket | undefined
    let openPromise: Promise<boolean> | undefined
    let reopenTimeoutHandler: number | undefined;
    let reopenCount: number = 0;

    const subscribers: Set<Subscriber<T>> = new Set();

    function reopenTimeout(): number {
        const n = reopenCount;
        reopenCount++;
        return reopenTimeouts[
            n >= reopenTimeouts.length - 1 ? reopenTimeouts.length - 1 : n
        ];
    }

    function close(): void {
        if (reopenTimeoutHandler) {
            clearTimeout(reopenTimeoutHandler);
        }

        if (socket) {
            socket.close();
            socket = undefined;
        }
    }

    function reopen(): void {
        close();
        if (subscribers.size > 0) {
            reopenTimeoutHandler = setTimeout(() => open(), reopenTimeout());
        }
    }

    async function open(): Promise<any> {
        if (reopenTimeoutHandler) {
            clearTimeout(reopenTimeoutHandler);
            reopenTimeoutHandler = undefined;
        }

        // we are still in the opening phase
        if (openPromise) return openPromise;

        socket = new WebSocket(url);

        socket.onmessage = (event: MessageEvent): void => {
            // initialValue = JSON.parse(event.data);
            subscribers.forEach((subscriber) => {
                // @ts-ignore
                subscriber(f(event.data))
            });
        };

        socket.onclose = (_: CloseEvent): void => reopen();

        openPromise = new Promise((resolve, reject) => {
            if (socket) {
                socket.onerror = (error: Event): void => {
                    reject(error);
                    openPromise = undefined;
                };
                socket.onopen = (_: Event): void => {
                    reopenCount = 0;
                    resolve(true);
                    openPromise = undefined;
                };
            }
        });
        return openPromise;
    }

    return {
        set(value: T): void {
            if (socket) {
                // @ts-ignore
                const send = () => socket.send(value);
                if (socket.readyState !== WebSocket.OPEN) {
                    open().then(send)
                } else { send() }
            }
        },

        update(_: Updater<any>): void { },

        subscribe(subscriber: Subscriber<T>): Unsubscriber {
            open();
            subscriber(initialValue);
            subscribers.add(subscriber);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    close();
                }
            };
        }
    };
}

export default websocketStore;