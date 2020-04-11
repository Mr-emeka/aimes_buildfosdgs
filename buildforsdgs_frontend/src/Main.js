import React from 'react';
import NavBar from './component/NavBar/NavBar.js';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import CovidForm from './component/Form/Form';
import { getFromStorage } from './helpers';
import Table from 'react-bootstrap/Table';


function Main() {
  const severeImpact = getFromStorage('severeImpact');
  const impact = getFromStorage('impact');
  return (
    <div>
      <NavBar />
      <header>
             <h1 className="heading-1">Covid-19 Estimator</h1>
      </header>
      <main>
        <Container className="content">
          <Row>
            <Col md={5}>
              <CovidForm />
            </Col>
            <Col md={7}>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first"> Severe Impact</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Impact</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Table bordered responsive>
                          <tbody>
                            <tr>
                              <td>currentlyInfected</td>
                              <td>{severeImpact.currentlyInfected}</td>
                            </tr>
                            <tr>
                              <td>infectionsByRequestedTime</td>
                              <td>{severeImpact.infectionsByRequestedTime}</td>
                            </tr>
                            <tr>
                              <td>severeCasesByRequestedTime </td>
                              <td>{severeImpact.severeCasesByRequestedTime}</td>
                            </tr>
                            <tr>
                              <td>totalHospitalBedsByRequestedTime </td>
                              <td>{severeImpact.totalHospitalBedsByRequestedTime}</td>
                            </tr>
                            <tr>
                              <td>casesForICUByRequestedTime</td>
                              <td>{severeImpact.casesForICUByRequestedTime}</td>
                            </tr>
                            <tr>
                              <td>casesForVentilatorsByRequestedTime</td>
                              <td>{severeImpact.casesForVentilatorsByRequestedTime}</td>
                            </tr>
                            <tr>
                              <td>dollarsInFlight</td>
                              <td>{severeImpact.dollarsInFlight}</td>
                            </tr>

                          </tbody>
                        </Table>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Table bordered responsive>
                          <tbody>
                            <tr>
                              <td>currentlyInfected</td>
                              <td>{impact.currentlyInfected}</td>
                            </tr>
                            <tr>
                              <td>infectionsByRequestedTime</td>
                              <td>{impact.infectionsByRequestedTime}</td>
                            </tr>
                            <tr>
                              <td>severeCasesByRequestedTime </td>
                              <td>{impact.severeCasesByRequestedTime}</td>
                            </tr>
                            <tr>
                              <td>totalHospitalBedsByRequestedTime </td>
                              <td>{impact.totalHospitalBedsByRequestedTime}</td>
                            </tr>
                            <tr>
                              <td>casesForICUByRequestedTime</td>
                              <td>{impact.casesForICUByRequestedTime}</td>
                            </tr>
                            <tr>
                              <td>casesForVentilatorsByRequestedTime</td>
                              <td>{impact.casesForVentilatorsByRequestedTime}</td>
                            </tr>
                            <tr>
                              <td>dollarsInFlight</td>
                              <td>{impact.dollarsInFlight}</td>
                            </tr>

                          </tbody>
                        </Table>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>

        </Container>

      </main>
    </div>
  );
}

export default Main;
