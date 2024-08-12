import React, { useState, useEffect } from 'react'
import { FaExchangeAlt, FaWallet, FaEthereum } from 'react-icons/fa'
import { SiSolana, SiBnbchain } from 'react-icons/si'
import { Modal, Button, Form, Select, Typography, message, Radio, Input } from 'antd'
import axios from 'axios'
import { ethers } from 'ethers'
import * as solanaWeb3 from '@solana/web3.js'
import Swal from 'sweetalert2'
import Countdown from './Countdown'
import { BsCopy } from 'react-icons/bs'
import abi from './abi.json'
import Loading from './Loading'
import './Banking.css'
import FooterHome from '../Home/FooterHome'
import Header from '~/layouts/Header/Header'
import { TonConnectButton, useTonConnectUI, useTonAddress } from '@tonconnect/ui-react'
// import { toNano } from '@ton/core'

import { Buffer } from 'buffer'
import { Indexed } from 'ethers/lib/utils'
window.Buffer = Buffer
const { Option } = Select
const { Text } = Typography
const Banking = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [qrValue, setQrvalue] = useState(null)
  const [account, setAccount] = useState('Kết nối ethereum')
  const [accountBnb, setAccountBnb] = useState('Kết nối binance')
  const [accountSol, setAccountSol] = useState('Kết nối solana')
  const [accountTon, setAccountTon] = useState('Kết nối Ton')

  const [balance, setBalance] = useState(null)
  const [ratio, setRatio] = useState(null)
  const [amoutVND, setAmoutVND] = useState(null)
  const [calculatedValu, setCalculatedValu] = useState(null)
  const [visible, setVisible] = useState(false)
  const [sticker, setSticker] = useState('')
  const [modalbank, setModalBank] = useState(false)
  const [amoutMoney, setAmoutMoney] = useState(null)
  const [key, setKey] = useState(0)
  const lamports_per_sol = solanaWeb3.LAMPORTS_PER_SOL
  const [wallet, setwallet] = useState(null)
  const [selectBank, setSeledtBank] = useState(null)
  const [idTransaction, setIdTransaction] = useState('')
  const [acountNumber, setAccountNumber] = useState(null)
  const [nameAcount, setNameAcount] = useState('')
  const USDT_ABI = abi
  const [isloading, setIsLoading] = useState(false)
  const [displayAmount, setDisplayAmount] = useState('')

  const [selectedValue, setSelectedValue] = useState(null)
  const [tonConnectUI, setOptions] = useTonConnectUI()
  const userFriendlyAddress = useTonAddress()
  // const rawAddress = useTonAddress(false)
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  const id = '6650194a729df340ef94f631'

  const restartCountdown = () => {
    setKey((prevKey) => prevKey + 1)
  }

  const handleChange = (e) => {
    const value = e.target.value.replace(/,/g, '').replace(/\D/g, '') // Chỉ cho phép số
    setAmoutVND(value)
    setDisplayAmount(value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')) // Format với dấu phẩy
  }
  function showPurchaseFailureAlert() {
    Swal.fire({
      title: 'Failure!',
      text: 'Your funds are not enough to make the transaction',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }

  function generateCodeOrder(length = 7) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let promoCode = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      promoCode += characters[randomIndex]
    }

    setIdTransaction(promoCode)

    return promoCode
  }

  function generateLink() {
    const bankCode =
      selectBank === 'VTB'
        ? import.meta.env.VITE_API_URL_API_BANK_CODE_VTB
        : import.meta.env.VITE_API_URL_API_BANK_CODE_ACB
    const accountNumber =
      selectBank === 'VTB' ? import.meta.env.VITE_API_URL_API_NUMBER_VTB : import.meta.env.VITE_API_URL_API_NUMBER_ACB

    const name = import.meta.env.VITE_API_URL_API_NAME_ACOUNT
    const memo = generateCodeOrder()

    setAccountNumber(accountNumber)
    setNameAcount(name)

    const baseUrl =
      'https://apiqr.web2m.com/api/generate/{bankCode}/{accountNumber}/{name}?amount={amout}&memo={memo}&is_mask=0&bg=0'

    const link = baseUrl
      .replace('{bankCode}', encodeURIComponent(bankCode))
      .replace('{accountNumber}', encodeURIComponent(accountNumber))
      .replace('{name}', encodeURIComponent(name))
      .replace('{memo}', encodeURIComponent(memo))
      .replace('{amout}', encodeURIComponent(amoutMoney))
    console.log('link', link)
    return link
  }

  const handleAmountChange = (value) => {
    setAmoutMoney(value)
  }

  const handleBankChange = (value) => {
    setSeledtBank(value)
  }

  const handleClose = () => {
    setVisible(false)
    setAmoutVND()
  }

  const showModal = async () => {
    if (amoutMoney && selectBank) {
      const newLink = generateLink()

      setQrvalue(newLink)

      setIsModalVisible(true)
    }
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const Success = () => {
    const formattedAmount = amoutMoney || amoutVND.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    Swal.fire({
      icon: 'success',
      title: 'Nạp tiền thành công',
      text: `Số tiền ${formattedAmount} VND đã được nạp vào tài khoản`,
      confirmButtonText: 'OK'
    })
  }

  async function connectToMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setAccount(address)
        setAccountBnb(address)

        await window.ethereum.request({
          method:
            sticker === 'ETH'
              ? import.meta.env.VITE_API_URL_API_METHOD_ETH
              : import.meta.env.VITE_API_URL_API_METHOD_BNB,

          params: [
            {
              chainId:
                sticker === 'ETH'
                  ? import.meta.env.VITE_API_URL_API_CHAINID_ETH
                  : import.meta.env.VITE_API_URL_API_CHAINID_BNB,
              chainName:
                sticker === 'ETH'
                  ? import.meta.env.VITE_API_URL_API_CHAINAME_ETH
                  : import.meta.env.VITE_API_URL_API_CHAINAME_BNB,
              nativeCurrency: {
                name:
                  sticker === 'ETH'
                    ? import.meta.env.VITE_API_URL_API_NAME_ETH
                    : import.meta.env.VITE_API_URL_API_NAME_BNB,
                symbol:
                  sticker === 'ETH'
                    ? import.meta.env.VITE_API_URL_API_SYMBOL_ETH
                    : import.meta.env.VITE_API_URL_API_SYMBOL_BNB,
                decimals:
                  sticker === 'ETH'
                    ? import.meta.env.VITE_API_URL_API_DECIMALS_ETH
                    : import.meta.env.VITE_API_URL_API_DECIMALS_BNB
              },
              rpcUrls:
                sticker === 'ETH'
                  ? [import.meta.env.VITE_API_URL_API_RPCURL_ETH]
                  : [import.meta.env.VITE_API_URL_API_RPCURL_BNB],
              blockExplorerUrls:
                sticker === 'ETH'
                  ? [import.meta.env.VITE_API_URL_API_BLOCKEXPLORERURL_ETH]
                  : [import.meta.env.VITE_API_URL_API_BLOCKEXPLORERURL_BNB]
            }
          ]
        })

        console.log(sticker)
        const url =
          sticker === 'ETH' ? import.meta.env.VITE_API_URL_API_RPCURL_ETH : import.meta.env.VITE_API_URL_API_RPCURL_BNB

        const providereth = new ethers.providers.JsonRpcProvider(url)

        const balance = await providereth.getBalance(address)

        const Balance = parseInt(balance?._hex, 16) / 10 ** 18

        console.log('balce', Balance)

        setBalance(Balance)
      } catch (error) {
        console.error('Không thể kết nối với MetaMask', error)
      }
    } else {
      console.log('MetaMask chưa được cài đặt!')
    }
  }

  const connectSol = async () => {
    const isPhantomInstalled = window.phantom?.solana?.isPhantom
    if (isPhantomInstalled) {
      const providerPhan = window.phantom?.solana
      if (providerPhan?.isPhantom) {
        try {
          const response = await window.solana.connect()
          setwallet(response)

          const address = response.publicKey.toString()
          setAccountSol(address)

          const connection = new solanaWeb3.Connection(
            'https://go.getblock.io/b5c7ab6bb9864b9797ddbafeeda80970',
            'confirmed'
          )

          const balance = await connection.getBalance(new solanaWeb3.PublicKey(address))
          const balanceInSol = balance / solanaWeb3.LAMPORTS_PER_SOL

          setBalance(balanceInSol)
        } catch (err) {
          console.error('Failed to connect or fetch balance:', err)
        }
      }
    } else {
      console.error('Phantom wallet is not installed.')
    }
  }

  async function exchange(ApiToken) {
    sleep(4000)
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=vndc,${ApiToken}&vs_currencies=usd`

    const response = await axios.get(url)

    const tokenOnePrice = response.data['vndc'].usd

    const tokenTwoPrice = response.data[ApiToken].usd
    console.log(tokenTwoPrice)

    const ratio = tokenOnePrice / tokenTwoPrice

    setRatio(ratio)
  }

  const swapVND = () => {
    const CalculatedValue = ratio * amoutVND
    setCalculatedValu(CalculatedValue.toFixed(4).replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1'))
  }

  async function sendUSDT() {
    const recipientAddress = import.meta.env.VITE_API_URL_API_RECIPIENTADDRESS

    const tokenAddress =
      sticker === 'ETH'
        ? import.meta.env.VITE_API_URL_API_TOKENADDRESS_ETH
        : import.meta.env.VITE_API_URL_API_TOKENADDRESS_BNB

    const amount = ethers.utils.parseUnits(calculatedValu, sticker === 'ETH' ? 6 : 18)

    if (typeof window.ethereum !== 'undefined') {
      // Yêu cầu người dùng kết nối ví MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' })

      await window.ethereum.request({
        method:
          sticker === 'ETH' ? import.meta.env.VITE_API_URL_API_METHOD_ETH : import.meta.env.VITE_API_URL_API_METHOD_BNB,

        params: [
          {
            chainId:
              sticker === 'ETH'
                ? import.meta.env.VITE_API_URL_API_CHAINID_ETH
                : import.meta.env.VITE_API_URL_API_CHAINID_BNB,
            chainName:
              sticker === 'ETH'
                ? import.meta.env.VITE_API_URL_API_CHAINAME_ETH
                : import.meta.env.VITE_API_URL_API_CHAINAME_BNB,
            nativeCurrency: {
              name:
                sticker === 'ETH'
                  ? import.meta.env.VITE_API_URL_API_NAME_ETH
                  : import.meta.env.VITE_API_URL_API_NAME_BNB,
              symbol:
                sticker === 'ETH'
                  ? import.meta.env.VITE_API_URL_API_SYMBOL_ETH
                  : import.meta.env.VITE_API_URL_API_SYMBOL_BNB,
              decimals:
                sticker === 'ETH'
                  ? import.meta.env.VITE_API_URL_API_DECIMALS_ETH
                  : import.meta.env.VITE_API_URL_API_DECIMALS_BNB
            },
            rpcUrls:
              sticker === 'ETH'
                ? [import.meta.env.VITE_API_URL_API_RPCURL_ETH]
                : [import.meta.env.VITE_API_URL_API_RPCURL_BNB],
            blockExplorerUrls:
              sticker === 'ETH'
                ? [import.meta.env.VITE_API_URL_API_BLOCKEXPLORERURL_ETH]
                : [import.meta.env.VITE_API_URL_API_BLOCKEXPLORERURL_BNB]
          }
        ]
      })

      const provider = new ethers.providers.Web3Provider(window.ethereum)

      const signer = provider.getSigner()

      const _id = (await signer.getAddress()).toString()

      const tokenContract = new ethers.Contract(tokenAddress, USDT_ABI, signer)

      // const estimatedGasLimit = await tokenContract.estimateGas.transfer(
      //   recipientAddress,
      //   amount
      // );

      // const increasedGasLimit = estimatedGasLimit.mul(110).div(100);

      try {
        setIsLoading(true)
        // console.log(recipientAddress)
        // console.log(amount)
        const tx = await tokenContract.transfer(recipientAddress, amount)

        // console.log("Transaction Hash:", tx.hash);

        const RecientTransaction = await tx.wait()

        if (RecientTransaction) {
          await axios.put(`${import.meta.env.VITE_API_URL_API_UPDATE_BANKING}${id}`, {
            nameBank: sticker,
            balance: amoutVND
          })
          setIsLoading(false)
          Success()
        }
      } catch (error) {
        console.error('Transaction failed:', error)
        setIsLoading(false)
        showPurchaseFailureAlert()
      }
    } else {
      alert('Please install MetaMask!')
    }
  }

  async function sendSol() {
    const receiverAddress = import.meta.env.VITE_API_URL_API_RECEIVERADDRESSOL

    if (calculatedValu != null && calculatedValu != 0) {
      setIsLoading(true)

      try {
        const Transactioned = await signInTransactionAndSendMoney(receiverAddress, calculatedValu)

        if (Transactioned) {
          await axios.put(`${import.meta.env.VITE_API_URL_API_UPDATE_BANKING}${id}`, {
            nameBank: sticker,
            balance: amoutVND
          })

          setIsLoading(false)

          Success()
        }
      } catch {
        setIsLoading(false)

        showPurchaseFailureAlert()
      }
    } else {
      console.log('err')
    }
  }

  async function sendTon() {
    setVisible(false)
    try {
      const defaultTx = {
        validUntil: Math.floor(Date.now() / 1000) + 30,
        messages: [
          {
            // address: 'EQCKWpx7cNMpvmcN5ObM5lLUZHZRFKqYA4xmw9jOry0ZsF9M',
            address: import.meta.env.VITE_API_URL_RECEIVE_ADDRESS,

            amount: calculatedValu.toString() * 1e9,

            stateInit:
              'te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==',

            payload: 'te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g=='
          }
        ]
      }

      const Transactioned = await tonConnectUI.sendTransaction(defaultTx)

      if (Transactioned) {
        await axios.put(`${import.meta.env.VITE_API_URL_API_UPDATE_BANKING}${id}`, {
          nameBank: sticker,
          balance: amoutVND
        })

        setIsLoading(false)

        Success()
      }
    } catch {
      setIsLoading(false)

      showPurchaseFailureAlert()
    }
  }

  async function signInTransactionAndSendMoney(destPubkeyStr, quantity) {
    const network = 'https://go.getblock.io/b5c7ab6bb9864b9797ddbafeeda80970'
    const connection = new solanaWeb3.Connection(network)

    try {
      const connection = new solanaWeb3.Connection(
        'https://go.getblock.io/b5c7ab6bb9864b9797ddbafeeda80970',
        'confirmed'
      )

      // Chuyển đổi số tiền từ SOL sang lamports
      const lamports = parseFloat(quantity) * solanaWeb3.LAMPORTS_PER_SOL

      const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey: new solanaWeb3.PublicKey(wallet.publicKey),
          toPubkey: new solanaWeb3.PublicKey(destPubkeyStr),
          lamports
        })
      )

      // Cung cấp thông tin giao dịch
      transaction.feePayer = new solanaWeb3.PublicKey(wallet.publicKey)
      const { blockhash } = await connection.getRecentBlockhash()
      transaction.recentBlockhash = blockhash

      // Ký và gửi giao dịch
      const signedTransaction = await window.solana.signTransaction(transaction)
      const signature = await connection.sendRawTransaction(signedTransaction.serialize(), { skipPreflight: false })

      // Xác nhận giao dịch
      await connection.confirmTransaction(signature, 'confirmed')
      return signature
    } catch (err) {
      console.warn('Failed', err.me)
      console.error('Transaction Error:', err)

      throw e
    }
  }

  function confirmSendCoin() {
    if (sticker == 'ETH' || sticker === 'BNB') {
      sendUSDT()
    } else if (sticker == 'SOL') {
      sendSol()
    } else {
      sendTon()
    }
  }

  const handleSearch = (Transaction) => {
    console.log('idTransaction', idTransaction)
    const result = Transaction.filter(
      (transaction) => transaction.remark.includes(idTransaction) && transaction.amount === amoutMoney
    )

    console.log('result', result)

    if (result.length > 0) {
      return true
    }
    return false
  }

  const getTransaction = async () => {
    const res = await axios.get(
      selectBank === 'VTB'
        ? `${import.meta.env.VITE_API_URL_API_TRANSACTION_VIETTIN}`
        : `${import.meta.env.VITE_API_URL_API_TRANSACTION_ACB}`
    )

    const Transaction = res.data?.data?.transactions

    const Checkid = handleSearch(Transaction)

    if (Checkid) {
      const PostBalane = await axios.put(`${import.meta.env.VITE_API_URL_API_UPDATE_BANKING}${id}`, {
        nameBank: selectBank,
        balance: amoutMoney
      })

      setIsModalVisible(false)

      Success()
    } else {
      console.log('chua cos giao dich')
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)

    message.success('Sao chép thành công!')
  }

  useEffect(() => {
    swapVND()
  }, [amoutVND])

  useEffect(() => {
    let interval

    if (isModalVisible) {
      interval = setInterval(
        getTransaction,

        parseInt(import.meta.env.VITE_API_URL_API_TIMECALLAPI, 10)
      )

      console.log('Interval ID:', interval)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isModalVisible, idTransaction])

  const connectTon = () => {
    document.querySelector('.my-button-class button').click()
  }

  useEffect(() => {
    const connectFunctions = {
      ETH: connectToMetaMask,
      BNB: connectToMetaMask,
      SOL: connectSol,
      TON: connectTon
    }

    const connect = connectFunctions[sticker]
    if (connect) {
      connect()
    }
  }, [sticker])

  return (
    <>
      <div>
        <Header />
        <div className='wrap-banking'>
          {isloading && <Loading />}
          <div className='Home'>
            <h3 className='text-center title-baking'>Nạp tiền vào MMO</h3>

            <div className='Home-body-banking'>
              <div className='card-container'>
                <div
                  className='card'
                  onClick={() => {
                    setModalBank(true)
                  }}
                >
                  <div className='card-icon'>
                    <FaExchangeAlt size={32} color='#00B14F' />
                  </div>
                  <div className='card-content '>
                    <h4>Chuyển khoản</h4>
                    <p>Nạp tiền qua chuyển khoản từ ứng dụng ngân hàng khác vào MMO</p>
                  </div>
                </div>
                <div
                  className='card'
                  onClick={() => {
                    setVisible(true)
                  }}
                >
                  <div className='card-icon'>
                    <FaWallet size={32} color='#00B14F' />
                  </div>
                  <div className='card-content'>
                    <h4>Kết nối ví</h4>
                    <p>Kết nối ví của bạn để thực hiện các giao dịch một cách nhanh chóng và tiện lợi</p>
                  </div>
                </div>
              </div>

              <Modal open={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} width={800}>
                <div className='container-banking'>
                  <div className='qr-container'>
                    <img src={qrValue}></img>
                  </div>

                  <div className='account-info'>
                    <div className='info-item'>
                      <span className='label'>Số tài khoản:</span>
                      <span className='value'>{acountNumber}</span>

                      <BsCopy className='copy-button' onClick={() => handleCopy(acountNumber)} />
                    </div>
                    <div className='info-item'>
                      <span className='label'>Chủ tài khoản:</span>
                      <span className='value'> {import.meta.env.VITE_API_URL_API_NAME_ACOUNT}</span>
                    </div>
                    <div className='info-item'>
                      <span className='label'>Ngân hàng:</span>
                      <span className='value'> {selectBank === 'VTB' ? 'Techcombank' : 'ACB'}</span>
                    </div>
                    <div className='info-item'>
                      <span className='label'>Nội dung nạp:</span>
                      <span className='value'>{idTransaction}</span>

                      <BsCopy className='copy-button' onClick={() => handleCopy(idTransaction)} />
                    </div>
                  </div>
                </div>

                <Countdown
                  key={key}
                  initialTime={import.meta.env.VITE_API_URL_API_TIME_BANK}
                  setModalBank={setIsModalVisible}
                />
              </Modal>
              <Modal
                title='Kết nối tới ví'
                open={visible}
                onCancel={handleClose}
                footer={null}
                width={800}
                className='modal-connect'
              >
                <div className='body-connect'>
                  <div className='list-button'>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}
                    >
                      <Button
                        type='primary'
                        block
                        className='btnConnect'
                        onClick={() => {
                          // connectToMetaMask()
                          exchange('ethereum')
                          setSticker('ETH')
                        }}
                      >
                        <FaEthereum />
                        {account.length > 16 ? account.slice(0, 4) + ' ... ' + account.slice(-4) : account}
                      </Button>

                      <Button
                        type='primary'
                        style={{ position: 'relative' }}
                        className='btnConnect'
                        block
                        onClick={() => {
                          // connectTon()
                          setVisible(false)
                          exchange('the-open-network')
                          setSticker('TON')
                        }}
                      >
                        <TonConnectButton className='my-button-class' style={{ display: 'none' }} />

                        {/* <img
                          style={{ width: '20px', color: '#000' }}
                          src='https://storage.getblock.io/web/web/images/coins/ton.svg'
                        ></img> */}

                        {userFriendlyAddress.length > 16
                          ? userFriendlyAddress.slice(0, 4) + ' ... ' + userFriendlyAddress.slice(-4)
                          : accountTon}
                      </Button>
                      <Button
                        type='primary'
                        block
                        className='btnConnect'
                        onClick={() => {
                          // connectToMetaMask()
                          exchange('binancecoin')
                          setSticker('BNB')
                        }}
                      >
                        <SiBnbchain />
                        {accountBnb.length > 16 ? accountBnb.slice(0, 4) + ' ... ' + account.slice(-4) : accountBnb}
                      </Button>

                      <Button
                        type='primary'
                        block
                        className='btnConnect'
                        onClick={() => {
                          // connectSol()
                          exchange('solana')
                          setSticker('SOL')
                        }}
                      >
                        <SiSolana />{' '}
                        {accountSol.length > 16 ? accountSol.slice(0, 4) + ' ... ' + accountSol.slice(-4) : accountSol}
                      </Button>
                    </div>
                  </div>

                  <div className='wallet-card'>
                    <div className='wallet-header'>
                      <span>Amount</span>

                      <span className='balance'>
                        Balance: {balance || 0.0} {sticker}{' '}
                      </span>
                    </div>

                    <div className='input-group'>
                      <input
                        type='text'
                        className='wallet-input'
                        onChange={handleChange}
                        value={displayAmount}
                        style={{ color: '#ffff' }}
                        placeholder='VND'
                      />

                      <input
                        className='wallet-input'
                        style={{ color: '#ffff', borderLeftColor: '#D9D9D9' }}
                        disabled={true}
                        value={calculatedValu}
                      />
                    </div>

                    <button
                      className='connect-wallet'
                      onClick={() => {
                        confirmSendCoin()
                      }}
                    >
                      Nạp tiền
                    </button>
                  </div>
                </div>
              </Modal>

              <Modal
                title='Nạp tiền'
                open={modalbank}
                onOk={handleOk}
                onCancel={() => {
                  setModalBank(false)
                  setAmoutMoney()
                }}
                footer={null}
                className='modal-baking'
              >
                <Form layout='vertical'>
                  <Form.Item label='Chọn số tiền cần nạp'>
                    <Radio.Group
                      onChange={(e) => {
                        handleAmountChange(e.target.value)
                      }}
                      value={amoutMoney}
                    >
                      <div className='list-item-amout'>
                        <Radio.Button value='20000'>20.000</Radio.Button>
                        <Radio.Button value='50000'>50.000</Radio.Button>
                        <Radio.Button value='100000'>100.000</Radio.Button>
                        <Radio.Button value='200000'>200.000</Radio.Button>
                        <Radio.Button value='500000'>500.000</Radio.Button>
                        <Radio.Button value='1000000'>1.000.000</Radio.Button>
                        <Radio.Button value='2000000'>2.000.000</Radio.Button>
                        <Radio.Button value='5000000'>5.000.000</Radio.Button>
                      </div>
                    </Radio.Group>
                    {/* {selectedValue && <div style={{ marginTop: '20px' }}>Bạn đã chọn: {selectedValue}</div>} */}
                  </Form.Item>

                  <div className='amount-container'>
                    <span className='label'>
                      Số tiền (<span className='balance'>số dư: 100.034 đ</span>)
                    </span>
                    {amoutMoney && <div className='amount'>{Number(amoutMoney).toLocaleString('vi-VN') + ' đ'}</div>}
                  </div>

                  <Form.Item className='bank-select-container'>
                    <label className='label' htmlFor='bank-select'>
                      Chọn ngân hàng
                    </label>
                    <Select
                      className='custom-select'
                      id='bank-select'
                      placeholder='-- Chọn ngân hàng --'
                      style={{ width: '100%' }}
                      dropdownClassName='custom-dropdown'
                      onChange={handleBankChange}
                    >
                      <Option value='ACB'>Ngân hàng ACB</Option>
                      <Option value='VTB'>Ngân hàng VietTinBank</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item className='deposit-form'>
                    <div className='limits'>
                      <div className='limit'>
                        <span className='label'>Tối thiểu:</span>
                        <span className='value'>10.000 VNDC</span>
                      </div>
                      <div className='limit'>
                        <span className='label'>Tối đa:</span>
                        <span className='value'>2.000.000 VNDC</span>
                      </div>
                    </div>
                    <button
                      className='deposit-button'
                      onClick={() => {
                        showModal()
                        restartCountdown()
                      }}
                      disabled={!amoutMoney || !selectBank}
                    >
                      Nạp tiền
                    </button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
        <FooterHome />
      </div>
    </>
  )
}

export default Banking
