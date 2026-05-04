import { useEffect, useState } from "react";

const AGE_KEY = "bt_age_confirmed";

interface AgeGateProps {
  onConfirm: () => void;
}

export default function AgeGate({ onConfirm }: AgeGateProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const confirmed = localStorage.getItem(AGE_KEY);
    if (!confirmed) {
      setVisible(true);
    } else {
      onConfirm();
    }
  }, [onConfirm]);

  function handleConfirm() {
    localStorage.setItem(AGE_KEY, "1");
    setVisible(false);
    onConfirm();
  }

  function handleDecline() {
    window.location.href = "https://www.google.com";
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="bg-gray-900 border border-yellow-500/40 rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
        <div className="text-5xl mb-4">🔞</div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">Age Verification</h2>
        <p className="text-gray-300 mb-2 text-sm">
          This website contains adult content intended for mature audiences only.
        </p>
        <p className="text-gray-400 mb-6 text-sm">
          By entering, you confirm you are <strong className="text-white">18 years of age or older</strong> and
          consent to viewing adult-oriented material.
        </p>
        <div className="text-xs text-gray-500 mb-6 border border-gray-700 rounded-lg p-3 text-left">
          <strong className="text-gray-400">Synthetic Performer Disclosure</strong><br />
          All performers in Blazing Tails magazines are 100% AI-generated fictional characters.
          They are not based on any real person's likeness. Compliant with the NY AI Transparency Act (effective June 9, 2026).
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="flex-1 py-3 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-800 transition-colors text-sm"
          >
            I am under 18
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-lg bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-colors text-sm"
          >
            I am 18+ — Enter
          </button>
        </div>
      </div>
    </div>
  );
}
