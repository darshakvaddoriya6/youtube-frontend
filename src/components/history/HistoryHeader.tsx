import { History, Trash2 } from "lucide-react";

interface HistoryHeaderProps {
  historyCount: number;
  onClearAll: () => void;
  clearingAll: boolean;
}

const HistoryHeader = ({ historyCount, onClearAll, clearingAll }: HistoryHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <History className="h-8 w-8 mr-3 text-gray-900" />
        <h1 className="text-3xl font-semibold text-gray-900">History</h1>
      </div>
      {historyCount > 0 && (
        <button
          onClick={onClearAll}
          disabled={clearingAll}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-red-500 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition duration-300"
        >
          {clearingAll ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
              <span>Clearing...</span>
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4" />
              <span>Clear all history</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default HistoryHeader;
