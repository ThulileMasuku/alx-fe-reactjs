import { useParams } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Recipe Details for ID: {id}</h2>
      <p className="mt-2">Here you can show full recipe details.</p>
    </div>
  );
}
