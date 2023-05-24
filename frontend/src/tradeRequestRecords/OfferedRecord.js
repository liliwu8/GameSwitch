import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { setLogLevel } from 'firebase/app'
import { Card, Row, Container, Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import './OfferedRecord.scss'

const API = process.env.REACT_APP_API_URL //localhost:3333

export default function OfferedRecord({
  offeredRequest,
  offers,
  setOffers,
  index,
}) {
  const [offerInfo, setOfferInfo] = useState(offeredRequest)
  let navigate = useNavigate()
  const cancel = () => {
    const gameOffers = [...offers]
    gameOffers.splice(index, 1)
    axios
      .delete(`${API}/trades/${offeredRequest.trade_id}`)
      .then((res) => {
        setOffers(gameOffers)
      })
      .catch((error) => console.log(error))
  }

  const notify = () => {
    toast.success('Trade Complete! Now your game collection will be updated.', {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true,
      progress: undefined,
    })
    setTimeout(() => {
      navigate('/gamecollection')
    }, 3100)
  }

  const completeTrade = () => {
    offeredRequest.trade_complete_from_offerer = true
    //setOfferInfo(offeredRequest)
    console.log('offeredRequest', offeredRequest)

    if (offeredRequest.trade_complete_from_receiver === true) {
      offeredRequest.trade_success = 'Completed'
      //swap the games here
      const gamesInfo = {}
      gamesInfo.offerer_id = offeredRequest.trade_offerer_user_id
      gamesInfo.receiver_id = offeredRequest.trade_receiver_user_id
      gamesInfo.offerer_game_id = offeredRequest.trade_offerer_game_id
      gamesInfo.receiver_game_id = offeredRequest.trade_receiver_game_id

      axios
        .put(`${API}/trades/swapgames`, gamesInfo)
        .then((res) => {
          notify()
          // setOfferInfo(offeredRequest)
        })
        .catch((error) => console.log(error))
    }

    //setOfferInfo(offeredRequest)

    axios
      .put(`${API}/trades/updatetrade`, offeredRequest)
      .then((res) => {
        // setOfferInfo(offeredRequest);
      })
      .catch((error) => console.log(error))
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  let dateString = offeredRequest.created_at

  console.log('offered made', offeredRequest)

  function completion() {
    completeTrade()
    setOfferInfo(offeredRequest)
  }
  return (
    <Card style={{ width: '20rem', textAlign: 'left' }}>
      <Card.Body>
        <Card.Title>Sent Date: {formatDate(dateString)}</Card.Title>
        <h5>Trade Status: {offeredRequest.trade_success}</h5>
        <Card.Title>
          {offeredRequest.offer_name} Trade Status:{' '}
          {offerInfo.trade_complete_from_offerer ? 'accept' : '⏳'}
        </Card.Title>
        <Card.Title>
          {offeredRequest.receiver_name} Trade Status:{' '}
          {offerInfo.trade_complete_from_receiver ? 'accept' : '⏳'}
        </Card.Title>
        <div className='outbox'>
          <div className='outbox__offerer'>
            <p>{`${offeredRequest.offer_name} Offered `}</p>
            <span>
              <Link
                to={`/games/${offeredRequest.trade_offerer_game_id}`}
              >{`${offeredRequest.offerer_game_name} `}</Link>
            
            </span>
            <img src={offeredRequest.offerer_game_img} alt='pic' width={100} height={100}/>
          </div>
          <div>
            <p>{`${offeredRequest.receiver_name}`}</p>
            <span>
              <Link to={`/games/${offeredRequest.trade_receiver_game_id}`}>
                {`${offeredRequest.receiver_game_name}`}
              </Link>
            </span>
            <img src={offeredRequest.receiver_game_img} width={100} height={100}/>
          </div>
        </div>

        {offeredRequest.trade_success === 'accepted' ||
        offeredRequest.trade_success === 'Completed' ? null : (
          <Button variant='light' onClick={cancel}>
            Cancel
          </Button>
        )}
        <br></br>
        <br></br>
        {offeredRequest.trade_success === 'rejected' ||
        offeredRequest.trade_success === 'pending' ||
        offeredRequest.trade_success === 'Completed' ? null : (
          <Button
            variant='success'
            onClick={() => {
              completion()
            }}
          >
            Confirm Complete Trade
          </Button>
        )}
      </Card.Body>
      <ToastContainer autoClose={2000} theme='light' />
    </Card>
  )
}
