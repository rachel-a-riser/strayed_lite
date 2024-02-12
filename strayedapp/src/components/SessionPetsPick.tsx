import React from "react";
import axios from "axios";
import "../css/css.css";
import { Grid, Center } from "@mantine/core";
import ticketsImage from "./../imgz/doggo.png";

import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  SimpleGrid,
} from "@mantine/core";

export default class SessionPetsPick extends React.Component<
  any,
  { pets: Array<any>; render: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      pets: [],
      render: true,
    };
  }

  componentDidMount() {
    axios.get("/sessionPets").then((res) => {
      const pets = res.data;
      this.setState({ pets });
    });
    setTimeout(() => {
      this.setState({ render: !this.state.render });
    }, 1000);
  }
  makeGridElement(content: any) {
    return <div>{content}</div>;
  }
  makeCard(dName: any, status: any, description: any, image: string) {
    let url = "components/images/";

    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Center>
          <Card.Section>
            <Image src={require(`${url}${image}`)} height={160} alt="dog" />
          </Card.Section>
        </Center>

        <Group position="apart" mt="md" mb="xs">
          <Text
            component="span"
            align="center"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            size="xl"
            weight={700}
            style={{ fontFamily: "Greycliff CF, sans-serif" }}
          >
            {dName}
          </Text>

          <Badge
            color="pink"
            variant="gradient"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
          >
            {status}
          </Badge>
        </Group>

        <Text size="sm" color="dimmed">
          {description}
        </Text>
        <Group spacing="sm" align="center">
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            Select
          </Button>

          <Grid.Col span={1}></Grid.Col>
        </Group>
      </Card>
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          <ul>
            <Grid>
              {this.state.pets.map((pet) => (
                <Grid.Col span={4}>
                  <ul className="no-bullets">
                    <p>
                      <li key={pet.DogID}></li>
                      {this.makeCard(
                        `${pet.Name}`,
                        `${pet.Status}`,
                        `${pet.ProfileDescription}`,
                        `${pet.ProfileImage}`
                      )}
                    </p>
                  </ul>
                </Grid.Col>
              ))}
            </Grid>
          </ul>
        </div>
      </div>
    );
  }
}