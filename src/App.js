import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { TransitionMotion, spring } from 'react-motion';
import styled from 'styled-components';

const Item = styled.div`
width: ${props => props.width}px;
height: ${props => props.height}px;
background: #333;
margin: ${props => props.margin}px;
`

let id = 3;

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [{ id: -1 }, { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
    }
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  addItem() {
    this.setState({ items: [...this.state.items, { id: ++id }] });
  }
  removeItem(i) {
    console.log('removing item: ' + i)
    this.setState({ items: this.state.items.filter(item => '' + item.id !== '' + i) });
    setTimeout(() => console.log(this.state), 10);
  }
  render() {
    console.log(this.state.items);
    return (
      <div>
        <button onClick={this.addItem}>ADD ITEM</button>
        <TransitionMotion
          willLeave={() => ({ width: spring(0), height: spring(0), margin: spring(0) })}
          willEnter={() => ({ width: 0, height: 0, margin: 0 })}
          defaultStyles={this.state.items.map(item => ({
            key: '' + item.id,
            style: { width: 0, height: 0, margin: 0 }
          }))}
          styles={this.state.items.map(item => ({
            key: '' + item.id,
            style: { width: spring(100), height: spring(100), margin: spring(16) }
          }))}
        >
          {styles => (
            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', alignItems: 'center' }}>
              {styles.map(config => (
                <div onClick={() => this.removeItem(config.key)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                  <Item key={config.key} width={config.style.width} height={config.style.height} margin={config.style.margin} />
                </div>
              ))}
            </div>
          )}
        </TransitionMotion>
      </div>
    );
  }
}

export default App;
