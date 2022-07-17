import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Button, Input, Label, Table } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { 
  resetState,
  setCountMins, 
  countdownExcu,
  countdownSecs, 
  countdownString,
  createParticipants,
  participants,
  lotteryDraw,
  iAmLuckyMan
} from '../features/countdown/Countdown';
import '../css/lottery.css';

const Lottery = (props) => {
  const dispatch = useDispatch();
  const [ timer, settimer ] = useState(null);
  const [ inputVal, setInputVal ] = useState(1);
  const sec = useSelector( countdownSecs );
  const _countdownString = useSelector( countdownString );
  const _participants = useSelector( participants );
  const _luckyMan = useSelector( iAmLuckyMan );

  const inputHandle = (e) => {
    const mins = e.target.value;
    setInputVal(mins);
  }

  const startHandle = () => {
    if(!timer){
      dispatch( resetState() );
      dispatch( setCountMins( inputVal ) );
      const countInterval = setInterval(() => {
        dispatch(countdownExcu());
      }, 1000);
      settimer(countInterval)
    }
  }

  useEffect(() => {
    if ( sec === 0 ) {
      dispatch( lotteryDraw() );
      clearInterval(timer);
      settimer(null);
    }
  }, [sec]);

  useMemo(() => {
    dispatch( createParticipants(10) );
  }, [])


  return (  
    <Container>
      <Row className="m-5">
        <Col xs="12" md="12" >
          <h1>Welcome to the Lottery</h1>
        </Col>
      </Row>
      <Row className="m-5">
        <Col xs="12" md="4">
          <h5>Pleas set the time :</h5>
        </Col>
        <Col xs="4" md="3">
          <Input type='number'  min={1} value={ inputVal } onChange={ inputHandle }/>
        </Col>
        <Label xs="4" md="1">minutes</Label>
        <Col xs="4" md="4">
          <Button color="primary" onClick={ startHandle } >Start</Button> 
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="6">
            <h1 className="mt-3 mb-3 counter">{ _countdownString }</h1>
            {
              _luckyMan !== '' ?
              (
                <div className='lucky_man'>
                  <i className="fa-solid fa-user-ninja bigger lucky_man_icon"></i> 
                  <h2 className="m-3 shake">{_luckyMan}</h2>
                </div>
                
              ) :
              ""
            }
        </Col>
        <Col xs="12" md="6" className='d-flex justify-content-center' style={{overflowY: 'scroll', height: '500px'}}>
          <Table bordered className='customize_table' >
            <tbody>
              {
                _participants.map((p) => (<tr key={p.id}><td><i className="fa-solid fa-user-ninja"></i>{p.name}</td></tr>))
              }
            </tbody>
          </Table>
        </Col>
      </Row>

    </Container>
  )
}

export default Lottery;