import React, { useState } from "react";
import "../../css/dashborad/DashBoardItem.css";

interface Item {
  id: number;
  name: string;
  total: number;
  selected: boolean;
  bgcolor: string;
  imagesrc: string;
}

function DashBoxItems() {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Facilities",
      total: 7,
      selected: true,
      bgcolor: "#10767A",
      imagesrc: "Facilities.svg",
    },
    {
      id: 2,
      name: "Refinery Supplier",
      total: 30,
      selected: false,
      bgcolor: "#018C79",
      imagesrc: "Refinery Supplier.svg",
    },
    {
      id: 3,
      name: "Mill Supplier",
      total: 30,
      selected: false,
      bgcolor: "#2A2A2A",
      imagesrc: "Mill Supplier.svg",
    },
    // Other items...
  ]);

  const handleCurrentSelectedItem = (clickedItem: Item) => {
    const updatedItems = items.map((item) => {
      if (item.id === clickedItem.id) {
        return { ...item, bgcolor: "#CCB848", selected: true };
      } else {
        return { ...item, bgcolor: "#10767A", selected: false };
      }
    });
    setItems(updatedItems);
  };

  return (
    <div className="flex w-1/2 flex-col items-center py-7 gap-6 lg:flex-row justify-end">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleCurrentSelectedItem(item)}
          className={`${
            item.selected ? "bg-[#CCB848]" : `bg-[${item.bgcolor}]`
          } dashItems hover:cursor-pointer`}
        >
          <div className="commonSizing">
            <img src={item.imagesrc} alt="" />
            <p>{item.name}</p>
            <p className="font-bold">{item.total}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashBoxItems;
