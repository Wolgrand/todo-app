import {
  Box,
  Center,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';

interface StatsCardProps {
  title: string;
  stat: string | number;
}

interface BasicStatisticsProps{
  all: number;
  completed: number;
  onGoing: number;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}

      py={'3'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Center>
        <StatLabel fontWeight={'medium'} isTruncated>
          {title}
        </StatLabel>
        </Center>
        <Center>
        <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
          {stat}
        </StatNumber>
      </Center>
    </Stat>
  );
}

export default function BasicStatistics({all, onGoing, completed}:BasicStatisticsProps) {
  return (
    <Box maxW="7xl" mx={'auto'} py={5} >
      {/* <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}>
        What is our company doing?
      </chakra.h1> */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'On going'} stat={onGoing} />
        <StatsCard title={'Completed'} stat={completed} />
        <StatsCard title={'All'} stat={all} />
      </SimpleGrid>
    </Box>
  );
}