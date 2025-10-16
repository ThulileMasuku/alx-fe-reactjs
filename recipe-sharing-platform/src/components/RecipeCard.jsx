import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{recipe.title}</h3>
      <p className="text-gray-700">{recipe.description}</p>
      <Link
        to={`/recipe/${recipe.id}`}
        className="text-blue-500 mt-2 inline-block"
      >
        View Recipe
      </Link>
    </div>
  );
}
