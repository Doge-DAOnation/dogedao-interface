import React, { useEffect, useState } from 'react'
import { Flex, Box, Heading, Accordion, AccordionItem, AccordionButton,
	AccordionPanel, AccordionIcon, HStack, Input, Button, useBreakpointValue,
	Text, Fade, useToast } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { EthIcon } from '../assets/icons/EthIcon'
import { estimateGasCost, lgeAddLiquidity, lgeIsAddressProvider } from '../common/ethereum'
import { ethers } from 'ethers'
import { useWallet } from 'use-wallet'
import defaults from '../common/defaults'
import LGEAbi from '../artifacts/abi/LGEAbi'
import { prettifyCurrency } from '../common/utils'
import { walletNotConnected, amountOfEthNotEntered,
	insufficientBalance, failed, rejected, successfulDeposit } from '../messages'

export const PoolList = (props) => {

	const wallet = useWallet()
	const toast = useToast()
	const [value, setValue] = useState(0)
	const [lgeBalance, setLgeBalance] = useState(-1)
	const [working, setWorking] = useState(false)
	const [lgeProvider, setLgeProvider] = useState(false)

	const [onPressTimeout, setOnPressTimeout] = useState(null)
	const inc = () => {
		setValue(prevState => prevState >= 0 ? Number((prevState + 0.1).toFixed(4)) : prevState)
		setOnPressTimeout(setTimeout(inc, 150))
	}
	const dec = () => {
		setValue(prevState => (prevState >= 0.1 ? Number((prevState - 0.1).toFixed(4)) : 0))
		setOnPressTimeout(setTimeout(dec, 150))
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
		minH: '59.1px',
	}

	const itemContentStyle = {
		p: '0 1.5rem 1.6rem',
	}

	const properties = {
		defaultIndex: [0],
		allowMultiple: false,
	}

	useEffect(() => {
		defaults.network.provider.getBalance(
			defaults.network.contract.LGE)
			.then(b => setLgeBalance(b))
			.catch(err => {
				setLgeBalance(false)
				console.log(err)
			})
	}, [])

	useEffect(() => {
		if(wallet.account) {
			const provider = new ethers.providers.Web3Provider(wallet.ethereum)
			lgeIsAddressProvider(wallet.account, provider)
				.then(is => setLgeProvider(is))
				.catch(err => {
					setLgeProvider(false)
					console.log(err)
				})
		}
	}, [wallet.account])

	return (
		<Accordion {...properties} {...style} {...props}>
			<AccordionItem {...itemStyle}>
				<AccordionButton as='div' {...itemTriggerStyle}>
					<Heading as='div' fontSize='1.8rem' display='flex' flex='1'>DD Liquidity Generation Event</Heading>
					<AccordionIcon />
					<Box {...itemDesc}>
						<Box as='i' opacity='0.8'>Donate to the DogeFundMe Pool and help fund good causes.</Box>
					</Box>
					<Flex {...itemStats}>
						<Flex flex='1' flexFlow='column'>
							<Box as='span' {...statVale}>
								{lgeBalance >= 0 &&
									<Fade in={lgeBalance}>
										<Box>Total Value Locked</Box>
										<Box as='span'>{prettifyCurrency(lgeBalance ? ethers.utils.formatEther(lgeBalance.toString()) : '', '0', '5', 'ETH', false)}</Box>
										<Box as='span' fontFamily='arial'>Ξ</Box>
									</Fade>
								}
								{/* {lgeBalance < 0 &&
									<Fade in={lgeBalance}>
										<Box as='i' opacity='0.8'>Loading...</Box>
									</Fade>
								} */}
								{!lgeBalance &&
									<Fade in={lgeBalance}>
										<Box as='i' opacity='0.8'>Not available</Box>
									</Fade>
								}
							</Box>
						</Flex>
						{}
						<Flex flex='1' flexFlow='column'>
							<Box as='span' {...statVale}>
								{lgeProvider &&
										<Fade in={lgeBalance}>
											<Box>Your share</Box>
											<Box as='span' {...statVale}>n/a</Box>
										</Fade>
								}
							</Box>
						</Flex>
					</Flex>
				</AccordionButton>
				<AccordionPanel {...itemContentStyle}>
					<Heading as='div' size='md' display='flex' flex='1' mb='0.3rem'>Deposit Liquidity</Heading>
					<Heading as='div' size='xs' display='flex' flex='1' opacity='0.8'>Amount</Heading>
					<Flex>
						<HStack width='100%'
							maxWidth='313px'
							marginBottom='1rem'>
							<Text as='span'>ETH</Text>
							<EthIcon minWidth='32px' height='32px' />
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
							<Button
								onClick={() => {
									if (!wallet.account) {
										toast(walletNotConnected)
										return
									}
									const provider = new ethers.providers.Web3Provider(wallet.ethereum)
									estimateGasCost(
										defaults.network.contract.LGE, LGEAbi, 'addLiquidity',
										{ value: ethers.utils.parseEther('0.1') },
										 provider,
									).then(c => {
										provider.getGasPrice()
											.then(p => {
												provider.getBalance(wallet.account)
													.then(b => {
														setValue(
															Math.floor(
																Number(
																	ethers.utils.formatEther(b.sub(c.mul(p)))) * 100000) / 100000,
														)
													})
											})
									})
								}}
							>Max</Button>
							<Button flex='1'
								rightIcon={arrowIcon}
								loadingText='Depositing'
								isLoading={working}
								onClick={() => {
									if (!wallet.account) {
										toast(walletNotConnected)
										return
									}
									if (!value) {
										toast(amountOfEthNotEntered)
										return
									}
									const provider = new ethers.providers.Web3Provider(wallet.ethereum)
									setWorking(true)
									lgeAddLiquidity(ethers.utils.parseEther(String(value)), provider)
										.then(() => {
											setWorking(false)
											toast(successfulDeposit)
										})
										.catch((err) => {
											if(err.code === 'INSUFFICIENT_FUNDS') {
												setWorking(false)
												console.log('Insufficient balance: Your account balance is insufficient.')
												toast(insufficientBalance)
											}
											else if(err.code === 4001) {
												setWorking(false)
												console.log('Transaction rejected: Your have decided to reject the transaction..')
												toast(rejected)
											}
											else {
												setWorking(false)
												console.log('Error code is:' + err.code)
												console.log('Error:' + err)
												toast(failed)
											}
										})
								}}
							>
							Deposit
							</Button>
						</HStack>
					</Flex>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	)
}
