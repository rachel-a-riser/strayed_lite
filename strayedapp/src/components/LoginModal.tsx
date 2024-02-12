import { useDisclosure } from "@mantine/hooks";
import { Modal, Box, Group, Button, Tabs } from "@mantine/core";
import Login from './login'
import CreateAcc from "./createAcc";
export default function LoginModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Strayed: Fort Smith" centered>
        <Tabs color="teal" defaultValue="first">
          <Tabs.List>
            <Tabs.Tab value="first">Login</Tabs.Tab>
          
          </Tabs.List>

          <Tabs.Panel value="first" pt="xs">
            <Login />
          </Tabs.Panel>

          
        </Tabs>
      </Modal>
      <Group position="center">
      <Button onClick={open} style={{backgroundColor:'white',borderColor:'teal'}} size="sm"><text style={{color:'teal'}}>Login</text></Button>
      </Group>
    </>
  );
}
