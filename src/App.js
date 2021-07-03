import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import dogedao from './themes/dogedao'
import { UseWalletProvider } from 'use-wallet'
import defaults from './common/defaults'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

import Index from './locations/index'

const App = () => {
	return (
		<Router>
			<ChakraProvider theme={dogedao}>
				<UseWalletProvider
					chainId={defaults.network.chainId}
					connectors={defaults.network.connectors}>
					<Header width='100%'
						      p='1.2rem 4vw'
							    justifyContent='center'/>
					<Flex
						height='calc(100vh - 288.4px)'
						justifyContent='flex-start'
						maxW='768px'
						m='0 auto'
						p='5rem 0'
						flexDir='column'>
						<Switch>
							<Route path='/' exact render={() =>
								<Index />
							}/>
							<Route path='*' render={() =>
								<Redirect to={'/'} />
							} />
						</Switch>
					</Flex>
					<Footer m='50px 0'/>
      	</UseWalletProvider>
			</ChakraProvider>
		</Router>
	)
}

export default App