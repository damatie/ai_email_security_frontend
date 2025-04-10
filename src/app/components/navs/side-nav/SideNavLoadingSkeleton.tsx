export function SideNavLoadingSkeleton() {
  return (
    <div className="flex items-center justify-between w-full px-0 py-3 rounded-md  animate-pulse">
      <div className="flex flex-row items-center">
        <div className="w-10 h-10 rounded-full bg-brand-primary-light mr-3"></div>
        <div className="flex flex-col items-start">
          <div className="bg-brand-primary-light h-4 w-24 rounded"></div>
          <div className="bg-brand-primary-light h-3 w-16 rounded mt-1"></div>
        </div>
      </div>
      <div className="w-6 h-6 bg-brand-primary-light rounded-full"></div>
    </div>
  );
}
