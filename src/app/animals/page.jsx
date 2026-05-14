import AnimalsContainer from "@/components/AnimalsContainer";
import { animalsFetch } from "@/utils/animalsFetch";

const AnimalsPage = async () => {
  const animals = await animalsFetch();

  return (
    <div className="py-20 flex flex-col items-center justify-center bg-base-200 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
        All Animals
      </h1>
      <p className="text-sm text-gray-700">
        Qurbani animals available in the Hat
      </p>
      <AnimalsContainer animals={animals} />
    </div>
  );
};

export default AnimalsPage;