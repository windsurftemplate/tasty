// Tweaks island — writes CSS vars on <html>. Page itself is vanilla.
// (Light/dark is handled by the header toggle + localStorage, not here.)
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "flavor": ["#7C3A8E", "#5E2A6C"],
  "grain": true,
  "displayFont": "Bricolage Grotesque"
}/*EDITMODE-END*/;

const FLAVORS = {
  grape:  ["#7C3A8E", "#5E2A6C"],
  berry:  ["#C0356B", "#922650"],
  citrus: ["#D98A1F", "#B06E12"],
  mint:   ["#2F9E78", "#1F6E54"],
};

// fonts that should render lighter (single-weight serif) vs heavier grotesques
const LIGHT_DISPLAY = { "Instrument Serif": true };

function applyTweaks(t) {
  const root = document.documentElement;
  const [a, deep] = Array.isArray(t.flavor) ? t.flavor : FLAVORS.grape;
  root.style.setProperty('--accent', a);
  root.style.setProperty('--accent-deep', deep);
  root.style.setProperty('--accent-soft', hexA(a, 0.12));
  root.style.setProperty('--grain', t.grain ? 1 : 0);
  root.style.setProperty('--display', `"${t.displayFont}", ${LIGHT_DISPLAY[t.displayFont] ? 'Georgia, serif' : '"Hanken Grotesk", sans-serif'}`);
  root.style.setProperty('--display-weight', LIGHT_DISPLAY[t.displayFont] ? 400 : 650);
}
function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => applyTweaks(t), [t]);
  return (
    <TweaksPanel>
      <TweakSection label="Flavor accent" />
      <TweakColor
        label="Accent"
        value={t.flavor}
        options={[FLAVORS.grape, FLAVORS.berry, FLAVORS.citrus, FLAVORS.mint]}
        onChange={(v) => setTweak('flavor', v)}
      />
      <TweakSection label="Typography" />
      <TweakSelect
        label="Display font"
        value={t.displayFont}
        options={['Bricolage Grotesque', 'Instrument Serif']}
        onChange={(v) => setTweak('displayFont', v)}
      />
      <TweakSection label="Texture" />
      <TweakToggle label="Paper grain" value={t.grain} onChange={(v) => setTweak('grain', v)} />
    </TweaksPanel>
  );
}

// apply persisted/default tweaks immediately (defaults block is rewritten on save)
applyTweaks(TWEAK_DEFAULTS);

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<App />);
