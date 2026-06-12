//#region node_modules/@tsparticles/engine/browser/Core/Utils/Constants.js
var generatedAttribute = "generated";
var defaultCompositeValue = "source-over";
var resizeEvent = "resize";
var visibilityChangeEvent = "visibilitychange";
var percentDenominator = 100;
var half = .5;
var millisecondsToSeconds = 1e3;
var originPoint = {
	x: 0,
	y: 0,
	z: 0
};
var defaultTransform = {
	a: 1,
	b: 0,
	c: 0,
	d: 1
};
var randomColorValue = "random";
var midColorValue = "mid";
var double = 2;
var doublePI = Math.PI * 2;
var defaultFps = 60;
var defaultAlpha = 1;
var generatedTrue = "true";
var generatedFalse = "false";
var canvasTag = "canvas";
var defaultRetryCount = 0;
var squareExp = 2;
var spatialHashGridCellSize = 100;
var defaultRemoveQuantity = 1;
var defaultRatio = 1;
var defaultReduceFactor = 1;
var inverseFactorNumerator = 1;
var rgbMax = 255;
var hMax = 360;
var sMax = 100;
var lMax = 100;
var hMin = 0;
var sMin = 0;
var hPhase = 60;
var empty = 0;
var quarter = .25;
var threeQuarter = .75;
var minVelocity = 0;
var defaultTransformValue = 1;
var minimumSize = 0;
var zIndexFactorOffset = 1;
var defaultOpacity = 1;
var removeDeleteCount = 1;
var removeMinIndex = 0;
var defaultFpsLimit = 120;
var minFpsLimit = 0;
var canvasFirstIndex = 0;
var loadRandomFactor = 1e4;
var loadMinIndex = 0;
var one = 1;
var none = 0;
var decayOffset = 1;
var tryCountIncrement = 1;
var minZ = 0;
var minLimit = 0;
var countOffset = 1;
var minCount = 0;
var minIndex = 0;
var lengthOffset = 1;
var defaultDensityFactor = 1;
var deleteCount = 1;
var defaultAngle = 0;
var identity = 1;
var minStrokeWidth = 0;
var lFactor = 1;
var lMin = 0;
var triple = 3;
var sextuple = 6;
var sNormalizedOffset = 1;
var phaseNumerator = 1;
var defaultRgbMin = 0;
var defaultVelocity = 0;
var defaultLoops = 0;
var defaultTime = 0;
var defaultZoom = 1;
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/Directions/MoveDirection.js
var MoveDirection;
(function(MoveDirection) {
	MoveDirection["bottom"] = "bottom";
	MoveDirection["bottomLeft"] = "bottom-left";
	MoveDirection["bottomRight"] = "bottom-right";
	MoveDirection["left"] = "left";
	MoveDirection["none"] = "none";
	MoveDirection["right"] = "right";
	MoveDirection["top"] = "top";
	MoveDirection["topLeft"] = "top-left";
	MoveDirection["topRight"] = "top-right";
	MoveDirection["outside"] = "outside";
	MoveDirection["inside"] = "inside";
})(MoveDirection || (MoveDirection = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Core/Utils/Vectors.js
function getZ(source) {
	return "z" in source ? source.z : originPoint.z;
}
var Vector3d = class Vector3d {
	x;
	y;
	z;
	constructor(x = originPoint.x, y = originPoint.y, z = originPoint.z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	static get origin() {
		return Vector3d.create(originPoint.x, originPoint.y, originPoint.z);
	}
	get angle() {
		return Math.atan2(this.y, this.x);
	}
	set angle(angle) {
		this.#updateFromAngle(angle, this.length);
	}
	get length() {
		return Math.sqrt(this.getLengthSq());
	}
	set length(length) {
		this.#updateFromAngle(this.angle, length);
	}
	static clone(source) {
		return Vector3d.create(source.x, source.y, getZ(source));
	}
	static create(x, y, z) {
		if (typeof x === "number") return new Vector3d(x, y ?? originPoint.y, z ?? originPoint.z);
		return new Vector3d(x.x, x.y, getZ(x));
	}
	add(v) {
		return Vector3d.create(this.x + v.x, this.y + v.y, this.z + getZ(v));
	}
	addTo(v) {
		this.x += v.x;
		this.y += v.y;
		this.z += getZ(v);
	}
	copy() {
		return Vector3d.clone(this);
	}
	div(n) {
		return Vector3d.create(this.x / n, this.y / n, this.z / n);
	}
	divTo(n) {
		this.x /= n;
		this.y /= n;
		this.z /= n;
	}
	getLengthSq() {
		return this.x ** 2 + this.y ** 2;
	}
	mult(n) {
		return Vector3d.create(this.x * n, this.y * n, this.z * n);
	}
	multTo(n) {
		this.x *= n;
		this.y *= n;
		this.z *= n;
	}
	normalize() {
		const length = this.length;
		if (length != 0) this.multTo(1 / length);
	}
	rotate(angle) {
		return Vector3d.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle), originPoint.z);
	}
	setTo(c) {
		this.x = c.x;
		this.y = c.y;
		this.z = getZ(c);
	}
	sub(v) {
		return Vector3d.create(this.x - v.x, this.y - v.y, this.z - getZ(v));
	}
	subFrom(v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= getZ(v);
	}
	#updateFromAngle(angle, length) {
		this.x = Math.cos(angle) * length;
		this.y = Math.sin(angle) * length;
	}
};
var Vector = class Vector extends Vector3d {
	constructor(x = originPoint.x, y = originPoint.y) {
		super(x, y, originPoint.z);
	}
	static get origin() {
		return Vector.create(originPoint.x, originPoint.y);
	}
	static clone(source) {
		return Vector.create(source.x, source.y);
	}
	static create(x, y) {
		if (typeof x === "number") return new Vector(x, y ?? originPoint.y);
		return new Vector(x.x, x.y);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Utils/TypeUtils.js
function isBoolean(arg) {
	return typeof arg === "boolean";
}
function isString(arg) {
	return typeof arg === "string";
}
function isNumber(arg) {
	return typeof arg === "number";
}
function isFunction(arg) {
	return typeof arg === "function";
}
function isObject(arg) {
	return typeof arg === "object" && arg !== null;
}
function isArray(arg) {
	return Array.isArray(arg);
}
function isNull(arg) {
	return arg === null || arg === void 0;
}
//#endregion
//#region node_modules/@tsparticles/engine/browser/Utils/MathUtils.js
var degToRadFactor = Math.PI / 180;
var _random = Math.random;
var _animationLoop = {
	nextFrame: (cb) => requestAnimationFrame(cb),
	cancel: (idx) => {
		cancelAnimationFrame(idx);
	}
};
function setRandom(rnd = Math.random) {
	_random = rnd;
}
function getRandom() {
	return clamp(_random(), 0, 1 - Number.EPSILON);
}
function getRandomInRange(min, max) {
	return getRandom() * (max - min) + min;
}
function setAnimationFunctions(nextFrame, cancel) {
	_animationLoop.nextFrame = nextFrame;
	_animationLoop.cancel = cancel;
}
function animate(fn) {
	return _animationLoop.nextFrame(fn);
}
function cancelAnimation(handle) {
	_animationLoop.cancel(handle);
}
function clamp(num, min, max) {
	return Math.min(Math.max(num, min), max);
}
function mix(comp1, comp2, weight1, weight2) {
	return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
function randomInRangeValue(r) {
	const max = getRangeMax(r), minOffset = 0;
	let min = getRangeMin(r);
	if (max === min) min = minOffset;
	return getRandomInRange(min, max);
}
function getRangeValue(value) {
	return isNumber(value) ? value : randomInRangeValue(value);
}
function getRangeMin(value) {
	return isNumber(value) ? value : value.min;
}
function getRangeMax(value) {
	return isNumber(value) ? value : value.max;
}
function setRangeValue(source, value) {
	if (source === value || value === void 0 && isNumber(source)) return source;
	const min = getRangeMin(source), max = getRangeMax(source);
	return value !== void 0 ? {
		min: Math.min(min, value),
		max: Math.max(max, value)
	} : setRangeValue(min, max);
}
function getDistances(pointA, pointB) {
	const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y;
	return {
		dx,
		dy,
		distance: Math.hypot(dx, dy)
	};
}
function getDistanceSq(pointA, pointB) {
	const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y;
	return dx * dx + dy * dy;
}
function getDistance(pointA, pointB) {
	return Math.sqrt(getDistanceSq(pointA, pointB));
}
function checkDistance(pointA, pointB, distance) {
	return getDistanceSq(pointA, pointB) <= distance * distance;
}
function degToRad(degrees) {
	return degrees * degToRadFactor;
}
function getParticleDirectionAngle(direction, position, center) {
	if (isNumber(direction)) return degToRad(direction);
	switch (direction) {
		case MoveDirection.top: return -Math.PI * half;
		case MoveDirection.topRight: return -Math.PI * quarter;
		case MoveDirection.right: return 0;
		case MoveDirection.bottomRight: return Math.PI * quarter;
		case MoveDirection.bottom: return Math.PI * half;
		case MoveDirection.bottomLeft: return Math.PI * threeQuarter;
		case MoveDirection.left: return Math.PI;
		case MoveDirection.topLeft: return -Math.PI * threeQuarter;
		case MoveDirection.inside: return Math.atan2(center.y - position.y, center.x - position.x);
		case MoveDirection.outside: return Math.atan2(position.y - center.y, position.x - center.x);
		default: return getRandom() * doublePI;
	}
}
function getParticleBaseVelocity(direction) {
	const baseVelocity = Vector.origin;
	baseVelocity.length = 1;
	baseVelocity.angle = direction;
	return baseVelocity;
}
function collisionVelocity(v1, v2, m1, m2) {
	return Vector.create(v1.x * (m1 - m2) / (m1 + m2) + v2.x * 2 * m2 / (m1 + m2), v1.y);
}
function calcPositionFromSize(data) {
	return data.position?.x !== void 0 && data.position.y !== void 0 ? {
		x: data.position.x * data.size.width / 100,
		y: data.position.y * data.size.height / 100
	} : void 0;
}
function calcPositionOrRandomFromSize(data) {
	return {
		x: (data.position?.x ?? getRandom() * 100) * data.size.width / 100,
		y: (data.position?.y ?? getRandom() * 100) * data.size.height / 100
	};
}
function calcPositionOrRandomFromSizeRanged(data) {
	const position = {
		x: data.position?.x !== void 0 ? getRangeValue(data.position.x) : void 0,
		y: data.position?.y !== void 0 ? getRangeValue(data.position.y) : void 0
	};
	return calcPositionOrRandomFromSize({
		size: data.size,
		position
	});
}
function calcExactPositionOrRandomFromSize(data) {
	const { position, size } = data;
	return {
		x: position?.x ?? getRandom() * size.width,
		y: position?.y ?? getRandom() * size.height
	};
}
function calcExactPositionOrRandomFromSizeRanged(data) {
	const position = {
		x: data.position?.x !== void 0 ? getRangeValue(data.position.x) : void 0,
		y: data.position?.y !== void 0 ? getRangeValue(data.position.y) : void 0
	};
	return calcExactPositionOrRandomFromSize({
		size: data.size,
		position
	});
}
function parseAlpha(input) {
	const defaultAlpha = 1;
	if (!input) return defaultAlpha;
	return input.endsWith("%") ? parseFloat(input) / 100 : parseFloat(input);
}
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/Modes/AnimationMode.js
var AnimationMode;
(function(AnimationMode) {
	AnimationMode["auto"] = "auto";
	AnimationMode["increase"] = "increase";
	AnimationMode["decrease"] = "decrease";
	AnimationMode["random"] = "random";
})(AnimationMode || (AnimationMode = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/AnimationStatus.js
var AnimationStatus;
(function(AnimationStatus) {
	AnimationStatus["increasing"] = "increasing";
	AnimationStatus["decreasing"] = "decreasing";
})(AnimationStatus || (AnimationStatus = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/Types/DestroyType.js
var DestroyType;
(function(DestroyType) {
	DestroyType["none"] = "none";
	DestroyType["max"] = "max";
	DestroyType["min"] = "min";
})(DestroyType || (DestroyType = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/Directions/OutModeDirection.js
var OutModeDirection;
(function(OutModeDirection) {
	OutModeDirection["bottom"] = "bottom";
	OutModeDirection["left"] = "left";
	OutModeDirection["right"] = "right";
	OutModeDirection["top"] = "top";
})(OutModeDirection || (OutModeDirection = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/Modes/PixelMode.js
var PixelMode;
(function(PixelMode) {
	PixelMode["precise"] = "precise";
	PixelMode["percent"] = "percent";
})(PixelMode || (PixelMode = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/Types/StartValueType.js
var StartValueType;
(function(StartValueType) {
	StartValueType["max"] = "max";
	StartValueType["min"] = "min";
	StartValueType["random"] = "random";
})(StartValueType || (StartValueType = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Utils/Utils.js
var minRadius = 0, minMemoizeSize = 0;
function memoize(fn, options) {
	const cache = /* @__PURE__ */ new Map(), maxSize = options?.maxSize, ttlMs = options?.ttlMs, keyFn = options?.keyFn, stableStringify = (obj, seen = /* @__PURE__ */ new WeakSet()) => {
		if (obj === null) return "null";
		const t = typeof obj;
		if (t === "undefined") return "undefined";
		if (t === "number" || t === "boolean" || t === "string") return JSON.stringify(obj);
		if (t === "function") try {
			return obj.toString();
		} catch {
			return "\"[Function]\"";
		}
		if (t === "symbol") try {
			return obj.toString();
		} catch {
			return "\"[Symbol]\"";
		}
		if (Array.isArray(obj)) return `[${obj.map((i) => stableStringify(i, seen)).join(",")}]`;
		if (seen.has(obj)) return "\"[Circular]\"";
		seen.add(obj);
		return `{${Object.keys(obj).sort().map((k) => `${JSON.stringify(k)}:${stableStringify(obj[k], seen)}`).join(",")}}`;
	}, defaultKeyer = (args) => stableStringify(args), makeKey = (args) => keyFn ? keyFn(args) : defaultKeyer(args), ensureBounds = () => {
		if (typeof maxSize === "number" && maxSize >= minMemoizeSize) while (cache.size > maxSize) {
			const firstKey = cache.keys().next().value;
			if (firstKey === void 0) break;
			cache.delete(firstKey);
		}
	};
	return (...args) => {
		const key = makeKey(args), now = Date.now(), entry = cache.get(key);
		if (entry !== void 0) if (ttlMs && now - entry.ts > ttlMs) cache.delete(key);
		else {
			cache.delete(key);
			cache.set(key, {
				value: entry.value,
				ts: entry.ts
			});
			return entry.value;
		}
		const result = fn(...args);
		cache.set(key, {
			value: result,
			ts: now
		});
		ensureBounds();
		return result;
	};
}
function hasMatchMedia() {
	return typeof matchMedia !== "undefined";
}
function safeDocument() {
	return globalThis.document;
}
function safeMatchMedia(query) {
	if (!hasMatchMedia()) return;
	return matchMedia(query);
}
function safeIntersectionObserver(callback) {
	if (typeof IntersectionObserver === "undefined") return;
	return new IntersectionObserver(callback);
}
function safeMutationObserver(callback) {
	if (typeof MutationObserver === "undefined") return;
	return new MutationObserver(callback);
}
function isInArray(value, array) {
	return value === array || isArray(array) && array.includes(value);
}
function arrayRandomIndex(array) {
	return Math.floor(getRandom() * array.length);
}
function itemFromArray(array, index, useIndex = true) {
	return array[index !== void 0 && useIndex ? index % array.length : arrayRandomIndex(array)];
}
function isPointInside(point, size, offset, radius, direction) {
	return areBoundsInside(calculateBounds(point, radius ?? minRadius), size, offset, direction);
}
function areBoundsInside(bounds, size, offset, direction) {
	let inside = true;
	if (!direction || direction === OutModeDirection.bottom) inside = bounds.top < size.height + offset.x;
	if (inside && (!direction || direction === OutModeDirection.left)) inside = bounds.right > offset.x;
	if (inside && (!direction || direction === OutModeDirection.right)) inside = bounds.left < size.width + offset.y;
	if (inside && (!direction || direction === OutModeDirection.top)) inside = bounds.bottom > offset.y;
	return inside;
}
function calculateBounds(point, radius) {
	return {
		bottom: point.y + radius,
		left: point.x - radius,
		right: point.x + radius,
		top: point.y - radius
	};
}
function deepExtend(destination, ...sources) {
	for (const source of sources) {
		if (isNull(source)) continue;
		if (!isObject(source)) {
			destination = source;
			continue;
		}
		if (Array.isArray(source)) {
			if (!Array.isArray(destination)) destination = [];
		} else if (!isObject(destination) || Array.isArray(destination)) destination = {};
		const sourceKeys = Object.keys(source), dangerousKeys = new Set([
			"__proto__",
			"constructor",
			"prototype"
		]);
		if (!sourceKeys.some((k) => {
			const v = source[k];
			return isObject(v) || Array.isArray(v);
		})) {
			const sourceDict = source, destDict = destination;
			for (const key of sourceKeys) {
				if (dangerousKeys.has(key)) continue;
				if (key in sourceDict) {
					const v = sourceDict[key];
					if (v !== void 0) destDict[key] = v;
				}
			}
			continue;
		}
		for (const key of sourceKeys) {
			if (dangerousKeys.has(key)) continue;
			const sourceDict = source, destDict = destination, value = sourceDict[key];
			destDict[key] = Array.isArray(value) ? value.map((v) => deepExtend(void 0, v)) : deepExtend(destDict[key], value);
		}
	}
	return destination;
}
function circleBounceDataFromParticle(p) {
	return {
		position: p.getPosition(),
		radius: p.getRadius(),
		mass: p.getMass(),
		velocity: p.velocity,
		factor: Vector.create(getRangeValue(p.options.bounce.horizontal.value), getRangeValue(p.options.bounce.vertical.value))
	};
}
function circleBounce(p1, p2) {
	const { x: xVelocityDiff, y: yVelocityDiff } = p1.velocity.sub(p2.velocity), [pos1, pos2] = [p1.position, p2.position], { dx: xDist, dy: yDist } = getDistances(pos2, pos1);
	if (xVelocityDiff * xDist + yVelocityDiff * yDist < 0) return;
	const angle = -Math.atan2(yDist, xDist), m1 = p1.mass, m2 = p2.mass, u1 = p1.velocity.rotate(angle), u2 = p2.velocity.rotate(angle), v1 = collisionVelocity(u1, u2, m1, m2), v2 = collisionVelocity(u2, u1, m1, m2), vFinal1 = v1.rotate(-angle), vFinal2 = v2.rotate(-angle);
	p1.velocity.x = vFinal1.x * p1.factor.x;
	p1.velocity.y = vFinal1.y * p1.factor.y;
	p2.velocity.x = vFinal2.x * p2.factor.x;
	p2.velocity.y = vFinal2.y * p2.factor.y;
}
function executeOnSingleOrMultiple(obj, callback) {
	return isArray(obj) ? obj.map((item, index) => callback(item, index)) : callback(obj, 0);
}
function itemFromSingleOrMultiple(obj, index, useIndex) {
	return isArray(obj) ? itemFromArray(obj, index, useIndex) : obj;
}
function findItemFromSingleOrMultiple(obj, callback) {
	if (isArray(obj)) return obj.find((t, index) => callback(t, index));
	return callback(obj, 0) ? obj : void 0;
}
function initParticleNumericAnimationValue(options, pxRatio) {
	const valueRange = options.value, animationOptions = options.animation, res = {
		delayTime: getRangeValue(animationOptions.delay) * millisecondsToSeconds,
		enable: animationOptions.enable,
		value: getRangeValue(options.value) * pxRatio,
		max: getRangeMax(valueRange) * pxRatio,
		min: getRangeMin(valueRange) * pxRatio,
		loops: 0,
		maxLoops: getRangeValue(animationOptions.count),
		time: 0
	}, decayOffset = 1;
	if (animationOptions.enable) {
		res.decay = decayOffset - getRangeValue(animationOptions.decay);
		switch (animationOptions.mode) {
			case AnimationMode.increase:
				res.status = AnimationStatus.increasing;
				break;
			case AnimationMode.decrease:
				res.status = AnimationStatus.decreasing;
				break;
			case AnimationMode.random:
				res.status = getRandom() >= .5 ? AnimationStatus.increasing : AnimationStatus.decreasing;
				break;
			default: break;
		}
		const autoStatus = animationOptions.mode === AnimationMode.auto;
		switch (animationOptions.startValue) {
			case StartValueType.min:
				res.value = res.min;
				if (autoStatus) res.status = AnimationStatus.increasing;
				break;
			case StartValueType.max:
				res.value = res.max;
				if (autoStatus) res.status = AnimationStatus.decreasing;
				break;
			case StartValueType.random:
			default:
				res.value = randomInRangeValue(res);
				if (autoStatus) res.status = getRandom() >= .5 ? AnimationStatus.increasing : AnimationStatus.decreasing;
				break;
		}
	}
	res.initialValue = res.value;
	return res;
}
function getPositionOrSize(positionOrSize, canvasSize) {
	if (!(positionOrSize.mode === PixelMode.percent)) {
		const { mode: _, ...rest } = positionOrSize;
		return rest;
	}
	if ("x" in positionOrSize) return {
		x: positionOrSize.x / 100 * canvasSize.width,
		y: positionOrSize.y / 100 * canvasSize.height
	};
	else return {
		width: positionOrSize.width / 100 * canvasSize.width,
		height: positionOrSize.height / 100 * canvasSize.height
	};
}
function getPosition(position, canvasSize) {
	return getPositionOrSize(position, canvasSize);
}
function getSize(size, canvasSize) {
	return getPositionOrSize(size, canvasSize);
}
function checkDestroy(particle, destroyType, value, minValue, maxValue) {
	switch (destroyType) {
		case DestroyType.max:
			if (value >= maxValue) particle.destroy();
			break;
		case DestroyType.min:
			if (value <= minValue) particle.destroy();
			break;
		default: break;
	}
}
function updateAnimation(particle, data, changeDirection, destroyType, delta) {
	const minLoops = 0, minDelay = 0, identity = 1, minVelocity = 0, minDecay = 1;
	if (particle.destroyed || !data.enable || (data.maxLoops ?? minLoops) > minLoops && (data.loops ?? minLoops) > (data.maxLoops ?? minLoops)) return;
	const velocity = (data.velocity ?? minVelocity) * delta.factor, minValue = data.min, maxValue = data.max, decay = data.decay ?? minDecay;
	data.time ??= 0;
	if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) data.time += delta.value;
	if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) return;
	switch (data.status) {
		case AnimationStatus.increasing:
			data.value += velocity;
			break;
		case AnimationStatus.decreasing:
			data.value -= velocity;
			break;
		default: break;
	}
	if (data.velocity && decay !== identity) data.velocity *= decay;
	switch (data.status) {
		case AnimationStatus.increasing:
			if (data.value >= maxValue) {
				if (changeDirection) data.status = AnimationStatus.decreasing;
				else data.value -= maxValue;
				data.loops ??= minLoops;
				data.loops++;
			}
			break;
		case AnimationStatus.decreasing:
			if (data.value <= minValue) {
				if (changeDirection) data.status = AnimationStatus.increasing;
				else data.value += maxValue;
				data.loops ??= minLoops;
				data.loops++;
			}
			break;
		default: break;
	}
	checkDestroy(particle, destroyType, data.value, minValue, maxValue);
	if (!particle.destroyed) data.value = clamp(data.value, minValue, maxValue);
}
function cloneStyle(style) {
	const clonedStyle = safeDocument().createElement("div").style;
	for (const key in style) {
		const styleKey = style[key];
		if (!(key in style) || isNull(styleKey)) continue;
		const styleValue = style.getPropertyValue?.(styleKey);
		if (!styleValue) continue;
		const stylePriority = style.getPropertyPriority?.(styleKey);
		if (stylePriority) clonedStyle.setProperty(styleKey, styleValue, stylePriority);
		else clonedStyle.setProperty(styleKey, styleValue);
	}
	return clonedStyle;
}
function computeFullScreenStyle(zIndex) {
	const fullScreenStyle = safeDocument().createElement("div").style, radix = 10, style = {
		width: "100%",
		height: "100%",
		margin: "0",
		padding: "0",
		borderWidth: "0",
		position: "fixed",
		zIndex: zIndex.toString(radix),
		"z-index": zIndex.toString(radix),
		top: "0",
		left: "0",
		"pointer-events": "none"
	};
	for (const key in style) {
		const value = style[key];
		if (value === void 0) continue;
		fullScreenStyle.setProperty(key, value);
	}
	return fullScreenStyle;
}
var getFullScreenStyle = memoize(computeFullScreenStyle);
function manageListener(element, event, handler, add, options) {
	if (add) {
		let addOptions = { passive: true };
		if (isBoolean(options)) addOptions.capture = options;
		else if (options !== void 0) addOptions = options;
		element.addEventListener(event, handler, addOptions);
	} else {
		const removeOptions = options;
		element.removeEventListener(event, handler, removeOptions);
	}
}
async function getItemsFromInitializer(container, map, initializers, force = false) {
	let res = map.get(container);
	if (!res || force) {
		res = await Promise.all([...initializers.values()].map((t) => t(container)));
		map.set(container, res);
	}
	return res;
}
async function getItemMapFromInitializer(container, map, initializers, force = false) {
	let res = map.get(container);
	if (!res || force) {
		const entries = await Promise.all([...initializers.entries()].map(([key, initializer]) => initializer(container).then((item) => [key, item])));
		res = new Map(entries);
		map.set(container, res);
	}
	return res;
}
//#endregion
//#region node_modules/@tsparticles/engine/browser/Utils/EventDispatcher.js
var EventDispatcher = class {
	#listeners;
	constructor() {
		this.#listeners = /* @__PURE__ */ new Map();
	}
	addEventListener(type, listener) {
		this.removeEventListener(type, listener);
		let arr = this.#listeners.get(type);
		if (!arr) {
			arr = [];
			this.#listeners.set(type, arr);
		}
		arr.push(listener);
	}
	dispatchEvent(type, args) {
		this.#listeners.get(type)?.forEach((handler) => {
			handler(args);
		});
	}
	hasEventListener(type) {
		return !!this.#listeners.get(type);
	}
	removeAllEventListeners(type) {
		if (!type) this.#listeners = /* @__PURE__ */ new Map();
		else this.#listeners.delete(type);
	}
	removeEventListener(type, listener) {
		const arr = this.#listeners.get(type);
		if (!arr) return;
		const length = arr.length, idx = arr.indexOf(listener);
		if (idx < 0) return;
		if (length === 1) this.#listeners.delete(type);
		else arr.splice(idx, 1);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/Types/EventType.js
var EventType;
(function(EventType) {
	EventType["configAdded"] = "configAdded";
	EventType["containerInit"] = "containerInit";
	EventType["particlesSetup"] = "particlesSetup";
	EventType["containerStarted"] = "containerStarted";
	EventType["containerStopped"] = "containerStopped";
	EventType["containerDestroyed"] = "containerDestroyed";
	EventType["containerPaused"] = "containerPaused";
	EventType["containerPlay"] = "containerPlay";
	EventType["containerBuilt"] = "containerBuilt";
	EventType["particleAdded"] = "particleAdded";
	EventType["particleDestroyed"] = "particleDestroyed";
	EventType["particleRemoved"] = "particleRemoved";
})(EventType || (EventType = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Core/Utils/PluginManager.js
var PluginManager = class {
	colorManagers = /* @__PURE__ */ new Map();
	easingFunctions = /* @__PURE__ */ new Map();
	effectDrawers = /* @__PURE__ */ new Map();
	initializers = {
		effects: /* @__PURE__ */ new Map(),
		shapes: /* @__PURE__ */ new Map(),
		updaters: /* @__PURE__ */ new Map()
	};
	palettes = /* @__PURE__ */ new Map();
	plugins = [];
	presets = /* @__PURE__ */ new Map();
	shapeDrawers = /* @__PURE__ */ new Map();
	updaters = /* @__PURE__ */ new Map();
	#allLoadersSet = /* @__PURE__ */ new Set();
	#configs = /* @__PURE__ */ new Map();
	#engine;
	#executedSet = /* @__PURE__ */ new Set();
	#initialized = false;
	#isRunningLoaders = false;
	#loadPromises = /* @__PURE__ */ new Set();
	constructor(engine) {
		this.#engine = engine;
	}
	get configs() {
		const res = {};
		for (const [name, config] of this.#configs) res[name] = config;
		return res;
	}
	addColorManager(name, manager) {
		this.colorManagers.set(name, manager);
	}
	addConfig(config) {
		const key = config.key ?? config.name ?? "default";
		this.#configs.set(key, config);
		this.#engine.dispatchEvent(EventType.configAdded, { data: {
			name: key,
			config
		} });
	}
	addEasing(name, easing) {
		if (this.easingFunctions.get(name)) return;
		this.easingFunctions.set(name, easing);
	}
	addEffect(effect, drawer) {
		this.initializers.effects.set(effect, drawer);
	}
	addPalette(name, palette) {
		this.palettes.set(name, palette);
	}
	addParticleUpdater(name, updaterInitializer) {
		this.initializers.updaters.set(name, updaterInitializer);
	}
	addPlugin(plugin) {
		if (this.getPlugin(plugin.id)) return;
		this.plugins.push(plugin);
	}
	addPreset(preset, options, override = false) {
		if (!(override || !this.getPreset(preset))) return;
		this.presets.set(preset, options);
	}
	addShape(shapes, drawer) {
		for (const shape of shapes) this.initializers.shapes.set(shape, drawer);
	}
	clearPlugins(container) {
		this.effectDrawers.delete(container);
		this.shapeDrawers.delete(container);
		this.updaters.delete(container);
	}
	getEasing(name) {
		return this.easingFunctions.get(name) ?? ((value) => value);
	}
	getEffectDrawers(container, force = false) {
		return getItemMapFromInitializer(container, this.effectDrawers, this.initializers.effects, force);
	}
	getPalette(name) {
		return this.palettes.get(name);
	}
	getPlugin(plugin) {
		return this.plugins.find((t) => t.id === plugin);
	}
	getPreset(preset) {
		return this.presets.get(preset);
	}
	async getShapeDrawers(container, force = false) {
		return getItemMapFromInitializer(container, this.shapeDrawers, this.initializers.shapes, force);
	}
	async getUpdaters(container, force = false) {
		return getItemsFromInitializer(container, this.updaters, this.initializers.updaters, force);
	}
	async init() {
		if (this.#initialized || this.#isRunningLoaders) return;
		this.#isRunningLoaders = true;
		this.#executedSet = /* @__PURE__ */ new Set();
		this.#allLoadersSet = new Set(this.#loadPromises);
		try {
			for (const loader of this.#allLoadersSet) await this.#runLoader(loader, this.#executedSet, this.#allLoadersSet);
		} finally {
			this.#loadPromises.clear();
			this.#isRunningLoaders = false;
			this.#initialized = true;
		}
	}
	loadParticlesOptions(container, options, ...sourceOptions) {
		const updaters = this.updaters.get(container);
		if (!updaters) return;
		updaters.forEach((updater) => updater.loadOptions?.(options, ...sourceOptions));
	}
	async register(...loaders) {
		if (this.#initialized) throw new Error("Register plugins can only be done before calling tsParticles.load()");
		for (const loader of loaders) if (this.#isRunningLoaders) await this.#runLoader(loader, this.#executedSet, this.#allLoadersSet);
		else this.#loadPromises.add(loader);
	}
	async #runLoader(loader, executed, allLoaders) {
		if (executed.has(loader)) return;
		executed.add(loader);
		allLoaders.add(loader);
		await loader(this.#engine);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Utils/LogUtils.js
var errorPrefix = "tsParticles - Error";
var wrap = (fn) => (...args) => {
	fn(...args);
}, _logger = {
	debug: wrap(console.debug),
	error: (message, ...optionalParams) => {
		console.error(`${errorPrefix} - ${message}`, ...optionalParams);
	},
	info: wrap(console.info),
	log: wrap(console.log),
	trace: wrap(console.trace),
	verbose: wrap(console.log),
	warning: wrap(console.warn)
};
function setLogger(logger) {
	if (logger.debug) _logger.debug = wrap(logger.debug);
	if (logger.error) _logger.error = wrap(logger.error);
	if (logger.info) _logger.info = wrap(logger.info);
	if (logger.log) _logger.log = wrap(logger.log);
	if (logger.trace) _logger.trace = wrap(logger.trace);
	if (logger.verbose) _logger.verbose = wrap(logger.verbose);
	if (logger.warning) _logger.warning = wrap(logger.warning);
}
function getLogger() {
	return _logger;
}
//#endregion
//#region node_modules/@tsparticles/engine/browser/Core/Engine.js
var fullPercent = "100%";
async function getDataFromUrl(data) {
	const url = itemFromSingleOrMultiple(data.url, data.index);
	if (!url) return data.fallback;
	const response = await fetch(url);
	if (response.ok) return await response.json();
	getLogger().error(`${response.status.toString()} while retrieving config file`);
	return data.fallback;
}
var getCanvasFromContainer = (domContainer) => {
	const documentSafe = safeDocument();
	let canvasEl;
	if (domContainer instanceof HTMLCanvasElement || domContainer.tagName.toLowerCase() === "canvas") {
		canvasEl = domContainer;
		canvasEl.dataset[generatedAttribute] ??= generatedFalse;
		if (canvasEl.dataset["generated"] === "true") {
			canvasEl.style.width ||= fullPercent;
			canvasEl.style.height ||= fullPercent;
			canvasEl.style.pointerEvents = "none";
			canvasEl.style.setProperty("pointer-events", "none");
		}
	} else {
		const foundCanvas = domContainer.getElementsByTagName(canvasTag).item(0);
		if (foundCanvas) {
			canvasEl = foundCanvas;
			canvasEl.dataset[generatedAttribute] = generatedFalse;
		} else {
			canvasEl = documentSafe.createElement(canvasTag);
			canvasEl.dataset[generatedAttribute] = generatedTrue;
			domContainer.appendChild(canvasEl);
		}
		canvasEl.style.width ||= fullPercent;
		canvasEl.style.height ||= fullPercent;
		canvasEl.style.pointerEvents = "none";
		canvasEl.style.setProperty("pointer-events", "none");
	}
	return canvasEl;
}, getDomContainer = (id, source) => {
	const documentSafe = safeDocument();
	let domContainer = source ?? documentSafe.getElementById(id);
	if (domContainer) return domContainer;
	domContainer = documentSafe.createElement("canvas");
	domContainer.id = id;
	domContainer.dataset[generatedAttribute] = generatedTrue;
	documentSafe.body.append(domContainer);
	return domContainer;
};
var Engine = class {
	pluginManager = new PluginManager(this);
	#domArray = [];
	#eventDispatcher = new EventDispatcher();
	#initialized = false;
	get items() {
		return this.#domArray;
	}
	get version() {
		return "4.1.3";
	}
	addEventListener(type, listener) {
		this.#eventDispatcher.addEventListener(type, listener);
	}
	checkVersion(pluginVersion) {
		if (this.version === pluginVersion) return;
		throw new Error(`The tsParticles version is different from the loaded plugins version. Engine version: ${this.version}. Plugin version: ${pluginVersion}`);
	}
	dispatchEvent(type, args) {
		this.#eventDispatcher.dispatchEvent(type, args);
	}
	async init() {
		if (this.#initialized) return;
		await this.pluginManager.init();
		this.#initialized = true;
	}
	item(index) {
		const items = this.items, item = items[index];
		if (item?.destroyed) {
			items.splice(index, 1);
			return;
		}
		return item;
	}
	async load(params) {
		await this.init();
		let domSourceElement;
		if (typeof HTMLElement !== "undefined" && params.element instanceof HTMLElement) domSourceElement = params.element;
		const { Container } = await import("./Container-C1VHJSl3.js"), id = params.id ?? domSourceElement?.id ?? `tsparticles${Math.floor(getRandom() * 1e4).toString()}`, { index, url } = params, currentOptions = itemFromSingleOrMultiple(url ? await getDataFromUrl({
			fallback: params.options,
			url,
			index
		}) : params.options, index), { items } = this, oldIndex = items.findIndex((v) => v.id.description === id), newItem = new Container({
			dispatchCallback: (eventType, args) => {
				this.dispatchEvent(eventType, args);
			},
			id,
			onDestroy: (remove) => {
				if (!remove) return;
				const mainArr = this.items, idx = mainArr.indexOf(newItem);
				if (idx >= 0) mainArr.splice(idx, 1);
			},
			pluginManager: this.pluginManager,
			sourceOptions: currentOptions
		});
		if (oldIndex >= 0) {
			const old = this.item(oldIndex), deleteCount = old ? 1 : 0;
			if (old && !old.destroyed) old.destroy(false);
			items.splice(oldIndex, deleteCount, newItem);
		} else items.push(newItem);
		const sourceCanvas = typeof OffscreenCanvas !== "undefined" && params.element instanceof OffscreenCanvas ? params.element : getCanvasFromContainer(getDomContainer(id, domSourceElement));
		newItem.canvas.loadCanvas(sourceCanvas);
		await newItem.start();
		return newItem;
	}
	async refresh(refresh = true) {
		if (!refresh) return;
		await Promise.all(this.items.map((t) => t.refresh()));
	}
	removeEventListener(type, listener) {
		this.#eventDispatcher.removeEventListener(type, listener);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/initEngine.js
function initEngine() {
	return new Engine();
}
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/RangeType.js
var RangeType;
(function(RangeType) {
	RangeType["circle"] = "circle";
	RangeType["rectangle"] = "rectangle";
})(RangeType || (RangeType = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Core/Utils/Ranges.js
var BaseRange = class {
	position;
	type;
	constructor(x, y, type) {
		this.position = {
			x,
			y
		};
		this.type = type;
	}
	_resetPosition(x, y) {
		this.position.x = x;
		this.position.y = y;
	}
};
var Circle = class Circle extends BaseRange {
	radius;
	constructor(x, y, radius) {
		super(x, y, RangeType.circle);
		this.radius = radius;
	}
	contains(point) {
		return checkDistance(point, this.position, this.radius);
	}
	intersects(range) {
		const pos1 = this.position, pos2 = range.position, r = this.radius, dx = Math.abs(pos2.x - pos1.x), dy = Math.abs(pos2.y - pos1.y);
		if (range instanceof Circle || range.type === RangeType.circle) return r + range.radius > Math.hypot(dx, dy);
		else if (range instanceof Rectangle || range.type === RangeType.rectangle) {
			const { width, height } = range.size;
			return Math.pow(dx - width, 2) + Math.pow(dy - height, 2) <= r ** 2 || dx <= r + width && dy <= r + height || dx <= width || dy <= height;
		}
		return false;
	}
	reset(x, y, radius) {
		this._resetPosition(x, y);
		this.radius = radius;
		return this;
	}
};
var Rectangle = class Rectangle extends BaseRange {
	size;
	constructor(x, y, width, height) {
		super(x, y, RangeType.rectangle);
		this.size = {
			height,
			width
		};
	}
	contains(point) {
		const w = this.size.width, h = this.size.height, pos = this.position;
		return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
	}
	intersects(range) {
		if (range instanceof Circle) return range.intersects(this);
		if (!(range instanceof Rectangle)) return false;
		const w = this.size.width, h = this.size.height, pos1 = this.position, pos2 = range.position, size2 = range.size, w2 = size2.width, h2 = size2.height;
		return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
	}
	reset(x, y, width, height) {
		this._resetPosition(x, y);
		this.size.width = width;
		this.size.height = height;
		return this;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/Directions/RotateDirection.js
var RotateDirection;
(function(RotateDirection) {
	RotateDirection["clockwise"] = "clockwise";
	RotateDirection["counterClockwise"] = "counter-clockwise";
	RotateDirection["random"] = "random";
})(RotateDirection || (RotateDirection = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/Modes/LimitMode.js
var LimitMode;
(function(LimitMode) {
	LimitMode["delete"] = "delete";
	LimitMode["wait"] = "wait";
})(LimitMode || (LimitMode = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/Modes/OutMode.js
var OutMode;
(function(OutMode) {
	OutMode["bounce"] = "bounce";
	OutMode["none"] = "none";
	OutMode["out"] = "out";
	OutMode["destroy"] = "destroy";
	OutMode["split"] = "split";
})(OutMode || (OutMode = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/Types/AlterType.js
var AlterType;
(function(AlterType) {
	AlterType["darken"] = "darken";
	AlterType["enlighten"] = "enlighten";
})(AlterType || (AlterType = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/Types/GradientType.js
var GradientType;
(function(GradientType) {
	GradientType["linear"] = "linear";
	GradientType["radial"] = "radial";
	GradientType["random"] = "random";
})(GradientType || (GradientType = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/Types/ParticleOutType.js
var ParticleOutType;
(function(ParticleOutType) {
	ParticleOutType["normal"] = "normal";
	ParticleOutType["inside"] = "inside";
	ParticleOutType["outside"] = "outside";
})(ParticleOutType || (ParticleOutType = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Enums/Types/EasingType.js
var EasingType;
(function(EasingType) {
	EasingType["easeInBack"] = "ease-in-back";
	EasingType["easeInBounce"] = "ease-in-bounce";
	EasingType["easeInCirc"] = "ease-in-circ";
	EasingType["easeInCubic"] = "ease-in-cubic";
	EasingType["easeInElastic"] = "ease-in-elastic";
	EasingType["easeInExpo"] = "ease-in-expo";
	EasingType["easeInGaussian"] = "ease-in-gaussian";
	EasingType["easeInLinear"] = "ease-in-linear";
	EasingType["easeInQuad"] = "ease-in-quad";
	EasingType["easeInQuart"] = "ease-in-quart";
	EasingType["easeInQuint"] = "ease-in-quint";
	EasingType["easeInSigmoid"] = "ease-in-sigmoid";
	EasingType["easeInSine"] = "ease-in-sine";
	EasingType["easeInSmoothstep"] = "ease-in-smoothstep";
	EasingType["easeOutBack"] = "ease-out-back";
	EasingType["easeOutBounce"] = "ease-out-bounce";
	EasingType["easeOutCirc"] = "ease-out-circ";
	EasingType["easeOutCubic"] = "ease-out-cubic";
	EasingType["easeOutElastic"] = "ease-out-elastic";
	EasingType["easeOutExpo"] = "ease-out-expo";
	EasingType["easeOutGaussian"] = "ease-out-gaussian";
	EasingType["easeOutLinear"] = "ease-out-linear";
	EasingType["easeOutQuad"] = "ease-out-quad";
	EasingType["easeOutQuart"] = "ease-out-quart";
	EasingType["easeOutQuint"] = "ease-out-quint";
	EasingType["easeOutSigmoid"] = "ease-out-sigmoid";
	EasingType["easeOutSine"] = "ease-out-sine";
	EasingType["easeOutSmoothstep"] = "ease-out-smoothstep";
	EasingType["easeInOutBack"] = "ease-in-out-back";
	EasingType["easeInOutBounce"] = "ease-in-out-bounce";
	EasingType["easeInOutCirc"] = "ease-in-out-circ";
	EasingType["easeInOutCubic"] = "ease-in-out-cubic";
	EasingType["easeInOutElastic"] = "ease-in-out-elastic";
	EasingType["easeInOutExpo"] = "ease-in-out-expo";
	EasingType["easeInOutGaussian"] = "ease-in-out-gaussian";
	EasingType["easeInOutLinear"] = "ease-in-out-linear";
	EasingType["easeInOutQuad"] = "ease-in-out-quad";
	EasingType["easeInOutQuart"] = "ease-in-out-quart";
	EasingType["easeInOutQuint"] = "ease-in-out-quint";
	EasingType["easeInOutSigmoid"] = "ease-in-out-sigmoid";
	EasingType["easeInOutSine"] = "ease-in-out-sine";
	EasingType["easeInOutSmoothstep"] = "ease-in-out-smoothstep";
})(EasingType || (EasingType = {}));
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/AnimationOptions.js
var AnimationOptions = class {
	count;
	decay;
	delay;
	enable;
	speed;
	sync;
	constructor() {
		this.count = 0;
		this.enable = false;
		this.speed = 1;
		this.decay = 0;
		this.delay = 0;
		this.sync = false;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.count !== void 0) this.count = setRangeValue(data.count);
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.speed !== void 0) this.speed = setRangeValue(data.speed);
		if (data.decay !== void 0) this.decay = setRangeValue(data.decay);
		if (data.delay !== void 0) this.delay = setRangeValue(data.delay);
		if (data.sync !== void 0) this.sync = data.sync;
	}
};
var RangedAnimationOptions = class extends AnimationOptions {
	mode;
	startValue;
	constructor() {
		super();
		this.mode = AnimationMode.auto;
		this.startValue = StartValueType.random;
	}
	load(data) {
		super.load(data);
		if (isNull(data)) return;
		if (data.mode !== void 0) this.mode = data.mode;
		if (data.startValue !== void 0) this.startValue = data.startValue;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/ColorAnimation.js
var ColorAnimation = class extends AnimationOptions {
	max;
	min;
	offset;
	constructor(min, max) {
		super();
		this.min = min;
		this.max = max;
		this.offset = 0;
		this.sync = true;
	}
	load(data) {
		super.load(data);
		if (isNull(data)) return;
		if (data.max !== void 0) this.max = data.max;
		if (data.min !== void 0) this.min = data.min;
		if (data.offset !== void 0) this.offset = setRangeValue(data.offset);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/HslAnimation.js
var HslAnimation = class {
	h = new ColorAnimation(0, 360);
	l = new ColorAnimation(0, 100);
	s = new ColorAnimation(0, 100);
	load(data) {
		if (isNull(data)) return;
		this.h.load(data.h);
		this.s.load(data.s);
		this.l.load(data.l);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/OptionsColor.js
var OptionsColor = class OptionsColor {
	value;
	constructor() {
		this.value = "";
	}
	static create(source, data) {
		const color = new OptionsColor();
		color.load(source);
		if (data !== void 0) if (isString(data) || isArray(data)) color.load({ value: data });
		else color.load(data);
		return color;
	}
	load(data) {
		if (isNull(data)) return;
		if (!isNull(data.value)) this.value = data.value;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/AnimatableColor.js
var AnimatableColor = class AnimatableColor extends OptionsColor {
	animation;
	constructor() {
		super();
		this.animation = new HslAnimation();
	}
	static create(source, data) {
		const color = new AnimatableColor();
		color.load(source);
		if (data !== void 0) if (isString(data) || isArray(data)) color.load({ value: data });
		else color.load(data);
		return color;
	}
	load(data) {
		super.load(data);
		if (isNull(data)) return;
		const colorAnimation = data.animation;
		if (colorAnimation !== void 0) if (colorAnimation.enable === void 0) this.animation.load(data.animation);
		else this.animation.h.load(colorAnimation);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Background/Background.js
var Background = class {
	color;
	image;
	opacity;
	position;
	repeat;
	size;
	constructor() {
		this.color = new OptionsColor();
		this.color.value = "";
		this.image = "";
		this.position = "";
		this.repeat = "";
		this.size = "";
		this.opacity = 1;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.color !== void 0) this.color = OptionsColor.create(this.color, data.color);
		if (data.image !== void 0) this.image = data.image;
		if (data.position !== void 0) this.position = data.position;
		if (data.repeat !== void 0) this.repeat = data.repeat;
		if (data.size !== void 0) this.size = data.size;
		if (data.opacity !== void 0) this.opacity = data.opacity;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/FullScreen/FullScreen.js
var FullScreen = class {
	enable;
	zIndex;
	constructor() {
		this.enable = true;
		this.zIndex = 0;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.zIndex !== void 0) this.zIndex = data.zIndex;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/ResizeEvent.js
var ResizeEvent = class {
	delay;
	enable;
	constructor() {
		this.delay = .5;
		this.enable = true;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.delay !== void 0) this.delay = data.delay;
		if (data.enable !== void 0) this.enable = data.enable;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Effect/Effect.js
var Effect = class {
	close;
	options;
	type;
	constructor() {
		this.close = true;
		this.options = {};
		this.type = [];
	}
	load(data) {
		if (isNull(data)) return;
		const options = data.options;
		if (options !== void 0) for (const effect in options) {
			const item = options[effect];
			if (item) this.options[effect] = deepExtend(this.options[effect] ?? {}, item);
		}
		if (data.close !== void 0) this.close = data.close;
		if (data.type !== void 0) this.type = data.type;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Fill.js
var Fill = class {
	color;
	enable;
	opacity;
	constructor() {
		this.enable = true;
		this.opacity = 1;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.color !== void 0) this.color = AnimatableColor.create(this.color, data.color);
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.opacity !== void 0) this.opacity = setRangeValue(data.opacity);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/MoveAngle.js
var MoveAngle = class {
	offset;
	value;
	constructor() {
		this.offset = 0;
		this.value = 90;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.offset !== void 0) this.offset = setRangeValue(data.offset);
		if (data.value !== void 0) this.value = setRangeValue(data.value);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/MoveCenter.js
var MoveCenter = class {
	mode;
	radius;
	x;
	y;
	constructor() {
		this.x = 50;
		this.y = 50;
		this.mode = PixelMode.percent;
		this.radius = 0;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.x !== void 0) this.x = data.x;
		if (data.y !== void 0) this.y = data.y;
		if (data.mode !== void 0) this.mode = data.mode;
		if (data.radius !== void 0) this.radius = data.radius;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/MoveGravity.js
var MoveGravity = class {
	acceleration;
	enable;
	inverse;
	maxSpeed;
	constructor() {
		this.acceleration = 9.81;
		this.enable = false;
		this.inverse = false;
		this.maxSpeed = 50;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.acceleration !== void 0) this.acceleration = setRangeValue(data.acceleration);
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.inverse !== void 0) this.inverse = data.inverse;
		if (data.maxSpeed !== void 0) this.maxSpeed = setRangeValue(data.maxSpeed);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/ValueWithRandom.js
var ValueWithRandom = class {
	value;
	constructor() {
		this.value = 0;
	}
	load(data) {
		if (isNull(data)) return;
		if (!isNull(data.value)) this.value = setRangeValue(data.value);
	}
};
var AnimationValueWithRandom = class extends ValueWithRandom {
	animation = new AnimationOptions();
	load(data) {
		super.load(data);
		if (isNull(data)) return;
		const animation = data.animation;
		if (animation !== void 0) this.animation.load(animation);
	}
};
var RangedAnimationValueWithRandom = class extends AnimationValueWithRandom {
	animation;
	constructor() {
		super();
		this.animation = new RangedAnimationOptions();
	}
	load(data) {
		super.load(data);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/Path/MovePath.js
var MovePath = class {
	clamp;
	delay;
	enable;
	generator;
	options;
	constructor() {
		this.clamp = true;
		this.delay = new ValueWithRandom();
		this.enable = false;
		this.options = {};
	}
	load(data) {
		if (isNull(data)) return;
		if (data.clamp !== void 0) this.clamp = data.clamp;
		this.delay.load(data.delay);
		if (data.enable !== void 0) this.enable = data.enable;
		this.generator = data.generator;
		if (data.options) this.options = deepExtend(this.options, data.options);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/OutModes.js
var OutModes = class {
	bottom;
	default;
	left;
	right;
	top;
	constructor() {
		this.default = OutMode.out;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.default !== void 0) this.default = data.default;
		this.bottom = data.bottom ?? data.default;
		this.left = data.left ?? data.default;
		this.right = data.right ?? data.default;
		this.top = data.top ?? data.default;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/Spin.js
var Spin = class {
	acceleration;
	enable;
	position;
	constructor() {
		this.acceleration = 0;
		this.enable = false;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.acceleration !== void 0) this.acceleration = setRangeValue(data.acceleration);
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.position) this.position = deepExtend({}, data.position);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/Move.js
var Move = class {
	angle;
	center;
	decay;
	direction;
	distance;
	drift;
	enable;
	gravity;
	outModes;
	path;
	random;
	size;
	speed;
	spin;
	straight;
	vibrate;
	warp;
	constructor() {
		this.angle = new MoveAngle();
		this.center = new MoveCenter();
		this.decay = 0;
		this.distance = {};
		this.direction = MoveDirection.none;
		this.drift = 0;
		this.enable = false;
		this.gravity = new MoveGravity();
		this.path = new MovePath();
		this.outModes = new OutModes();
		this.random = false;
		this.size = false;
		this.speed = 2;
		this.spin = new Spin();
		this.straight = false;
		this.vibrate = false;
		this.warp = false;
	}
	load(data) {
		if (isNull(data)) return;
		this.angle.load(isNumber(data.angle) ? { value: data.angle } : data.angle);
		this.center.load(data.center);
		if (data.decay !== void 0) this.decay = setRangeValue(data.decay);
		if (data.direction !== void 0) this.direction = data.direction;
		if (data.distance !== void 0) this.distance = isNumber(data.distance) ? {
			horizontal: data.distance,
			vertical: data.distance
		} : { ...data.distance };
		if (data.drift !== void 0) this.drift = setRangeValue(data.drift);
		if (data.enable !== void 0) this.enable = data.enable;
		this.gravity.load(data.gravity);
		const outModes = data.outModes;
		if (outModes !== void 0) if (isObject(outModes)) this.outModes.load(outModes);
		else this.outModes.load({ default: outModes });
		this.path.load(data.path);
		if (data.random !== void 0) this.random = data.random;
		if (data.size !== void 0) this.size = data.size;
		if (data.speed !== void 0) this.speed = setRangeValue(data.speed);
		this.spin.load(data.spin);
		if (data.straight !== void 0) this.straight = data.straight;
		if (data.vibrate !== void 0) this.vibrate = data.vibrate;
		if (data.warp !== void 0) this.warp = data.warp;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Stroke.js
var Stroke = class {
	color;
	opacity;
	width;
	constructor() {
		this.width = 0;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.color !== void 0) this.color = AnimatableColor.create(this.color, data.color);
		if (data.width !== void 0) this.width = setRangeValue(data.width);
		if (data.opacity !== void 0) this.opacity = setRangeValue(data.opacity);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Paint.js
var Paint = class {
	color;
	fill;
	stroke;
	load(data) {
		if (isNull(data)) return;
		if (data.color !== void 0) this.color = AnimatableColor.create(this.color, data.color);
		if (data.fill !== void 0) {
			this.fill ??= new Fill();
			this.fill.load(data.fill);
		}
		if (data.stroke !== void 0) {
			this.stroke ??= new Stroke();
			this.stroke.load(data.stroke);
		}
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js
var ParticlesBounceFactor = class extends ValueWithRandom {
	constructor() {
		super();
		this.value = 1;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Bounce/ParticlesBounce.js
var ParticlesBounce = class {
	horizontal;
	vertical;
	constructor() {
		this.horizontal = new ParticlesBounceFactor();
		this.vertical = new ParticlesBounceFactor();
	}
	load(data) {
		if (isNull(data)) return;
		this.horizontal.load(data.horizontal);
		this.vertical.load(data.vertical);
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Number/ParticlesDensity.js
var ParticlesDensity = class {
	enable;
	height;
	width;
	constructor() {
		this.enable = false;
		this.width = 1920;
		this.height = 1080;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.enable !== void 0) this.enable = data.enable;
		const width = data.width;
		if (width !== void 0) this.width = width;
		const height = data.height;
		if (height !== void 0) this.height = height;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Number/ParticlesNumberLimit.js
var ParticlesNumberLimit = class {
	mode;
	value;
	constructor() {
		this.mode = LimitMode.delete;
		this.value = 0;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.mode !== void 0) this.mode = data.mode;
		if (data.value !== void 0) this.value = data.value;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Number/ParticlesNumber.js
var ParticlesNumber = class {
	density;
	limit;
	value;
	constructor() {
		this.density = new ParticlesDensity();
		this.limit = new ParticlesNumberLimit();
		this.value = 0;
	}
	load(data) {
		if (isNull(data)) return;
		this.density.load(data.density);
		this.limit.load(data.limit);
		if (data.value !== void 0) this.value = data.value;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Shape/Shape.js
var Shape = class {
	close;
	options;
	type;
	constructor() {
		this.close = true;
		this.options = {};
		this.type = "circle";
	}
	load(data) {
		if (isNull(data)) return;
		const options = data.options;
		if (options !== void 0) for (const shape in options) {
			const item = options[shape];
			if (item) this.options[shape] = deepExtend(this.options[shape] ?? {}, item);
		}
		if (data.close !== void 0) this.close = data.close;
		if (data.type !== void 0) this.type = data.type;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/ZIndex/ZIndex.js
var ZIndex = class extends ValueWithRandom {
	opacityRate;
	sizeRate;
	velocityRate;
	constructor() {
		super();
		this.opacityRate = 1;
		this.sizeRate = 1;
		this.velocityRate = 1;
	}
	load(data) {
		super.load(data);
		if (isNull(data)) return;
		if (data.opacityRate !== void 0) this.opacityRate = data.opacityRate;
		if (data.sizeRate !== void 0) this.sizeRate = data.sizeRate;
		if (data.velocityRate !== void 0) this.velocityRate = data.velocityRate;
	}
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Particles/ParticlesOptions.js
var ParticlesOptions = class {
	bounce;
	effect;
	groups;
	move;
	number;
	paint;
	palette;
	reduceDuplicates;
	shape;
	zIndex;
	#container;
	#pluginManager;
	constructor(pluginManager, container) {
		this.#pluginManager = pluginManager;
		this.#container = container;
		this.bounce = new ParticlesBounce();
		this.effect = new Effect();
		this.groups = {};
		this.move = new Move();
		this.number = new ParticlesNumber();
		this.paint = new Paint();
		this.paint.color = new AnimatableColor();
		this.paint.color.value = "#fff";
		this.paint.fill = new Fill();
		this.paint.fill.enable = true;
		this.reduceDuplicates = false;
		this.shape = new Shape();
		this.zIndex = new ZIndex();
	}
	load(data) {
		if (isNull(data)) return;
		if (data.palette) {
			this.palette = data.palette;
			this.#importPalette(this.palette);
		}
		if (data.groups !== void 0) for (const group of Object.keys(data.groups)) {
			if (!(group in data.groups)) continue;
			const item = data.groups[group];
			if (item !== void 0) this.groups[group] = deepExtend(this.groups[group] ?? {}, item);
		}
		if (data.reduceDuplicates !== void 0) this.reduceDuplicates = data.reduceDuplicates;
		this.bounce.load(data.bounce);
		this.effect.load(data.effect);
		this.move.load(data.move);
		this.number.load(data.number);
		const paintToLoad = data.paint;
		if (paintToLoad) if (isArray(paintToLoad)) this.paint = executeOnSingleOrMultiple(paintToLoad, (t) => {
			const tmp = new Paint();
			tmp.load(t);
			return tmp;
		});
		else if (isArray(this.paint)) {
			this.paint = new Paint();
			this.paint.load(paintToLoad);
		} else this.paint.load(paintToLoad);
		this.shape.load(data.shape);
		this.zIndex.load(data.zIndex);
		if (this.#container) {
			for (const plugin of this.#pluginManager.plugins) if (plugin.loadParticlesOptions) plugin.loadParticlesOptions(this.#container, this, data);
			const updaters = this.#pluginManager.updaters.get(this.#container);
			if (updaters) {
				for (const updater of updaters) if (updater.loadOptions) updater.loadOptions(this, data);
			}
		}
	}
	#importPalette = (palette) => {
		const paletteData = this.#pluginManager.getPalette(palette);
		if (!paletteData) return;
		const paletteColors = paletteData.colors, defaultPaintStrokeWidth = 0, defaultPaintVariantsLength = 1, firstPaintVariantIndex = 0, defaultPalettePaintVariant = {}, palettePaintVariants = (isArray(paletteColors) ? paletteColors : [paletteColors]).flatMap((variant) => {
			const paletteFill = variant.fill, paletteStroke = variant.stroke, fillPart = paletteFill ? {
				color: { value: paletteFill.value },
				enable: paletteFill.enable,
				opacity: paletteFill.opacity
			} : void 0;
			if (!paletteStroke) return [{ fill: fillPart }];
			return [{
				fill: fillPart,
				stroke: {
					color: { value: paletteStroke.value },
					opacity: paletteStroke.opacity,
					width: paletteStroke.width || defaultPaintStrokeWidth
				}
			}];
		}), palettePaint = palettePaintVariants.length > defaultPaintVariantsLength ? palettePaintVariants : palettePaintVariants[firstPaintVariantIndex] ?? defaultPalettePaintVariant;
		this.load({
			paint: palettePaint,
			blend: {
				enable: true,
				mode: paletteData.blendMode
			}
		});
	};
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Utils/OptionsUtils.js
function loadOptions(options, ...sourceOptionsArr) {
	for (const sourceOptions of sourceOptionsArr) options.load(sourceOptions);
}
function loadParticlesOptions(pluginManager, container, ...sourceOptionsArr) {
	const options = new ParticlesOptions(pluginManager, container);
	loadOptions(options, ...sourceOptionsArr);
	return options;
}
//#endregion
//#region node_modules/@tsparticles/engine/browser/Options/Classes/Options.js
var Options = class {
	autoPlay;
	background;
	clear;
	defaultThemes;
	delay;
	detectRetina;
	duration;
	fpsLimit;
	fullScreen;
	hdr;
	key;
	name;
	palette;
	particles;
	pauseOnBlur;
	pauseOnOutsideViewport;
	preset;
	resize;
	smooth;
	style;
	zLayers;
	#container;
	#pluginManager;
	constructor(pluginManager, container) {
		this.#pluginManager = pluginManager;
		this.#container = container;
		this.autoPlay = true;
		this.background = new Background();
		this.clear = true;
		this.defaultThemes = {};
		this.delay = 0;
		this.fullScreen = new FullScreen();
		this.detectRetina = true;
		this.duration = 0;
		this.fpsLimit = 120;
		this.hdr = true;
		this.particles = loadParticlesOptions(this.#pluginManager, this.#container);
		this.pauseOnBlur = true;
		this.pauseOnOutsideViewport = true;
		this.resize = new ResizeEvent();
		this.smooth = false;
		this.style = {};
		this.zLayers = 100;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.preset !== void 0) {
			this.preset = data.preset;
			executeOnSingleOrMultiple(this.preset, (preset) => {
				this.#importPreset(preset);
			});
		}
		if (data.palette !== void 0) {
			this.palette = data.palette;
			this.#importPalette(this.palette);
		}
		if (data.autoPlay !== void 0) this.autoPlay = data.autoPlay;
		if (data.clear !== void 0) this.clear = data.clear;
		if (data.key !== void 0) this.key = data.key;
		if (data.name !== void 0) this.name = data.name;
		if (data.delay !== void 0) this.delay = setRangeValue(data.delay);
		const detectRetina = data.detectRetina;
		if (detectRetina !== void 0) this.detectRetina = detectRetina;
		if (data.duration !== void 0) this.duration = setRangeValue(data.duration);
		const fpsLimit = data.fpsLimit;
		if (fpsLimit !== void 0) this.fpsLimit = fpsLimit;
		if (data.hdr !== void 0) this.hdr = data.hdr;
		if (data.pauseOnBlur !== void 0) this.pauseOnBlur = data.pauseOnBlur;
		if (data.pauseOnOutsideViewport !== void 0) this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
		if (data.zLayers !== void 0) this.zLayers = data.zLayers;
		this.background.load(data.background);
		const fullScreen = data.fullScreen;
		if (isBoolean(fullScreen)) this.fullScreen.enable = fullScreen;
		else this.fullScreen.load(fullScreen);
		this.particles.load(data.particles);
		this.resize.load(data.resize);
		this.style = deepExtend(this.style, data.style);
		if (data.smooth !== void 0) this.smooth = data.smooth;
		this.#pluginManager.plugins.forEach((plugin) => {
			plugin.loadOptions(this.#container, this, data);
		});
	}
	#importPalette = (palette) => {
		const paletteData = this.#pluginManager.getPalette(palette);
		if (!paletteData) return;
		this.load({
			background: { color: paletteData.background },
			blend: {
				enable: true,
				mode: paletteData.blendMode
			},
			particles: { palette }
		});
	};
	#importPreset = (preset) => {
		this.load(this.#pluginManager.getPreset(preset));
	};
};
//#endregion
//#region node_modules/@tsparticles/engine/browser/Utils/CanvasUtils.js
function paintBase(context, dimension, baseColor) {
	context.fillStyle = baseColor ?? "rgba(0,0,0,0)";
	context.fillRect(originPoint.x, originPoint.y, dimension.width, dimension.height);
}
function paintImage(context, dimension, image, opacity) {
	if (!image) return;
	const prevAlpha = context.globalAlpha;
	context.globalAlpha = opacity;
	context.drawImage(image, originPoint.x, originPoint.y, dimension.width, dimension.height);
	context.globalAlpha = prevAlpha;
}
function clear(context, dimension) {
	context.clearRect(originPoint.x, originPoint.y, dimension.width, dimension.height);
}
function drawParticle(data) {
	const { container, context, particle, delta, colorStyles, radius, opacity, transform } = data, { effectDrawers, shapeDrawers } = container, pos = particle.getPosition(), transformData = particle.getTransformData(transform), drawScale = 1, drawPosition = {
		x: pos.x,
		y: pos.y
	};
	context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);
	if (colorStyles.fill) context.fillStyle = colorStyles.fill;
	const fillEnabled = !!particle.fillEnabled, strokeWidth = particle.strokeWidth ?? 0;
	context.lineWidth = strokeWidth;
	if (colorStyles.stroke) context.strokeStyle = colorStyles.stroke;
	const drawData = {
		context,
		particle,
		radius,
		drawRadius: radius * drawScale,
		opacity,
		delta,
		pixelRatio: container.retina.pixelRatio,
		fill: fillEnabled,
		stroke: strokeWidth > 0,
		transformData,
		position: { ...pos },
		drawPosition,
		drawScale
	};
	for (const plugin of container.plugins) plugin.drawParticleTransform?.(drawData);
	const effect = particle.effect ? effectDrawers.get(particle.effect) : void 0, shape = particle.shape ? shapeDrawers.get(particle.shape) : void 0;
	drawBeforeEffect(effect, drawData);
	drawShapeBeforeDraw(shape, drawData);
	drawShape(shape, drawData);
	drawShapeAfterDraw(shape, drawData);
	drawAfterEffect(effect, drawData);
	context.resetTransform();
}
function drawAfterEffect(drawer, data) {
	if (!drawer?.drawAfter) return;
	const { particle } = data;
	if (!particle.effect) return;
	drawer.drawAfter(data);
}
function drawBeforeEffect(drawer, data) {
	if (!drawer?.drawBefore) return;
	const { particle } = data;
	if (!particle.effect) return;
	drawer.drawBefore(data);
}
function drawShape(drawer, data) {
	if (!drawer) return;
	const { context, fill, particle, stroke } = data;
	if (!particle.shape) return;
	context.beginPath();
	drawer.draw(data);
	if (particle.shapeClose) context.closePath();
	if (fill) context.fill();
	if (stroke) context.stroke();
}
function drawShapeAfterDraw(drawer, data) {
	if (!drawer?.afterDraw) return;
	const { particle } = data;
	if (!particle.shape) return;
	drawer.afterDraw(data);
}
function drawShapeBeforeDraw(drawer, data) {
	if (!drawer?.beforeDraw) return;
	const { particle } = data;
	if (!particle.shape) return;
	drawer.beforeDraw(data);
}
function drawParticlePlugin(context, plugin, particle, delta) {
	if (!plugin.drawParticle) return;
	plugin.drawParticle(context, particle, delta);
}
//#endregion
//#region node_modules/@tsparticles/engine/browser/Utils/ColorUtils.js
var styleCache = /* @__PURE__ */ new Map(), maxCacheSize = 1e3, firstIndex = 0, rgbFixedPrecision = 2, hslFixedPrecision = 2;
function getCachedStyle(key, generator) {
	let cached = styleCache.get(key);
	if (!cached) {
		cached = generator();
		if (styleCache.size >= maxCacheSize) [...styleCache.keys()].slice(firstIndex, maxCacheSize * half).forEach((k) => styleCache.delete(k));
		styleCache.set(key, cached);
	}
	return cached;
}
function stringToRgba(pluginManager, input) {
	if (!input) return;
	for (const manager of pluginManager.colorManagers.values()) if (manager.accepts(input)) return manager.parseString(input);
}
function rangeColorToRgb(pluginManager, input, index, useIndex = true) {
	if (!input) return;
	const color = isString(input) ? { value: input } : input;
	if (isString(color.value)) return colorToRgb(pluginManager, color.value, index, useIndex);
	if (isArray(color.value)) {
		const value = itemFromArray(color.value, index, useIndex);
		if (!value) return;
		return rangeColorToRgb(pluginManager, { value });
	}
	for (const manager of pluginManager.colorManagers.values()) {
		const res = manager.handleRangeColor(color);
		if (res) return res;
	}
}
function colorToRgb(pluginManager, input, index, useIndex = true) {
	if (!input) return;
	const color = isString(input) ? { value: input } : input;
	if (isString(color.value)) return color.value === "random" ? getRandomRgbColor() : stringToRgb(pluginManager, color.value);
	if (isArray(color.value)) {
		const value = itemFromArray(color.value, index, useIndex);
		if (!value) return;
		return colorToRgb(pluginManager, { value });
	}
	for (const manager of pluginManager.colorManagers.values()) {
		const res = manager.handleColor(color);
		if (res) return res;
	}
}
function colorToHsl(pluginManager, color, index, useIndex = true) {
	const rgb = colorToRgb(pluginManager, color, index, useIndex);
	return rgb ? rgbToHsl(rgb) : void 0;
}
function rangeColorToHsl(pluginManager, color, index, useIndex = true) {
	const rgb = rangeColorToRgb(pluginManager, color, index, useIndex);
	return rgb ? rgbToHsl(rgb) : void 0;
}
function rgbToHsl(color) {
	const r1 = color.r / 255, g1 = color.g / 255, b1 = color.b / 255, max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1), res = {
		h: 0,
		l: (max + min) * half,
		s: 0
	};
	if (max !== min) {
		res.s = res.l < .5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
		if (r1 === max) res.h = (g1 - b1) / (max - min);
		else if (g1 === max) res.h = 2 + (b1 - r1) / (max - min);
		else res.h = 4 + (r1 - g1) / (max - min);
	}
	res.l *= 100;
	res.s *= 100;
	res.h *= 60;
	if (res.h < 0) res.h += 360;
	if (res.h >= 360) res.h -= 360;
	return res;
}
function stringToAlpha(pluginManager, input) {
	return stringToRgba(pluginManager, input)?.a;
}
function stringToRgb(pluginManager, input) {
	return stringToRgba(pluginManager, input);
}
function hslToRgb(hsl) {
	const h = (hsl.h % 360 + 360) % 360, s = Math.max(0, Math.min(100, hsl.s)), l = Math.max(0, Math.min(100, hsl.l)), hNormalized = h / 360, sNormalized = s / 100, lNormalized = l / 100;
	if (s === 0) {
		const grayscaleValue = Math.round(lNormalized * 255);
		return {
			r: grayscaleValue,
			g: grayscaleValue,
			b: grayscaleValue
		};
	}
	const channel = (temp1, temp2, temp3) => {
		const temp3Min = 0, temp3Max = 1;
		if (temp3 < temp3Min) temp3++;
		if (temp3 > temp3Max) temp3--;
		if (temp3 * 6 < temp3Max) return temp1 + (temp2 - temp1) * 6 * temp3;
		if (temp3 * 2 < temp3Max) return temp2;
		if (temp3 * 3 < temp3Max * 2) return temp1 + (temp2 - temp1) * (2 / 3 - temp3) * 6;
		return temp1;
	}, temp1 = lNormalized < .5 ? lNormalized * (1 + sNormalized) : lNormalized + sNormalized - lNormalized * sNormalized, temp2 = 2 * lNormalized - temp1, phaseThird = 1 / 3, red = Math.min(255, 255 * channel(temp2, temp1, hNormalized + phaseThird)), green = Math.min(255, 255 * channel(temp2, temp1, hNormalized)), blue = Math.min(255, 255 * channel(temp2, temp1, hNormalized - phaseThird));
	return {
		r: Math.round(red),
		g: Math.round(green),
		b: Math.round(blue)
	};
}
function hslaToRgba(hsla) {
	const rgbResult = hslToRgb(hsla);
	return {
		a: hsla.a,
		b: rgbResult.b,
		g: rgbResult.g,
		r: rgbResult.r
	};
}
function getRandomRgbColor(min) {
	const fixedMin = min ?? 0, fixedMax = 256, getRgbInRangeValue = () => Math.floor(getRandomInRange(fixedMin, fixedMax));
	return {
		b: getRgbInRangeValue(),
		g: getRgbInRangeValue(),
		r: getRgbInRangeValue()
	};
}
function getStyleFromRgb(color, hdr, opacity) {
	const op = opacity ?? 1;
	return getCachedStyle(`rgb-${color.r.toFixed(rgbFixedPrecision)}-${color.g.toFixed(rgbFixedPrecision)}-${color.b.toFixed(rgbFixedPrecision)}-${hdr ? "hdr" : "sdr"}-${op.toString()}`, () => hdr ? getHdrStyleFromRgb(color, opacity) : getSdrStyleFromRgb(color, opacity));
}
function getHdrStyleFromRgb(color, opacity) {
	return `color(display-p3 ${(color.r / 255).toString()} ${(color.g / 255).toString()} ${(color.b / 255).toString()} / ${(opacity ?? 1).toString()})`;
}
function getSdrStyleFromRgb(color, opacity) {
	return `rgba(${color.r.toString()}, ${color.g.toString()}, ${color.b.toString()}, ${(opacity ?? 1).toString()})`;
}
function getStyleFromHsl(color, hdr, opacity) {
	const op = opacity ?? 1;
	return getCachedStyle(`hsl-${color.h.toFixed(hslFixedPrecision)}-${color.s.toFixed(hslFixedPrecision)}-${color.l.toFixed(hslFixedPrecision)}-${hdr ? "hdr" : "sdr"}-${op.toString()}`, () => hdr ? getHdrStyleFromHsl(color, opacity) : getSdrStyleFromHsl(color, opacity));
}
function getHdrStyleFromHsl(color, opacity) {
	return getHdrStyleFromRgb(hslToRgb(color), opacity);
}
function getSdrStyleFromHsl(color, opacity) {
	return `hsla(${color.h.toString()}, ${color.s.toString()}%, ${color.l.toString()}%, ${(opacity ?? 1).toString()})`;
}
function colorMix(color1, color2, size1, size2) {
	let rgb1 = color1, rgb2 = color2;
	if (!("r" in rgb1)) rgb1 = hslToRgb(color1);
	if (!("r" in rgb2)) rgb2 = hslToRgb(color2);
	return {
		b: mix(rgb1.b, rgb2.b, size1, size2),
		g: mix(rgb1.g, rgb2.g, size1, size2),
		r: mix(rgb1.r, rgb2.r, size1, size2)
	};
}
function getLinkColor(p1, p2, linkColor) {
	if (linkColor === "random") return getRandomRgbColor();
	else if (linkColor === "mid") {
		const sourceColor = p1.getFillColor() ?? p1.getStrokeColor(), destColor = p2?.getFillColor() ?? p2?.getStrokeColor();
		if (sourceColor && destColor && p2) return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
		else {
			const hslColor = sourceColor ?? destColor;
			if (hslColor) return hslToRgb(hslColor);
		}
	} else return linkColor;
}
function getLinkRandomColor(pluginManager, optColor, blink, consent) {
	const color = isString(optColor) ? optColor : optColor.value;
	if (color === "random") {
		if (consent) return rangeColorToRgb(pluginManager, { value: color });
		if (blink) return randomColorValue;
		return "mid";
	} else if (color === "mid") return "mid";
	else return rangeColorToRgb(pluginManager, { value: color });
}
function getHslFromAnimation(animation) {
	return animation === void 0 ? void 0 : {
		h: animation.h.value,
		s: animation.s.value,
		l: animation.l.value
	};
}
function getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {
	const resColor = {
		h: {
			enable: false,
			value: hsl.h,
			min: 0,
			max: 360
		},
		s: {
			enable: false,
			value: hsl.s,
			min: 0,
			max: 100
		},
		l: {
			enable: false,
			value: hsl.l,
			min: 0,
			max: 100
		}
	};
	if (animationOptions) {
		setColorAnimation(resColor.h, animationOptions.h, reduceFactor);
		setColorAnimation(resColor.s, animationOptions.s, reduceFactor);
		setColorAnimation(resColor.l, animationOptions.l, reduceFactor);
	}
	return resColor;
}
function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
	colorValue.enable = colorAnimation.enable;
	colorValue.min = colorAnimation.min;
	colorValue.max = colorAnimation.max;
	if (colorValue.enable) {
		colorValue.velocity = getRangeValue(colorAnimation.speed) / 100 * reduceFactor;
		colorValue.decay = 1 - getRangeValue(colorAnimation.decay);
		colorValue.status = AnimationStatus.increasing;
		colorValue.loops = 0;
		colorValue.maxLoops = getRangeValue(colorAnimation.count);
		colorValue.time = 0;
		colorValue.delayTime = getRangeValue(colorAnimation.delay) * millisecondsToSeconds;
		if (!colorAnimation.sync) {
			colorValue.velocity *= getRandom();
			colorValue.value *= getRandom();
		}
		colorValue.initialValue = colorValue.value;
		colorValue.offset = setRangeValue(colorAnimation.offset);
	} else colorValue.velocity = 0;
}
function updateColorValue(data, decrease, delta) {
	const minLoops = 0, minDelay = 0, identity = 1, minVelocity = 0, minOffset = 0, velocityFactor = 3.6;
	if (!data.enable || (data.maxLoops ?? minLoops) > minLoops && (data.loops ?? minLoops) > (data.maxLoops ?? minLoops)) return;
	data.time ??= 0;
	if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) data.time += delta.value;
	if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) return;
	const offset = data.offset ? randomInRangeValue(data.offset) : minOffset, velocity = (data.velocity ?? minVelocity) * delta.factor + offset * velocityFactor, decay = data.decay ?? identity, max = data.max, min = data.min;
	if (!decrease || data.status === AnimationStatus.increasing) {
		data.value += velocity;
		if (data.value > max) {
			data.loops ??= 0;
			data.loops++;
			if (decrease) data.status = AnimationStatus.decreasing;
			else data.value -= max;
		}
	} else {
		data.value -= velocity;
		if (data.value < min) {
			data.loops ??= 0;
			data.loops++;
			data.status = AnimationStatus.increasing;
		}
	}
	if (data.velocity && decay !== identity) data.velocity *= decay;
	data.value = clamp(data.value, min, max);
}
function updateColor(color, delta) {
	if (!color) return;
	const { h, s, l } = color;
	updateColorValue(h, false, delta);
	updateColorValue(s, true, delta);
	updateColorValue(l, true, delta);
}
function alterHsl(color, type, value) {
	return {
		h: color.h,
		s: color.s,
		l: color.l + (type === AlterType.darken ? -1 : 1) * value
	};
}
//#endregion
//#region node_modules/@tsparticles/engine/browser/index.js
var tsParticles = initEngine();
//#endregion
export { MoveCenter as $, defaultReduceFactor as $n, squareExp as $r, OutModeDirection as $t, paintBase as A, isArray as An, minFpsLimit as Ar, deepExtend as At, ParticlesDensity as B, canvasFirstIndex as Bn, percentDenominator as Br, isInArray as Bt, drawAfterEffect as C, getRangeValue as Cn, lMin as Cr, EventType as Ct, drawShape as D, setAnimationFunctions as Dn, midColorValue as Dr, circleBounce as Dt, drawParticlePlugin as E, randomInRangeValue as En, loadRandomFactor as Er, calculateBounds as Et, ParticlesOptions as F, isObject as Fn, minZ as Fr, getItemsFromInitializer as Ft, Move as G, defaultAngle as Gn, removeMinIndex as Gr, memoize as Gt, ParticlesBounceFactor as H, countOffset as Hn, quarter as Hr, itemFromArray as Ht, ZIndex as I, isString as In, minimumSize as Ir, getPosition as It, MovePath as J, defaultFps as Jn, sMax as Jr, safeMatchMedia as Jt, Spin as K, defaultCompositeValue as Kn, resizeEvent as Kr, safeDocument as Kt, Shape as L, Vector as Ln, none as Lr, getSize as Lt, Options as M, isFunction as Mn, minLimit as Mr, findItemFromSingleOrMultiple as Mt, loadOptions as N, isNull as Nn, minStrokeWidth as Nr, getFullScreenStyle as Nt, drawShapeAfterDraw as O, setRandom as On, millisecondsToSeconds as Or, circleBounceDataFromParticle as Ot, loadParticlesOptions as P, isNumber as Pn, minVelocity as Pr, getItemMapFromInitializer as Pt, MoveGravity as Q, defaultRatio as Qn, spatialHashGridCellSize as Qr, PixelMode as Qt, ParticlesNumber as R, Vector3d as Rn, one as Rr, hasMatchMedia as Rt, clear as S, getRangeMin as Sn, lMax as Sr, setLogger as St, drawParticle as T, parseAlpha as Tn, loadMinIndex as Tr, arrayRandomIndex as Tt, Paint as U, decayOffset as Un, randomColorValue as Ur, itemFromSingleOrMultiple as Ut, ParticlesBounce as V, canvasTag as Vn, phaseNumerator as Vr, isPointInside as Vt, Stroke as W, defaultAlpha as Wn, removeDeleteCount as Wr, manageListener as Wt, RangedAnimationValueWithRandom as X, defaultLoops as Xn, sNormalizedOffset as Xr, updateAnimation as Xt, AnimationValueWithRandom as Y, defaultFpsLimit as Yn, sMin as Yr, safeMutationObserver as Yt, ValueWithRandom as Z, defaultOpacity as Zn, sextuple as Zr, StartValueType as Zt, rgbToHsl as _, getParticleBaseVelocity as _n, hPhase as _r, RotateDirection as _t, colorToRgb as a, calcExactPositionOrRandomFromSizeRanged as an, defaultTransformValue as ar, AnimatableColor as at, updateColor as b, getRandomInRange as bn, inverseFactorNumerator as br, Rectangle as bt, getLinkColor as c, calcPositionOrRandomFromSizeRanged as cn, deleteCount as cr, ColorAnimation as ct, getStyleFromHsl as d, clamp as dn, empty as dr, EasingType as dt, threeQuarter as ei, DestroyType as en, defaultRemoveQuantity as er, MoveAngle as et, getStyleFromRgb as f, collisionVelocity as fn, generatedAttribute as fr, ParticleOutType as ft, rangeColorToRgb as g, getDistances as gn, hMin as gr, LimitMode as gt, rangeColorToHsl as h, getDistanceSq as hn, hMax as hr, OutMode as ht, colorToHsl as i, zIndexFactorOffset as ii, calcExactPositionOrRandomFromSize as in, defaultTransform as ir, Background as it, paintImage as j, isBoolean as jn, minIndex as jr, executeOnSingleOrMultiple as jt, drawShapeBeforeDraw as k, setRangeValue as kn, minCount as kr, cloneStyle as kt, getLinkRandomColor as l, cancelAnimation as ln, double as lr, AnimationOptions as lt, hslaToRgba as m, getDistance as mn, generatedTrue as mr, AlterType as mt, alterHsl as n, tryCountIncrement as ni, AnimationMode as nn, defaultRgbMin as nr, ResizeEvent as nt, getHslAnimationFromHsl as o, calcPositionFromSize as on, defaultVelocity as or, OptionsColor as ot, hslToRgb as p, degToRad as pn, generatedFalse as pr, GradientType as pt, OutModes as q, defaultDensityFactor as qn, rgbMax as qr, safeIntersectionObserver as qt, colorMix as r, visibilityChangeEvent as ri, animate as rn, defaultTime as rr, FullScreen as rt, getHslFromAnimation as s, calcPositionOrRandomFromSize as sn, defaultZoom as sr, HslAnimation as st, tsParticles as t, triple as ti, AnimationStatus as tn, defaultRetryCount as tr, Fill as tt, getRandomRgbColor as u, checkDistance as un, doublePI as ur, RangedAnimationOptions as ut, stringToAlpha as v, getParticleDirectionAngle as vn, half as vr, BaseRange as vt, drawBeforeEffect as w, mix as wn, lengthOffset as wr, areBoundsInside as wt, updateColorValue as x, getRangeMax as xn, lFactor as xr, getLogger as xt, stringToRgb as y, getRandom as yn, identity as yr, Circle as yt, ParticlesNumberLimit as z, MoveDirection as zn, originPoint as zr, initParticleNumericAnimationValue as zt };

//# sourceMappingURL=browser-BxZifKFO.js.map