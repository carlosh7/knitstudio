import { useI18n } from "../i18n";
const presets = [
  { name: "iPhone 14 Pro", width: 390, height: 844 },
  { name: "iPhone 14 Pro Max", width: 430, height: 932 },
  { name: "iPad Pro 11", width: 834, height: 1194 },
  { name: "iPad Pro 12.9", width: 1024, height: 1366 },
  { name: "Pixel 7", width: 412, height: 915 },
  { name: "Galaxy S23", width: 360, height: 780 },
  { name: "Desktop HD", width: 1920, height: 1080 },
  { name: "Desktop 1440", width: 1440, height: 900 },
  { name: "Laptop 1280", width: 1280, height: 800 },
];

interface ViewportPresetsProps {
  currentWidth: number;
  onSelect: (w: number, h: number) => void;
  onClose: () => void;
}

export function ViewportPresets({ currentWidth, onSelect, onClose }: ViewportPresetsProps) {
  const { t } = useI18n();
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-knit-bg-alt border border-knit-border rounded-xl p-5 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-knit-text font-semibold mb-4">Viewport Presets</h2>
        <div className="space-y-1">
          {presets.map((p) => (
            <button
              key={p.name}
              onClick={() => { onSelect(p.width, p.height); onClose(); }}
              className={`w-full text-left px-3 py-2 text-sm rounded-md transition ${
                currentWidth === p.width ? "bg-knit-primary text-white" : "text-knit-text hover:bg-knit-bg-hover"
              }`}
            >
              <span>{p.name}</span>
              <span className="text-xs text-knit-text-muted ml-2">{p.width}×{p.height}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
