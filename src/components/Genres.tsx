import { Chip, Link } from "@nextui-org/react";
import React from "react";

interface Igenres {
  index: number;
  name: string;
  length: number;
  id: number;
}

const Genres = ({ id, index, length, name }: Igenres) => {
  return (
    <Link href={`/genres/${id}?genre=${name.toLowerCase()}`}>
      <div className="flex">
        <Chip radius="sm" variant="shadow" color="warning">
          {name}
        </Chip>
      </div>
    </Link>
  );
};

export default Genres;
