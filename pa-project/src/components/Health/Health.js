import React, { Component } from "react";
import axios from "axios";
import Header from "../Header";
import { Form, Radio, Input, InputNumber, Button } from "antd";
import "antd/dist/antd.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


const SList = props => (
    <tr>
                   <td>{props.data}</td>
     </tr>
 )
 

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
export class Health extends Component {
    constructor(props) {
	    super(props);
	    this.state ={
            user: {},
            predictions: [],
            items: []
        };
      }
    
      createNotification = (type) => {
        return () => {
          console.log("in health functon called")
          switch (type) {
            case 'water':
              NotificationManager.info('Drink Water','', 2000);
              break;
            case 'eat':
              NotificationManager.info('Eat Something healthy','', 2000);
              break;
            case 'exercise':
              NotificationManager.success('Do some Exercise', 'Morning Time', 2000);
              break;
            case 'sugarcheck':
              NotificationManager.warning('check sugar level now', 'Free Time', 2000);
              break;
            case 'healthcheck':
              NotificationManager.warning('Medical appointment is scheduled at 7 PM', 'Free Time', 2000);
              break;
            case 'partyloc':
              NotificationManager.error('Don\'t Drink and Smoke', 'In party', 2000);
              break;
            case 'sweetshoploc':
              NotificationManager.error('Don\'t Eat sweets', 'In sweet shop', 2000);
              break;
  
          }
        };
      };
    

    
    getPrediction = async() => {    
		const data = {
			user : this.state.user,
		};
        console.log('get prediction');
        console.log(data);


        await axios.post('http://localhost:5000/getHealthPredictions', data)
        .then(response => {
                console.log(response);
                this.setState({
                    predictions : response.data
                }, () => {
                    console.log("came her")
                    console.log(this.state.predictions)
                    this.state.items = this.state.predictions.map((item) => 
                <li>{item}</li>
                    )
                    console.log("here now")
                    console.log(this.state.items)
                })
        })
        .catch(error => {
            console.log(error.response);
        });
        setTimeout(this.createNotification('water'), 10000)
        setTimeout(this.createNotification('eat'), 20000)    
        setTimeout(this.createNotification('exercise'), 30000)
        setTimeout(this.createNotification('sugarcheck'), 40000)
        setTimeout(this.createNotification('healthcheck'), 50000)
        setTimeout(this.createNotification('partyloc'), 60000)
        setTimeout(this.createNotification('sweetshoploc'), 70000)
   
    }
      
  onFinish = (values) => {
    console.log(values.user);
    this.setState({
        user: values.user,
    }, () => {
        this.getPrediction(this);
    });
  };
  troublesListf() {
    // filter(book => book.shelf === shelf)
     return this.state.predictions.map(
         function(data) {
             return <SList data = {data} key={data} />;
         }
     ) 
 }



  render() {
    return (
      <div>
        <Header />
        <Form {...layout} name="nest-messages" onFinish={this.onFinish}>
          <Form.Item name={["user", "age"]} label="Age">
            <Input />
          </Form.Item>
          <Form.Item name={["user", "Weight"]} label="Weight">
            <Input />
          </Form.Item>
          <Form.Item name={["user", "Height"]} label="Height">
            <Input />
          </Form.Item>
          <Form.Item name={["user", "Diseases"]} label="Diseases">
            <Input />
          </Form.Item>
          <Form.Item name={["user", 'checkup']} label="checkup">
          <Radio.Group >
            <Radio value={1}>
                Monthly
            </Radio>
            <Radio value={2}>
                Weekly
            </Radio>
            <Radio value={3}>
                Yearly
            </Radio>
          </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div>
        <center><h3>All Suggestions</h3></center>
            <h4>
                <center>
                {this.troublesListf()} 
                </center>           
            </h4>
			</div>

      <NotificationContainer/>

      </div>
    );
  }
}

export default Health;
