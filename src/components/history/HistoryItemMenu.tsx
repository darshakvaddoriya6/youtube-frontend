import {
  ListPlus,
  Clock,
  Bookmark,
  Download,
  Share2,
} from "lucide-react";

interface HistoryItemMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HistoryItemMenu = ({ isOpen, onClose }: HistoryItemMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose}></div>
      <div className="absolute right-0 top-10 z-20 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2">
        <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
          <ListPlus className="h-5 w-5" />
          <span>Add to queue</span>
        </button>
        <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
          <Clock className="h-5 w-5" />
          <span>Save to Watch later</span>
        </button>
        <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
          <Bookmark className="h-5 w-5" />
          <span>Save to playlist</span>
        </button>
        <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
          <Download className="h-5 w-5" />
          <span>Download</span>
        </button>
        <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
          <Share2 className="h-5 w-5" />
          <span>Share</span>
        </button>
      </div>
    </>
  );
};

export default HistoryItemMenu;
