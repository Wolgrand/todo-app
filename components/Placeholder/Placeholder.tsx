import React from 'react'
import { AspectRatio, Flex, FlexProps } from '@chakra-ui/react'

type Props = FlexProps

const Placeholder: React.FC<Props> = ({ children, ...props }) => {
  return (
    <AspectRatio ratio={1}>
      <Flex
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        fontSize={24}
        color="gray.400"
        {...props}
      >
        {children}
      </Flex>
    </AspectRatio>
  )
}

export default Placeholder