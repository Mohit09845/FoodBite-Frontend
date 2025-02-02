import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check } from "lucide-react";
import { ChangeEvent } from "react";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

function CuisineFilter({
  onChange,
  onExpandedClick,
  isExpanded,
  selectedCuisines,
}: Props) {
  const handleCuisinesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = e.target.value;
    const isChecked = e.target.checked;

    const newCuisineList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

      onChange(newCuisineList);
  };

  const handleCuisinesReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter by Cuisine</div>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer"
        >
          Reset Filter
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisineList.map((cuisine) => {
          const isSelected = selectedCuisines.includes(cuisine);
          return (
            <div className="flex">
              <input
                id={`cuisine_${cuisine}`}
                type="checkbox"
                className="hidden"
                value={cuisine}
                checked={isSelected}
                onChange={handleCuisinesChange}
              />
              <Label
                htmlFor={`cuisine_${cuisine}`}
                className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                  isSelected
                    ? "border border-green-600 text-green-600"
                    : "border border-slate-300"
                }`}
              >
                {isSelected && <Check size={20} strokeWidth={3} />}
                {cuisine}
              </Label>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CuisineFilter;
