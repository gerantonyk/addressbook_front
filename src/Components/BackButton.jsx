import React from 'react';
import { Button} from "@chakra-ui/react"
import {ArrowBackIcon} from '@chakra-ui/icons'


export default function BackButton({onClick}) {
  return (
    <Button  bg="teal.400"  mr={2} display="flex" alignSelf="flex-start" position="fixed" onClick={onClick}>
      <ArrowBackIcon w={6} h={6} />                    
    </Button>
  );
};

  