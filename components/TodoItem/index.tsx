import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Todo } from '../../common/interfaces'
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SlideFade,
  StyleProps,
  Text,
  Textarea,
  useColorMode,
  useOutsideClick,
} from '@chakra-ui/react'
import {
  ArrowRightIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon,
} from '@primer/octicons-react'

type Props = Omit<Todo, 'id'> & {
  onChange: (value: { [P in keyof Todo]?: Todo[P] }) => void
  onDelete: () => void
}

const TodoItem: React.FC<Props> = ({
  done,
  title,
  description,
  onChange,
  onDelete,
}) => {
  const { colorMode } = useColorMode()

  const [isEditing, setEditing] = useState(false)
  const [localState, setLocalState] = useState({ title, description })

  const ref = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  const { backgroundColor, color, textDecoration }: StyleProps = useMemo(() => {
    let styleProps: StyleProps = {
      backgroundColor: 'gray.700',
      color: done ? 'gray.400' : '',
      textDecoration: done ? 'line-through' : '',
    }

    if (colorMode === 'light') {
      styleProps = {
        ...styleProps,
        backgroundColor: 'gray.100',
      }
    }

    return styleProps
  }, [done, colorMode])

  const handleEdit = useCallback(
    (isTitle: boolean) => {
      const currentRef = isTitle ? titleRef : descriptionRef

      setEditing(true)
      setTimeout(() => {
        currentRef?.current?.focus()
      }, 0)
    },
    [titleRef, descriptionRef],
  )

  const handleSave = useCallback(() => {
    if (localState.title) {
      onChange(localState)
      setEditing(false)
    }
  }, [onChange, localState])

  useEffect(() => {
    setLocalState({ title, description })
  }, [title, description, isEditing])

  useOutsideClick({
    ref,
    handler: () => setEditing(false),
  })

  return (
    <SlideFade in={true} offsetY={32}>
      <Box
        ref={ref}
        width="full"
        padding={4}
        marginBottom={4}
        borderRadius={8}
        backgroundColor={backgroundColor}
      >
        <Flex flexDirection="row">
          <IconButton
            aria-label="Mark as done"
            marginRight={4}
            isRound
            as={Button}
            disabled={isEditing}
            size="sm"
            variant="outline"
            colorScheme="green"
            icon={done ? <CheckIcon /> : undefined}
            onClick={() => onChange({ done: !done })}
          />
          <Box width="full" minWidth={0}>
            {isEditing ? (
              <Flex flexDirection="row">
                <InputGroup>
                  <Input
                    ref={titleRef}
                    paddingRight={24}
                    fontSize={18}
                    placeholder="Title"
                    value={localState.title}
                    onChange={(e) =>
                      setLocalState({
                        ...localState,
                        title: e.target.value,
                      })
                    }
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSave()
                      }
                    }}
                  />
                  <InputRightElement width={20}>
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={!localState.title}
                      onClick={handleSave}
                    >
                      Enter <ArrowRightIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>
            ) : (
              <Flex flexDirection="row">
                <Box
                  noOfLines={2}
                  width="full"
                  fontSize={18}
                  fontWeight={600}
                  color={color}
                  textDecoration={textDecoration}
                  onDoubleClick={() => handleEdit(true)}
                >
                  {title}
                </Box>
                <Flex flexDirection="row" marginLeft={2}>
                  <IconButton
                    aria-label="Edit todo"
                    as={Button}
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    icon={<PencilIcon />}
                    onClick={() => handleEdit(true)}
                  />
                  <IconButton
                    aria-label="Delete todo"
                    as={Button}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    icon={<TrashIcon />}
                    onClick={onDelete}
                  />
                </Flex>
              </Flex>
            )}
            <Box marginTop={isEditing ? 2 : 0}>
              {isEditing ? (
                <Textarea
                  ref={descriptionRef}
                  maxHeight={240}
                  placeholder="Description (otpional)"
                  value={localState.description}
                  onChange={(e) =>
                    setLocalState({
                      ...localState,
                      description: e.target.value,
                    })
                  }
                />
              ) : (
                description && (
                  <Text
                    color={color}
                    textDecoration={textDecoration}
                    onDoubleClick={() => handleEdit(false)}
                  >
                    {description}
                  </Text>
                )
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
    </SlideFade>
  )
}

export default TodoItem