const LoadingState = ({ label = "Loading..." }: { label?: string }) => (
  <div className="flex min-h-[320px] items-center justify-center">
    <div className="flex items-center gap-3 text-sm text-slate-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
      {label}
    </div>
  </div>
);

export default LoadingState;
