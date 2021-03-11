import { Component } from 'react'
import { List, Avatar, Button, Skeleton } from 'antd'
import axios from 'axios'

const count = 3

class Dashboard extends Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: []
  }

  componentDidMount() {
    this.getData((res) => {
      this.setState({
        initLoading: false,
        data: res,
        list: res
      })
      console.log(res)
    })
  }

  getData = async (callback) => {
    const subscription_plans = (await axios.get('http://localhost:3000/api/subscription_plans/all')).data.subscription_plans
    let data = []

    for (const item of subscription_plans) {

      const { subscription_id, plan_id, display_name } = item
      const { subscription } = (await axios.get(`http://localhost:3000/api/subscriptions/id/${subscription_id}`)).data
      const { plan } = (await axios.get(`http://localhost:3000/api/plans/id/${plan_id}`)).data


      const temp = {
        display_name,
        subscription_name: subscription.name,
        plan_name: plan.name,
        price: plan.monthly_price > plan.annual_price ? plan.monthly_price : plan.annual_price,
        logo: subscription.logo,
        domain: subscription.domain,
      }

      data.push(temp)
      console.log(data.length, subscription_plans.length)
    }
      if (data.length === subscription_plans.length) {
        return callback(data)
      }
  }


  render() {
    const { initLoading, loading, list } = this.state

    return (
      <List
        className='demo-loadmore-list'
        loading={initLoading}
        itemLayout='horizontal'
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key='list-loadmore-edit'>Remove</a>,
              <a key='list-loadmore-more'>more</a>
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.logo} />
                }
                title={<a href={item.domain}>{item.display_name}</a>}
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    )
  }
}

export default Dashboard
