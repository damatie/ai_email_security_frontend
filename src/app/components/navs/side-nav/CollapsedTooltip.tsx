interface TooltipProps {
  text: string;
}
export default function CollapsedTooltip({ text }: TooltipProps) {
  return (
    // Reusable tooltip component
    <div className="fixed left-24 transform -translate-y-1/2 mt-0 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-40">
      {text}
    </div>
  );
}
