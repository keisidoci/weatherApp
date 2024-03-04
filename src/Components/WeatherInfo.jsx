import "../Components/weatherDisplay.css"

const WeatherInfo = ({title, data, img}) => {
  return (
     <div className='extraInfo-container'>
        <img src={img} className='extraInfo-img'/>
        <div className='extraInfo-data'>
            <p className="data">{data}</p>
            <p>{title}</p>
        </div>
    </div>
  )
}

export default WeatherInfo