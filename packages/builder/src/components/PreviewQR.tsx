import { QRCodeSVG } from "qrcode.react";

interface PreviewQRProps {
  url: string;
  onClose: () => void;
}

export function PreviewQR({ url, onClose }: PreviewQRProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 text-center" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-gray-900 font-semibold mb-1">Preview on Device</h2>
        <p className="text-gray-500 text-xs mb-4">Scan with your phone to see the live preview</p>
        <div className="bg-white p-3 rounded-lg inline-block">
          <QRCodeSVG value={url} size={200} />
        </div>
        <p className="text-gray-400 text-xs mt-3 truncate max-w-[200px]">{url}</p>
        <button onClick={onClose} className="mt-4 px-4 py-1.5 bg-gray-900 text-white rounded-lg text-sm">Close</button>
      </div>
    </div>
  );
}
