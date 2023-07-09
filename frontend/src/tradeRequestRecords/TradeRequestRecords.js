import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CurrentUserContext } from '../components/CurrentUserContext'
import { useContext } from 'react'
import ReceivedRecord from './ReceivedRecord'
import OfferedRecord from './OfferedRecord'
import { Container, Button } from 'react-bootstrap'
import { RiArrowGoBackFill } from 'react-icons/ri'
import './TradeRequestRecords.scss'

const API = process.env.REACT_APP_API_URL //localhost:3333

export default function TradeRequestRecords() {
  const { currentUser } = useContext(CurrentUserContext)
  const [requests, setRequests] = useState([])
  const [offers, setOffers] = useState([])

  useEffect(() => {
    if (currentUser.user_id) {
      axios
        .get(`${API}/trades/${currentUser.user_id}/received`)
        .then((res) => {
          if (res.data.success) {
            setRequests(res.data.payload)
          }
        })
        .catch((error) => {
          console.log(error)
          // navigate("/not-found");
        })
    }
  }, [])

  useEffect(() => {
    if (currentUser.user_id) {
      axios
        .get(`${API}/trades/${currentUser.user_id}/offered`)
        .then((res) => {
          if (res.data.success) {
            setOffers(res.data.payload)
          }
        })
        .catch((error) => {
          console.log(error)
          // navigate("/not-found");
        })
    }
  }, [])

  //display the name of receiver and offer, received and offered game name
  function displayTradeReceivedRecord(requests) {
    if (requests.length === 0) return []

    return requests
      .sort((a, b) => a.trade_id - b.trade_id)
      .map((request) => {
        return <ReceivedRecord receivedRequest={request} />
      })
  }

  function displayTradeOfferedRecord(offerRecords) {
    if (offerRecords.length === 0) return []

    return offerRecords
      .sort((a, b) => a.trade_id - b.trade_id)
      .map((offerRecord, index) => {
        return (
          <OfferedRecord
            index={index}
            offeredRequest={offerRecord}
            offers={offers}
            setOffers={setOffers}
          />
        )
      })
  }




  return (
    <Container className='inbox'>
      <Container>
        <h1 className='inbox-title'>Inbox</h1>
        <Container className='tradeCards'>
          {displayTradeReceivedRecord(requests)}
        </Container>
      </Container>
      <hr />
      <Container>
        <h1 className='outbox-title'>Outbox</h1>
        <Container className='tradeCards'>
          {displayTradeOfferedRecord(offers)}
        </Container>
      </Container>
      {/* <button className='goBackButton'>
        <Link to='/userprofile'>
          <RiArrowGoBackFill size={30} />
        </Link>
      </button> */}
    </Container>
  )
}
