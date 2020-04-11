import React, { useState, useRef} from 'react';
import MyButton from '../Button/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './form.css';
import covid19ImpactEstimator from '../../estimator.js';
import{saveToStorage} from '../../helpers';

function CovidForm() {
    const form = useRef();
    const [population, setPopulation] = useState(0)
    const [timeToElapse, setTimeToElapse] = useState(0)
    const [reportedCases, setReportedCases] = useState(0);
    const [totalHospitalBeds, setTotalHospitalBeds] = useState(0)
    const [periodType, setPeriodType] = useState(' ')
    const [loading, setLoading] = useState(false);

    const [regionName, setRegionName] = useState('');
    const [regionAvgAge, setRegionAvgAge] = useState(0); 
    const [regionAvgDailyIncomeInUSD, setRegionAvgDailyIncomeInUSD] = useState(0);
    const [regionAvgDailyIncomePopulation, setRegionAvgDailyIncomePopulation] = useState(0);


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const input = {}
        input.region = {
            name:regionName,
            avgAge:regionAvgAge,
            avgDailyIncomeInUSD:regionAvgDailyIncomeInUSD,
            avgDailyIncomePopulation:regionAvgDailyIncomePopulation
        }
        input.population= population;
        input.timeToElapse = timeToElapse;
        input.reportedCases = reportedCases;
        input.totalHospitalBeds= totalHospitalBeds;
        input.periodType=periodType;
      
      let {data,severeImpact,impact} = covid19ImpactEstimator(input)
      saveToStorage('data',data);
      saveToStorage('severeImpact',severeImpact);
      saveToStorage('impact',impact);
    
      setLoading(false);
      window.location.reload()
    }
    

    return (
        <form ref={form} >
            <Row className="form-group">
                <Col md={6} className="formcol" >
                    <input type="number" placeholder="Population" data-population min="1" onChange={(e)=>{setPopulation(e.target.value)}}/>
                </Col>
                <Col md={6} className="formcol">
                    <input type="number" placeholder="Time To Elapse" data-time-to-elapse min="1" onChange={(e)=>{setTimeToElapse(e.target.value)}}/>
                </Col>

            </Row>
            <Row className="form-group">
                <Col md={6} className="formcol">
                    <input type="number" placeholder="Reported Cases" data-reported-cases min="1"  onChange={(e)=>{setReportedCases(e.target.value)}} />
                </Col>
                <Col md={6} className="formcol">
                    <input type="number" placeholder="Total Hospital Beds" data-total-hospital-beds min="1" onChange={(e)=>{setTotalHospitalBeds(e.target.value)}} />
                </Col>
            </Row>
            <Row className="form-group">
                <Col md={12} className="formcol">
                 Estimate for:{' '}
                    <select data-period-type value={periodType} onChange={(e)=>(setPeriodType(e.target.value))}>
                        <option>days</option>
                        <option>weeks</option>
                        <option>Months</option>
                    </select>
                </Col>
            </Row>
            <Row className="form-group">
                <Col md={6} className="formcol">
                    <input type="text" placeholder="Region Name" data-region-name value={regionName} onChange={(e=>setRegionName(e.target.value))}/>
                </Col>
                <Col md={6} className="formcol">
                    <input type="number" placeholder="Region AvgerageAge" data-region-avgage  onChange={e=>setRegionAvgAge(e.target.value)}/>
                </Col>
            </Row>
            <Row className="form-group">
                <Col md={6} className="formcol">
                    <input type="number" placeholder="Region Average Daily IncomeInUSD" data-region-avgdailyincomeinusd min="1"  onChange={e=>setRegionAvgDailyIncomeInUSD(e.target.value)}/>
                </Col>
                <Col md={6} className="formcol">
                    <input type="number" placeholder="Region Average Daily Income Population" data-region-avgdailyincomepopulation min="1" onChange={e=>setRegionAvgDailyIncomePopulation(e.target.value)}
                    />
                </Col>

            </Row>
            <Row className="btn-col">
                <MyButton className="button" handleSubmit={handleSubmit} loading={loading} />
            </Row>
        </form>
    )
}

export default CovidForm;