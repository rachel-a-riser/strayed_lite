import { useDisclosure } from "@mantine/hooks";
import { Modal, Box, Group, Button, Tabs } from "@mantine/core";
import Login from './login'
import CreateAcc from "./createAcc";
import { redirect } from "react-router-dom";
export default function CreateAccountModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Strayed: Fort Smith" centered>
        <Tabs color="teal" defaultValue="first">
          <Tabs.List>
            <Tabs.Tab value="first">Create Account</Tabs.Tab>
            <Tabs.Tab value="second" color="blue">
              Login
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="second" pt="xs">
            <Login />
          </Tabs.Panel>

          <Tabs.Panel value="first" pt="xs">
            <CreateAcc />
          </Tabs.Panel>
        </Tabs>
      </Modal>
      <Group position="center">
      <Button onClick={open} style={{backgroundColor:'white',borderColor:'teal'}} size="sm"><text style={{color:'teal'}}>Create Account</text></Button>
      </Group>
    </>
  );
}
