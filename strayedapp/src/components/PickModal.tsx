import { useDisclosure } from "@mantine/hooks";
import { Modal, Box, Group, Button, Tabs, Center } from "@mantine/core";
import Pick from "./Pick";

export default function PickModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="70%"
        title="Which of your dogs is this?"
        centered
      >
        <Pick />
      </Modal>
      <Group position="center">
        <Button
          onClick={open}
          style={{ backgroundColor: "white", borderColor: "teal" }}
          size="sm"
        >
          <text style={{ color: "teal" }}>Choose</text>
        </Button>
      </Group>
    </>
  );
}