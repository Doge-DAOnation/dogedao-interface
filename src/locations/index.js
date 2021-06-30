import React from 'react'
import defaults from '../common/defaults'
import { Box, Heading } from '@chakra-ui/react'
import { PoolList } from '../components/PoolList'
import { LineStraight } from '../components/LineStraight'

const Index = () => {

	return (
		<Box
			maxW={defaults.layout.width}
			m='0 auto'>
			<Heading as='div'>
				<Box as='span' pl='9px'>Overview</Box>
				<LineStraight/>
			</Heading>
			<PoolList/>
		</Box>
	)
}

export default Index
