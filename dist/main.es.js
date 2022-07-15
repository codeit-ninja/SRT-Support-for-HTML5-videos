var o = Object.defineProperty;
var c = (n, e, t) => e in n ? o(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var s = (n, e, t) => (c(n, typeof e != "symbol" ? e + "" : e, t), t);
class d {
  constructor(e, t, i, r) {
    s(this, "number");
    s(this, "startTime");
    s(this, "endTime");
    s(this, "text");
    this.number = e, this.startTime = t, this.endTime = i, this.text = r;
  }
}
function l(n) {
  const e = {
    number: parseInt(n.match(/^\d+/g)[0]),
    timing: {
      start: n.match(/(\d+:){2}\d+,\d+/g)[0].replace(",", "."),
      end: n.match(/(\d+:){2}\d+,\d+/g)[1].replace(",", ".")
    },
    text: n.split(/\r?\n/g).slice(2, n.split(/\r?\n/g).length).join(`
`)
  };
  return new d(e.number, a(e.timing.start), a(e.timing.end), e.text);
}
function a(n) {
  for (var e = n.split(":"), t = 0, i = 1; e.length > 0; )
    t += i * parseFloat(e.pop(), 10), i *= 60;
  return t;
}
class h {
  constructor(e) {
    s(this, "src");
    s(this, "encoding");
    s(this, "lang");
    s(this, "kind");
    s(this, "label");
    s(this, "default");
    s(this, "content");
    s(this, "needsTransform");
    s(this, "cues", []);
    this.src = e.src, this.encoding = e.dataset.encoding, this.lang = e.srclang, this.kind = e.kind, this.label = e.label, this.default = e.default, this.needsTransform = !0, this.src.endsWith(".vtt") && (this.needsTransform = !1);
  }
  async parse() {
    const e = new TextDecoder(this.encoding), i = await (await fetch(this.src)).arrayBuffer();
    this.content = e.decode(i), this.cues = this.content.split(/\r?\n\r?\n/g).map(l);
  }
}
async function f(n) {
  [...n.querySelectorAll("track")].map((t) => new h(t)).forEach(async (t) => {
    if (!t.needsTransform)
      return;
    await t.parse();
    const i = n.addTextTrack(t.kind, t.label, t.lang);
    t.cues.forEach((r) => i.addCue(new VTTCue(r.startTime, r.endTime, r.text))), t.default && (i.mode = "showing"), console.log(t);
  });
}
export {
  a as hmsToSeconds,
  l as toVttCue,
  f as transformSrtTracks
};
