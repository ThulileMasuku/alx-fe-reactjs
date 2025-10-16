export default function AddRecipe() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Recipe Title"
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded"
        ></textarea>
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Recipe
        </button>
      </form>
    </div>
  );
}
