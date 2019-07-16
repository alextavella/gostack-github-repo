import styled from 'styled-components';

const Button = styled.button.attrs({
  type: 'button',
  background: '#FFF',
})`
  border: 0;
  border-radius: 4px;
  color: white;
  padding: 10px;
  background: ${props => (props.error ? '#cc0011' : '#7159c1')};
`;

export default Button;
