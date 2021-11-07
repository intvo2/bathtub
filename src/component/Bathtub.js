import React, {useState, useEffect} from 'react'
import {Wrapper, BathtubItem, BathtubWrapper} from "./Styled";
import {Button} from "reactstrap";

const Bathtub = () => {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    if ((currentLevel >= 5 || currentLevel <= 0) && timer !== 0) {
      clearInterval(timer);
      setTimer(0)
    }
  }, [currentLevel, setTimer])

  const controlWaterLevel = (dir) => {
    if (timer === 0) {
      setCurrentLevel(currentLevel => dir ? (currentLevel + 1) : (currentLevel - 1))
      const controlTimer = setInterval(() => setCurrentLevel(currentLevel => dir ?
          (currentLevel >= 5 ? currentLevel : (currentLevel + 1))
          : (currentLevel <= 0 ? currentLevel : (currentLevel - 1))),
          2 * 1000)
      setTimer(controlTimer)
    }
  }

  return (
      <Wrapper>
        <p className="text-center">Bath Tub</p>
        <div className="d-flex">
          <BathtubWrapper>
            {Array(currentLevel).fill(0).map((item, idx) => (
                <BathtubItem key={idx}/>
            ))}
          </BathtubWrapper>
        </div>
        <div className="mb-3">
          <span>{`Current Water Level: ${currentLevel}`}</span>
        </div>
        <div>
          <Button className="mb-3" color="success" disabled={timer !== 0 || currentLevel >= 5}
                  onClick={() => controlWaterLevel(true)}>
            Increase Water Level
          </Button>
          <Button color="primary" className="mb-3" disabled={timer !== 0 || currentLevel <= 0}
                  onClick={() => controlWaterLevel(false)}>
            Decrease Water Level
          </Button>
        </div>
      </Wrapper>
  )
}

export default Bathtub;

