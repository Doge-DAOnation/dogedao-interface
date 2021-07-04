import { ethers } from 'ethers'

const defaults = {}

defaults.network = {}
defaults.network.connector = undefined
defaults.network.chainId = Number(process.env.REACT_APP_CHAIN_ID)

defaults.network.provider = new ethers.providers.WebSocketProvider(
	process.env.REACT_APP_WS_URL,
	defaults.network.chainId,
)

defaults.network.contract = {}
defaults.network.contract.LGE = '0xc45ea36636A3778D35D6B3226256b942c4A10739'

defaults.toast = {}
defaults.toast.duration = 5000
defaults.toast.closable = true
defaults.toast.position = 'bottom-right'

defaults.url = {}
defaults.url.homepage = 'https://dogedaonation.io/'
defaults.url.twitter = 'https://twitter.com/DDaonation'
defaults.url.youtube = 'https://www.youtube.com/channel/UCC2Zb4mbtVEPzhC_oKvV5KA'
defaults.url.telegram = 'https://t.me/joinchat/Cm6RYWhRr9U0MzAx'
defaults.url.instagram = 'https://www.instagram.com/dogedaonation/'
defaults.url.github = 'https://github.com/Doge-DAOnation/'

export default defaults
