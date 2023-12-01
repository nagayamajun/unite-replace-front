import { useGlobalLoading } from "@/adapters/globalState.adapter";

export const Loading = (): JSX.Element => {
  const { loading } = useGlobalLoading();
  if (!loading.isLoading) return <></>;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-blue-50 bg-opacity-50">
      <div className="flex flex-col items-center">
        <p className="font-semibold">{loading.message}</p>
        <img src="/load.gif" className="w-16 h-16" alt="Loading" />
      </div>
    </div>
  );
};