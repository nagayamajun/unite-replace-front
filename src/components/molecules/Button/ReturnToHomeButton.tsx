import Link from "next/link"

export const ReturnToHomeButton = (): JSX.Element =>  (
    <div className="flex justify-center items-center mt-10 w-1/2">
      <Link href="/homeScreen" className="rounded-md px-16 py-3 bg-green-500 hover:bg-green-600 text-white">戻る</Link>
    </div>
)
