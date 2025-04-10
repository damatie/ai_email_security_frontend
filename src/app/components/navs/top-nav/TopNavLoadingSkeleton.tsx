export function TopNavLoadingSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      {/* Connected accounts indicator skeleton */}
      <div className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm">
        <div className="h-5 w-5 bg-gray-200 rounded mr-2 animate-pulse"></div>
        <div className="flex gap-1">
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="hidden md:block h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Notification bell skeleton */}
      <div className="relative p-2 rounded-full bg-white shadow-sm">
        <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
        <div className="absolute top-0 right-0 h-3 w-3 bg-gray-200 rounded-full border-2 border-white animate-pulse"></div>
      </div>

      {/* Help/support button skeleton */}
      <div className="p-2 rounded-full bg-white shadow-sm">
        <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
