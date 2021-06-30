import React, { useState } from 'react'
import { Flex, Box, Heading, Accordion, AccordionItem, AccordionButton,
	AccordionPanel, AccordionIcon, HStack, Input, Button, useBreakpointValue } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

export const PoolList = (props) => {

	const [value, setValue] = useState(0)
	const [onPressTimeout, setOnPressTimeout] = useState(null)

	const inc = () => {
		setValue(prevState => Number(prevState + 1))
		setOnPressTimeout(setTimeout(inc, 200))
	}

	const dec = () => {
		if (value <= 1) {
			setValue(0)
		}
		else {
			setValue(prevState => (prevState >= 1 ? prevState - 1 : 0))
			setOnPressTimeout(setTimeout(dec, 200))
		}
	}

	const stop = () => {
		clearTimeout(onPressTimeout)
		setOnPressTimeout(null)
	}

	const arrowIcon = useBreakpointValue({
		sm: <ArrowForwardIcon verticalAlign='super'/>,
	})

	const style = {
		width: '100%',
	}

	const itemStyle = {
		border: 'none',
		borderRadius: '25px',
		bg: 'blue.300',
		color: 'white',
		p: '0',
		mb: '1.7rem',
	}

	const itemTriggerStyle = {
		flexDirection: 'row',
		flexWrap: 'wrap',
		p: '1.6rem 1.5rem',
		_hover: {
			bg: 'transparent',
			cursor: 'pointer',
		},
	}

	const itemDesc = {
		width: '100%',
		display: 'block',
		mb: '1rem',
	}

	const itemStats = {
		width: '100%',
		display: 'flex',
	}

	const statVale = {
		fontSize: '1.2rem',
	}

	const itemContentStyle = {
		p: '0 1.5rem 1.6rem',
	}

	const properties = {
		defaultIndex: [0],
		allowMultiple: false,
	}

	return (
		<Flex
			{...props}
		>

			<Accordion {...properties} {...style}>
				<AccordionItem {...itemStyle}>
					<AccordionButton as='div' {...itemTriggerStyle}>
						<Heading as='div' fontSize='1.8rem' display='flex' flex='1'>DogeFundMe</Heading>
						<AccordionIcon />
						<Box {...itemDesc}>
							<i>Donate to the DongFundMe Pool and help fund good causes.</i>
						</Box>
						<Flex {...itemStats}>
							<Flex flex='1' flexFlow='column'>
								<span>Total Value Locked</span>
								<Box as='span' {...statVale}>$100.000 M</Box>
							</Flex>
							<Flex flex='1' flexFlow='column'>
								<span>APY</span>
								<Box as='span' {...statVale}>24%</Box>
							</Flex>
						</Flex>
					</AccordionButton>
					<AccordionPanel {...itemContentStyle}>
						<Heading as='div' size='md' display='flex' flex='1'>Deposit</Heading>
						<Flex>
							<HStack width='100%'
								maxWidth='313px'
								marginBottom='1rem'>
								<Input variant='filled'
						   marginRight='0.5rem'
						   overflow='hidden'
						   fontWeight='bold'
						   value={value}
						   onChange={(event) => setValue(event.target.value)}
								/>
							</HStack>
							<HStack width='100%'
								paddingRight='0.5rem'
								marginBottom='1rem'>
								<Button onMouseDown={dec}
									onTouchStart={dec}
									onMouseUp={stop}
									onTouchEnd={stop}
									onMouseLeave={stop}
								>-</Button>
								<Button onMouseDown={inc}
									onTouchStart={inc}
									onMouseUp={stop}
									onTouchEnd={stop}
									onMouseLeave={stop}
								>+</Button>
								<Button>Max</Button>
								<Button flex='1'
									rightIcon={arrowIcon}
									loadingText='Depositing'
								>
							Deposit
								</Button>
							</HStack>
						</Flex>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem {...itemStyle}>
					<AccordionButton as='div' {...itemTriggerStyle}>
						<Heading as='div' fontSize='1.8rem' display='flex' flex='1'>Voting Credits</Heading>
						<AccordionIcon />
						<Box {...itemDesc}>
							<i>Donate to the DongFundMe Pool and help fund good causes.</i>
						</Box>
						<Flex {...itemStats}>
							<Flex flex='1' flexFlow='column'>
								<span>Total Value Locked</span>
								<Box as='span' {...statVale}>$100.000 M</Box>
							</Flex>
							<Flex flex='1' flexFlow='column'>
								<span>APY</span>
								<Box as='span' {...statVale}>24%</Box>
							</Flex>
						</Flex>
					</AccordionButton>
					<AccordionPanel {...itemContentStyle}>
						<Heading as='div' size='md' display='flex' flex='1'>Deposit</Heading>
						<Flex>
							<HStack width='100%'
								maxWidth='313px'
								marginBottom='1rem'>
								<Input variant='filled'
						   marginRight='0.5rem'
						   overflow='hidden'
						   fontWeight='bold'
						   value={value}
						   onChange={(event) => setValue(event.target.value)}
								/>
							</HStack>
							<HStack width='100%'
								paddingRight='0.5rem'
								marginBottom='1rem'>
								<Button onMouseDown={dec}
									onTouchStart={dec}
									onMouseUp={stop}
									onTouchEnd={stop}
									onMouseLeave={stop}
								>-</Button>
								<Button onMouseDown={inc}
									onTouchStart={inc}
									onMouseUp={stop}
									onTouchEnd={stop}
									onMouseLeave={stop}
								>+</Button>
								<Button>Max</Button>
								<Button flex='1'
									rightIcon={arrowIcon}
									loadingText='Depositing'
								>
							Deposit
								</Button>
							</HStack>
						</Flex>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</Flex>
	)
}
