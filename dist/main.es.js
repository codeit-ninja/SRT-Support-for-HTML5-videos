var c = Object.defineProperty;
var o = (n, t, e) => t in n ? c(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var s = (n, t, e) => (o(n, typeof t != "symbol" ? t + "" : t, e), e);
class l {
  /**
   *
   * @param {number} number
   * @param {number} startTime
   * @param {number} endTime
   * @param {string} text
   */
  constructor(t, e, r, i) {
    /**
     * @readonly
     * @type {number}
     */
    s(this, "number");
    /**
     * @readonly
     * @type {number}
     */
    s(this, "startTime");
    /**
     * @readonly
     * @type {number}
     */
    s(this, "endTime");
    /**
     * @readonly
     * @type {string}
     */
    s(this, "text");
    this.number = t, this.startTime = e, this.endTime = r, this.text = i;
  }
}
function d(n) {
  try {
    if (!n || n === " ")
      return !1;
    const t = {
      number: parseInt(n.match(/^\d+/g)[0]),
      timing: {
        start: n.match(/(\d+:){2}\d+,\d+/g)[0].replace(",", "."),
        end: n.match(/(\d+:){2}\d+,\d+/g)[1].replace(",", ".")
      },
      text: n.split(/\r?\n/g).slice(2, n.split(/\r?\n/g).length).join(`
`)
    };
    return new l(t.number, a(t.timing.start), a(t.timing.end), t.text);
  } catch {
    return !1;
  }
}
function a(n) {
  let t = n.split(":"), e = 0, r = 1;
  for (; t.length > 0; )
    e += r * parseFloat(t.pop(), 10), r *= 60;
  return e;
}
async function h(n, t = "utf-8") {
  return (!t || t === "") && (t = "utf-8"), fetch(n).then((e) => e.arrayBuffer()).then((e) => new TextDecoder(t).decode(e));
}
function u(n) {
  return `WEBVTT

` + n.split(/\n/g).map((t) => t.replace(/((\d+:){0,2}\d+),(\d+)/g, "$1.$3")).join(`
`);
}
class m {
  /**
   * Parses a `HTMLTrackElement`
   * 
   * @param {HTMLTrackElement} track 
   */
  constructor(t) {
    /**
     * @readonly
     * @type {HTMLTrackElement}
     */
    s(this, "element");
    /**
     * @readonly
     * @type {string}
     */
    s(this, "src");
    /**
     * @readonly
     * @type {string}
     */
    s(this, "encoding");
    /**
     * @readonly
     * @type {string}
     */
    s(this, "lang");
    /**
     * @readonly
     * @type {string}
     */
    s(this, "kind");
    /**
     * @readonly
     * @type {string}
     */
    s(this, "label");
    /**
     * @readonly
     * @type {boolean}
     */
    s(this, "default");
    /**
     * @readonly
     * @type {string}
     */
    s(this, "body");
    /**
     * @readonly
     * @type {boolean}
     */
    s(this, "needsTransform");
    /**
     * @readonly
     * @type {Cue[]}
     */
    s(this, "cues", []);
    this.element = t, this.src = t.src, this.encoding = t.dataset.encoding, this.lang = t.srclang, this.kind = t.kind, this.label = t.label, this.default = t.default, this.needsTransform = !this.src.toLowerCase().endsWith(".vtt");
  }
  async parse() {
    this.body = await h(this.src, this.encoding), this.cues = this.body.split(/\r?\n\r?\n/g).map(d).filter(Boolean);
  }
}
async function T(n) {
  const t = [...n.querySelectorAll("track")].map((e) => new m(e));
  for (const e of t) {
    if (!e.needsTransform)
      continue;
    await e.parse(), e.element.remove();
    const r = n.addTextTrack(e.kind, e.label, e.lang);
    e.cues.forEach((i) => r.addCue(new VTTCue(i.startTime, i.endTime, i.text))), e.default && (r.mode = "showing");
  }
}
export {
  h as fetchTrack,
  a as hmsToSeconds,
  u as srt2vtt,
  d as toVttCue,
  T as transformSrtTracks
};
