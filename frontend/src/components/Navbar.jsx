import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Button,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import { FaBars, FaSearch } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

import { Signout } from '../Redux/action';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const getData = async () => {
  let res = await axios.get('http://localhost:8080/user');

  return res.data;
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef();
  const { token } = useSelector((store) => store);

  const [user, setUser] = useState([]);
  const [search, setSearch] = useState('');

  // console.log(Allclient);

  useEffect(() => {
    getData().then((res) => {
      setUser(res);
    });
  }, []);

  console.log(user);

  // console.log(token);

  const toast = useToast();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function logout() {
    dispatch(Signout());
    toast({
      title: 'Logout successfully 😊😊😊',
      description: 'Thankyou for using my our social media website  ',
      status: 'success',
      position: 'top',
      duration: 6000,
      isClosable: true,
    });

    setTimeout(() => {
      navigate('/');
    }, 100);
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-around"
      wrap="wrap"
      padding="1rem"
      bg="#fca5a5"
      color="white"
    >
      <Flex align="center" mr={1}>
        <IconButton
          aria-label="Menu"
          icon={<FaBars />}
          display={{ base: 'block', md: 'none' }}
        />
        <Image
          src="https://wp.usatodaysports.com/wp-content/uploads/sites/90/2017/01/instaface.jpg"
          alt="Social"
          h="4rem"
          mr={2}
          rounded={'md'}
        />
      </Flex>

      <Box display={{ base: 'none', md: 'block' }}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search user"
            bg="white"
            boxShadow={'2xl'}
            color={'red'}
            ref={inputRef}
            onClick={onOpen}
          />

          <InputRightElement
            pointerEvents="none"
            children={<FaSearch color="black" />}
          />
        </InputGroup>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={inputRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search user</DrawerHeader>

            <DrawerBody>
              <Input
                placeholder="Search User ...."
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />

              <Box>
                {user &&
                  user
                    .filter((ele) => {
                      if (search === '') {
                        return null;
                      } else if (
                        ele.name.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return ele;
                      }
                    })
                    .map((ele) => (
                      <Flex bg={'#e8f5fd'} gap="1rem" p="1rem">
                        <Image
                          src={ele.pic}
                          alt="name"
                          width={'30px'}
                          rounded={'lg'}
                          mb="1rem"
                        />
                        <Text>{ele.name}</Text>
                      </Flex>
                    ))}
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>

      <HStack spacing={8} align="center">
        {token ? <Button onClick={logout}>Logout</Button> : <Text>login</Text>}

        <Text>
          {
            <IoIosNotifications
              h="1.5rem"
              bg="#2874f0"
              color="black"
              fontSize={40}
            />
          }
        </Text>
      </HStack>
    </Flex>
  );
};

export default Navbar;
