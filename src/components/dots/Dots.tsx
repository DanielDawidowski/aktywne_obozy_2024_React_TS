import React, { ReactElement } from "react";
import type { FC } from "react";
import { DotGridProps } from "./Dots.interface";
import { Dot, DotsContainer } from "./Dots.styles";

const DotGrid: FC<DotGridProps> = ({ rows, columns }): ReactElement => {
  const dotsAmount = rows * columns;

  return (
    <DotsContainer $rows={rows} $columns={columns}>
      {Array.from(Array(dotsAmount).keys()).map((dot) => (
        <Dot key={dot} />
      ))}
    </DotsContainer>
  );
};

export default DotGrid;
