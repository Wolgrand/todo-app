import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { ArrowRightIcon } from '@primer/octicons-react'

type Props = {
  onAdd: (value: string) => void
}

const TodoInput: React.FC<Props> = ({ onAdd }) => {
  const [value, setValue] = useState('')
  const [placeholder, setPlaceholder] = useState('')

  const handleAdd = useCallback(() => {
    if (value) {
      onAdd(value)
      setValue('')
      setPlaceholder('')
    }
  }, [value, onAdd])

  useEffect(() => {
    setPlaceholder('')

    return () => {
      setPlaceholder('')
    }
  }, [])

  return (
    <Flex flexDirection="row" marginBottom={4}>
      <InputGroup>
        <Input
          paddingRight={24}
          fontSize={18}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAdd()
            }
          }}
        />
        <InputRightElement width={20}>
          <Button
            size="sm"
            variant="ghost"
            disabled={!value}
            onClick={handleAdd}
          >
            Enter <ArrowRightIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  )
}

export default TodoInput