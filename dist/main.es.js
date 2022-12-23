var c = Object.defineProperty;
var o = (e, t, n) => t in e ? c(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var s = (e, t, n) => (o(e, typeof t != "symbol" ? t + "" : t, n), n);
class d {
  constructor(t, n, r, a) {
    s(this, "number");
    s(this, "startTime");
    s(this, "endTime");
    s(this, "text");
    this.number = t, this.startTime = n, this.endTime = r, this.text = a;
  }
}
function l(e) {
  try {
    if (!e || e === " ")
      return !1;
    const t = {
      number: parseInt(e.match(/^\d+/g)[0]),
      timing: {
        start: e.match(/(\d+:){2}\d+,\d+/g)[0].replace(",", "."),
        end: e.match(/(\d+:){2}\d+,\d+/g)[1].replace(",", ".")
      },
      text: e.split(/\r?\n/g).slice(2, e.split(/\r?\n/g).length).join(`
`)
    };
    return new d(t.number, i(t.timing.start), i(t.timing.end), t.text);
  } catch {
    return !1;
  }
}
function i(e) {
  let t = e.split(":"), n = 0, r = 1;
  for (; t.length > 0; )
    n += r * parseFloat(t.pop(), 10), r *= 60;
  return n;
}
async function h(e, t = "utf-8") {
  return (!t || t === "") && (t = "utf-8"), fetch(e).then((n) => n.arrayBuffer()).then((n) => new TextDecoder(t).decode(n));
}
function u(e) {
  return `WEBVTT

` + e.split(/\n/g).map((t) => t.replace(/((\d+:){0,2}\d+),(\d+)/g, "$1.$3")).join(`
`);
}
class f {
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
    this.src = t.src, this.encoding = t.dataset.encoding, this.lang = t.srclang, this.kind = t.kind, this.label = t.label, this.default = t.default, this.needsTransform = !this.src.toLowerCase().endsWith(".vtt");
  }
  async parse() {
    this.body = await h(this.src, this.encoding), this.cues = this.body.split(/\r?\n\r?\n/g).map(l).filter(Boolean);
  }
}
async function T(e) {
  const t = [...e.querySelectorAll("track")].map((n) => new f(n));
  for (const n of t) {
    if (!n.needsTransform)
      continue;
    await n.parse();
    const r = e.addTextTrack(n.kind, n.label, n.lang);
    n.cues.forEach((a) => r.addCue(new VTTCue(a.startTime, a.endTime, a.text))), n.default && (r.mode = "showing");
  }
}
export {
  h as fetchTrack,
  i as hmsToSeconds,
  u as srt2vtt,
  l as toVttCue,
  T as transformSrtTracks
};
