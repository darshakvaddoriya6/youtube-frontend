import { History } from "lucide-react";
import HistoryItem from "./HistoryItem";

interface HistoryListProps {
  groupedHistory: Record<string, any[]>;
  onVideoClick: (video: any) => void;
  onDeleteHistory: (id: string) => void;
  deletingId: string | null;
  activeMenu: string | null;
  onToggleMenu: (id: string) => void;
  onCloseMenu: () => void;
}

const HistoryList = ({
  groupedHistory,
  onVideoClick,
  onDeleteHistory,
  deletingId,
  activeMenu,
  onToggleMenu,
  onCloseMenu,
}: HistoryListProps) => {
  const hasHistory = Object.keys(groupedHistory).length > 0;

  if (!hasHistory) {
    return (
      <div className="text-center py-20">
        <History className="h-20 w-20 mx-auto text-gray-300 mb-4" />
        <p className="text-gray-700 text-xl font-medium">
          Keep track of what you watch
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Watch history isn't viewable when signed out
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {Object.entries(groupedHistory).map(([date, items]) => (
        <div key={date}>
          <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">{date}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 lg:space-y-4 lg:block">
            {Array.isArray(items) &&
              items.map((item: any) => (
                <HistoryItem
                  key={item._id}
                  item={item}
                  onVideoClick={onVideoClick}
                  onDelete={onDeleteHistory}
                  deletingId={deletingId}
                  activeMenu={activeMenu}
                  onToggleMenu={onToggleMenu}
                  onCloseMenu={onCloseMenu}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;