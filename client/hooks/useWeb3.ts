import { useEffect, useState } from 'react'
import Web3 from 'web3'
import web3Loaded from '../lib/web3/index'

const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [accounts, setAccounts] = useState<Array<string>>([])

  useEffect(() => {
    const setupWeb3 = async () => {
      const loadedWeb3 = await web3Loaded
      const loadedAccounts = await loadedWeb3.eth.getAccounts()
      setWeb3(loadedWeb3)
      setAccounts(loadedAccounts)
    }
    setupWeb3()
  }, [])

  return { web3, accounts }
}
export default useWeb3
