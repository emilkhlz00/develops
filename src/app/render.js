import { GetServerSideProps } from "next";

export default function Recipes({ recipes }) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, cuisine, maxTime } = context.query;
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query || ""}&cuisine=${cuisine || ""}&maxReadyTime=${maxTime || ""}&apiKey=${apiKey}`;

  const response = await fetch(url, {
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate"
    }
  });
  const data = await response.json();

  return {
    props: {
      recipes: data.results || []
    }
  };
};
