import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

type Props = {
  text: string;
  width: number;
  height: number;
  row: number;
  column: number;
  onBoxClick: (row: number, column: number, text: string) => void;
  isReadOnly: boolean;
  dimensions: number;
};

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'green',
    '&$disabled': {
      color: 'black',
    },
  },
  disabled: {},
}));

const BingoCell = (props: Props) => {
  const classes = useStyles();

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
  }, [props, text]);

  return (
    <Grid item>
      {props.isReadOnly ? (
        <Box
          borderTop={1}
          borderBottom={props.row === props.dimensions - 1 ? 1 : 0}
          borderLeft={1}
          borderRight={props.column === props.dimensions - 1 ? 1 : 0}
          width={props.width}
          height={props.width}
          paddingX='14px'
          paddingY='18.5px'
          overflow='clip'
        >
          <Typography
            align='center'
            style={{
              wordWrap: 'break-word',
              height: props.width,
              width: props.width,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            {text}
          </Typography>
        </Box>
      ) : (
        <TextField
          disabled={props.isReadOnly}
          inputProps={{
            style: {
              padding: 0,
              textAlign: 'center',
              verticalAlign: 'bottom',
              height: props.width,
              width: props.width,
            },
          }}
          fullWidth
          value={text}
          onChange={handleUpdateText}
          multiline
          variant='outlined'
          InputProps={{
            classes: {
              root: classes.inputRoot,
              disabled: classes.disabled,
            },
          }}
        />
      )}
    </Grid>
  );
};

export default BingoCell;
