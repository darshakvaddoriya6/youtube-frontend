import Link from "next/link";
import { MoreVertical, X } from "lucide-react";
import { formatDuration, formatViews } from "@/lib/utils";
import HistoryItemMenu from "./HistoryItemMenu";

interface HistoryItemProps {
  item: any;
  onVideoClick: (video: any) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
  activeMenu: string | null;
  onToggleMenu: (id: string) => void;
  onCloseMenu: () => void;
}

const HistoryItem = ({
  item,
  onVideoClick,
  onDelete,
  deletingId,
  activeMenu,
  onToggleMenu,
  onCloseMenu,
}: HistoryItemProps) => {
  const video = item.video || item;
  
  if (!video) return null;

  return (
    <div className="flex items-start gap-4 group">
      {/* Thumbnail */}
      <div
        className="relative flex-shrink-0 cursor-pointer w-60"
        onClick={() => onVideoClick(video)}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-60 h-36 object-cover rounded-lg hover:opacity-90 transition-opacity"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-90 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
          {video.duration ? formatDuration(video.duration) : "0:00"}
        </div>
      </div>

      {/* Video Info */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-medium w-fit text-base text-gray-900 mb-1 cursor-pointer hover:text-gray-700 line-clamp-2"
          onClick={() => onVideoClick(video)}
        >
          {video.title}
        </h3>
        {video.owner?.username ? (
          <Link
            href={`/channel/${video.owner.username}`}
            className="text-sm text-gray-600 mb-1 hover:text-red-600 block w-fit"
          >
            {video.owner?.fullName || video.owner?.username || "Unknown Channel"}
          </Link>
        ) : (
          <p className="text-sm text-gray-600 mb-1">
            {video.owner?.fullName || video.owner?.username || "Unknown Channel"}
          </p>
        )}
        <div className="flex items-center text-sm text-gray-600">
          <span>{video.views ? formatViews(video.views) : "0 views"}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative flex-shrink-0 flex">
        <button
          onClick={() => onDelete(item._id)}
          disabled={deletingId === item._id}
          className="w-full px-4 py-2.5 text-left hover:bg-red-100 flex items-center gap-3 text-sm"
        >
          <X className="h-5 w-5" />
        </button>
        <button
          onClick={() => onToggleMenu(item._id)}
          className="p-2 rounded-full hover:bg-gray-100 transition-opacity"
        >
          <MoreVertical className="h-5 w-5 text-gray-700" />
        </button>

        <HistoryItemMenu
          isOpen={activeMenu === item._id}
          onClose={onCloseMenu}
        />
      </div>
    </div>
  );
};

export default HistoryItem;