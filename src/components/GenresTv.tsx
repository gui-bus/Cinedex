import { Chip, Link } from "@nextui-org/react";
import React from "react";

interface Igenres {
  index: number;
  name: string;
}

const GenresTv = ({ name }: Igenres) => {
  return (
    <div className="flex cursor-default">
      <Chip radius="sm" variant="shadow" color="warning">
        {name}
      </Chip>
    </div>
  );
};

export default GenresTv;
