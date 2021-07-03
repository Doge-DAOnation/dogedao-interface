import React from 'react'
import { Flex, Spacer, useColorModeValue, useBreakpointValue } from '@chakra-ui/react'

import { Logotype } from './Logotype'
import { WalletConnectionToggle } from './WalletConnectionToggle'
// import { ColorModeSwitcher } from './ColorModeSwitcher'

export const Header = (props) => {

	const bg = useColorModeValue('accent.light', 'accent.dark')
	const size = useBreakpointValue({
		base: 'sm',
		sm: 'sm',
		md: 'md',
	})

	return (
		<Flex
			{...props}
			bg={bg}>
			<Flex w="33%">
				<Logotype h='84px'
					transform='scale(1.2)'
				/>
			</Flex>
			<Spacer />
			<Flex w="33%"
				justifyContent='flex-end'
				alignItems='center'
			>
				<WalletConnectionToggle
					marginLeft='0.6rem'
					size={size} />
				{/* <ColorModeSwitcher marginLeft='0.6rem' /> */}
			</Flex>
		</Flex>
	)
}
