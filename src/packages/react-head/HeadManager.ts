export class HeadManager {
    #_instances: { [k: string]: HTMLElement } = {};

    setTitle(title: string) {
        if (!this.#_instances.title) {
            this.#_instances.title = document.head.querySelector('title') as HTMLElement;

            if (!this.#_instances.title) {
                this.#_instances.title = document.createElement('title');
                document.head.appendChild(this.#_instances.title);
            }
        }

        this.#_instances.title.innerText = title;
    }

    setFavicon(favicon: { href: string, type?: string }) {
        if (!this.#_instances.favicon) {
            this.#_instances.favicon = document.head.querySelector('link[rel="icon"]') as HTMLElement;
            if (!this.#_instances.favicon) {
                this.#_instances.favicon = document.createElement('link');
                this.#_instances.favicon.setAttribute('rel', 'icon');
            }

            document.head.appendChild(this.#_instances.favicon);
        }

        this.#_instances.favicon.setAttribute('href', favicon.href);
        this.#_instances.favicon.setAttribute('type', favicon.type || '');
    }

    add(id: string, meta: { [key: string]: string }) {
        if (['title', 'favicon'].includes(id)) {
            throw new Error(`Use setTitle or setFavicon instead of add for ${id}`);
        }

        if (!this.#_instances[id]) {
            this.#_instances[id] = document.createElement('meta');
            document.head.appendChild(this.#_instances[id]);
        }

        for (const key in meta) {
            this.#_instances[id].setAttribute(key, meta[key]);
        }
    }

    remove(id: string) {
        if (this.#_instances[id]) {
            document.head.removeChild(this.#_instances[id]);
            delete this.#_instances[id];
        }
    }
}

export const headManager = new HeadManager();

export default headManager;
