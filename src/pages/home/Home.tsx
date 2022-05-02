import React from 'react'
import styled from 'styled-components'
class Home extends React.Component<any, any> {
  handleClick = () => {
    console.log('click', this)
  }
  render() {
    return (
      <Wrapper>
        <button onClick={() => this.handleClick}>点击</button>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: #000;
`
export default Home
