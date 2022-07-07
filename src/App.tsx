import React from 'react';
import logo from './logo.svg';
import './App.css';

interface Hoge {
  value: number
}

const App = () => {
  return <Counter />
}

class Counter extends React.Component<{}, Hoge>
{
  constructor(props: any)
  {
    super(props);
    this.state = {
      value : 0
    } as Hoge
  }

  //インクリメントする関数
  onIncrement = () => {
    //setStateでstateの値を更新します
    this.setState({ value : this.state.value + 1});
  }

  //デクリメントする関数
  onDecrement = () => {
    //setStateでstateの値を更新します
    this.setState({ value : this.state.value - 1});
  }

  render()
  {
    return (
      <div>
        <div>
          カウント値：{this.state.value}
        </div>
        <div>
          <button type="button" onClick={this.onIncrement}>+</button>
          <button type="button" onClick={this.onDecrement}>-</button>
        </div>
      </div>
    );
  }
}
export default App;
