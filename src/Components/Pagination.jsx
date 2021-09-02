import React from 'react';
import { Box,Button,HStack} from "@chakra-ui/react"

export default function Pagination({ contactsPerPage, totalContacts, paginate }){
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalContacts / contactsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box bgGradient="linear(to-t, teal.500, teal.200)" w="100%" p={4}>
      <HStack justifyContent="center" spacing="0.5rem">
        {pageNumbers.map(number => (
            <Button bg="white" key={number} onClick={() => paginate(number)} className='page-link'>
              {number}
            </Button>
        ))}
      </HStack>
    </Box>
  );
};
