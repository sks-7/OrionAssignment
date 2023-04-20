import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  VStack,
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Container,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';

import { AiFillLike, AiFillDislike, AiFillDelete } from 'react-icons/ai';
import axios from 'axios';

const Mainpage = () => {
  const data = JSON.parse(localStorage.getItem('userInfo'));
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [singledata, setSingleData] = useState({});
  const [postData, setPostdata] = useState([]);

  const [postInput, setPostInput] = useState('');
  const [picture, setPicture] = useState('');

  const id = data.userdata._id;

  console.log(singledata);

  const toast = useToast();

  // console.log(id);

  const [state, setState] = useState({
    name: '',
    pic: '',
    shortBio: '',
  });

  const { name, pic, shortBio } = state;

  const getSingledaata = async () => {
    try {
      let res = await axios.get(`http://localhost:8080/user/${id}`);

      setSingleData(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getSingledaata();
  }, []);

  useEffect(() => {
    if (singledata) {
      setState({ ...singledata });
    }
  }, [singledata]);

  const handalChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handalSubmmit = async () => {
    if (!name || !pic || !shortBio) {
      toast({
        title: 'All the Input filled is required',
        status: 'error',
        duration: 5000,
        position: 'top',
        isClosable: true,
      });
    } else {
      try {
        let res = await axios.patch(`http://localhost:8080/user/${id}`, state);

        setSingleData(res.data);
        setTimeout(() => {
          getSingledaata();
        }, 1000);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  // console.log(singledata);

  // geting post data

  const getPostdata = async () => {
    let res = await axios.get('http://localhost:8080/post');

    setPostdata(res.data);
  };

  useEffect(() => {
    getPostdata();
  }, []);

  // post data

  const handapost = async () => {
    if (!postInput || !picture) {
      toast({
        title: 'Add something to be post ',
        status: 'warning',
        duration: 5000,
        position: 'top',
        isClosable: true,
      });

      return;
    } else {
      await axios.post('http://localhost:8080/post/new', {
        postInput,
        picture,
      });
    }

    setTimeout(() => {
      getPostdata();
    }, []);

    setPicture('');
    setPostInput('');

    toast({
      title: 'Post is uploaded successfully',
      status: 'success',
      duration: 5000,
      position: 'top',
      isClosable: true,
    });
  };

  // delete post

  const handalDelete = async (id) => {
    await axios.delete(`http://localhost:8080/post/${id}`);

    setTimeout(() => {
      getPostdata();
    }, []);

    toast({
      title: 'Post is deleted successfully',
      status: 'success',
      duration: 5000,
      position: 'top',
      isClosable: true,
    });
  };

  console.log('post data', postData);

  return (
    <Box p="1rem">
      <Flex gap="5rem">
        <Box h="auto" w="30%" boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}>
          <VStack spacing={10} p="10px" align={'center'}>
            <Image
              src={singledata.pic}
              w="150px"
              h="150px"
              borderRadius={'50%'}
            />
            <Text fontSize={20} fontWeight={600}>
              Name: {singledata.name}
            </Text>

            <Text fontSize={20} fontWeight={600}>
              Bio: {singledata.shortBio}
            </Text>

            <Button onClick={onOpen}>update user details</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Update User details </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Container>
                    <FormControl>
                      <FormLabel> Name</FormLabel>
                      <Input
                        placeholder=" Name"
                        name="name"
                        value={name}
                        onChange={handalChange}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Picture</FormLabel>
                      <Input
                        name="pic"
                        placeholder="pic"
                        value={pic}
                        onChange={handalChange}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Bio</FormLabel>
                      <Input
                        name="shortBio"
                        placeholder="Short Bio"
                        value={shortBio}
                        onChange={handalChange}
                      />
                    </FormControl>

                    <Button mt="30px" w="100%" onClick={handalSubmmit}>
                      Update
                    </Button>
                  </Container>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </VStack>
        </Box>

        <Box
          h="auto"
          w="60%"
          border={'1px solid pink'}
          boxShadow={'2xl'}
          alignSelf={'center'}
        >
          <Box h="300px" w="100%" borderWidth={'.5rem'} p="2rem">
            <Image src={data.userdata.pic} alt="image" w="50px" rounded="lg" />
            <Textarea
              borderColor={'pink.400'}
              placeholder="write something new"
              mt="1rem"
              value={postInput}
              onChange={(e) => setPostInput(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Enter url of the image that you want to post"
              mt="1rem"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />

            <Flex gap="20px" justifyContent={'flex-end'} align={'center'}>
              <Button
                _hover={{ color: 'white', background: 'pink.300' }}
                mt="10px"
                onClick={handapost}
              >
                Post
              </Button>
            </Flex>
          </Box>

          <Box h="100%" mt="2rem" p="1rem">
            {postData.map((ele) => (
              <div key={ele._id}>
                <Box w="100%" h="200px" borderWidth={'.1rem'}>
                  <Image
                    src={ele.picture}
                    w="100%"
                    h="200px"
                    rounded={'sm'}
                    m="auto"
                  ></Image>
                </Box>

                <Box>
                  <Text mt="10px" fontSize={'20px'} fontWeight={800}>
                    {ele.postInput}
                  </Text>
                </Box>

                <Flex
                  gap="20px"
                  justifyContent={'flex-end'}
                  align={'center'}
                  mt="1rem"
                >
                  {<AiFillLike fontSize={20} mt="20px" cursor={'pointer'} />}
                  {<AiFillDislike fontSize={20} mt="20px" cursor={'pointer'} />}
                  {
                    <AiFillDelete
                      fontSize={20}
                      mt="20px"
                      cursor={'pointer'}
                      onClick={() => handalDelete(ele._id)}
                    />
                  }
                </Flex>
              </div>
            ))}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Mainpage;
