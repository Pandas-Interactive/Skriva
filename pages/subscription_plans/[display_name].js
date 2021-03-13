import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { PageHeader, Menu, Dropdown, Button, Tag, Typography, Row } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'

import Capitalize from '../../utils/capitalize'

const { Paragraph } = Typography;

const content = (
  <>
    <Paragraph>
      This page needs actual content to be rendered on it.
    </Paragraph>
  </>
);

const Content = ({ children, extraContent }) => (
  <Row>
    <div style={{ flex: 1 }}>{children}</div>
    <div>{extraContent}</div>
  </Row>
);

export async function getServerSideProps({ params: { display_name }}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URI
  console.log(display_name)

  const data = (await axios.get(`${baseUrl}/subscription_plans/${display_name}`)).data.subscription_plan

  const subscription_promise = axios.get(`${baseUrl}/subscriptions/id/${data.subscription_id}`)
  const plan_promise = axios.get(`${baseUrl}/plans/id/${data.plan_id}`)

  const [subscription, plan] = await Promise.all([subscription_promise, plan_promise])

  const { name: sub_name, domain, logo } = subscription.data.subscription
  const { name: plan_name, monthly_price, annual_price } = plan.data.plan

  const temp = {
    display_name,
    sub_name,
    domain,
    logo,
    plan_name,
    monthly_price,
    annual_price,
  }

  return {
    props: {
      sp: temp
    },
  }
}


const SubscriptionPlan = (props) => {
  const { 
    display_name,
    sub_name, 
    plan_name, 
    domain, 
    logo, 
    montly_price, 
    annual_price,
  } = props.sp

  return (
    <>
      <PageHeader
        title={Capitalize(display_name)}
        subTitle={`A paid ${sub_name} ${plan_name} plan subscription service`}
        extra={[
          <Button type="primary" href={`http://${domain}`}>Open {Capitalize(sub_name)}</Button>,
        ]}
        avatar={{ src: logo }}
      >
        <Content>
          {content}
        </Content>
      </PageHeader>

    </>
  )
}



export default SubscriptionPlan
