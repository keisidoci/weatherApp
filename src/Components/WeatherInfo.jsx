

const WeatherInfo = ({title, data}) => {
  return (
    <div>
        <div className='extraInfo-container'>
        <img src={""} className='extraInfo-img'/>
        <div className='extraInfo-data'>
            <p>{data}</p>
            <p>{title}</p>
        </div>
    </div>
    </div>
  )
}

export default WeatherInfo