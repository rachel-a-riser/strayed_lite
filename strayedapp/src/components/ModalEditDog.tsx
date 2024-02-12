import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button } from '@mantine/core';
import Upload from './Upload'

export default function ModelEditDog(content:any) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Foster" centered>
        {content}
      </Modal>

      <Group position="center">
      <Button style={{backgroundColor: "#32C1CD" }} onClick={open} color="teal" size="xl">
      Add Pet
    </Button>
      </Group>
    </>
  );
}