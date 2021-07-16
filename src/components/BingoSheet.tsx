import BingoCell from 'components/BingoCell';
import { useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { exportComponentAsJPEG } from 'react-component-export-image';

type Props = {
  dimensions: number;
};

const WIDTH = 150;
const SAVE = 'Save';
const FINISH = 'Finish';
const EDIT = 'Edit';
const BINGO = 'Bingo.jpg';

const BingoSheet = (props: Props) => {
  const [cells, setCells] = useState(
    new Array(props.dimensions)
      .fill([])
      .map(() =>
        new Array(props.dimensions).fill(
          'Lorem ipsum dolor sit amet, consectetur'
        )
      )
  );
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
            <Grid
              container
              key={rowIndex}
              alignContent='center'
              justifyContent='center'
            >
              {row.map((text, columnIndex) => {
                return (
                  <BingoCell
                    text={`${text}`}
                    key={`${rowIndex}_${columnIndex}`}
                    width={WIDTH}
                    height={WIDTH}
                    row={rowIndex}
                    column={columnIndex}
                    onBoxClick={handleUpdateText}
                    isReadOnly={isReadOnly}
                    dimensions={props.dimensions}
                  />
                );
              })}
            </Grid>
          );
        })}
      </div>
      <Box m={2}>
        <Grid
          item
          container
          alignContent='space-between'
          justifyContent='center'
          spacing={3}
        >
          <Grid item>
            <Button
              onClick={() => {
                setIsReadOnly((prevState) => !prevState);
              }}
              variant='contained'
              color={isReadOnly ? 'default' : 'primary'}
            >
              {isReadOnly ? EDIT : FINISH}
            </Button>
          </Grid>
          {isReadOnly && (
            <Grid item>
              <Button
                onClick={() =>
                  exportComponentAsJPEG(componentRef, { fileName: BINGO })
                }
                variant='contained'
                color='primary'
              >
                {SAVE}
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default BingoSheet;
