import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import Login from '../components/Login';
import SignUp from '../components/Signup';

// import { useNavigate } from 'react-router-dom';

const HomePage = () => {


  return (
    <Container maxW={'xl'} centerContent>
      <Box
        d="flex"
        justifyContent={'center'}
        p="4"
        bg="white"
        w="100%"
        m="42px 0 15px 0"
        borderRadius={'lg'}
        borderWidth="1px"
      >
        <Text
          align={'center'}
          fontSize={'4xl'}
          color="blackAlpha.800"
          fontWeight="900"
        >
          Social website
        </Text>
      </Box>

      <Box
        bg={'white'}
        w="100%"
        p="4px"
        borderRadius={'lg'}
        borderWidth="1px"
        boxShadow={'2xl'}
        h="auto"
        color={'blackAlpha.700'}
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
