import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Input,
  AutoComplete,
  Image,
  Row,
  Form,
  Button,
  Select,
  PageHeader,
} from 'antd';
import axios from 'axios'

const searchResult = async (query) => {
  let brands = (await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`)).data

  let options = []

  for (let brand of brands) {
    const category = `${brand.name}`;
    options.push({
      value: category,
      label: (
        <div
          style={{
            display: 'flex',
          }}
        >
          <Image
            preview={false}
            width={40}
            height={40}
            src={brand.logo}
          />
          {'  '}
          {brand.name}
        </div>
      ),
    })
  }

  return options
}


const AddSubscription = () => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [logoURI, setLogoURI] = useState([''])
  const router = useRouter()

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URI

  const handleSearch = async (value) => {
    setOptions(value ? await searchResult(value) : []);
  };

  const getLogoURI = async (value) => {
    const URI = (await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${value}`)).data[0].logo
    setLogoURI(URI)
    return logoURI
  }
  const onSelect = (value) => {
    setSelected(value)
    getLogoURI(value)
    return selected
  };

  const onFinish = async (values) => {
    const {
      display_name,
      subscription: sub_name,
      plan: plan_name,
      price,
      billing_period

    } = values

    console.log('Received values of form: ', values);

    const sub = (await axios.get(`${baseUrl}/subscriptions/${sub_name}`)).data.subscription
    const plan = (await axios.get(`${baseUrl}/plans/${plan_name}`)).data.plan

    if (sub != null && plan != null) {
      const data = {
        display_name,
        subscription_id: sub._id,
        plan_id: plan._id,
      }

      const sub_plan = (await axios.post(`${baseUrl}/subscription_plan`, data)).data.subscription_plan
      console.log(sub_plan)
    } else if (sub != null && plan == null) {

      const new_plan_data = {
        name: plan_name,
        annual_price: billing_period == 'annual' ? (parseFloat(price) * 100 * 12) : 0,
        monthly_price: billing_period == 'month' ? (parseFloat(price) * 100) : 0,
        subscription_id: new_sub._id,
      }

      const new_plan = (await axios.post(`${baseUrl}/plan`, new_plan_data)).data.plan

      console.log(new_plan)

      const new_sub_plan_data = {
        display_name,
        subscription_id: new_sub._id,
        plan_id: new_plan._id,
      }

      const new_sub_plan = (await axios.post(`${baseUrl}/subscription_plan`, new_sub_plan_data)).data.subscription_plan

      console.log(new_sub_plan)


    } else {
      const { domain, logo } = (await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${sub_name}`)).data[0]

      const new_sub_data = {
        name: sub_name,
        domain,
        logo,
      }

      const new_sub = (await axios.post(`${baseUrl}/subscription`, new_sub_data)).data.subscription

      console.log(new_sub)

      const new_plan_data = {
        name: plan_name,
        annual_price: billing_period == 'annual' ? (parseFloat(price) * 100 * 12) : 0,
        monthly_price: billing_period == 'month' ? (parseFloat(price) * 100) : 0,
        subscription_id: new_sub._id,
      }

      const new_plan = (await axios.post(`${baseUrl}/plan`, new_plan_data)).data.plan

      console.log(new_plan)

      const new_sub_plan_data = {
        display_name,
        subscription_id: new_sub._id,
        plan_id: new_plan._id,
      }

      const new_sub_plan = (await axios.post(`${baseUrl}/subscription_plan`, new_sub_plan_data)).data.subscription_plan

      console.log(new_sub_plan)
    }



  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => router.back()}
        title="Add Subscription"
        subTitle="Create a new subscription to keep track of"
      />
      <Row justify="center ">

        <Image
          width={128}
          height={128}
          src={logoURI}
          preview={false}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
        />
        <Form
          onFinish={onFinish}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 30 }}
          layout="horizontal"

        >
          <Row justify="center">
          </Row>

          <Form.Item
            label="Display Name"
            name="display_name"
            hasFeedback
            rules={[{ required: true, message: 'Please name this subscription' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Service"
            name="subscription"
            hasFeedback
            rules={[{ required: true, message: 'Please choose a subscription service' }]}
          >
            <AutoComplete
              dropdownMatchSelectWidth={252}
              options={options}
              onSelect={onSelect}
              onSearch={handleSearch}
            >
              <Input placeholder="E.g. Netflix" />
            </AutoComplete>

          </Form.Item>

          <Form.Item
            label="Plan name"
            name="plan"
            hasFeedback
            rules={[{ required: true, message: 'Please choose a plan' }]}
          >
            <Input placeholder="E.g. Basic, Pro, etc." />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            hasFeedback
            rules={[{ required: true, message: 'Enter the price of the subscription' }]}
          >
            <Input placeholder="£9.99" />
          </Form.Item>

          <Form.Item
            label="Billing Period"
            name="billing_period"
            hasFeedback
            rules={[{ required: true, message: 'Must select an option' }]}
          >
            <Select placeholder="Choose the payment interval">
              <Select.Option value='month'>Monthly</Select.Option>
              <Select.Option value='annual'>Annualy</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            colon={false}
          >
            <Button type="primary" htmlType="submit">Add Subscription</Button>
          </Form.Item>

        </Form>
      </Row>
    </>
  );
};


export default AddSubscription
