import React from 'react'
import './newsletter.css';
import { Container, Col, Row} from 'reactstrap';
import maleTourist from '../assets/images/male-tourist.png';

const Newsletter = () => {
  return <section className='newsletter'>
    <Container>
        <Row>
            <Col lg = '6'>
                <div className="newsletter__content">
                    <h2>Subscribe now to get useful traveling information.</h2>
                <div className="newsletter__input">
                    <input type='email' placeholder='Enter your email' />
                        <button className='btn newsletter__btn'>Subscribe</button>
                </div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam sint harum, dolores aspernatur numquam dolor delectus, mollitia in cumque deserunt facilis eaque dolorem laborum est provident eligendi ab accusantium atque culpa id placeat at beatae eos veritatis. Ipsa, fugit quia?</p>
                </div>
            </Col>
            <Col lg = '6' >
                <div className="newsletter__img">
                    <img src={maleTourist} alt=''/>
                </div>
            </Col>
        </Row>
    </Container>
  </section>
}

export default Newsletter
