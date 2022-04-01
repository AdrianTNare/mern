import React from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const CustomTable = ({ data }) => {
  const StyledTableCell = withStyles(() => ({
    root: {
      border: '1px solid grey',
      overflowWrap: 'break-word'
    },
    head: {
      backgroundColor: 'white',
      fontWeight: 700
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);

  const StyledTableRow = withStyles(() => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: 'white'
      }
    }
  }))(TableRow);

  const useStyles = makeStyles({
    bodyCells: {
      padding: 30
    }
  });

  const classes = useStyles();

  return (
    <TableContainer style={{ marginTop: 50, height: 400, padding: '0 40px 60px' }}>
      <Table height='max-content' style={{ tableLayout: 'fixed', width: 1000, margin: '0 auto' }}>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center' style={{ width: '15%', padding: 6 }}>
              URL
            </StyledTableCell>
            <StyledTableCell align='center' style={{ width: '15%', padding: 6 }}>
              Title
            </StyledTableCell>
            <StyledTableCell align='center' style={{ width: '30%', padding: 6 }}>
              Meta Description
            </StyledTableCell>
            <StyledTableCell align='center' style={{ width: '15%', padding: 6 }}>
              H1
            </StyledTableCell>
            <StyledTableCell align='center' style={{ width: '15%', padding: 6 }}>
              H2
            </StyledTableCell>
            <StyledTableCell align='center' style={{ width: '10%', padding: 6 }}>
              Links Count
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align='left' className={classes.bodyCells}>
                {item.url}
              </StyledTableCell>
              <StyledTableCell align='left' className={classes.bodyCells}>
                {item.title}
              </StyledTableCell>
              <StyledTableCell align='left' className={classes.bodyCells}>
                {item.description}
              </StyledTableCell>
              <StyledTableCell align='left' className={classes.bodyCells}>
                {item.h1}
              </StyledTableCell>
              <StyledTableCell align='left' className={classes.bodyCells}>
                {item.h2}
              </StyledTableCell>
              <StyledTableCell align='left' className={classes.bodyCells}>
                {item.linkCount}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;

CustomTable.propTypes = {
  data: PropTypes.array.isRequired
};
