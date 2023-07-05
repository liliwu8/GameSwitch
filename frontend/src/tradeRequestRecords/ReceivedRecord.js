import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Card, Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import './ReceivedRecord.scss'
import { MdOutlineSync } from 'react-icons/md'

const API = process.env.REACT_APP_API_URL //localhost:3333

export default function ReceivedRecord({ receivedRequest }) {
  const [status, setStatus] = useState(receivedRequest.trade_success)
  const [request, setRequest] = useState(receivedRequest)

  const navigate = useNavigate()
  const accept = () => {
    const acceptRequest = {}
    acceptRequest.trade_complete_from_offerer =
      receivedRequest.trade_complete_from_offerer
    acceptRequest.trade_complete_from_receiver =
      receivedRequest.trade_complete_from_receiver
    acceptRequest.trade_success = 'accepted'
    receivedRequest.trade_success = 'accepted'
    acceptRequest.trade_id = receivedRequest.trade_id

    //console.log("accepted request", acceptRequest);

    axios
      .put(`${API}/trades/updatetrade`, acceptRequest)
      .then((res) => {
        setStatus('accepted')
        notify()
      })
      .catch((error) => console.log(error))
  }

  const reject = () => {
    const rejectRequest = {}
    rejectRequest.trade_complete_from_offerer =
      receivedRequest.trade_complete_from_offerer
    rejectRequest.trade_complete_from_receiver =
      receivedRequest.trade_complete_from_receiver
    rejectRequest.trade_success = 'rejected'
    receivedRequest.trade_success = 'rejected'
    rejectRequest.trade_id = receivedRequest.trade_id

    axios
      .put(`${API}/trades/updatetrade`, rejectRequest)
      .then((res) => {
        setStatus('rejected')
      })
      .catch((error) => console.log(error))
  }

  const completeTrade = () => {
    receivedRequest.trade_complete_from_receiver = true

    if (receivedRequest.trade_complete_from_offerer === true) {
      receivedRequest.trade_success = 'Completed'
      //swap games here
      const gamesInfo = {}
      gamesInfo.offerer_id = receivedRequest.trade_offerer_user_id
      gamesInfo.receiver_id = receivedRequest.trade_receiver_user_id
      gamesInfo.offerer_game_id = receivedRequest.trade_offerer_game_id
      gamesInfo.receiver_game_id = receivedRequest.trade_receiver_game_id
      axios
        .put(`${API}/trades/swapgames`, gamesInfo)
        .then((res) => {
          // setRequest(res.data.payload);
          setStatus('Completed')
        })
        .catch((error) => console.log(error))
    }

    axios
      .put(`${API}/trades/updatetrade`, receivedRequest)
      .then((res) => {
        setRequest(res.data.payload)
      })
      .catch((error) => console.log(error))
    navigate('/userprofile')
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  let dateString = receivedRequest.created_at

  
  const notify = () => {
    toast.success(
      'You have accepted the trade! Please contact the user to coordinate switching games!',
      {
        position: 'top-center',
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
      }
    )
    setTimeout(() => {
      navigate('/traderequestrecords')
    }, 3100)
  }

  const accepting =
    receivedRequest.trade_success === 'Completed' ||
    receivedRequest.trade_complete_from_offerer === true ||
    receivedRequest.trade_complete_from_receiver === true ? null : (
      <Button variant='warning' onClick={reject}>
        Reject
      </Button>
    )

  const rejecting =
    receivedRequest.trade_success === 'pending' ||
    receivedRequest.trade_success === 'rejected' ||
    receivedRequest.trade_success === 'Completed' ? null : (
      <Button
        variant='success'
        onClick={completeTrade}
        className='complete-button'
      >
        Complete Trade
      </Button>
    )
  return (
    <Card style={{ width: '20rem', textAlign: 'left', margin: '6px' }}>
      <Card.Body>
        <Card.Title> Date: {formatDate(dateString)}</Card.Title>
        <h5>Trade Status: {status}</h5>
        <Card.Title>
          {receivedRequest.offer_name} Complete Status:{' '}
          {request.trade_complete_from_offerer ? 'accept' : '⏳'}
        </Card.Title>
        <Card.Title>
          {receivedRequest.receiver_name} Complete Status:{' '}
          {request.trade_complete_from_receiver ? 'accept' : '⏳'}
        </Card.Title>
        {/* <Card.Text> */}
        <div className='tradingBox'>
          <div className='tradingBox__offerer'>
            <p>{`${receivedRequest.offer_name} Offered `}</p>
            <span>
              <Link
                to={`/games/${receivedRequest.trade_offerer_game_id}`}
              >{`${receivedRequest.offerer_game_name} `}</Link>
            </span>
            <img
              src={receivedRequest.offerer_game_img}
              className='tradingBox__img'
              alt='trade-pic'
            />{' '}
            {receivedRequest.trade_success ===
            'unavailable' ? null : receivedRequest.trade_success ===
                'Completed' ||
              receivedRequest.trade_complete_from_offerer === true ||
              receivedRequest.trade_complete_from_receiver === true ? null : (
              <Button
                variant='primary'
                onClick={accept}
                className='buttons__accept'
              >
                Accept
              </Button>
            )}
          </div>
          <div className='trading__receiver'>
            <p>{`${receivedRequest.receiver_name}`}</p>
            <span>
              <Link
                to={`/games/${receivedRequest.trade_receiver_game_id}`}
              >{`${receivedRequest.receiver_game_name}`}</Link>
            </span>
            <img
              src={receivedRequest.receiver_game_img}
              width='100'
              height='100'
              alt='trade-pic'
              className='tradingBox__img'
            />
            {receivedRequest.trade_success === 'unavailable' ? null : accepting}
          </div>
        </div>
        <ToastContainer autoClose={2000} theme='light' />
        {receivedRequest.trade_success === 'unavailable' ? null : rejecting}
      </Card.Body>
    </Card>
  )
}
