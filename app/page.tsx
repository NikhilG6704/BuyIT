import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <Container className=" bg-shop_light_pink">
      <h2 className="text-xl font-semibold">Home</h2>
      <p>Hello my name is nikhil</p>
      <Button size="lg">Check it out</Button>
    </Container>
  );
};

export default Home;
