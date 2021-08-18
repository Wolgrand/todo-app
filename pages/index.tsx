import React, { useCallback, useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { NextPage } from 'next'
import Head from 'next/head'
import { Todo } from '../common/interfaces'
import { Layout, Placeholder, TodoInput, TodoItem } from '../components'
import { useBeforeunload } from 'react-beforeunload'

const initialData: Todo[] = [
  {
    id: '0',
    done: false,
    title: 'Create new',
    description: 'Enter your text in the field above and press "Enter".',
  },
  {
    id: '1',
    done: false,
    title: 'Update',
    description:
      'Double-click on the title or description to update them. You can also click on the pencil icon.',
  },
]

const Home: NextPage = () => {
  const [data, setData] = useState(initialData)

  const handleAdd = useCallback(
    (value) => {
      const newTodo = { id: nanoid(), done: false, title: value }
      setData([...data, newTodo])
    },
    [data],
  )

  const handleChange = useCallback(
    (id, changedData) => {
      const index = data.findIndex((item) => item.id === id)
      setData([
        ...data.slice(0, index),
        { ...data[index], ...changedData },
        ...data.slice(index + 1),
      ])
    },
    [data],
  )

  const handleDelete = useCallback(
    (id) => {
      const index = data.findIndex((item) => item.id === id)
      setData([...data.slice(0, index), ...data.slice(index + 1)])
    },
    [data],
  )

  useBeforeunload(() => {
    localStorage.setItem('data', JSON.stringify(data))
  })

  useEffect(() => {
    const savedData = localStorage.getItem('data')

    if (savedData) {
      setData(JSON.parse(savedData))
    }
  }, [])

  return (
    <Layout>
      <Head>
        <title>Ghost Todo</title>
        <meta
          name="description"
          content="Todo app made with Next.js and Chakra UI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TodoInput onAdd={handleAdd} />
      {!!data.length ? (
        data.map(({ id, ...other }) => (
          <TodoItem
            {...other}
            key={id}
            onChange={(changedData) => handleChange(id, changedData)}
            onDelete={() => handleDelete(id)}
          />
        ))
      ) : (
        <Placeholder>Nothing to show</Placeholder>
      )}
    </Layout>
  )
}

export default Home