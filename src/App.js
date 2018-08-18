import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calc from './calculatorBrian.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Calculator />
      </div>
    );
  }
}

class Calculator extends Component {

  state = {
    value : '0',
    isFirstDigit:true,
    brain: new Calc.CalculatorBrian()
  }
  
  handleDigitClick = (event)=> {
        const {value,isFirstDigit} = this.state;
            if (isFirstDigit) {
                this.setState({
                  value:event.target.innerText,
                  isFirstDigit:false
                })               
            }else{
              this.setState({
                value: value + event.target.innerText
              })
            }
    }
    
    handlerOperatorClick = (event)=> {
      const {brain,value,isFirstDigit} = this.state;
              if (!isFirstDigit){
                  brain.setOperand(parseFloat(value));
                  this.setState({
                    isFirstDigit:true
                  })
              }
              brain.performOperator(event.target.innerText);
              this.setState({
                value:brain.result()
              })
          }
  render(){
    const {value} = this.state;
    return(
      <div className='calc'>
        <Screen>{value}</Screen>
        <section className='calc-buttons'>
          <div className="calc-row">
            <Button className='double'>C</Button>
            <Button >⬅︎</Button>
            <Button onClick={this.handlerOperatorClick}>÷</Button>
          </div>
          <div className="calc-row">
            <Button onClick={this.handleDigitClick}>7</Button>
            <Button onClick={this.handleDigitClick}>8</Button>
            <Button onClick={this.handleDigitClick}>9</Button>
            <Button onClick={this.handlerOperatorClick}>×</Button>
          </div>
          <div className="calc-row">
            <Button onClick={this.handleDigitClick}>4</Button>
            <Button onClick={this.handleDigitClick}>5</Button>
            <Button onClick={this.handleDigitClick}>6</Button>
            <Button onClick={this.handlerOperatorClick}>-</Button>
          </div>
          <div className="calc-row">
            <Button onClick={this.handleDigitClick}>1</Button>
            <Button onClick={this.handleDigitClick}>2</Button>
            <Button onClick={this.handleDigitClick}>3</Button>
            <Button onClick={this.handlerOperatorClick}>+</Button>
          </div>
          <div className="calc-row">
            <Button onClick={this.handleDigitClick}className='triple'>0</Button>
            <Button onClick={this.handlerOperatorClick}>=</Button>        
          </div>
        </section>
      </div>
    )
  }
}

const Screen = ({children})=>{
  return (
    <section className='screen'>{children}</section>
  )
}

const Button = ({onClick,children,className=''})=>{
  let btnClass = 'calc-button ' + className 
  return(
    <button onClick={onClick} className={btnClass}>{children}</button>
  )
}

export default App;
