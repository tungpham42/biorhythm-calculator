import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  calculateBiorhythms,
  generateBiorhythmSeries,
} from "./biorhythmCalculator";
import "chartjs-adapter-date-fns";

// Register Chart.js components
Chart.register(...registerables);

const App = () => {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [biorhythms, setBiorhythms] = useState(null);
  const [chartData, setChartData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateBiorhythms(birthDate, targetDate);
    const chartSeries = generateBiorhythmSeries(birthDate, targetDate);
    setBiorhythms(result);
    setChartData(chartSeries);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>Biorhythm Calculator</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="birthDate">
                  <Form.Label>Birth Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="targetDate">
                  <Form.Label>Target Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col className="d-flex align-items-end">
                <Button variant="primary" type="submit">
                  Calculate
                </Button>
              </Col>
            </Row>
          </Form>
          {biorhythms && (
            <>
              <Table striped bordered hover className="mt-5">
                <thead>
                  <tr>
                    <th>Rhythm</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Physical</td>
                    <td>{biorhythms.physical.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Emotional</td>
                    <td>{biorhythms.emotional.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Mental</td>
                    <td>{biorhythms.mental.toFixed(2)}</td>
                  </tr>
                </tbody>
              </Table>
              <div className="mt-5">
                <h3>Biorhythm Chart</h3>
                <Line
                  data={chartData}
                  options={{
                    scales: {
                      x: {
                        type: "time",
                        time: {
                          unit: "day",
                          tooltipFormat: "dd/MM/yyyy",
                          displayFormats: {
                            day: "dd/MM/yyyy",
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
