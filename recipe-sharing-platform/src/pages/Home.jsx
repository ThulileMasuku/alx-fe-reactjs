import RecipeCard from "../components/RecipeCard";

const sampleRecipes = [
  { id: 1, title: "Spaghetti Bolognese", description: "Classic Italian pasta." },
  { id: 2, title: "Chicken Curry", description: "Spicy and creamy." },
];

export default function Home() {
  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sampleRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </main>
  );
}
