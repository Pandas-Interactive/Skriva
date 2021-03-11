import { Card, Image, Row, Col } from 'antd';
import { useState, useEffect } from 'react'
import axios from 'axios'
const { Meta } = Card;


const brands = [{
    name: 'Netflix',
    domain: 'netflix.com'
}, {
    name: 'Amazon Prime',
    domain: 'prime.amazon.com'
}, {
    name: 'Medium',
    domain: 'medium.com'
}, {
    name: 'Notion',
    domain: 'notion.so'
}, {
    name: 'Spotify',
    domain: 'spotify.com'
}, {
    name: 'Disney Plus',
    domain: 'disneyplus.com'
}, {
    name: 'Twitch',
    domain: 'twitch.com'
}, {
    name: 'Audible',
    domain: 'audible.com'
}, {
    name: 'Discord Nitro',
    domain: 'discord.com'
}]
const QuickStart = () => {


    let cards = brands.map((brand, i) => {
        const { name, domain } = brand
        return (
            <Card
                hoverable
                style={{ width: 275, margin: 25, }}
                cover={<Image src={`https://logo.clearbit.com/${domain}?size=512`} preview={false} />}
            >
                <Meta title={name} description={domain} />
            </Card>
        )
    })
    return (
        <>
            <Row justify="space-around">
                {cards}
            </Row>
        </>
    )
}
export default QuickStart