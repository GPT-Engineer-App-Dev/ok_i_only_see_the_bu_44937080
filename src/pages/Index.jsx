import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Select, CheckboxGroup, Checkbox, Stack, Textarea, useToast, VStack, InputGroup, InputLeftAddon, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from "@chakra-ui/react";
import { FaUpload, FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [form, setForm] = useState({
    sampleType: "",
    colors: [],
    logo: null,
    name: "",
    email: "",
    phone: "",
    companyName: "",
    lineSpeed: "",
    printSize: "",
  });
  const [uniqueNumber, setUniqueNumber] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePreview = () => {
    setIsPreview(true);
  };

  const handleEdit = () => {
    setIsPreview(false);
  };
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleColorChange = (value) => {
    setForm({
      ...form,
      colors: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUniqueNumber = Date.now();
    setUniqueNumber(newUniqueNumber);
    onOpen();
    if (isPreview) {
      setIsPreview(false);
      return;
    }
    toast({
      title: "Form submitted.",
      description: "We've received your sample request.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  //... rest of the existing return statement up to the <Container>

  const shippingLabel = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Shipping Label</ModalHeader>
        <ModalBody>
          <Box p={5} border="1px" borderColor="gray.200" borderRadius="md" boxShadow="sm">
            <Heading size="md" mb={2}>
              Cyklop CSC Att.: SampleLab M.Slot {uniqueNumber}
            </Heading>
            <Box>
              Wilhelm Röntgenstraat 10
              <br />
              8013NC Zwolle
              <br />
              Nederland
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => window.print()}>
            Print Label
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      {shippingLabel}
      <Container maxW="container.md" py={10}>
        {isPreview ? (
          <VStack spacing={4} align="stretch" mt={4}>
            <Box>Sample Type: {form.sampleType}</Box>
            <Box>Selected Colors: {form.colors.join(", ")}</Box>
            <Box>Contact Name: {form.name}</Box>
            <Box>Email: {form.email}</Box>
            <Box>Phone: {form.phone}</Box>
            <Box>Company Name: {form.companyName}</Box>
            <Box>Line Speed: {form.lineSpeed}</Box>
            <Box>Print Size: {form.printSize}</Box>
            <Button colorScheme="blue" onClick={handleEdit}>
              Back to Edit
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Confirm and Submit
            </Button>
          </VStack>
        ) : (
          <VStack as="form" spacing={4}>
            <FormControl isRequired>
              <FormLabel>Sample Type</FormLabel>
              <Select placeholder="Select sample type" onChange={handleInputChange} value={form.sampleType} name="sampleType">
                {}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Colors</FormLabel>
              <CheckboxGroup colorScheme="blue" onChange={handleColorChange} value={form.colors}>
                <Stack direction="row">{}</Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Contact Name</FormLabel>
              <Input placeholder="Your name" onChange={handleInputChange} value={form.name} name="name" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Your email" onChange={handleInputChange} value={form.email} type="email" name="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+1" />
                <Input placeholder="Your phone number" onChange={handleInputChange} value={form.phone} type="tel" name="phone" />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Company Name</FormLabel>
              <Input placeholder="Your company name" onChange={handleInputChange} value={form.companyName} name="companyName" />
            </FormControl>
            <FormControl>
              <FormLabel>Line Speed</FormLabel>
              <Input placeholder="Your line speed in m/min" onChange={handleInputChange} value={form.lineSpeed} type="number" name="lineSpeed" />
            </FormControl>
            <FormControl>
              <FormLabel>Print Size</FormLabel>
              <Input placeholder="Print size in mm" onChange={handleInputChange} value={form.printSize} type="number" name="printSize" />
            </FormControl>
            <Button colorScheme="blue" onClick={handlePreview} leftIcon={<FaUpload />}>
              Preview
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit} leftIcon={<FaPaperPlane />}>
              Submit
            </Button>
          </VStack>
        )}
      </Container>
    </>
  );
};

export default Index;
