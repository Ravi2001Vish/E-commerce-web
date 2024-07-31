import React from "react";
import CountUp from "react-countup";
import { Container, Row, Col } from "react-bootstrap";
import { ImFacebook2 } from "react-icons/im";
import { FaCcPaypal } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { TbBrandReact } from "react-icons/tb";
import '../App.css'
const counterdata = [
  {
    id: 1,
    start: 0,
    end: 200,
    icon: <TbBrandReact />,
    para: "EMPLOYEES",
    duration: 8,
  },

  {
    id: 2,
    start: 0,
    end: 5000,

    icon: <FaUsers />,
    para: "USERS",
    duration: 8,
  },
  {
    id: 3,
    start: 0,
    end: 6000,

    icon: <ImFacebook2 />,
    para: "PRODUCTS",
    duration: 8,
  },
  {
    id: 4,
    start: 0,
    end: 3000,

    icon: <FaCcPaypal />,
    para: "CASH BACK",
    duration: 8,
  },
];
const CountUps = () => {
  return (
    <div className="counter">
   <Container>
        <Row>
          {counterdata &&
            counterdata.map((elem, ind) => {
              console.log(counterdata)
              return (
                <Col md={3} key={ind}>
                  <div>
                    <div style={{ display:"flex", justifyContent:"center"}}><span className="icons">{elem.icon}</span></div><br />
                    <h2>
                      <CountUp
                        start={elem.start}
                        end={elem.end}
                        duration={elem.duration}
                      ></CountUp>
                      +
                    </h2>
                    <p>{elem.para}</p>
                  </div>
                </Col>
              );
            })}
        </Row>
        </Container>
        
    </div>
  );
};

export default CountUps;
