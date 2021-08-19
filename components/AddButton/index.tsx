
import { IconButton } from "@chakra-ui/react"
import { AiOutlinePlus } from 'react-icons/ai';

interface ButtonProps {
  isOpen: () => void;
}

export function AddButton({isOpen}:ButtonProps){
  return (
    <IconButton
     aria-label="Add New Task"
     isRound icon={<AiOutlinePlus />}
     position="fixed"
     bottom="10%"
     right="10%"
     size="lg"
     onClick={isOpen}
    />
  )
}