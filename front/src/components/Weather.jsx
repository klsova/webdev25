import './Weather.css';
import { useState, useEffect } from 'react';

function setBackground(weather) {
    if (weather === "insert weather type") {
        document.body.style.backgroundImage = './assets/rain.jpg'
    } else if (weather === "insert weather type") {
        document.body.style.backgroundImage = './assets/snow.jpg'
    } else if (weather === "insert weather type") {
        document.body.style.backgroundImage = './assets/sunny.jpg'
    } else if (weather === "insert weather type") {
        document.body.style.backgroundImage = './assets/cloudy.jpg'
    }
}

const Weather = () => {

    setBackground('weather')
    
    return (
        <div className='weather-box'
        style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <h1>Turku</h1>
            <div className='day1'>Ma</div>
            <div className='day2'>Ti</div>
            <div className='day3'>Ke</div>
            <div className='day4'>To</div>
            <div className='day5'>Pe</div>
            <div className='day6'>La</div>
            <div className='day7'>Su</div>
        </div>

    );
}

export default Weather;