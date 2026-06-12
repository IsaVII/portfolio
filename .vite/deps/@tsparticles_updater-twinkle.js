import { Cn as getRangeValue, Nn as isNull, d as getStyleFromHsl, h as rangeColorToHsl, kn as setRangeValue, ot as OptionsColor, yn as getRandom } from "./browser-BxZifKFO.js";
//#region node_modules/@tsparticles/updater-twinkle/browser/Options/Classes/TwinkleLinksValues.js
var TwinkleLinksValues = class {
	color;
	enable;
	frequency;
	opacity;
	constructor() {
		this.enable = false;
		this.frequency = .05;
		this.opacity = 1;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.color !== void 0) this.color = OptionsColor.create(this.color, data.color);
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.frequency !== void 0) this.frequency = data.frequency;
		if (data.opacity !== void 0) this.opacity = setRangeValue(data.opacity);
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-twinkle/browser/Options/Classes/TwinkleParticlesValues.js
var TwinkleParticlesValues = class {
	enable;
	fillColor;
	frequency;
	opacity;
	strokeColor;
	constructor() {
		this.enable = false;
		this.frequency = .05;
		this.opacity = 1;
	}
	load(data) {
		if (isNull(data)) return;
		if (data.fillColor !== void 0) this.fillColor = OptionsColor.create(this.fillColor, data.fillColor);
		if (data.strokeColor !== void 0) this.strokeColor = OptionsColor.create(this.strokeColor, data.strokeColor);
		if (data.enable !== void 0) this.enable = data.enable;
		if (data.frequency !== void 0) this.frequency = data.frequency;
		if (data.opacity !== void 0) this.opacity = setRangeValue(data.opacity);
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-twinkle/browser/Options/Classes/Twinkle.js
var Twinkle = class {
	links;
	particles;
	constructor() {
		this.links = new TwinkleLinksValues();
		this.particles = new TwinkleParticlesValues();
	}
	load(data) {
		if (isNull(data)) return;
		this.links.load(data.links);
		this.particles.load(data.particles);
	}
};
//#endregion
//#region node_modules/@tsparticles/updater-twinkle/browser/TwinkleUpdater.js
var TwinkleUpdater = class {
	#container;
	#pluginManager;
	constructor(pluginManager, container) {
		this.#pluginManager = pluginManager;
		this.#container = container;
	}
	getColorStyles(particle, _context, _radius, opacity) {
		const pOptions = particle.options, container = this.#container, twinkleOptions = pOptions["twinkle"];
		if (!twinkleOptions) return {};
		const twinkle = twinkleOptions.particles, twinkling = twinkle.enable && getRandom() < twinkle.frequency, zIndexOptions = particle.options.zIndex, zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate, twinklingOpacity = twinkling ? getRangeValue(twinkle.opacity) * zOpacityFactor : opacity, twinkleFillRgb = rangeColorToHsl(this.#pluginManager, twinkle.fillColor), twinkleStrokeRgb = rangeColorToHsl(this.#pluginManager, twinkle.strokeColor), getTwinkleFillStyle = () => {
			if (!twinkleFillRgb) return;
			return getStyleFromHsl(twinkleFillRgb, container.hdr, twinklingOpacity);
		}, getTwinkleStrokeStyle = () => {
			if (!twinkleStrokeRgb) return;
			return getStyleFromHsl(twinkleStrokeRgb, container.hdr, twinklingOpacity);
		}, twinkleFillStyle = getTwinkleFillStyle(), twinkleStrokeStyle = getTwinkleStrokeStyle(), res = {}, needsTwinkle = twinkling && (!!twinkleFillStyle || !!twinkleStrokeStyle);
		res.fill = needsTwinkle ? twinkleFillStyle : void 0;
		res.stroke = needsTwinkle ? twinkleStrokeStyle : void 0;
		return res;
	}
	init() {}
	isEnabled(particle) {
		const twinkleOptions = particle.options.twinkle;
		if (!twinkleOptions) return false;
		return twinkleOptions.particles.enable;
	}
	loadOptions(options, ...sources) {
		options.twinkle ??= new Twinkle();
		for (const source of sources) options.twinkle.load(source?.twinkle);
	}
	update() {}
};
//#endregion
//#region node_modules/@tsparticles/updater-twinkle/browser/index.js
async function loadTwinkleUpdater(engine) {
	engine.checkVersion("4.1.3");
	await engine.pluginManager.register((e) => {
		e.pluginManager.addParticleUpdater("twinkle", (container) => {
			return Promise.resolve(new TwinkleUpdater(e.pluginManager, container));
		});
	});
}
//#endregion
export { loadTwinkleUpdater };

//# sourceMappingURL=@tsparticles_updater-twinkle.js.map