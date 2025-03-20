import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const { query } = router.query;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Search Results for "{query}"</h1>
      <p className="text-gray-600">Here will be the list of recipes...</p>
    </div>
  );
}