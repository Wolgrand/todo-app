import React, { ReactNode, useCallback, useMemo, useRef } from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Link,
  StyleProps,
  useColorMode,
} from '@chakra-ui/react'
import { LightBulbIcon, MarkGithubIcon, MoonIcon } from '@primer/octicons-react'
import styles from './Layout.module.scss'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  const footerRef = useRef<HTMLElement>(null)

  const { backgroundColor, borderColor } = useMemo(() => {
    let styleProps: StyleProps = {
      backgroundColor: 'gray.800',
      borderColor: 'gray.600',
    }

    if (colorMode === 'light') {
      styleProps = {
        ...styleProps,
        backgroundColor: 'white',
        borderColor: 'gray.200',
      }
    }

    return styleProps
  }, [colorMode])

  const openUrl = useCallback((url: string) => {
    if (typeof window !== undefined) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/open
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Box
          marginBottom={4}
          backgroundColor={backgroundColor}
          borderBottomWidth={1}
          borderStyle="solid"
          borderColor={borderColor}
        >
          <Container
            maxWidth="container.xl"
            paddingY={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex alignItems="center">
              <Heading as="h1" size="md" marginLeft={2}>
                Todo App
              </Heading>
            </Flex>
            <Flex>
              <IconButton
                aria-label="GitHub link"
                as={Link}
                variant="ghost"
                icon={<MarkGithubIcon size={20} />}
                onClick={() => openUrl('https://github.com')}
              />
              <IconButton
                aria-label="Toggle theme"
                as={Link}
                variant="ghost"
                icon={React.createElement(
                  colorMode === 'light' ? MoonIcon : LightBulbIcon,
                  { size: 20 },
                )}
                onClick={toggleColorMode}
              />
            </Flex>
          </Container>
        </Box>
      </header>
      <main style={{ paddingBottom: footerRef?.current?.offsetHeight }}>
        <Container maxWidth="lg">{children}</Container>
      </main>
      {/* <footer ref={footerRef} className={styles.footer}>
        <Box
          backgroundColor={backgroundColor}
          borderTopWidth={1}
          borderStyle="solid"
          borderColor={borderColor}
        >
          <Container
            maxWidth="container.xl"
            paddingY={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            Footer
          </Container>
        </Box>
      </footer> */}
    </div>
  )
}

export default Layout