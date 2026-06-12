import { $t as OutModeDirection, An as isArray, At as deepExtend, Bt as isInArray, Cn as getRangeValue, Dt as circleBounce, En as randomInRangeValue, Et as calculateBounds, Fn as isObject, Ft as getItemsFromInitializer, Ht as itemFromArray, Kt as safeDocument, Ln as Vector, Mt as findItemFromSingleOrMultiple, Nn as isNull, Or as millisecondsToSeconds, Ot as circleBounceDataFromParticle, Pt as getItemMapFromInitializer, Tn as parseAlpha, Ut as itemFromSingleOrMultiple, V as ParticlesBounce, Vt as isPointInside, X as RangedAnimationValueWithRandom, Xt as updateAnimation, Z as ValueWithRandom, _ as rgbToHsl, _t as RotateDirection, at as AnimatableColor, b as updateColor, bt as Rectangle, c as getLinkColor, d as getStyleFromHsl, dn as clamp, dt as EasingType, en as DestroyType, f as getStyleFromRgb, ft as ParticleOutType, gn as getDistances, h as rangeColorToHsl, ht as OutMode, jt as executeOnSingleOrMultiple, kn as setRangeValue, l as getLinkRandomColor, m as hslaToRgba, mn as getDistance, o as getHslAnimationFromHsl, ot as OptionsColor, p as hslToRgb, pn as degToRad, r as colorMix, tn as AnimationStatus, ur as doublePI, ut as RangedAnimationOptions, vr as half$1, xn as getRangeMax, xt as getLogger, yn as getRandom, yt as Circle, zr as originPoint, zt as initParticleNumericAnimationValue } from "./browser-BxZifKFO.js";
import { d as Interactivity, i as mouseMoveEvent, p as DivType, u as InteractorType } from "./InteractivityConstants-Cbe_hBA7.js";
//#region node_modules/@tsparticles/plugin-blend/browser/Options/Classes/Blend.js
var Blend = class {
	enable;
	mode;
	constructor() {
		this.mode = "destination-out";
		this.enable = false;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.mode !== void 0) this.mode = data.mode;
		if (data.enable !== void 0) this.enable = data.enable;
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-blend/browser/BlendPlugin.js
var BlendPlugin = class {
	id = "blend";
	async getPlugin(container) {
		const { BlendPluginInstance } = await import("./BlendPluginInstance-8QZpESuI.js");
		return new BlendPluginInstance(container);
	}
	loadOptions(_container, options, source) {
		if (!this.needsPlugin(options) && !this.needsPlugin(source)) return;
		let blendOptions = options.blend;
		if (!blendOptions?.load) options.blend = blendOptions = new Blend();
		blendOptions.load(source?.blend);
	}
	loadParticlesOptions(_container, options, source) {
		options.blend ??= new Blend();
		options.blend.load(source?.blend);
	}
	needsPlugin(options) {
		return !!options?.blend?.enable || !!options?.particles?.blend?.enable;
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-blend/browser/index.js
async function loadBlendPlugin(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addPlugin(new BlendPlugin());
	});
}
//#endregion
//#region node_modules/@tsparticles/shape-circle/browser/Utils.js
var minAngle$1 = 0;
function drawCircle(data) {
	const { context, particle, radius } = data;
	particle.circleRange ??= {
		min: minAngle$1,
		max: doublePI
	};
	const circleRange = particle.circleRange;
	context.arc(originPoint.x, originPoint.y, radius, circleRange.min, circleRange.max, false);
}
//#endregion
//#region node_modules/@tsparticles/shape-circle/browser/CircleDrawer.js
var sides$4 = 12, maxAngle = 360, minAngle = 0;
var CircleDrawer = class {
	draw(data) {
		drawCircle(data);
	}
	getSidesCount() {
		return sides$4;
	}
	particleInit(_container, particle) {
		const angle = particle.shapeData?.angle ?? {
			max: maxAngle,
			min: minAngle
		};
		particle.circleRange = isObject(angle) ? {
			min: degToRad(angle.min),
			max: degToRad(angle.max)
		} : {
			min: minAngle,
			max: degToRad(angle)
		};
	}
};
//#endregion
//#region node_modules/@tsparticles/shape-circle/browser/index.js
async function loadCircleShape(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addShape(["circle"], () => {
			return Promise.resolve(new CircleDrawer());
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/plugin-hex-color/browser/HexColorManager.js
var RgbIndexes$1;
(function(RgbIndexes) {
	RgbIndexes[RgbIndexes["r"] = 1] = "r";
	RgbIndexes[RgbIndexes["g"] = 2] = "g";
	RgbIndexes[RgbIndexes["b"] = 3] = "b";
	RgbIndexes[RgbIndexes["a"] = 4] = "a";
})(RgbIndexes$1 || (RgbIndexes$1 = {}));
var shorthandHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i, hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i, hexRadix = 16, defaultAlpha = 1, alphaFactor$1 = 255;
var HexColorManager = class {
	accepts(input) {
		return input.startsWith("#");
	}
	handleColor(color) {
		return this.#parseString(color.value);
	}
	handleRangeColor(color) {
		return this.#parseString(color.value);
	}
	parseString(input) {
		return this.#parseString(input);
	}
	#parseString(hexColor) {
		if (typeof hexColor !== "string" || !this.accepts(hexColor)) return;
		const hexFixed = hexColor.replace(shorthandHexRegex, (_, r, g, b, a) => {
			return r + r + g + g + b + b + (a === void 0 ? "" : a + a);
		}), result = hexRegex.exec(hexFixed);
		return result ? {
			a: result[RgbIndexes$1.a] ? Number.parseInt(result[RgbIndexes$1.a], hexRadix) / alphaFactor$1 : defaultAlpha,
			b: Number.parseInt(result[RgbIndexes$1.b] ?? "0", hexRadix),
			g: Number.parseInt(result[RgbIndexes$1.g] ?? "0", hexRadix),
			r: Number.parseInt(result[RgbIndexes$1.r] ?? "0", hexRadix)
		} : void 0;
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-hex-color/browser/index.js
async function loadHexColorPlugin(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addColorManager("hex", new HexColorManager());
	});
}
//#endregion
//#region node_modules/@tsparticles/plugin-hsl-color/browser/HslColorManager.js
var HslIndexes;
(function(HslIndexes) {
	HslIndexes[HslIndexes["h"] = 1] = "h";
	HslIndexes[HslIndexes["s"] = 2] = "s";
	HslIndexes[HslIndexes["l"] = 3] = "l";
	HslIndexes[HslIndexes["a"] = 5] = "a";
})(HslIndexes || (HslIndexes = {}));
var hslRegex = /hsla?\(\s*(\d+)\s*[\s,]\s*(\d+)%\s*[\s,]\s*(\d+)%\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i;
var HslColorManager = class {
	accepts(input) {
		return input.startsWith("hsl");
	}
	handleColor(color) {
		const hslColor = color.value.hsl ?? color.value;
		if (!("h" in hslColor) || !("s" in hslColor) || !("l" in hslColor)) return;
		return hslToRgb(hslColor);
	}
	handleRangeColor(color) {
		const hslColor = color.value.hsl ?? color.value;
		if (!("h" in hslColor) || !("s" in hslColor) || !("l" in hslColor)) return;
		return hslToRgb({
			h: getRangeValue(hslColor.h),
			l: getRangeValue(hslColor.l),
			s: getRangeValue(hslColor.s)
		});
	}
	parseString(input) {
		if (!this.accepts(input)) return;
		const result = hslRegex.exec(input), minLength = 4, defaultAlpha = 1, radix = 10;
		return result ? hslaToRgba({
			a: result.length > minLength ? parseAlpha(result[HslIndexes.a]) : defaultAlpha,
			h: Number.parseInt(result[HslIndexes.h] ?? "0", radix),
			l: Number.parseInt(result[HslIndexes.l] ?? "0", radix),
			s: Number.parseInt(result[HslIndexes.s] ?? "0", radix)
		}) : void 0;
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-hsl-color/browser/index.js
async function loadHslColorPlugin(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addColorManager("hsl", new HslColorManager());
	});
}
//#endregion
//#region node_modules/@tsparticles/plugin-move/browser/MovePlugin.js
var MovePlugin = class {
	id = "move";
	#pluginManager;
	constructor(pluginManager) {
		this.#pluginManager = pluginManager;
	}
	async getPlugin(container) {
		const { MovePluginInstance } = await import("./MovePluginInstance-CeV-jMKA.js");
		return new MovePluginInstance(this.#pluginManager, container);
	}
	loadOptions() {}
	needsPlugin() {
		return true;
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-move/browser/index.js
async function loadMovePlugin(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		const movePluginManager = e.pluginManager;
		movePluginManager.initializers.pathGenerators ??= /* @__PURE__ */ new Map();
		movePluginManager.pathGenerators ??= /* @__PURE__ */ new Map();
		movePluginManager.addPathGenerator = (name, generator) => {
			movePluginManager.initializers.pathGenerators ??= /* @__PURE__ */ new Map();
			movePluginManager.initializers.pathGenerators.set(name, generator);
		};
		movePluginManager.getPathGenerators = async (container, force = false) => {
			movePluginManager.initializers.pathGenerators ??= /* @__PURE__ */ new Map();
			movePluginManager.pathGenerators ??= /* @__PURE__ */ new Map();
			return getItemMapFromInitializer(container, movePluginManager.pathGenerators, movePluginManager.initializers.pathGenerators, force);
		};
		e.pluginManager.addPlugin(new MovePlugin(e.pluginManager));
	});
}
//#endregion
//#region node_modules/@tsparticles/updater-opacity/browser/Options/Classes/OpacityAnimation.js
var OpacityAnimation = class extends RangedAnimationOptions {
	destroy;
	constructor() {
		super();
		this.destroy = DestroyType.none;
		this.speed = 2;
	}
	load(data) {
		super.load(data);
		if (isNull(data)) return;
		if (data.destroy !== void 0) this.destroy = data.destroy;
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-opacity/browser/Options/Classes/Opacity.js
var Opacity = class extends RangedAnimationValueWithRandom {
	animation;
	constructor() {
		super();
		this.animation = new OpacityAnimation();
		this.value = 1;
	}
	load(data) {
		if (isNull(data)) return;
		super.load(data);
		const animation = data.animation;
		if (animation !== void 0) this.animation.load(animation);
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-opacity/browser/OpacityUpdater.js
var OpacityUpdater = class {
	#container;
	constructor(container) {
		this.#container = container;
	}
	init(particle) {
		const opacityOptions = particle.options.opacity, pxRatio = 1;
		if (!opacityOptions) return;
		particle.opacity = initParticleNumericAnimationValue(opacityOptions, pxRatio);
		const opacityAnimation = opacityOptions.animation;
		if (opacityAnimation.enable) {
			particle.opacity.velocity = getRangeValue(opacityAnimation.speed) / 100 * this.#container.retina.reduceFactor;
			if (!opacityAnimation.sync) particle.opacity.velocity *= getRandom();
		}
	}
	isEnabled(particle) {
		const none = 0;
		return !particle.destroyed && !particle.spawning && !!particle.opacity && particle.opacity.enable && ((particle.opacity.maxLoops ?? none) <= none || (particle.opacity.maxLoops ?? none) > none && (particle.opacity.loops ?? none) < (particle.opacity.maxLoops ?? none));
	}
	loadOptions(options, ...sources) {
		options.opacity ??= new Opacity();
		for (const source of sources) options.opacity.load(source?.opacity);
	}
	reset(particle) {
		if (!particle.opacity) return;
		particle.opacity.time = 0;
		particle.opacity.loops = 0;
	}
	update(particle, delta) {
		if (!this.isEnabled(particle) || !particle.opacity || !particle.options.opacity) return;
		updateAnimation(particle, particle.opacity, true, particle.options.opacity.animation.destroy, delta);
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-opacity/browser/index.js
async function loadOpacityUpdater(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addParticleUpdater("opacity", (container) => {
			return Promise.resolve(new OpacityUpdater(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/updater-out-modes/browser/Utils.js
var minVelocity$4 = 0, boundsMin = 0;
function bounceHorizontal(data) {
	if (data.outMode !== OutMode.bounce && data.outMode !== OutMode.split || data.direction !== OutModeDirection.left && data.direction !== OutModeDirection.right) return;
	if (data.bounds.right < boundsMin && data.direction === OutModeDirection.left) data.particle.position.x = data.size + data.offset.x;
	else if (data.bounds.left > data.canvasSize.width && data.direction === OutModeDirection.right) data.particle.position.x = data.canvasSize.width - data.size - data.offset.x;
	const velocity = data.particle.velocity.x;
	let bounced = false;
	if (data.outOfCanvas && (data.direction === OutModeDirection.right && velocity > minVelocity$4 || data.direction === OutModeDirection.left && velocity < minVelocity$4)) {
		const newVelocity = getRangeValue(data.particle.options.bounce.horizontal.value);
		data.particle.velocity.x *= -newVelocity;
		bounced = true;
	}
	if (!bounced) return;
	const minPos = data.offset.x + data.size;
	if (data.outOfCanvas && data.direction === OutModeDirection.right) data.particle.position.x = data.canvasSize.width - minPos;
	else if (data.outOfCanvas && data.direction === OutModeDirection.left) data.particle.position.x = minPos;
	if (data.outMode === OutMode.split) data.particle.destroy();
}
function bounceVertical(data) {
	if (data.outMode !== OutMode.bounce && data.outMode !== OutMode.split || data.direction !== OutModeDirection.bottom && data.direction !== OutModeDirection.top) return;
	if (data.bounds.bottom < boundsMin && data.direction === OutModeDirection.top) data.particle.position.y = data.size + data.offset.y;
	else if (data.bounds.top > data.canvasSize.height && data.direction === OutModeDirection.bottom) data.particle.position.y = data.canvasSize.height - data.size - data.offset.y;
	const velocity = data.particle.velocity.y;
	let bounced = false;
	if (data.outOfCanvas && (data.direction === OutModeDirection.bottom && velocity > minVelocity$4 || data.direction === OutModeDirection.top && velocity < minVelocity$4)) {
		const newVelocity = getRangeValue(data.particle.options.bounce.vertical.value);
		data.particle.velocity.y *= -newVelocity;
		bounced = true;
	}
	if (!bounced) return;
	const minPos = data.offset.y + data.size;
	if (data.outOfCanvas && data.direction === OutModeDirection.bottom) data.particle.position.y = data.canvasSize.height - minPos;
	else if (data.outOfCanvas && data.direction === OutModeDirection.top) data.particle.position.y = minPos;
	if (data.outMode === OutMode.split) data.particle.destroy();
}
//#endregion
//#region node_modules/@tsparticles/updater-out-modes/browser/BounceOutMode.js
var BounceOutMode = class {
	modes;
	#container;
	#particleBouncePlugins;
	constructor(container) {
		this.#container = container;
		this.modes = [OutMode.bounce, OutMode.split];
		this.#particleBouncePlugins = container.plugins.filter((p) => p.particleBounce !== void 0);
	}
	update(particle, direction, delta, outMode) {
		if (!this.modes.includes(outMode)) return;
		const container = this.#container;
		let handled = false;
		for (const plugin of this.#particleBouncePlugins) {
			handled = plugin.particleBounce?.(particle, delta, direction) ?? false;
			if (handled) break;
		}
		if (handled) return;
		const pos = particle.getPosition(), offset = particle.offset, size = particle.getRadius(), bounds = calculateBounds(pos, size), canvasSize = container.canvas.size, outOfCanvas = !particle.isInsideCanvasForOutMode(outMode, direction);
		bounceHorizontal({
			particle,
			outMode,
			direction,
			bounds,
			canvasSize,
			offset,
			outOfCanvas,
			size
		});
		bounceVertical({
			particle,
			outMode,
			direction,
			bounds,
			canvasSize,
			offset,
			outOfCanvas,
			size
		});
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-out-modes/browser/DestroyOutMode.js
var minVelocity$3 = 0;
var DestroyOutMode = class {
	modes;
	constructor(_container) {
		this.modes = [OutMode.destroy];
	}
	update(particle, direction, _delta, outMode) {
		if (!this.modes.includes(outMode)) return;
		switch (particle.outType) {
			case ParticleOutType.normal:
			case ParticleOutType.outside:
				if (particle.isInsideCanvasForOutMode(outMode, direction)) return;
				break;
			case ParticleOutType.inside: {
				const { dx, dy } = getDistances(particle.position, particle.moveCenter), { x: vx, y: vy } = particle.velocity;
				if (vx < minVelocity$3 && dx > particle.moveCenter.radius || vy < minVelocity$3 && dy > particle.moveCenter.radius || vx >= minVelocity$3 && dx < -particle.moveCenter.radius || vy >= minVelocity$3 && dy < -particle.moveCenter.radius) return;
				break;
			}
		}
		particle.destroy(true);
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-out-modes/browser/NoneOutMode.js
var minVelocity$2 = 0;
var NoneOutMode = class {
	modes;
	#container;
	constructor(container) {
		this.#container = container;
		this.modes = [OutMode.none];
	}
	update(particle, direction, _delta, outMode) {
		if (!this.modes.includes(outMode)) return;
		if ((particle.options.move.distance.horizontal && (direction === OutModeDirection.left || direction === OutModeDirection.right)) ?? (particle.options.move.distance.vertical && (direction === OutModeDirection.top || direction === OutModeDirection.bottom))) return;
		const gravityOptions = particle.options.move.gravity, container = this.#container, canvasSize = container.canvas.size, pRadius = particle.getRadius();
		if (!gravityOptions.enable) {
			if (particle.velocity.y > minVelocity$2 && particle.position.y <= canvasSize.height + pRadius || particle.velocity.y < minVelocity$2 && particle.position.y >= -pRadius || particle.velocity.x > minVelocity$2 && particle.position.x <= canvasSize.width + pRadius || particle.velocity.x < minVelocity$2 && particle.position.x >= -pRadius) return;
			if (!isPointInside(particle.position, container.canvas.size, originPoint, pRadius, direction)) particle.destroy();
		} else {
			const position = particle.position;
			if (!gravityOptions.inverse && position.y > canvasSize.height + pRadius && direction === OutModeDirection.bottom || gravityOptions.inverse && position.y < -pRadius && direction === OutModeDirection.top) particle.destroy();
		}
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-out-modes/browser/OutOutMode.js
var minVelocity$1 = 0, minDistance$5 = 0, updateVector$1 = Vector.origin;
var OutOutMode = class {
	modes;
	#container;
	constructor(container) {
		this.#container = container;
		this.modes = [OutMode.out];
	}
	update(particle, direction, _delta, outMode) {
		if (!this.modes.includes(outMode)) return;
		const container = this.#container;
		switch (particle.outType) {
			case ParticleOutType.inside: {
				const { x: vx, y: vy } = particle.velocity;
				updateVector$1.setTo(originPoint);
				updateVector$1.length = particle.moveCenter.radius;
				updateVector$1.angle = particle.velocity.angle + Math.PI;
				updateVector$1.addTo(particle.moveCenter);
				const { dx, dy } = getDistances(particle.position, updateVector$1);
				if (vx <= minVelocity$1 && dx >= minDistance$5 || vy <= minVelocity$1 && dy >= minDistance$5 || vx >= minVelocity$1 && dx <= minDistance$5 || vy >= minVelocity$1 && dy <= minDistance$5) return;
				particle.position.x = Math.floor(randomInRangeValue({
					min: 0,
					max: container.canvas.size.width
				}));
				particle.position.y = Math.floor(randomInRangeValue({
					min: 0,
					max: container.canvas.size.height
				}));
				const { dx: newDx, dy: newDy } = getDistances(particle.position, particle.moveCenter);
				particle.direction = Math.atan2(-newDy, -newDx);
				particle.velocity.angle = particle.direction;
				particle.justWarped = true;
				break;
			}
			default:
				if (particle.isInsideCanvasForOutMode(outMode, direction)) return;
				switch (particle.outType) {
					case ParticleOutType.outside: {
						particle.position.x = Math.floor(randomInRangeValue({
							min: -particle.moveCenter.radius,
							max: particle.moveCenter.radius
						})) + particle.moveCenter.x;
						particle.position.y = Math.floor(randomInRangeValue({
							min: -particle.moveCenter.radius,
							max: particle.moveCenter.radius
						})) + particle.moveCenter.y;
						const { dx, dy } = getDistances(particle.position, particle.moveCenter);
						if (particle.moveCenter.radius) {
							particle.direction = Math.atan2(dy, dx);
							particle.velocity.angle = particle.direction;
						}
						particle.justWarped = true;
						break;
					}
					case ParticleOutType.normal: {
						const warp = particle.options.move.warp, canvasSize = container.canvas.size, newPos = {
							bottom: canvasSize.height + particle.getRadius() + particle.offset.y,
							left: -particle.getRadius() - particle.offset.x,
							right: canvasSize.width + particle.getRadius() + particle.offset.x,
							top: -particle.getRadius() - particle.offset.y
						}, sizeValue = particle.getRadius(), nextBounds = calculateBounds(particle.position, sizeValue);
						if (direction === OutModeDirection.right && nextBounds.left > canvasSize.width + particle.offset.x) {
							particle.position.x = newPos.left;
							particle.initialPosition.x = particle.position.x;
							if (!warp) {
								particle.position.y = getRandom() * canvasSize.height;
								particle.initialPosition.y = particle.position.y;
							}
							particle.justWarped = true;
						} else if (direction === OutModeDirection.left && nextBounds.right < -particle.offset.x) {
							particle.position.x = newPos.right;
							particle.initialPosition.x = particle.position.x;
							if (!warp) {
								particle.position.y = getRandom() * canvasSize.height;
								particle.initialPosition.y = particle.position.y;
							}
							particle.justWarped = true;
						}
						if (direction === OutModeDirection.bottom && nextBounds.top > canvasSize.height + particle.offset.y) {
							if (!warp) {
								particle.position.x = getRandom() * canvasSize.width;
								particle.initialPosition.x = particle.position.x;
							}
							particle.position.y = newPos.top;
							particle.initialPosition.y = particle.position.y;
							particle.justWarped = true;
						} else if (direction === OutModeDirection.top && nextBounds.bottom < -particle.offset.y) {
							if (!warp) {
								particle.position.x = getRandom() * canvasSize.width;
								particle.initialPosition.x = particle.position.x;
							}
							particle.position.y = newPos.bottom;
							particle.initialPosition.y = particle.position.y;
							particle.justWarped = true;
						}
						break;
					}
				}
				break;
		}
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-out-modes/browser/OutOfCanvasUpdater.js
var checkOutMode = (outModes, outMode) => {
	return outModes.default === outMode || outModes.bottom === outMode || outModes.left === outMode || outModes.right === outMode || outModes.top === outMode;
};
var OutOfCanvasUpdater = class {
	updaters;
	#container;
	constructor(container) {
		this.#container = container;
		this.updaters = /* @__PURE__ */ new Map();
	}
	init(particle) {
		this.#addUpdaterIfMissing(particle, OutMode.bounce, (container) => new BounceOutMode(container));
		this.#addUpdaterIfMissing(particle, OutMode.out, (container) => new OutOutMode(container));
		this.#addUpdaterIfMissing(particle, OutMode.destroy, (container) => new DestroyOutMode(container));
		this.#addUpdaterIfMissing(particle, OutMode.none, (container) => new NoneOutMode(container));
	}
	isEnabled(particle) {
		return !particle.destroyed && !particle.spawning;
	}
	update(particle, delta) {
		const outModes = particle.options.move.outModes;
		particle.justWarped = false;
		this.#updateOutMode(particle, delta, outModes.bottom ?? outModes.default, OutModeDirection.bottom);
		this.#updateOutMode(particle, delta, outModes.left ?? outModes.default, OutModeDirection.left);
		this.#updateOutMode(particle, delta, outModes.right ?? outModes.default, OutModeDirection.right);
		this.#updateOutMode(particle, delta, outModes.top ?? outModes.default, OutModeDirection.top);
	}
	#addUpdaterIfMissing = (particle, outMode, getUpdater) => {
		const outModes = particle.options.move.outModes;
		if (!this.updaters.has(outMode) && checkOutMode(outModes, outMode)) this.updaters.set(outMode, getUpdater(this.#container));
	};
	#updateOutMode = (particle, delta, outMode, direction) => {
		for (const updater of this.updaters.values()) updater.update(particle, direction, delta, outMode);
	};
};
//#endregion
//#region node_modules/@tsparticles/updater-out-modes/browser/index.js
async function loadOutModesUpdater(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addParticleUpdater("outModes", (container) => {
			return Promise.resolve(new OutOfCanvasUpdater(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/updater-paint/browser/PaintUpdater.js
var defaultOpacity$2 = 1;
var PaintUpdater = class {
	#container;
	#pluginManager;
	constructor(pluginManager, container) {
		this.#container = container;
		this.#pluginManager = pluginManager;
	}
	init(particle) {
		const container = this.#container, options = particle.options, paint = itemFromSingleOrMultiple(options.paint, particle.id, options.reduceDuplicates), paintColor = paint?.color ?? void 0, fill = paint?.fill, stroke = paint?.stroke;
		if (fill) {
			const fillColor = AnimatableColor.create(paintColor === void 0 ? void 0 : AnimatableColor.create(void 0, paintColor), fill.color);
			particle.fillEnabled = fill.enable;
			particle.fillOpacity = getRangeValue(fill.opacity);
			particle.fillAnimation = fillColor.animation;
			const fillHslColor = rangeColorToHsl(this.#pluginManager, fillColor);
			if (fillHslColor) particle.fillColor = getHslAnimationFromHsl(fillHslColor, particle.fillAnimation, container.retina.reduceFactor);
		} else {
			particle.fillEnabled = false;
			particle.fillAnimation = void 0;
			particle.fillColor = void 0;
			particle.fillOpacity = defaultOpacity$2;
		}
		if (stroke) {
			const strokeColor = AnimatableColor.create(paintColor === void 0 ? void 0 : AnimatableColor.create(void 0, paintColor), stroke.color);
			particle.strokeWidth = getRangeValue(stroke.width) * container.retina.pixelRatio;
			particle.strokeOpacity = getRangeValue(stroke.opacity ?? defaultOpacity$2);
			particle.strokeAnimation = strokeColor.animation;
			const strokeHslColor = rangeColorToHsl(this.#pluginManager, strokeColor) ?? particle.getFillColor();
			if (strokeHslColor) particle.strokeColor = getHslAnimationFromHsl(strokeHslColor, particle.strokeAnimation, container.retina.reduceFactor);
		} else {
			particle.strokeAnimation = void 0;
			particle.strokeColor = void 0;
			particle.strokeOpacity = defaultOpacity$2;
			particle.strokeWidth = 0;
		}
	}
	isEnabled(particle) {
		const { fillAnimation, fillColor, strokeAnimation, strokeColor } = particle, fillEnabled = !!fillAnimation && (fillColor?.h.value !== void 0 && fillColor.h.enable || fillColor?.s.value !== void 0 && fillColor.s.enable || fillColor?.l.value !== void 0 && fillColor.l.enable), strokeEnabled = !!strokeAnimation && (strokeColor?.h.value !== void 0 && strokeColor.h.enable || strokeColor?.s.value !== void 0 && strokeColor.s.enable || strokeColor?.l.value !== void 0 && strokeColor.l.enable);
		return !particle.destroyed && !particle.spawning && (fillEnabled || strokeEnabled);
	}
	update(particle, delta) {
		if (!this.isEnabled(particle)) return;
		updateColor(particle.fillColor, delta);
		updateColor(particle.strokeColor, delta);
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-paint/browser/index.js
async function loadPaintUpdater(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addParticleUpdater("paint", (container) => {
			return Promise.resolve(new PaintUpdater(e.pluginManager, container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/plugin-rgb-color/browser/RgbColorManager.js
var RgbIndexes;
(function(RgbIndexes) {
	RgbIndexes[RgbIndexes["r"] = 1] = "r";
	RgbIndexes[RgbIndexes["g"] = 2] = "g";
	RgbIndexes[RgbIndexes["b"] = 3] = "b";
	RgbIndexes[RgbIndexes["a"] = 5] = "a";
})(RgbIndexes || (RgbIndexes = {}));
var rgbRegex = /rgba?\(\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i;
var RgbColorManager = class {
	accepts(input) {
		return input.startsWith("rgb");
	}
	handleColor(color) {
		const rgbColor = color.value.rgb ?? color.value;
		if (!("r" in rgbColor) || !("g" in rgbColor) || !("b" in rgbColor)) return;
		return rgbColor;
	}
	handleRangeColor(color) {
		const rgbColor = color.value.rgb ?? color.value;
		if (!("r" in rgbColor) || !("g" in rgbColor) || !("b" in rgbColor)) return;
		return {
			r: getRangeValue(rgbColor.r),
			g: getRangeValue(rgbColor.g),
			b: getRangeValue(rgbColor.b)
		};
	}
	parseString(input) {
		if (!this.accepts(input)) return;
		const result = rgbRegex.exec(input), radix = 10;
		return result ? {
			a: result.length > 4 ? parseAlpha(result[RgbIndexes.a]) : 1,
			b: parseInt(result[RgbIndexes.b] ?? "0", radix),
			g: parseInt(result[RgbIndexes.g] ?? "0", radix),
			r: parseInt(result[RgbIndexes.r] ?? "0", radix)
		} : void 0;
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-rgb-color/browser/index.js
async function loadRgbColorPlugin(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addColorManager("rgb", new RgbColorManager());
	});
}
//#endregion
//#region node_modules/@tsparticles/updater-size/browser/Options/Classes/SizeAnimation.js
var SizeAnimation = class extends RangedAnimationOptions {
	destroy;
	constructor() {
		super();
		this.destroy = DestroyType.none;
		this.speed = 5;
	}
	load(data) {
		super.load(data);
		if (isNull(data)) return;
		if (data.destroy !== void 0) this.destroy = data.destroy;
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-size/browser/Options/Classes/Size.js
var Size = class extends RangedAnimationValueWithRandom {
	animation;
	constructor() {
		super();
		this.animation = new SizeAnimation();
		this.value = 3;
	}
	load(data) {
		super.load(data);
		if (isNull(data)) return;
		const animation = data.animation;
		if (animation !== void 0) this.animation.load(animation);
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-size/browser/SizeUpdater.js
var minLoops = 0;
var SizeUpdater = class {
	#container;
	constructor(container) {
		this.#container = container;
	}
	init(particle) {
		const container = this.#container, sizeOptions = particle.options.size;
		if (!sizeOptions) return;
		const sizeAnimation = sizeOptions.animation;
		if (!sizeAnimation.enable) return;
		particle.size.velocity = particle.retina.sizeAnimationSpeed / 100 * container.retina.reduceFactor;
		if (sizeAnimation.sync) return;
		particle.size.velocity *= getRandom();
	}
	isEnabled(particle) {
		return !particle.destroyed && !particle.spawning && particle.size.enable && ((particle.size.maxLoops ?? minLoops) <= minLoops || (particle.size.maxLoops ?? minLoops) > minLoops && (particle.size.loops ?? minLoops) < (particle.size.maxLoops ?? minLoops));
	}
	loadOptions(options, ...sources) {
		options.size ??= new Size();
		for (const source of sources) options.size.load(source?.size);
	}
	preInit(particle) {
		const pxRatio = this.#container.retina.pixelRatio, sizeOptions = particle.options.size;
		if (!sizeOptions) return;
		particle.size = initParticleNumericAnimationValue(sizeOptions, pxRatio);
		particle.retina.sizeAnimationSpeed = getRangeValue(sizeOptions.animation.speed) * pxRatio;
	}
	reset(particle) {
		particle.size.time = 0;
		particle.size.loops = 0;
	}
	update(particle, delta) {
		if (!this.isEnabled(particle) || !particle.options.size) return;
		updateAnimation(particle, particle.size, true, particle.options.size.animation.destroy, delta);
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-size/browser/index.js
async function loadSizeUpdater(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addParticleUpdater("size", (container) => {
			return Promise.resolve(new SizeUpdater(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/basic/browser/index.js
async function loadBasic(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register(async (e) => {
		await Promise.all([
			loadBlendPlugin(e),
			loadHexColorPlugin(e),
			loadHslColorPlugin(e),
			loadRgbColorPlugin(e),
			loadMovePlugin(e),
			loadCircleShape(e),
			loadPaintUpdater(e),
			loadOpacityUpdater(e),
			loadOutModesUpdater(e),
			loadSizeUpdater(e)
		]);
	});
}
//#endregion
//#region node_modules/@tsparticles/plugin-easing-quad/browser/easingsFunctions.js
var easingsFunctions = /* @__PURE__ */ new Map();
easingsFunctions.set(EasingType.easeInQuad, (value) => value ** 2);
easingsFunctions.set(EasingType.easeOutQuad, (value) => 1 - (1 - value) ** 2);
easingsFunctions.set(EasingType.easeInOutQuad, (value) => value < .5 ? 2 * value ** 2 : 1 - (-2 * value + 2) ** 2 / 2);
//#endregion
//#region node_modules/@tsparticles/plugin-easing-quad/browser/index.js
async function loadEasingQuadPlugin(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		for (const [easing, easingFn] of easingsFunctions) e.pluginManager.addEasing(easing, easingFn);
	});
}
//#endregion
//#region node_modules/@tsparticles/shape-emoji/browser/Utils.js
var validTypes = ["emoji"];
function drawEmoji(data, image) {
	const { context, opacity } = data, previousAlpha = context.globalAlpha, diameter = image.width, radius = diameter * half$1;
	context.globalAlpha = opacity;
	context.drawImage(image, -radius, -radius, diameter, diameter);
	context.globalAlpha = previousAlpha;
}
function drawLine$1(context, begin, end) {
	context.beginPath();
	context.moveTo(begin.x, begin.y);
	context.lineTo(end.x, end.y);
	context.closePath();
}
async function loadFont(font, weight) {
	try {
		await safeDocument().fonts.load(`${weight ?? "400"} 36px '${font ?? "Verdana"}'`);
	} catch {}
}
//#endregion
//#region node_modules/@tsparticles/shape-emoji/browser/EmojiDrawer.js
var defaultFont = "\"Apple Color Emoji\", \"Segoe UI Emoji\", \"Noto Color Emoji\", sans-serif", noPadding = 0, firstItem = 0;
var EmojiDrawer = class {
	#emojiShapeDict = /* @__PURE__ */ new Map();
	destroy() {
		for (const [key, data] of this.#emojiShapeDict) {
			if (data instanceof ImageBitmap) data.close();
			this.#emojiShapeDict.delete(key);
		}
	}
	draw(data) {
		const key = data.particle.emojiDataKey;
		if (!key) return;
		const image = this.#emojiShapeDict.get(key);
		if (!image) return;
		drawEmoji(data, image);
	}
	async init(container) {
		const shapeData = container.actualOptions.particles.shape;
		if (!validTypes.some((t) => isInArray(t, shapeData.type))) return;
		const promises = [loadFont(defaultFont)], shapeOptions = validTypes.map((t) => shapeData.options[t])[firstItem];
		executeOnSingleOrMultiple(shapeOptions, (shape) => {
			if (shape.font) promises.push(loadFont(shape.font));
		});
		await Promise.all(promises);
	}
	particleDestroy(particle) {
		particle.emojiDataKey = void 0;
	}
	particleInit(container, particle) {
		const shapeData = particle.shapeData;
		if (!shapeData.value) return;
		const emoji = itemFromSingleOrMultiple(shapeData.value, particle.randomIndexData);
		if (!emoji) return;
		const emojiOptions = typeof emoji === "string" ? {
			font: shapeData.font ?? defaultFont,
			padding: shapeData.padding ?? noPadding,
			value: emoji
		} : {
			font: defaultFont,
			padding: noPadding,
			...shapeData,
			...emoji
		}, font = emojiOptions.font, value = emojiOptions.value, cacheKey = `${value}_${font}`;
		if (this.#emojiShapeDict.has(cacheKey)) {
			particle.emojiDataKey = cacheKey;
			return;
		}
		const padding = emojiOptions.padding * 2, maxSize = getRangeMax(particle.size.value), fullSize = maxSize + padding, canvasSize = fullSize * 2, cacheCanvas = new OffscreenCanvas(canvasSize, canvasSize), context = cacheCanvas.getContext("2d", container.canvas.render.settings);
		if (!context) return;
		context.font = `400 ${(maxSize * 2).toString()}px ${font}`;
		context.textBaseline = "middle";
		context.textAlign = "center";
		context.fillText(value, fullSize, fullSize);
		const image = cacheCanvas instanceof HTMLCanvasElement ? cacheCanvas : cacheCanvas.transferToImageBitmap();
		this.#emojiShapeDict.set(cacheKey, image);
		particle.emojiDataKey = cacheKey;
	}
};
//#endregion
//#region node_modules/@tsparticles/shape-emoji/browser/index.js
async function loadEmojiShape(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addShape(validTypes, () => Promise.resolve(new EmojiDrawer()));
	});
}
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/InteractivityPlugin.js
var InteractivityPlugin = class {
	id = "interactivity";
	#pluginManager;
	constructor(pluginManager) {
		this.#pluginManager = pluginManager;
	}
	async getPlugin(container) {
		const { InteractivityPluginInstance } = await import("./InteractivityPluginInstance-BIKrUnWg.js");
		return new InteractivityPluginInstance(this.#pluginManager, container);
	}
	loadOptions(container, options, source) {
		if (!this.needsPlugin()) return;
		let interactivityOptions = options.interactivity;
		if (!interactivityOptions?.load) options.interactivity = interactivityOptions = new Interactivity(this.#pluginManager, container);
		interactivityOptions.load(source?.interactivity);
		const interactors = this.#pluginManager.interactors?.get(container);
		if (!interactors) return;
		for (const interactor of interactors) if (interactor.loadOptions) interactor.loadOptions(options, source);
	}
	loadParticlesOptions(container, options, source) {
		if (source?.interactivity) options.interactivity = deepExtend({}, source.interactivity);
		const interactors = this.#pluginManager.interactors?.get(container);
		if (!interactors) return;
		for (const interactor of interactors) interactor.loadParticlesOptions?.(options, source);
	}
	needsPlugin() {
		return true;
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/BaseClasses/ExternalInteractorBase.js
var ExternalInteractorBase = class {
	type = InteractorType.external;
	container;
	constructor(container) {
		this.container = container;
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/BaseClasses/ParticlesInteractorBase.js
var ParticlesInteractorBase = class {
	type = InteractorType.particles;
	container;
	constructor(container) {
		this.container = container;
	}
};
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/utils.js
function checkSelector(element, selectors) {
	const res = executeOnSingleOrMultiple(selectors, (selector) => {
		return element.matches(selector);
	});
	return isArray(res) ? res.some((t) => t) : res;
}
function isDivModeEnabled(mode, divs) {
	return !!findItemFromSingleOrMultiple(divs, (t) => t.enable && isInArray(mode, t.mode));
}
function divModeExecute(mode, divs, callback) {
	executeOnSingleOrMultiple(divs, (div) => {
		const divMode = div.mode;
		if (div.enable && isInArray(mode, divMode)) singleDivModeExecute(div, callback);
	});
}
function singleDivModeExecute(div, callback) {
	const selectors = div.selectors;
	executeOnSingleOrMultiple(selectors, (selector) => {
		callback(selector, div);
	});
}
function divMode(divs, element) {
	if (!element || !divs) return;
	return findItemFromSingleOrMultiple(divs, (div) => {
		return checkSelector(element, div.selectors);
	});
}
//#endregion
//#region node_modules/@tsparticles/plugin-interactivity/browser/index.js
async function loadInteractivityPlugin(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		const interactivityEngine = e, interactivityPluginManager = interactivityEngine.pluginManager;
		interactivityPluginManager.addPlugin(new InteractivityPlugin(interactivityPluginManager));
		interactivityPluginManager.initializers.interactors ??= /* @__PURE__ */ new Map();
		interactivityPluginManager.interactors ??= /* @__PURE__ */ new Map();
		interactivityPluginManager.addInteractor = (name, interactorInitializer) => {
			interactivityPluginManager.initializers.interactors ??= /* @__PURE__ */ new Map();
			interactivityPluginManager.initializers.interactors.set(name, interactorInitializer);
		};
		interactivityPluginManager.getInteractors = async (container, force = false) => {
			interactivityPluginManager.interactors ??= /* @__PURE__ */ new Map();
			interactivityPluginManager.initializers.interactors ??= /* @__PURE__ */ new Map();
			return getItemsFromInitializer(container, interactivityPluginManager.interactors, interactivityPluginManager.initializers.interactors, force);
		};
		interactivityPluginManager.setOnClickHandler = (callback) => {
			const { items } = interactivityEngine;
			if (!items.length) throw new Error("Click handlers can only be set after calling tsParticles.load()");
			items.forEach((item) => {
				item.addClickHandler?.(callback);
			});
		};
	});
}
function ensureInteractivityPluginLoaded(e) {
	if (!e.pluginManager.addInteractor) throw new Error("tsParticles Interactivity Plugin is not loaded");
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-attract/browser/Utils.js
var minFactor = 1, minRadius$4 = 0, updateVector = Vector.origin;
function processAttract(pluginManager, container, position, attractRadius, area, queryCb, onAttractParticle) {
	const attractOptions = container.actualOptions.interactivity?.modes.attract;
	if (!attractOptions) return;
	const query = container.particles.grid.query(area, queryCb);
	for (const particle of query) {
		const { dx, dy, distance } = getDistances(particle.position, position), velocity = attractOptions.speed * attractOptions.factor, attractFactor = clamp(pluginManager.getEasing(attractOptions.easing)(1 - distance / attractRadius) * velocity, minFactor, attractOptions.maxSpeed);
		updateVector.x = !distance ? velocity : dx / distance * attractFactor;
		updateVector.y = !distance ? velocity : dy / distance * attractFactor;
		onAttractParticle?.(particle);
		particle.position.subFrom(updateVector);
	}
}
function clickAttract(pluginManager, container, interactivityData, enabledCb, onAttractParticle) {
	container.attract ??= { particles: [] };
	const { attract } = container;
	if (!attract.finish) {
		attract.count ??= 0;
		attract.count++;
		if (attract.count === container.particles.count) attract.finish = true;
	}
	if (attract.clicking) {
		const mousePos = interactivityData.mouse.clickPosition, attractRadius = container.retina.attractModeDistance;
		if (!attractRadius || attractRadius < minRadius$4 || !mousePos) return;
		processAttract(pluginManager, container, mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius), (p) => enabledCb(p), onAttractParticle);
	} else if (attract.clicking === false) attract.particles = [];
}
function hoverAttract(pluginManager, container, interactivityData, enabledCb, onAttractParticle) {
	const mousePos = interactivityData.mouse.position, attractRadius = container.retina.attractModeDistance;
	if (!attractRadius || attractRadius < minRadius$4 || !mousePos) return;
	processAttract(pluginManager, container, mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius), (p) => enabledCb(p), onAttractParticle);
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-attract/browser/Options/Classes/Attract.js
var Attract$1 = class {
	distance;
	duration;
	easing;
	factor;
	maxSpeed;
	restore;
	speed;
	constructor() {
		this.distance = 200;
		this.duration = .4;
		this.easing = EasingType.easeOutQuad;
		this.factor = 1;
		this.maxSpeed = 50;
		this.speed = 1;
		this.restore = {
			enable: false,
			delay: 0,
			speed: .08,
			follow: true
		};
	}
	load(data) {
		if (isNull(data)) return;
		if (data.distance !== void 0) this.distance = data.distance;
		if (data.duration !== void 0) this.duration = data.duration;
		if (data.easing !== void 0) this.easing = data.easing;
		if (data.factor !== void 0) this.factor = data.factor;
		if (data.maxSpeed !== void 0) this.maxSpeed = data.maxSpeed;
		if (data.speed !== void 0) this.speed = data.speed;
		if (data.restore !== void 0) {
			this.restore.enable = data.restore.enable ?? this.restore.enable;
			this.restore.delay = data.restore.delay ?? this.restore.delay;
			this.restore.speed = data.restore.speed ?? this.restore.speed;
			this.restore.follow = data.restore.follow ?? this.restore.follow;
		}
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-attract/browser/Attractor.js
var attractMode = "attract", minVelocityLengthSq = 0, minRestoreSpeed$1 = .001, maxRestoreSpeed$1 = 1, restoreEpsilon$1 = .5;
var Attractor$1 = class extends ExternalInteractorBase {
	handleClickMode;
	#interactedThisFrame;
	#maxDistance;
	#pluginManager;
	#restoreData;
	constructor(pluginManager, container) {
		super(container);
		this.#pluginManager = pluginManager;
		this.#maxDistance = 0;
		this.#interactedThisFrame = /* @__PURE__ */ new Set();
		this.#restoreData = /* @__PURE__ */ new Map();
		container.attract ??= { particles: [] };
		this.handleClickMode = (mode, interactivityData) => {
			const attract = this.container.actualOptions.interactivity?.modes.attract;
			if (!attract || mode !== attractMode) return;
			container.attract ??= { particles: [] };
			container.attract.clicking = true;
			container.attract.count = 0;
			for (const particle of container.attract.particles) {
				if (!this.isEnabled(interactivityData, particle)) continue;
				particle.velocity.setTo(particle.initialVelocity);
			}
			container.attract.particles = [];
			container.attract.finish = false;
			setTimeout(() => {
				if (container.destroyed) return;
				container.attract ??= { particles: [] };
				container.attract.clicking = false;
			}, attract.duration * millisecondsToSeconds);
		};
	}
	get maxDistance() {
		return this.#maxDistance;
	}
	clear() {}
	init() {
		const container = this.container, attract = container.actualOptions.interactivity?.modes.attract;
		if (!attract) return;
		this.#maxDistance = attract.distance;
		container.retina.attractModeDistance = attract.distance * container.retina.pixelRatio;
	}
	interact(interactivityData) {
		this.#interactedThisFrame.clear();
		const options = this.container.actualOptions, mouseMoveStatus = interactivityData.status === mouseMoveEvent, events = options.interactivity?.events;
		if (!events) return;
		const { enable: hoverEnabled, mode: hoverMode } = events.onHover, { enable: clickEnabled, mode: clickMode } = events.onClick;
		if (mouseMoveStatus && hoverEnabled && isInArray(attractMode, hoverMode)) hoverAttract(this.#pluginManager, this.container, interactivityData, (p) => this.isEnabled(interactivityData, p), (p) => {
			this.#trackInteractedParticle(p);
		});
		else if (clickEnabled && isInArray(attractMode, clickMode)) clickAttract(this.#pluginManager, this.container, interactivityData, (p) => this.isEnabled(interactivityData, p), (p) => {
			this.#trackInteractedParticle(p);
		});
		this.#restoreParticles();
	}
	isEnabled(interactivityData, particle) {
		const options = this.container.actualOptions, mouse = interactivityData.mouse, events = (particle?.interactivity ?? options.interactivity)?.events;
		if ((!mouse.position || !events?.onHover.enable) && (!mouse.clickPosition || !events?.onClick.enable)) return false;
		const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
		return isInArray(attractMode, hoverMode) || isInArray(attractMode, clickMode);
	}
	loadModeOptions(options, ...sources) {
		options.attract ??= new Attract$1();
		for (const source of sources) options.attract.load(source?.attract);
	}
	reset() {}
	#restoreParticles() {
		const restore = this.container.actualOptions.interactivity?.modes.attract?.restore;
		if (!restore?.enable || !this.#restoreData.size) return;
		const now = Date.now(), restoreDelay = restore.delay * millisecondsToSeconds, restoreSpeed = Math.max(minRestoreSpeed$1, Math.min(maxRestoreSpeed$1, restore.speed));
		for (const [particle, restoreData] of this.#restoreData) {
			if (this.#interactedThisFrame.has(particle)) continue;
			if (particle.destroyed) {
				this.#restoreData.delete(particle);
				continue;
			}
			const target = restoreData.target;
			if (now - restoreData.lastInteractionTime < restoreDelay) continue;
			let dx = target.x - particle.position.x, dy = target.y - particle.position.y, dz = target.z - particle.position.z;
			if (restore.follow && particle.options.move.enable) {
				const { x: vx, y: vy, z: vz } = particle.velocity, velocityLengthSq = vx * vx + vy * vy + vz * vz;
				if (velocityLengthSq > minVelocityLengthSq) {
					const parallelScale = (dx * vx + dy * vy + dz * vz) / velocityLengthSq;
					dx -= vx * parallelScale;
					dy -= vy * parallelScale;
					dz -= vz * parallelScale;
				}
			}
			particle.position.x += dx * restoreSpeed;
			particle.position.y += dy * restoreSpeed;
			particle.position.z += dz * restoreSpeed;
			if (Math.abs(dx) <= restoreEpsilon$1 && Math.abs(dy) <= restoreEpsilon$1) {
				particle.position.x = target.x;
				particle.position.y = target.y;
				particle.position.z = target.z;
				this.#restoreData.delete(particle);
				continue;
			}
		}
	}
	#trackInteractedParticle(particle) {
		this.#interactedThisFrame.add(particle);
		if (!(this.container.actualOptions.interactivity?.modes.attract?.restore)?.enable) return;
		const now = Date.now();
		let restoreData = this.#restoreData.get(particle);
		if (!restoreData) {
			restoreData = {
				target: particle.position.copy(),
				lastInteractionTime: now
			};
			this.#restoreData.set(particle, restoreData);
		}
		restoreData.lastInteractionTime = now;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-attract/browser/index.js
async function loadExternalAttractInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		ensureInteractivityPluginLoaded(e);
		e.pluginManager.addInteractor?.("externalAttract", (container) => {
			return Promise.resolve(new Attractor$1(e.pluginManager, container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-bounce/browser/Utils.js
var squareExp = 2, halfPI = Math.PI * half$1, toleranceFactor$1 = 10, minRadius$3 = 0, minVelocity = 0;
function processBounce(container, position, radius, area, enabledCb) {
	const query = container.particles.grid.query(area, enabledCb);
	for (const particle of query) if (area instanceof Circle) circleBounce(circleBounceDataFromParticle(particle), {
		position,
		radius,
		mass: radius ** squareExp * halfPI,
		velocity: Vector.origin,
		factor: Vector.origin
	});
	else if (area instanceof Rectangle) rectBounce(particle, calculateBounds(position, radius));
}
function singleSelectorBounce(container, selector, div, bounceCb) {
	const query = safeDocument().querySelectorAll(selector);
	if (!query.length) return;
	query.forEach((item) => {
		const elem = item, pxRatio = container.retina.pixelRatio, pos = {
			x: (elem.offsetLeft + elem.offsetWidth * half$1) * pxRatio,
			y: (elem.offsetTop + elem.offsetHeight * half$1) * pxRatio
		}, radius = elem.offsetWidth * half$1 * pxRatio, tolerance = toleranceFactor$1 * pxRatio;
		bounceCb(pos, radius, div.type === DivType.circle ? new Circle(pos.x, pos.y, radius + tolerance) : new Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2));
	});
}
function divBounce(container, divs, bounceMode, enabledCb) {
	divModeExecute(bounceMode, divs, (selector, div) => {
		singleSelectorBounce(container, selector, div, (pos, radius, area) => {
			processBounce(container, pos, radius, area, enabledCb);
		});
	});
}
function mouseBounce(container, interactivityData, enabledCb) {
	const tolerance = toleranceFactor$1 * container.retina.pixelRatio, mousePos = interactivityData.mouse.position, radius = container.retina.bounceModeDistance;
	if (!radius || radius < minRadius$3 || !mousePos) return;
	processBounce(container, mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance), enabledCb);
}
function rectSideBounce(data) {
	const res = { bounced: false }, { pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor } = data;
	if (pOtherSide.min < rectOtherSide.min || pOtherSide.min > rectOtherSide.max || pOtherSide.max < rectOtherSide.min || pOtherSide.max > rectOtherSide.max) return res;
	if (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) * .5 && velocity > minVelocity || pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) * .5 && velocity < minVelocity) {
		res.velocity = velocity * -factor;
		res.bounced = true;
	}
	return res;
}
function rectBounce(particle, divBounds) {
	const bounds = calculateBounds(particle.getPosition(), particle.getRadius()), bounceOptions = particle.options.bounce, resH = rectSideBounce({
		pSide: {
			min: bounds.left,
			max: bounds.right
		},
		pOtherSide: {
			min: bounds.top,
			max: bounds.bottom
		},
		rectSide: {
			min: divBounds.left,
			max: divBounds.right
		},
		rectOtherSide: {
			min: divBounds.top,
			max: divBounds.bottom
		},
		velocity: particle.velocity.x,
		factor: getRangeValue(bounceOptions.horizontal.value)
	});
	if (resH.bounced) {
		if (resH.velocity !== void 0) particle.velocity.x = resH.velocity;
		if (resH.position !== void 0) particle.position.x = resH.position;
	}
	const resV = rectSideBounce({
		pSide: {
			min: bounds.top,
			max: bounds.bottom
		},
		pOtherSide: {
			min: bounds.left,
			max: bounds.right
		},
		rectSide: {
			min: divBounds.top,
			max: divBounds.bottom
		},
		rectOtherSide: {
			min: divBounds.left,
			max: divBounds.right
		},
		velocity: particle.velocity.y,
		factor: getRangeValue(bounceOptions.vertical.value)
	});
	if (resV.bounced) {
		if (resV.velocity !== void 0) particle.velocity.y = resV.velocity;
		if (resV.position !== void 0) particle.position.y = resV.position;
	}
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-bounce/browser/Options/Classes/Bounce.js
var Bounce = class {
	distance;
	constructor() {
		this.distance = 200;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.distance !== void 0) this.distance = data.distance;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-bounce/browser/Bouncer.js
var bounceMode = "bounce";
var Bouncer = class extends ExternalInteractorBase {
	#maxDistance;
	constructor(container) {
		super(container);
		this.#maxDistance = 0;
	}
	get maxDistance() {
		return this.#maxDistance;
	}
	clear() {}
	init() {
		const container = this.container, bounce = container.actualOptions.interactivity?.modes.bounce;
		if (!bounce) return;
		this.#maxDistance = bounce.distance;
		container.retina.bounceModeDistance = bounce.distance * container.retina.pixelRatio;
	}
	interact(interactivityData) {
		const events = this.container.actualOptions.interactivity?.events, mouseMoveStatus = interactivityData.status === mouseMoveEvent;
		if (!events) return;
		const hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, divs = events.onDiv;
		if (mouseMoveStatus && hoverEnabled && isInArray(bounceMode, hoverMode)) mouseBounce(this.container, interactivityData, (p) => this.isEnabled(interactivityData, p));
		else divBounce(this.container, divs, bounceMode, (p) => this.isEnabled(interactivityData, p));
	}
	isEnabled(interactivityData, particle) {
		const options = this.container.actualOptions, mouse = interactivityData.mouse, events = (particle?.interactivity ?? options.interactivity)?.events;
		if (!events) return false;
		const divs = events.onDiv;
		return !!mouse.position && events.onHover.enable && isInArray(bounceMode, events.onHover.mode) || isDivModeEnabled(bounceMode, divs);
	}
	loadModeOptions(options, ...sources) {
		options.bounce ??= new Bounce();
		for (const source of sources) options.bounce.load(source?.bounce);
	}
	reset() {}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-bounce/browser/index.js
async function loadExternalBounceInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		ensureInteractivityPluginLoaded(e);
		e.pluginManager.addInteractor?.("externalBounce", (container) => {
			return Promise.resolve(new Bouncer(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-bubble/browser/Options/Classes/BubbleBase.js
var BubbleBase = class {
	color;
	distance;
	duration;
	mix;
	opacity;
	size;
	constructor() {
		this.distance = 200;
		this.duration = .4;
		this.mix = false;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.distance !== void 0) this.distance = data.distance;
		if (data.duration !== void 0) this.duration = data.duration;
		if (data.mix !== void 0) this.mix = data.mix;
		if (data.opacity !== void 0) this.opacity = data.opacity;
		if (data.color !== void 0) {
			const sourceColor = isArray(this.color) ? void 0 : this.color;
			this.color = executeOnSingleOrMultiple(data.color, (color) => {
				return OptionsColor.create(sourceColor, color);
			});
		}
		if (data.size !== void 0) this.size = data.size;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-bubble/browser/Options/Classes/BubbleDiv.js
var BubbleDiv = class extends BubbleBase {
	selectors;
	constructor() {
		super();
		this.selectors = [];
	}
	load(data) {
		super.load(data);
		if (isNull(data)) return;
		if (data.selectors !== void 0) this.selectors = data.selectors;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-bubble/browser/Options/Classes/Bubble.js
var Bubble = class extends BubbleBase {
	divs;
	load(data) {
		super.load(data);
		if (isNull(data)) return;
		this.divs = executeOnSingleOrMultiple(data.divs, (div) => {
			const tmp = new BubbleDiv();
			tmp.load(div);
			return tmp;
		});
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-bubble/browser/Enums.js
var ProcessBubbleType;
(function(ProcessBubbleType) {
	ProcessBubbleType["color"] = "color";
	ProcessBubbleType["opacity"] = "opacity";
	ProcessBubbleType["size"] = "size";
})(ProcessBubbleType || (ProcessBubbleType = {}));
//#endregion
//#region node_modules/@tsparticles/interaction-external-bubble/browser/Utils.js
function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
	if (modeValue >= optionsValue) return clamp(particleValue + (modeValue - optionsValue) * ratio, particleValue, modeValue);
	else if (modeValue < optionsValue) return clamp(particleValue - (optionsValue - modeValue) * ratio, modeValue, particleValue);
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-bubble/browser/Bubbler.js
var bubbleMode = "bubble", minDistance$4 = 0, defaultClickTime = 0, defaultOpacity$1 = 1, ratioOffset = 1, defaultBubbleValue = 0, minRatio = 0, defaultRatio = 1;
var Bubbler = class extends ExternalInteractorBase {
	handleClickMode;
	#maxDistance;
	#pluginManager;
	constructor(pluginManager, container) {
		super(container);
		this.#pluginManager = pluginManager;
		this.#maxDistance = 0;
		container.bubble ??= {};
		this.handleClickMode = (mode) => {
			if (mode !== bubbleMode) return;
			container.bubble ??= {};
			container.bubble.clicking = true;
		};
	}
	get maxDistance() {
		return this.#maxDistance;
	}
	clear(particle, _delta, force) {
		if (particle.bubble.inRange && !force) return;
		delete particle.bubble.div;
		delete particle.bubble.opacity;
		delete particle.bubble.radius;
		delete particle.bubble.color;
	}
	init() {
		const container = this.container, bubble = container.actualOptions.interactivity?.modes.bubble;
		if (!bubble) return;
		this.#maxDistance = bubble.distance;
		container.retina.bubbleModeDistance = bubble.distance * container.retina.pixelRatio;
		if (bubble.size !== void 0) container.retina.bubbleModeSize = bubble.size * container.retina.pixelRatio;
	}
	interact(interactivityData, delta) {
		const events = this.container.actualOptions.interactivity?.events;
		if (!events) return;
		const onHover = events.onHover, onClick = events.onClick, hoverEnabled = onHover.enable, hoverMode = onHover.mode, clickEnabled = onClick.enable, clickMode = onClick.mode, divs = events.onDiv;
		if (hoverEnabled && isInArray(bubbleMode, hoverMode)) this.#hoverBubble(interactivityData);
		else if (clickEnabled && isInArray(bubbleMode, clickMode)) this.#clickBubble(interactivityData);
		else divModeExecute(bubbleMode, divs, (selector, div) => {
			this.#singleSelectorHover(interactivityData, delta, selector, div);
		});
	}
	isEnabled(interactivityData, particle) {
		const options = this.container.actualOptions, mouse = interactivityData.mouse, events = (particle?.interactivity ?? options.interactivity)?.events;
		if (!events) return false;
		const { onClick, onDiv, onHover } = events, divBubble = isDivModeEnabled(bubbleMode, onDiv);
		if (!(divBubble || onHover.enable && !!mouse.position || onClick.enable && mouse.clickPosition)) return false;
		return isInArray(bubbleMode, onHover.mode) || isInArray(bubbleMode, onClick.mode) || divBubble;
	}
	loadModeOptions(options, ...sources) {
		options.bubble ??= new Bubble();
		for (const source of sources) options.bubble.load(source?.bubble);
	}
	reset(_interactivityData, particle) {
		particle.bubble.inRange = false;
	}
	#clickBubble = (interactivityData) => {
		const container = this.container, options = container.actualOptions, mouseClickPos = interactivityData.mouse.clickPosition, bubbleOptions = options.interactivity?.modes.bubble;
		if (!bubbleOptions || !mouseClickPos) return;
		container.bubble ??= {};
		const distance = container.retina.bubbleModeDistance;
		if (!distance || distance < minDistance$4) return;
		const query = container.particles.grid.queryCircle(mouseClickPos, distance, (p) => this.isEnabled(interactivityData, p)), { bubble } = container;
		for (const particle of query) {
			if (!bubble.clicking) continue;
			particle.bubble.inRange = !bubble.durationEnd;
			const distMouse = getDistance(particle.getPosition(), mouseClickPos), timeSpent = (performance.now() - (interactivityData.mouse.clickTime ?? defaultClickTime)) / millisecondsToSeconds;
			if (timeSpent > bubbleOptions.duration) bubble.durationEnd = true;
			if (timeSpent > bubbleOptions.duration * 2) {
				bubble.clicking = false;
				bubble.durationEnd = false;
			}
			const sizeData = {
				bubbleObj: {
					optValue: container.retina.bubbleModeSize,
					value: particle.bubble.radius
				},
				particlesObj: {
					optValue: particle.size.max,
					value: particle.size.value
				},
				type: ProcessBubbleType.size
			};
			this.#process(particle, distMouse, timeSpent, sizeData);
			const opacityData = {
				bubbleObj: {
					optValue: bubbleOptions.opacity,
					value: particle.bubble.opacity
				},
				particlesObj: {
					optValue: particle.opacity?.max ?? defaultOpacity$1,
					value: particle.opacity?.value ?? defaultOpacity$1
				},
				type: ProcessBubbleType.opacity
			};
			this.#process(particle, distMouse, timeSpent, opacityData);
			if (!bubble.durationEnd && distMouse <= distance) this.#hoverBubbleColor(particle, distMouse);
			else delete particle.bubble.color;
		}
	};
	#hoverBubble = (interactivityData) => {
		const container = this.container, mousePos = interactivityData.mouse.position, distance = container.retina.bubbleModeDistance;
		if (!distance || distance < minDistance$4 || !mousePos) return;
		const query = container.particles.grid.queryCircle(mousePos, distance, (p) => this.isEnabled(interactivityData, p));
		for (const particle of query) {
			particle.bubble.inRange = true;
			const pointDistance = getDistance(particle.getPosition(), mousePos), ratio = ratioOffset - pointDistance / distance;
			if (pointDistance <= distance) {
				if (ratio >= minRatio && interactivityData.status === "pointermove") {
					this.#hoverBubbleSize(particle, ratio);
					this.#hoverBubbleOpacity(particle, ratio);
					this.#hoverBubbleColor(particle, ratio);
				}
			} else this.reset(interactivityData, particle);
			if (interactivityData.status === "pointerleave") this.reset(interactivityData, particle);
		}
	};
	#hoverBubbleColor = (particle, ratio, divBubble) => {
		const options = this.container.actualOptions, bubbleOptions = divBubble ?? options.interactivity?.modes.bubble;
		if (!bubbleOptions) return;
		if (!particle.bubble.finalColor) {
			const modeColor = bubbleOptions.color;
			if (!modeColor) return;
			const bubbleColor = itemFromSingleOrMultiple(modeColor);
			particle.bubble.finalColor = rangeColorToHsl(this.#pluginManager, bubbleColor);
		}
		if (!particle.bubble.finalColor) return;
		if (bubbleOptions.mix) {
			particle.bubble.color = void 0;
			const pColor = particle.getFillColor();
			particle.bubble.color = pColor ? rgbToHsl(colorMix(pColor, particle.bubble.finalColor, ratioOffset - ratio, ratio)) : particle.bubble.finalColor;
		} else particle.bubble.color = particle.bubble.finalColor;
	};
	#hoverBubbleOpacity = (particle, ratio, divBubble) => {
		const options = this.container.actualOptions, modeOpacity = divBubble?.opacity ?? options.interactivity?.modes.bubble?.opacity;
		if (!modeOpacity) return;
		const opacity = calculateBubbleValue(particle.opacity?.value ?? defaultOpacity$1, modeOpacity, particle.opacity?.max ?? defaultOpacity$1, ratio);
		if (opacity !== void 0) particle.bubble.opacity = opacity;
	};
	#hoverBubbleSize = (particle, ratio, divBubble) => {
		const container = this.container, modeSize = divBubble?.size ? divBubble.size * container.retina.pixelRatio : container.retina.bubbleModeSize;
		if (modeSize === void 0) return;
		const pSize = particle.size.value, size = calculateBubbleValue(pSize, modeSize, particle.size.max, ratio);
		if (size !== void 0) particle.bubble.radius = size;
	};
	#process = (particle, distMouse, timeSpent, data) => {
		const container = this.container, bubbleParam = data.bubbleObj.optValue, bubbleOptions = container.actualOptions.interactivity?.modes.bubble;
		if (!bubbleOptions || bubbleParam === void 0) return;
		const bubbleDuration = bubbleOptions.duration, bubbleDistance = container.retina.bubbleModeDistance, particlesParam = data.particlesObj.optValue, pObjBubble = data.bubbleObj.value, pObj = data.particlesObj.value ?? defaultBubbleValue, type = data.type;
		if (!bubbleDistance || bubbleDistance < minDistance$4 || bubbleParam === particlesParam) return;
		container.bubble ??= {};
		if (container.bubble.durationEnd) {
			if (pObjBubble) {
				if (type === ProcessBubbleType.size) delete particle.bubble.radius;
				if (type === ProcessBubbleType.opacity) delete particle.bubble.opacity;
			}
		} else if (distMouse <= bubbleDistance) {
			if ((pObjBubble ?? pObj) !== bubbleParam) {
				const value = pObj - timeSpent * (pObj - bubbleParam) / bubbleDuration;
				if (type === ProcessBubbleType.size) particle.bubble.radius = value;
				if (type === ProcessBubbleType.opacity) particle.bubble.opacity = value;
			}
		} else {
			if (type === ProcessBubbleType.size) delete particle.bubble.radius;
			if (type === ProcessBubbleType.opacity) delete particle.bubble.opacity;
		}
	};
	#singleSelectorHover = (interactivityData, delta, selector, div) => {
		const container = this.container, selectors = safeDocument().querySelectorAll(selector), bubble = container.actualOptions.interactivity?.modes.bubble;
		if (!bubble || !selectors.length) return;
		selectors.forEach((item) => {
			const elem = item, pxRatio = container.retina.pixelRatio, pos = {
				x: (elem.offsetLeft + elem.offsetWidth * half$1) * pxRatio,
				y: (elem.offsetTop + elem.offsetHeight * half$1) * pxRatio
			}, repulseRadius = elem.offsetWidth * half$1 * pxRatio, area = div.type === DivType.circle ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), query = container.particles.grid.query(area, (p) => this.isEnabled(interactivityData, p));
			for (const particle of query) {
				if (!area.contains(particle.getPosition())) continue;
				particle.bubble.inRange = true;
				const divs = bubble.divs, divBubble = divMode(divs, elem);
				if (!particle.bubble.div || particle.bubble.div !== elem) {
					this.clear(particle, delta, true);
					particle.bubble.div = elem;
				}
				this.#hoverBubbleSize(particle, defaultRatio, divBubble);
				this.#hoverBubbleOpacity(particle, defaultRatio, divBubble);
				this.#hoverBubbleColor(particle, defaultRatio, divBubble);
			}
		});
	};
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-bubble/browser/index.js
async function loadExternalBubbleInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		ensureInteractivityPluginLoaded(e);
		e.pluginManager.addInteractor?.("externalBubble", (container) => {
			return Promise.resolve(new Bubbler(e.pluginManager, container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-connect/browser/Options/Classes/ConnectLinks.js
var ConnectLinks = class {
	opacity;
	constructor() {
		this.opacity = .5;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.opacity !== void 0) this.opacity = data.opacity;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-connect/browser/Options/Classes/Connect.js
var Connect = class {
	distance;
	links;
	radius;
	constructor() {
		this.distance = 80;
		this.links = new ConnectLinks();
		this.radius = 60;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.distance !== void 0) this.distance = data.distance;
		this.links.load(data.links);
		if (data.radius !== void 0) this.radius = data.radius;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-connect/browser/Utils.js
var gradientMin = 0, gradientMax = 1, defaultLinksWidth = 0;
function gradient(container, context, p1, p2, opacity) {
	const gradStop = Math.floor(p2.getRadius() / p1.getRadius()), color1 = p1.getFillColor(), color2 = p2.getFillColor();
	if (!color1 || !color2) return;
	const sourcePos = p1.getPosition(), destPos = p2.getPosition(), midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius()), grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
	grad.addColorStop(gradientMin, getStyleFromHsl(color1, container.hdr, opacity));
	grad.addColorStop(clamp(gradStop, gradientMin, gradientMax), getStyleFromRgb(midRgb, container.hdr, opacity));
	grad.addColorStop(gradientMax, getStyleFromHsl(color2, container.hdr, opacity));
	return grad;
}
function drawConnectLine(context, width, lineStyle, begin, end) {
	drawLine$1(context, begin, end);
	context.lineWidth = width;
	context.strokeStyle = lineStyle;
	context.stroke();
}
function lineStyle(container, ctx, p1, p2) {
	const connectOptions = container.actualOptions.interactivity?.modes.connect;
	if (!connectOptions) return;
	return gradient(container, ctx, p1, p2, connectOptions.links.opacity);
}
function drawConnection(container, p1, p2) {
	container.canvas.render.draw((ctx) => {
		const ls = lineStyle(container, ctx, p1, p2);
		if (!ls) return;
		const pos1 = p1.getPosition(), pos2 = p2.getPosition();
		drawConnectLine(ctx, p1.retina.linksWidth ?? defaultLinksWidth, ls, pos1, pos2);
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-connect/browser/Connector.js
var connectMode = "connect", minDistance$3 = 0;
var Connector = class extends ExternalInteractorBase {
	#maxDistance;
	constructor(container) {
		super(container);
		this.#maxDistance = 0;
	}
	get maxDistance() {
		return this.#maxDistance;
	}
	clear() {}
	init() {
		const container = this.container, connect = container.actualOptions.interactivity?.modes.connect;
		if (!connect) return;
		this.#maxDistance = connect.distance;
		container.retina.connectModeDistance = connect.distance * container.retina.pixelRatio;
		container.retina.connectModeRadius = connect.radius * container.retina.pixelRatio;
	}
	interact(interactivityData) {
		const container = this.container;
		if (container.actualOptions.interactivity?.events.onHover.enable && interactivityData.status === "pointermove") {
			const mousePos = interactivityData.mouse.position, { connectModeDistance, connectModeRadius } = container.retina;
			if (!connectModeDistance || connectModeDistance < minDistance$3 || !connectModeRadius || connectModeRadius < minDistance$3 || !mousePos) return;
			const distance = Math.abs(connectModeRadius), query = container.particles.grid.queryCircle(mousePos, distance, (p) => this.isEnabled(interactivityData, p));
			query.forEach((p1, i) => {
				const pos1 = p1.getPosition();
				for (const p2 of query.slice(i + 1)) {
					const pos2 = p2.getPosition(), distMax = Math.abs(connectModeDistance), xDiff = Math.abs(pos1.x - pos2.x), yDiff = Math.abs(pos1.y - pos2.y);
					if (xDiff < distMax && yDiff < distMax) drawConnection(container, p1, p2);
				}
			});
		}
	}
	isEnabled(interactivityData, particle) {
		const container = this.container, mouse = interactivityData.mouse, events = (particle?.interactivity ?? container.actualOptions.interactivity)?.events;
		if (!(events?.onHover.enable && mouse.position)) return false;
		return isInArray(connectMode, events.onHover.mode);
	}
	loadModeOptions(options, ...sources) {
		options.connect ??= new Connect();
		for (const source of sources) options.connect.load(source?.connect);
	}
	reset() {}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-connect/browser/index.js
async function loadExternalConnectInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		ensureInteractivityPluginLoaded(e);
		e.pluginManager.addInteractor?.("externalConnect", (container) => {
			return Promise.resolve(new Connector(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-destroy/browser/Utils.js
var half = .5, toleranceFactor = 10, minRadius$2 = 0;
function processDestroy(container, area) {
	const query = container.particles.grid.query(area);
	for (const particle of query) particle.destroy();
}
function singleSelectorDestroy(container, selector, div) {
	const query = safeDocument().querySelectorAll(selector);
	if (!query.length) return;
	query.forEach((item) => {
		const elem = item, pxRatio = container.retina.pixelRatio, pos = {
			x: (elem.offsetLeft + elem.offsetWidth * half) * pxRatio,
			y: (elem.offsetTop + elem.offsetHeight * half) * pxRatio
		}, radius = elem.offsetWidth * half * pxRatio, tolerance = toleranceFactor * pxRatio;
		processDestroy(container, div.type === DivType.circle ? new Circle(pos.x, pos.y, radius + tolerance) : new Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2));
	});
}
function divDestroy(container, divs, destroyMode) {
	divModeExecute(destroyMode, divs, (selector, div) => {
		singleSelectorDestroy(container, selector, div);
	});
}
function mouseDestroy(container, interactivityData) {
	const tolerance = toleranceFactor * container.retina.pixelRatio, mousePos = interactivityData.mouse.position, radius = container.retina.destroyModeDistance;
	if (!radius || radius < minRadius$2 || !mousePos) return;
	processDestroy(container, new Circle(mousePos.x, mousePos.y, radius + tolerance));
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-destroy/browser/Options/Classes/Destroy.js
var Destroy = class {
	distance;
	constructor() {
		this.distance = 200;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.distance !== void 0) this.distance = data.distance;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-destroy/browser/Destroyer.js
var destroyMode = "destroy";
var Destroyer = class extends ExternalInteractorBase {
	#maxDistance;
	constructor(container) {
		super(container);
		this.#maxDistance = 0;
	}
	get maxDistance() {
		return this.#maxDistance;
	}
	clear() {}
	init() {
		const container = this.container, destroy = container.actualOptions.interactivity?.modes.destroy;
		if (!destroy) return;
		this.#maxDistance = destroy.distance;
		container.retina.destroyModeDistance = destroy.distance * container.retina.pixelRatio;
	}
	interact(interactivityData) {
		const events = this.container.actualOptions.interactivity?.events, mouseMoveStatus = interactivityData.status === mouseMoveEvent;
		if (!events) return;
		const hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, divs = events.onDiv;
		if (mouseMoveStatus && hoverEnabled && isInArray(destroyMode, hoverMode)) mouseDestroy(this.container, interactivityData);
		else divDestroy(this.container, divs, destroyMode);
	}
	isEnabled(interactivityData, particle) {
		const options = this.container.actualOptions, mouse = interactivityData.mouse, events = (particle?.interactivity ?? options.interactivity)?.events;
		if (!events) return false;
		const divs = events.onDiv;
		return !!mouse.position && events.onHover.enable && isInArray(destroyMode, events.onHover.mode) || isDivModeEnabled(destroyMode, divs);
	}
	loadModeOptions(options, ...sources) {
		options.destroy ??= new Destroy();
		for (const source of sources) options.destroy.load(source?.destroy);
	}
	reset() {}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-destroy/browser/index.js
async function loadExternalDestroyInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		ensureInteractivityPluginLoaded(e);
		e.pluginManager.addInteractor?.("externalDestroy", async (container) => {
			return Promise.resolve(new Destroyer(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-grab/browser/Options/Classes/GrabLinks.js
var GrabLinks = class {
	blink;
	color;
	consent;
	opacity;
	constructor() {
		this.blink = false;
		this.consent = false;
		this.opacity = 1;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.blink !== void 0) this.blink = data.blink;
		if (data.color !== void 0) this.color = OptionsColor.create(this.color, data.color);
		if (data.consent !== void 0) this.consent = data.consent;
		if (data.opacity !== void 0) this.opacity = data.opacity;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-grab/browser/Options/Classes/Grab.js
var Grab = class {
	distance;
	links;
	constructor() {
		this.distance = 100;
		this.links = new GrabLinks();
	}
	load(data) {
		if (isNull(data)) return;
		if (data.distance !== void 0) this.distance = data.distance;
		this.links.load(data.links);
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-grab/browser/Utils.js
var defaultWidth = 0;
function drawGrabLine(context, width, begin, end, colorLine, opacity, hdr = false) {
	drawLine$1(context, begin, end);
	context.strokeStyle = getStyleFromRgb(colorLine, hdr, opacity);
	context.lineWidth = width;
	context.stroke();
}
function drawGrab(container, particle, lineColor, opacity, mousePos) {
	container.canvas.render.draw((ctx) => {
		const beginPos = particle.getPosition();
		drawGrabLine(ctx, particle.retina.linksWidth ?? defaultWidth, beginPos, mousePos, lineColor, opacity, container.hdr);
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-grab/browser/Grabber.js
var grabMode = "grab", minDistance$2 = 0, minOpacity = 0;
var Grabber = class extends ExternalInteractorBase {
	#maxDistance;
	#pluginManager;
	constructor(pluginManager, container) {
		super(container);
		this.#pluginManager = pluginManager;
		this.#maxDistance = 0;
	}
	get maxDistance() {
		return this.#maxDistance;
	}
	clear() {}
	init() {
		const container = this.container, grab = container.actualOptions.interactivity?.modes.grab;
		if (!grab) return;
		this.#maxDistance = grab.distance;
		container.retina.grabModeDistance = grab.distance * container.retina.pixelRatio;
	}
	interact(interactivityData) {
		const container = this.container, interactivity = container.actualOptions.interactivity;
		if (!interactivity?.modes.grab || !interactivity.events.onHover.enable || interactivityData.status !== "pointermove") return;
		const mousePos = interactivityData.mouse.position;
		if (!mousePos) return;
		const distance = container.retina.grabModeDistance;
		if (!distance || distance < minDistance$2) return;
		const query = container.particles.grid.queryCircle(mousePos, distance, (p) => this.isEnabled(interactivityData, p));
		for (const particle of query) {
			const pointDistance = getDistance(particle.getPosition(), mousePos);
			if (pointDistance > distance) continue;
			const grabLineOptions = interactivity.modes.grab.links, lineOpacity = grabLineOptions.opacity, opacityLine = lineOpacity - pointDistance * lineOpacity / distance;
			if (opacityLine <= minOpacity) continue;
			const optColor = grabLineOptions.color ?? particle.options.links?.color;
			if (!container.particles.grabLineColor && optColor) {
				const linksOptions = interactivity.modes.grab.links;
				container.particles.grabLineColor = getLinkRandomColor(this.#pluginManager, optColor, linksOptions.blink, linksOptions.consent);
			}
			const colorLine = getLinkColor(particle, void 0, container.particles.grabLineColor);
			if (!colorLine) continue;
			drawGrab(container, particle, colorLine, opacityLine, mousePos);
		}
	}
	isEnabled(interactivityData, particle) {
		const container = this.container, mouse = interactivityData.mouse, events = (particle?.interactivity ?? container.actualOptions.interactivity)?.events;
		return !!events?.onHover.enable && !!mouse.position && isInArray(grabMode, events.onHover.mode);
	}
	loadModeOptions(options, ...sources) {
		options.grab ??= new Grab();
		for (const source of sources) options.grab.load(source?.grab);
	}
	reset() {}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-grab/browser/index.js
async function loadExternalGrabInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		ensureInteractivityPluginLoaded(e);
		e.pluginManager.addInteractor?.("externalGrab", (container) => {
			return Promise.resolve(new Grabber(e.pluginManager, container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-parallax/browser/Options/Classes/Parallax.js
var Parallax = class {
	force;
	smooth;
	constructor() {
		this.force = 2;
		this.smooth = 10;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.force !== void 0) this.force = data.force;
		if (data.smooth !== void 0) this.smooth = data.smooth;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-parallax/browser/Parallaxer.js
var parallaxMode = "parallax";
var Parallaxer = class extends ExternalInteractorBase {
	maxDistance = 0;
	constructor(container) {
		super(container);
	}
	clear() {}
	init() {}
	interact(interactivityData) {
		for (const particle of this.container.particles.filter((p) => this.isEnabled(interactivityData, p))) this.#parallaxInteract(interactivityData, particle);
	}
	isEnabled(interactivityData, particle) {
		const container = this.container, mouse = interactivityData.mouse, events = (particle?.interactivity ?? container.actualOptions.interactivity)?.events;
		return !!events?.onHover.enable && !!mouse.position && isInArray(parallaxMode, events.onHover.mode);
	}
	loadModeOptions(options, ...sources) {
		options.parallax ??= new Parallax();
		for (const source of sources) options.parallax.load(source?.parallax);
	}
	reset() {}
	#parallaxInteract(interactivityData, particle) {
		if (!this.isEnabled(interactivityData, particle)) return;
		const container = this.container, parallaxOptions = container.actualOptions.interactivity?.modes.parallax;
		if (!parallaxOptions) return;
		const parallaxForce = parallaxOptions.force, mousePos = interactivityData.mouse.position;
		if (!mousePos) return;
		const canvasSize = container.canvas.size, canvasCenter = {
			x: canvasSize.width * half$1,
			y: canvasSize.height * half$1
		}, parallaxSmooth = parallaxOptions.smooth, factor = particle.getRadius() / parallaxForce, centerDistance = {
			x: (mousePos.x - canvasCenter.x) * factor,
			y: (mousePos.y - canvasCenter.y) * factor
		}, { offset } = particle;
		offset.x += (centerDistance.x - offset.x) / parallaxSmooth;
		offset.y += (centerDistance.y - offset.y) / parallaxSmooth;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-parallax/browser/index.js
async function loadExternalParallaxInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		ensureInteractivityPluginLoaded(e);
		e.pluginManager.addInteractor?.("externalParallax", (container) => {
			return Promise.resolve(new Parallaxer(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-pause/browser/Pauser.js
var pauseMode = "pause";
var Pauser = class extends ExternalInteractorBase {
	handleClickMode;
	maxDistance = 0;
	constructor(container) {
		super(container);
		this.handleClickMode = (mode) => {
			if (mode !== pauseMode) return;
			const container = this.container;
			if (container.animationStatus) container.pause();
			else container.play();
		};
	}
	clear() {}
	init() {}
	interact() {}
	isEnabled(_interactivityData, particle) {
		const options = this.container.actualOptions, events = (particle?.interactivity ?? options.interactivity)?.events;
		return !!events && isInArray(pauseMode, events.onClick.mode);
	}
	reset() {}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-pause/browser/index.js
async function loadExternalPauseInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		ensureInteractivityPluginLoaded(e);
		e.pluginManager.addInteractor?.("externalPause", (container) => {
			return Promise.resolve(new Pauser(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-push/browser/Options/Classes/Push.js
var Push = class {
	default;
	groups;
	particles;
	quantity;
	constructor() {
		this.default = true;
		this.groups = [];
		this.quantity = 4;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.default !== void 0) this.default = data.default;
		if (data.groups !== void 0) this.groups = data.groups.map((t) => t);
		if (!this.groups.length) this.default = true;
		const quantity = data.quantity;
		if (quantity !== void 0) this.quantity = setRangeValue(quantity);
		this.particles = executeOnSingleOrMultiple(data.particles, (particles) => {
			return deepExtend({}, particles);
		});
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-push/browser/Pusher.js
var pushMode = "push", minQuantity = 0;
var Pusher = class extends ExternalInteractorBase {
	handleClickMode;
	maxDistance = 0;
	constructor(container) {
		super(container);
		this.handleClickMode = (mode, interactivityData) => {
			if (mode !== pushMode) return;
			const container = this.container, pushOptions = container.actualOptions.interactivity?.modes.push;
			if (!pushOptions) return;
			const quantity = getRangeValue(pushOptions.quantity);
			if (quantity <= minQuantity) return;
			const group = itemFromArray([void 0, ...pushOptions.groups]), overrideOptions = deepExtend(group !== void 0 ? container.actualOptions.particles.groups[group] : void 0, itemFromSingleOrMultiple(pushOptions.particles));
			container.particles.push(quantity, interactivityData.mouse.position, overrideOptions, group);
		};
	}
	clear() {}
	init() {}
	interact() {}
	isEnabled(interactivityData, particle) {
		const options = this.container.actualOptions, mouse = interactivityData.mouse, events = (particle?.interactivity ?? options.interactivity)?.events;
		return !!events && mouse.clicking && mouse.inside && !!mouse.position && isInArray(pushMode, events.onClick.mode);
	}
	loadModeOptions(options, ...sources) {
		options.push ??= new Push();
		for (const source of sources) options.push.load(source?.push);
	}
	reset() {}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-push/browser/index.js
async function loadExternalPushInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		ensureInteractivityPluginLoaded(e);
		e.pluginManager.addInteractor?.("externalPush", (container) => {
			return Promise.resolve(new Pusher(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-remove/browser/Options/Classes/Remove.js
var Remove = class {
	quantity;
	constructor() {
		this.quantity = 2;
	}
	load(data) {
		if (isNull(data)) return;
		const quantity = data.quantity;
		if (quantity !== void 0) this.quantity = setRangeValue(quantity);
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-remove/browser/Remover.js
var removeMode = "remove";
var Remover = class extends ExternalInteractorBase {
	handleClickMode;
	maxDistance = 0;
	constructor(container) {
		super(container);
		this.handleClickMode = (mode) => {
			const container = this.container, options = container.actualOptions;
			if (!options.interactivity?.modes.remove || mode !== removeMode) return;
			const removeNb = getRangeValue(options.interactivity.modes.remove.quantity);
			for (let i = 0; i < removeNb; i++) container.particles.get(i)?.destroy();
		};
	}
	clear() {}
	init() {}
	interact() {}
	isEnabled(interactivityData, particle) {
		const options = this.container.actualOptions, mouse = interactivityData.mouse, events = (particle?.interactivity ?? options.interactivity)?.events;
		return !!events && mouse.clicking && mouse.inside && !!mouse.position && isInArray(removeMode, events.onClick.mode);
	}
	loadModeOptions(options, ...sources) {
		options.remove ??= new Remove();
		for (const source of sources) options.remove.load(source?.remove);
	}
	reset() {}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-remove/browser/index.js
async function loadExternalRemoveInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		ensureInteractivityPluginLoaded(e);
		e.pluginManager.addInteractor?.("externalRemove", (container) => {
			return Promise.resolve(new Remover(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-repulse/browser/Options/Classes/RepulseBase.js
var RepulseBase = class {
	distance;
	duration;
	easing;
	factor;
	maxSpeed;
	restore;
	speed;
	constructor() {
		this.distance = 200;
		this.duration = .4;
		this.factor = 100;
		this.speed = 1;
		this.maxSpeed = 50;
		this.easing = EasingType.easeOutQuad;
		this.restore = {
			enable: false,
			delay: 0,
			speed: .08,
			follow: true
		};
	}
	load(data) {
		if (isNull(data)) return;
		if (data.distance !== void 0) this.distance = data.distance;
		if (data.duration !== void 0) this.duration = data.duration;
		if (data.easing !== void 0) this.easing = data.easing;
		if (data.factor !== void 0) this.factor = data.factor;
		if (data.speed !== void 0) this.speed = data.speed;
		if (data.maxSpeed !== void 0) this.maxSpeed = data.maxSpeed;
		if (data.restore !== void 0) {
			this.restore.enable = data.restore.enable ?? this.restore.enable;
			this.restore.delay = data.restore.delay ?? this.restore.delay;
			this.restore.speed = data.restore.speed ?? this.restore.speed;
			this.restore.follow = data.restore.follow ?? this.restore.follow;
		}
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-repulse/browser/Options/Classes/RepulseDiv.js
var RepulseDiv = class extends RepulseBase {
	selectors;
	constructor() {
		super();
		this.selectors = [];
	}
	load(data) {
		super.load(data);
		if (isNull(data)) return;
		if (data.selectors !== void 0) this.selectors = data.selectors;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-repulse/browser/Options/Classes/Repulse.js
var Repulse = class extends RepulseBase {
	divs;
	load(data) {
		super.load(data);
		if (isNull(data)) return;
		this.divs = executeOnSingleOrMultiple(data.divs, (div) => {
			const tmp = new RepulseDiv();
			tmp.load(div);
			return tmp;
		});
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-repulse/browser/Repulser.js
var repulseMode = "repulse", minDistance$1 = 0, repulseRadiusFactor = 6, repulseRadiusPower = 3, squarePower = 2, minRadius$1 = 0, minSpeed = 0, easingOffset = 1, minRestoreSpeed = .001, maxRestoreSpeed = 1, restoreEpsilon = .5;
var Repulser = class extends ExternalInteractorBase {
	handleClickMode;
	#clickVec;
	#interactedThisFrame;
	#maxDistance;
	#normVec;
	#pluginManager;
	#restoreData;
	constructor(pluginManager, container) {
		super(container);
		this.#pluginManager = pluginManager;
		this.#maxDistance = 0;
		this.#normVec = Vector.origin;
		this.#interactedThisFrame = /* @__PURE__ */ new Set();
		this.#clickVec = Vector.origin;
		this.#restoreData = /* @__PURE__ */ new Map();
		container.repulse ??= { particles: [] };
		this.handleClickMode = (mode, interactivityData) => {
			const repulseOpts = this.container.actualOptions.interactivity?.modes.repulse;
			if (!repulseOpts || mode !== repulseMode) return;
			container.repulse ??= { particles: [] };
			const repulse = container.repulse;
			repulse.clicking = true;
			repulse.count = 0;
			for (const particle of container.repulse.particles) {
				if (!this.isEnabled(interactivityData, particle)) continue;
				particle.velocity.setTo(particle.initialVelocity);
			}
			repulse.particles = [];
			repulse.finish = false;
			setTimeout(() => {
				if (container.destroyed) return;
				repulse.clicking = false;
			}, repulseOpts.duration * millisecondsToSeconds);
		};
	}
	get maxDistance() {
		return this.#maxDistance;
	}
	clear() {}
	init() {
		const container = this.container, repulse = container.actualOptions.interactivity?.modes.repulse;
		if (!repulse) return;
		this.#maxDistance = repulse.distance;
		container.retina.repulseModeDistance = repulse.distance * container.retina.pixelRatio;
	}
	interact(interactivityData) {
		this.#interactedThisFrame.clear();
		const options = this.container.actualOptions, mouseMoveStatus = interactivityData.status === mouseMoveEvent, events = options.interactivity?.events;
		if (!events) return;
		const hover = events.onHover, hoverEnabled = hover.enable, hoverMode = hover.mode, click = events.onClick, clickEnabled = click.enable, clickMode = click.mode, divs = events.onDiv;
		if (mouseMoveStatus && hoverEnabled && isInArray(repulseMode, hoverMode)) this.#hoverRepulse(interactivityData);
		else if (clickEnabled && isInArray(repulseMode, clickMode)) this.#clickRepulse(interactivityData);
		else divModeExecute(repulseMode, divs, (selector, div) => {
			this.#singleSelectorRepulse(interactivityData, selector, div);
		});
		this.#restoreParticles();
	}
	isEnabled(interactivityData, particle) {
		const options = this.container.actualOptions, mouse = interactivityData.mouse, events = (particle?.interactivity ?? options.interactivity)?.events;
		if (!events) return false;
		const divs = events.onDiv, hover = events.onHover, click = events.onClick, divRepulse = isDivModeEnabled(repulseMode, divs);
		if (!(divRepulse || hover.enable && !!mouse.position || click.enable && mouse.clickPosition)) return false;
		const hoverMode = hover.mode, clickMode = click.mode;
		return isInArray(repulseMode, hoverMode) || isInArray(repulseMode, clickMode) || divRepulse;
	}
	loadModeOptions(options, ...sources) {
		options.repulse ??= new Repulse();
		for (const source of sources) options.repulse.load(source?.repulse);
	}
	reset() {}
	#clickRepulse = (interactivityData) => {
		const container = this.container, repulseOptions = container.actualOptions.interactivity?.modes.repulse;
		if (!repulseOptions) return;
		const repulse = container.repulse ?? { particles: [] };
		if (!repulse.finish) {
			repulse.count ??= 0;
			repulse.count++;
			if (repulse.count === container.particles.count) repulse.finish = true;
		}
		if (repulse.clicking) {
			const repulseDistance = container.retina.repulseModeDistance;
			if (!repulseDistance || repulseDistance < minDistance$1) return;
			const repulseRadius = Math.pow(repulseDistance / repulseRadiusFactor, repulseRadiusPower), mouseClickPos = interactivityData.mouse.clickPosition;
			if (mouseClickPos === void 0) return;
			const range = new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius), query = container.particles.grid.query(range, (p) => this.isEnabled(interactivityData, p));
			for (const particle of query) {
				const { dx, dy, distance } = getDistances(mouseClickPos, particle.position), d = distance ** squarePower, velocity = repulseOptions.speed, force = -repulseRadius * velocity / d;
				if (d <= repulseRadius) {
					this.#trackInteractedParticle(particle);
					repulse.particles.push(particle);
					this.#clickVec.x = dx;
					this.#clickVec.y = dy;
					this.#clickVec.length = force;
					particle.velocity.setTo(this.#clickVec);
				}
			}
		} else if (repulse.clicking === false) {
			for (const particle of repulse.particles) particle.velocity.setTo(particle.initialVelocity);
			repulse.particles = [];
		}
	};
	#hoverRepulse = (interactivityData) => {
		const container = this.container, mousePos = interactivityData.mouse.position, repulseRadius = container.retina.repulseModeDistance;
		if (!repulseRadius || repulseRadius < minRadius$1 || !mousePos) return;
		this.#processRepulse(interactivityData, mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
	};
	#processRepulse = (interactivityData, position, repulseRadius, area, divRepulse) => {
		const container = this.container, query = container.particles.grid.query(area, (p) => this.isEnabled(interactivityData, p)), repulseOptions = container.actualOptions.interactivity?.modes.repulse;
		if (!repulseOptions) return;
		const { easing, speed, factor, maxSpeed } = repulseOptions, easingFunc = this.#pluginManager.getEasing(easing), velocity = (divRepulse?.speed ?? speed) * factor;
		for (const particle of query) {
			const { dx, dy, distance } = getDistances(particle.position, position), repulseFactor = clamp(easingFunc(easingOffset - distance / repulseRadius) * velocity, minSpeed, maxSpeed);
			this.#normVec.x = !distance ? velocity : dx / distance * repulseFactor;
			this.#normVec.y = !distance ? velocity : dy / distance * repulseFactor;
			this.#trackInteractedParticle(particle);
			particle.position.addTo(this.#normVec);
		}
	};
	#restoreParticles() {
		const restore = this.container.actualOptions.interactivity?.modes.repulse?.restore;
		if (!restore?.enable || !this.#restoreData.size) return;
		const now = Date.now(), restoreDelay = restore.delay * millisecondsToSeconds, restoreSpeed = Math.max(minRestoreSpeed, Math.min(maxRestoreSpeed, restore.speed));
		for (const [particle, restoreData] of this.#restoreData) {
			if (this.#interactedThisFrame.has(particle)) continue;
			if (particle.destroyed) {
				this.#restoreData.delete(particle);
				continue;
			}
			const target = restoreData.target;
			if (now - restoreData.lastInteractionTime < restoreDelay) continue;
			if (restore.follow && particle.options.move.enable) {
				target.x += particle.velocity.x;
				target.y += particle.velocity.y;
				target.z += particle.velocity.z;
			}
			const dx = target.x - particle.position.x, dy = target.y - particle.position.y, dz = target.z - particle.position.z;
			particle.position.x += dx * restoreSpeed;
			particle.position.y += dy * restoreSpeed;
			particle.position.z += dz * restoreSpeed;
			if (Math.abs(dx) <= restoreEpsilon && Math.abs(dy) <= restoreEpsilon) {
				particle.position.x = target.x;
				particle.position.y = target.y;
				particle.position.z = target.z;
				this.#restoreData.delete(particle);
				continue;
			}
		}
	}
	#singleSelectorRepulse = (interactivityData, selector, div) => {
		const container = this.container, repulse = container.actualOptions.interactivity?.modes.repulse;
		if (!repulse) return;
		const query = safeDocument().querySelectorAll(selector);
		if (!query.length) return;
		query.forEach((item) => {
			const elem = item, pxRatio = container.retina.pixelRatio, pos = {
				x: (elem.offsetLeft + elem.offsetWidth * half$1) * pxRatio,
				y: (elem.offsetTop + elem.offsetHeight * half$1) * pxRatio
			}, repulseRadius = elem.offsetWidth * half$1 * pxRatio, area = div.type === DivType.circle ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), divs = repulse.divs, divRepulse = divMode(divs, elem);
			this.#processRepulse(interactivityData, pos, repulseRadius, area, divRepulse);
		});
	};
	#trackInteractedParticle(particle) {
		this.#interactedThisFrame.add(particle);
		const restore = this.container.actualOptions.interactivity?.modes.repulse?.restore;
		if (!restore?.enable) return;
		const now = Date.now();
		let restoreData = this.#restoreData.get(particle);
		if (!restoreData) {
			restoreData = {
				target: particle.position.copy(),
				lastInteractionTime: now
			};
			this.#restoreData.set(particle, restoreData);
		}
		restoreData.lastInteractionTime = now;
		if (restore.follow && particle.options.move.enable) {
			restoreData.target.x += particle.velocity.x;
			restoreData.target.y += particle.velocity.y;
			restoreData.target.z += particle.velocity.z;
		}
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-repulse/browser/index.js
async function loadExternalRepulseInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		ensureInteractivityPluginLoaded(e);
		const pluginManager = e.pluginManager;
		pluginManager.addInteractor?.("externalRepulse", (container) => {
			return Promise.resolve(new Repulser(pluginManager, container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-external-slow/browser/Options/Classes/Slow.js
var Slow = class {
	factor;
	radius;
	constructor() {
		this.factor = 3;
		this.radius = 200;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.factor !== void 0) this.factor = data.factor;
		if (data.radius !== void 0) this.radius = data.radius;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-slow/browser/Slower.js
var slowMode = "slow", minRadius = 0;
var Slower = class extends ExternalInteractorBase {
	#maxDistance;
	constructor(container) {
		super(container);
		this.#maxDistance = 0;
	}
	get maxDistance() {
		return this.#maxDistance;
	}
	clear(particle, _delta, force) {
		if (particle.slow.inRange && !force) return;
		particle.slow.factor = 1;
	}
	init() {
		const container = this.container, slow = container.actualOptions.interactivity?.modes.slow;
		if (!slow) return;
		this.#maxDistance = slow.radius;
		container.retina.slowModeRadius = slow.radius * container.retina.pixelRatio;
	}
	interact() {}
	isEnabled(interactivityData, particle) {
		const container = this.container, mouse = interactivityData.mouse, events = (particle?.interactivity ?? container.actualOptions.interactivity)?.events;
		return !!events?.onHover.enable && !!mouse.position && isInArray(slowMode, events.onHover.mode);
	}
	loadModeOptions(options, ...sources) {
		options.slow ??= new Slow();
		for (const source of sources) options.slow.load(source?.slow);
	}
	reset(interactivityData, particle) {
		particle.slow.inRange = false;
		const container = this.container, options = container.actualOptions, mousePos = interactivityData.mouse.position, radius = container.retina.slowModeRadius, slowOptions = options.interactivity?.modes.slow;
		if (!slowOptions || !radius || radius < minRadius || !mousePos) return;
		const dist = getDistance(mousePos, particle.getPosition()), proximityFactor = dist / radius, slowFactor = slowOptions.factor, { slow } = particle;
		if (dist > radius) return;
		slow.inRange = true;
		slow.factor = proximityFactor / slowFactor;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-external-slow/browser/index.js
async function loadExternalSlowInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		ensureInteractivityPluginLoaded(e);
		e.pluginManager.addInteractor?.("externalSlow", (container) => {
			return Promise.resolve(new Slower(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/shape-image/browser/Utils.js
var shapeTypes = ["image", "images"];
var stringStart = 0, defaultOpacity = 1;
var currentColorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;
function replaceColorSvg(imageShape, color, opacity, hdr = false) {
	const { svgData } = imageShape;
	if (!svgData) return "";
	const colorStyle = getStyleFromHsl(color, hdr, opacity);
	if (svgData.includes("fill")) return svgData.replaceAll(currentColorRegex, () => colorStyle);
	const preFillIndex = svgData.indexOf(">");
	return `${svgData.substring(stringStart, preFillIndex)} fill="${colorStyle}"${svgData.substring(preFillIndex)}`;
}
async function loadImage(image) {
	return new Promise((resolve) => {
		image.loading = true;
		const img = new Image();
		image.element = img;
		img.addEventListener("load", () => {
			image.loading = false;
			resolve();
		});
		img.addEventListener("error", () => {
			image.element = void 0;
			image.error = true;
			image.loading = false;
			getLogger().error(`Error loading image: ${image.source}`);
			resolve();
		});
		img.src = image.source;
	});
}
async function downloadSvgImage(image) {
	if (image.type !== "svg") {
		await loadImage(image);
		return;
	}
	image.loading = true;
	const response = await fetch(image.source);
	if (response.ok) image.svgData = await response.text();
	else {
		getLogger().error("Image not found");
		image.error = true;
	}
	image.loading = false;
}
function replaceImageColor(image, imageData, color, particle, hdr = false) {
	const svgColoredData = replaceColorSvg(image, color, particle.opacity?.value ?? defaultOpacity, hdr), imageRes = {
		color,
		gif: imageData.gif,
		data: {
			...image,
			svgData: svgColoredData
		},
		loaded: false,
		ratio: imageData.width / imageData.height,
		replaceColor: imageData.replaceColor,
		source: imageData.src
	};
	return new Promise((resolve) => {
		const svg = new Blob([svgColoredData], { type: "image/svg+xml" }), url = URL.createObjectURL(svg), img = new Image();
		img.addEventListener("load", () => {
			imageRes.loaded = true;
			imageRes.element = img;
			resolve(imageRes);
			URL.revokeObjectURL(url);
		});
		const errorHandler = async () => {
			URL.revokeObjectURL(url);
			const img2 = {
				...image,
				error: false,
				loading: true
			};
			await loadImage(img2);
			imageRes.loaded = true;
			imageRes.element = img2.element;
			resolve(imageRes);
		};
		img.addEventListener("error", () => void errorHandler());
		img.src = url;
	});
}
//#endregion
//#region node_modules/@tsparticles/shape-image/browser/GifUtils/Constants.js
var InterlaceOffsets = [
	0,
	4,
	2,
	1
];
var InterlaceSteps = [
	8,
	8,
	4,
	2
];
//#endregion
//#region node_modules/@tsparticles/shape-image/browser/GifUtils/ByteStream.js
var ByteStream = class {
	data;
	pos;
	constructor(bytes) {
		this.pos = 0;
		this.data = new Uint8ClampedArray(bytes);
	}
	getString(count) {
		const slice = this.data.slice(this.pos, this.pos + count);
		this.pos += slice.length;
		return slice.reduce((acc, curr) => acc + String.fromCharCode(curr), "");
	}
	nextByte() {
		return this.data[this.pos++];
	}
	nextTwoBytes() {
		const increment = 2, previous = 1, shift = 8;
		this.pos += increment;
		return this.data[this.pos - increment] + (this.data[this.pos - previous] << shift);
	}
	readSubBlocks() {
		let blockString = "", size;
		const minCount = 0, emptySize = 0;
		do {
			size = this.data[this.pos++];
			for (let count = size; --count >= minCount; blockString += String.fromCharCode(this.data[this.pos++]));
		} while (size !== emptySize);
		return blockString;
	}
	readSubBlocksBin() {
		let size = this.data[this.pos], len = 0;
		const emptySize = 0, increment = 1;
		for (let offset = 0; size !== emptySize; offset += size + increment, size = this.data[this.pos + offset]) len += size;
		const blockData = new Uint8Array(len);
		size = this.data[this.pos++];
		for (let i = 0; size !== emptySize; size = this.data[this.pos++]) for (let count = size; --count >= emptySize; blockData[i++] = this.data[this.pos++]);
		return blockData;
	}
	skipSubBlocks() {
		for (const increment = 1, noData = 0; this.data[this.pos] !== noData; this.pos += this.data[this.pos] + increment);
		this.pos++;
	}
};
//#endregion
//#region node_modules/@tsparticles/shape-image/browser/GifUtils/Enums/DisposalMethod.js
var DisposalMethod;
(function(DisposalMethod) {
	DisposalMethod[DisposalMethod["Replace"] = 0] = "Replace";
	DisposalMethod[DisposalMethod["Combine"] = 1] = "Combine";
	DisposalMethod[DisposalMethod["RestoreBackground"] = 2] = "RestoreBackground";
	DisposalMethod[DisposalMethod["RestorePrevious"] = 3] = "RestorePrevious";
	DisposalMethod[DisposalMethod["UndefinedA"] = 4] = "UndefinedA";
	DisposalMethod[DisposalMethod["UndefinedB"] = 5] = "UndefinedB";
	DisposalMethod[DisposalMethod["UndefinedC"] = 6] = "UndefinedC";
	DisposalMethod[DisposalMethod["UndefinedD"] = 7] = "UndefinedD";
})(DisposalMethod || (DisposalMethod = {}));
//#endregion
//#region node_modules/@tsparticles/shape-image/browser/GifUtils/Types/GIFDataHeaders.js
var GIFDataHeaders;
(function(GIFDataHeaders) {
	GIFDataHeaders[GIFDataHeaders["Extension"] = 33] = "Extension";
	GIFDataHeaders[GIFDataHeaders["ApplicationExtension"] = 255] = "ApplicationExtension";
	GIFDataHeaders[GIFDataHeaders["GraphicsControlExtension"] = 249] = "GraphicsControlExtension";
	GIFDataHeaders[GIFDataHeaders["PlainTextExtension"] = 1] = "PlainTextExtension";
	GIFDataHeaders[GIFDataHeaders["CommentExtension"] = 254] = "CommentExtension";
	GIFDataHeaders[GIFDataHeaders["Image"] = 44] = "Image";
	GIFDataHeaders[GIFDataHeaders["EndOfFile"] = 59] = "EndOfFile";
})(GIFDataHeaders || (GIFDataHeaders = {}));
//#endregion
//#region node_modules/@tsparticles/shape-image/browser/GifUtils/Utils.js
var defaultFrame = 0, initialTime = 0, firstIndex = 0, defaultLoopCount = 0;
function parseColorTable(byteStream, count) {
	const colors = [];
	for (let i = 0; i < count; i++) {
		colors.push({
			r: byteStream.data[byteStream.pos],
			g: byteStream.data[byteStream.pos + 1],
			b: byteStream.data[byteStream.pos + 2]
		});
		byteStream.pos += 3;
	}
	return colors;
}
function parseExtensionBlock(byteStream, gif, getFrameIndex, getTransparencyIndex) {
	switch (byteStream.nextByte()) {
		case GIFDataHeaders.GraphicsControlExtension: {
			const frame = gif.frames[getFrameIndex(false)];
			byteStream.pos++;
			const packedByte = byteStream.nextByte();
			frame.GCreserved = (packedByte & 224) >>> 5;
			frame.disposalMethod = (packedByte & 28) >>> 2;
			frame.userInputDelayFlag = (packedByte & 2) === 2;
			const transparencyFlag = (packedByte & 1) === 1;
			frame.delayTime = byteStream.nextTwoBytes() * 10;
			const transparencyIndex = byteStream.nextByte();
			if (transparencyFlag) getTransparencyIndex(transparencyIndex);
			byteStream.pos++;
			break;
		}
		case GIFDataHeaders.ApplicationExtension: {
			byteStream.pos++;
			const applicationExtension = {
				identifier: byteStream.getString(8),
				authenticationCode: byteStream.getString(3),
				data: byteStream.readSubBlocksBin()
			};
			gif.applicationExtensions.push(applicationExtension);
			break;
		}
		case GIFDataHeaders.CommentExtension:
			gif.comments.push([getFrameIndex(false), byteStream.readSubBlocks()]);
			break;
		case GIFDataHeaders.PlainTextExtension:
			if (gif.globalColorTable.length === 0) throw new EvalError("plain text extension without global color table");
			byteStream.pos++;
			gif.frames[getFrameIndex(false)].plainTextData = {
				left: byteStream.nextTwoBytes(),
				top: byteStream.nextTwoBytes(),
				width: byteStream.nextTwoBytes(),
				height: byteStream.nextTwoBytes(),
				charSize: {
					width: byteStream.nextTwoBytes(),
					height: byteStream.nextTwoBytes()
				},
				foregroundColor: byteStream.nextByte(),
				backgroundColor: byteStream.nextByte(),
				text: byteStream.readSubBlocks()
			};
			break;
		default:
			byteStream.skipSubBlocks();
			break;
	}
}
function readBits(imageData, pos, len) {
	const bytePos = pos >>> 3, bitPos = pos & 7;
	return (imageData[bytePos] + (imageData[bytePos + 1] << 8) + (imageData[bytePos + 2] << 16) & (1 << len) - 1 << bitPos) >>> bitPos;
}
async function parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, canvasSettings, progressCallback) {
	const frame = gif.frames[getFrameIndex(true)];
	frame.left = byteStream.nextTwoBytes();
	frame.top = byteStream.nextTwoBytes();
	frame.width = byteStream.nextTwoBytes();
	frame.height = byteStream.nextTwoBytes();
	const packedByte = byteStream.nextByte(), localColorTableFlag = (packedByte & 128) === 128, interlacedFlag = (packedByte & 64) === 64;
	frame.sortFlag = (packedByte & 32) === 32;
	frame.reserved = (packedByte & 24) >>> 3;
	const localColorCount = 1 << (packedByte & 7) + 1;
	if (localColorTableFlag) frame.localColorTable = parseColorTable(byteStream, localColorCount);
	const getColor = (index) => {
		const { r, g, b } = (localColorTableFlag ? frame.localColorTable : gif.globalColorTable)[index];
		if (index !== getTransparencyIndex(null)) return {
			r,
			g,
			b,
			a: 255
		};
		return {
			r,
			g,
			b,
			a: avgAlpha ? Math.trunc((r + g + b) / 3) : 0
		};
	}, image = (() => {
		try {
			return new ImageData(frame.width, frame.height, canvasSettings);
		} catch (error) {
			if (error instanceof DOMException && error.name === "IndexSizeError") return null;
			throw error;
		}
	})();
	if (image == null) throw new EvalError("GIF frame size is to large");
	const minCodeSize = byteStream.nextByte(), imageData = byteStream.readSubBlocksBin(), clearCode = 1 << minCodeSize;
	if (interlacedFlag) {
		for (let code = 0, size = minCodeSize + 1, pos = 0, dic = [[0]], pass = 0; pass < 4; pass++) {
			if (InterlaceOffsets[pass] < frame.height) {
				let pixelPos = 0, lineIndex = 0, exit = false;
				while (!exit) {
					const last = code;
					code = readBits(imageData, pos, size);
					pos += size + 1;
					if (code === clearCode) {
						size = minCodeSize + 1;
						dic.length = clearCode + 2;
						for (let i = 0; i < dic.length; i++) dic[i] = i < clearCode ? [i] : [];
					} else {
						if (code >= dic.length) dic.push(dic[last].concat(dic[last][0]));
						else if (last !== clearCode) dic.push(dic[last].concat(dic[code][0]));
						for (const item of dic[code]) {
							const { r, g, b, a } = getColor(item);
							image.data.set([
								r,
								g,
								b,
								a
							], InterlaceOffsets[pass] * frame.width + InterlaceSteps[pass] * lineIndex + pixelPos % (frame.width * 4));
							pixelPos += 4;
						}
						if (dic.length === 1 << size && size < 12) size++;
					}
					if (pixelPos === frame.width * 4 * (lineIndex + 1)) {
						lineIndex++;
						if (InterlaceOffsets[pass] + InterlaceSteps[pass] * lineIndex >= frame.height) exit = true;
					}
				}
			}
			progressCallback?.(byteStream.pos / (byteStream.data.length - 1), getFrameIndex(false) + 1, image, {
				x: frame.left,
				y: frame.top
			}, {
				width: gif.width,
				height: gif.height
			});
		}
		frame.image = image;
		frame.bitmap = await createImageBitmap(image);
	} else {
		let code = 0, size = minCodeSize + 1, pos = 0, pixelPos = -4;
		const dic = [[0]];
		for (;;) {
			const last = code;
			code = readBits(imageData, pos, size);
			pos += size;
			if (code === clearCode) {
				size = minCodeSize + 1;
				dic.length = clearCode + 2;
				for (let i = 0; i < dic.length; i++) dic[i] = i < clearCode ? [i] : [];
			} else {
				if (code === clearCode + 1) break;
				if (code >= dic.length) dic.push(dic[last].concat(dic[last][0]));
				else if (last !== clearCode) dic.push(dic[last].concat(dic[code][0]));
				for (const item of dic[code]) {
					const { r, g, b, a } = getColor(item);
					pixelPos += 4;
					image.data.set([
						r,
						g,
						b,
						a
					], pixelPos);
				}
				if (dic.length >= 1 << size && size < 12) size++;
			}
		}
		frame.image = image;
		frame.bitmap = await createImageBitmap(image);
		progressCallback?.((byteStream.pos + 1) / byteStream.data.length, getFrameIndex(false) + 1, frame.image, {
			x: frame.left,
			y: frame.top
		}, {
			width: gif.width,
			height: gif.height
		});
	}
}
async function parseBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, canvasSettings, progressCallback) {
	switch (byteStream.nextByte()) {
		case GIFDataHeaders.EndOfFile: return true;
		case GIFDataHeaders.Image:
			await parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, canvasSettings, progressCallback);
			break;
		case GIFDataHeaders.Extension:
			parseExtensionBlock(byteStream, gif, getFrameIndex, getTransparencyIndex);
			break;
		default: throw new EvalError("undefined block found");
	}
	return false;
}
function getGIFLoopAmount(gif) {
	for (const extension of gif.applicationExtensions) {
		if (extension.identifier + extension.authenticationCode !== "NETSCAPE2.0") continue;
		return extension.data[1] + (extension.data[2] << 8);
	}
	return NaN;
}
async function decodeGIF(gifURL, canvasSettings, progressCallback, avgAlpha) {
	avgAlpha ??= false;
	const res = await fetch(gifURL);
	if (!res.ok && res.status === 404) throw new EvalError("file not found");
	const buffer = await res.arrayBuffer(), gif = {
		width: 0,
		height: 0,
		totalTime: 0,
		colorRes: 0,
		pixelAspectRatio: 0,
		frames: [],
		sortFlag: false,
		globalColorTable: [],
		backgroundImage: new ImageData(1, 1, canvasSettings),
		comments: [],
		applicationExtensions: []
	}, byteStream = new ByteStream(new Uint8ClampedArray(buffer));
	if (byteStream.getString(6) !== "GIF89a") throw new Error("not a supported GIF file");
	gif.width = byteStream.nextTwoBytes();
	gif.height = byteStream.nextTwoBytes();
	const packedByte = byteStream.nextByte(), globalColorTableFlag = (packedByte & 128) === 128;
	gif.colorRes = (packedByte & 112) >>> 4;
	gif.sortFlag = (packedByte & 8) === 8;
	const globalColorCount = 1 << (packedByte & 7) + 1, backgroundColorIndex = byteStream.nextByte();
	gif.pixelAspectRatio = byteStream.nextByte();
	if (gif.pixelAspectRatio !== 0) gif.pixelAspectRatio = (gif.pixelAspectRatio + 15) / 64;
	if (globalColorTableFlag) gif.globalColorTable = parseColorTable(byteStream, globalColorCount);
	const backgroundImage = (() => {
		try {
			return new ImageData(gif.width, gif.height, canvasSettings);
		} catch (error) {
			if (error instanceof DOMException && error.name === "IndexSizeError") return null;
			throw error;
		}
	})();
	if (backgroundImage == null) throw new Error("GIF frame size is to large");
	const { r, g, b } = gif.globalColorTable[backgroundColorIndex];
	backgroundImage.data.set(globalColorTableFlag ? [
		r,
		g,
		b,
		255
	] : [
		0,
		0,
		0,
		0
	]);
	for (let i = 4; i < backgroundImage.data.length; i *= 2) backgroundImage.data.copyWithin(i, 0, i);
	gif.backgroundImage = backgroundImage;
	let frameIndex = -1, incrementFrameIndex = true, transparencyIndex = -1;
	const getframeIndex = (increment) => {
		if (increment) incrementFrameIndex = true;
		return frameIndex;
	}, getTransparencyIndex = (newValue) => {
		if (newValue != null) transparencyIndex = newValue;
		return transparencyIndex;
	};
	try {
		do
			if (incrementFrameIndex) {
				gif.frames.push({
					left: 0,
					top: 0,
					width: 0,
					height: 0,
					disposalMethod: DisposalMethod.Replace,
					image: new ImageData(1, 1, canvasSettings),
					plainTextData: null,
					userInputDelayFlag: false,
					delayTime: 0,
					sortFlag: false,
					localColorTable: [],
					reserved: 0,
					GCreserved: 0
				});
				frameIndex++;
				transparencyIndex = -1;
				incrementFrameIndex = false;
			}
		while (!await parseBlock(byteStream, gif, avgAlpha, getframeIndex, getTransparencyIndex, canvasSettings, progressCallback));
		gif.frames.length--;
		for (const frame of gif.frames) {
			if (frame.userInputDelayFlag && frame.delayTime === 0) {
				gif.totalTime = Infinity;
				break;
			}
			gif.totalTime += frame.delayTime;
		}
		return gif;
	} catch (error) {
		if (error instanceof EvalError) throw new Error(`error while parsing frame ${frameIndex.toString()} "${error.message}"`, { cause: error });
		throw error;
	}
}
function drawGif(data, canvasSettings) {
	const { context, radius, particle, delta } = data, image = particle.image;
	if (!image?.gifData || !image.gif) return;
	const offscreenCanvas = new OffscreenCanvas(image.gifData.width, image.gifData.height), offscreenContext = offscreenCanvas.getContext("2d", canvasSettings);
	if (!offscreenContext) throw new Error("could not create offscreen canvas context");
	offscreenContext.imageSmoothingQuality = "low";
	offscreenContext.imageSmoothingEnabled = false;
	offscreenContext.clearRect(originPoint.x, originPoint.y, offscreenCanvas.width, offscreenCanvas.height);
	particle.gifLoopCount ??= image.gifLoopCount ?? defaultLoopCount;
	let frameIndex = particle.gifFrame ?? defaultFrame;
	const pos = {
		x: -image.gifData.width * half$1,
		y: -image.gifData.height * half$1
	}, frame = image.gifData.frames[frameIndex];
	particle.gifTime ??= initialTime;
	if (!frame.bitmap) return;
	context.scale(radius / image.gifData.width, radius / image.gifData.height);
	switch (frame.disposalMethod) {
		case DisposalMethod.UndefinedA:
		case DisposalMethod.UndefinedB:
		case DisposalMethod.UndefinedC:
		case DisposalMethod.UndefinedD:
		case DisposalMethod.Replace:
			offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
			context.drawImage(offscreenCanvas, pos.x, pos.y);
			offscreenContext.clearRect(originPoint.x, originPoint.y, offscreenCanvas.width, offscreenCanvas.height);
			break;
		case DisposalMethod.Combine:
			offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
			context.drawImage(offscreenCanvas, pos.x, pos.y);
			break;
		case DisposalMethod.RestoreBackground:
			offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
			context.drawImage(offscreenCanvas, pos.x, pos.y);
			offscreenContext.clearRect(originPoint.x, originPoint.y, offscreenCanvas.width, offscreenCanvas.height);
			if (!image.gifData.globalColorTable.length) offscreenContext.putImageData(image.gifData.frames[firstIndex].image, pos.x + frame.left, pos.y + frame.top);
			else offscreenContext.putImageData(image.gifData.backgroundImage, pos.x, pos.y);
			break;
		case DisposalMethod.RestorePrevious:
			{
				const previousImageData = offscreenContext.getImageData(originPoint.x, originPoint.y, offscreenCanvas.width, offscreenCanvas.height);
				offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
				context.drawImage(offscreenCanvas, pos.x, pos.y);
				offscreenContext.clearRect(originPoint.x, originPoint.y, offscreenCanvas.width, offscreenCanvas.height);
				offscreenContext.putImageData(previousImageData, originPoint.x, originPoint.y);
			}
			break;
	}
	particle.gifTime += delta.value;
	if (particle.gifTime > frame.delayTime) {
		particle.gifTime -= frame.delayTime;
		if (++frameIndex >= image.gifData.frames.length) {
			if (--particle.gifLoopCount <= defaultLoopCount) return;
			frameIndex = firstIndex;
			offscreenContext.clearRect(originPoint.x, originPoint.y, offscreenCanvas.width, offscreenCanvas.height);
		}
		particle.gifFrame = frameIndex;
	}
	context.scale(image.gifData.width / radius, image.gifData.height / radius);
}
async function loadGifImage(image, canvasSettings) {
	if (image.type !== "gif") {
		await loadImage(image);
		return;
	}
	image.loading = true;
	try {
		image.gifData = await decodeGIF(image.source, canvasSettings);
		image.gifLoopCount = getGIFLoopAmount(image.gifData);
		if (!image.gifLoopCount) image.gifLoopCount = Infinity;
	} catch {
		image.error = true;
	}
	image.loading = false;
}
//#endregion
//#region node_modules/@tsparticles/shape-image/browser/ImageDrawer.js
var sides$3 = 12;
var ImageDrawer = class {
	#container;
	#engine;
	constructor(engine, container) {
		this.#engine = engine;
		this.#container = container;
	}
	draw(data) {
		const { context, radius, particle, opacity } = data, image = particle.image, element = image?.element;
		if (!image) return;
		context.globalAlpha = opacity;
		if (image.gif && image.gifData) drawGif(data, this.#container.canvas.render.settings);
		else if (element) {
			const ratio = image.ratio, pos = {
				x: -radius,
				y: -radius
			}, diameter = radius * 2;
			context.drawImage(element, pos.x, pos.y, diameter, diameter / ratio);
		}
		context.globalAlpha = 1;
	}
	getSidesCount() {
		return sides$3;
	}
	async init(container) {
		const options = container.actualOptions;
		if (!options.preload || !this.#engine.loadImage) return;
		const promises = [];
		for (const imageData of options.preload) promises.push(this.#engine.loadImage(container, imageData));
		await Promise.all(promises);
	}
	loadShape(particle) {
		const container = this.#container;
		if (!particle.shape || !shapeTypes.includes(particle.shape)) return;
		const imageData = particle.shapeData;
		if (!imageData) return;
		if ((this.#engine.getImages?.(container))?.find((t) => t.name === imageData.name || t.source === imageData.src)) return;
		this.#loadImageShape(container, imageData).then(() => {
			this.loadShape(particle);
		});
	}
	particleInit(container, particle) {
		if (particle.shape !== "image" && particle.shape !== "images") return;
		const images = this.#engine.getImages?.(container), imageData = particle.shapeData;
		if (!imageData) return;
		const color = particle.getFillColor(), image = images?.find((t) => t.name === imageData.name || t.source === imageData.src);
		if (!image) return;
		const replaceColor = imageData.replaceColor;
		if (image.loading) {
			setTimeout(() => {
				this.particleInit(container, particle);
			});
			return;
		}
		(async () => {
			let imageRes;
			if (image.svgData && color) imageRes = await replaceImageColor(image, imageData, color, particle, container.hdr);
			else imageRes = {
				color,
				data: image,
				element: image.element,
				gif: image.gif,
				gifData: image.gifData,
				gifLoopCount: image.gifLoopCount,
				loaded: true,
				ratio: imageData.width && imageData.height ? imageData.width / imageData.height : image.ratio ?? 1,
				replaceColor,
				source: imageData.src
			};
			if (!imageRes.ratio) imageRes.ratio = 1;
			const close = imageData.close ?? particle.shapeClose, imageShape = {
				image: imageRes,
				close
			};
			particle.image = imageShape.image;
			particle.shapeClose = imageShape.close;
		})();
	}
	#loadImageShape = async (container, imageShape) => {
		if (!this.#engine.loadImage) throw new Error(`Image shape not initialized`);
		await this.#engine.loadImage(container, {
			gif: imageShape.gif,
			name: imageShape.name,
			replaceColor: imageShape.replaceColor,
			src: imageShape.src
		});
	};
};
//#endregion
//#region node_modules/@tsparticles/shape-image/browser/Options/Classes/Preload.js
var Preload = class {
	gif;
	height;
	name;
	replaceColor;
	src;
	width;
	constructor() {
		this.src = "";
		this.gif = false;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.gif !== void 0) this.gif = data.gif;
		if (data.height !== void 0) this.height = data.height;
		if (data.name !== void 0) this.name = data.name;
		if (data.replaceColor !== void 0) this.replaceColor = data.replaceColor;
		if (data.src !== void 0) this.src = data.src;
		if (data.width !== void 0) this.width = data.width;
	}
};
//#endregion
//#region node_modules/@tsparticles/shape-image/browser/ImagePreloader.js
var ImagePreloaderPlugin = class {
	id = "image-preloader";
	#engine;
	constructor(engine) {
		this.#engine = engine;
	}
	async getPlugin(container) {
		const { ImagePreloaderInstance } = await import("./ImagePreloaderInstance-Bkwxayr5.js");
		return new ImagePreloaderInstance(this.#engine, container);
	}
	loadOptions(_container, options, source) {
		if (!source?.preload) return;
		options.preload ??= [];
		const preloadOptions = options.preload;
		for (const item of source.preload) {
			const existing = preloadOptions.find((t) => t.name === item.name || t.src === item.src);
			if (existing) existing.load(item);
			else {
				const preload = new Preload();
				preload.load(item);
				preloadOptions.push(preload);
			}
		}
	}
	needsPlugin() {
		return true;
	}
};
//#endregion
//#region node_modules/@tsparticles/shape-image/browser/index.js
var extLength = 3;
function addLoadImageToEngine(engine) {
	engine.getImages ??= (container) => {
		engine.images ??= /* @__PURE__ */ new Map();
		let images = engine.images.get(container);
		if (!images) {
			images = [];
			engine.images.set(container, images);
		}
		return images;
	};
	engine.loadImage ??= async (container, data) => {
		if (!engine.getImages) throw new Error("No images collection found");
		if (!data.name && !data.src) throw new Error("No image source provided");
		engine.images ??= /* @__PURE__ */ new Map();
		const containerImages = engine.getImages(container);
		if (containerImages.some((t) => t.name === data.name || t.source === data.src)) return;
		try {
			const image = {
				gif: data.gif,
				name: data.name ?? data.src,
				source: data.src,
				type: data.src.substring(data.src.length - extLength),
				error: false,
				loading: true,
				replaceColor: data.replaceColor,
				ratio: data.width && data.height ? data.width / data.height : void 0
			};
			containerImages.push(image);
			engine.images.set(container, containerImages);
			let imageFunc;
			if (data.gif) imageFunc = (img) => loadGifImage(img, { colorSpace: "srgb" });
			else if (data.replaceColor) imageFunc = downloadSvgImage;
			else imageFunc = loadImage;
			await imageFunc(image);
		} catch {
			throw new Error(`${data.name ?? data.src} not found`);
		}
	};
}
async function loadImageShape(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		addLoadImageToEngine(e);
		e.pluginManager.addPlugin(new ImagePreloaderPlugin(e));
		e.pluginManager.addShape(shapeTypes, (container) => Promise.resolve(new ImageDrawer(e, container)));
	});
}
//#endregion
//#region node_modules/@tsparticles/updater-life/browser/Options/Classes/LifeDelay.js
var LifeDelay = class extends ValueWithRandom {
	sync;
	constructor() {
		super();
		this.sync = false;
	}
	load(data) {
		if (isNull(data)) return;
		super.load(data);
		if (data.sync !== void 0) this.sync = data.sync;
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-life/browser/Options/Classes/LifeDuration.js
var LifeDuration = class extends ValueWithRandom {
	sync;
	constructor() {
		super();
		this.sync = false;
	}
	load(data) {
		if (isNull(data)) return;
		super.load(data);
		if (data.sync !== void 0) this.sync = data.sync;
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-life/browser/Options/Classes/Life.js
var Life = class {
	count;
	delay;
	duration;
	constructor() {
		this.count = 0;
		this.delay = new LifeDelay();
		this.duration = new LifeDuration();
	}
	load(data) {
		if (isNull(data)) return;
		if (data.count !== void 0) this.count = data.count;
		this.delay.load(data.delay);
		this.duration.load(data.duration);
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-life/browser/Utils.js
var noTime$1 = 0, infiniteValue$1 = -1, noLife = 0, minCanvasSize = 0;
function updateLife(particle, delta, canvasSize) {
	if (!particle.life) return;
	const life = particle.life;
	let justSpawned = false;
	if (particle.spawning) {
		life.delayTime += delta.value;
		if (life.delayTime >= particle.life.delay) {
			justSpawned = true;
			particle.spawning = false;
			life.delayTime = noTime$1;
			life.time = noTime$1;
		} else return;
	}
	if (life.duration === infiniteValue$1) return;
	if (justSpawned) life.time = noTime$1;
	else life.time += delta.value;
	if (life.time < life.duration) return;
	life.time = noTime$1;
	if (particle.life.count > noLife) particle.life.count--;
	if (particle.life.count === noLife) {
		particle.destroy();
		return;
	}
	const widthRange = setRangeValue(minCanvasSize, canvasSize.width), heightRange = setRangeValue(minCanvasSize, canvasSize.width);
	particle.position.x = randomInRangeValue(widthRange);
	particle.position.y = randomInRangeValue(heightRange);
	particle.spawning = true;
	life.delayTime = noTime$1;
	life.time = noTime$1;
	particle.reset();
	const lifeOptions = particle.options.life;
	if (lifeOptions) {
		life.delay = getRangeValue(lifeOptions.delay.value) * millisecondsToSeconds;
		life.duration = getRangeValue(lifeOptions.duration.value) * millisecondsToSeconds;
	}
}
//#endregion
//#region node_modules/@tsparticles/updater-life/browser/LifeUpdater.js
var noTime = 0, identity$1 = 1, infiniteValue = -1;
var LifeUpdater = class {
	#container;
	constructor(container) {
		this.#container = container;
	}
	init(particle) {
		const container = this.#container, lifeOptions = particle.options.life;
		if (!lifeOptions) return;
		const delayFactor = lifeOptions.delay.sync ? identity$1 : getRandom(), durationFactor = lifeOptions.duration.sync ? identity$1 : getRandom();
		particle.life = {
			delay: container.retina.reduceFactor ? getRangeValue(lifeOptions.delay.value) * delayFactor / container.retina.reduceFactor * millisecondsToSeconds : noTime,
			delayTime: noTime,
			duration: container.retina.reduceFactor ? getRangeValue(lifeOptions.duration.value) * durationFactor / container.retina.reduceFactor * millisecondsToSeconds : noTime,
			time: noTime,
			count: lifeOptions.count
		};
		if (particle.life.duration <= noTime) particle.life.duration = infiniteValue;
		if (particle.life.count <= noTime) particle.life.count = infiniteValue;
		particle.spawning = particle.life.delay > noTime;
	}
	isEnabled(particle) {
		return !particle.destroyed;
	}
	loadOptions(options, ...sources) {
		options.life ??= new Life();
		for (const source of sources) options.life.load(source?.life);
	}
	update(particle, delta) {
		if (!this.isEnabled(particle) || !particle.life) return;
		updateLife(particle, delta, this.#container.canvas.size);
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-life/browser/index.js
async function loadLifeUpdater(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addParticleUpdater("life", (container) => {
			return Promise.resolve(new LifeUpdater(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/shape-line/browser/Utils.js
function drawLine(data) {
	const { context, particle, radius } = data, shapeData = particle.shapeData, centerY = 0;
	context.moveTo(-radius, centerY);
	context.lineTo(radius, centerY);
	context.lineCap = shapeData?.cap ?? "butt";
}
//#endregion
//#region node_modules/@tsparticles/shape-line/browser/LineDrawer.js
var sides$2 = 1;
var LineDrawer = class {
	draw(data) {
		drawLine(data);
	}
	getSidesCount() {
		return sides$2;
	}
};
//#endregion
//#region node_modules/@tsparticles/shape-line/browser/index.js
async function loadLineShape(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addShape(["line"], () => Promise.resolve(new LineDrawer()));
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-particles-attract/browser/Options/Classes/Attract.js
var Attract = class {
	distance;
	enable;
	rotate;
	constructor() {
		this.distance = 200;
		this.enable = false;
		this.rotate = {
			x: 3e3,
			y: 3e3
		};
	}
	load(data) {
		if (isNull(data)) return;
		if (data.distance !== void 0) this.distance = setRangeValue(data.distance);
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.rotate) {
			const rotateX = data.rotate.x;
			if (rotateX !== void 0) this.rotate.x = rotateX;
			const rotateY = data.rotate.y;
			if (rotateY !== void 0) this.rotate.y = rotateY;
		}
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-particles-attract/browser/Attractor.js
var attractFactor = 1e3, identity = 1;
var Attractor = class extends ParticlesInteractorBase {
	#maxDistance;
	constructor(container) {
		super(container);
		this.#maxDistance = 0;
	}
	get maxDistance() {
		return this.#maxDistance;
	}
	clear() {}
	init() {}
	interact(p1) {
		if (!p1.options.attract?.enable) return;
		const container = this.container;
		if (isNull(p1.attractDistance)) {
			const attractDistance = getRangeValue(p1.options.attract.distance);
			if (attractDistance > this.#maxDistance) this.#maxDistance = attractDistance;
			p1.attractDistance = attractDistance * container.retina.pixelRatio;
		}
		const distance = p1.attractDistance, pos1 = p1.getPosition(), query = container.particles.grid.queryCircle(pos1, distance);
		for (const p2 of query) {
			if (p1 === p2 || !p2.options.attract?.enable || p2.destroyed || p2.spawning) continue;
			const { dx, dy } = getDistances(pos1, p2.getPosition()), rotate = p1.options.attract.rotate, ax = dx / (rotate.x * attractFactor), ay = dy / (rotate.y * attractFactor), p1Factor = p2.size.value / p1.size.value, p2Factor = identity / p1Factor;
			p1.velocity.x -= ax * p1Factor;
			p1.velocity.y -= ay * p1Factor;
			p2.velocity.x += ax * p2Factor;
			p2.velocity.y += ay * p2Factor;
		}
	}
	isEnabled(particle) {
		return particle.options.attract?.enable ?? false;
	}
	loadParticlesOptions(options, ...sources) {
		options.attract ??= new Attract();
		for (const source of sources) options.attract.load(source?.attract);
	}
	reset() {}
};
//#endregion
//#region node_modules/@tsparticles/interaction-particles-attract/browser/index.js
async function loadParticlesAttractInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		ensureInteractivityPluginLoaded(e);
		e.pluginManager.addInteractor?.("particlesAttract", (container) => {
			return Promise.resolve(new Attractor(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-particles-collisions/browser/CollisionMode.js
var CollisionMode;
(function(CollisionMode) {
	CollisionMode["absorb"] = "absorb";
	CollisionMode["bounce"] = "bounce";
	CollisionMode["destroy"] = "destroy";
})(CollisionMode || (CollisionMode = {}));
//#endregion
//#region node_modules/@tsparticles/interaction-particles-collisions/browser/Options/Classes/CollisionsAbsorb.js
var CollisionsAbsorb = class {
	speed;
	constructor() {
		this.speed = 2;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.speed !== void 0) this.speed = data.speed;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-particles-collisions/browser/Options/Classes/CollisionsOverlap.js
var CollisionsOverlap = class {
	enable;
	retries;
	constructor() {
		this.enable = true;
		this.retries = 0;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.retries !== void 0) this.retries = data.retries;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-particles-collisions/browser/Options/Classes/Collisions.js
var Collisions = class {
	absorb;
	bounce;
	enable;
	maxSpeed;
	mode;
	overlap;
	constructor() {
		this.absorb = new CollisionsAbsorb();
		this.bounce = new ParticlesBounce();
		this.enable = false;
		this.maxSpeed = 50;
		this.mode = CollisionMode.bounce;
		this.overlap = new CollisionsOverlap();
	}
	load(data) {
		if (isNull(data)) return;
		this.absorb.load(data.absorb);
		this.bounce.load(data.bounce);
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.maxSpeed !== void 0) this.maxSpeed = setRangeValue(data.maxSpeed);
		if (data.mode !== void 0) this.mode = data.mode;
		this.overlap.load(data.overlap);
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-particles-collisions/browser/Absorb.js
var minAbsorbAmount = 0;
function updateAbsorb(p1, r1, p2, r2, delta, pixelRatio) {
	if (!p1.options.collisions || !p2.options.collisions) return;
	const absorbSpeed = p1.options.collisions.absorb.speed, shrinkAmount = clamp(absorbSpeed * delta.factor, minAbsorbAmount, r2);
	p1.size.value = Math.sqrt(r1 * r1 + shrinkAmount * shrinkAmount);
	p2.size.value -= shrinkAmount;
	if (p2.size.value <= pixelRatio) {
		p2.size.value = 0;
		p2.destroy();
	}
}
function absorb(p1, p2, delta, pixelRatio) {
	const r1 = p1.getRadius(), r2 = p2.getRadius();
	if (!r1 && r2) p1.destroy();
	else if (r1 && !r2) p2.destroy();
	else if (r1 && r2) if (r1 >= r2) updateAbsorb(p1, r1, p2, r2, delta, pixelRatio);
	else updateAbsorb(p2, r2, p1, r1, delta, pixelRatio);
}
//#endregion
//#region node_modules/@tsparticles/interaction-particles-collisions/browser/Bounce.js
var energyCorrectionMinRatio = 1e-6, energyDriftThreshold = 1e-4, correctionFactorNeutral = 1, fixBounceSpeed = (p) => {
	if (!p.options.collisions) return;
	p.collisionMaxSpeed ??= getRangeValue(p.options.collisions.maxSpeed);
	if (p.velocity.length > p.collisionMaxSpeed) p.velocity.length = p.collisionMaxSpeed;
};
function bounce(p1, p2) {
	const m1 = p1.getMass(), m2 = p2.getMass(), speed1Before = p1.velocity.length, speed2Before = p2.velocity.length, keBefore = m1 * speed1Before * speed1Before + m2 * speed2Before * speed2Before;
	circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));
	const speed1After = p1.velocity.length, speed2After = p2.velocity.length, keAfter = m1 * speed1After * speed1After + m2 * speed2After * speed2After;
	if (keAfter > keBefore * energyCorrectionMinRatio) {
		const correctionFactor = Math.sqrt(keBefore / keAfter);
		if (Math.abs(correctionFactor - correctionFactorNeutral) > energyDriftThreshold) {
			p1.velocity.length = speed1After * correctionFactor;
			p2.velocity.length = speed2After * correctionFactor;
		}
	}
	fixBounceSpeed(p1);
	fixBounceSpeed(p2);
}
//#endregion
//#region node_modules/@tsparticles/interaction-particles-collisions/browser/Destroy.js
function destroy(p1, p2) {
	if (!p1.unbreakable && !p2.unbreakable) bounce(p1, p2);
	const p1Radius = p1.getRadius(), p2Radius = p2.getRadius();
	if (!p1Radius && p2Radius) p1.destroy();
	else if (p1Radius && !p2Radius) p2.destroy();
	else if (p1Radius && p2Radius) (p1.getRadius() >= p2.getRadius() ? p2 : p1).destroy();
}
//#endregion
//#region node_modules/@tsparticles/interaction-particles-collisions/browser/ResolveCollision.js
function resolveCollision(p1, p2, delta, pixelRatio) {
	if (!p1.options.collisions || !p2.options.collisions) return;
	switch (p1.options.collisions.mode) {
		case CollisionMode.absorb:
			absorb(p1, p2, delta, pixelRatio);
			break;
		case CollisionMode.bounce:
			bounce(p1, p2);
			break;
		case CollisionMode.destroy:
			destroy(p1, p2);
			break;
		default: break;
	}
}
//#endregion
//#region node_modules/@tsparticles/interaction-particles-collisions/browser/Collider.js
var Collider = class extends ParticlesInteractorBase {
	maxDistance;
	constructor(container) {
		super(container);
		this.maxDistance = 0;
	}
	clear() {}
	init() {}
	interact(p1, _interactivityData, delta) {
		if (p1.destroyed || p1.spawning) return;
		const container = this.container, pos1 = p1.getPosition(), radius1 = p1.getRadius(), query = container.particles.grid.queryCircle(pos1, radius1 * 2);
		for (const p2 of query) {
			if (p1 === p2 || p1.id >= p2.id || !p1.options.collisions?.enable || !p2.options.collisions?.enable || p1.options.collisions.mode !== p2.options.collisions.mode || p2.destroyed || p2.spawning) continue;
			const pos2 = p2.getPosition(), radius2 = p2.getRadius();
			if (Math.abs(Math.round(pos1.z) - Math.round(pos2.z)) > radius1 + radius2) continue;
			if (getDistance(pos1, pos2) > radius1 + radius2) continue;
			resolveCollision(p1, p2, delta, container.retina.pixelRatio);
		}
	}
	isEnabled(particle) {
		return !!particle.options.collisions?.enable;
	}
	loadParticlesOptions(options, ...sources) {
		options.collisions ??= new Collisions();
		for (const source of sources) options.collisions.load(source?.collisions);
	}
	reset() {}
};
//#endregion
//#region node_modules/@tsparticles/interaction-particles-collisions/browser/OverlapPlugin.js
var OverlapPlugin = class {
	id = "overlap";
	async getPlugin(container) {
		const { OverlapPluginInstance } = await import("./OverlapPluginInstance-CtmSWvB1.js");
		return new OverlapPluginInstance(container);
	}
	loadOptions() {}
	needsPlugin() {
		return true;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-particles-collisions/browser/index.js
async function loadParticlesCollisionsInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		ensureInteractivityPluginLoaded(e);
		e.pluginManager.addPlugin(new OverlapPlugin());
		e.pluginManager.addInteractor?.("particlesCollisions", (container) => {
			return Promise.resolve(new Collider(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/interaction-particles-links/browser/CircleWarp.js
var CircleWarp = class extends Circle {
	#canvasSize;
	constructor(x, y, radius, canvasSize) {
		super(x, y, radius);
		this.#canvasSize = canvasSize;
	}
	contains(point) {
		if (super.contains(point)) return true;
		const { width, height } = this.#canvasSize, { x, y } = point;
		return super.contains({
			x: x - width,
			y
		}) || super.contains({
			x: x + width,
			y
		}) || super.contains({
			x,
			y: y - height
		}) || super.contains({
			x,
			y: y + height
		}) || super.contains({
			x: x - width,
			y: y - height
		}) || super.contains({
			x: x + width,
			y: y + height
		}) || super.contains({
			x: x - width,
			y: y + height
		}) || super.contains({
			x: x + width,
			y: y - height
		});
	}
	intersects(range) {
		if (super.intersects(range)) return true;
		const { width, height } = this.#canvasSize, pos = range.position, shifts = [
			{
				x: -width,
				y: 0
			},
			{
				x: width,
				y: 0
			},
			{
				x: 0,
				y: -height
			},
			{
				x: 0,
				y: height
			},
			{
				x: -width,
				y: -height
			},
			{
				x: width,
				y: height
			},
			{
				x: -width,
				y: height
			},
			{
				x: width,
				y: -height
			}
		];
		for (const shift of shifts) {
			const shiftedPos = {
				x: pos.x + shift.x,
				y: pos.y + shift.y
			};
			let shiftedRange;
			if (range instanceof Circle) shiftedRange = new Circle(shiftedPos.x, shiftedPos.y, range.radius);
			else {
				const rect = range;
				shiftedRange = new Rectangle(shiftedPos.x, shiftedPos.y, rect.size.width, rect.size.height);
			}
			if (super.intersects(shiftedRange)) return true;
		}
		return false;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-particles-links/browser/Options/Classes/LinksShadow.js
var LinksShadow = class {
	blur;
	color;
	enable;
	constructor() {
		this.blur = 5;
		this.color = new OptionsColor();
		this.color.value = "#000";
		this.enable = false;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.blur !== void 0) this.blur = data.blur;
		this.color = OptionsColor.create(this.color, data.color);
		if (data.enable !== void 0) this.enable = data.enable;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-particles-links/browser/Options/Classes/LinksTriangle.js
var LinksTriangle = class {
	color;
	enable;
	frequency;
	opacity;
	constructor() {
		this.enable = false;
		this.frequency = 1;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.color !== void 0) this.color = OptionsColor.create(this.color, data.color);
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.frequency !== void 0) this.frequency = data.frequency;
		if (data.opacity !== void 0) this.opacity = data.opacity;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-particles-links/browser/Options/Classes/Links.js
var Links = class {
	blink;
	color;
	consent;
	distance;
	enable;
	frequency;
	id;
	opacity;
	shadow;
	triangles;
	warp;
	width;
	constructor() {
		this.blink = false;
		this.color = new OptionsColor();
		this.color.value = "#fff";
		this.consent = false;
		this.distance = 100;
		this.enable = false;
		this.frequency = 1;
		this.opacity = 1;
		this.shadow = new LinksShadow();
		this.triangles = new LinksTriangle();
		this.width = 1;
		this.warp = false;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.id !== void 0) this.id = data.id;
		if (data.blink !== void 0) this.blink = data.blink;
		this.color = OptionsColor.create(this.color, data.color);
		if (data.consent !== void 0) this.consent = data.consent;
		if (data.distance !== void 0) this.distance = data.distance;
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.frequency !== void 0) this.frequency = data.frequency;
		if (data.opacity !== void 0) this.opacity = data.opacity;
		this.shadow.load(data.shadow);
		this.triangles.load(data.triangles);
		if (data.width !== void 0) this.width = data.width;
		if (data.warp !== void 0) this.warp = data.warp;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-particles-links/browser/Linker.js
var opacityOffset = 1, minDistance = 0;
function getWarpDistance(pos1, pos2, canvasSize) {
	const { dx, dy } = getDistances(pos1, pos2), absDiffs = {
		x: Math.abs(dx),
		y: Math.abs(dy)
	}, warpDistances = {
		x: Math.min(absDiffs.x, canvasSize.width - absDiffs.x),
		y: Math.min(absDiffs.y, canvasSize.height - absDiffs.y)
	};
	return Math.hypot(warpDistances.x, warpDistances.y);
}
var Linker = class extends ParticlesInteractorBase {
	#maxDistance;
	#pluginManager;
	constructor(pluginManager, container) {
		super(container);
		this.#pluginManager = pluginManager;
		this.#maxDistance = 0;
	}
	get maxDistance() {
		return this.#maxDistance;
	}
	clear() {}
	init() {
		this.container.particles.linksColor = void 0;
		this.container.particles.linksColors = /* @__PURE__ */ new Map();
	}
	interact(p1) {
		if (!p1.options.links) return;
		p1.links = [];
		if (p1.linksDistance && p1.linksDistance > this.#maxDistance) this.#maxDistance = p1.linksDistance;
		const pos1 = p1.getPosition(), container = this.container, canvasSize = container.canvas.size;
		if (pos1.x < originPoint.x || pos1.y < originPoint.y || pos1.x > canvasSize.width || pos1.y > canvasSize.height) return;
		const linkOpt1 = p1.options.links, optOpacity = linkOpt1.opacity, optDistance = p1.retina.linksDistance ?? minDistance, warp = linkOpt1.warp, range = warp ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize) : new Circle(pos1.x, pos1.y, optDistance), query = container.particles.grid.query(range);
		for (const p2 of query) {
			const linkOpt2 = p2.options.links;
			if (p1 === p2 || !linkOpt2?.enable || linkOpt1.id !== linkOpt2.id || p2.spawning || p2.destroyed || !p2.links || p1.links.some((t) => t.destination === p2) || p2.links.some((t) => t.destination === p1)) continue;
			const pos2 = p2.getPosition();
			if (pos2.x < originPoint.x || pos2.y < originPoint.y || pos2.x > canvasSize.width || pos2.y > canvasSize.height) continue;
			const distDirect = getDistances(pos1, pos2).distance, distWarp = warp && linkOpt2.warp ? getWarpDistance(pos1, pos2, canvasSize) : distDirect, distance = Math.min(distDirect, distWarp);
			if (distance > optDistance) continue;
			const opacityLine = (opacityOffset - distance / optDistance) * optOpacity;
			this.#setColor(p1);
			p1.links.push({
				destination: p2,
				opacity: opacityLine,
				color: this.#getLinkColor(p1, p2),
				isWarped: distWarp < distDirect
			});
		}
	}
	isEnabled(particle) {
		return !!particle.options.links?.enable;
	}
	loadParticlesOptions(options, ...sources) {
		options.links ??= new Links();
		for (const source of sources) options.links.load(source?.links);
	}
	reset() {}
	#getLinkColor(p1, p2) {
		const container = this.container, linksOptions = p1.options.links;
		if (!linksOptions) return;
		return getLinkColor(p1, p2, linksOptions.id !== void 0 ? container.particles.linksColors.get(linksOptions.id) : container.particles.linksColor);
	}
	#setColor(p1) {
		if (!p1.options.links) return;
		const container = this.container, linksOptions = p1.options.links;
		let linkColor = linksOptions.id === void 0 ? container.particles.linksColor : container.particles.linksColors.get(linksOptions.id);
		if (linkColor) return;
		linkColor = getLinkRandomColor(this.#pluginManager, linksOptions.color, linksOptions.blink, linksOptions.consent);
		if (linksOptions.id === void 0) container.particles.linksColor = linkColor;
		else container.particles.linksColors.set(linksOptions.id, linkColor);
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-particles-links/browser/LinksPlugin.js
var LinksPlugin = class {
	id = "links";
	#pluginManager;
	constructor(pluginManager) {
		this.#pluginManager = pluginManager;
	}
	async getPlugin(container) {
		const { LinkInstance } = await import("./LinkInstance-DBP-A9la.js");
		return new LinkInstance(this.#pluginManager, container);
	}
	loadOptions() {}
	needsPlugin() {
		return true;
	}
};
//#endregion
//#region node_modules/@tsparticles/interaction-particles-links/browser/index.js
async function loadParticlesLinksInteraction(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		const pluginManager = e.pluginManager;
		ensureInteractivityPluginLoaded(e);
		pluginManager.addPlugin(new LinksPlugin(pluginManager));
		pluginManager.addInteractor?.("particlesLinks", (container) => {
			return Promise.resolve(new Linker(pluginManager, container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/shape-polygon/browser/Utils.js
var polygonCache = /* @__PURE__ */ new Map(), noOffset = 0;
function getUnitPolygon(sides) {
	const cached = polygonCache.get(sides);
	if (cached) return cached;
	const step = doublePI / sides, isOdd = !!(sides % 2), baseAngle = (-Math.PI + (isOdd ? noOffset : step)) * half$1, verts = [];
	for (let i = 0; i < sides; i++) {
		const angle = baseAngle + i * step;
		verts[i] = {
			x: Math.cos(angle),
			y: Math.sin(angle)
		};
	}
	polygonCache.set(sides, verts);
	return verts;
}
function drawPolygon(data, side) {
	const { context, radius } = data, verts = getUnitPolygon(side.count.numerator / side.count.denominator);
	context.beginPath();
	for (let i = 0; i < verts.length; i++) {
		const vert = verts[i];
		if (!vert) continue;
		const x = vert.x * radius, y = vert.y * radius;
		if (i) context.lineTo(x, y);
		else context.moveTo(x, y);
	}
	context.closePath();
}
//#endregion
//#region node_modules/@tsparticles/shape-polygon/browser/PolygonDrawerBase.js
var defaultSides$1 = 5;
var PolygonDrawerBase = class {
	draw(data) {
		const { particle, radius } = data;
		drawPolygon(data, this.getSidesData(particle, radius));
	}
	getSidesCount(particle) {
		const polygon = particle.shapeData;
		return Math.round(getRangeValue(polygon?.sides ?? defaultSides$1));
	}
};
//#endregion
//#region node_modules/@tsparticles/shape-polygon/browser/PolygonDrawer.js
var yFactor$1 = 2.66, sidesFactor$1 = 3;
var PolygonDrawer = class extends PolygonDrawerBase {
	getSidesData(particle, radius) {
		const { sides } = particle;
		return {
			count: {
				denominator: 1,
				numerator: sides
			},
			length: radius * yFactor$1 / (sides / sidesFactor$1)
		};
	}
};
//#endregion
//#region node_modules/@tsparticles/shape-polygon/browser/TriangleDrawer.js
var sides$1 = 3, yFactor = 2.66, sidesFactor = 3;
var TriangleDrawer = class extends PolygonDrawerBase {
	getSidesCount() {
		return sides$1;
	}
	getSidesData(_particle, radius) {
		return {
			count: {
				denominator: 1,
				numerator: sides$1
			},
			length: radius * yFactor / (sides$1 / sidesFactor)
		};
	}
};
//#endregion
//#region node_modules/@tsparticles/shape-polygon/browser/index.js
async function loadGenericPolygonShape(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addShape(["polygon"], () => Promise.resolve(new PolygonDrawer()));
	});
}
async function loadTriangleShape(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addShape(["triangle"], () => Promise.resolve(new TriangleDrawer()));
	});
}
async function loadPolygonShape(engine) {
	engine.checkVersion("4.1.3");
	await Promise.all([loadGenericPolygonShape(engine), loadTriangleShape(engine)]);
}
//#endregion
//#region node_modules/@tsparticles/updater-rotate/browser/Options/Classes/RotateAnimation.js
var RotateAnimation = class {
	decay;
	enable;
	speed;
	sync;
	constructor() {
		this.enable = false;
		this.speed = 0;
		this.decay = 0;
		this.sync = false;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.speed !== void 0) this.speed = setRangeValue(data.speed);
		if (data.decay !== void 0) this.decay = setRangeValue(data.decay);
		if (data.sync !== void 0) this.sync = data.sync;
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-rotate/browser/Options/Classes/Rotate.js
var Rotate = class extends ValueWithRandom {
	animation;
	direction;
	path;
	constructor() {
		super();
		this.animation = new RotateAnimation();
		this.direction = RotateDirection.clockwise;
		this.path = false;
		this.value = 0;
	}
	load(data) {
		if (isNull(data)) return;
		super.load(data);
		if (data.direction !== void 0) this.direction = data.direction;
		this.animation.load(data.animation);
		if (data.path !== void 0) this.path = data.path;
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-rotate/browser/RotateUpdater.js
var doublePIDeg = 360;
var RotateUpdater = class {
	#container;
	constructor(container) {
		this.#container = container;
	}
	init(particle) {
		const rotateOptions = particle.options.rotate;
		if (!rotateOptions) return;
		particle.rotate = {
			enable: rotateOptions.animation.enable,
			value: degToRad(getRangeValue(rotateOptions.value)),
			min: 0,
			max: doublePI
		};
		particle.pathRotation = rotateOptions.path;
		let rotateDirection = rotateOptions.direction;
		if (rotateDirection === RotateDirection.random) rotateDirection = Math.floor(getRandom() * 2) > 0 ? RotateDirection.counterClockwise : RotateDirection.clockwise;
		switch (rotateDirection) {
			case RotateDirection.counterClockwise:
			case "counterClockwise":
				particle.rotate.status = AnimationStatus.decreasing;
				break;
			case RotateDirection.clockwise:
				particle.rotate.status = AnimationStatus.increasing;
				break;
			default: break;
		}
		const rotateAnimation = rotateOptions.animation;
		if (rotateAnimation.enable) {
			particle.rotate.decay = 1 - getRangeValue(rotateAnimation.decay);
			particle.rotate.velocity = getRangeValue(rotateAnimation.speed) / doublePIDeg * this.#container.retina.reduceFactor;
			if (!rotateAnimation.sync) particle.rotate.velocity *= getRandom();
		}
		particle.rotation = particle.rotate.value;
	}
	isEnabled(particle) {
		const rotate = particle.options.rotate;
		if (!rotate) return false;
		return !particle.destroyed && !particle.spawning && (!!rotate.value || rotate.animation.enable || rotate.path);
	}
	loadOptions(options, ...sources) {
		options.rotate ??= new Rotate();
		for (const source of sources) options.rotate.load(source?.rotate);
	}
	update(particle, delta) {
		if (!this.isEnabled(particle)) return;
		particle.isRotating = !!particle.rotate;
		if (!particle.rotate) return;
		updateAnimation(particle, particle.rotate, false, DestroyType.none, delta);
		particle.rotation = particle.rotate.value;
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-rotate/browser/index.js
async function loadRotateUpdater(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addParticleUpdater("rotate", (container) => {
			return Promise.resolve(new RotateUpdater(container));
		});
	});
}
//#endregion
//#region node_modules/@tsparticles/shape-square/browser/Utils.js
function drawSquare(data) {
	const { context, radius } = data, fixedRadius = radius * Math.SQRT1_2, fixedDiameter = fixedRadius * 2;
	context.rect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter);
}
//#endregion
//#region node_modules/@tsparticles/shape-square/browser/SquareDrawer.js
var sides = 4;
var SquareDrawer = class {
	draw(data) {
		drawSquare(data);
	}
	getSidesCount() {
		return sides;
	}
};
//#endregion
//#region node_modules/@tsparticles/shape-square/browser/index.js
async function loadSquareShape(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addShape(["edge", "square"], () => Promise.resolve(new SquareDrawer()));
	});
}
//#endregion
//#region node_modules/@tsparticles/shape-star/browser/Utils.js
var defaultInset$1 = 2, origin = {
	x: 0,
	y: 0
};
function drawStar(data) {
	const { context, particle, radius } = data, sides = particle.sides, inset = particle.starInset ?? defaultInset$1;
	context.moveTo(origin.x, origin.y - radius);
	for (let i = 0; i < sides; i++) {
		context.rotate(Math.PI / sides);
		context.lineTo(origin.x, origin.y - radius * inset);
		context.rotate(Math.PI / sides);
		context.lineTo(origin.x, origin.y - radius);
	}
}
//#endregion
//#region node_modules/@tsparticles/shape-star/browser/StarDrawer.js
var defaultInset = 2, defaultSides = 5;
var StarDrawer = class {
	draw(data) {
		drawStar(data);
	}
	getSidesCount(particle) {
		const star = particle.shapeData;
		return Math.round(getRangeValue(star?.sides ?? defaultSides));
	}
	particleInit(_container, particle) {
		const star = particle.shapeData;
		particle.starInset = getRangeValue(star?.inset ?? defaultInset);
	}
};
//#endregion
//#region node_modules/@tsparticles/shape-star/browser/index.js
async function loadStarShape(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addShape(["star"], () => Promise.resolve(new StarDrawer()));
	});
}
//#endregion
//#region node_modules/@tsparticles/slim/browser/index.js
async function loadSlim(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register(async (e) => {
		const loadInteractivityForSlim = async (e) => {
			await loadInteractivityPlugin(e);
			await Promise.all([
				loadExternalParallaxInteraction(e),
				loadExternalAttractInteraction(e),
				loadExternalBounceInteraction(e),
				loadExternalBubbleInteraction(e),
				loadExternalConnectInteraction(e),
				loadExternalDestroyInteraction(e),
				loadExternalGrabInteraction(e),
				loadExternalPauseInteraction(e),
				loadExternalPushInteraction(e),
				loadExternalRemoveInteraction(e),
				loadExternalRepulseInteraction(e),
				loadExternalSlowInteraction(e),
				loadParticlesAttractInteraction(e),
				loadParticlesCollisionsInteraction(e),
				loadParticlesLinksInteraction(e)
			]);
		};
		await Promise.all([
			loadBasic(e),
			loadInteractivityForSlim(e),
			loadEasingQuadPlugin(e),
			loadEmojiShape(e),
			loadImageShape(e),
			loadLineShape(e),
			loadPolygonShape(e),
			loadSquareShape(e),
			loadStarShape(e),
			loadLifeUpdater(e),
			loadPaintUpdater(e),
			loadRotateUpdater(e)
		]);
	});
}
//#endregion
export { loadSlim };

//# sourceMappingURL=@tsparticles_slim.js.map