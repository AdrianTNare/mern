import React, { useEffect, useState } from 'react';
import './Home.scss';
import agent from '../../agent/agent';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const Home = () => {
  const [input, setInput] = useState('');

  const [reload, setReload] = useState(false);

  const [valid, setValid] = useState(true);

  const [data, setData] = useState([]);

  const handleChange = event => {
    let value = event.target.value;
    event.preventDefault();
    setInput(value);
    validate(value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      let result = await agent.Crawler.crawl(input);
      console.log(result);
      if (result) setReload(true);
    } catch (e) {
      console.log(e);
    }
  };

  //edit regex to perform validation.
  const validate = value => {
    // let regex = '.*?';

    value.length > 3 ? setValid(true) : setValid(false);
  };

  useEffect(() => {
    agent.Crawler.getHistory()
      .then(res => {
        // reset the table results
        console.log(res);
        setData([...res]);
        setReload(false);
      })
      .catch(e => {
        //out put error in console.
        console.log(e);
        setReload(false);
      });
  }, [reload]);

  const StyledTableCell = withStyles(() => ({
    root: {
      border: '1px solid grey',
      padding: 6
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

  return (
    <Box>
      <Box textAlign='center'>
        <Typography variant='h5' style={{ fontWeight: 700, marginTop: 40 }}>
          Entail Dev Test
        </Typography>
      </Box>
      <Box mx='auto' mt={20} style={{ maxWidth: 600 }}>
        <TextField
          variant='outlined'
          label='URL'
          size='small'
          value={input}
          error={!valid}
          onChange={handleChange}
          style={{ width: '83%' }}
        />
        <Button
          variant='contained'
          disableElevation={true}
          onClick={handleSubmit}
          disabled={!valid}
          color='primary'
          style={{ marginLeft: 9 }}>
          Crawl
        </Button>
      </Box>
      <TableContainer style={{ marginTop: 50, height: 400, padding: '0 40px 60px' }}>
        <Table  height='max-content' >
          <TableHead>
            <TableRow>
              <StyledTableCell align='center' style={{ width: '15%' }}>
                URL
              </StyledTableCell>
              <StyledTableCell align='center' style={{ width: '15%' }}>
                Title
              </StyledTableCell>
              <StyledTableCell align='center' style={{ width: '30%' }}>
                Meta Description
              </StyledTableCell>
              <StyledTableCell align='center' style={{ width: '15%' }}>
                H1
              </StyledTableCell>
              <StyledTableCell align='center' style={{ width: '15%' }}>
                H2
              </StyledTableCell>
              <StyledTableCell align='center' style={{ width: '10%' }}>
                Link Count
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {data.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align='center' style={{ width: '15%' }}>
                  {item.url}
                </StyledTableCell>
                <StyledTableCell align='center' style={{ width: '15%' }}>
                  {item.title}
                </StyledTableCell>
                <StyledTableCell align='center' style={{ width: '30%' }}>
                  {item.description}
                </StyledTableCell>
                <StyledTableCell align='center' style={{ width: '15%' }}>
                  {item.h1}
                </StyledTableCell>
                <StyledTableCell align='center' style={{ width: '15%' }}>
                  {item.h2}
                </StyledTableCell>
                <StyledTableCell align='center' style={{ width: '10%' }}>
                  {item.linkCount}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Home;
