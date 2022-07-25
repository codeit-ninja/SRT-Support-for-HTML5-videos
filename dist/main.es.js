var c = Object.defineProperty;
var d = (n, t, e) => t in n ? c(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var s = (n, t, e) => (d(n, typeof t != "symbol" ? t + "" : t, e), e);
class o {
  constructor(t, e, r, i) {
    s(this, "number");
    s(this, "startTime");
    s(this, "endTime");
    s(this, "text");
    this.number = t, this.startTime = e, this.endTime = r, this.text = i;
  }
}
function l(n) {
  const t = {
    number: parseInt(n.match(/^\d+/g)[0]),
    timing: {
      start: n.match(/(\d+:){2}\d+,\d+/g)[0].replace(",", "."),
      end: n.match(/(\d+:){2}\d+,\d+/g)[1].replace(",", ".")
    },
    text: n.split(/\r?\n/g).slice(2, n.split(/\r?\n/g).length).join(`
`)
  };
  return new o(t.number, a(t.timing.start), a(t.timing.end), t.text);
}
function a(n) {
  let t = n.split(":"), e = 0, r = 1;
  for (; t.length > 0; )
    e += r * parseFloat(t.pop(), 10), r *= 60;
  return e;
}
async function h(n, t = "utf-8") {
  return fetch(n).then((e) => e.arrayBuffer()).then((e) => new TextDecoder(t).decode(e));
}
function f(n) {
  return `WEBVTT

` + n.split(/\n/g).map((t) => t.replace(/((\d+:){0,2}\d+),(\d+)/g, "$1.$3")).join(`
`);
}
class m {
  constructor(t) {
    s(this, "src");
    s(this, "encoding");
    s(this, "lang");
    s(this, "kind");
    s(this, "label");
    s(this, "default");
    s(this, "body");
    s(this, "needsTransform");
    s(this, "cues", []);
    this.src = t.src, this.encoding = t.dataset.encoding, this.lang = t.srclang, this.kind = t.kind, this.label = t.label, this.default = t.default, this.needsTransform = !this.src.endsWith(".vtt");
  }
  async parse() {
    this.body = await h(this.src), this.cues = this.body.split(/\r?\n\r?\n/g).map(l);
  }
}
async function g(n) {
  const t = [...n.querySelectorAll("track")].map((e) => new m(e));
  for (const e of t) {
    if (!e.needsTransform)
      continue;
    await e.parse();
    const r = n.addTextTrack(e.kind, e.label, e.lang);
    e.cues.forEach((i) => r.addCue(new VTTCue(i.startTime, i.endTime, i.text))), e.default && (r.mode = "showing");
  }
}
export {
  h as fetchTrack,
  a as hmsToSeconds,
  f as srt2vtt,
  l as toVttCue,
  g as transformSrtTracks
};
