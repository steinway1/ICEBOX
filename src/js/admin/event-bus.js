export default class EventBus {

	constructor() {
		this.events = new Map()
	}

	static getInstance() {
		if (!EventBus.instance) {
			EventBus.instance = new EventBus()
		}
		return EventBus.instance
	}


	emit(eventName, ...args) {
		console.log(`Event emitted: ${eventName}`, args);
		const callbacks = this.events.get(eventName)
		if (callbacks) {
			callbacks.forEach(callback => callback(...args))
		}
	}

	on(eventName, callback) {
		if (!this.events.has(eventName)) {
			this.events.set(eventName, [])
		}
		this.events.get(eventName)?.push(callback)
	}

	off(eventName, callback) {
		const callbacks = this.events.get(eventName);
		if (callbacks) {
			this.events.set(eventName, callbacks.filter(cb => cb !== callback));
		}
	}
}