import React from "react";
import { Button } from "./ui/button"; 
import { toast } from "sonner";

interface ReferralButtonsProps {
  code: string;
}

const ReferralButtons: React.FC<ReferralButtonsProps> = ({ code }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
      .then(() => toast.success("Referral code copied!"))
      .catch(() => toast.error("Failed to copy code."));
  };

  const handleShare = () => {
    const shareText = `Use my referral code: ${code}`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: "My Referral Code",
        text: shareText,
        url: shareUrl,
      })
        .then(() => toast.success("Shared successfully!"))
        .catch(() => toast.error("Share cancelled or failed."));
    } else {
      // Fallback: open WhatsApp share
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        shareText + " " + shareUrl
      )}`;
      window.open(whatsappUrl, "_blank");
      toast("WhatsApp share opened!");
    }
  };

  return (
    <div className="flex gap-3">
      <Button className="bg-green-500 text-white" onClick={handleCopy}>
        Copy Code
      </Button>
      <Button className="bg-blue-500 text-white" onClick={handleShare}>
        Share Code
      </Button>
    </div>
  );
};

export default ReferralButtons;
