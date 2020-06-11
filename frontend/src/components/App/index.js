import React,{Component} from 'react'
import Header from '../Header'
import Wall from '../Wall'
import CustomLayout from '../../containers/CustomLayout'
import Button from '@material-ui/core/Button';

// main component
export default class App extends Component {

  render() {
    return (
      <CustomLayout>
        <Wall />
      </CustomLayout>
    )
  }
}
