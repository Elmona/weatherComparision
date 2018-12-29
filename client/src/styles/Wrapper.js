import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #FFF; 
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  padding-bottom: 60px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: 1px solid #CCC;
  width: 80%;
  @media (max-width: 420px) {
    width: 95%;
    top: 5px;
  }
  @media (max-width: 320px) {
    width: 100%;
    top: 0px;
  }
`

export default Wrapper 
