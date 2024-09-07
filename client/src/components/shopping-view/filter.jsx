import { filterOptions } from "@/config";
import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = ({handleFilter,filters}) => {
  return (
    <div className="bg-background rounded shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItems) => (
          <>
            <div>
              <h3 className="text-base font-semibold">{keyItems}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItems].map((option) => (
                  <Label className="flex items-center font-medium gap-2">
                    <Checkbox checked={filters && Object.keys(filters).length > 0 && filters[keyItems] && filters[keyItems].indexOf(option.id) > -1} onCheckedChange={()=>handleFilter(keyItems,option.id)}/>
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator/>
          </>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
