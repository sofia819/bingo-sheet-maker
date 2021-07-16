import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

type Props = {
  text: string;
  width: number;
  height: number;
  row: number;
  column: number;
  onBoxClick: (row: number, column: number, text: string) => void;
  isReadOnly: boolean;
};
const TEXT_ROW = 4;

const BingoCell = (props: Props) => {
  const [text, setText] = useState(props.text);
  const handleUpdateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // Updates the state after the user has finished typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      props.onBoxClick(props.row, props.column, text);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  return (
    <Grid item>
      <Card variant='outlined'>
        <Box height={props.height} width={props.width}>
          <CardContent>
            {props.isReadOnly ? (
              <Typography>{text}</Typography>
            ) : (
              <TextField
                value={text}
                onChange={handleUpdateText}
                multiline
                rows={TEXT_ROW}
              />
            )}
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};

export default BingoCell;
