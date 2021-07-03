import React from 'react'
import { Flex, Link } from '@chakra-ui/react'
import { TwitterIcon } from '../assets/icons/TwitterIcon'
import { InstagramIcon } from '../assets/icons/InstagramIcon'
import { YoutubeIcon } from '../assets/icons/YoutubeIcon'
import defaults from '../common/defaults'

export const Footer = (props) => {

	const style = {
		alignItems: 'center',
		flexDirection: 'column',
		position: 'relative',
		zIndex: '-1',
	}

	const iconStyle = {
		width: '42px',
		borderRadius: '50%',
	}

	return (
		<Flex
			{...style}
			{...props}>
			<Link href={defaults.url.homepage}>www.dogedaonation.io</Link>
			<Flex
				flexDir='row'
			>
				<Link href={defaults.url.twitter}><TwitterIcon {...iconStyle} /></Link>
				<Link href={defaults.url.instagram}><InstagramIcon {...iconStyle} /></Link>
				<Link href={defaults.url.youtube}><YoutubeIcon {...iconStyle} /></Link>
			</Flex>
		</Flex>
	)
}
