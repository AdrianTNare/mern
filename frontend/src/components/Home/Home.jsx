import React, { useEffect, useState } from 'react';
import './Home.scss';
import agent from '../../agent/agent';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import CustomTable from '../CustomTable';

const Home = () => {
  const [input, setInput] = useState('');

  const [reload, setReload] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);
    try {
      let result = await agent.Crawler.crawl(input);
      if (result) {
        setIsLoading(false);
        setReload(true);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  //edit regex to perform validation.
  const validate = value => {
    let regex = /[^@\s]+\.[^@\s]+$/;

    regex.test(value) ? setValid(true) : setValid(false);
  };

  useEffect(() => {
    agent.Crawler.getHistory()
      .then(res => {
        setData([...res]);
        setReload(false);
      })
      .catch(() => {
        setReload(false);
      });
  }, [reload]);

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
          color='secondary'
          style={{ marginLeft: 9 }}>
          Crawl
        </Button>
      </Box>
      {isLoading && (
        <Box textAlign='center'>
          <Typography variant='h6' color='secondary' style={{ marginTop: 10 }}>
            ...loading, please wait.
          </Typography>
        </Box>
      )}
      <CustomTable data={data} />
    </Box>
  );
};

export default Home;
