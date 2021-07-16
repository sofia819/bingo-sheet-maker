import BingoCell from 'components/BingoCell';
import { useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { useWindowSize } from '@react-hook/window-size';
import { exportComponentAsJPEG } from 'react-component-export-image';

type Props = {
  dimensions: number;
};

const PADDING = 100;

const SAVE = 'Save';
const FINISH = 'Finish';
const EDIT = 'Edit';
const BINGO = 'Bingo.jpg';

const BingoSheet = (props: Props) => {
  const [cells, setCells] = useState(
    new Array(props.dimensions)
      .fill([])
      .map(() => new Array(props.dimensions).fill(''))
  );
  const [width, height] = useWindowSize();
  const [isReadOnly, setIsReadOnly] = useState(false);

  const handleUpdateText = (row: number, column: number, text: string) => {
    setCells(() => {
      const rowUpdated = cells[row];
      return [
        ...cells.slice(0, row),
        [
          ...rowUpdated.slice(0, column),
          text,
          ...rowUpdated.slice(column + 1, rowUpdated.length),
        ],
        ...cells.slice(row + 1, cells.length),
      ];
    });
  };

  const componentRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div ref={componentRef}>
        {cells.map((row, rowIndex) => {
          return (
            <Grid container key={rowIndex}>
              {row.map((text, columnIndex) => {
                return (
                  <BingoCell
                    text={`${text}_${rowIndex}_${columnIndex}`}
                    key={`${rowIndex}_${columnIndex}`}
                    width={(width - PADDING) / props.dimensions}
                    height={(height - PADDING) / props.dimensions}
                    row={rowIndex}
                    column={columnIndex}
                    onBoxClick={handleUpdateText}
                    isReadOnly={isReadOnly}
                  />
                );
              })}
            </Grid>
          );
        })}
      </div>
      <button
        onClick={() => {
          setIsReadOnly((prevState) => !prevState);
        }}
      >
        {isReadOnly ? EDIT : FINISH}
      </button>
      {isReadOnly && (
        <button
          onClick={() =>
            exportComponentAsJPEG(componentRef, { fileName: BINGO })
          }
        >
          {SAVE}
        </button>
      )}
    </>
  );
};

export default BingoSheet;
