import { Nn as isNull, jt as executeOnSingleOrMultiple } from "./browser-BxZifKFO.js";
//#region node_modules/@tsparticles/plugin-interactivity/browser/Options/Classes/Events/ClickEvent.js
var ClickEvent = class {
	enable;
	mode;
	constructor() {
		this.enable = false;
		this.mode = [];
	}
	load(data) {
		if (isNull(data)) return;
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.mode !== void 0) this.mode = data.mode;
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/Enums/DivType.js
var DivType;
(function(DivType) {
	DivType["circle"] = "circle";
	DivType["rectangle"] = "rectangle";
})(DivType || (DivType = {}));
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/Options/Classes/Events/DivEvent.js
var DivEvent = class {
	enable;
	mode;
	selectors;
	type;
	constructor() {
		this.selectors = [];
		this.enable = false;
		this.mode = [];
		this.type = DivType.circle;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.selectors !== void 0) this.selectors = data.selectors;
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.mode !== void 0) this.mode = data.mode;
		if (data.type !== void 0) this.type = data.type;
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/Options/Classes/Events/HoverEvent.js
var HoverEvent = class {
	enable;
	mode;
	constructor() {
		this.enable = false;
		this.mode = [];
	}
	load(data) {
		if (isNull(data)) return;
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.mode !== void 0) this.mode = data.mode;
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/Options/Classes/Events/Events.js
var Events = class {
	onClick;
	onDiv;
	onHover;
	constructor() {
		this.onClick = new ClickEvent();
		this.onDiv = new DivEvent();
		this.onHover = new HoverEvent();
	}
	load(data) {
		if (isNull(data)) return;
		this.onClick.load(data.onClick);
		const onDiv = data.onDiv;
		if (onDiv !== void 0) this.onDiv = executeOnSingleOrMultiple(onDiv, (t) => {
			const tmp = new DivEvent();
			tmp.load(t);
			return tmp;
		});
		this.onHover.load(data.onHover);
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/Enums/InteractivityDetect.js
var InteractivityDetect;
(function(InteractivityDetect) {
	InteractivityDetect["canvas"] = "canvas";
	InteractivityDetect["parent"] = "parent";
	InteractivityDetect["window"] = "window";
})(InteractivityDetect || (InteractivityDetect = {}));
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/Options/Classes/Modes/Modes.js
var Modes = class {
	#container;
	#pluginManager;
	constructor(pluginManager, container) {
		this.#pluginManager = pluginManager;
		this.#container = container;
	}
	load(data) {
		if (isNull(data)) return;
		if (!this.#container) return;
		const interactors = this.#pluginManager.interactors?.get(this.#container);
		if (!interactors) return;
		for (const interactor of interactors) {
			if (!interactor.loadModeOptions) continue;
			interactor.loadModeOptions(this, data);
		}
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/Options/Classes/Interactivity.js
var Interactivity = class {
	detectsOn;
	events;
	modes;
	constructor(pluginManager, container) {
		this.detectsOn = InteractivityDetect.window;
		this.events = new Events();
		this.modes = new Modes(pluginManager, container);
	}
	load(data) {
		if (isNull(data)) return;
		const detectsOn = data.detectsOn;
		if (detectsOn !== void 0) this.detectsOn = detectsOn;
		this.events.load(data.events);
		this.modes.load(data.modes);
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/Enums/InteractorType.js
var InteractorType;
(function(InteractorType) {
	InteractorType["external"] = "external";
	InteractorType["particles"] = "particles";
})(InteractorType || (InteractorType = {}));
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/InteractivityConstants.js
var clickEvent = "click";
var mouseDownEvent = "pointerdown";
var mouseUpEvent = "pointerup";
var mouseLeaveEvent = "pointerleave";
var mouseMoveEvent = "pointermove";
var touchStartEvent = "touchstart";
var touchEndEvent = "touchend";
var touchMoveEvent = "touchmove";
var touchCancelEvent = "touchcancel";
//#endregion
export { mouseUpEvent as a, touchMoveEvent as c, Interactivity as d, InteractivityDetect as f, mouseMoveEvent as i, touchStartEvent as l, mouseDownEvent as n, touchCancelEvent as o, DivType as p, mouseLeaveEvent as r, touchEndEvent as s, clickEvent as t, InteractorType as u };

//# sourceMappingURL=InteractivityConstants-Cbe_hBA7.js.map