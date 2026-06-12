import { Kt as safeDocument, Wt as manageListener, jt as executeOnSingleOrMultiple, qt as safeIntersectionObserver, ri as visibilityChangeEvent } from "./browser-BxZifKFO.js";
import { a as mouseUpEvent, c as touchMoveEvent, d as Interactivity, f as InteractivityDetect, i as mouseMoveEvent, l as touchStartEvent, n as mouseDownEvent, o as touchCancelEvent, r as mouseLeaveEvent, s as touchEndEvent, t as clickEvent, u as InteractorType } from "./InteractivityConstants-Cbe_hBA7.js";
//#region node_modules/@tsparticles/plugin-interactivity/browser/InteractivityEventListeners.js
var touchDelay = 500;
var InteractivityEventListeners = class {
	#canPush = true;
	#clickPositionPlugins;
	#container;
	#handlers;
	#interactionManager;
	#touches;
	constructor(container, interactionManager) {
		this.#container = container;
		this.#clickPositionPlugins = [];
		this.#interactionManager = interactionManager;
		this.#touches = /* @__PURE__ */ new Map();
		this.#handlers = {
			mouseDown: () => {
				this.#mouseDown();
			},
			mouseLeave: () => {
				this.#mouseTouchFinish();
			},
			mouseMove: (e) => {
				this.#mouseTouchMove(e);
			},
			mouseUp: (e) => {
				this.#mouseTouchClick(e);
			},
			touchStart: (e) => {
				this.#touchStart(e);
			},
			touchMove: (e) => {
				this.#mouseTouchMove(e);
			},
			touchEnd: (e) => {
				this.#touchEnd(e);
			},
			touchCancel: (e) => {
				this.#touchEnd(e);
			},
			touchEndClick: (e) => {
				this.#touchEndClick(e);
			},
			visibilityChange: () => {
				this.#handleVisibilityChange();
			}
		};
	}
	addListeners() {
		this.#manageListeners(true);
	}
	init() {
		this.#clickPositionPlugins.length = 0;
		for (const plugin of this.#container.plugins.filter((p) => !!p.clickPositionValid)) this.#clickPositionPlugins.push(plugin);
	}
	removeListeners() {
		this.#manageListeners(false);
	}
	#doMouseTouchClick = (e) => {
		const container = this.#container, interactionManager = this.#interactionManager, options = container.actualOptions;
		if (this.#canPush) {
			const mouseInteractivity = interactionManager.interactivityData.mouse, mousePos = mouseInteractivity.position;
			if (!mousePos) return;
			mouseInteractivity.clickPosition = { ...mousePos };
			mouseInteractivity.clickTime = performance.now();
			const onClick = options.interactivity?.events.onClick;
			if (!onClick?.mode) return;
			executeOnSingleOrMultiple(onClick.mode, (mode) => {
				interactionManager.handleClickMode(mode);
			});
		}
		if (e.type === "touchend") setTimeout(() => {
			this.#mouseTouchFinish();
		}, touchDelay);
	};
	#handleVisibilityChange = () => {
		this.#mouseTouchFinish();
	};
	#manageInteractivityListeners = (add) => {
		const handlers = this.#handlers, container = this.#container, interactionManager = this.#interactionManager, options = container.actualOptions, interactivityEl = interactionManager.interactivityData.element;
		if (!interactivityEl) return;
		const html = interactivityEl, canvas = container.canvas;
		canvas.setPointerEvents(html === canvas.domElement ? "initial" : "none");
		if (add && !(options.interactivity?.events.onHover.enable || options.interactivity?.events.onClick.enable)) return;
		manageListener(interactivityEl, mouseMoveEvent, handlers.mouseMove, add);
		manageListener(interactivityEl, touchStartEvent, handlers.touchStart, add);
		manageListener(interactivityEl, touchMoveEvent, handlers.touchMove, add);
		if (add) if (options.interactivity?.events.onClick.enable) {
			manageListener(interactivityEl, touchEndEvent, handlers.touchEndClick, add);
			manageListener(interactivityEl, mouseUpEvent, handlers.mouseUp, add);
			manageListener(interactivityEl, mouseDownEvent, handlers.mouseDown, add);
		} else manageListener(interactivityEl, touchEndEvent, handlers.touchEnd, add);
		else {
			manageListener(interactivityEl, touchEndEvent, handlers.touchEndClick, add);
			manageListener(interactivityEl, mouseUpEvent, handlers.mouseUp, add);
			manageListener(interactivityEl, mouseDownEvent, handlers.mouseDown, add);
			manageListener(interactivityEl, touchEndEvent, handlers.touchEnd, add);
		}
		manageListener(interactivityEl, mouseLeaveEvent, handlers.mouseLeave, add);
		manageListener(interactivityEl, touchCancelEvent, handlers.touchCancel, add);
	};
	#manageListeners = (add) => {
		const handlers = this.#handlers, container = this.#container, interactionManager = this.#interactionManager, detectType = container.actualOptions.interactivity?.detectsOn, canvasEl = container.canvas.domElement;
		if (detectType === InteractivityDetect.window) interactionManager.interactivityData.element = safeDocument();
		else if (detectType === InteractivityDetect.parent && canvasEl) interactionManager.interactivityData.element = canvasEl.parentElement ?? canvasEl.parentNode;
		else interactionManager.interactivityData.element = canvasEl;
		this.#manageInteractivityListeners(add);
		manageListener(document, visibilityChangeEvent, handlers.visibilityChange, add, false);
	};
	#mouseDown = () => {
		const { interactivityData } = this.#interactionManager, { mouse } = interactivityData;
		mouse.clicking = true;
		mouse.downPosition = mouse.position;
	};
	#mouseTouchClick = (e) => {
		const container = this.#container, interactionManager = this.#interactionManager, options = container.actualOptions, { mouse } = interactionManager.interactivityData;
		mouse.inside = true;
		let handled = false;
		const mousePosition = mouse.position;
		if (!mousePosition || !options.interactivity?.events.onClick.enable) return;
		for (const plugin of this.#clickPositionPlugins) {
			handled = plugin.clickPositionValid?.(mousePosition) ?? false;
			if (handled) break;
		}
		if (!handled) this.#doMouseTouchClick(e);
		mouse.clicking = false;
	};
	#mouseTouchFinish = () => {
		const { interactivityData } = this.#interactionManager, { mouse } = interactivityData;
		delete mouse.position;
		delete mouse.clickPosition;
		delete mouse.downPosition;
		interactivityData.status = mouseLeaveEvent;
		mouse.inside = false;
		mouse.clicking = false;
	};
	#mouseTouchMove = (e) => {
		const container = this.#container, interactionManager = this.#interactionManager, options = container.actualOptions, interactivity = interactionManager.interactivityData, canvasEl = container.canvas.domElement;
		if (!interactivity.element) return;
		interactivity.mouse.inside = true;
		let pos;
		if (e.type.startsWith("pointer")) {
			this.#canPush = true;
			const mouseEvent = e;
			if (interactivity.element === safeDocument()) {
				if (canvasEl) {
					const clientRect = canvasEl.getBoundingClientRect();
					pos = {
						x: mouseEvent.clientX - clientRect.left,
						y: mouseEvent.clientY - clientRect.top
					};
				}
			} else if (options.interactivity?.detectsOn === InteractivityDetect.parent) {
				const source = mouseEvent.target, target = mouseEvent.currentTarget;
				if (canvasEl) {
					const sourceRect = source.getBoundingClientRect(), targetRect = target.getBoundingClientRect(), canvasRect = canvasEl.getBoundingClientRect();
					pos = {
						x: mouseEvent.offsetX + 2 * sourceRect.left - (targetRect.left + canvasRect.left),
						y: mouseEvent.offsetY + 2 * sourceRect.top - (targetRect.top + canvasRect.top)
					};
				} else pos = {
					x: mouseEvent.offsetX,
					y: mouseEvent.offsetY
				};
			} else if (mouseEvent.target === canvasEl) pos = {
				x: mouseEvent.offsetX,
				y: mouseEvent.offsetY
			};
		} else {
			this.#canPush = e.type !== "touchmove";
			if (canvasEl) {
				const touchEvent = e, lastTouch = touchEvent.touches[touchEvent.touches.length - 1], canvasRect = canvasEl.getBoundingClientRect();
				if (!lastTouch) return;
				pos = {
					x: lastTouch.clientX - canvasRect.left,
					y: lastTouch.clientY - canvasRect.top
				};
			}
		}
		const pxRatio = container.retina.pixelRatio;
		if (pos) {
			pos.x *= pxRatio;
			pos.y *= pxRatio;
		}
		interactivity.mouse.position = pos;
		interactivity.status = mouseMoveEvent;
	};
	#touchEnd = (e) => {
		const evt = e, touches = Array.from(evt.changedTouches);
		for (const touch of touches) this.#touches.delete(touch.identifier);
		this.#mouseTouchFinish();
	};
	#touchEndClick = (e) => {
		const evt = e, touches = Array.from(evt.changedTouches);
		for (const touch of touches) this.#touches.delete(touch.identifier);
		this.#mouseTouchClick(e);
	};
	#touchStart = (e) => {
		const evt = e, touches = Array.from(evt.changedTouches);
		for (const touch of touches) this.#touches.set(touch.identifier, performance.now());
		this.#mouseTouchMove(e);
	};
};
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/InteractionManager.js
var clickRadius = 1, touchEndLengthOffset = 1, minCoordinate = 0;
var InteractionManager = class {
	interactivityData;
	#clickHandlers;
	#container;
	#eventListeners;
	#externalInteractors;
	#interactors;
	#intersectionObserver;
	#particleInteractors;
	#pluginManager;
	constructor(pluginManager, container) {
		this.#container = container;
		this.#pluginManager = pluginManager;
		this.#interactors = [];
		this.#externalInteractors = [];
		this.#particleInteractors = [];
		this.#clickHandlers = /* @__PURE__ */ new Map();
		this.#eventListeners = new InteractivityEventListeners(container, this);
		this.interactivityData = { mouse: {
			clicking: false,
			inside: false
		} };
		this.#intersectionObserver = safeIntersectionObserver((entries) => {
			this.#intersectionManager(entries);
		});
	}
	addClickHandler(callback) {
		const container = this.#container, interactivityData = this.interactivityData;
		if (container.destroyed) return;
		const el = interactivityData.element;
		if (!el) return;
		const clickOrTouchHandler = (e, pos, radius) => {
			if (container.destroyed) return;
			const pxRatio = container.retina.pixelRatio, posRetina = {
				x: pos.x * pxRatio,
				y: pos.y * pxRatio
			};
			callback(e, container.particles.grid.queryCircle(posRetina, radius * pxRatio));
		}, clickHandler = (e) => {
			if (container.destroyed) return;
			const mouseEvent = e;
			clickOrTouchHandler(e, {
				x: mouseEvent.offsetX,
				y: mouseEvent.offsetY
			}, clickRadius);
		}, touchStartHandler = () => {
			if (container.destroyed) return;
			touched = true;
			touchMoved = false;
		}, touchMoveHandler = () => {
			if (container.destroyed) return;
			touchMoved = true;
		}, touchEndHandler = (e) => {
			if (container.destroyed) return;
			if (touched && !touchMoved) {
				const touchEvent = e, lastTouch = touchEvent.touches[touchEvent.touches.length - touchEndLengthOffset];
				if (!lastTouch) return;
				const element = container.canvas.domElement, canvasRect = element ? element.getBoundingClientRect() : void 0;
				clickOrTouchHandler(e, {
					x: lastTouch.clientX - (canvasRect ? canvasRect.left : minCoordinate),
					y: lastTouch.clientY - (canvasRect ? canvasRect.top : minCoordinate)
				}, Math.max(lastTouch.radiusX, lastTouch.radiusY));
			}
			touched = false;
			touchMoved = false;
		}, touchCancelHandler = () => {
			if (container.destroyed) return;
			touched = false;
			touchMoved = false;
		};
		let touched = false, touchMoved = false;
		this.#clickHandlers.set(clickEvent, clickHandler);
		this.#clickHandlers.set(touchStartEvent, touchStartHandler);
		this.#clickHandlers.set(touchMoveEvent, touchMoveHandler);
		this.#clickHandlers.set(touchEndEvent, touchEndHandler);
		this.#clickHandlers.set(touchCancelEvent, touchCancelHandler);
		for (const [key, handler] of this.#clickHandlers) el.addEventListener(key, handler);
	}
	addListeners() {
		this.#eventListeners.addListeners();
	}
	clearClickHandlers() {
		const container = this.#container, interactivityData = this.interactivityData;
		if (container.destroyed) return;
		for (const [key, handler] of this.#clickHandlers) interactivityData.element?.removeEventListener(key, handler);
		this.#clickHandlers.clear();
	}
	externalInteract(delta) {
		for (const interactor of this.#externalInteractors) {
			const interactivityData = this.interactivityData;
			if (interactor.isEnabled(interactivityData)) interactor.interact(interactivityData, delta);
		}
	}
	handleClickMode(mode) {
		if (this.#container.destroyed) return;
		const interactivityData = this.interactivityData;
		for (const interactor of this.#externalInteractors) interactor.handleClickMode?.(mode, interactivityData);
	}
	init() {
		this.#eventListeners.init();
		for (const interactor of this.#interactors) {
			switch (interactor.type) {
				case InteractorType.external:
					this.#externalInteractors.push(interactor);
					break;
				case InteractorType.particles:
					this.#particleInteractors.push(interactor);
					break;
			}
			interactor.init();
		}
	}
	async initInteractors() {
		const interactors = await this.#pluginManager.getInteractors?.(this.#container, true);
		if (!interactors) return;
		this.#interactors = interactors;
		this.#externalInteractors = [];
		this.#particleInteractors = [];
	}
	particlesInteract(particle, delta) {
		const interactivityData = this.interactivityData;
		for (const interactor of this.#externalInteractors) interactor.clear(particle, delta);
		for (const interactor of this.#particleInteractors) if (interactor.isEnabled(particle, interactivityData)) interactor.interact(particle, interactivityData, delta);
	}
	removeListeners() {
		this.#eventListeners.removeListeners();
	}
	reset(particle) {
		const interactivityData = this.interactivityData;
		for (const interactor of this.#externalInteractors) if (interactor.isEnabled(interactivityData)) interactor.reset(interactivityData, particle);
		for (const interactor of this.#particleInteractors) if (interactor.isEnabled(particle, interactivityData)) interactor.reset(interactivityData, particle);
	}
	startObserving() {
		const interactivityData = this.interactivityData;
		if (interactivityData.element instanceof HTMLElement && this.#intersectionObserver) this.#intersectionObserver.observe(interactivityData.element);
	}
	stopObserving() {
		const interactivityData = this.interactivityData;
		if (interactivityData.element instanceof HTMLElement && this.#intersectionObserver) this.#intersectionObserver.unobserve(interactivityData.element);
	}
	updateMaxDistance() {
		let maxTotalDistance = 0;
		for (const interactor of this.#interactors) if (interactor.maxDistance > maxTotalDistance) maxTotalDistance = interactor.maxDistance;
		const container = this.#container;
		container.particles.grid.setCellSize(maxTotalDistance * container.retina.pixelRatio);
	}
	#intersectionManager = (entries) => {
		const container = this.#container;
		if (container.destroyed || !container.actualOptions.pauseOnOutsideViewport) return;
		for (const entry of entries) {
			if (entry.target !== this.interactivityData.element) continue;
			if (entry.isIntersecting) container.play();
			else container.pause();
		}
	};
};
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/InteractivityPluginInstance.js
var InteractivityPluginInstance = class {
	interactionManager;
	#container;
	#pluginManager;
	constructor(pluginManager, container) {
		this.#container = container;
		this.#pluginManager = pluginManager;
		this.interactionManager = new InteractionManager(pluginManager, container);
		this.#container.addClickHandler = (callback) => {
			this.interactionManager.addClickHandler(callback);
		};
	}
	addClickHandler(callback) {
		this.interactionManager.addClickHandler(callback);
	}
	clearClickHandlers() {
		this.interactionManager.clearClickHandlers();
	}
	destroy() {
		this.clearClickHandlers();
		this.#pluginManager.interactors?.delete(this.#container);
	}
	particleCreated(particle) {
		const interactivityParticle = particle, interactivity = new Interactivity(this.#pluginManager, this.#container);
		interactivity.load(this.#container.actualOptions.interactivity);
		interactivity.load(interactivityParticle.options.interactivity);
		interactivityParticle.interactivity = interactivity;
	}
	particleReset(particle) {
		this.interactionManager.reset(particle);
	}
	postParticleUpdate(particle, delta) {
		this.interactionManager.particlesInteract(particle, delta);
	}
	postUpdate(delta) {
		this.interactionManager.externalInteract(delta);
		this.interactionManager.updateMaxDistance();
	}
	async preInit() {
		await this.interactionManager.initInteractors();
		this.interactionManager.init();
	}
	async redrawInit() {
		await this.interactionManager.initInteractors();
		this.interactionManager.init();
	}
	start() {
		this.interactionManager.addListeners();
		this.interactionManager.startObserving();
		return Promise.resolve();
	}
	stop() {
		this.interactionManager.removeListeners();
		this.interactionManager.stopObserving();
	}
};
//#endregion
export { InteractivityPluginInstance };

//# sourceMappingURL=InteractivityPluginInstance-BIKrUnWg.js.map