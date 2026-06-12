import { Cn as getRangeValue, c as getLinkColor, f as getStyleFromRgb, g as rangeColorToRgb, yn as getRandom, zr as originPoint } from "./browser-BxZifKFO.js";
//#region node_modules/@tsparticles/interaction-particles-links/browser/Utils.js
function getLinkKey(ids) {
	return [...ids].sort((a, b) => a - b).join("_");
}
function setLinkFrequency(particles, dictionary) {
	const key = getLinkKey(particles.map((t) => t.id));
	let res = dictionary.get(key);
	if (res === void 0) {
		res = getRandom();
		dictionary.set(key, res);
	}
	return res;
}
//#endregion
//#region node_modules/@tsparticles/interaction-particles-links/browser/LinkInstance.js
var minOpacity = 0, minWidth = 0, minDistance = 0, maxFrequency = 1, defaultFrequency = 0;
var LinkInstance = class {
	#colorCache = /* @__PURE__ */ new Map();
	#container;
	#freqs;
	#pluginManager;
	constructor(pluginManager, container) {
		this.#pluginManager = pluginManager;
		this.#container = container;
		this.#freqs = {
			links: /* @__PURE__ */ new Map(),
			triangles: /* @__PURE__ */ new Map()
		};
	}
	drawParticle(context, particle) {
		const { links, options } = particle;
		if (!links?.length || !options.links) return;
		const linkOpts = options.links, width = particle.retina.linksWidth ?? minWidth, pos1 = particle.getPosition(), twinkle = particle.options["twinkle"]?.links, trianglesEnabled = linkOpts.triangles.enable, p1Destinations = trianglesEnabled ? new Set(links.map((l) => l.destination.id)) : null, originalAlpha = context.globalAlpha;
		let currentColorStyle = "", currentWidth = -1, currentAlpha = -1, pathOpen = false;
		const flushLines = () => {
			if (pathOpen) {
				context.stroke();
				pathOpen = false;
			}
		};
		for (const link of links) {
			if (linkOpts.frequency < maxFrequency && this.#getLinkFrequency(particle, link.destination) > linkOpts.frequency) continue;
			const pos2 = link.destination.getPosition();
			if (trianglesEnabled && !link.isWarped && p1Destinations) {
				flushLines();
				this.#drawTriangles(options, particle, link, p1Destinations, pos1, pos2, context);
			}
			if (link.opacity <= minOpacity || width <= minWidth) continue;
			if (!linkOpts.enable) continue;
			let opacity = link.opacity, colorLine = link.color;
			const twinkleRgb = twinkle?.enable && getRandom() < twinkle.frequency ? rangeColorToRgb(this.#pluginManager, twinkle.color) : void 0;
			if (twinkle && twinkleRgb) {
				colorLine = twinkleRgb;
				opacity = getRangeValue(twinkle.opacity);
			}
			if (!colorLine) {
				const linkColor = linkOpts.id !== void 0 ? this.#container.particles.linksColors.get(linkOpts.id) : this.#container.particles.linksColor;
				colorLine = getLinkColor(particle, link.destination, linkColor);
			}
			if (!colorLine) continue;
			const colorStyle = this.#getCachedStyle(colorLine);
			if (colorStyle !== currentColorStyle || width !== currentWidth || opacity !== currentAlpha) {
				flushLines();
				context.strokeStyle = colorStyle;
				context.lineWidth = width;
				context.globalAlpha = opacity;
				currentColorStyle = colorStyle;
				currentWidth = width;
				currentAlpha = opacity;
				context.beginPath();
				pathOpen = true;
			}
			if (link.isWarped) {
				const canvasSize = this.#container.canvas.size, dx = pos2.x - pos1.x, dy = pos2.y - pos1.y;
				let sx = originPoint.x, sy = originPoint.y;
				if (Math.abs(dx) > canvasSize.width * .5) sx = dx > minDistance ? -canvasSize.width : canvasSize.width;
				if (Math.abs(dy) > canvasSize.height * .5) sy = dy > minDistance ? -canvasSize.height : canvasSize.height;
				context.moveTo(pos1.x, pos1.y);
				context.lineTo(pos2.x + sx, pos2.y + sy);
				context.moveTo(pos1.x - sx, pos1.y - sy);
				context.lineTo(pos2.x, pos2.y);
			} else {
				context.moveTo(pos1.x, pos1.y);
				context.lineTo(pos2.x, pos2.y);
			}
		}
		flushLines();
		context.globalAlpha = originalAlpha;
	}
	init() {
		this.#freqs.links.clear();
		this.#freqs.triangles.clear();
		this.#colorCache.clear();
		return Promise.resolve();
	}
	particleCreated(particle) {
		particle.links = [];
		if (!particle.options.links) return;
		particle.linksDistance = particle.options.links.distance;
		particle.linksWidth = particle.options.links.width;
		const ratio = this.#container.retina.pixelRatio;
		particle.retina.linksDistance = particle.linksDistance * ratio;
		particle.retina.linksWidth = particle.linksWidth * ratio;
	}
	particleDestroyed(particle) {
		particle.links = [];
	}
	#drawTriangles(options, p1, link, p1Destinations, pos1, pos2, context) {
		const p2 = link.destination, triangleOptions = options.links?.triangles;
		if (!triangleOptions?.enable || !p2.options.links?.triangles.enable) return;
		const p2Links = p2.links;
		if (!p2Links?.length) return;
		for (const vertex of p2Links) {
			if (vertex.isWarped || this.#getLinkFrequency(p2, vertex.destination) > p2.options.links.frequency || !p1Destinations.has(vertex.destination.id)) continue;
			const p3 = vertex.destination;
			if (this.#getTriangleFrequency(p1, p2, p3) > (options.links?.triangles.frequency ?? defaultFrequency)) continue;
			const opacityTriangle = triangleOptions.opacity ?? (link.opacity + vertex.opacity) * .5, colorTriangle = rangeColorToRgb(this.#pluginManager, triangleOptions.color) ?? link.color;
			if (!colorTriangle || opacityTriangle <= minOpacity) continue;
			const pos3 = p3.getPosition();
			context.save();
			context.fillStyle = this.#getCachedStyle(colorTriangle);
			context.globalAlpha = opacityTriangle;
			context.beginPath();
			context.moveTo(pos1.x, pos1.y);
			context.lineTo(pos2.x, pos2.y);
			context.lineTo(pos3.x, pos3.y);
			context.closePath();
			context.fill();
			context.restore();
		}
	}
	#getCachedStyle(rgb) {
		const key = `${rgb.r},${rgb.g},${rgb.b}`;
		let style = this.#colorCache.get(key);
		if (!style) {
			style = getStyleFromRgb(rgb, this.#container.hdr);
			this.#colorCache.set(key, style);
		}
		return style;
	}
	#getLinkFrequency(p1, p2) {
		return setLinkFrequency([p1, p2], this.#freqs.links);
	}
	#getTriangleFrequency(p1, p2, p3) {
		return setLinkFrequency([
			p1,
			p2,
			p3
		], this.#freqs.triangles);
	}
};
//#endregion
export { LinkInstance };

//# sourceMappingURL=LinkInstance-DBP-A9la.js.map