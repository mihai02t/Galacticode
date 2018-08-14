import React, {Component} from 'react'
import {getResults, getChallengeData} from '../store'
import {connect} from 'react-redux'
import Editor from './editor'

class Challenge extends Component {
  constructor() {
    super()
    this.state = {value: ''}

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchInitialData(this.props.match.params.challengeId)
  }

  handleSubmit() {
    this.props.fetchResults(
      this.state.value,
      this.props.match.params.challengeId,
      this.props.user.id
    )
  }

  onChange(newValue) {
    this.setState({
      value: newValue
    })
    // console.log(this.state.value)
  }

  render() {
    const {name, prompt, examples, results} = this.props
    return (
      <div>
        <h1>{name}</h1>
        <div>
          <div>
            <p>{prompt}</p>
            <h3>Examples: </h3>
            <p>
              {examples.map(example => (
                <div key={example.id}>
                  <p>INPUT: {example.input}</p>
                  <p>OUTPUT: {example.output}</p>
                </div>
              ))}
            </p>
            <div id="results">
              {results && (
                <div>
                  <p>Tests Run: {results.stats.tests}</p>
                  <p>Tests Passed: {results.stats.passes}</p>
                  <p>Tests Failed: {results.stats.failures}</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <Editor onChange={this.onChange} value={this.state.value} />
          </div>
        </div>
        <div>
          <button type="submit" onClick={this.handleSubmit}>
            SUBMIT
          </button>
        </div>
      </div>
    )
  }
}
const mapState = state => ({
  user: state.user,
  results: state.results,
  name: state.challenge.name,
  prompt: state.challenge.prompt,
  examples: state.challenge.examples
})

const mapDispatch = dispatch => ({
  fetchResults: (code, challengeId, userId) =>
    dispatch(getResults(code, challengeId, userId)),
  fetchInitialData: (challengeId) => dispatch(getChallengeData(challengeId))
})

export default connect(mapState, mapDispatch)(Challenge)
