import StripeCheckout from "react-stripe-checkout";
import { Card, Col, Badge, Stack, Row } from "react-bootstrap";

function App() {
  const handleToken = (token) => {
    fetch("/payment/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((_) => {
        window.alert("Transaction Successful.");
      })
      .catch((_) => window.alert("Transaction Failed."));
  };

  return (
    <Row
      xs={1}
      sm={2}
      lg={3}
      className=" d-flex flex-row justify-content-center align-items-center g-3  mb-5 g-xl-4 g-xxl-5"
      style={{
        height: "100vh"
      }}
    >
      <Col>
        <Card className=" h-100">
          <Card.Header>
            <Stack direction="horizontal" gap={2}>
              <span className="font-monospace text-secondary">owner</span>
              <Badge bg="secondary" className="ms-auto">
                $100
              </Badge>
            </Stack>
          </Card.Header>
          <div className=" ratio ratio-4x3">
            <img
              src="https://i.pinimg.com/736x/1f/34/da/1f34da676bcaa3b81a3ed27303fce78f.jpg"
              alt="nft"
              style={{ objectFit: "cover" }}
            />
          </div>
          <Card.Body className="d-flex  flex-column">
            <Card.Title>Name</Card.Title>
            <Card.Text className="flex-grow-1 ">description</Card.Text>
            <StripeCheckout
              stripeKey={process.env.REACT_APP_STRIPE_KEY || ""}
              token={handleToken}
              name=""
              panelLabel={`Buy for`}
              currency="USD"
              amount={100 * 100}
            ></StripeCheckout>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default App;
